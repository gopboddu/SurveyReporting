<template>
  <div style="width: 500px">
    <DoughnutChart v-bind="doughnutChartProps" />
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, onMounted, ref } from "vue";
import { DoughnutChart, useDoughnutChart } from "vue-chart-3";
import { Chart, type ChartData, type ChartOptions, registerables } from "chart.js";

Chart.register(...registerables);
export default defineComponent({
  name: "ChartComp",
  components: { DoughnutChart },
  //   props: {
  //     dataValues: Array,
  //     dataLabels: Array
  // },
  setup() {
    const dataValues = ref([]);
    const dataLabels = ref(["Makeup", "Lighting", "Costumes", "Production", "Camera"]);
    const toggleLegend = ref(true);
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
        let qString = localStorage.getItem("surveyResult");
        let qArray = [];
        if (qString) {
          qArray = JSON.parse(qString);
        }
        dataLabels.value.map((ele)=>{
          dataValues.value.push(qArray[0][ele].length)
        })
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
      // dataValues.value = shuffle(dataValues.value);
      dataValues.value.push(index.value);
      dataLabels.value.push("Other" + index.value);
      console.log(dataValues.value);
      index.value++;
    }

    function switchLegend() {
      toggleLegend.value = !toggleLegend.value;
    }

    return {
      shuffleData,
      switchLegend,
      testData,
      options,
      doughnutChartRef,
      doughnutChartProps,
    };
  },
});
</script>
