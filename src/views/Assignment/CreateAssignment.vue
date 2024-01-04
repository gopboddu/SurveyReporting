<template>
  <div class="maincontainer">
    <div class="home block">
      <div class="addquestion">
        <el-button type="success" round class="addbtn" @click="showAdd = true"
          >New Assignmnet</el-button
        >
      </div>
      <div class="assigntable">
        <el-table :data="assignmentsList" border="true" fit="true">
          <el-table-column type="index" label="Sl.No"  :index="indexMethod" width="60"/>
          <el-table-column prop="assignment" label="Assignment Name" sortable/>
          <el-table-column prop="categeory" label="Status" sortable/>
        </el-table>
      </div>
    </div>
  </div>
  <div class="confirmbox" v-if="showAdd">
    <div class="confirm-content questab">
      <div class="qheader">
        <div class="qtitle w-300">
          <h2>Add Assignment</h2>
        </div>
        <div class="qclose" @click="showAdd = false">
          <img src="@/assets/cross.svg" alt="" class="closeicon" />
        </div>
      </div>
      <div class="confirm-body mt-20 pr-40">
        <div class="selectuser mb-20">
          <label class="label-width">Assignment Name:</label>
          <el-input v-model="assignmentName" class="width60" />
        </div>
        <div class="selectuser mb-40">
          <label class="label-width">Select Category:</label>
          <el-select
            v-model="selcategeory"
            placeholder="Select Category"
            size="large"
            @change="getQuestions"
          >
            <el-option key="" label="Select Category" value="" />
            <el-option
              v-for="item in category"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div class="selectuser mb-40">
          <label class="label-width">Select Questions:</label>
          <VueMultiselect
            v-model="qList"
            :options="questionsArray"
            :multiple="true"
            :close-on-select="true"
            placeholder="Select Questions:"
            label="questionText"
            track-by="questionText"
            :limit="0"
            :limit-text="limitText"
          />
        </div>
        <el-button type="success" class="mt-20 mb-40" @click="saveAssignment"
          >Save</el-button
        >
      </div>
    </div>
  </div>
  <div class="confirmbox" v-if="showConfirm">
    <div class="confirm-content">
      <div class="confirm-body">
        <h3 class="mb-20">
          Assignment Created successfully !
        </h3>
        <el-button type="success" class="lbutton" @click="showConfirm = false">
          Ok
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref,onMounted } from "vue";
import VueMultiselect from "vue-multiselect";
import {getLocalData} from "@/components/LocalData.ts"
const assignmentName = ref("");
const selcategeory = ref("");
const qList = ref([]);
const category = ref([
  "Makeup",
  "Lighting",
  "Costumes",
  "Production",
  "Camera",
]);
const questionsArray = ref([]);
const showConfirm = ref(false);
const showAdd = ref(false);
const assignmentsList = ref([]);

onMounted(() => {
  assignmentsList.value = getLocalData("assignments");
})

const indexMethod = (index: number) => {
  return index+1;
}
const getQuestions = (tab) => {
  questionsArray.value = getLocalData("questions").filter((item: any) => item.category === tab);
};

const saveAssignment = () => {
  let quesList = [];
  qList.value.map((item) => {
    quesList.push(item.qID);
  });
  let obj = {
    assignment: assignmentName.value,
    categeory: selcategeory.value,
    questions: quesList,
  };
  let assment = localStorage.getItem("assignments");
  let aArray = [];
  if (assment) {
    aArray = JSON.parse(assment);
  }
  aArray.push(obj);
  localStorage.setItem("assignments", JSON.stringify(aArray));
  showConfirm.value = true;
  assignmentName.value = "";
  selcategeory.value = "";
  qList.value = [];
  showAdd.value = true;
};

const limitText = (count) => {
  return `${count} selected`;
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scopped>
.multiselect__tag {
  /* display : none !important; */
}
.multiselect__option {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 600px;
}
</style>
