<template>
    <div 
        style="text-align: left;" 
    >
        <v-row 
            style="text-align: center;" 
        >
            <v-col 
                cols="12" 
            >
                <v-overlay 
                    :value="showOverlay"
                >
                    <v-progress-circular :color="community.communityTheme" indeterminate size="64"></v-progress-circular>
                    <h5>
                    
                    </h5>
                </v-overlay>
                <notifications 
                    group="foo"
                    :color="community.communityTheme" 
                    type="success"
                />
                <h5>
                    {{ community.chatRoom.name }} 
                </h5>
                <v-avatar 
                    tile 
                    size="200"
                >
                    <v-img 
                        :src="`https://www.linkkup.com/api/community/avatar/${community.name}`" 
                        alt="linkkup Community Avatar"
                        max-height="300px"
                    ></v-img>
                </v-avatar>
            </v-col>
        </v-row>
        <v-row 
            class="mt-2" 
        >
            <v-col 
                cols="12" 
            >
                <v-card 
                    width="100%"
                >
                    <v-app-bar 
                        :color="community.communityTheme" 
                        dark 
                    >
                        <v-toolbar-title>
                            Chat 
                        </v-toolbar-title>
                    </v-app-bar>
                        <v-card 
                            v-for="(msg, index) in community.chatRoom.messages" 
                            :key="index"  
                            class="mb-3"
                        >
                            <v-card-title>
                                <v-list-item 
                                >
                                    <v-list-item-avatar>
                                        <v-img 
                                            :src="`https://www.linkkup.com/api/user/avatar/${msg.uniqueUserId}`" 
                                            alt="linkkup User Avatar"
                                        ></v-img>
                                    </v-list-item-avatar>
                                    </v-list-item-content>
                                        <v-list-item-title 
                                            class="title" 
                                        >
                                            {{ msg.username }} 
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            <small>
                                                {{ timeDifference(msg.utcTime, msg.dateString) }}
                                            </small>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-card-title>
                            <v-card-text>
                                <small>
                                    {{ msg.text }} 
                                </small>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn 
                                    v-if="msg.uniqueUserId === user.uniqueUserId || community.moderator.uniqueUserId === user.uniqueUserId" 
                                    :color="community.communityTheme" 
                                    :data-msgid="msg.uniqueMessageId" 
                                    icon 
                                    @click="delMessage(msg.uniqueMessageId)"
                                >
                                    <v-icon>
                                        mdi-trash-can
                                    </v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-divider></v-divider>
                </v-card>
            </v-col>
        </v-row>
        <v-row 
            fixed 
            class="mt-4"
        >
            <v-col 
                cols="12" 
            >
                <v-text-field 
                    :color="community.communityTheme"
                    v-model="msg"
                    append-icon="mdi-send"
                    @click:append="sendMsg"
                    label="Message"
                    placeholder="Type A Message..."
                    outlined
                    clearable
                    v-on:keypress.13="sendMsg"
                ></v-text-field>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import io from 'socket.io-client';
import {_} from 'vue-underscore';

