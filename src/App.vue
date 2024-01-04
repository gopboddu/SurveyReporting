<template>
  <div class="main-page" v-if="router.currentRoute.value.name!='login'">
    <div class="menu-bar">
      <LeftMenuVue @close="closeSidebar" />
    </div>
    <div class="main-body" :class="{ homeclose: sidebarClose }">
      <RouterView />
    </div>
  </div>
  <RouterView v-else />
</template>

<script setup lang="ts">
import { ref } from "vue";
import LeftMenuVue from "@/components/LeftMenu.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const sidebarClose = ref(false);

const closeSidebar = (val: boolean) => {
  sidebarClose.value = val;
};
</script>
