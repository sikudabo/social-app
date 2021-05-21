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
                    
                    </h5>
                </v-overlay>
                <h3>
                    Create An Event!
                </h3>
                <p>
                    Use Linkkup To Share Any Events That You Have Coming Up In The Near Future Around IU. Linkkup Events
                    Allow You To Linkkup With People In The IU Community Who Are Fun And Share Your Interests.
                    Sharing Your Event Can Help You Reach More People, Meet New People And Improve The Overall 
                    Exposure For Your Event. These Events Can Be Parties, Campus Events, Sporting Events, Church, Volunteer
                    Work, Art, Music Or Anything You Can Think Of.
                </p>
            </v-col>
        </v-row>
        <v-row 
            class="mt-4" 
        >
            <v-col 
                cols="12" 
            >
                <v-form 
                    ref="eventform" 
                >
                    <v-text-field 
                        :color="user.profileTheme" 
                        label="Title"
                        placeholder="Give Your Event A Title Of Up To 75 Characters (Required)" 
                        counter="75" 
                        v-model="eventTitle" 
                        :rules="eventTitleRules" 
                        required 
                    ></v-text-field>
                    <v-date-picker 
                        v-model="eventDate" 
                        class="mt-4" 
                        :min="startDate"
                        :color="user.profileTheme"
                        :show-current="true"
                    ></v-date-picker>
                    <v-textarea  
                        v-model="eventDescription" 
                        :color="user.profileTheme" 
                        label="Event Description" 
                        placeholder="Describe Your Event In 1000 Characters Or Less (Required)" 
                        :rules="eventDescriptionRules" 
                        counter="1000"
                        required 
                        class="mt-4"
                    ></v-textarea>
                    <v-select 
                        :color="user.profileTheme"
                        v-model="eventTopic"
                        :items="eventTopicsList"
                        :rules="eventTopicRules"
                        label="Event Topics"
                        hint="Must Select At Least One Event Topic And Up To Five!"
                        persistent-hint
                        required 
                        multiple 
                    ></v-select>
                     <v-label class="font-weight-bold mt-4">
                        Select An Image For This Event (Required)
                    </v-label>
                    <image-uploader
                        :debug="1"
                        :maxWidth="1024"
                        :maxHeight="1024"
                        :quality="0.99"
                        outputFormat="blob"
                        :preview=false 
                        accept="image/jpeg, image/png, image/jpg"
                        v-model="eventSrc"
                        required
                    ></image-uploader>
                    <v-btn 
                        :color="user.profileTheme"
                        dark 
                        tile 
                        class="mt-3"
                        @click="createEvent"
                    >
                        Publish 
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </div>
</template>

<script>

export default({
    name: 'CreateEvent',
    data() {
        return {
            showOverlay: false,
            eventTitle: '',
            eventTitleRules: [
                v => !!v || 'Must Enter An Event Title!',
                v => v.length <= 75 || 'Event Title Cannot Be More Than 75 Characters!',
            ],
            eventDate: '',
            eventDescription: '',
            eventDescriptionRules: [
                v => !!v || 'Must Enter A Description For You Event!',
                v => v.length <= 1000 || 'Event Description Cannot Be More Than 1000 Characters!', 
            ],
            eventTopicsList: [
                'Activism', 'Animals And Pets', 'Art', 'Astrology', 'Bars', 'Baseball', 'Beauty And Makeup', 'Biking', 'Black Lives Matter', 'Business', 'Careers', 'Cars And Motor Vehicles', 
                'Celebrity', 'College Baseball', 'College Basketball', 'College Football', 'Computer Science', 'Crafts And DYI', 'Crossfit', 'Crypto', 'Culture Race And Ethnicity', 'Day Trading', 'Economics',
                'Education', 'Electronics', 'Ethics And Philosophy', 'Family And Relationships', 'Fashion', 'Filming', 'Fitness And Nutrition', 'Food And Drink', 'Funny/Humor',
                'Gaming', 'Gender', 'Greek Life', 'History', 'Hobbies', 'Home And Garden', 'Hoosier Sports', 'Investing', 'International Culture', 'Internet Culture', 'Intramural Sports', 'Marijuna', 'Marketplace And Deals',
                'Mature Themes And Adult Content', 'Medical And Mental Health', "Men's Health", 'linkkup', 'Military', 'Movies', 'Music', 'NBA', 'NFL', 'Nigeria', 'Nursing',
                'Outdoors And Nature', 'Partying', 'Personal Connections', 'Photography', 'Podcasts And Streamers', 'Politics', 'Pop Culture', 'Programming', 'Public Policy', 'Reading Writing And Literature', 
                'Religion And Spirituality', 'Rowing', 'Running', 'Science', 'Sexual Health And Orientation', 'Side Hustle', 'Sports', 'Soccer', 'Social Justice', 'Tabletop Games', 'Television', 'Theatre', 'Track & Field', 'Volleyball',
                "Women's Health", 'World News', 'Working Out/Gym', 'Work/Labor'
            ],
            eventTopic: [],
            eventTopicRules: [
                v => v.length > 0 || 'Must Select At Last One Event Topic!',
                v => v.length <= 5 || 'Can Only Select Up To 5 Topics Associated With This Event!',
            ],
            eventSrc: '',
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        userAuthenticated() {
            return this.$store.state.userAuthenticated;
        },
        startDate() {
            return this.getStartDate();
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
        createEvent() {
            //This method will interact with the server to create an event in a multipart/form-data post request 
            this.showOverlay = true;

            if(this.$refs.eventform.validate() && this.eventSrc !== '' && this.eventDate !== '') {
                let fd = new FormData();
                fd.append('title', this.eventTitle);
                fd.append('dateString', this.eventDate);
                fd.append('description', this.eventDescription);
                fd.append('topics', this.eventTopic);
                fd.append('username', this.user.username);
                fd.append('uniqueUserId', this.user.uniqueUserId);
                fd.append('utcTimeCreated', Date.now());
                let myDate = new Date(this.eventDate);
                let eventDateTime = myDate.getTime();
                fd.append('utcTime', eventDateTime);
                fd.append('avatar', this.eventSrc, 'avatar.jpg');

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/create/event',
                    data: fd,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.$refs.eventform.reset();
                    this.eventSrc = '';
                    this.eventDate = '';
                    this.$swal(
                        'Great!',
                        'Your Event Was Successfully Created!',
                        'success',
                    );
                    this.$router.push('/');
                }).catch(err => {
                    this.showOverlay = false;
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Creating Your Event!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'Make Sure The Form Is Filled Out Properly And All Required Fields Are Filled Out!',
                    'error',
                );
            }
        },
        getStartDate() {
            //This method will return a starting date as a "iso" string for us to show where event options should begin 
            let now = Date.now();
            let newDate = new Date(now);
            let year = newDate.getFullYear();
            let day = newDate.getDate().toString();
            let month = (newDate.getMonth() + 1).toString();
            if(day.length < 2) {
                day = '0' + day;
            }
            if(month.length < 2) {
                month = '0' + month;
            }
            return year + '-' + month + '-' + day;
        },
    },
});
</script>
