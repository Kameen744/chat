import Vue from 'vue';
import Vuex from 'vuex';
// import Login from './../components/Login.vue';
// import Home from './../components/Home.vue'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appPages: Array,
    pageStack: null,
    prevPage: null,
    user: null,
    currentRoom: {},
    activeRooms: {},
    onlineUsers: [],
    chats: null,
    chatRooms: []
  },
  mutations: {
    setAppPages(state, pages) {
      state.appPages = pages;
    },
    setPage(state, pageNo) {
      state.pageStack = [state.appPages[pageNo]];
    },
    prevPage(state, pageNo) {
      state.prevPage = pageNo
    },
    setUser(state, userData) {
      state.user = userData;
    },
    currentRoom(state, room) {
      state.currentRoom = room;
      if (state.activeRooms[room.id] === undefined) {
        state.activeRooms[room.id] = {};
        state.activeRooms[room.id].messages = [];
        state.activeRooms[room.id].users = [];
      }
    },
    onlineUsers(state, users) {
      state.onlineUsers = users;
    },
    activeRooms(state, message) {
      if (message.user.id === state.user.id) {
        message.fromMe = true;
      } else {
        message.fromMe = false;
      }
      state.activeRooms[message.room.id].messages.push(message);
      state.activeRooms[message.room.id].users.push(message.user);
    },
    chats(state, chats) {
      state.chats = chats;
    },
    chatRooms(state, rooms) {
      state.chatRooms = rooms;
    }
  },
  actions: {
    setAppPages(state, pages) {
      state.commit('setAppPages', pages);
    },
    setPage(state, pageNo) {
      state.commit('setPage', pageNo);
    },
    prevPage(state, pageNo) {
      state.commit('prevPage', pageNo);
    },
    setUser(state, userData) {
      state.commit('setUser', userData);
    },
    currentRoom(state, room) {
      state.commit('currentRoom', room);
    },
    onlineUsers(state, users) {
      state.commit('onlineUsers', users);
    },
    activeRooms(state, message) {
      state.commit('activeRooms', message);
    },
    chats(state, chats) {
      state.commit('chats', chats);
    },
    chatRooms(state, rooms) {
      state.commit('chatRooms', rooms);
    }
  },
  getters: {
    appPages(state) {
      return state.appPages;
    },
    page(state) {
      return state.pageStack;
    },
    prevPage(state) {
      return state.prevPage;
    },
    user(state) {
      return state.user;
    },
    currentRoom(state) {
      return state.currentRoom;
    },
    onlineUsers(state) {
      return state.onlineUsers;
    },
    justChatMessages(state) {
      return state.justChatMessages.messages;
    },
    singlesMessages(state) {
      return state.singlesMessages.messages;
    },
    activeRoom(state) {
      return state.activeRooms[state.currentRoom.id];
    },
    activeRooms(state) {
      return state.activeRooms;
    },
    chats(state) {
      return state.chats;
    },
    chatRooms(state) {
      return state.chatRooms;
    }
  }
});