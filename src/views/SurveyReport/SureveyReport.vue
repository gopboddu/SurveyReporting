<template>
  <div class="maincontainer t-20">
    <div class="page_title_left">
      <h1 class="dashtitle">Survey Report</h1>
    </div>
    <div class="addquestion">
      
    </div>
    <div class="home block navborder">
      <div class="wrapper">
        <div class="tabs_wrap">
          <ul>
            <li
              :class="{ active: showTab == tab.value }"
              v-for="(tab, index) in tabs"
              :key="index"
              @click="updateTabContent(tab.value)"
            >
              {{ tab.value }}
            </li>
          </ul>
        </div>
      </div>
      <div class="selectuser">
        <label>Select the User:</label>
        <el-select
          v-model="selUser"
          class="m-2 ml-10"
          placeholder="Select User"
          size="large"
          @change="getNotifications"
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
              <div class="mt-20">
                <p class="ques">Feedback:</p>
                <QuillEditor
                  toolbar="snowww"
                  :readOnly="true"
                  v-model:content="feedback.feedback"
                  contentType="html"
                />
              </div>
              <div class="message-conversation mt-20">
                <div class="message-list">
                  <div
                    v-for="msg in messages"
                    :key="msg"
                    class="message nav"
                    @click="messageRead(msg)"
                  >
                    <div class="message-after-effect"></div>
                    <div
                      class="message-content"
                      :class="{ adminbackground: msg.sender == 'Admin' }"
                    >
                      <p class="sender">
                        <span class="mailIcon"
                          ><i class="fa fa-envelope"></i>
                        </span>
                        {{ msg.sender + ":" }}
                      </p>
                      <p class="sndmsg pl-30">
                        {{ msg.message }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="fr mt-20 mb-20" v-if="!showComment">
                <el-button type="primary" @click="showComment = true"
                  >Add Comment</el-button
                >
              </div>
              <div class="mt-20 mb-20" v-else>
                <el-input
                  v-model="txtmessage"
                  placeholder="Enter your comment"
                  class="mb-20"
                />
                <el-button type="success" @click="saveComment" class="fr"
                  >Send</el-button
                >
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
import { getLocalData } from "@/components/LocalData";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

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
const messages = ref([]);
const feedback = ref({});

onMounted(() => {
  updateTabContent("Makeup");
});
const getNotifications = () => {
  messages.value = getLocalData("notifications").filter(
    (ele: any) => ele.to == selUser.value || ele.sender == selUser.value
  );
  feedback.value = getLocalData("feedback").find(
    (ele: any) => ele.from == selUser.value
  );
  console.log(feedback.value);
};
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
    sender: "Admin",
    to: selUser.value,
    message: txtmessage.value,
    status: "unread",
  };
  let note = localStorage.getItem("notifications");
  let nArray = [];
  if (note) {
    nArray = JSON.parse(note);
  }
  nArray.push(obj);
  messages.value.push(obj);
  localStorage.setItem("notifications", JSON.stringify(nArray));
  txtmessage.value = "";
  showComment.value = false;
};
</script>
<style>
.ql-toolbar.ql-snow {
  display: none;
}
.ql-editor {
  box-sizing: border-box !important;
  border: 1px solid #d1d5db;
  border-radius: 15px;
}

.ql-container.ql-snow {
  border: none !important;
}
</style>
