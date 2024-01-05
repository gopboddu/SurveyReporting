<template>
  <div class="maincontainer">
    <div class="">
      <div
        class="chartcontainer"
        v-if="userType == 'Admin' || userType == 'Manager'"
      >
        <ChartComp :chartValue="'assignments'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ChartComp from "@/components/Chart/ChartComp.vue";

export default {
  components: {
    ChartComp,
  },
  data() {
    return {
      userType: "",
      username: "",
      showQuestion: false,
      questionpopup: false,
      questionType: "",
    };
  },
  mounted() {
    this.userType = localStorage.getItem("usertype") || "";
    this.username = localStorage.getItem("username") || "";
  },
};
</script>
