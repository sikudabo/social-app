<template>
    <div>
        <v-row>
            <v-col 
                cols="12" 
            >
                <v-overlay 
                    :value="showOverlay"
                >
                    <v-progress-circular :color="user.profileTheme" indeterminate size="64"></v-progress-circular>
                    <h5>
                        Building Community
                    </h5>
                </v-overlay>
                <h2 
                    class="mb-3" 
                >
                    Build a Linkkup Community 
                </h2>
                <p 
                    class="mb-4" 
                >
                    Communities Are At The Heart Of Linkkup. Create One Today, Get Other People To Join 
                    And Build Real Connections With Other Members. Use Linkkup To Linkup With People 
                    Who Share Common Interests!
                </p>
                <v-form 
                    ref="communityForm" 
                >
                    <v-text-field 
                        prepend-icon="mdi-pencil"
                        placeholder="Community Name" 
                        hint="Community Name Must Begin With A Letter, Contain Only Letters, Numbers And Underscores, Must Be Between 3 and 21 Characters And Cannot Contain Spaces!" 
                        persistent-hint 
                        label="Community Name"
                        counter="21"
                        :rules="nameRules"
                        v-model="communityName"
                        v-on:keypress.32="noSpaces($event)"
                        required 
                        class="mb-4"
                    ></v-text-field>
                    <v-text-field 
                        prepend-icon="mdi-book" 
                        placeholder="Title" 
                        hint="Create A Description Title For Your Community! Can Be Up To 50 Characters Long" 
                        persistent-hint 
                        label="Community Title" 
                        counter="50" 
                        :rules="titleRules" 
                        v-model="communityTitle" 
                        required 
                        class="mb-4" 
                    ></v-text-field>
                    <v-select 
                        prepend-icon="mdi-account-voice"
                        :items="communityTopics" 
                        v-model="communityTopic" 
                        :rules="topicRules" 
                        label="Community Topics" 
                        hint="Choose At Least 1 And Up To 5 Topics That Are Relevant To This Community!" 
                        persistent-hint 
                        required 
                        multiple
                        class="mb-4"
                    ></v-select>
                    <v-label 
                        class="font-weight-bold mt-5"
                    >
                        Select A Theme Color For Your Community
                    </v-label>
                    <v-color-picker class="mb-4" v-model="themeColor" :swatches="swatches" hide-mode-switch hide-inputs show-swatches></v-color-picker>
                    <v-row 
                        class="mt-4" 
                    >
                        <v-col 
                            cols="12"
                            class="mb-3"
                        >
                            <v-label class="font-weight-bold" 
                                color="red--text" 
                            >
                                Select An Avatar Image For The Community (Required)
                            </v-label>
                            <image-uploader
                                :debug="1"
                                :maxWidth="1024"
                                :maxHeight="1024"
                                :quality="0.99"
                                outputFormat="blob"
                                :preview=true
                                accept="image/jpeg, image/png, image/jpg"
                                v-model="avatarImg"
                                required
                            ></image-uploader>
                            <v-spacer></v-spacer>
                        </v-col>
                    </v-row>
                    <v-btn 
                        :color="user.profileTheme" 
                        outlined 
                        depressed 
                        class="mt-5"
                        @click="buildCommunity"
                    >
                        <v-icon>
                            mdi-wrench 
                        </v-icon>
                        Build Community 
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </div>
</template>

<script>

