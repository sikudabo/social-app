<template>
    <v-row>
        <v-col 
          cols="12"
        >
          <v-overlay 
            :value="loggingIn">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
            <h5>
              Logging In 
            </h5>
            </v-overlay>
            <h1>Welcome To Linkkup!</h1>
          <h5>Log In</h5>
          <v-form
            ref="form"
          >
              <v-text-field v-on:keypress.32="preventSpaces($event)" placeholder="Username" hint="Enter Your Username" :rules="usernameRules" v-model="username"></v-text-field>
              <v-spacer></v-spacer>
              <v-text-field v-on:keypress.13="authenticateUser" type='password' placeholder="Password" :rules="passwordRules" hint="Enter Your Password" v-model="password"></v-text-field>
              <v-btn 
                color="rgb(220, 20, 60)" 
                class="white--text font-weight-bold"
                @click="authenticateUser"
              >
                  Log in 
              </v-btn>
              <v-btn 
                color="white" 
                class="red--text font-weight-bold"
                @click="$router.push('/signup')"
              >
                  Sign Up! 
              </v-btn>
              <v-spacer></v-spacer>
              <router-link 
                class="side_bar_link" 
                :to="{name: 'ForgotCredentials'}" 
              >
                <v-btn 
                  class="red--text font-weight-bold mt-3" 
                  text 
                >
                  Forgot Username Or Password?
                </v-btn>
              </router-link>
          </v-form>
        </v-col>
    </v-row>
</template>

<script>
import axios from 'axios';
import ForgotCredentials from './ForgotCredentials';

export default({
  name: 'Home',
  components: { ForgotCredentials },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      states: ['Indiana', 'Wyoming', 'Georgia', 'Arizona'],
      state: 'Indiana',
      genders: ['male', 'female', 'non-binary'],
      gender: '',
      sports: ['basketball', 'softball', 'football', 'volleyball'],
      sport: '',
      sides: ['t', 'b', 'l', 'r'],
      notificationCount: 0,
      loggingIn: false,
      username: '',
      usernameRe: /^\w+$/,
      alphaStartRe: /^[A-Za-z]+$/,
      password: '',
      usernameRules: [
        v => !!v || 'Must Enter A Username!',
        v => v.length >= 6 || 'Username Must Be At Least 6 Characters!',
        v => this.usernameRe.test(v) || 'Username Can Only Container Letters Numbers And UnderScores!',
        v => this.alphaStartRe.test(v.slice(0, 1)) || 'Username Must Start With A Letter!',
      ],
      passwordRules: [
        v => !!v || 'Must Enter A Password!',
      ],
    };
  },
  created() {
    if(this.$store.state.userAuthenticated || this.$store.state.user) {
      this.$router.push(`/profile/${this.$store.state.user.username}`);
    }
  },
  methods: {
    preventSpaces: function(event) {
      event.preventDefault();
      return false;
    },
    incrementNotes() {
      this.notificationCount += 1;
    },
    decrementNotes() {
      this.notificationCount = 0;
    },
    enterForgotPage() {
      //This method will route us to the forgot credentials page 
      this.$router.push('/forgot/credentials');
    },
    authenticateUser: function() {
      if(this.$refs.form.validate()) {
        this.loggingIn = true;
        return axios({
          method: 'post',
          data: JSON.stringify({username: this.username, password: this.password}),
          url: 'https://www.linkkup.com/user-login',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => {
          if(response.data.auth === 'user authenticated') {
            this.loggingIn = false;
            this.$swal(
              'Great!',
              'Log In Was Successfull!',
              'success',
            );
            this.$store.commit('authenticatedUser');
            this.$store.commit('updateUser', response.data.user);
            this.$store.commit('updateUserPosts', response.data.userPosts);
            this.$router.push(`/profile/${response.data.user.username}`);
          }
          else if(response.data.auth === 'user not found') {
            this.loggingIn = false;
            this.$swal(
              'Uh Oh',
              'Incorrect Username',
              'error',
            );
          }
          else {
            this.loggingIn = false;
            this.$swal(
              'Uh Oh',
              'Incorrect Password',
              'error',
            );
          }
        }).catch(err => {
          this.loggingIn = false;
          this.$swal(
            'Uh Oh',
            'There Was An Error Logging You In. Please Try Again!',
            'error',
          );
        });
      }
      else {
        this.$swal(
          'Uh Oh',
          'Read The Hints And Fill Out The Log In Form Properly',
          'error',
        );
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
