<template>
  <v-ons-page>
    <tool-bar :pageTitle="pageTitle"></tool-bar>
    <!-- <v-ons-toolbar>
      <div class="center">{{ title }}</div>
      <div class="left">
        <v-ons-toolbar-button @click="showPopover($event, 'down', true)">
          <v-ons-icon v-if="$ons.platform.isAndroid()" icon="md-more-vert"></v-ons-icon>
          <v-ons-icon icon="fa-bars"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>-->
    <div class="chatContent">
      <transition name="slide-fade" v-for="(message, key) in roomMessages.messages" :key="key">
        <div class="chat" :class="[message.fromMe ? 'outgoin' : 'incoming']">
          <div class="avatar" v-if="message.fromMe">
            <img class="profile" src="http://localhost:8081/assets/face.jpg" />
            <small class="msgTime">{{message.sendOn | mTime}}</small>
          </div>
          <div class="bubble" :class="message.fromMe ? 'me' : 'you'">{{message.messageText}}</div>
          <div class="avatar" v-if="!message.fromMe">
            <img class="profile" src="http://localhost:8081/assets/face.jpg" />
            <small class="username">{{message.user.username}}</small>
            <small class="msgTime">{{message.sendOn | mTime}}</small>
          </div>
        </div>
      </transition>
    </div>
    <v-ons-bottom-toolbar id="bottomToolBar">
      <div id="textAreaDiv">
        <textarea
          class="textarea"
          id="textBox"
          rows="1"
          placeholder="Type message"
          v-model="messageText"
        ></textarea>
        <v-ons-button id="sendButton" @click="sendMessage">
          <v-ons-icon icon="fa-send"></v-ons-icon>
        </v-ons-button>
      </div>
    </v-ons-bottom-toolbar>
    <!-- <v-ons-popover
      cancelable
      :visible.sync="popoverVisible"
      :target="popoverTarget"
      :direction="popoverDirection"
      :cover-target="coverTarget"
    >
      <v-ons-list>
        <v-ons-list-item tappable @click="navPage(Home)">
          <v-ons-icon class="list-item__icon" icon="fa-home"></v-ons-icon>Home
        </v-ons-list-item>
        <v-ons-list-item tappable @click="navPage(Rooms)">
          <v-ons-icon class="list-item__icon" icon="fa-list"></v-ons-icon>Chat Rooms
        </v-ons-list-item>
        <v-ons-list-item tappable @click="navPage(Freinds)">
          <v-ons-icon class="list-item__icon" icon="fa-users"></v-ons-icon>Freinds
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-popover>-->
  </v-ons-page>
</template>

<script>
// import Home from "./Home.vue";
// import RoomsTab from "./RoomsTab.vue";
// import FreindsTab from "./FreindsTab.vue";

export default {
  data() {
    return {
      // Rooms: RoomsTab,
      // Home: Home,
      // Freinds: FreindsTab,
      messageText: "",
      roomMessages: this.$store.getters.activeRoom,
      me: this.$store.getters.myMessage
      // popoverVisible: false,
      // popoverTarget: null,
      // popoverDirection: "up",
      // coverTarget: false
    };
  },
  computed: {
    pageTitle() {
      return this.$store.getters.currentRoom.name;
    }
  },
  sockets: {
    memberJoined(user) {
      // console.log(user);
    },
    recieveMessage(message) {
      this.$store.dispatch("activeRooms", message);
    }
  },
  methods: {
    // navPage(page) {
    //   this.$store.dispatch("setPage", page);
    // },
    sendMessage() {
      if (this.messageText) {
        let now = new Date();
        let message = {
          messageText: this.messageText,
          sendOn: now,
          user: this.$store.getters.user,
          room: this.$store.getters.currentRoom
        };
        this.$socket.client.emit("sendMessage", message);
        this.messageText = "";
      }
    }
    // showPopover(event, direction, coverTarget = false) {
    //   this.popoverTarget = event;
    //   this.popoverDirection = direction;
    //   this.coverTarget = coverTarget;
    //   this.popoverVisible = true;
    // }
  }
};
</script>
<style>
#textBox {
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 0px;
  flex: 1;
  font-family: cursive;
  overflow: auto;
}
#textAreaDiv {
  display: flex;
  padding: 3px;
}
.chatContent {
  padding: 10px;
}
.chat {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
.incoming .avatar {
  padding-left: 20px;
  padding-right: 5px;
}
.outgoin .avatar {
  padding-right: 15px;
  padding-left: 5px;
}
.profile {
  border-radius: 20px;
  display: block;
}

.bubble {
  flex: 1;
  border-radius: 10px;
  color: rgb(22, 2, 2);
  box-shadow: 0px 1px 1px 3px rgba(211, 205, 205, 0.4);
  display: inline-block;
  padding: 10px 20px;
  margin-top: 10px;
  position: relative;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.bubble::before {
  content: "\00a0";
  display: block;
  height: 16px;
  position: absolute;
  top: 5px;
  transform: rotate(0deg) skew(-40deg);
  -moz-transform: rotate(0deg) skew(-40deg);
  -ms-transform: rotate(0deg) skew(-40deg);
  -o-transform: rotate(0deg) skew(-40deg);
  -webkit-transform: rotate(0deg) skew(-40deg);
  width: 15px;
}
.outgoin .bubble::before {
  background: #eceff1;
}
.me {
  background: #eceff1;
}
.incoming .bubble::before {
  background: rgb(255, 255, 255);
}
.you {
  background: rgb(254, 255, 255);
}
.me::before {
  box-shadow: -2px 3px 2px 0 rgba(211, 205, 205, 0.4);
  left: -5px;
}
.you::before {
  box-shadow: 2px -2px 2px 0 rgba(211, 205, 205, 0.4);
  right: -5px;
}
.username,
.msgTime {
  display: block;
}
</style>
