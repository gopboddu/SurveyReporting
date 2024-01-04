<template>
  <div class="login">
    <div class="logincontainer">
      <label class="signtitle">Sign In</label>
      <div class="mb-20">
        <el-input
          v-model="username"
          placeholder="Enter Username or Email ID"
          class="form-control"
          @input="checkValid"
        />
        <div class="invalid-text" v-if="submitted && username == ''">
          Username field is required.
        </div>
      </div>
      <div class="mb-20">
        <el-input
          v-model="password"
          type="password"
          placeholder="Enter your password"
          show-password
          class="form-control"
          @input="checkValid"
        />
        <div class="invalid-text" v-if="submitted && password == ''">
          Password field is required.
        </div>
        <div class="invalid-text" v-if="errorMessage">
          Username & Password mismatched.
        </div>
      </div>
      <div class="btncontainer">
        <el-button type="success" color="#2A387A" @click="onSubmit"
          >Login</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const submitted = ref(false);
const errorMessage = ref(false);
const users = ref([
  {
    userid: "admin",
    usertype: "Admin",
    password: "password",
    path: "/dashboard",
  },
  {
    userid: "manager",
    usertype: "Manager",
    password: "password",
    path: "/dashboard",
  },
]);
const checkValid = () => {
  errorMessage.value = false;
  submitted.value = false;
};
onMounted(() => {
  let qString = localStorage.getItem("users");
  let userArray = [];
  if (qString) {
    userArray = JSON.parse(qString);
  }
  users.value = [...users.value, ...userArray];

  let surveyResult = localStorage.getItem("surveyResult");
  if (!surveyResult) {
    let qArray = [
      { Makeup: [], Lighting: [], Production: [], Costumes: [], Camera: [] },
    ];
    localStorage.setItem("surveyResult", JSON.stringify(qArray));
  }
});

const onSubmit = () => {
  if (username.value == "" || password.value == "") submitted.value = true;
  else {
    errorMessage.value = false;
    // if(username.value == "Admin" || username.value == 'Manager')
    let user = users.value.find(
      (ele) => ele.userid === username.value && ele.password === password.value
    );
    if (user) {
      router.push(user.path);
      localStorage.setItem("usertype", user.usertype);
      localStorage.setItem("username", username.value);
    } else errorMessage.value = true;
  }
};
</script>
