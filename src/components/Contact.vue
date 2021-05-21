<template>
    <v-row>
        <v-col cols="12">
            <v-overlay :value="showOverlay">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
                <h5>
                    Sending  
                </h5>
            </v-overlay>
            <h1>Contact Us</h1>
            <v-form 
                ref="form" 
            >
                <v-label for="contactText">
                    Questions, Concerns Or Feedback! 
                </v-label>
                <v-text-field 
                    :color="this.$store.state.user.profileTheme"
                    placeholder="Enter Your Email Address (xyz@iu.edu)"
                    label="Email"
                    type="email"
                    hint="Must Enter A Valid IU Email Address So That We Can Respond To You" 
                    :rules="emailRules"
                    v-on:keypress.32="noSpaces"
                    v-model="email"
                ></v-text-field> 
                <v-textarea 
                    placeholder="Please Let Us Know If You Have Any Questions, Concernts Or Feedback To Share!"
                    :color="this.$store.state.user.profileTheme"
                    v-model="inquiry"
                    :rules="inquiryRules"
                ></v-textarea>
            </v-form>
            <v-btn 
                class="btn-block font-weight-bold white--text" 
                :color="this.$store.state.user.profileTheme"
                @click="send"
            >
                Submit
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default({
    name: 'Contact',
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
            inquiry: '',
            inquiryRules: [
                v => !!v || 'Must Enter An Inquiry For Us To Respond To!',
            ],
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    watch: {
        user: function() {
            if(this.user === null) {
                this.$router.push({name: 'Home'});
            }
        },
    },
    created() {
        this.updateTheme();
    },
    methods: {
        updateTheme: function() {
            this.$store.commit('alterThemeColor', this.$store.state.user.profileTheme);
        },
        noSpaces(event) {
            event.preventDefault();
            return false;
        },
        send() {
            //This method will handle sending the inquiry to the server 
            this.showOverlay = true; 
            if(this.$refs.form.validate()) {
                let data = JSON.stringify({email: this.email, inquiry: this.inquiry});

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/contact',
                    data: data,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.$swal(
                        'Great!',
                        'Inquiry Successfully Sent!',
                        'success',
                    );
                    this.$router.push('/');
                }).catch(err => {
                    this.showOverlay = false;
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Sending That Inquiry!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'Make Sure The Form Is Filled Out Properly!',
                    'error',
                );
            }
        },
    },
});
</script>