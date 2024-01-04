<template>
  <div v-if="$store.state.showNotification">
    <div class="chat-window">
      <!-- <draggable :list="notes" :animation="200" group="notes"> -->
      <div class="note">
        <a class="closebtn" @click="updateNotification">x</a>
        <div class="note_cnt">
          <!-- <textarea
            class="chat-messages"
            placeholder="Enter note description here"
            v-model="notes"
            :style="{ fontFamily: fontFamily }"
          ></textarea> -->
          <div v-for="(msg, i) in message" :key="i" class="chat-messages">
              <p class="sender">{{ msg.sender+":" }}</p>
              <p class="sndmsg">{{ msg.message }}</p>
          </div>
        </div>
      </div>
      <!-- </draggable> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
const store = useStore()
// import { VueDraggableNext } from "vue-draggable-next";

const props = defineProps({
  message: Array,
});

const updateNotification =() => {
  store.commit('updateNotification', false)
}
</script>
