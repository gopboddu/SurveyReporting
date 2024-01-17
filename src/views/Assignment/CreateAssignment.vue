<template>
  <div class="maincontainer t-20">
    <div class="page_title_left">
      <h1 class="dashtitle">Assignments</h1>
    </div>
    <div class="addquestion">
      <el-button round class="addbtn" @click="showAdd = true"
        >New Assignmnet</el-button
      >
    </div>
    <div class="home block navborder">
      <!-- <div class="questable">
        <el-input
          v-model="search"
          size="small"
          placeholder="Type to search"
          class="searchbox"
        />
        <el-table :data="filterTableData" :border="true" id="html2Pdf">
          <h1>Survey Report</h1>
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
        <div class="pagination flex">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="assignmentsList.length"
            @change="updatePage"
          />
          <div class="downloadbtn">
            <el-button
              type="primary"
              class="w-100 fr"
              size="small"
              @click="showOptions = !showOptions"
              >Download</el-button
            >
          </div>
        </div>
      </div> -->
      <!-- <div v-if="showOptions" class="downloadtype">
        <ul class="downul">
          <li @click="downloadCSV">CSV</li>
          <li @click="downloadExcel">Excel</li>
          <li @click="downloadPDF">PDf</li>
        </ul>
      </div> -->

      <CommonTable
        :tableDataList="assignmentsList"
        :searchField="'assignment'"
        :action="true"
        v-if="assignmentsList.length > 0"
        @view="handleEdit"
        @downloadCSV="downloadCSV"
        @downloadExcel="downloadExcel"
      />
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
        <div class="questable">
          <el-table :data="assignQuestions" :border="true">
            <el-table-column
              label="Question"
              prop="questionText"
              width="500"
              sortable
            />
            <el-table-column
              label="Type"
              prop="questionType"
              width="100"
              sortable
            />
            <el-table-column label="Options" prop="options" sortable />
          </el-table>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showSuccessPopup" class="success-popup">
    File downloaded successfully!
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import VueMultiselect from "vue-multiselect";
import { getLocalData } from "@/components/LocalData";
import CommonTable from "@/components/Table/CommonTable.vue";
import html2pdf from "html2pdf.js";
import ExcelJS from "exceljs";

const assignmentName = ref("");
const selcategeory = ref("");
const search = ref("");
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
const tableData = ref([]);
const questionsList = ref([]);
const submitted = ref(false);
const showAssignment = ref(false);
const assignQuestions = ref([]);
const assignName = ref([]);
const pageCount = ref(1);
const showSuccessPopup = ref(false);
const showOptions = ref(false);

onMounted(() => {
  questionsList.value = getLocalData("questions");
  assignmentsList.value = getLocalData("assignments");
  tableData.value = assignmentsList.value.slice(0, 10);
});

const getQuestions = (tab) => {
  questionsArray.value = questionsList.value.filter(
    (item: any) => item.category === tab
  );
};

const downloadCSV = () => {
  showOptions.value = false;
  const data = assignmentsList.value;
  let csvContent = "data:text/csv;charset=utf-8,";
  const headers = ["Assignment Name", "Question", "Category", "Options"];
  csvContent += headers.join(",") + "\n";

  data.forEach((item) => {
    let assignQues = [];
    item.questions.map((element: any) => {
      assignQues.push(
        questionsList.value.find((ques: any) => ques.qID == element)
      );
    });
    assignQues.map((childrow) => {
      const row = [
        item.assignment,
        childrow.qTtitle,
        childrow.category,
        childrow.options.join(" "),
      ];
      csvContent += row.join(",") + "\n";
    });
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "AssignmentsList.csv");
  document.body.appendChild(link);
  link.click();
  showconfirm();
};
const downloadExcel = () => {
  showOptions.value = false;
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");
  // Set up the headers
  worksheet.mergeCells("A1:E1");
  worksheet.getCell("A1").value = "Survey Report";
  worksheet.getCell("A1").alignment = {
    vertical: "middle",
    horizontal: "center",
  };
  worksheet.getCell("A2").value = "SL.NO";
  worksheet.getCell("B2").value = "Assignment Name";

  // Populate the data
  let index = 2;
  assignmentsList.value.map((item) => {
    worksheet.getCell(`A${index}`).value = index - 1;
    worksheet.getCell(`B${index}`).value = item.assignment;
    worksheet.getCell(`C${index}`).value = "Questions";
    worksheet.getCell(`D${index}`).value = "Category";
    worksheet.getCell(`E${index}`).value = "Options";
    worksheet.getCell(`C${index}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "dddddd" },
      bgColor: { argb: "FF0000FF" },
    };
    worksheet.getCell(`D${index}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "dddddd" },
      bgColor: { argb: "FF0000FF" },
    };
    worksheet.getCell(`E${index}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "dddddd" },
      bgColor: { argb: "FF0000FF" },
    };
    let assignQues = [];
    item.questions.map((element: any) => {
      assignQues.push(
        questionsList.value.find((ques: any) => ques.qID == element)
      );
    });
    let n = 0;
    assignQues.forEach((child, i) => {
      worksheet.getCell(`C${index + i + 1}`).value = child.qTtitle;
      worksheet.getCell(`D${index + i + 1}`).value = child.category;
      worksheet.getCell(`E${index + i + 1}`).value = child.options.join(" ");
      n = i + 1;
    });
    worksheet.mergeCells(`B${index}:B${index + n - 1}`);
    worksheet.getCell(`B${index}`).alignment = {
      vertical: "top",
      horizontal: "left",
    };
    index += n;
  });
  // Auto-fit the columns
  worksheet.columns.forEach((column) => {
    column.width = 15;
  });
  // Generate the Excel file
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "AssignmentsList.xlsx";
    link.click();
    showconfirm();
  });
};

const showconfirm = () => {
  showSuccessPopup.value = true;
  setTimeout(() => {
    showSuccessPopup.value = false;
  }, 3000);
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

const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.assignment.toLowerCase().includes(search.value.toLowerCase())
  )
);
const updatePage = (ev: any) => {
  pageCount.value = ev;
  tableData.value = assignmentsList.value.slice(ev * 10 - 10, ev * 10);
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scopped>
.success-popup {
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  background-color: #32cd32;
  color: white;
  font-weight: bold;
}

/* .multiselect__tag {
  display : none !important;
} */
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
