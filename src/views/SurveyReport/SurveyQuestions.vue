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
      <div class="tabcontent">
        <div v-for="(res, i) in resultArray" :key="i" class="tab_content">
          <div>
            <p class="ques">{{ i + 1 + ") " + res.questionText }}</p>
            <p class="ques ml-10">{{ "Question Type: " + res.questionType }}</p>
            <p class="ques ml-10" v-if="res.options.length > 0">
              {{ "Options: " + res.options.join() }}
            </p>
          </div>
        </div>
      </div>
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
  </div>
  <div class="qpopup" v-if="questionpopup">
    <AddQuestion @close="closePopup" :questionType="questionType" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import AddQuestion from "@/components/QuestionPage.vue";

const tabs = ref([
  { id: 1, value: "Makeup" },
  { id: 2, value: "Lighting" },
  { id: 3, value: "Costumes" },
  { id: 4, value: "Production" },
  { id: 5, value: "Camera" },
]);
const showTab = ref("");
const showQuestionBtn = ref(false);
const questionpopup = ref(false);
const showQuestion = ref(false);
const questionType = ref("");
onMounted(() => {
  let userType = localStorage.getItem("usertype") || "";
  if (userType == "Admin") showQuestionBtn.value = true;
  else showQuestionBtn.value = false;

  updateTabContent("Makeup");
});
const resultArray = ref([]);
const updateTabContent = (tab: any) => {
  showTab.value = tab;
  let qString = localStorage.getItem("questions");
  let qArray = [];
  if (qString) {
    qArray = JSON.parse(qString);
  }
  resultArray.value = qArray.filter((item: any) => item.category === tab);
};

const addQuestionPopup = (type: any) => {
  showQuestion.value = false;
  questionpopup.value = true;
  questionType.value = type;
};
const closePopup = () => {
  questionpopup.value = false;
};
</script>
