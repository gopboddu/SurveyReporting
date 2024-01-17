<template>
  <div>
    <h1>Chat Application</h1>
    <div v-if="connected">
      <div v-for="message in messages" :key="message.id">
        <strong>{{ message.sender }}</strong
        >: {{ message.text }}
      </div>
      <input type="text" v-model="newMessage" @keyup.enter="sendMessage" />
    </div>
    <div v-else>
      Connecting to the chat...
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      connected: false,
      messages: [],
      newMessage: "",
    };
  },
  mounted() {
    //   const connection = this.$connection;

    //   connection.start().then(() => {
    //     this.connected = true;

    //     connection.on('ReceiveMessage', (sender, text) => {
    //       this.messages.push({ sender, text });
    //     });
    //   });
    const signalR = require("@microsoft/signalr");

    let connection = new signalR.HubConnectionBuilder()
      .withUrl("/chat")
      .build();

    connection.on("send", (data) => {
      console.log(data);
    });

    connection.start().then(() => connection.invoke("send", "Hello"));
  },
  methods: {
    sendMessage() {
      const connection = this.$connection;
      const message = this.newMessage.trim();

      if (message) {
        connection.invoke("SendMessage", message);
        this.newMessage = "";
      }
    },
  },
});
</script>