export default({
    name: 'BuildCommunity',
    data() {
        return {
            showOverlay: false,
            nameRe: /^\w+$/,
            alphaStartRe: /^[A-Za-z]+$/,
            communityName: '',
            nameRules: [
                v => !!v || 'Must Enter A Community Name!',
                v => this.alphaStartRe.test(v.slice(0, 1)) || 'Community Name Must Start With A Letter!',
                v => this.nameRe.test(v) || 'Must Enter Valid Characters For Community Name!',
                v => v.length >= 3 || 'Name Must Be At Least Three Characters!',
                v => v.length <= 21 || 'Name Can Only Be Up To 21 Characters Long!',
            ],
            communityTitle: '',
            titleRules: [
                v => !!v || 'Community Must Have A Title',
                v => v.length >= 3 || 'Title Needs To Be A Little Longer Than That!',
                v => v.length <= 50 || 'Title Cannot Be More Than 50 Characters Long!',
            ],
            communityTopic: '',
            communityTopics: [
                'Activism', 'Animals And Pets', 'Art', 'Astrology', 'Bars', 'Baseball', 'Beauty And Makeup', 'Biking', 'Black Lives Matter', 'Business', 'Careers', 'Cars And Motor Vehicles', 
                'Celebrity', 'College Baseball', 'College Basketball', 'College Football', 'Computer Science', 'Crafts And DYI', 'Crossfit', 'Crypto', 'Culture Race And Ethnicity', 'Day Trading', 'Economics',
                'Education', 'Electronics', 'Ethics And Philosophy', 'Family And Relationships', 'Fashion', 'Filming', 'Fitness And Nutrition', 'Food And Drink', 'Funny/Humor',
                'Gaming', 'Gender', 'Greek Life', 'History', 'Hobbies', 'Home And Garden', 'Hoosier Sports', 'Investing', 'International Culture', 'Internet Culture', 'Intramural Sports', 'Marijuna', 'Marketplace And Deals',
                'Mature Themes And Adult Content', 'Medical And Mental Health', "Men's Health", 'linkkup', 'Military', 'Movies', 'Music', 'NBA', 'NFL', 'Nigeria', 'Nursing',
                'Outdoors And Nature', 'Partying', 'Personal Connections', 'Photography', 'Podcasts And Streamers', 'Politics', 'Pop Culture', 'Programming', 'Public Policy', 'Reading Writing And Literature', 
                'Religion And Spirituality', 'Rowing', 'Running', 'Science', 'Sexual Health And Orientation', 'Side Hustle', 'Sports', 'Soccer', 'Social Justice', 'Tabletop Games', 'Television', 'Theatre', 'Track & Field', 'Volleyball',
                "Women's Health", 'World News', 'Working Out/Gym', 'Work/Labor'
            ],
            topicRules: [
                v => !!v || 'Must Select A Community Topic!',
                v => v.length >= 1 || 'Must Select At Least One Community Topic!',
                v => v.length <= 5 || 'Can Only Select Up To 5 Community Topics!',
            ],
            themeColor: '',
            swatches: [
                        ['#DC143C', '#AA0000', '#550000', '#7D3C98'],
                        ['#0B5345', '#1A5276', '#4A235A', '#192841'],
                        ['#00FF00', '#00AA00', '#005500', '#BA4A00'],
                        ['#00FFFF', '#00AAAA', '#005555', '#95A5A6 '],
                        ['#0000FF', '#0000AA', '#000055', '#000000'],
                    ],
            avatarImg: '',
        }
    },
    created() {
        this.correctTheme();
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
        correctTheme() {
            this.$store.commit('alterThemeColor', this.$store.state.user.profileTheme);
        },
        noSpaces(event) {
            event.preventDefault();
            return false;
        },
        buildCommunity() {
            //This is the method that will communicate with the server to build a community 
            this.showOverlay = true;
            if(this.avatarImg === '') {
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'Must Enter An Avatar Image!',
                    'error',
                );
                return false;
            }
            else if(!this.$refs.communityForm.validate()) {
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'Make Sure You Filled Out The Form Correctly And All Of The Form Fields!',
                    'error',
                );
                return false;
            }
            else {
                let fd = new FormData();
                fd.append('name', this.communityName);
                fd.append('title', this.communityTitle);
                fd.append('topics', this.communityTopic);
                fd.append('theme', this.themeColor);
                fd.append('avatar', this.avatarImg, 'communityAvatar.jpg');
                fd.append('creatorUsername', this.$store.state.user.username);
                fd.append('creatorUniqueUserId', this.$store.state.user.uniqueUserId);
                
                return axios({
                    method: 'POST',
                    url: `https://www.linkkup.com/api/build/community`,
                    data: fd,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    if(response.data === 'name taken') {
                        this.$swal(
                            'Uh Oh',
                            'That Community Name Is Taken.Please Select Another!',
                            'error',
                        );
                        this.communityName = '';
                    }
                    else {
                        this.showOverlay = false;
                        this.$router.push(`/linkkup/community/${this.communityName}`);
                    }
                }).catch(err => {
                    this.showOverlay = false;
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Creating That Community',
                        'error',
                    );
                });
            }
        },
    },
});
</script>