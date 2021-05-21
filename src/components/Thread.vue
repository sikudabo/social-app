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
                <v-card>
                    <v-app-bar 
                        :color="user.profileTheme" 
                        dark 
                    >
                        <div 
                            v-for="(name, index) in thread.users" 
                            :key="index"
                        >
                            <v-toolbar-title 
                                v-if="name !== user.username" 
                            >
                                {{ name }} 
                            </v-toolbar-title>
                        </div>
                        <v-spacer></v-spacer>
                        <div 
                            v-for="(uniqueUserId, index) in thread.uniqueUserIds" 
                            :key="index"
                        >
                            <v-avatar 
                                v-if="uniqueUserId !== user.uniqueUserId"  
                            >
                                <v-img 
                                    :src="`https://www.linkkup.com/api/user/avatar/${uniqueUserId}`" 
                                ></v-img>
                            </v-avatar>
                        </div>
                    </v-app-bar>
                    <v-list>
                        <v-card 
                            v-for="(msg, index) in thread.messages" 
                            :key="index" 
                        >
                            <v-card-title>
                                <v-list-item> 
                                    <v-list-item-avatar>
                                        <v-img 
                                            :src="`https://www.linkkup.com/api/user/avatar/${msg.senderUniqueUserId}`" 
                                            alt="linkkup User Avatar"
                                        ></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title 
                                            class="title" 
                                        >
                                            {{ msg.senderUsername }} 
                                        </v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-action-text>
                                        {{ msg.dateString }}
                                    </v-list-item-action-text>
                                </v-list-item>
                            </v-card-title>
                            <v-card-text>
                                <small>
                                    {{ msg.msg }} 
                                </small>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn 
                                    v-if="msg.senderUniqueUserId === user.uniqueUserId" 
                                    :color="user.profileTheme"
                                    icon 
                                    @click="delMsg(msg.uniqueMessageId)"
                                >
                                    <v-icon>
                                        mdi-trash-can 
                                    </v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
        <v-row 
            fixed 
        >
            <v-col 
                cols="12" 
            >
                <div 
                    v-for="(uniqueUserId, index) in thread.uniqueUserIds" 
                    :key="index" 
                >
                    <v-text-field 
                        v-if="uniqueUserId !== user.uniqueUserId"
                        :color="user.profileTheme" 
                        append-icon="mdi-send" 
                        v-model="newMsg" 
                        @click:append="sendMsg(uniqueUserId)"
                        outlined 
                        clearable 
                        label="Message"
                        placeholder="What's On Your Mind..."
                    ></v-text-field>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import {_} from 'vue-underscore';

export default({
    name: 'Thread',
    data() {
        return {
            thread: null,
            showOverlay: false,
            newMsg: '',
        }
    },
    created() {
        this.$store.commit('alterThemeColor', this.$store.state.user.profileTheme);
        this.fetchThread();
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
        fetchThread() {
            //This method will be responsible for fetching a thread from the DB.
            let uniqueThreadId = this.$route.params.threadid;

            return axios({
                method: 'GET',
                url: `https://www.linkkup.com/api/fetch/thread/${uniqueThreadId}`,
            }).then(response => {
                if(response.data === 'no thread found') {
                    this.$swal(
                        'Uh Oh',
                        'Could Not Find That Thread!',
                        'error',
                    );
                    this.$router.go(-1);
                }
                else {
                    this.thread = response.data.thread;
                    this.thread.messages = this.$_.sortBy(this.thread.messages, msg => msg.utcTime);
                }
            }).catch(err => {
                console.log(err.message);
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Getting That Message Thread!',
                    'error',
                );
                this.$router.go(-1);
            });
        },
        sendMsg(receiverUniqueUserId) {
            //This is the method that will handle sending a new message 
            this.showOverlay = true;
            if(this.newMsg) {
                let senderUniqueUserId = this.user.uniqueUserId;
                let senderUsername = this.user.username;
                let msg = this.newMsg;
                let currentDate = new Date();
                let dateString = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`
                let utcTime = Date.now();

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/send/dm',
                    data: JSON.stringify({
                        senderUniqueUserId: senderUniqueUserId,
                        senderUsername: senderUsername,
                        msg: msg,
                        dateString: dateString,
                        utcTime: utcTime,
                        receiverUniqueUserId: receiverUniqueUserId,
                        uniqueThreadId: this.thread.uniqueThreadId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.newMsg = '',
                    this.thread.messages = response.data.messages;
                }).catch(err => {
                    this.showOverlay = false;
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Sending That Message!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'You Must Enter A Message!',
                    'error',
                );
            }
        },
        delMsg(uniqueMessageId) {
            this.showOverlay = true; 
            let uniqueThreadId = this.thread.uniqueThreadId;

            return axios({
                method: 'POST',
                url: 'https://www.linkkup.com/api/delete/dm',
                data: JSON.stringify({
                    uniqueMessageId: uniqueMessageId,
                    uniqueThreadId: uniqueThreadId,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                this.showOverlay = false;
                this.thread.messages = response.data.messages;
            }).catch(err => {
                this.showOverlay = false;
                console.log(err.message);
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Deleting That Message!',
                    'error',
                );
            });
        },
    },
});
</script>
