<template>
    <div>
        <v-row>
            <v-col 
                cols="12" 
            >
                <v-card  
                    class="mx-auto" 
                    max-height="300px"
                >
                    <vue-plyr>
                        <div 
                            class="plyr__video-embed"
                            v-html="songCode"
                        ></div>
                    </vue-plyr>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default({
    name: 'Song',
    data() {
        return {
            songCode: '',
        }
    },
    created() {
        this.fetchSong();
        if(this.$store.state.user !== null) {
            this.$store.commit('alterThemeColor', this.$store.state.user.profileTheme);
        }
        else {
            this.$store.commit('alterThemeColor', 'rgb(220, 20, 60)');
        }
    },
    methods: {
        fetchSong() {
            //This method will handle fetching the iFrame code for a song 
            return axios({
                method: 'GET',
                url: `https://www.linkkup.com/api/fetch/song/${this.$route.params.id}`,
            }).then(response => {
                this.songCode = response.data.code;
            }).catch(err => {
                console.log(err.message);
                this.$swal(
                    'Uh Oh!',
                    'There Was An Error Retreiving That Song From The Database!',
                    'error',
                );
                this.$router.go(-1);
            });
        },
    },
});
</script> 
