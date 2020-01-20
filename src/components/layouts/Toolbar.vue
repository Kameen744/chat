<template>
  <v-ons-toolbar>
    <div class="left" v-if="prevPage">
      <v-ons-toolbar-button @click="goPrevPage">
        <!-- <v-ons-icon v-if="$ons.platform.isAndroid()" icon="md-more-vert"></v-ons-icon> -->
        <v-ons-icon icon="fa-chevron-left"></v-ons-icon>
      </v-ons-toolbar-button>
    </div>
    <div class="center">{{ pageTitle }}</div>
    <div class="right">
      <v-ons-toolbar-button @click="showPopover($event, 'down', true)">
        <!-- <v-ons-icon v-if="$ons.platform.isAndroid()" icon="md-more-vert"></v-ons-icon> -->
        <v-ons-icon icon="fa-bars"></v-ons-icon>
      </v-ons-toolbar-button>
    </div>
    <v-ons-popover
      cancelable
      :visible.sync="popoverVisible"
      :target="popoverTarget"
      :direction="popoverDirection"
      :cover-target="coverTarget"
    >
      <v-ons-list>
        <v-ons-list-item tappable @click="navPage(1)">
          <v-ons-icon class="list-item__icon" icon="fa-home"></v-ons-icon>Home
        </v-ons-list-item>
        <v-ons-list-item tappable @click="navPage(2)">
          <v-ons-icon class="list-item__icon" icon="fa-list"></v-ons-icon>Chat Rooms
        </v-ons-list-item>
        <v-ons-list-item tappable @click="navPage(3)">
          <v-ons-icon class="list-item__icon" icon="fa-users"></v-ons-icon>Freinds
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-popover>
  </v-ons-toolbar>
</template>

<script>
export default {
  data() {
    return {
      popoverVisible: false,
      popoverTarget: null,
      popoverDirection: "up",
      coverTarget: false
    };
  },
  props: {
    pageTitle: String
  },
  computed: {
    prevPage() {
      return this.$store.getters.prevPage;
    }
  },
  methods: {
    navPage(pageNo) {
      this.$store.dispatch("setPage", pageNo);
    },
    goPrevPage() {
      this.navPage(this.prevPage);
    },
    showPopover(event, direction, coverTarget = false) {
      this.popoverTarget = event;
      this.popoverDirection = direction;
      this.coverTarget = coverTarget;
      this.popoverVisible = true;
    }
  }
};
</script>

<style>
</style>