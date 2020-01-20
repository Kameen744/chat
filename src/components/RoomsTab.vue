<template>
  <v-ons-page>
    <tool-bar :pageTitle="pageTitle"></tool-bar>
    <v-ons-list>
      <v-ons-list-header modifier="center">Chat Rooms</v-ons-list-header>
      <v-ons-list-item tappable v-for="(room, key) in chatRooms" :key="key" @click="joinRoom(room)">
        <div class="center">
          <span class="list-item__title">{{ room.name }}</span>
          <span class="list-item__subtitle">{{ room.description }}</span>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
export default {
  data() {
    return {
      currentRoom: Object,
      pageTitle: "Rooms"
    };
  },
  computed: {
    chatRooms() {
      return this.$store.getters.chatRooms;
    }
  },
  methods: {
    joinRoom(room) {
      this.$store.dispatch("currentRoom", room);
      this.$store.dispatch("setPage", 4);
      this.$socket.client.emit("joinRoom", room, this.$store.getters.user);
    }
  }
};
</script>

<style></style>
