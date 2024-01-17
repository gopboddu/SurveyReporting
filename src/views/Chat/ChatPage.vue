<template>
  <div class="maincontainer t-20 chatcontainer">
    <div class="msger">
      <header class="msger-header">
        <div class="msger-header-title">
          <i class="fas fa-comment-alt"></i> SimpleChat
        </div>
        <div class="msger-header-options" >
          <i class="fa fa-close"></i>
        </div>
      </header>

      <div class="msger-chat" id="msgchat">
        <div class="msg left-msg"> 
          <div
            class="msg-img"
            style="background-image: url('/src/assets/avatar.svg');"
          ></div>

          <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">BOT</div>
              <div class="msg-info-time">12:45</div>
            </div>

            <div class="msg-text">
              Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
            </div>
          </div>
        </div>

        <div class="msg right-msg">
          <div
            class="msg-img"
            style="background-image: url('/src/assets/avatar2.svg');"
          ></div>

          <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">Sajad</div>
              <div class="msg-info-time">12:46</div>
            </div>

            <div class="msg-text">
              You can change your name in JS section!
            </div>
          </div>
        </div>
      </div>

      <div class="msger-inputarea" id="msgform">
        <input
          type="text"
          class="msger-input"
          placeholder="Enter your message..."
          v-model="msgerInput"
        />
        <button
          type="button"
          id="submit"
          class="msger-send-btn"
          @click="sendMessage()"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// const msgerForm = document.getElementById("msgform");
// console.log(msgerForm)
const msgerInput = ref("");

const BOT_MSGS = ref([
  "Hi, how are you?",
  "Ohh... I can't understand what you trying to say. Sorry!",
  "I like to play games... But I don't know how to play!",
  "Sorry if my answers are not relevant. :))",
  "I feel sleepy! :(",
]);

const BOT_NAME = ref("BOT");
const PERSON_NAME = ref("Sajad");
const BOT_IMG = ref("/src/assets/avatar.svg");
const PERSON_IMG = ref("/src/assets/avatar2.svg");

const sendMessage = () => {
  const msgText = msgerInput.value;
  if (!msgText) return;
  appendMessage(PERSON_NAME.value, PERSON_IMG.value, "right", msgText);
  msgerInput.value = "";
  botResponse();
};

function appendMessage(name, img, side, text) {
  const msgerChat = document.getElementById("msgchat");
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;
  
  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse() {
  const r = random(0, BOT_MSGS.value.length - 1);
  const msgText = BOT_MSGS[r];
  // const delay = msgText.split(" ").length * 100;

  // setTimeout(() => {
  //   appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
  // }, 1000);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
</script>
<style scope>
:root {
  --body-bg: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  --msger-bg: #fff;
  --border: 2px solid #ddd;
  --left-msg-bg: #ececec;
  --right-msg-bg: #579ffb;
}

.msger {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  width: 50%;
  margin: 25px 10px;
  height: calc(100% - 50px);
  border: var(--border);
  border-radius: 5px;
  background: var(--msger-bg);
  box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.2);
}

.msger-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: var(--border);
  background: #eee;
  color: #666;
}

.msger-chat {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}
.msger-chat::-webkit-scrollbar {
  width: 6px;
}
.msger-chat::-webkit-scrollbar-track {
  background: #ddd;
}
.msger-chat::-webkit-scrollbar-thumb {
  background: #bdbdbd;
}
.msg {
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
}
.msg:last-of-type {
  margin: 0;
}
.msg-img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background: #ddd;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}
.msg-bubble {
  max-width: 450px;
  padding: 15px;
  border-radius: 15px;
  background: var(--left-msg-bg);
}
.msg-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.msg-info-name {
  margin-right: 10px;
  font-weight: bold;
}
.msg-info-time {
  font-size: 0.85em;
}

.left-msg .msg-bubble {
  border-bottom-left-radius: 0;
}

.right-msg {
  flex-direction: row-reverse;
}
.right-msg .msg-bubble {
  background: var(--right-msg-bg);
  color: #fff;
  border-bottom-right-radius: 0;
}
.right-msg .msg-img {
  margin: 0 0 0 10px;
}

.msger-inputarea {
  display: flex;
  padding: 10px;
  border-top: var(--border);
  background: #eee;
}
.msger-inputarea * {
  padding: 10px;
  border: none;
  border-radius: 3px;
  font-size: 1em;
}
.msger-input {
  flex: 1;
  background: #fff;
}
.msger-send-btn {
  margin-left: 10px;
  background: rgb(0, 196, 65);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.23s;
}
.msger-send-btn:hover {
  background: rgb(0, 180, 50);
}

.msger-chat {
  background-color: #fcfcfe;
}
</style>
