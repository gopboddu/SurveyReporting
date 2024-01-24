<template>
  <div class="maincontainer t-20">
    <div class="page_title_left">
      <h1 class="dashtitle">Survey Questions</h1>
    </div>
    <div class="addquestion" v-if="showQuestionBtn">
      <el-button round class="addbtn" @click="showQuestion = true"
        >Add Question</el-button
      >
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
      <div class="tabcontent">
        <div class="questable">
          <el-input
            v-model="search"
            size="small"
            placeholder="Type to search"
            class="searchbox"
          />
          <el-table
            :data="filterTableData"
            :border="true"
            ref="tableRef"
            id="html2Pdf"
          >
            <el-table-column
              label="Question"
              prop="questionText"
              width="500"
              sortable
            />
            <el-table-column
              label="Type"
              prop="questionType"
              width="150"
              sortable
              :filters="qType"
              :filter-method="filterHandler"
            />
            <el-table-column label="Options" prop="options" sortable />
          </el-table>
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
import { onMounted, ref, computed } from "vue";
import AddQuestion from "@/components/QuestionPage.vue";
import type { TableColumnCtx, TableInstance } from "element-plus";

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
const search = ref("");
const qType = ref([
  { value: "single", text: "Single" },
  { value: "mline", text: "Multi Line" },
  { value: "msl", text: "Multi Select" },
  { value: "boolean", text: "Boolean" },
]);
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

const filterTableData = computed(() =>
  resultArray.value.filter(
    (data) =>
      !search.value ||
      data.questionText.toLowerCase().includes(search.value.toLowerCase())
  )
);

interface Item {
  questionText: string;
  questionType: string;
  options: string;
}

const tableRef = ref<TableInstance>();

const filterHandler = (
  value: string,
  row: Item,
  column: TableColumnCtx<Item>
) => {
  const property = column["property"];
  return row[property] === value;
};
</script>
