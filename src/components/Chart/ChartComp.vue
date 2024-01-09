<template>
  <div class="w-400">
    <span class="signtitle mb-0">{{ showResult ? "Survey Results" :"Assignments"}}</span>
    <DoughnutChart v-bind="doughnutChartProps" @click="updateChart" />
  </div>
  <el-button type="primary" class="fr w-100 mb-20" @click="updateResult" v-if="showResult">Back</el-button>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { DoughnutChart, useDoughnutChart } from "vue-chart-3";
import { Chart, type ChartData, type ChartOptions, registerables } from "chart.js";
import { getLocalData } from "../LocalData";

Chart.register(...registerables);
export default defineComponent({
  name: "ChartComp",
  components: { DoughnutChart },
    props: {
      chartValue : String,
  },
  setup() {
    const dataValues = ref([]);
    const dataLabels = ref(["Makeup", "Lighting", "Costumes", "Production", "Camera"]);
    const toggleLegend = ref(true);
    const showResult = ref(false);
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
      updateChart,
      updateResult,
      showResult
    };
  },
});
</script>
