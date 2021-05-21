<template>
    <div 
        v-if="posts.length < 1" 
    >
        <v-row>
            <v-col 
                cols="12" 
            >
                <h2>
                    Linkkup Feed
                </h2>
            </v-col>
        </v-row>
    </div>
    <div 
        v-else 
    >
        <v-row>
            <v-col 
                cols="12" 
            >
                <h2> 
                    Linkkup Feed 
                </h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col 
                cols="12" 
                xs="12"
                sm="12"
                md="12"
                lg="12"
                xl="12"
                v-for="(post, index) in posts"
                :key="index"
            >
                <v-card 
                    v-if="post.type === 'text' && post.context === 'personal'" 
                    width="100%"
                >
                    <v-card-title>
                        <v-list-item>
                            <v-list-item-avatar 
                                :data-username="post.username" 
                                style="cursor: pointer" 
                                @click="profileView($event)"
                            >
                                <v-img 
                                    :src="`https://www.linkkup.com/api/user/avatar/${post.uniqueUserId}`" 
                                ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ post.username }}
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action-text>
                                {{ timeDifference(post.utcTime, post.dateString) }}
                            </v-list-item-action-text>
                        </v-list-item>
                    </v-card-title>
                    <v-card-text>
                        {{ post.text }}
                    </v-card-text>
                    <v-card-actions>
                        <div 
                            v-if="postLikedTest(post.likes, user.uniqueUserId)"
                        >
                            <v-btn 
                                icon 
                                :color="user.profileTheme"
                                :data-unlikepost="post.uniquePostId"
                                :data-unlikeuser="user.uniqueUserId"
                            >
                                <v-icon>
                                    mdi-thumb-up
                                </v-icon>
                                <small 
                                    v-if="post.likes.length > 0" 
                                >
                                    {{ post.likes.length }} 
                                </small>
                            </v-btn>
                        </div>
                        <div 
                            v-else 
                        >
                            <v-btn 
                                icon
                                :color="user.profileTheme"
                                :data-likepost="post.uniquePostId"
                                :data-likeuser="user.uniqueUserId"
                            >
                                <v-icon>
                                    mdi-thumb-up-outline
                                </v-icon>
                                <small 
                                    v-if="post.likes.length > 0" 
                                >
                                    {{ post.likes.length }} 
                                </small>
                            </v-btn>
                        </div>
                        <v-btn 
                            icon 
                            :color="user.profileTheme"
                        >
                            <v-icon>
                                mdi-comment 
                            </v-icon>
                            <small 
                                v-if="post.comments.length > 0" 
                            >
                                {{ post.comments.length }} 
                            </small>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <router-link :to="`/comments/${post.uniquePostId}`" class="side_bar_link">
                            <v-btn 
                                :color="user.profileTheme" 
                                text 
                            >
                                View Post 
                            </v-btn>
                        </router-link>
                    </v-card-actions>
                </v-card>
                <!--End Of The Text Posts For Personal Profile Posts-->
                <!--Beginning Of Photo Posts For Community Posts-->
                <v-card 
                    v-else-if="post.type === 'photo' && post.context === 'personal'" 
                    width="100%"
                >
                    <v-card-title>
                        <v-list-item>
                            <v-list-item-avatar 
                                :data-username="post.username" 
                                @click="profileView($event)" 
                                style="cursor: pointer;" 
                            >
                                <v-img 
                                    :src="`https://www.linkkup.com/api/user/avatar/${post.uniqueUserId}`"
                                    alt="linkkup User Avatar"
                                ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ post.username }} 
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action-text>
                                {{ timeDifference(post.utcTime, post.dateString) }}
                            </v-list-item-action-text>
                        </v-list-item>
                    </v-card-title>
                    <div 
                        height="500px"
                        width="100%" 
                        class="photoContainer" 
                    >
                        <v-img 
                            :src="`https://www.linkkup.com/api/get-photo?photo=${post.src}`" 
                            alt="linkkup Personal Feed Photo"
                            height="100%"
                        ></v-img>
                    </div>
                    <v-card-text>
                        {{ post.caption }} 
                    </v-card-text>
                    <v-card-actions>
                        <div 
                            v-if="postLikedTest(post.likes, user.uniqueUserId)"
                        >
                            <v-btn 
                                icon 
                                :color="user.profileTheme"
                                :data-unlikepost="post.uniquePostId"
                                :data-unlikeuser="user.uniqueUserId"
                            >
                                <v-icon>
                                    mdi-thumb-up
                                </v-icon>
                                <small 
                                    v-if="post.likes.length > 0" 
                                >
                                    {{ post.likes.length }} 
                                </small>
                            </v-btn>
                        </div>
                        <div 
                            v-else 
                        >
                            <v-btn 
                                icon
                                :color="user.profileTheme"
                                :data-likepost="post.uniquePostId"
                                :data-likeuser="user.uniqueUserId"
                            >
                                <v-icon>
                                    mdi-thumb-up-outline
                                </v-icon>
                                <small 
                                    v-if="post.likes.length > 0" 
                                >
                                    {{ post.likes.length }} 
                                </small>
                            </v-btn>
                        </div>
                        <v-btn 
                            icon 
                            :color="user.profileTheme"
                        >
                            <v-icon>
                                mdi-comment 
                            </v-icon>
                            <small 
                                v-if="post.comments.length > 0" 
                            >
                                {{ post.comments.length }} 
                            </small>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <router-link :to="`/comments/${post.uniquePostId}`" class="side_bar_link">
                            <v-btn 
                                :color="user.profileTheme" 
                                text 
                            >
                                View Post
                            </v-btn>
                        </router-link>
                    </v-card-actions>
                </v-card>
                <!--End Of Personal Profile Posts In The Feed-->
                <!--Beginning Of Personal Video Posts In The Feed-->
                <v-card 
                    v-else-if="post.type === 'video' && post.context === 'personal'" 
                    width="100%"
                >
                    <v-card-title>
                        <v-list-item>
                            <v-list-item-avatar 
                                :data-username="post.username" 
                                @click="profileView($event)" 
                                style="cursor: pointer;" 
                            >
                                <v-img 
                                    :src="`https://www.linkkup.com/api/user/avatar/${post.uniqueUserId}`"
                                    alt="linkkup User Avatar"
                                ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ post.username }} 
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action-text>
                                {{ timeDifference(post.utcTime, post.dateString) }}
                            </v-list-item-action-text>
                        </v-list-item>
                    </v-card-title>
                    <div 
                        height="500px"
                        width="100%" 
                        class="photoContainer" 
                    >
                        <vue-plyr>
                            <video 
                                playsinline="true" 
                            >
                                <source 
                                    :src="`https://www.linkkup.com/api/get-video?video=${post.src}`"  
                                ></source>
                            </video>
                        </vue-plyr>
                    </div>
                    <v-card-text>
                        {{ post.caption }} 
                    </v-card-text>
                    <v-card-actions>
                        <div 
                            v-if="postLikedTest(post.likes, user.uniqueUserId)"
                        >
                            <v-btn 
                                icon 
                                :color="user.profileTheme"
                                :data-unlikepost="post.uniquePostId"
                                :data-unlikeuser="user.uniqueUserId"
                            >
                                <v-icon>
                                    mdi-thumb-up
                                </v-icon>
                                <small 
                                    v-if="post.likes.length > 0" 
                                >
                                    {{ post.likes.length }} 
                                </small>
                            </v-btn>
                        </div>
                        <div 
                            v-else 
                        >
                            <v-btn 
                                icon
                                :color="user.profileTheme"
                                :data-likepost="post.uniquePostId"
                                :data-likeuser="user.uniqueUserId"
                            >
                                <v-icon>
                                    mdi-thumb-up-outline
                                </v-icon>
                                <small 
                                    v-if="post.likes.length > 0" 
                                >
                                    {{ post.likes.length }} 
                                </small>
                            </v-btn>
                        </div>
                        <v-btn 
                            icon 
                            :color="user.profileTheme"
                        >
                            <v-icon>
                                mdi-comment 
                            </v-icon>
                            <small 
                                v-if="post.comments.length > 0" 
                            >
                                {{ post.comments.length }} 
                            </small>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <router-link :to="`/comments/${post.uniquePostId}`" class="side_bar_link">
                            <v-btn 
                                :color="user.profileTheme" 
                                text 
                            >
                                View Post 
                            </v-btn>
                        </router-link>
                    </v-card-actions>
                </v-card>
                <!--End Of Personal Video Posts-->
                <!--Now Begin The UI For Community Text Posts-->
                <v-card 
                    v-if="post.type === 'text' && post.context === 'community'" 
                    :id="post.uniquePostId"
                >
                    <v-card-title>
                        <v-list-item>
                            <v-list-item-avatar
                                style="cursor: pointer;" 
                                @click="communityView(post.community)" 
                            >
                                <v-img 
                                    :src="`https://www.linkkup.com/api/community/avatar/${post.community}`" 
                                ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title 
                                    class="title" 
                                    style="cursor: pointer;"
                                    @click="profileView($event)"
                                    :data-username="post.username"
                                >
                                    {{ post.username }} 
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action-text>
                                <small>
                                    {{ timeDifference(post.utcTime, post.dateString) }}
                                </small>
                            </v-list-item-action-text>
                        </v-list-item>
                    </v-card-title>
                    <v-card-text>
                        {{ post.text }} 
                    </v-card-text>
                    <v-card-actions>
                        <div 
                        v-if="postLikedTest(post.likes, user.uniqueUserId)"
                        >
                            <v-btn 
                                icon 
                                :color="user.profileTheme"
                                :data-unlikepost="post.uniquePostId"
                                :data-unlikeuser="user.uniqueUserId"
                            >
                                <v-icon>
                                    mdi-thumb-up
                                </v-icon>
                                <small 
                                    v-if="post.likes.length > 0" 
                                >
                                    {{ post.likes.length }} 
                                </small>
                            </v-btn>
                        </div>
                        <div 
                            v-else 
                        >
                            <v-btn 
                                icon
                                :color="user.profileTheme"
                                :data-likepost="post.uniquePostId"
                                :data-likeuser="user.uniqueUserId"
                            >
                                <v-icon>
                                    mdi-thumb-up-outline
                                </v-icon>
                                <small 
                                    v-if="post.likes.length > 0" 
                                >
                                    {{ post.likes.length }} 
                                </small>
                            </v-btn>
                        </div>
                        <v-btn 
                            icon 
                            :color="user.profileTheme"
                        >
                            <v-icon>
                                mdi-comment 
                            </v-icon>
                            <small 
                                v-if="post.comments.length > 0" 
                            >
                                {{ post.comments.length }} 
                            </small>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <router-link :to="`/comments/${post.uniquePostId}`" class="side_bar_link">
                            <v-btn 
                                :color="user.profileTheme" 
                                text 
                            >
                                View Post 
                            </v-btn>
                        </router-link>
                    </v-card-actions>
                </v-card>
                <!--End Of The UI For Community Text Posts-->
                <!--Now Begin The UI For Community Link Posts-->
                <v-card 
                    v-else-if="post.type === 'link' && post.context === 'community'" 
                    :id="post.uniquePostId"
                >
                    <v-card-title>
                        <v-list-item>
                            <v-list-item-avatar 
                                style="cursor: pointer;" 
                                @click="communityView(post.community)" 
                            >
                                <v-img 
                                    :src="`https://www.linkkup.com/api/community/avatar/${post.community}`" 
                                ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title 
                                    class="title" 
                                    style="cursor: pointer;"
                                    @click="profileView($event)"
                                    :data-username="post.username"
                                >
                                    {{ post.username }} 
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action-text>
                                <small>
                                    {{ timeDifference(post.utcTime, post.dateString) }}
                                </small>
                            </v-list-item-action-text>
                        </v-list-item>
                    </v-card-title>
                    <div 
                        max-height="350px" 
                    >
                        <v-img 
                            :src="post.src" 
                        ></v-img>
                    </div>
                    <v-card-text>
                        <h2>
                            {{ post.title }}
                        </h2>
                        <small>
                            {{ post.text }} 
                        </small>
                        <small>
                            <a 
                                class="text-decoration-none"
                                :href="post.link" 
                                :color="user.profileTheme"
                            >
                                Story 
                            </a>
                        </small>
                    </v-card-text>
                    <v-card-actions>
                        <div 
                        v-if="postLikedTest(post.likes, user.uniqueUserId)"
                        >
                            <v-btn 
                                icon 
                                :color="user.profileTheme"
                                :data-unlikepost="post.uniquePostId"
                                :data-unlikeuser="user.uniqueUserId"
                            >
                                <v-icon>
                                    mdi-thumb-up
                                </v-icon>
                                <small 
                                    v-if="post.likes.length > 0" 
                                >
                                    {{ post.likes.length }} 
                                </small>
                            </v-btn>
                        </div>
                        <div 
                            v-else 
                        >
                            <v-btn 
                                icon
                                :color="user.profileTheme"
                                :data-likepost="post.uniquePostId"
                                :data-likeuser="user.uniqueUserId"
                            >
                                <v-icon>
                                    mdi-thumb-up-outline
                                </v-icon>
                                <small 
                                    v-if="post.likes.length > 0" 
                                >
                                    {{ post.likes.length }} 
                                </small>
                            </v-btn>
                        </div>
                        <v-btn 
                            icon 
                            :color="user.profileTheme"
                        >
                            <v-icon>
                                mdi-comment 
                            </v-icon>
                            <small 
                                v-if="post.comments.length > 0" 
                            >
                                {{ post.comments.length }} 
                            </small>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <router-link :to="`/comments/${post.uniquePostId}`" class="side_bar_link">
                            <v-btn 
                                :color="user.profileTheme" 
                                text 
                            >
                                View Post 
                            </v-btn>
                        </router-link>
                    </v-card-actions>
                </v-card>
                <!--End Of Community Link Post Posts UI-->
                <!--Beginning Of Photo Community Posts-->
                <v-card 
                    v-else-if="post.type === 'photo' && post.context === 'community'" 
                    width="100%"
                >
                    <v-card-title>
                        <v-list-item>
                            <v-list-item-avatar 
                                :data-username="post.username" 
                                @click="communityView(post.community)" 
                                style="cursor: pointer;" 
                            >
                                <v-img 
                                    :src="`https://www.linkkup.com/api/community/avatar/${post.community}`"
                                    alt="linkkup Community Avatar"
                                ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content 
                                style="cursor: pointer;" 
                                :data-username="post.username" 
                                @click="profileView($event)" 
                            >
                                <v-list-item-title 
                                    class="title" 
                                >
                                    {{ post.username }} 
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action-text>
                                {{ timeDifference(post.utcTime, post.dateString) }}
                            </v-list-item-action-text>
                        </v-list-item>
                    </v-card-title>
                    <div 
                        height="500px"
                        width="100%" 
                        class="photoContainer" 
                    >
                        <v-img 
                            :src="`https://www.linkkup.com/api/get-photo?photo=${post.src}`" 
                            alt="linkkup Community Feed Photo"
                            height="100%"
                        ></v-img>
                    </div>
                    <v-card-text>
                        {{ post.caption }} 
                    </v-card-text>
                    <v-card-actions>
                        <div 
                            v-if="postLikedTest(post.likes, user.uniqueUserId)"
                        >
                            <v-btn 
                                icon 
                                :color="user.profileTheme"
                                :data-unlikepost="post.uniquePostId"
                                :data-unlikeuser="user.uniqueUserId"
                            >
                                <v-icon>
                                    mdi-thumb-up
                                </v-icon>
                                <small 
                                    v-if="post.likes.length > 0" 
                                >
                                    {{ post.likes.length }} 
                                </small>
                            </v-btn>
                        </div>
                        <div 
                            v-else 
                        >
                            <v-btn 
                                icon
                                :color="user.profileTheme"
                                :data-likepost="post.uniquePostId"
                                :data-likeuser="user.uniqueUserId"
                            >
                                <v-icon>
                                    mdi-thumb-up-outline
                                </v-icon>
                                <small 
                                    v-if="post.likes.length > 0" 
                                >
                                    {{ post.likes.length }} 
                                </small>
                            </v-btn>
                        </div>
                        <v-btn 
                            icon 
                            :color="user.profileTheme"
                        >
                            <v-icon>
                                mdi-comment 
                            </v-icon>
                            <small 
                                v-if="post.comments.length > 0" 
                            >
                                {{ post.comments.length }} 
                            </small>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <router-link :to="`/comments/${post.uniquePostId}`" class="side_bar_link">
                            <v-btn 
                                :color="user.profileTheme" 
                                text 
                            >
                                View Post 
                            </v-btn>
                        </router-link>
                    </v-card-actions>
                </v-card>
                <!--End Of The Community Photo Posts-->
                <!--Now Set Up The UI For Video Community Posts-->
                <v-card 
                    v-else-if="post.type === 'video'" 
                    width="100%"
                >
                    <v-card-title>
                        <v-list-item>
                            <v-list-item-avatar  
                                style="cursor: pointer;"
                                @click="communityView(post.community)"
                            >
                                <v-img 
                                    :src="`https://www.linkkup.com/api/community/avatar/${post.community}`"
                                    alt="linkkup Community Avatar"
                                ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content 
                                style="cursor: pointer;" 
                                :data-username="post.username" 
                                @click="profileView($event)" 
                            >
                                <v-list-item-title 
                                    class="title" 
                                >
                                    {{ post.username }} 
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action-text>
                                {{ timeDifference(post.utcTime, post.dateString) }}
                            </v-list-item-action-text>
                        </v-list-item>
                    </v-card-title>
                    <div 
                        height="500px"
                        width="100%" 
                        class="photoContainer" 
                    >
                        <vue-plyr>
                            <video 
                                playsinline="true" 
                            >
                                <source 
                                    :src="`https://www.linkkup.com/api/get-video?video=${post.src}`"  
                                ></source>
                            </video>
                        </vue-plyr>
                    </div>
                    <v-card-text>
                        {{ post.caption }} 
                    </v-card-text>
                    <v-card-actions>
                        <div 
                            v-if="postLikedTest(post.likes, user.uniqueUserId)"
                        >
                            <v-btn 
                                icon 
                                :color="user.profileTheme"
                                :data-unlikepost="post.uniquePostId"
                                :data-unlikeuser="user.uniqueUserId"
                            >
                                <v-icon>
                                    mdi-thumb-up
                                </v-icon>
                                <small 
                                    v-if="post.likes.length > 0" 
                                >
                                    {{ post.likes.length }} 
                                </small>
                            </v-btn>
                        </div>
                        <div 
                            v-else 
                        >
                            <v-btn 
                                icon
                                :color="user.profileTheme"
                                :data-likepost="post.uniquePostId"
                                :data-likeuser="user.uniqueUserId"
                            >
                                <v-icon>
                                    mdi-thumb-up-outline
                                </v-icon>
                                <small 
                                    v-if="post.likes.length > 0" 
                                >
                                    {{ post.likes.length }} 
                                </small>
                            </v-btn>
                        </div>
                        <v-btn 
                            icon 
                            :color="user.profileTheme"
                        >
                            <v-icon>
                                mdi-comment 
                            </v-icon>
                            <small 
                                v-if="post.comments.length > 0" 
                            >
                                {{ post.comments.length }} 
                            </small>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <router-link :to="`/comments/${post.uniquePostId}`" class="side_bar_link">
                            <v-btn 
                                :color="user.profileTheme" 
                                text 
                            >
                                View Post 
                            </v-btn>
                        </router-link>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>

export default({
    name: 'Feed',
    data() {
        return {
            posts: [],
        }
    },
    created() {
        this.$store.commit('alterThemeColor', this.$store.state.user.profileTheme);
        this.fetchPosts();
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
        fetchPosts() {
            //This method will handle fetching all posts from the database in chronological order 
            return axios({
                method: 'GET',
                url: 'https://www.linkkup.com/api/fetch/feed',
            }).then(response => {
                this.posts = response.data.posts;
            }).catch(err => {
                console.log(err.message);
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Getting The Posts For The Linkkup Feed!',
                    'error',
                );
                this.$router.go(-1);
            });
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
        postLikedTest(likes, uniqueUserId) {
            let inLikes = likes.find(like => like.uniqueUserId === uniqueUserId);
            if(inLikes) {
                return true;
            }
            else {
                return false;
            }
        },
        profileView(event) {
            //Method that will handle routing to profile page of user if avatar is clicked.
            let username = event.currentTarget.getAttribute('data-username');
            this.$router.push(`/linkkup/profile/${username}`);
        },
        communityView(communityName) {
            //This method will handle routing to a community 
            this.$router.push(`/linkkup/community/${communityName}`);
        },
    },
});
</script>
