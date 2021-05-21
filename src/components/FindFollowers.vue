<template>
    <div>
        <v-row>
            <v-col 
                cols="12" 
            >
                <v-list>
                    <v-card 
                        v-for="(follower, index) in userFollowers" 
                        :key="index"
                        bordered 
                        link 
                        :data-username="`${follower.username}`"
                        @click="profilePage($event)"
                        class="mb-4"
                    >
                        <v-list-item>
                            <v-list-item-avatar 
                                size="80" 
                            >
                                <v-img 
                                    :src="`https://www.linkkup.com/api/user/avatar/${follower.uniqueUserId}`" 
                                ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title 
                                    class="headline" 
                                >
                                    <small>
                                        {{ follower.username }} 
                                    </small>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-list>
            </v-col>
        </v-row>
    </div>
</template>

<script> 

export default({
    name: 'FindFollowers',
    data() {
        return {
            userFollowers: [],
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        userAuthenticated() {
            return this.$store.state.userAuthenticated;
        }
    },
    watch: {
        user: function() {
            if(this.user === null) {
                this.$router.push('/');
            }
        },
    },
    created() {
        this.getFollowers();
    },
    methods: {
        getFollowers() {
            let username = this.$route.params.username;

            return axios({
                method: 'GET',
                url: `https://www.linkkup.com/api/find/followers/${username}`,
            }).then(response => {
                if(response.data === 'No Followers') {
                    this.$swal(
                        'No Followers',
                        'This User Has No Followers!',
                        'success',
                    );
                }
                else {
                    this.userFollowers = response.data.followers;
                }
            }).catch(err => {
                console.log(err.message);
                this.$swal(
                    'Uh Oh',
                    'There was an error retrieving the followers for that user',
                    'error',
                );
            });
        },
        profilePage(event) {
            //This function will handle taking us to the users' profile page once they are clicked on
            let username = event.currentTarget.getAttribute('data-username');
            this.$router.push(`/linkkup/profile/${username}`);
        },
    },
});
</script>