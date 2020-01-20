<template>
  <v-ons-page>
    <tool-bar :pageTitle="pageTitle"></tool-bar>
    <div class="content">
      <v-ons-pull-hook :action="loadItem" @changestate="state = $event.state">
        <span v-show="state === 'initial'">Pull to refresh</span>
        <span v-show="state === 'preaction'">Release</span>
        <span v-show="state === 'action'">Loading Users</span>
      </v-ons-pull-hook>

      <v-ons-list modifier="inset">
        <v-ons-list-header>Online</v-ons-list-header>
        <v-ons-list-item tappable v-for="(chat, key) in chats" :key="key" @click="selectUser(chat)">
          <div class="left">
            <img class="list-item__thumbnail" src="http://localhost:8081/assets/face.jpg" />
          </div>
          <div class="center">
            <span class="list-item__title">{{chats.username}}</span>
            <!-- <span class="list-item__subtitle">
              Joined: {{ user.created_on | mDate }}
            </span>-->
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </div>
  </v-ons-page>
</template>
<script>
export default {
  data() {
    return {
      pageTitle: "Home",
      state: "initial",
      onlineUsers: this.$store.getters.onlineUsers,
      userLeft: Object,
      selectedUser: null
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.user;
    },
    chats() {
      return this.$store.getters.chats;
    }
  },
  sockets: {
    users_online(users) {
      this.$store.dispatch("onlineUsers", users);
    },
    user_left(user) {
      this.userLeft = user;
    }
  },

  methods: {
    loadItem(done) {
      setTimeout(() => {
        this.items = [this.items, this.items.length + 1];
        done(); //call shamsee 08137372222
      }, 400);
    },
    selectUser(user) {
      this.selectedUser = user;
    }
  }
};
</script>
