<template>
  <div class="w-400">
    <span class="signtitle mb-0 left--50">{{
      showResult ? "Survey Results" : "Assignments"
    }}</span>
    <el-select
      v-model="chartType"
      class="m-2 charttypedropdown"
      placeholder="Select"
      size="large"
      style="width: 140px;"
    >
      <el-option
        v-for="item in chartOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <DoughnutChart
      v-bind="doughnutChartProps"
      @click="updateChart"
      v-if="chartType == 'donut'"
    />
    <BarChart
      v-bind="barChartProps"
      @click="updateChart"
      v-if="chartType == 'bar'"
    />
    <PieChart
      v-bind="pieChartProps"
      @click="updateChart"
      v-if="chartType == 'pie'"
    />
    <LineChart
      v-bind="lineChartProps"
      @click="updateChart"
      v-if="chartType == 'line'"
    />
  </div>
  <el-button
    type="primary"
    class="fr w-100 mb-20"
    @click="updateResult"
    v-if="showResult"
    >Back</el-button
  >
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { DoughnutChart, useDoughnutChart, BarChart, useBarChart, PieChart, usePieChart, LineChart, useLineChart } from "vue-chart-3";
import { Chart, type ChartData, type ChartOptions, registerables } from "chart.js";
import { getLocalData } from "../LocalData";

Chart.register(...registerables);
export default defineComponent({
  name: "ChartComp",
  components: { DoughnutChart, BarChart, PieChart, LineChart },
  //   props: {
  //     chartType : String,
  // },
  setup() {
    const dataValues = ref([]);
    const dataLabels = ref(["Makeup", "Lighting", "Costumes", "Production", "Camera"]);
    const toggleLegend = ref(true);
    const showResult = ref(false);
    const chartType = ref("donut");
    const chartOptions = ref([
      {"value":"donut", "label":"Donut Chart"},
      {"value":"bar", "label":"Bar Chart"},
      {"value":"pie", "label":"Pie Chart"},
      {"value":"line", "label":"Line Chart"},
    ])
    const testData = computed<ChartData<"doughnut">>(() => ({
      labels: dataLabels.value,
      datasets: [
        {
          data: dataValues.value,
          backgroundColor: [
            "#77CEFF",
            "#0079AF",
            "#123E6B",
            "#97B0C4",
            "#A5C8ED",
          ],
        },
      ],
    }));
    onMounted(() => {
      updateResult();
    })
    const options = computed<ChartOptions<"doughnut">>(() => ({
      scales: {
        myScale: {
          type: "logarithmic",
          position: toggleLegend.value ? "left" : "right",
        },
      },
      plugins: {
        legend: {
          position: toggleLegend.value ? "top" : "bottom",
        },
        title: {
          display: true,
          text: "",
        },
      },
    }));

    const { doughnutChartProps, doughnutChartRef } = useDoughnutChart({
      chartData: testData,
      options,
    });

    const { barChartProps, barChartRef } = useBarChart({
      chartData: testData,
      options,
    });

    const { pieChartProps, pieChartRef } = usePieChart({
      chartData: testData,
      options,
    });

    const { lineChartProps, lineChartRef } = useLineChart({
      chartData: testData,
      options,
    });
    
    let index = ref(20);

    function shuffleData() {
      dataValues.value.push(index.value);
      dataLabels.value.push("Other" + index.value);
      index.value++;
    }

    function switchLegend() {
      toggleLegend.value = !toggleLegend.value;
    }

    function  updateChart(){
      dataValues.value = [];
    let qArray = getLocalData("surveyResult");
        dataLabels.value.map((ele)=>{
          dataValues.value.push(qArray[0][ele].length)
        })
        showResult.value = true;
    }

    function  updateResult(){
      dataValues.value = [];
      let qArray = getLocalData("assignments");
        dataLabels.value.map((ele)=>{
          dataValues.value.push(qArray.filter((item) => item.categeory === ele).length)
        })
      showResult.value = false;
    }
    return {
      shuffleData,
      switchLegend,
      testData,
      options,
      doughnutChartRef,
      doughnutChartProps,
      barChartProps,
      barChartRef,
      pieChartProps,
      pieChartRef,
      lineChartProps,
      lineChartRef,
      updateChart,
      updateResult,
      showResult,
      chartOptions,
      chartType
    };
  },
});
</script>
