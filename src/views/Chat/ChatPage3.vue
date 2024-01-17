<template>
  <div class="maincontainer t-20">
    <div class="page_title_left">
      <h1 class="dashtitle">Chat Page</h1>
    </div>
    <div class="addquestion"></div>
    <div class="home block mt-40">
      <h1>Chat Application</h1>
      <div>
        <input v-model="message" type="text" placeholder="Enter message" />
        <button @click="sendMessage">Send</button>
      </div>
      <ul>
        <li v-for="message in messages" :key="message">{{ message }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import SignalRService from "../../components/signalrService";

export default defineComponent({
  setup() {
    const signalRService = new SignalRService();
    const messages = ref<string[]>([]);
    const message = ref("");

    const sendMessage = () => {
      if (message.value) {
        signalRService.sendMessage(message.value);
        message.value = "";
      }
    };

    const receiveMessage = (message: string) => {
      messages.value.push(message);
    };

    onMounted(async () => {
      await console.log(signalRService.startConnection());
      signalRService.onReceiveMessage(receiveMessage);
    });

    return {
      messages,
      message,
      sendMessage,
    };
  },
});
</script>
