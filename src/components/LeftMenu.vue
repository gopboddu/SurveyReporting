<template>
  <div class="left-menu">
    <div class="sidebar" :class="{ close: barClose }">
      <header>
        <div class="image-text">
          <span class="image">
            <img src="@/assets/logo2.png" alt="" :class="{ 'w-50' : barClose}"/>
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
                <i class="bx bx-notepad icon"></i>
                <span class="text nav-text">Assignments</span>
              </router-link>
            </li>
            <li class="nav-link" v-if="userType == 'Admin'">
              <router-link to="/surveyquestions">
                <i class="bx bx-add-to-queue icon"></i>
                <span class="text nav-text">Survey Questions</span>
              </router-link>
            </li>
            <li class="nav-link" @click="pageRedirectTo">
              <i class="bx bx-bar-chart-alt-2 icon"></i>
              <span class="text nav-text">{{
                userType == "Admin" ? "Survey Report" : "Survey"
              }}</span>
            </li>
            <li
              class="nav-link"
              @click="updateNotification"
            >
              <i class="bx bx-bell icon"></i>
              <span class="text nav-text">Notifications <span v-if="count>0" class="count">{{ count }}</span></span>
            </li>
            <li class="nav-link" v-if="userType == 'Admin'">
              <router-link to="/createuser">
                <i class="bx bxs-user-account icon"></i>
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
  <div class="right-menu" v-if="showNotification">
    <div class="menuone" :class="{ activenote : showNotification }">
      <div class="title">Notifications
        <span  @click="showNotification = false" class="fr crossicon"><i class="fa fa-close"></i></span>
      </div>
     
      <ul class="nav">
        <li
          v-for="(msg, i) in messages.slice().reverse()"
          :key="i"
          class="chat-messages mb-20"
          @click="messageRead(msg)"
        >
          <p class="sender" :class="{ active: msg.status == 'unread' }">
            {{ msg.sender + ":" }}
            <span class="fr mailicon" v-if="msg.status == 'unread'"><i class="fa fa-solid fa-envelope"></i></span>
            <span class="fr mailicon" v-else><i class="fa fa-solid fa-envelope-open"></i></span>
          </p>
          <p class="sndmsg" :class="{ active: msg.status == 'unread' }">
            {{ msg.message }}
          </p> 
          <div class="mt-20 pr-20"><hr color="0079AF"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getLocalData } from "./LocalData";
export default defineComponent({
  name: "LeftMenu",
  emits: ["close", "addQuestion"],
  data() {
    return {
      userName: "",
      userType: "",
      barClose: false,
      showNotification: false,
      messages: [],
      count: 0,
    };
  },
  mounted() {
    this.userType = localStorage.getItem("usertype") || "";
    this.messages = getLocalData("notifications").filter(
      (ele: any) => ele.to == this.userType
    );
    this.count = this.messages.filter(
      (item: any) => item.status === "unread"
    ).length;
  },
  methods: {
    closeBar() {
      this.barClose = !this.barClose;
      this.$emit("close", this.barClose);
    },
    updateNotification() {
      if (this.userType == "Admin") this.showNotification = true;
      else this.$router.push("/notifications");
    },
    addQuestion() {
      this.$emit("addQuestion");
    },
    pageRedirectTo() {
      if (this.userType == "Admin") this.$router.push("/surveyreport");
      else if (this.userType != "Manager") this.$router.push("/questions");
    },
    messageRead(index: any) {
      this.messages[this.messages.indexOf(index)].status = "read";
      this.count = this.count - 1;
      let temp = getLocalData("notifications");
      temp.map((mess, i) => {
        if (mess.message === index.message) temp[i].status = "read";
      });
      localStorage.setItem("notifications", JSON.stringify(temp));
    },
  },
});
</script>

<style scoped>
/* RightMenu */
@mixin vertical-align($position) {
  position: $position;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

@mixin all-transition($time) {
  transition: all $time;
  -webkit-transition: all $time;
}
body {
  margin: 0;
  font-family: "Muli", sans-serif;
}
.menuone {
  font-weight: 100;
  background: #efefef;
  width: 300px;
  height: 100vh;
  padding-left: 5px;
  position: fixed;
  z-index: 100;
  -webkit-box-shadow: -3px 0px 5px 0px rgba(0, 0, 0, 0.2);
  box-shadow: -3px 0px 5px 0px rgba(0, 0, 0, 0.2);
  right: -300px;
  @include all-transition(0.3s);
  color: #222;
  overflow-y: auto;

  .title {
    padding: 20px;
    font-weight: 700;
    font-size: 15px;
  }

  .nav {
    @include vertical-align(absolute);
    font-weight: 100;
    padding-left: 15px;
  }
}
.crossicon {
  font-size: 18px;
  cursor: pointer;
}
.activenote {
  transform: translate3d(-300px, 0, 0);
  animation-timing-function: 2s ease-in;
}
.mailicon {
  padding-right: 20px;
  cursor: pointer;
}
</style>
