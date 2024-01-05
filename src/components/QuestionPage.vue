<template>
  <div class="addquestioncontainer">
    <div class="qheader">
      <div class="qtitle">
        <h2>Add Question</h2>
      </div>
      <div class="qclose" @click="closePopup">
        <img src="@/assets/cross.svg" alt="" class="closeicon" />
      </div>
    </div>
    <div class="quespart">
      <div class="questionpart">
        <el-form
          ref="ruleFormRef"
          :model="questionForm"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <div class="mb-20 fl">
            <el-select
              v-model="questionForm.category"
              placeholder="Select Category"
              size="large"
            >
              <el-option key="" value="" label="Select Category"></el-option>
              <el-option
                v-for="item in categoryoptions"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="mb-20">
            <el-input
              v-model="questionForm.qTtitle"
              maxlength="200"
              placeholder="Enter Question Title"
              show-word-limit
              type="text"
              class="form-control"
            />
          </div>
          <div class="mb-20">
            <el-input
              v-model="questionForm.questionText"
              maxlength="500"
              placeholder="Enter Question"
              show-word-limit
              type="textarea"
              class="form-control"
            />
          </div>
          <div class="mb-20" v-if="props.questionType === 'msl'">
            <el-checkbox-group>
              <div class="qoptions" v-for="(option, i) in options" :key="i">
                <el-checkbox name="type" />
                <el-input
                  type="text"
                  :placeholder="'Option' + i + 1"
                  show-word-limit
                  class="form-control"
                  maxlength="200"
                  v-model="questionForm.options[i]"
                />
              </div>
            </el-checkbox-group>
            <span class="addoption" @click="addNewOption">Add Option</span>
          </div>
          <div class="mb-20" v-if="props.questionType === 'single'">
            <el-radio-group>
              <div class="qoptions" v-for="(option, i) in options" :key="i">
                <el-radio name="type" />
                <el-input
                  type="text"
                  :placeholder="'Option' + i + 1"
                  show-word-limit
                  class="form-control"
                  maxlength="200"
                  v-model="questionForm.options[i]"
                />
              </div>
            </el-radio-group>
            <span class="addoption" @click="addNewOption">Add Option</span>
          </div>
          <div class="mb-20" v-if="props.questionType === 'boolean'">
            <el-radio-group>
              <div class="qoptions" v-for="(option, i) in options" :key="i">
                <el-radio name="type" />
                <el-input
                  type="text"
                  :placeholder="'Option' + i + 1"
                  show-word-limit
                  class="form-control"
                  maxlength="200"
                  v-model="questionForm.options[i]"
                />
              </div>
            </el-radio-group>
          </div>
          <div class="mb-20">
            <el-input
              v-model="questionForm.remark"
              maxlength="500"
              placeholder="Remarks"
              show-word-limit
              type="text"
              class="form-control"
            />
          </div>
          <div class="mb-20">
            <el-row :gutter="10">
              <span>Document Required</span>
              <el-switch
                v-model="questionForm.isrequired"
                class="ml-10"
                inline-prompt
                style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                "
                active-text="Yes"
                inactive-text="No"
              />
            </el-row>
          </div>
          <el-form-item id="question" class="mb-40">
            <el-button
              type="primary"
              @click="submitForm"
              :disabled="
                questionForm.category == '' ||
                questionForm.qTtitle == '' ||
                questionForm.questionText == ''
              "
            >
              Create
            </el-button>
            <el-button @click="closePopup" type="warning">Clear</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";

interface RuleForm {
  qID: number;
  questionText: string;
  qTtitle: string;
  questionType: string;
  remark: string;
  category: string;
  isrequired: string;
  options: [];
}
const props = defineProps({
  questionType: {
    type: String,
    default: "single",
  },
});
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const questionForm = reactive<RuleForm>({
  qID: 0,
  qTtitle: "",
  questionText: "",
  questionType: props.questionType,
  remark: "",
  category: "",
  isrequired: "No",
  options: [],
});

const submitForm = () => {
  let qString = localStorage.getItem("questions");

  let qArray = [];
  if (qString) {
    qArray = JSON.parse(qString);
  }
  questionForm.qID = qArray.length;

  qArray.push(questionForm);
  localStorage.setItem("questions", JSON.stringify(qArray));
  closePopup();
};

const emit = defineEmits(["close"]);
const closePopup = () => {
  emit("close");
};
const options = ref(
  Array.from({ length: props.questionType === "boolean" ? 2 : 4 }).map(
    (_, idx) => ({
      id: `${idx + 1}`,
      label: "",
    })
  )
);
const categoryoptions = ref([
  { id: 1, value: "Makeup" },
  { id: 2, value: "Lighting" },
  { id: 3, value: "Costumes" },
  { id: 4, value: "Production" },
  { id: 5, value: "Camera" },
]);

const addNewOption = () => {
  options.value.push({ id: `${options.value.length}`, label: "" });
};
</script>
