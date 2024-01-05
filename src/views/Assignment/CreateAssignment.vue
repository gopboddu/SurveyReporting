<template>
  <div class="maincontainer">
    <div class="home block">
      <div class="addquestion">
        <el-button type="success" round class="addbtn" @click="showAdd = true"
          >New Assignmnet</el-button
        >
      </div>
      <div class="assigntable">
        <el-table :data="assignmentsList" :border="true">
          <el-table-column
            type="index"
            label="Sl.No"
            :index="indexMethod"
            width="80"
          />
          <el-table-column prop="assignment" label="Assignment Name" sortable />
          <el-table-column prop="categeory" label="Category" sortable />
          <el-table-column label="Action" width="100" :align="'center'">
            <template #default="scope">
              <el-button
                type="primary"
                class="w-50"
                size="small"
                @click="handleEdit(scope.row)"
                >View</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-table :data="assignmentsList" :border="true">
          <el-table-column type="expand">
            <template #default="props">
              <div m="4">
                <el-table :data="props.row.quesList" :border="false" id="t1">
                  <el-table-column
                    label="Q ID"
                    prop="qID"
                    width="100"
                    id="t1"
                  />
                  <el-table-column label="Question" prop="questionText" />
                  <el-table-column label="Options" prop="options" />
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="Sl.No"
            :index="indexMethod"
            width="80"
          />
          <el-table-column prop="assignment" label="Assignment Name" sortable />
          <el-table-column prop="categeory" label="Status" sortable />
        </el-table> -->
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
          <div
            class="invalid-text msgError"
            v-if="submitted && assignmentName == ''"
          >
            Assignment Name field is required.
          </div>
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
          <div
            class="invalid-text msgError"
            v-if="submitted && selcategeory == ''"
          >
            Select Category field is required.
          </div>
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
          <div class="invalid-text" v-if="submitted && qList.length == 0">
            Select Category field is required.
          </div>
        </div>
        <el-button
          type="success"
          class="mt-40 mb-40"
          @click="saveAssignment"
          :disabled="
            assignmentName == '' || selcategeory == '' || qList.length == 0
          "
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
        <el-button type="success" class="lbutton" @click="reloadAssignment">
          Ok
        </el-button>
      </div>
    </div>
  </div>
  <div class="confirmbox" v-if="showAssignment">
    <div class="confirm-content questab">
      <div class="qheader">
        <div class="qtitle w-300">
          <h2>{{ assignName }}</h2>
        </div>
        <div class="qclose" @click="showAssignment = false">
          <img src="@/assets/cross.svg" alt="" class="closeicon" />
        </div>
      </div>
      <div class="confirm-body mt-20 pr-40">
        <div class="selectuser">
          <div v-for="(res, i) in assignQuestions" :key="i" class="mb-20">
            <p class="ques quesback">{{ res.questionText }}</p>
            <p class="ques ml-10"><span class="label-width2">Question Type: </span>{{ res.questionType }}</p>
            <p class="ques ml-10 mb-20" v-if="res.options.length > 0"><span class="label-width2">Options: </span>
              {{ res.options.join() }}
            </p>
            <!-- <hr> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import VueMultiselect from "vue-multiselect";
import { getLocalData } from "@/components/LocalData";
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
const questionsList = ref([]);
const submitted = ref(false);
const showAssignment = ref(false);
const assignQuestions = ref([]);
const assignName = ref([]);
onMounted(() => {
  questionsList.value = getLocalData("questions");
  assignmentsList.value = getLocalData("assignments");
});

const indexMethod = (index: number) => {
  return index + 1;
};
const getQuestions = (tab) => {
  questionsArray.value = questionsList.value.filter(
    (item: any) => item.category === tab
  );
};

const saveAssignment = () => {
  if (
    assignmentName.value == "" ||
    selcategeory.value == "" ||
    qList.value.length == 0
  )
    submitted.value = true;
  else {
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
    submitted.value = false;
  }
};

const limitText = (count) => {
  return `${count} selected`;
};

const reloadAssignment = () => {
  showAdd.value = false;
  showConfirm.value = false;
  assignmentsList.value = getLocalData("assignments");
};

const handleEdit = (data: any) => {
  assignName.value = data.assignment;
  let assignQues = [];
  data.questions.map((element: any) => {
    assignQues.push(
      questionsList.value.find((ques: any) => ques.qID == element)
    );
  });
  assignQuestions.value = assignQues;
  showAssignment.value = true;
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
  width: 870px;
}
.el-table th.el-table__cell {
  background-color: #0079af !important;
  color: #fff !important;
  font-weight: 700;
  font-size: 20px;
}
#t1.el-table th.el-table__cell {
  background-color: #fff !important;
  color: #5f5f5f !important;
}
</style>
