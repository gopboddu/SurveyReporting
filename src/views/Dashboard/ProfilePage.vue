<template>
  <div class="maincontainer">
    <div class="home">
      <div class="userInfo">
        <div class="leftpart">
          <img src="@/assets/about-me.jpg" alt="" class="profileimg" />
          <h1 class="profilename">John Toe</h1>
        </div>
        <div class="rightpart">
          <table>
            <tr>
              <td>ID</td>
              <td>: {{ userType }}</td>
            </tr>
            <tr>
              <td>Role</td>
              <td>: {{ username }}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>: Johntoe@test.com</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>: 9999999999</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
const userType = ref("");
const username = ref("");
onMounted(() => {
  userType.value = localStorage.getItem("usertype") || "";
  username.value = localStorage.getItem("username") || "";
});
</script>
