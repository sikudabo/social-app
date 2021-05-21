<template>
    <div 
        style="text-align: center;" 
    >
        <v-row>
            <v-col 
                cols="12" 
            >
                <h2>
                    Search For Linkkup Communities
                </h2>
                <v-autocomplete 
                    class="mt-4" 
                    :items="communities"
                    v-model="searchCommunity" 
                    :filter="filterCommunity"
                    item-value="name"
                    label="Search Communities"
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
                                :src="`https://www.linkkup.com/api/community/avatar/${item.name}`" 
                                alt="linkkup Community Avatar"
                            ></v-img>
                        </v-avatar>
                        <v-spacer></v-spacer>
                        <span>
                            {{ item.name }} 
                        </span>
                    </template>
                    <template 
                        slot="selection"
                        slot-scope="data" 
                    >
                        {{ data.item.name }} 
                    </template>
                </v-autocomplete>
            </v-col>
        </v-row>
    </div>
</template>

<script>

export default({
    name: 'SearchCommunities',
    data() {
        return {
            communities: null,
            searchCommunity: null,
        }
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
        searchCommunity: function() {
            this.$router.push(`/linkkup/community/${this.searchCommunity}`);
        },
    },
    created() {
        //Fetch the communities when this view is created 
        this.fetchCommunities();
    },
    methods: {
        fetchCommunities() {
            //This method will fetch all communities from the backend database 
            return axios({
                method: 'GET',
                url: 'https://www.linkkup.com/api/fetch/communities',
            }).then(response => {
                this.communities = response.data.communities;
                this.$store.commit('alterThemeColor', this.$store.state.user.profileTheme);
            }).catch(err => {
                console.log(err.message);
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Finding The linkkup Communities!',
                    'error',
                );
            });
        },
        filterCommunity(item, queryText, itemText) {
            let name = item.name 
            return (
                item.name.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1 || this.$_.find(item.topics, topic => topic.toLowerCase() === queryText.toLowerCase())
            );
        },
    },
});
</script>