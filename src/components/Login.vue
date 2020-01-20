<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Test App</div>
    </v-ons-toolbar>

    <div style="text-align: center; margin-top: 200px">
      <p>
        <v-ons-input
          v-model="user.username"
          id="username"
          placeholder="Username"
          modifier="underbar"
        ></v-ons-input>
      </p>

      <p>
        <v-ons-input
          v-model="user.password"
          id="password"
          placeholder="Password"
          type="password"
          modifier="underbar"
        ></v-ons-input>
      </p>

      <p>
        <v-ons-button modifier="octa" @click="login">Login</v-ons-button>
        <br />
        <b v-if="loginMessage">{{loginMessage}}</b>
      </p>
    </div>
  </v-ons-page>
</template>

<script>
// import ChatArea from "./ChatArea.vue";
export default {
  data() {
    return {
      user: {
        username: null,
        password: null
      },
      loginMessage: null,
      mydate: "2019-11-10 19:09:12"
    };
  },
  sockets: {
    login_success(user, chats, rooms) {
      this.$store.dispatch("setUser", user);
      this.$store.dispatch("chats", chats);
      this.$store.dispatch("chatRooms", rooms);
      this.$store.dispatch("setPage", 1);
    },
    // chat_rooms(rooms) {
    //   this.$store.dispatch("chatRooms", rooms);
    // },
    login_fail(msg) {
      this.loginMessage = msg;
    }
  },
  methods: {
    login() {
      this.$socket.client.emit("user_login", this.user);
    }
    // home() {
    //   this.$store.dispatch("setPage", Home);
    // }
  }
};
</script>

<style>
</style>