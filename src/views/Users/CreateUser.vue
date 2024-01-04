import type { log } from 'console'; import type { userInfo } from 'os'; import
type { onMounted } from 'vue'; import type { onMounted } from 'vue';
<template>
  <div class="maincontainer">
    <div class="home block">
      <div class="selectuser mb-20">
        <label class="label-width">User Id:</label>
        <el-input v-model="user.userID" class="width50" />
      </div>
      <div class="selectuser mb-20">
        <label class="label-width">Password:</label>
        <el-input v-model="user.password" type="text" class="width50">
          <template #append
            ><i
              @click="passwordGenerate"
              class="fa fa-refresh"
              aria-hidden="true"
            ></i></template
        ></el-input>
      </div>

      <div class="selectuser">
        <label class="label-width">Select Category:</label>
        <el-select
          v-model="user.category"
          placeholder="Select Category"
          size="large"
        >
          <el-option key="" label="Select Category" value="" />
          <el-option
            v-for="item in category"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="selectuser mb-40">
        <label class="label-width">Select Assignment:</label>
        <el-select
          v-model="user.assignment"
          placeholder="Select Assignment"
          size="large"
        >
          <el-option key="" label="Select Assignment" value="" />
          <el-option
            v-for="item in assignments"
            :key="item.assignment"
            :label="item.assignment"
            :value="item.assignment"
          />
        </el-select>
      </div>
      <el-button type="success" class="mt-20" @click="createUser"
        >Save</el-button
      >
    </div>
  </div>
  <div class="confirmbox" v-if="showConfirm">
    <div class="confirm-content">
      <div class="confirm-body">
        <h3 class="mb-20">
          User Created successfully !
        </h3>
        <el-button type="success" class="lbutton" @click="closePopup">
          Ok
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
const user = ref({
  userID: "",
  password: "",
  assignment: "",
  category: "",
});

const category = ref([
  "Makeup",
  "Lighting",
  "Costumes",
  "Production",
  "Camera",
]);
const assignments = ref([]);
const showConfirm = ref(false);

onMounted(() => {
  let assment = localStorage.getItem("assignments");
  if (assment) {
    assignments.value = JSON.parse(assment);
  }
  passwordGenerate();
});

const createUser = () => {
  let obj = {
    userid: user.value.userID,
    usertype: user.value.category,
    password: user.value.password,
    assignment: user.value.assignment,
    path: "/questions",
  };

  let users = localStorage.getItem("users");
  let aArray = [];
  if (users) {
    aArray = JSON.parse(users);
  }
  aArray.push(obj);
  localStorage.setItem("users", JSON.stringify(aArray));
  showConfirm.value = true;
  user.value.userID = "";
  user.value.password = "";
  user.value.category = "";
  user.value.assignment = "";
};

const passwordGenerate = () => {
  let CharacterSet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%&*$#^<>~@|";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += CharacterSet.charAt(
      Math.floor(Math.random() * CharacterSet.length)
    );
  }
  user.value.password = password;
};

const closePopup = () => {
    showConfirm.value = false;
    passwordGenerate()
}
</script>
