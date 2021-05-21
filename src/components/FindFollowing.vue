<template>
    <div>
        <v-row>
            <v-col 
                cols="12" 
            >
                <v-list>
                    <v-card 
                        v-for="(following, index) in userFollowing" 
                        :key="index" 
                        class="mb-4"
                        bordered
                        link 
                        @click="findFollowing($event)"
                        :data-username="following.username"
                    >
                        <v-list-item>
                            <v-list-item-avatar 
                                size="80" 
                            >
                                <v-img 
                                    :src="`https://www.linkkup.com/api/user/avatar/${following.uniqueUserId}`"
                                ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title 
                                    class="headline" 
                                >
                                    <small>
                                        {{ following.username }} 
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
    name: 'FindFollowing',
    data() {
        return {
            userFollowing: [],
        }
    },
    created() {
        this.getFollowing();
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
        getFollowing() {
            //This function will get the users the user follows from the database and populate this page with them.
            let username = this.$route.params.username;

            return axios({
                method: 'GET',
                url: `https://www.linkkup.com/api/find/following/${username}`,
            }).then(response => {
                this.userFollowing = response.data.following;
            }).catch(err => {
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Finding Who That User Follows',
                    'error',
                );
                this.$router.go(-1);
            });
        },
        findFollowing(event) {
            let username = event.currentTarget.getAttribute('data-username');
            this.$router.push(`/linkkup/profile/${username}`);
        }
    },
});
</script>
