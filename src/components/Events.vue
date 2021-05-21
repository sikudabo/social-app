<template>
    <div 
        v-if="events.length < 1" 
    >
        <v-row>
            <v-col 
                cols="12" 
            >
                <p>
                    There Are Currently No Events Posted On Linkkup. You Should Create Some And Linkkup With People Today! 
                </p>
            </v-col>
        </v-row>
    </div>
    <div 
        v-else 
    >
        <v-row>
            <v-overlay 
                :value="showOverlay"
            >
                <v-progress-circular :color="user.profileTheme" indeterminate size="64"></v-progress-circular>
                <h5>
                
                </h5>
            </v-overlay>
        </v-row>
        <v-row 
            class="mb-4" 
        >
            <v-col 
                cols="12" 
            >
                <h2>
                    Linkkup Events 
                </h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col 
                cols="12" 
                sm="12"
                xs="12"
                md="12"
                lg="4"
                xl="4"
                class="d-flex"
                v-for="(event, index) in events" 
                :key="index" 
            >
                <v-card 
                    :id="event.uniqueEventId"
                >
                    <v-img 
                        :src="`https://www.linkkup.com/api/get-photo?photo=${event.src}`"
                        
                    ></v-img>
                    <v-card-title 
                        class="headline" 
                    >
                        <small>
                            {{ event.title }}
                        </small>
                    </v-card-title>
                    <v-card-subtitle>
                        <v-list-item>
                            <v-list-item-avatar 
                                style="cursor: pointer;" 
                                @click="profileView(event.username)" 
                            >
                                <v-img 
                                    :src="`https://www.linkkup.com/api/user/avatar/${event.uniqueUserId}`"
                                ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-subtitle>
                                {{ event.username }}
                            </v-list-item-subtitle>
                        </v-list-item>
                    </v-card-subtitle>
                    <v-card-subtitle>
                        {{ formatDate(event.dateString) }}
                    </v-card-subtitle>
                    <v-card-text>
                        <small>
                            {{ event.description }} 
                        </small>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn 
                            v-if="event.likes.find(liker => liker.uniqueUserId === user.uniqueUserId)"
                            :color="user.profileTheme"
                            icon 
                            @click="unlikeEvent(event.uniqueEventId, event.uniqueUserId)"
                        >
                            <v-icon>
                                mdi-thumb-up
                            </v-icon>
                            <small 
                                v-if="event.likes.length > 0" 
                            >
                                {{ event.likes.length }} 
                            </small>
                        </v-btn>
                        <v-btn 
                            v-else 
                            :color="user.profileTheme"
                            icon 
                            @click="likeEvent(event.uniqueEventId, event.uniqueUserId)"
                        >
                            <v-icon>
                                mdi-thumb-up-outline
                            </v-icon>
                            <small 
                                v-if="event.likes.length > 0" 
                            >
                                {{ event.likes.length }} 
                            </small>
                        </v-btn>
                        <v-btn 
                            v-if="event.attending.find(attendee => attendee.uniqueUserId === user.uniqueUserId)" 
                            :color="user.profileTheme"
                            text 
                            @click="unattendEvent(event.uniqueEventId)"
                        >
                            Unattend 
                        </v-btn>
                        <v-btn 
                            v-else 
                            :color="user.profileTheme"
                            text 
                            @click="attendEvent(event.uniqueEventId, event.uniqueUserId)"
                        >
                            Attend 
                        </v-btn>
                        <v-btn 
                            :color="user.profileTheme" 
                            icon 
                            @click="viewAttending(event.uniqueEventId)"
                        >
                            <v-icon>
                                mdi-account-group 
                            </v-icon>
                            <small 
                                v-if="event.attending.length > 0" 
                            >
                                {{ event.attending.length }}
                            </small>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn 
                            v-if="event.uniqueUserId === user.uniqueUserId" 
                            :color="user.profileTheme"
                            icon 
                            @click="delEvent(event.uniqueEventId, event.src)"
                        >
                            <v-icon>
                                mdi-trash-can 
                            </v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-divider></v-divider> 
                    <p>
                        <small 
                            class="d-inline"
                            v-for="(topic, index) in event.topics"
                            :key="index" 
                        >
                            {{ topic }},
                        </small>
                    </p>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import {_} from 'vue-underscore';

