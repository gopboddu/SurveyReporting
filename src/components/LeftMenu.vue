<template>
  <div class="left-menu">
    <div class="sidebar" :class="{ close: barClose }">
      <header>
        <div class="image-text">
          <span class="image">
            <img src="@/assets/logo.svg" alt="" />
          </span>
        </div>
        <i class="bx bx-chevron-right toggle bxicon" @click="closeBar"></i>
      </header>
      <div class="menu-bar">
        <div class="menu">
          <ul class="menu-links">
            <li class="nav-link">
              <router-link to="/profile">
                <i class="bx bxs-user icon"></i>
                <span class="text nav-text">Profile</span>
              </router-link>
            </li>
            <li class="nav-link" v-if="userType == 'Admin'">
              <router-link to="/dashboard">
                <i class="bx bx-home-alt icon"></i>
                <span class="text nav-text">Dashboard</span>
              </router-link>
            </li>
            <li class="nav-link" v-if="userType == 'Admin'">
              <router-link to="/assignment">
                <i class='bx bx-notepad icon'></i>
                <span class="text nav-text">Assignments</span>
              </router-link>
            </li>
            <li class="nav-link" v-if="userType == 'Admin'">
              <router-link to="/surveyquestions">
                <i class='bx bx-add-to-queue icon'></i>
                <span class="text nav-text">Survey Questions</span>
              </router-link>
            </li>
            <li class="nav-link" @click="pageRedirectTo">
              <i class="bx bx-bar-chart-alt-2 icon"></i>
              <span class="text nav-text">{{ userType == 'Admin' ? 'Survey Report' : 'Survey'}}</span>
            </li>
            <li
              class="nav-link"
              v-if="userType == 'Admin'"
              @click="updateNotification"
            >
              <i class="bx bx-bell icon"></i>
              <span class="text nav-text">Notifications</span>
            </li>
            <li class="nav-link" v-if="userType == 'Admin'">
              <router-link to="/createuser">
                <i class='bx bxs-user-account icon'></i>
                <span class="text nav-text">User Creation</span>
              </router-link>
            </li>
            <li class="">
              <router-link to="/">
                <i class="bx bx-log-out icon"></i>
                <span class="text nav-text">Logout</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LeftMenu",
  emits: ["close", "addQuestion"],
  data() {
    return {
      userName: "",
      userType: "",
      barClose: false,
      showsubmenu: false,
    };
  },
  computed: {
    showNotification() {
      return this.$store.state.showNotification;
    },
  },
  mounted() {
    this.userType = localStorage.getItem("usertype") || "";
  },
  methods: {
    closeBar() {
      this.barClose = !this.barClose;
      this.$emit("close", this.barClose);
    },
    updateNotification() {
      if (this.$route.path != "/dashboard") {
        this.$router.push("/dashboard");
        this.$store.commit("updateNotification", true);
      } else this.$store.commit("updateNotification", !this.showNotification);
    },
    addQuestion() {
      this.$emit("addQuestion");
    },
    pageRedirectTo() {
      if (this.userType == "Admin") this.$router.push("/surveyreport");
      else if (this.userType != "Manager")
        this.$router.push("/questions");
    },
  },
});
</script>