export default({
    name: 'CommunityChat',
    data() {
        return {
            community: null,
            msg: '',
            socket: io('https://www.linkkup.com/'),
            showOverlay: false,
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
    },
    created() {
        this.fetchCommunity();
    },
    mounted() {
        this.socket.on('newMsg', data => {
            let newMsg = {
                username: data.username,
                uniqueUserId: data.uniqueUserId,
                dateString: data.dateString,
                utcTime: parseInt(data.utcTime),
                uniqueMessageId: data.uniqueMessageId,
                community: data.community,
                room: data.room,
                text: data.msg,
            }
            this.community.chatRoom.messages.push(newMsg);
        });
        this.socket.on('userJoined', data => {
            let message = data.username + ' Joined the chat!';
            this.$notify({
                group: 'foo',
                title: 'User Joined',
                type: 'success',
                text: message,
                position: 'top center',
            });
        });
        this.socket.on('userLeft', data => {
            let message = data.username + ' has left the room!';
            this.$notify({
                group: 'foo',
                'title': 'User Left',
                'type': 'warn',
                'text': message,
                position: 'top center',
            });
        });
    },
    beforeDestroy() {
        this.socket.emit('leaveRoom', {
            room: this.community.name,
            username: this.user.username,
        });
    },
    methods: {
        fetchCommunity() {
            //This method will handle fetching the community from the database. 
            let communityName = this.$route.params.name;

            return axios({
                method: 'GET',
                url: `https://www.linkkup.com/api/fetch/community/${communityName}`,
            }).then(response => {
                if(response.data.community) {
                    if(response.data.community.blockList.find(person => person.uniqueUserId === this.user.uniqueUserId)) {
                        this.$swal(
                            'Uh Oh',
                            'You Are Blocked From This Community',
                            'success',
                        );
                        this.$router.go(-1);
                    }
                    else {
                        this.community = response.data.community;
                        this.$store.commit('alterThemeColor', response.data.community.communityTheme);
                        this.socket.emit('joinRoom', {
                            username: this.user.username,
                            room: response.data.community.name,
                        });
                    }
                }
                else {
                    this.$swal(
                        'Uh Oh',
                        'That Community Was Not Found!',
                        'error',
                    );
                    this.$router.go(-1);
                }
            }).catch(err => {
                this.$swal(
                    'Uh Oh',
                    'There was an error finding that community!'
                );
                this.$router.go(-1);
            });
        },
        sendMsg(e) {
            e.preventDefault();
            if(this.msg !== '') {
                let currentDate = new Date();
                let dateString = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`
                let utcTime = Date.now();
                this.socket.emit('sendMsg', {
                    username: this.user.username,
                    uniqueUserId: this.user.uniqueUserId,
                    dateString: dateString,
                    utcTime: utcTime,
                    uniqueMessageId: 'chatmessage' + this.user.uniqueUserId + utcTime,
                    community: this.community.name,
                    room: this.community.chatRoom.name,
                    msg: this.msg,
                    room: this.community.name,
                });
                this.msg = '';
            }
            else {
                this.$swal(
                    'Uh Oh',
                    'You Must Enter A Message!',
                    'error',
                );
            }
        },
        timeDifference(date2, dateString) {
            //This function will return whether or not we display something like "2 hrs ago" "20 min ago" or the date string for a post
            let date1 = Date.now();

            let difference = date1 - date2;

            let daysDifference = Math.floor(difference/1000/60/60/24);

            let hoursDifference = Math.floor(difference/1000/60/60);

            let minutesDifference = Math.floor(difference/1000/60);

            let secondsDifference = Math.floor(difference/1000);

            if(daysDifference > 0) {
                return dateString;
            }
            else if(hoursDifference > 0 && hoursDifference < 23) {
                return `${hoursDifference} hr ago`;
            }
            else if(minutesDifference > 0 && minutesDifference < 60) {
                return `${minutesDifference} min ago`;
            }
            else if(minutesDifference === 0) {
                return `${secondsDifference} secs ago`
            }
            else {
                return dateString;
            }

        },
        delMessage(uniqueMessageId) {
            //This method will handle deleting a chat message from a community chat room 
            this.showOverlay = true;
            let community = this.community.name;

            return axios({
                method: 'POST', 
                url: 'https://www.linkkup.com/api/chat/delete/message',
                data: JSON.stringify({uniqueMessageId: uniqueMessageId, community: community}),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                this.showOverlay = false;
                console.log(this.community.chatRoom.messages);
                this.community.chatRoom.messages = this.$_.reject(this.community.chatRoom.messages, msg => msg.uniqueMessageId === uniqueMessageId);
            }).catch(err => {
                console.log(err.message);
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Deleting That Chat Message!',
                    'error',
                );
            });
        },
    },
});
</script>