<template>
    <div>
        <v-row 
            class="mb-4" 
        >
            <v-col 
                cols="12" 
            >
                <v-overlay 
                    :value="showOverlay"
                >
                    <v-progress-circular :color="linkkupUser.profileTheme" indeterminate size="64"></v-progress-circular>
                    <h5>
                    
                    </h5>
                </v-overlay>
                <v-avatar 
                    size="168"
                    class="mb-4" 
                >
                    <v-img 
                        :src="`https://www.linkkup.com/api/get-photo?photo=${linkkupUser.avatar}`"
                        contained 
                        alt="linkkup Profile Image"
                    ></v-img>
                </v-avatar>
                <p 
                    class="font-weight-bold" 
                >
                    {{ linkkupUser.username }}
                </p>
                <div 
                    v-if="linkkupUser.verifiedUser[0] === true"
                >
                    <v-icon 
                        color="success" 
                    >
                        mdi-check-circle 
                    </v-icon>
                    Verified 
                </div>
            </v-col>
        </v-row>
        <v-row
            class="mb-4"
        >
            <v-col 
                cols="4"
            >
                <p
                     v-if="linkkupUser.followers.length === 1"
                    class="font-weight-bold"
                    @click="findFollowers"
                    style="cursor: pointer;"
                >
                    {{ linkkupUser.followers.length }} <v-spacer></v-spacer> Follower 
                </p>
                <p 
                    v-else-if="linkkupUser.followers.length < 1" 
                    class="font-weight-bold"
                >
                    0 <v-spacer></v-spacer> Followers 
                </p>
                <p 
                    v-else
                    class="font-weight-bold"
                    style="cursor: pointer;"
                    @click="findFollowers"
                >
                    {{ linkkupUser.followers.length }} <v-spacer></v-spacer> Followers 
                </p>
            </v-col>
            <v-col 
                cols="4"
            >
                <p 
                    v-if="linkkupUser.following.length < 1" 
                    class="font-weight-bold"
                >
                    Following <v-spacer></v-spacer> 0 
                </p>
                <p 
                    v-else
                    class="font-weight-bold"
                    style="cursor: pointer;"
                    @click="findFollowing"
                >
                    Following <v-spacer></v-spacer> {{ linkkupUser.following.length }}
                </p>
            </v-col>
            <v-col 
                cols="4"
            >
                <p 
                    class="font-weight-bold"
                >
                    Karma <v-spacer></v-spacer> {{ linkkupUser.karma }}
                </p>
            </v-col>
        </v-row>
        <v-row>
            <v-col 
                cols="12" 
            >
                <p 
                    class="font-weight-bold"
                >
                    {{ linkkupUser.firstName + ' ' + linkkupUser.lastName }} 
                </p>
            </v-col>
        </v-row>
        <v-row 
            class="mt-4" 
        >
            <v-col 
                cols="12" 
            >
                <v-btn 
                    v-if="linkkupUser.followers.find(u => u.uniqueUserId === user.uniqueUserId)" 
                    :color="themeColor"
                    dark 
                    depressed
                    @click="unfollowUser"
                >
                    Unfollow 
                </v-btn>
                <v-btn 
                    v-else 
                    :color="themeColor" 
                    dark 
                    depressed 
                    @click="followUser"
                >
                    Follow 
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col 
                cols="12"
            >
                <template 
                >
                    <v-tabs
                        v-model="tabs"
                        centered 
                        :background-color="linkkupUser.profileTheme"
                        dark
                    >
                        <v-tab>
                            Posts 
                        </v-tab>
                        <v-tab>
                            About 
                        </v-tab>
                        <v-tab>
                            Events 
                        </v-tab>
                    </v-tabs>
                </template>
                <v-tabs-items 
                    v-model="tabs"
                    class="mt-4"
                >
                    <v-tab-item 
                        v-if="linkkupUserPosts.length > 0" 
                    >
                        <v-row
                           
                        >
                            <v-col 
                                cols="12"
                                xs="12"
                                sm="12"
                                md="12"
                                lg="4"
                                xl="4"
                                class="d-lg-flex"
                                v-for="(post, index) in linkkupUserPosts"
                                :key='index'
                            >
                                <v-card 
                                    v-if="post.type === 'text'" 
                                    width="100%"
                                >
                                    <v-card-title>
                                        <v-list-item>
                                            <v-list-item-avatar 
                                                :data-username="post.username" 
                                                @click="profileView($event)" 
                                                style="cursor: pointer" 
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
                                                :color="linkkupUser.profileTheme"
                                                @click="unlikePost"
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
                                                :color="linkkupUser.profileTheme"
                                                @click="likePost"
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
                                        <router-link :to="`/comments/${post.uniquePostId}`" class="side_bar_link">
                                            <v-btn 
                                                icon 
                                                :color="linkkupUser.profileTheme"
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
                                        </router-link>
                                    </v-card-actions>
                                </v-card>
                                <!--End of text posts-->
                                <!--Begin photo posts-->
                                <v-card 
                                    v-else-if="post.type === 'photo'" 
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
                                                :color="themeColor"
                                                @click="unlikePost"
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
                                                :color="themeColor"
                                                @click="likePost"
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
                                        <router-link :to="`/comments/${post.uniquePostId}`" class="side_bar_link">
                                            <v-btn 
                                                icon 
                                                :color="themeColor"
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
                                        </router-link>
                                    </v-card-actions>
                                </v-card>
                                <!--End Of UI For Photo Posts-->
                                <!--Begin UI For Video Posts-->
                                <v-card 
                                    v-else-if="post.type === 'video'" 
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
                                                :color="themeColor"
                                                @click="unlikePost"
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
                                                :color="themeColor"
                                                @click="likePost"
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
                                        <router-link :to="`/comments/${post.uniquePostId}`" class="side_bar_link">
                                            <v-btn 
                                                icon 
                                                :color="themeColor"
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
                                        </router-link>
                                    </v-card-actions>
                                </v-card>
                                <!--End Of The UI For Video Posts-->
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item 
                        v-else 
                    >
                        <h3> 
                            User Has No Posts! 
                        </h3>
                    </v-tab-item>
                    <!--End Of The Tab Item For Posts-->
                    <!--Begin The Tab Item For The About Me Section For The User-->
                    <v-tab-item>
                        <v-card 
                            width="100%"
                        >
                            <v-card-title 
                                class="headline" 
                            >
                                About {{ linkkupUser.firstName + ' ' + linkkupUser.lastName }} 
                            </v-card-title>
                            <v-list>
                                <v-subheader 
                                    class="subheader" 
                                >
                                    Bio 
                                </v-subheader>
                                <v-list-item>
                                    <v-card-text>
                                        {{ linkkupUser.bio }} 
                                    </v-card-text>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list>
                                <v-subheader 
                                    class="subheader" 
                                >
                                    Home Town 
                                </v-subheader>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title 
                                            class="title" 
                                        >
                                            {{ linkkupUser.hometown + ', ' + linkkupUser.homeState }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list>
                                <v-subheader
                                    class="subheader" 
                                >
                                    Major 
                                </v-subheader>
                                <v-list-item> 
                                    <v-list-item-content>
                                        <v-list-item-title 
                                            class="title"
                                        >
                                            {{ linkkupUser.major }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list>
                                <v-subheader 
                                    class="subheader" 
                                >
                                    Class 
                                </v-subheader>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title 
                                            class="title" 
                                        >
                                            {{ linkkupUser.schoolYear }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list>
                                <v-subheader 
                                    class="subheader" 
                                >
                                    Cake Day 
                                </v-subheader>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title 
                                            class="headline" 
                                        >
                                            {{ linkkupUser.dateCreated }} 
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list 
                                v-if="linkkupUser.fraternity" 
                            >
                                <v-subheader 
                                    class="subheader" 
                                >
                                    Fraternity 
                                </v-subheader> 
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title 
                                            class="title" 
                                        >
                                            {{ linkkupUser.fraternity }} 
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list 
                                v-if="linkkupUser.sorority" 
                            >
                                <v-subheader 
                                    class="subheader" 
                                >
                                    Sorority
                                </v-subheader>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title 
                                            class="title" 
                                        >
                                            {{ linkkupUser.sorority }} 
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-list 
                                v-if="linkkupUser.sport" 
                            >
                                <v-subheader 
                                    class="subheader" 
                                >
                                    Sport 
                                </v-subheader>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title 
                                            class="title" 
                                        >
                                            {{ linkkupUser.sport }} 
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list 
                                v-if="linkkupUser.twitterHandle" 
                            >
                                <v-subheader 
                                    class="subheader" 
                                >
                                    Twitter Link 
                                </v-subheader>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title 
                                            class="title" 
                                        >
                                            <a 
                                                :href='`https://www.twitter.com/${linkkupUser.twitterHandle}`' 
                                                class="text-decoration-none"
                                                :color="linkkupUser.profileTheme"
                                            >
                                                <v-icon>
                                                    mdi-twitter 
                                                </v-icon>
                                                {{ linkkupUser.twitterHandle }}
                                            </a>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list 
                                v-if="linkkupUser.instagramHandle" 
                            >
                                <v-subheader 
                                    class="subheader" 
                                >
                                    Instagram Link 
                                </v-subheader>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title 
                                            class="title" 
                                        >
                                            <a 
                                                :href='`https://www.instagarm.com/${linkkupUser.instagramHandle}`' 
                                                class="text-decoration-none"
                                            >
                                                <v-icon>
                                                    mdi-instagram
                                                </v-icon>
                                                {{ linkkupUser.instagramHandle }}
                                            </a>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list 
                                v-if="linkkupUser.youtubeChannel" 
                            >
                                <v-subheader 
                                    class="subheader" 
                                >
                                    YouTube
                                </v-subheader>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title 
                                            class="title" 
                                        >
                                            <a 
                                                :href="linkkupUser.youtubeChannel" 
                                                class="text-decoration-none"
                                            >
                                                <v-icon>
                                                    mdi-youtube
                                                </v-icon>
                                            </a>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list>
                                <v-subheader 
                                    class="subheader" 
                                >
                                    Email 
                                </v-subheader>
                                <v-list-item>
                                    <v-card-text>
                                        <small 
                                            class="font-weight-bold" 
                                        >
                                            {{ linkkupUser.email }} 
                                        </small>
                                    </v-card-text>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list>
                                <v-subheader 
                                    class="subheader" 
                                >
                                    Interests 
                                </v-subheader>
                                <v-list-item 
                                    v-for="(interest, index) in linkkupUser.interests" 
                                    :key="index"
                                >
                                    <v-card-text>
                                        <small 
                                            class="font-weight-bold" 
                                        >
                                            {{ interest }} 
                                        </small>
                                    </v-card-text>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list 
                                v-if="linkkupUser.communities.length > 0" 
                            >
                                <v-subheader 
                                    class="subheader" 
                                >
                                    Communities 
                                </v-subheader>
                                <v-list-item 
                                    v-for="(community, index) in linkkupUser.communities" 
                                    :key="index"
                                    :data-com="community"
                                    style="cursor: pointer;"
                                    @click="findCommunity($event)"
                                >
                                    <v-list-item-avatar> 
                                        <v-img 
                                            :src="`https://www.linkkup.com/api/community/avatar/${community}`" 
                                        ></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title 
                                            class="title" 
                                        >
                                            {{ community }} 
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-tab-item>
                    <!--End Of The Tab Item For The About Me Section-->
                    <v-tab-item>
                        <div 
                            v-if="events.length < 1" 
                        >
                            <h3>
                                User Has No Events 
                            </h3>
                        </div>
                        <div 
                            v-else 
                        >
                            <v-list> 
                                <v-card 
                                    v-for="(event, index) in events" 
                                    :key="index" 
                                >
                                    <v-card-title>
                                        <v-list-item>
                                            <v-list-item-avatar>
                                                <v-img 
                                                    :src="`https://www.linkkup.com/api/user/avatar/${event.uniqueUserId}`"
                                                    alt="linkkup User Avatar" 
                                                ></v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title 
                                                    class="title" 
                                                >
                                                    <small>
                                                        {{ event.username }} 
                                                    </small>
                                                </v-list-item-title>
                                            </v-list-item-content>
                                            <v-list-item-action-text> 
                                                <small>
                                                    {{ event.dateString }} 
                                                </small>
                                            </v-list-item-action-text>
                                        </v-list-item>
                                    </v-card-title>
                                    <v-avatar 
                                        :size="80"
                                        tile 
                                    >
                                        <v-img 
                                            :src="`https://www.linkkup.com/api/get-photo?photo=${event.src}`"
                                            alt="linkkup Event Photo" 
                                        ></v-img>
                                    </v-avatar>
                                    <v-card-text>
                                        <small>
                                            {{ event.title }} 
                                        </small>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn 
                                            :color="linkkupUser.profileTheme" 
                                            text 
                                            @click="findEvent(event.uniqueEventId)"
                                        >
                                            Details 
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-list>
                        </div>
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import {_} from 'vue-underscore';

export default({
    name: 'MixcitiProfile',
    data() {
        return {
            linkkupUser: null,
            showOverlay: false,
            tabs: null,
            linkkupUserPosts: null,
            events: [],
        }
    },
    created() {
        this.fetchlinkkupUser();
        this.fetchEvents();
    },
    methods: {
        fetchlinkkupUser() {
            //Method that will pull the profile page for the user our main state.user is visiting.
            return axios({
                method: 'GET',
                url: `https://www.linkkup.com/api/fetch/linkkup/${this.$route.params.username}`,
            }).then(response => {
                if(response.data === 'user not found') {
                    this.$swal(
                        'Uh Oh!',
                        'That User Was Not Found!',
                        'error',
                    );
                    this.$router.go(-1);
                }
                else {
                    if(response.data.user.blockList.includes(this.$store.state.user.uniqueUserId)) {
                        this.$swal(
                            'Uh Oh',
                            'This User Blocked You',
                            'error',
                        );
                        this.$router.go(-1);
                    }
                    else if(response.data.user.uniqueUserId === this.$store.state.user.uniqueUserId) {
                        this.$router.push('/');
                    }
                    else {
                        this.linkkupUser = response.data.user;
                        this.linkkupUserPosts = response.data.linkkupUserPosts;
                        this.$store.commit('alterThemeColor', response.data.user.profileTheme);
                    }
                }
            }).catch(err => {
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Finding That User!',
                    'error',
                );
                this.$router.go(-1);
            });
        },
        fetchEvents() {
            //This is the method for fetching the events associated with this user 
            let username = this.$route.params.username

            return axios({
                method: 'GET',
                url: `https://www.linkkup.com/api/fetch/events/username/${username}`,
            }).then(response => {
                this.events = response.data.events;
            }).catch(err => {
                console.log(err.message);
                this.events = [];
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
        unlikePost: function(event) {
            this.showOverlay = true;
            //This method will enable a user to unlike their own post. 
            let uniquePostId = event.currentTarget.getAttribute('data-unlikepost');
            let uniqueUserId = event.currentTarget.getAttribute('data-unlikeuser');

            //Now we will set up an axios request for them to unlike the post
            return axios({
                method: 'get',
                url: `https://www.linkkup.com/api/unlike/${uniquePostId}/${uniqueUserId}`,
            }).then(response => {
                this.linkkupUserPosts = this.$_.reject(response.data.userPosts, post => post.context === 'community');
                this.linkkupUser.karma -= 1;
                this.showOverlay = false;
            }).catch(err => {
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Unliking That Post!',
                    'error',
                );
            });
        },
        likePost: function(event) {
            //This Is A Method That Will Enable A User To Like Their Own Personal Post
            this.showOverlay = true;
            let uniquePostId = event.currentTarget.getAttribute('data-likepost');
            let uniqueUserId = event.currentTarget.getAttribute('data-likeuser');
            
            //Send The Post Request With Axios To Like The Post And Increase The Current Carma Of The User
            //Increase The Karma Of The User On This Request So That We Can Use The Same Route Later To Increase Karma...
            //When Someone Other Than The OP Likes The Post.

            return axios({
                method: 'get',
                url: `https://www.linkkup.com/api/like/${uniquePostId}/${uniqueUserId}`,
            }).then(response => {
                this.linkkupUserPosts = this.$_.reject(response.data.userPosts, post => post.context === 'community');
                this.linkkupUser.karma += 1;
                this.showOverlay = false;
            }).catch(err => {
                this.showOverlay = false;
                console.log(err.message);
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Liking That Post!',
                    'error',
                );
            })
        },
        unfollowUser() {
            //This is the method that will handle calling the api to unfollow a user
            this.showOverlay = true;
            let unfollower = this.$store.state.user.uniqueUserId;
            let userToUnfollow = this.linkkupUser.uniqueUserId;

            return axios({
                method: 'POST',
                url: 'https://www.linkkup.com/api/unfollow/user', 
                data: JSON.stringify({unfollower: unfollower, userToUnfollow: userToUnfollow}),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                this.showOverlay = false;
                this.linkkupUser.followers = response.data.followers;
                this.$swal(
                    'Great!',
                    'Successfully Unfollowed User!',
                    'success',
                );
            }).catch(err => {
                this.showOverlay = false;
                console.log(err);
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Unfollowing That User!',
                    'error',
                );
            });
        },
        followUser() {
            //This is the method that will handle following a user
            this.showOverlay = true;
            let follower = this.$store.state.user.uniqueUserId;
            let userToFollow = this.linkkupUser.uniqueUserId;

            return axios({
                method: 'POST',
                url: 'https://www.linkkup.com/api/follow/user',
                data: JSON.stringify({follower: follower, followUsername: this.linkkupUser.username, username: this.$store.state.user.username, userToFollow: userToFollow}),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                this.showOverlay = false;
                this.linkkupUser.followers = response.data.followers;
                this.$swal(
                    'Great!',
                    'Successfully Followed User',
                    'success',
                );
            }).catch(err => {
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Following That User!',
                    'error',
                );
            });
        },
        findFollowers() {
            this.$router.push(`/find/followers/${this.linkkupUser.username}`);
        },
        findFollowing() {
            this.$router.push(`/find/following/${this.linkkupUser.username}`);
        },
        profileView(event) {
            //Method that will handle routing to profile page of user if avatar is clicked.
            let username = event.currentTarget.getAttribute('data-username');
            this.$router.push(`/linkkup/profile/${username}`);
        },
        findCommunity(event) {
            //This method will help us find a community based on when a user clicks on one.
            let community = event.currentTarget.getAttribute('data-com');
            this.$router.push(`/linkkup/community/${community}`);
        },
        findEvent(uniqueEventId) {
            this.$router.push(`/linkkup/events#${uniqueEventId}`);
        },
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        userAuthenticated() {
            return this.$store.state.userAuthenticated;
        },
        userPosts() {
            return this.$store.state.userPosts;
        },
        themeColor() {
            return this.$store.state.themeColor;
        }
    },
    watch: {
        user: function() {
            if(this.user === null) {
                this.$router.push('/');
            }
        },
    },
});
</script>
