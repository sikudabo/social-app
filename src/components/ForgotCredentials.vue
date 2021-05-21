<template>
    <div>
        <v-row>
            <v-col 
                cols="12" 
            >
                <v-overlay :value="showOverlay">
                    <v-progress-circular indeterminate size="64"></v-progress-circular>
                    <h5>
                        Sending  
                    </h5>
                </v-overlay>
                <small>
                    Enter The Email Associated With Your Account For Us To Send You Your Username And Password 
                </small>
                <v-form 
                    ref="form" 
                >
                    <v-text-field 
                        name="email"
                        type="email" 
                        label="Email"
                        placeholder="Enter Your Email Associated With This Account" 
                        :rules="emailRules"
                        v-model="email"
                        v-on:keypress.32="noSpaces"
                    ></v-text-field>
                    <v-btn 
                        color="rgb(220, 20, 60)" 
                        dark 
                        tile 
                        @click="send"
                    >
                        Submit 
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </div>
</template>

<script>

export default({
    name: 'ForgotCredentials',
    data() {
        return {
            showOverlay: false,
            emailRe: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            email: '',
            emailRules: [
                v => !!v || 'Must Enter An Email Address!',
                v => (v.endsWith('iu.edu') || v.endsWith('alumni@iu.edu')) || 'Must Have A Valid IU Email Address!',
                v => this.emailRe.test(v) || 'Must Enter A Valid Email Format!',
            ],
        }
    },
    created() {
        if(this.$store.state.userAuthenticated || this.$store.state.user) {
            this.$router.push(`/profile/${this.$store.state.user.username}`);
        }
    },
    methods: {
        noSpaces(event) {
            //Method to not allow spaces in email 
            event.preventDefault();
            return false;
        },
        send() {
            //This is the method that will send the email address of the user to the backend api 
            this.showOverlay = true;

            if(this.$refs.form.validate()) {
                let email = this.email 

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/forgot/credentials',
                    data: JSON.stringify({email: email}),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false; 
                    this.$swal(
                        'Great!',
                        'We Will Send Your Username And Password To Your Account Shortly!',
                        'success',
                    );
                    this.email = '';
                    this.$router.push('/');
                }).catch(err => {
                    this.showOverlay = false; 
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error! Please Try Again!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh!',
                    'Please Enter A Valid Email!',
                    'error',
                );
                return false;
            }
        },
    },
});
</script>