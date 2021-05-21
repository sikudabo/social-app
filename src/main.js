// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify';
import Vuex, { mapState } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import ImageUploader from 'vue-image-upload-resize';
import VueSwal from 'vue-swal';
import * as Cookies from "js-cookie";
import VuePlyr from 'vue-plyr';
import App from './App'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import underscore from 'vue-underscore';
import Notifications from 'vue-notification';
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(Vuetify);

Vue.use(Vuex);

Vue.use(ImageUploader);

Vue.use(VueSwal);

Vue.use(VueAxios, axios);

Vue.use(underscore);

Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false }
  },
  _emit: ['ended'],
  get emit() {
    return this._emit;
  },
  set emit(value) {
    this._emit = value;
  },
});

Vue.use(Notifications);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    userAuthenticated: false,
    user: null,
    themeColor: "rgb(220, 20, 60)",
    userPosts: [],
  },
  mutations: {
    authenticatedUser: function(state) {
      state.userAuthenticated = true;
    },
    updateUser: function(state, payload) {
      state.user = payload;
      state.themeColor = payload.profileTheme; 
    },
    updateUserPosts: function(state, payload) {
      state.userPosts = payload;
    },
    pushUserPost: function(state, payload) {
      if(state.userPosts === null) {
        state.userPosts = [];
        state.userPosts.unshift(payload);
      }
      else {
        state.userPosts.unshift(payload);
      }
    },
    alterThemeColor: function(state, payload) {
      state.themeColor = payload;
    },
    logout: function(state) {
      state.user = null;
      state.userAuthenticated = false;
      state.userPosts = null;
      state.themeColor = "rgb(220, 20, 60)"; 
    }
  },
});

router.beforeResolve((to, from, next) => {
  if(to.name === 'Home' || to.name === 'SignUp' || to.name === 'ForgotCredentials' || to.name === 'About' || to.name === 'Music' || to.name === 'Song') {
    next();
  }
  else if(store.state.userAuthenticated === false || store.state.user === null) {
    next({name: 'Home'});
  }
  else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify: new Vuetify({
    theme: {
      dark: false,
    },
  }),
  router,
  store,
  watch: {
    router: function() {
      if(router.name === 'Profile') {
        store.commit('alterThemeColor', store.state.user.profileTheme);
      }
      else if(router.path === '/') {
        store.commit('alterThemeColor', "rgb(220, 20, 60)");
      }
    },
  },
  components: { App },
  template: '<App/>'
});