export default({
    name: 'Events',
    data() {
        return {
            events: [],
            showOverlay: false,
        }
    },
    created() {
        this.$store.commit('alterThemeColor', this.$store.state.user.profileTheme);
        this.fetchEvents();
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
        fetchEvents() {
            //This method will fetch all of the events from a database when the page is created
            return axios({
                method: 'GET',
                url: 'https://www.linkkup.com/api/fetch/events',
            }).then(response => {
                this.events = response.data.events;
            }).catch(err => {
                this.$swal(
                    'Uh Oh',
                    'Sorry! There Was An Error Finding The Events!',
                    'error',
                );
            });
        },
        profileView(username) {
            //This method will handle switching to a users' profile page if it is clicked in the event section!
            this.$router.push(`/linkkup/profile/${username}`);
        },
        formatDate(date) {
            let dateArray = date.split('-');
            let month = dateArray[1];
            let day = dateArray[2];
            let year = dateArray[0];
            return month + '-' + day + '-' + year;
        },
        likeEvent(uniqueEventId, uniqueUserId) {
            //This method will handle liking an event
            this.showOverlay = true;
            return axios({
                method: 'POST',
                url: 'https://www.linkkup.com/api/like/event',
                data: JSON.stringify({
                    uniqueEventId: uniqueEventId,
                    uniqueUserId: uniqueUserId,
                    likerUsername: this.user.username,
                    likerUniqueUserId: this.user.uniqueUserId,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                this.showOverlay = false;
                this.events = response.data.events;
            }).catch(err => {
                this.showOverlay = false;
                console.log(err.message);
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Liking That Event!',
                    'error',
                );
            });
        },
        unlikeEvent(uniqueEventId, uniqueUserId) {
            //This method will handle the functionality for unliking an event 
            this.showOverlay = true;
            return axios({
                method: 'POST',
                url: 'https://www.linkkup.com/api/unlike/event',
                data: JSON.stringify({
                    uniqueEventId: uniqueEventId,
                    uniqueUserId: uniqueUserId,
                    unlikerUniqueUserId: this.user.uniqueUserId,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                this.showOverlay = false;
                this.events = response.data.events;
            }).catch(err => {
                this.showOverlay = false;
                console.log(err.message);
                this.$swal(
                    'Uh Oh!',
                    'There Was An Error Unliking That Event!',
                    'error',
                );
            });
        },
        delEvent(uniqueEventId, src) {
            //This method will handle deleting an event from the database 
            this.showOverlay = true;
            
            return axios({
                method: 'POST',
                url: 'https://www.linkkup.com/api/del/event',
                data: JSON.stringify({
                    uniqueEventId: uniqueEventId,
                    src: src,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                this.showOverlay = false;
                this.events = response.data.events;
            }).catch(err => {
                this.showOverlay = false;
                console.log(err.message);
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Deleting That Event!',
                    'error',
                );
            });
        },
        attendEvent(uniqueEventId, uniqueUserId) {
            //This method will handle getting a user to attend an event 
            this.showOverlay = true;
            let attenderUniqueUserId = this.user.uniqueUserId;

            return axios({
                method: 'POST',
                url: 'https://www.linkkup.com/api/attend/event',
                data: JSON.stringify({
                    uniqueEventId: uniqueEventId,
                    uniqueUserId: uniqueUserId,
                    attenderUniqueUserId: attenderUniqueUserId,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                this.showOverlay = false;
                this.events = response.data.events;
            }).catch(err => {
                this.showOverlay = false;
                console.log(err.message);
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Signing You Up To Attend That Event!',
                    'error',
                );
            });
        },
        unattendEvent(uniqueEventId) {
            this.showOverlay = true;
            let unattender = this.user.uniqueUserId

            return axios({
                method: 'POST',
                url: 'https://www.linkkup.com/api/unattend/event',
                data: JSON.stringify({
                    uniqueEventId: uniqueEventId,
                    unattender: unattender,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                this.showOverlay = false;
                this.events = response.data.events;
            }).catch(err => {
                this.showOverlay = false;
                console.log(err.message);
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Unattending That Event!',
                    'error',
                );
            });
        },
        viewAttending(uniqueEventId) {
            //This method will route us to the AttendingEvent component that will show a user who is attending an event 
            this.$router.push(`/linkkup/event/attending/${uniqueEventId}`);
        },
    },
});
</script>
