<template>
    <div style='text-align: left'>
        <v-row>
            <v-col 
                cols="12" 
            >
                <v-btn 
                    :color="user.profileTheme" 
                    outlined 
                    @click.stop="dialog = !dialog" 
                    transition="bottom-transition"
                >
                    Dialog 
                </v-btn>
                <v-dialog 
                    v-model="dialog" 
                    width="500"
                    fullscreen
                >
                    <v-card>
                        <v-card-title
                            class="headline grey accent-2"
                        >
                            Privacy Policy 
                        </v-card-title>
                        <v-card-text>
                            You must agree to the linkkup terms and conditions in terms of data. 
                            We will store your data and share it with whom we please. We will 
                            harvest your data (and organs) if necessary for profit. We do not 
                            care about that. 
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn 
                                :color="user.profileScheme"
                                text
                                depressed 
                                @click="dialog = !dialog" 
                            >
                                Accept 
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import ButtonCounter from '@/components/ButtonCounter';

export default({
    name: 'Practice',
    components: { ButtonCounter },
    data() {
        return {
            lazy: false,
            showMenu: false,
            dialog: false,
            tabs: null,
            valid: true,
            users: [
                {
                    username: 'sikudabo',
                    avatar: require('../assets/site-images/simeon.jpg'),
                    karma: 30,
                },
                {
                    username: 'anash',
                    avatar: require('../assets/site-images/ashlea.jpg'),
                    karma: 22,
                },
                {
                    username: 'elonmusk',
                    avatar: require('../assets/site-images/elon.jpg'),
                    karma: 10,
                },
            ],
            messages: [
                {
                    avatar: require('../assets/site-images/simeon.jpg'),
                    title: 'Simeon Ikudabo',
                    subtitle: 'Did you get the memo from Jane?',
                    subheader: 'Brunch?'
                },
                {
                    avatar: require('../assets/site-images/ashlea.jpg'),
                    title: 'Ashlea Nash',
                    subtitle: 'You are hot sim. I wanted you to know you get me really wet inside.',
                    subheader: 'Simeon Is Hot',
                },
                {
                    avatar: require('../assets/site-images/elon.jpg'),
                    title: 'Elon Musk',
                    subtitle: 'Simeon, we want to look at acquiring your company, linkkup.',
                    subheader: 'Acquisition Target.',
                },
            ],
            firstNameRules: [
                v => !!v || "Must Enter A First Name",
                v => v.length <= 10 || "First Name Can Only Be 10 Characters Or Less!",
            ],
            selection: null,
            items: [
                {
                    title: 'First Card', text: 'This is some card text',
                    decoration: 'line-through',
                }, 
                {
                    title: 'Second Card',
                    text: 'This is some second card text',
                    decoration: 'overline',
                },
                {
                    title: 'Third Card',
                    text: 'This is some third card text',
                    decoration: 'underline',
                },
            ],
            states: [
                'Indiana', 'Wyoming', 'Iowa', 'Nebraska',
            ],
            statesRules: [
                v => !!v || "You Must Select A State!",
            ],
            checkboxRules: [
                v => !!v || 'You Must Agree To linkkup Terms And Conditions!',
            ],
            emailRules: [
                v => !!v || "Must Enter A Valid Email!",
            ],
        }
    },
    methods: {
       increment() {
           this.$store.commit('increment', {inc: 10});
       },
       decrement() {
           this.$store.commit('decrement');
       },
       validate() {
           if(this.$refs.form.validate()) {
               this.$swal(
                   'Great!',
                   'You Validaed The Form!',
                   'success',
               );
           }
           else {
               this.$swal(
                   'Uh Oh',
                   'Check To Make Sure You Filled Out The Form Properly',
                   'error',
               );
           }
       },
       reset() {
           this.$refs.form.reset();
       },
       resetValidation() {
           this.$refs.form.resetValidation();
       },
    },
    created() {
        if(this.$store.state.userAuthenticated === false) {
            this.$router.replace('/');
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    watch: {
        user() {
            if(this.$store.state.user === null || this.$store.state.userAuthenticated === false) {
                this.$router.push('/');
            }
        },
    },
});
</script>