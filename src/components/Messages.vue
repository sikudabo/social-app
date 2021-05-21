<template>
    <div>
        <v-row>
            <v-col 
                cols="12" 
            >
                <v-dialog 
                    fullscreen
                    v-model="dialog"
                    max-width="100%" 
                    transition="dialog-bottom-transition"
                >
                    <template 
                        v-slot:activator="{on, attrs}" 
                    >
                        <v-btn 
                            :color="user.profileTheme" 
                            outlined
                            tile 
                            v-on="on"
                            v-bind="attrs"
                        >
                            <v-icon>
                                mdi-pencil 
                            </v-icon>
                            Compose Message 
                        </v-btn>
                    </template>
                    <v-overlay 
                        :value="showOverlay"
                    >
                        <v-progress-circular :color="user.profileTheme" indeterminate size="64"></v-progress-circular>
                        <h5>
                        
                        </h5>
                    </v-overlay>
                    <v-card>
                        <v-card-title 
                            class="title" 
                        >
                            <v-icon 
                                @click="dialog = !dialog" 
                                left 
                            >
                                mdi-close 
                            </v-icon>
                            Message 
                        </v-card-title>
                        <v-autocomplete 
                            class="mt-4" 
                            :items="users"
                            v-model="userTo" 
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
                        <v-form 
                            ref="msgform" 
                            class="mt-4"
                        >
                            <v-text-field 
                                v-model="userTo" 
                                :color="user.profileTheme"
                                label="To" 
                                placeholder="To" 
                                prepend-icon="mdi-account" 
                                :rules="userToRules"
                                readonly
                            ></v-text-field>
                            <v-textarea 
                                v-model="msg"
                                :color="user.profileTheme"
                                placeholder="What's On Your Mind..."
                                label="Message" 
                                prepend-icon="mdi-email" 
                                :rules="msgRules"
                            ></v-textarea>
                            <v-btn 
                                :color="user.profileTheme" 
                                dark 
                                @click="sendMsg"
                            >
                                Send 
                            </v-btn>
                        </v-form>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
        <v-row 
            class="mt-4" 
        >
            <v-col 
                cols="12" 
            >
                <v-card>
                    <v-app-bar 
                        :color="user.profileTheme" 
                        dark 
                    >
                        <v-toolbar-title>
                            Inbox 
                        </v-toolbar-title>
                    </v-app-bar>
                    <v-list 
                    >
                        <v-list-item-group 
                            :color="user.profileTheme" 
                            :value="show" 
                        >
                            <div 
                                v-if="threads.length > 0 && threads !== null" 
                            >
                                <div 
                                    v-for="(thread, index) in threads" 
                                    :key="index" 
                                >
                                    <v-list-item 
                                        v-if="thread.messages.length > 0"
                                        three-line 
                                        @click="findThread(thread.uniqueThreadId)"
                                    >
                                        <div 
                                            v-for="(uniqueUserId, index) in thread.uniqueUserIds" 
                                            :key="index" 
                                        >
                                            <v-list-item-avatar 
                                                v-if="uniqueUserId !== user.uniqueUserId" 
                                            >
                                                <v-img 
                                                    :src="`https://www.linkkup.com/api/user/avatar/${uniqueUserId}`" 
                                                ></v-img>
                                            </v-list-item-avatar>
                                        </div>
                                        <v-list-item-content>
                                            <div 
                                                v-for="(person, index) in thread.users" 
                                            >
                                                <v-list-item-title 
                                                    v-if="person !== user.username" 
                                                    class="title"
                                                >
                                                    {{ person }} 
                                                </v-list-item-title>
                                            </div>
                                            <v-list-item-subtitle>
                                                {{ thread.messages[0].msg }}
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-list-item-action-text>
                                            {{ thread.messages[0].dateString }}
                                        </v-list-item-action-text>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                </div>
                            </div>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>

export default({
    name: 'Messags',
    data() {
        return {
            dialog: false,
            showOverlay: false,
            show: true,
            userTo: '',
            userToRules: [
                v => !!v || 'Must Select A User To Send A Message To!',
            ],
            msg: '',
            msgRules: [
                v => !!v || 'You Must Enter A Message!',
            ],
            users: null,
            threads: null,
        }
    },
    created() {
        this.$store.commit('alterThemeColor', this.$store.state.user.profileTheme);
        this.fetchUsers();
        this.fetchThreads();
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
        fetchUsers() {
            return axios({
                method: 'GET',
                url: 'https://www.linkkup.com/api/fetch/users',
            }).then(response => {
                this.users = response.data.users;
                this.$store.commit('alterThemeColor', this.$store.state.user.profileTheme);
                console.log(response.data.user);
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
        fetchThreads() {
            //This is the method that will fetch all threads that include this user from the database on the created hook
            
            return axios({
                method: 'GET',
                url: `https://www.linkkup.com/api/fetch/threads/${this.user.uniqueUserId}`,
            }).then(response => {
                if(response.data.threads.length < 1) {
                    this.threads = [];
                }
                else if(!response.data.threads) {
                    this.threads = [];
                }
                else {
                    this.threads = response.data.threads;
                }
            }).catch(err => {
                console.log(err.message);
                console.log('There is an error, but it is not defined!');
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Getting Your Message Threads!',
                    'error',
                );
                this.$router.go(-1);
            });
        },
        sendMsg() {
            //This is the method that will trigger sending a DM to another user.
            this.showOverlay = true;
            if(this.$refs.msgform.validate()) {
                let senderUniqueUserId = this.user.uniqueUserId;
                let senderUsername = this.user.username;
                let receiverUsername = this.userTo;
                let msg = this.msg;
                let utcTime = Date.now();
                let currentDate = new Date();
                let dateString = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/send/raw/dm',
                    data: JSON.stringify({senderUniqueUserId: senderUniqueUserId, senderUsername: senderUsername, receiverUsername: receiverUsername, msg: msg, utcTime: utcTime, currentDate: currentDate, dateString: dateString}),
                    headers:{
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    if(response.data === 'user not found') {
                        this.showOverlay = false;
                        this.$swal(
                            'Uh Oh!',
                            'We Could Not Find That User To Send A Message To!',
                            'error',
                        );
                    }
                    else {
                        this.showOverlay = false;
                        this.$swal(
                            'Great!',
                            'Message Successfully Sent!',
                            'success',
                        );
                        this.threads = response.data.updatedThreads;
                        this.userTo = '';
                        this.msg = '';
                        this.$refs.msgform.reset();
                        this.dialog = false;
                    }
                }).catch(err => {
                    this.showOverlay = false;
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Sending That Message!',
                        'error',
                    );
                });
            }
            else {
                this.$swal(
                    'Uh Oh',
                    'Make Sure The Form Is Filled Out Properly Before Sending This Message!',
                    'error',
                );
            }
        },
        findThread(uniqueThreadId) {
            //The method will handle taking us to a specific thread when a thread is clicked
            this.$router.push(`/linkkup/messages/thread/${uniqueThreadId}`);
        },
    },
});
</script>