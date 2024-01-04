<template>
  <div class="maincontainer">
    <div class="addquestion" v-if="showQuestionBtn">
      <el-button
        type="success"
        round
        class="addbtn"
        @click="showQuestion = true"
        >Add Question</el-button
      >
    </div>
    <div class="home">
      <div
        class="chartcontainer"
        v-if="userType == 'Admin' || userType == 'Manager'"
      >
        <ChartComp />
      </div>

      <div class="confirmbox" v-if="showQuestion">
        <div class="confirm-content">
          <div class="questioncontainer">
            <div class="questbox" @click="addQuestionPopup('single')">
              <div class="questiontext">
                <p><i class="fa fa-envelope-open-o"></i></p>
                Single Choice
              </div>
            </div>
            <div class="questbox" @click="addQuestionPopup('msl')">
              <div class="questiontext">
                <p><i class="fa fa-solid fa-check"></i></p>
                Multiple Choice
              </div>
            </div>
            <br />
            <div class="questbox" @click="addQuestionPopup('boolean')">
              <div class="questiontext">
                <p><i class="fa fa-solid fa-star"></i></p>
                Boolean
              </div>
            </div>
            <div class="questbox" @click="addQuestionPopup('mline')">
              <div class="questiontext">
                <p><i class="fa fa-solid fa-clipboard"></i></p>
                Text Area
              </div>
            </div>
            <div></div>
            <el-button type="warning" @click="showQuestion = false"
              >Cancel</el-button
            >
          </div>
        </div>
      </div>
      <div class="qpopup" v-if="questionpopup">
        <AddQuestion @close="closePopup" :questionType="questionType" />
      </div>
    </div>
    <Chat :message="messages" v-if="messages.length>0 && $store.state.showNotification"/>
  </div>
</template>

<script lang="ts">
import ChartComp from "@/components/Chart/ChartComp.vue";
import AddQuestion from "@/components/QuestionPage.vue";
import Chat from "@/components/Chat/ChatWindow.vue";
export default {
  components: {
    ChartComp,
    AddQuestion,
    Chat,
  },
  data() {
    return {
      userType: "",
      username:"",
      showQuestion: false,
      showQuestionBtn: false,
      questionpopup: false,
      questionType: "",
      messages: [],
    };
  },
  mounted() {
    this.userType = localStorage.getItem("usertype") || "";
    this.username = localStorage.getItem("username") || "";
    if (this.userType == "Admin") this.showQuestionBtn = true;
    else this.showQuestionBtn = false;
    let notifications = localStorage.getItem("notifications");
    if(notifications)
      this.messages = JSON.parse(notifications);
    this.messages=this.messages.filter((ele)=> ele.to=='Admin');
  },
  methods: {
    addQuestionPopup(type: any) {
      this.showQuestion = false;
      this.questionpopup = true;
      this.questionType = type;
    },
    closePopup() {
      this.questionpopup = false;
    },
  },
};
</script>
