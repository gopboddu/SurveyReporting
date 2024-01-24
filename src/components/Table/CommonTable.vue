<template>
  <div id="html2Pdf">
    <div class="printonly" v-if="printenable">
      <img src="@/assets/logo2.png" height="50px" width="80px" alt="" />
      <h1 class="signtitle printTitle">Server Table</h1>
    </div>
    <div class="questable">
      <el-input
        v-if="searchField != '' && !printenable"
        v-model="search"
        size="small"
        placeholder="Type to search"
        class="searchbox"
      />
      <el-table :data="filterTableData" :border="true" id="html2Pdf" ref="tableRef">
        <el-table-column
          type="index"
          label="Sl.No"
          :index="indexMethod"
          width="80"
        />
        <el-table-column prop="assignment" label="Assignment Name" sortable />
        <el-table-column
          prop="categeory"
          label="Category"
          sortable
          :filters="category"
          :filter-method="filterHandler"
        />
        <el-table-column label="Action" width="100" :align="'center'">
          <template #default="scope" v-if="props.action">
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
      <div class="pagination flex" v-if="props.tableDataList?.length > 10">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="props.tableDataList.length"
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
    </div>
    <div v-if="showOptions" class="downloadtype">
      <ul class="downul">
        <li @click="downloadCSV">CSV</li>
        <li @click="downloadExcel">Excel</li>
        <li @click="downloadPDF">PDf</li>
      </ul>
    </div>
  </div>
  <div class="confirmbox" v-if="showSuccessPopup">
    <div class="confirm-content questab">
      <div class="success-popup">
        File downloaded successfully!
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import html2pdf from "html2pdf.js";
import type { TableColumnCtx, TableInstance } from 'element-plus'

const search = ref("");
const tableData = ref([]);
const pageCount = ref(1);
const showSuccessPopup = ref(false);
const showOptions = ref(false);
const printenable = ref(false);
const category = ref([
  { value: "Makeup", text: "Makeup" },
  { value: "Lighting", text: "Lighting" },
  { value: "Costumes", text: "Costumes" },
  { value: "Production", text: "Production" },
  { value: "Camera", text: "Camera" },
]);
const props = defineProps({
  tableDataList: Array,
  searchField: String,
  action: Boolean,
});
const emit = defineEmits(["downloadCSV", "downloadExcel", "view"]);
onMounted(() => {
  tableData.value = props.tableDataList.slice(0, 10);
});

const indexMethod = (index: number) => {
  return (pageCount.value - 1) * 10 + index + 1;
};

const downloadPDF = () => {
  printenable.value = true;
  showOptions.value = false;
  if (printenable.value) {
    const element = document.getElementById("html2Pdf");
    const opt = {
      margin: 0.5,
      filename: `assignmentList.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    var worker = html2pdf().set(opt).from(element).save().then(() => {
          const url = 'assignmentList.pdf'; 
          const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'test.pdf');
                        document.body.appendChild(link);
                        link.click();
        });;
    
    if (worker) {
      showSuccessPopup.value = true;
      setTimeout(() => {
        showSuccessPopup.value = false;
        printenable.value = false;
      }, 3000);
    }
  }
};

const handleEdit = (data: any) => {
  emit("view", data);
};

const downloadCSV = () => {
  emit("downloadCSV");
};
const downloadExcel = () => {
  emit("downloadExcel");
};

const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data[props.searchField].toLowerCase().includes(search.value.toLowerCase())
  )
);
const updatePage = (ev: any) => {
  pageCount.value = ev;
  tableData.value = props.tableDataList.slice(ev * 10 - 10, ev * 10);
};

interface Item {
  assignment: string
  category: string
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
