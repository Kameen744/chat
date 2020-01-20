<template>
  <div id="app">
    <v-ons-navigator v-if="LoginPage" swipeable :page-stack="LoginPage"></v-ons-navigator>
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import HomeTab from "./components/HomeTab.vue";
import RoomsTab from "./components/RoomsTab.vue";
import FreindsTab from "./components/FreindsTab.vue";
import ChatArea from "./components/ChatArea.vue";
export default {
  name: "app",
  data() {
    return {
      pages: [Login, HomeTab, RoomsTab, FreindsTab, ChatArea]
    };
  },
  computed: {
    LoginPage() {
      return this.$store.getters.page;
    }
  },
  created() {
    this.setPages();
  },
  methods: {
    setPages() {
      this.$store.dispatch("setAppPages", this.pages);
      this.$store.dispatch("setPage", 0);
    }
  }
};
</script>

<style>
</style>
