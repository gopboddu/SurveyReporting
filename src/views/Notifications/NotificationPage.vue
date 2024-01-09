<template>
  <div class="maincontainer">
    <div class="home block">
      <div class="notify-content">
        <div v-for="(ele, i) in resultArray" :key="i">
          <div class="ans notify-ans">
            <p>{{ i + 1 + ") " + ele.questionText }}</p>
            <p>{{ "Ans: " + ele.ans }}</p>
          </div>
        </div>
      </div>
      <div class="mt-20">
        <!-- <ul class="nav">
          <li
            v-for="(msg, i) in messages"
            :key="i"
            class="chat-messages mb-20"
            @click="messageRead(msg)"
          >
            <p class="sender" :class="{ active: msg.status == 'unread' }">
              {{ msg.sender + ":" }}
            </p>
            <p class="sndmsg" :class="{ active: msg.status == 'unread' }">
              {{ msg.message }}
            </p>
          </li>
        </ul> -->
        <div class="message-conversation">
          <div class="message-list">
            <div v-for="msg in messages" :key="msg" class="message nav">
              <div class="message-after-effect"></div>
              <div class="message-content" :class="{adminbackground:msg.sender=='Admin'}">
                <p class="sender" :class="{ active: msg.status == 'unread' }">
                  <span class="mailIcon"><i class="fa fa-envelope"></i>
                  </span>
                  {{ msg.sender + ":" }}
                </p>
                <p class="sndmsg pl-30" :class="{ active: msg.status == 'unread' }">
                  {{ msg.message }}
                </p>
              </div>
              
            </div>
          </div>
        </div>
        <div class="fr mb-20" v-if="!showComment">
          <el-button type="primary" @click="showComment = true" class="w-100"
            >Reply</el-button
          >
        </div>
        <div class="mt-20 mb-20" v-if="showComment">
          <el-input
            v-model="txtmessage"
            placeholder="Enter your comment"
            class="mb-20"
          />
          <el-button
            type="success"
            @click="saveComment"
            class="fr w-100"
            :disabled="txtmessage == ''"
            >Send</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getLocalData } from "@/components/LocalData";

const userType = ref("");
const selUser = ref("");
const showComment = ref(false);
const txtmessage = ref("");
const messages = ref([]);
onMounted(() => {
  getResult();
});

const resultArray = ref([]);
const getResult = () => {
  selUser.value = localStorage.getItem("username");
  userType.value = localStorage.getItem("usertype");
  let qArray = getLocalData("surveyResult");
  let temp = qArray[0][userType.value];
  temp.map((ele) => {
    Object.keys(ele).map((ele1) => {
      if (ele1 == selUser.value) resultArray.value = ele[ele1];
    });
  });
  getNotifications();
};
const getNotifications = () => {
  messages.value = getLocalData("notifications").filter(
    (ele: any) => ele.to == selUser.value
  );
};
const saveComment = () => {
  let obj = {
    sender: selUser.value,
    to: "Admin",
    message: txtmessage.value,
    status: "unread",
  };

  let note = localStorage.getItem("notifications");
  let nArray = [];
  if (note) {
    nArray = JSON.parse(note);
  }
  nArray.push(obj);
  localStorage.setItem("notifications", JSON.stringify(nArray));
  obj.status = "read";
  messages.value.push(obj);
  txtmessage.value = "";
  showComment.value = false;
};

// const messageRead = (index: any) => {
//   messages.value[messages.value.indexOf(index)].status = "read";
//   let temp = getLocalData("notifications");
//   temp.map((mess, i) => {
//     if (mess.message === index.message) temp[i].status = "read";
//   });
//   localStorage.setItem("notifications", JSON.stringify(temp));
// };
</script>
