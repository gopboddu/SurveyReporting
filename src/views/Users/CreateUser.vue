<template>
  <div class="maincontainer t-20">
    <div class="page_title_left">
      <h1 class="dashtitle">User Creation</h1>
    </div>
    <div class="addquestion"></div>
    <div class="home block navborder">
      <div class="selectuser mt-40">
        <label class="label-width">Select Category:</label>
        <el-select
          v-model="user.category"
          placeholder="Select Category"
          size="large"
          @change="getUsersList"
        >
          <el-option key="" label="Select Category" value="" />
          <el-option
            v-for="item in category"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <div
          class="invalid-text msgError"
          v-if="submitted && user.category == ''"
        >
          Category field is required.
        </div>
      </div>
      <div class="selectuser mb-20">
        <label class="label-width">User Id:</label>
        <el-input v-model="user.userID" class="width50" />
        <div
          class="invalid-text msgError"
          v-if="submitted && user.userID == ''"
        >
          User ID field is required.
        </div>
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
        <div
          class="invalid-text msgError"
          v-if="submitted && user.password == ''"
        >
          Password field is required.
        </div>
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
        <div
          class="invalid-text msgError"
          v-if="submitted && user.assignment == ''"
        >
          Assignment field is required.
        </div>
      </div>
      <el-button
        type="success"
        class="mt-20"
        @click="createUser"
        :disabled="
          user.userID == '' ||
          user.category == '' ||
          user.password == '' ||
          user.assignment == ''
        "
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
import { getLocalData } from "@/components/LocalData";
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
const submitted = ref(false);
const usersList = ref([]);

onMounted(() => {
  assignments.value = getLocalData("assignments");
  passwordGenerate();
});

const createUser = () => {
  if (
    user.value.userID == "" ||
    user.value.category == "" ||
    user.value.password == "" ||
    user.value.assignment == ""
  )
    submitted.value = true;
  else {
    let obj = {
      userid: user.value.userID,
      usertype: user.value.category,
      password: user.value.password,
      assignment: user.value.assignment,
      path: "/questions",
    };

    usersList.value.push(obj);
    localStorage.setItem("users", JSON.stringify(usersList.value));
    showConfirm.value = true;
    user.value.userID = "";
    user.value.password = "";
    user.value.category = "";
    user.value.assignment = "";
  }
};
const getUsersList = () => {
  usersList.value = getLocalData("users");
  let temp = usersList.value.filter((users) => users.usertype === user.value.category)
  user.value.userID = user.value.category.toLowerCase()+((temp.length+1)<10?'0'+(temp.length+1):(temp.length+1));
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
  passwordGenerate();
  submitted.value = false;
};
</script>
