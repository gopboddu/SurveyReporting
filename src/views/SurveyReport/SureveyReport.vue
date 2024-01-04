<template>
  <div class="maincontainer">
    <div class="home block navborder">
      <div class="block mb-20">
        <nav class="flex nav-cont">
          <button
            class="navbtn"
            :class="{ active: showTab == tab.value }"
            v-for="(tab, index) in tabs"
            :key="index"
            @click="updateTabContent(tab.value)"
          >
            {{ tab.value }}
          </button>
        </nav>
      </div>
      <div class="selectuser">
        <label>Select the User:</label>
        <el-select
          v-model="selUser"
          class="m-2 ml-10"
          placeholder="Select User"
          size="large"
        >
          <el-option key="" label="Select User" value="" />
          <el-option
            v-for="item in users"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="tabcontent">
        <div v-for="(res, i) in resultArray" :key="i" class="tab_content">
          <div v-for="(que, j) in Object.keys(res)" :key="j">
            <template v-if="que === selUser">
              <!-- <h3 class="mb-20 signtitle">{{ "User: " + que }}</h3> -->
              <div v-for="(ele, k) in res[que]" :key="k">
                <p class="ques">{{ k + 1 + ") " + ele.questionText }}</p>
                <p class="ans">{{ "Ans: " + ele.ans }}</p>
                <!-- {{ res[que] }} -->
              </div>
              <div class="fr mt-20 mb-20" v-if="!showComment">
                <el-button type="primary" @click="showComment=true">Add Comment</el-button>
              </div>
              <div class="mt-20 mb-20" v-else>
                <el-input v-model="txtmessage" placeholder="Enter your comment" class="mb-20"/>
                <el-button type="success" @click="saveComment" class="fr">Send</el-button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const tabs = ref([
  { id: 1, value: "Makeup" },
  { id: 2, value: "Lighting" },
  { id: 3, value: "Costumes" },
  { id: 4, value: "Production" },
  { id: 5, value: "Camera" },
]);
const showTab = ref("");
const selUser = ref("");
const showComment = ref(false);
const txtmessage = ref("");
const users = ref<any>([]);
onMounted(() => {
  updateTabContent("Makeup");
});
const resultArray = ref([]);
const updateTabContent = (tab: any) => {
  showTab.value = tab;
  let qString = localStorage.getItem("surveyResult");
  let qArray = [];
  if (qString) {
    qArray = JSON.parse(qString);
  }
  resultArray.value = qArray[0][tab];
  resultArray.value.map((ele) => {
    Object.keys(ele).map((ele1) => {
      users.value.push(ele1);
    });
  });
};

const saveComment = () => {
  let obj = {
    sender:"Admin",
    to:selUser.value,
    message:txtmessage.value
  }
  let note = localStorage.getItem("notifications");
  let nArray = [];
  if (note) {
    nArray = JSON.parse(note);
  }
  nArray.push(obj);
  localStorage.setItem("notifications", JSON.stringify(nArray));
  
  txtmessage.value="";
  showComment.value=false;
}
</script>
