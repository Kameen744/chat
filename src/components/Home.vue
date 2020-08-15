<template id="main">
  <v-ons-page>
    <!-- <v-ons-toolbar>
      <div class="center">{{ title }}</div>
    </v-ons-toolbar>-->
    <!-- <v-ons-tabbar swipeable :tabs="tabs" :visible="false" :index.sync="activeIndex"></v-ons-tabbar> -->
  </v-ons-page>
</template>

<script>
import Login from "./Login.vue";
import HomeTab from "./HomeTab.vue";
import RoomsTab from "./RoomsTab.vue";
import FreindsTab from "./FreindsTab.vue";
import ChatArea from "./ChatArea.vue";

export default {
  data() {
    return {
      activeIndex: 0,
      pages: {
        Login: Login,
        Home: HomeTab,
        Rooms: RoomsTab,
        Freinds: FreindsTab
      }
      // tabs: [
      //   {
      //     icon: this.md() ? null : "fa-facebook-messenger",
      //     label: "Home",
      //     page: HomeTab,
      //     key: "homePage"
      //   },
      //   {
      //     icon: this.md() ? null : "fa-list",
      //     label: "Rooms",
      //     page: RoomsTab,
      //     key: "roomsPage"
      //   },
      //   {
      //     icon: this.md() ? null : "fa-users",
      //     label: "Freinds",
      //     page: FreindsTab,
      //     key: "FreindsPage"
      //   }
      // ]
    };
  },
  created() {
    this.setAppPages();
  },
  // computed: {
  //   title() {
  //     return this.tabs[this.activeIndex].label;
  //   }
  // },
  sockets: {
    chat_rooms(rooms) {
      this.$store.dispatch("chatRooms", rooms);
    }
  },
  methods: {
    setAppPages() {
      this.$store.dispatch("setAppPages", this.pages);
      this.$store.dispatch("setPage", HomeTab);
    },
    login() {
      this.$store.dispatch("setPage", Login);
    },
    md() {
      return this.$ons.platform.isAndroid();
    }
  }
};
</script>

<style></style>
