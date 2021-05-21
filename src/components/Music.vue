<template>
    <div>
        <v-row>
            <v-col 
                cols="12" 
            >
                <v-card 
                    class="mx-auto"
                    max-width="444px" 
                >
                    <v-app-bar 
                        :color="profileTheme" 
                        dark 
                    >
                        <v-toolbar-title>
                            Linkkup Music 
                        </v-toolbar-title>
                    </v-app-bar>
                    <v-card 
                        color="black" 
                        dark 
                    >
                        <v-card-title 
                            class="headline" 
                        >
                            Linkkup Top Songs 
                        </v-card-title>
                        <v-card-subtitle>
                            Play The Hottest Music At 
                            Your Parties And Events At IU 
                            From SoundCloud 
                        </v-card-subtitle>
                        <v-card-text>
                            Click On Any Song And We Will Play It Directly From SoundCloud. 
                            We Will Have New And Hot Music For Your Parties And Events That 
                            You Can Play At Any Time! 
                        </v-card-text>
                    </v-card>
                    <div 
                        v-for="(song, index) in songs" 
                        :key="index" 
                    >
                        <v-card 
                            :color="profileTheme" 
                            dark 
                            style="cursor: pointer;"
                            @click="songView(index)"
                        >
                            <div 
                                class="d-flex flex-no-wrap d-flex-row" 
                            >
                                <div>
                                    <v-card-title 
                                        class="headline" 
                                    >
                                        {{ song.artist }}
                                    </v-card-title>
                                    <v-card-subtitle>
                                        {{ song.song }} 
                                    </v-card-subtitle>
                                </div>
                                <v-spacer></v-spacer>
                                <v-avatar 
                                    size="120"
                                    tile 
                                >
                                    <v-img 
                                        :src="song.src" 
                                        alt="Song Album Cover" 
                                    ></v-img>
                                </v-avatar>
                            </div>
                        </v-card>
                        <v-divider></v-divider>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default({
    name: 'Music',
    data() {
        return {
            songs: [],
        }
    },
    computed: {
        profileTheme() {
            return this.$store.state.themeColor;
        },
    },
    created() {
        this.fetchMusic();
        if(this.$store.state.user !== null) {
            this.$store.commit('alterThemeColor', this.$store.state.user.profileTheme);
        }
        else {
            this.$store.commit('alterThemeColor', 'rgb(220, 20, 60)');
        }
    },
    methods: {
        fetchMusic() {
            //This is the method that will fetch a list of songs from the server 
            return axios({
                method: 'GET',
                url: 'https://www.linkkup.com/api/fetch/music',
            }).then(response => {
                this.songs = response.data.songs;
            }).catch(err => {
                this.$swal(
                    'Uh Oh!',
                    'There Was An Error Finding The Songs!',
                    'error',
                );
                this.$router.go(-1);
            });
        },
        songView(index) {
            //This method will handle switching us to the song page 
            this.$router.push(`/linkkup/song/${index}`);
        },
    },
});
</script>
