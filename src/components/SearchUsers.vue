<template>
    <div 
        style="text-align: center;" 
    >
        <v-row>
            <v-col 
                cols="12" 
            >
                <h2>
                    Search For Linkkup Users
                </h2>
                <v-autocomplete 
                    class="mt-4" 
                    :items="users"
                    v-model="searchUser" 
                    :filter="filterUser"
                    item-value="username"
                    label="Search Users"
                    :color="`${this.$store.state.user.profileTheme}`"
                >
                    <template 
                        v-slot:item="{ item }"
                    >
                        <v-avatar 
                            size="80" 
                            tile
                        >
                            <img 
                                :src="`https://www.linkkup.com/api/user/avatar/${item.uniqueUserId}`" 
                                alt="linkkup User Avatar"
                            ></v-img>
                        </v-avatar>
                        <v-spacer></v-spacer>
                        <span>
                            {{ item.firstName + ' ' + item.lastName }} 
                        </span>
                    </template>
                    <template 
                        slot="selection"
                        slot-scope="data" 
                    >
                        {{ data.item.firstName + ' ' + data.item.lastName }} 
                    </template>
                </v-autocomplete>
            </v-col>
        </v-row>
    </div>
</template>

<script>

export default({
    name: 'SearchUsers',
    data() {
        return {
            users: null,
            searchUser: null,
        }
    },
    created() {
        this.fetchUsers();
    },
    methods: {
        fetchUsers() {
            return axios({
                method: 'GET',
                url: 'https://www.linkkup.com/api/fetch/users',
            }).then(response => {
                this.users = response.data.users;
                this.$store.commit('alterThemeColor', this.$store.state.user.profileTheme);
            }).catch(err => {
                this.$swal(
                    'Uh Oh!',
                    'Could Not Find Any Users To Search!',
                    'error',
                );
                this.$router.push('/');
            });
        },
        filterUser(item, queryText, itemText) {
            let fullName = item.firstName + ' ' + item.lastName;
            return (
                item.username.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1 || fullName.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1
            );
        },
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        userAuthenticated() {
            return this.$store.state.userAuthenticated;
        },
        userPosts() {
            return this.$store.state.userPosts;
        },
    },
    watch: {
        user: function() {
            if(this.user === null || userAuthenticated === false) {
                this.$router.push('/');
            }
        },
        searchUser: function() {
            this.$router.push(`/linkkup/profile/${this.searchUser}`);
        },
    },
});
</script>