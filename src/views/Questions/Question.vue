<template>
  <div class="maincontainer textleft">
    <div class="home">
      <div v-if="showQuestions">
        <div class="surveypart" v-if="questionForm.length > 0">
          <el-form
            ref="ruleFormRef"
            :model="questionForm"
            class="demo-ruleForm"
            :size="formSize"
            status-icon
          >
            <div class="mb-20">
              <label class="questionline">{{
                index+1 +") "+ questionForm[index].questionText
              }}</label>
            </div>
            <div
              class="mb-20"
              v-if="questionForm[index].questionType === 'msl'"
            >
              <el-checkbox-group v-model="result[index].ans">
                <div
                  class="qoptions"
                  v-for="(option, i) in questionForm[index].options"
                  :key="i"
                >
                  <el-checkbox :label="option" :value="option" name="option" />
                </div>
              </el-checkbox-group>
            </div>
            <div
              class="mb-20"
              v-if="
                questionForm[index].questionType === 'single' ||
                questionForm[index].questionType === 'boolean'
              "
            >
              <el-radio-group v-model="result[index].ans">
                <div
                  class="qoptions"
                  v-for="(option, i) in questionForm[index].options"
                  :key="i"
                >
                  <el-radio :label="option" :value="option" name="option" />
                </div>
              </el-radio-group>
            </div>
            <div
              class="mb-20"
              v-if="questionForm[index].questionType === 'mline'"
            >
              <el-input
                v-model="result[index].ans"
                maxlength="200"
                placeholder="Answer"
                show-word-limit
                type="text"
                class="form-control"
              />
            </div>
            <div class="mb-20" v-if="questionForm[index]?.isrequired">
              <label class="el-button--primary">
                <input
                  type="file"
                  id="customFile"
                  class="customfile"
                  accept=".pdf,.jpg,.png"
                  @input="fileUpload"
                />
                <el-button type="primary"
                  >Click Here to upload a file</el-button
                >
                <!-- <p class="mb-2"><strong>Click Here</strong> to upload a file</p> -->
              </label>
            </div>
            <div class="mb-20" v-if="fileName != ''">
              <span>{{ fileName }}</span>
              <span class="fr handpointer" @click="fileReset"
                ><i class="fa fa-close"></i
              ></span>
            </div>
            <el-form-item id="question mb-20">
              <el-button-group>
                <el-button
                  type="primary"
                  :icon="ArrowLeft"
                  class="lbutton"
                  @click="prevQuestion"
                  :disabled="index == 0"
                  >Previous Page</el-button
                >
                <el-button
                  type="primary"
                  class="rbutton"
                  @click="nextQuestion"
                  v-if="index != questionForm.length - 1"
                >
                  Next Page<el-icon class="el-icon--right"
                    ><ArrowRight
                  /></el-icon>
                </el-button>
                <el-button
                  type="success"
                  class="rbutton"
                  @click="showConfirm = true"
                  v-else
                >
                  Submit
                </el-button>
              </el-button-group>
            </el-form-item>

            <div class="fr mt-20 mb-20" v-if="!showComment">
              <el-button type="primary" @click="showComment = true"
                >Add Comment</el-button
              >
            </div>
            <div class="mt-20 mb-20" v-else>
              <el-input
                v-model="txtmessage"
                placeholder="Enter your comment"
                class="mb-20"
              />
              <el-button type="success" @click="saveComment" class="fr"
                >Send</el-button
              >
            </div>
          </el-form>
        </div>
      </div>
      <div class="successmsg" v-else>
        <div class="simgcont">
          <img src="@/assets/tick.svg" alt="" class="simg" />
        </div>
        <h2>You are successfully completed your Assessment-01.</h2>
      </div>
    </div>
  </div>
  <div class="confirmbox" v-if="showConfirm">
    <div class="confirm-content">
      <div class="confirm-body">
        <h3 class="mb-20">
          Once Submit the form will store all the results
          <p>Are you sure want to submit the form ?</p>
        </h3>
        <el-button type="success" class="lbutton" @click="submitResult">
          Ok
        </el-button>
        <el-button type="warning" class="rbutton" @click="showConfirm = false">
          Cancel
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import {getLocalData} from "@/components/LocalData";
const questionForm = ref([
  {
    qTtitle: "",
    questionText: "",
    questionType: "",
    ans: "",
    category: "",
    options: [],
    isrequired: "",
  },
]);
const result = ref([
  {
    qId: 0,
    questionText: "",
    ans: "",
  },
]);
const formSize = ref("default");
const showConfirm = ref(false);
const showQuestions = ref(true);
const index = ref(0);
const fileName = ref("");
const username = ref("");
const category = ref("");
const showComment = ref(false);
const txtmessage = ref("");
const messages = ref([]);
onMounted(() => {
  username.value = localStorage.getItem("username") || "";
  category.value = localStorage.getItem("usertype") || "";
  let qrString = localStorage.getItem("surveyResult");
  let qrArray = [];
  if (qrString) {
    qrArray = JSON.parse(qrString);
  }
  let ele = qrArray[0][category.value].find(
    (item: any) => item[username.value]
  );

  if (ele) showQuestions.value = false;
  else {
    let assign = getLocalData("users").find((item: any) => item.userid === username.value)
      .assignment;
    let assignment = getLocalData("assignments").find((ele: any) => ele.assignment === assign)
      .questions;
    let temp2 = []; 
      assignment.map((ele: any) => {
        let temp = getLocalData("questions").find((item: any) => item.qID == ele);
        if (temp) temp2.push(temp);
      });
    questionForm.value = temp2;
    result.value[0].qId = questionForm.value[0].qID;
    result.value[0].questionText = questionForm.value[0].questionText;
  // }
    showQuestions.value = true;
  }
  // let notifications = localStorage.getItem("notifications");
  // if (notifications) messages.value = JSON.parse(notifications);
  messages.value = getLocalData("notifications")
  messages.value = messages.value.filter((ele) => ele.to == username.value);
});
const nextQuestion = () => {
  if (index.value != questionForm.value.length) {
    index.value = index.value + 1;
    let temp = result.value.find((ele) => ele.qId === index.value);
    if (!temp)
      result.value.push({
        qId: index.value,
        questionText: questionForm.value[index.value].questionText,
        ans: questionForm.value[index.value].questionType === "msl" ? [] : "",
      });
  }
};
const prevQuestion = () => {
  if (index.value != 0) index.value = index.value - 1;
};

const submitResult = () => {
  let qString = localStorage.getItem("surveyResult");
  let qArray = [];
  if (qString) {
    qArray = JSON.parse(qString);
  }
  // let obj = {id:username.value,
  //           result:result};
  let obj = {};
  obj[username.value] = result.value;
  qArray[0][category.value].push(obj);
  localStorage.setItem("surveyResult", JSON.stringify(qArray));
  showConfirm.value = false;
  showQuestions.value = false;
  // router.push("/dashboard");
};

const fileUpload = (event: any) => {
  var file = event.target.files[0];
  fileName.value = file.name;
};

const fileReset = () => {
  fileName.value = "";
};
const saveComment = () => {
  let obj = {
    sender: username.value,
    to: "Admin",
    message: txtmessage.value,
    status:"unread",
  };
  let note = localStorage.getItem("notifications");
  let nArray = [];
  if (note) {
    nArray = JSON.parse(note);
  }
  nArray.push(obj);
  localStorage.setItem("notifications", JSON.stringify(nArray));

  txtmessage.value = "";
  showComment.value = false;
};
</script>
