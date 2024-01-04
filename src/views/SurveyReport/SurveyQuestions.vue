<template>
    <div class="maincontainer">
      <div class="home block navborder">
        <div class="block mb-20">
          <nav class="flex nav-cont">
            <button
              class="navbtn"
              :class="{ active: showTab == tab.value }"
              v-for="(tab, index) in tabs"
              :key="index"
              @click="updateTabContent(tab.value)"
            >
              {{ tab.value }}
            </button>
          </nav>
        </div>
        <div class="tabcontent">
          <div v-for="(res, i) in resultArray" :key="i" class="tab_content">
            <div>
            <p class="ques">{{ i+1+") "+res.questionText }}</p>
            <p class="ques ml-10">{{"Question Type: " + res.questionType }}</p>
            <p class="ques ml-10" v-if="res.options.length>0">{{ "Options: " + res.options.join() }}</p>
            
          </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, ref } from "vue";
  
  const tabs = ref([
    { id: 1, value: "Makeup" },
    { id: 2, value: "Lighting" },
    { id: 3, value: "Costumes" },
    { id: 4, value: "Production" },
    { id: 5, value: "Camera" },
  ]);
  const showTab = ref("");

  onMounted(() => {
    updateTabContent("Makeup");
  });
  const resultArray = ref([]);
  const updateTabContent = (tab: any) => {
    showTab.value = tab;
    let qString = localStorage.getItem("questions");
    let qArray = [];
    if (qString) {
      qArray = JSON.parse(qString);
    }
    resultArray.value = qArray.filter((item:any)=> item.category === tab);
    
  };

  </script>
  