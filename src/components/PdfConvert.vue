<template>
    <div>
        <el-table :data="assignQuestions" :border="true">
            <el-table-column label="Question" prop="questionText" width="500" sortable/>
            <el-table-column label="Type" prop="questionType" width="100" sortable/>
            <el-table-column label="Options" prop="options" sortable/>
          </el-table>
      <button @click="downloadPDF">Download PDF</button>
    </div>
  </template>
  
  <script lang="ts">
  import jsPDF from 'jspdf';
  
  export default {
    props:{
        assignQuestions:Array,
    },
    methods: {
      downloadPDF() {
        const pdf = new jsPDF();
        const table = this.$el.querySelector('table');
  
        // Get table data
        const tableData = [];
        const rows = table.querySelectorAll('tr');
        rows.forEach((row) => {
          const rowData = [];
          const cells = row.querySelectorAll('td');
          cells.forEach((cell) => {
            rowData.push(cell.innerText);
          });
          tableData.push(rowData);
        });
  
        // Set page title
        const pageTitle = 'PDF Title';
        pdf.text(pageTitle, 15, 15);
  
        // Set table content
        pdf.autoTable({
          startY: 30,
          head: [['Column 1', 'Column 2', 'Column 3']],
          body: tableData,
        });
  
        // Save PDF file
        pdf.save('table.pdf');
      },
    },
  };
  </script>
  