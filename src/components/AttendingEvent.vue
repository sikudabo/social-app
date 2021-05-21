<template>
    <div> 
        <v-row 
            v-if="attenders.length < 1" 
        >
            <v-col 
                cols="12" 
            >
                <p>
                    No One Is Attending This Event. Be The First To Sign Up To Attend 
                    By Pressing The Attend Button For The Event 
                </p>
            </v-col>
        </v-row>
        <v-row 
            v-else 
        >
            <v-col 
                cols="12" 
            >
                <v-list>
                    <v-list-item-group 
                        :color="user.profileTheme" 
                        value="show" 
                    >
                        <div 
                            v-for="(person, index) in attenders" 
                            :key="index" 
                        >
                            <v-list-item 
                                @click="viewProfile(person.username)" 
                            > 
                                <v-list-item-avatar>
                                    <v-img 
                                        :src="`https://www.linkkup.com/api/user/avatar/${person.uniqueUserId}`"
                                    ></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title 
                                        class="title" 
                                    >
                                        {{ person.username }} 
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider></v-divider>
                        </div>
                    </v-list-item-group>
                </v-list>
            </v-col>
        </v-row>
    </div>
</template>

<script> 

export default({
    name: 'AttendingEvent',
    data() {
        return {    
            attenders: [],
        }
    },
    created() {
        this.$store.commit('alterThemeColor', this.$store.state.user.profileTheme);
        this.fetchAttenders();
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        userAuthenticated() {
            return this.$store.state.userAuthenticated;
        },
    },
    watch: {
        user: function() {
            if(this.user === null) {
                this.$router.push('/');
            }
        },
    },
    methods: {
        fetchAttenders() {
            //This route will handle fetching the users who are attending an event 
            let uniqueEventId = this.$route.params.event; 

            return axios({
                method: 'GET',
                url: `https://www.linkkup.com/api/fetch/attenders/${this.$route.params.event}`,
            }).then(response => {
                this.attenders = response.data.attenders;
            }).catch(err => {
                console.log(err.message);
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Finding The People Attending This Event!',
                    'error',
                );
                this.$router.go(-1);
            });
        },
        viewProfile(username) {
            //This method will help us view the profile of an event attender if they are clicked by the user 
            this.$router.push(`/linkkup/profile/${username}`);
        },
    },
});
</script>
