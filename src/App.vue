<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-if="this.$store.state.userAuthenticated"
      app 
      fixed 
      v-model="drawer"
    >
      <v-list>
        <router-link 
          v-bind:to="{name: 'Home'}"
          class="side_bar_link"
        >
          <v-list-item>
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              Profile 
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link 
          v-bind:to="{name: 'Feed'}"
          class="side_bar_link"
        >
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-atom</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              Feed 
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link 
          v-bind:to="{name: 'Messages'}"
          class="side_bar_link"
        >
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              Messages
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link 
          :to="{name: 'SearchUsers'}"
          class="side_bar_link"
        >
          <v-list-item>
            <v-list-item-action>
              <v-icon>
                mdi-account-group 
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              Search Users 
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link 
          :to="{name: 'SearchCommunities'}"
          class="side_bar_link"
        >
          <v-list-item>
            <v-list-item-action>
              <v-icon>
                mdi-home-city
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              Search Communities
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link 
          :to="{name: 'BuildCommunity'}"
          class="side_bar_link"
        >
          <v-list-item>
            <v-list-item-action>
              <v-icon>
                mdi-wrench 
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              Build Community
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link 
          :to="{name: 'CreateEvent'}"
          class="side_bar_link"
        >
          <v-list-item>
            <v-list-item-action>
              <v-icon>
                mdi-calendar-edit  
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              Create Event 
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link 
          :to="{name: 'Events'}"
          class="side_bar_link"
        >
          <v-list-item>
            <v-list-item-action>
              <v-icon>
                mdi-calendar-month 
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              Events 
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link 
          :to="{name: 'UserSettings'}"
          class="side_bar_link"
        >
          <v-list-item>
            <v-list-item-action>
              <v-icon>
                mdi-cog 
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              Settings
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link 
          v-if="this.$store.state.userAuthenticated"
          v-bind:to='{name: "Contact"}'
          class="side_bar_link"
        >
          <v-list-item>
            <v-list-item-action>
              <v-icon>contact_mail</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              Contact Us 
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link 
          v-if="this.$store.state.userAuthenticated"
          v-bind:to='{name: "About"}'
          class="side_bar_link hidden-sm-and-down"
        >
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-information</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              About 
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-list-item 
          @click="logout"
          style="cursor: pointer;">
          <v-list-item-action>
            <v-icon>settings_power</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            Log Out 
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      v-if="this.$route.path !== '/'"
      app 
      dark 
      :color="this.$store.state.themeColor"
      class="font-weight-bold"
      dense
    >
      <v-btn 
        v-if="this.$route.name !== 'Home'"
        icon 
        @click="goBack"
      >
        <v-icon>chevron_left</v-icon>
      </v-btn>
      <v-app-bar-nav-icon 
        v-if="this.$store.state.userAuthenticated"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title 
        class="siteLogo"
      >
        Linkkup
        <v-icon>
          mdi-atom 
        </v-icon>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link 
        :to="{name: 'Music'}" 
        class="side_bar_link hidden-sm-and-down" 
      >
        <v-btn 
          icon
        >
          <v-icon>
            mdi-music 
          </v-icon>
          Music 
        </v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <v-switch 
        v-if="this.$store.state.userAuthenticated"
        v-model="$vuetify.theme.dark"
        :label="colorMode"
      ></v-switch>
    </v-app-bar>
    <v-app-bar
      v-else
      app 
      dark 
      color="rgb(220, 20, 60)"
      class="font-weight-bold"
      dense
    >
      <v-btn 
        v-if="this.$route.name !== 'Home'"
        icon 
        @click="goBack"
      >
        <v-icon>chevron_left</v-icon>
      </v-btn>
      <v-app-bar-nav-icon 
        v-if="this.$store.state.userAuthenticated"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title 
        class="siteLogo"
      >
        Linkkup 
        <v-icon>
          mdi-atom 
        </v-icon>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link 
        :to="{name: 'Music'}" 
        class="side_bar_link hidden-sm-and-down" 
      >
        <v-btn 
          icon 
        >
          <v-icon>
            mdi-music 
          </v-icon>
          Music 
        </v-btn>
      </router-link>
      <v-switch 
        v-if="this.$store.state.userAuthenticated"
        v-model="$vuetify.theme.dark"
        :label="colorMode"
      ></v-switch>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <div id="app">
          <router-view/>
        </div>
      </v-container>
    </v-main>
    <v-bottom-navigation 
      v-if="this.$store.state.user !== null"
      app 
      :background-color="this.$store.state.themeColor"
      class="hidden-md-and-up"
      dark 
    >
      <router-link 
        :to="{name: 'About'}" 
        class="side_bar_link" 
      >
        <v-btn 
          value="about" 
          icon 
        >
          <v-icon>
            mdi-information
          </v-icon>
          About 
        </v-btn>
      </router-link>
      <router-link
        :to="{name: 'Music'}" 
        class="side_bar_link" 
      >
        <v-btn 
          value="music" 
          icon 
        >
          <v-icon>
            mdi-music 
          </v-icon>
          Music 
        </v-btn>
      </router-link>
    </v-bottom-navigation>
    <!--<v-footer 
      v-if="this.$route.path !== '/'"
      dark 
      :color="this.$store.state.themeColor"
      app
    >
        <small>&copy; <span class="siteLogo">Linkkup</span> 2020</small>
    </v-footer>
    <v-footer 
      v-else
      dark 
      color="rgb(220, 20, 60)"
      app
    >
        <small>&copy; <span class="siteLogo">Linkkup</span> 2020</small>
    </v-footer>-->
  </v-app>
</template>

<script>
import './assets/stylesheets/main.css';
import Home from './components/Home';
import Contact from './components/Contact';
import Practice from './components/Practice';
import SignUp from '@/components/SignUp';
import SearchUsers from '@/components/SearchUsers';
import BuildCommunity from '@/components/BuildCommunity';
import SearchCommunities from '@/components/SearchCommunities';
import Messages from  '@/components/Messages';
import CreateEvent from '@/components/CreateEvent';
import Events from '@/components/Events';
import UserSettings from '@/components/UserSettings';
import Feed from '@/components/Feed';
import About from '@/components/About';
import Music from '@/components/Music';

export default({
  name: 'App',
  components: { Home, Contact, Practice, SignUp, SearchUsers, BuildCommunity, SearchCommunities, Messages, CreateEvent, Events, UserSettings, Feed, About, Music },
  props: {
    source: String,
  },
  data() {
    return {
      drawer: null,
      notificationCount: 0,
      bottomNav: 'recent',
    };
  },
  methods: {
    goBack: function() {
      this.$route.path === '/' ? '' : this.$router.go(-1);
    },
    logout: function() {
      this.$store.commit('logout');
      this.$vuetify.theme.dark = false;
    },
  },
  computed: {
    colorMode() { 
      if(this.$vuetify.theme.dark) {
        return "Light Mode";
      }
      else {
        return "Dark Mode";
      }
    },
  },
});
</script>
