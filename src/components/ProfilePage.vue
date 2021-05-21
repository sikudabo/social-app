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
                    <v-progress-circular :color="user.profileTheme" indeterminate size="64"></v-progress-circular>
                    <h5>
                    
                    </h5>
                </v-overlay>
                <v-avatar 
                    size="168"
                    class="mb-4"
                >
                    <v-img 
                        contained
                        :src="`https://www.linkkup.com/api/get-photo?photo=${user.avatar}`"
                        alt="linkkup Profile Picture"
                    ></v-img>
                </v-avatar>
                <p 
                    class="font-weight-bold" 
                >
                    {{ user.username }}
                </p>
                <div 
                    v-if="user.verifiedUser[0] === true"
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
                     v-if="user.followers.length === 1"
                    class="font-weight-bold"
                    style="cursor: pointer;"
                    @click="findFollowers"
                >
                    {{ user.followers.length }} <v-spacer></v-spacer> Follower 
                </p>
                <p 
                    v-else-if="user.followers.length < 1" 
                    class="font-weight-bold"
                >
                    {{ user.followers.length }} <v-spacer></v-spacer> Followers
                </p>
                <p 
                    v-else
                    class="font-weight-bold"
                    style="cursor: pointer;"
                    @click="findFollowers"
                >
                    {{ user.followers.length }} <v-spacer></v-spacer> Followers 
                </p>
            </v-col>
            <v-col 
                cols="4"
            >
                <p 
                    class="font-weight-bold"
                    v-if="user.following.length < 1"
                >
                    Following <v-spacer></v-spacer> 0
                </p>
                <p 
                    class="font-weight-bold" 
                    v-else 
                    @click="findFollowing"
                    style="cursor: pointer;"
                >
                    Following <v-spacer></v-spacer> {{ user.following.length }} 
                </p>
            </v-col>
            <v-col 
                cols="4"
            >
                <p 
                    class="font-weight-bold"
                >
                    Karma <v-spacer></v-spacer> {{ user.karma }}
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
                    {{ user.firstName + ' ' + user.lastName }} 
                </p>
            </v-col>
        </v-row>
        <v-row>
            <v-col 
                cols="12" 
            >
                <v-dialog 
                    fullscreen 
                    v-model="uploadFormDialog" 
                    width="500"
                    transition="dialog-bottom-transition"
                >
                    <template 
                        v-slot:activator="{on, attrs}" 
                    >
                        <v-btn 
                            :color="user.profileTheme"
                            outlined 
                            depressed 
                            v-on="on"
                            v-bind="attrs" 
                        >
                            <v-icon>    
                                mdi-pencil 
                            </v-icon>
                            Create Post 
                        </v-btn>
                    </template>
                    <v-overlay 
                        :value="posting"
                    >
                        <v-progress-circular :color="user.profileTheme" indeterminate size="64"></v-progress-circular>
                        <h5>
                        Posting 
                        </h5>
                    </v-overlay>
                    <v-card>
                        <v-card-title 
                            :color="user.profileTheme" 
                        >
                            <v-icon
                                style="cursor: pointer;"
                                large 
                                left
                                @click="uploadFormDialog = !uploadFormDialog"
                            >
                                mdi-close 
                            </v-icon>
                            <span 
                                class="headline" 
                            >
                                Upload Post
                            </span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col 
                                        cols="12" 
                                    >
                                        <template>
                                            <v-tabs 
                                                v-model="uploadFormTabs" 
                                                centered 
                                                :background-color="user.profileTheme"
                                                dark 
                                            >
                                                <v-tab>
                                                    Text 
                                                </v-tab>
                                                <v-tab>
                                                    Photo 
                                                </v-tab>
                                                <v-tab>
                                                    Video 
                                                </v-tab>
                                            </v-tabs>
                                        </template>
                                        <v-tabs-items 
                                            v-model="uploadFormTabs" 
                                            class="mt-4" 
                                        >
                                            <v-tab-item>
                                                <v-form 
                                                    ref="textpostform" 
                                                >
                                                    <v-textarea 
                                                        class="mt-3" 
                                                        placeholder="What's On Your Mind?"
                                                        label="Text Post"
                                                        v-model="textPostText"
                                                        :counter="1000"
                                                        :rules="textPostRules"
                                                        required
                                                        v-on:keypress.13="uploadTextPost($event)"
                                                    ></v-textarea>
                                                    <v-btn 
                                                        class="mt-3" 
                                                        :color="user.profileTheme" 
                                                        dark 
                                                        data-type="text"
                                                        @click="uploadTextPost($event)"
                                                    >
                                                        Upload 
                                                    </v-btn>
                                                </v-form>
                                            </v-tab-item>
                                            <v-tab-item>
                                                <v-form 
                                                    ref="photopostform" 
                                                >
                                                    <v-textarea 
                                                        placeholder="Enter A Photo Caption"
                                                        v-model="photoPostCaption"
                                                        rows="4"
                                                        :counter="1000"
                                                        :rules="postCaptionRules"
                                                    ></v-textarea>
                                                    <image-uploader
                                                        :debug="1"
                                                        :maxWidth="1024"
                                                        :maxHeight="1024"
                                                        :quality="0.99"
                                                        outputFormat="blob"
                                                        :preview=false
                                                        accept="image/jpeg, image/png, image/jpg"
                                                        v-model="photoPostPhoto"
                                                        required
                                                    ></image-uploader>
                                                    <v-btn 
                                                        class="mt-3" 
                                                        :color="user.profileTheme"
                                                        dark 
                                                        @click='uploadPhotoPost'
                                                    >
                                                        Upload 
                                                    </v-btn>
                                                </v-form>
                                            </v-tab-item>
                                            <v-tab-item>
                                                <v-form 
                                                    ref="videopostform" 
                                                >
                                                    <v-textarea 
                                                        :rules="postCaptionRules"
                                                        placeholder="Enter A Video Caption"
                                                        :counter="1000"
                                                        rows="4"
                                                        v-model="videoPostCaption"
                                                    ></v-textarea>
                                                    <v-file-input
                                                        class="mt-3"
                                                        accept="video/mp4, video/mov"
                                                        label="Video"
                                                        hint="Enter A Video To Upload"
                                                        v-model="videoPostVideo"
                                                        ref="videoupload"
                                                        @change="handleVideoChange"
                                                        required
                                                    ></v-file-input>
                                                    <v-btn 
                                                        class="mt-3" 
                                                        :color="user.profileTheme"
                                                        dark
                                                        @click="uploadVideoPost"
                                                    >
                                                        Upload 
                                                    </v-btn>
                                                </v-form>
                                            </v-tab-item>
                                        </v-tabs-items>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-dialog>
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
                        :background-color="user.profileTheme"
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
                        v-if="userPosts.length > 0" 
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
                                v-for="(post, index) in userPosts"
                                :key='index'
                            >
                                <v-card 
                                    v-if="post.type === 'text' && post.context === 'personal'" 
                                    width="100%"
                                    :id="post.uniquePostId"
                                >
                                    <v-card-title>
                                        <v-list-item>
                                            <v-list-item-avatar>
                                                <v-img 
                                                    :src="`https://www.linkkup.com/api/user/avatar/${user.uniqueUserId}`" 
                                                ></v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    {{ user.username }}
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
                                                @click="unlikePost"
                                                :data-unlikepost="post.uniquePostId"
                                                :data-unlikeuser="post.uniqueUserId"
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
                                                @click="likePost"
                                                :data-likepost="post.uniquePostId"
                                                :data-likeuser="post.uniqueUserId"
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
                                        <router-link :to="`/comments/${post.uniquePostId}`" class="side_bar_link"
                                            :color="themeColor" 
                                        >
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
                                        </router-link>
                                        <v-spacer></v-spacer>
                                        <v-btn 
                                            :color="user.profileTheme" 
                                            icon 
                                            @click="deleteNonMediaPost(post.uniquePostId, post.uniqueUserId)"
                                        >
                                            <v-icon>
                                                mdi-trash-can 
                                            </v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                                <!--End of the text posts-->
                                <!--Begin the UI for photo posts-->
                                <v-card 
                                    v-else-if="post.type === 'photo' && post.context === 'personal'" 
                                    width="100%"
                                    :id="post.uniquePostId"
                                >
                                    <v-card-title>
                                        <v-list-item>
                                            <v-list-item-avatar>
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
                                                @click="unlikePost"
                                                :data-unlikepost="post.uniquePostId"
                                                :data-unlikeuser="post.uniqueUserId"
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
                                                @click="likePost"
                                                :data-likepost="post.uniquePostId"
                                                :data-likeuser="post.uniqueUserId"
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
                                        </router-link>
                                        <v-spacer></v-spacer>
                                        <v-btn 
                                            :color="user.profileTheme" 
                                            icon 
                                            @click="deleteMediaPost(post.src, post.uniqueUserId)"
                                        >
                                            <v-icon>
                                                mdi-trash-can 
                                            </v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                                <!--This is the end of the photo post type.-->
                                <!--Now create the UI for video posts-->
                                <v-card 
                                    v-else-if="post.type === 'video' && post.context === 'personal'" 
                                    width="100%"
                                    :id="post.uniquePostId"
                                >
                                    <v-card-title>
                                        <v-list-item>
                                            <v-list-item-avatar>
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
                                                @click="unlikePost"
                                                :data-unlikepost="post.uniquePostId"
                                                :data-unlikeuser="post.uniqueUserId"
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
                                                @click="likePost"
                                                :data-likepost="post.uniquePostId"
                                                :data-likeuser="post.uniqueUserId"
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
                                        </router-link>
                                        <v-spacer></v-spacer>
                                        <v-btn 
                                            :color="user.profileTheme" 
                                            icon 
                                            @click="deleteMediaPost(post.src, post.uniqueUserId)"
                                        >
                                            <v-icon>
                                                mdi-trash-can 
                                            </v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item 
                        v-else 
                    >
                        <h3>
                            You Have No Posts Yet 
                        </h3>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card 
                            width="100%"
                        >
                            <v-card-title 
                                class="headline" 
                            >
                                About {{ user.firstName + ' ' + user.lastName }} 
                            </v-card-title>
                            <v-list>
                                <v-subheader 
                                    class="subheader" 
                                >
                                    Bio 
                                </v-subheader>
                                <v-list-item>
                                    <v-card-text>
                                        {{ user.bio }} 
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
                                            {{ user.hometown + ', ' + user.homeState }}
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
                                            {{ user.major }}
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
                                            {{ user.schoolYear }}
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
                                            {{ user.dateCreated }} 
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list 
                                v-if="user.fraternity" 
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
                                            {{ user.fraternity }} 
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list 
                                v-if="user.sorority" 
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
                                            {{ user.sorority }} 
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-list 
                                v-if="user.sport" 
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
                                            {{ user.sport }} 
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list 
                                v-if="user.twitterHandle" 
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
                                                :href='`https://www.twitter.com/${user.twitterHandle}`' 
                                                class="text-decoration-none"
                                                :color="user.profileTheme"
                                            >
                                                <v-icon>
                                                    mdi-twitter 
                                                </v-icon>
                                                {{ user.twitterHandle }}
                                            </a>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list 
                                v-if="user.instagramHandle" 
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
                                                :href='`https://www.instagarm.com/${user.instagramHandle}`' 
                                                class="text-decoration-none"
                                            >
                                                <v-icon>
                                                    mdi-instagram
                                                </v-icon>
                                                {{ user.instagramHandle }}
                                            </a>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list 
                                v-if="user.youtubeChannel" 
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
                                                :href="user.youtubeChannel" 
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
                                            {{ user.email }} 
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
                                    v-for="(interest, index) in user.interests" 
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
                                v-if="user.communities.length > 0" 
                            >
                                <v-subheader 
                                    class="subheader" 
                                >
                                    Communities 
                                </v-subheader>
                                <v-list-item 
                                    v-for="(community, index) in user.communities" 
                                    :key="index"
                                    style="cursor: pointer;"
                                    @click="findCommunity($event)"
                                    :data-com="community"
                                >
                                    <v-list-item-avatar>
                                        <v-img 
                                            :src="`https://www.linkkup.com/api/community/avatar/${community}`" 
                                            alt="linkkup Community Avatar"
                                        ></v-img>
                                    </v-list-item-avatar>
                                    <v-card-text>
                                        <small 
                                            class="font-weight-bold"
                                        >
                                            {{ community }}
                                        </small>
                                    </v-card-text>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <div 
                            v-if="events.length < 1" 
                        >
                            <h3>
                                You Have No Events Posted 
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
                                        size="80"
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
                                            :color="user.profileTheme" 
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
import axios from 'axios';
import {_} from 'vue-underscore';

export default({
    name: 'ProfilePage',
    data() {
        return {
            events: [],
            posting: false,
            tabs: null,
            showMenu: false,
            showOverlay: false,
            uploadFormDialog: false,
            uploadFormTabs: null,
            textPostRules: [
                v => !!v || "Must Enter Some Text!",
                v => v.length <= 1000 || 'You Cannot Have More Than 1,000 Characters In A Text Post',
            ],
            videoPostRules: [
                v => !!v.toString() || 'Must enter a file!',
            ],
            postCaptionRules: [
                v => v.length <= 1000 || "Personal Media Post Captions Cannot Contain More Than 1000 Characters",
            ],
            textPostText: '',
            videoPostVideo: '',
            videoPostCaption: '',
            photoPostPhoto: '',
            photoPostCaption: '',
        }
    },
    created() {
        this.fetchUser();
        this.fetchEvents();
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
    methods: {
        fetchUser() {
            //This function will retrieve a user each time they are entering the page.
            //I forgot to call (this.$store.state.user) in the if condition below. 
            //I was calling this.$store.user, and left out state.
            //Below I might need to get a user based on the username param.
            if(this.$store.state.userAuthenticated === true) {
                return axios ({
                    method: 'get',
                    url: `https://www.linkkup.com/get-current-user/${this.$store.state.user.uniqueUserId}`,
                }).then(response => {
                    this.$store.commit('updateUser', response.data.user);
                    this.$store.commit('updateUserPosts', response.data.userPosts);
                    this.$store.commit('alterThemeColor', response.data.user.profileTheme);
                }).catch(err => {
                    console.log(err.message);
                });
            }
        },
        fetchEvents() {
            //This is the method for fetching the events associated with this user 
            let uniqueUserId = this.$store.state.user.uniqueUserId;

            return axios({
                method: 'GET',
                url: `https://www.linkkup.com/api/fetch/events/${uniqueUserId}`,
            }).then(response => {
                this.events = response.data.events;
            }).catch(err => {
                console.log(err.message);
                this.events = [];
            });
        },
        uploadTextPost(event) {
            if(this.$refs.textpostform.validate()) {
                this.posting = true;
                let utcTime = Date.now();
                let currentDate = new Date();
                let dateString = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`
                let uniqueUserId = this.user.uniqueUserId;
                let username = this.user.username;
                let context = 'personal';
                let text = this.textPostText;
                let type = 'text';
                let data = JSON.stringify({utcTime: utcTime, dateString: dateString, uniqueUserId: uniqueUserId, username: username, context: context, text: text, type: type});
                return axios({
                    method: 'post',
                    url: 'https://www.linkkup.com/api/post/upload',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data,
                }).then(response => {
                    this.$store.commit('pushUserPost', response.data.newPost);
                    this.$swal(
                        'Great!',
                        'Your Post Was Successfully Uploaded!',
                        'success',
                    );
                    this.posting = false;
                    this.uploadFormDialog = false;
                    this.$refs.textpostform.reset();
                    this.$refs.textpostform.resetValidation();
                }).catch(err => {
                    this.posting = false;
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Uploading That Post',
                        'error',
                    );
                });
            }
            else {
                this.posting = false;
                this.$swal(
                    'Uh Oh',
                    'Make Sure The Form Has All Of The Required Fields!',
                    'error',
                );
            }
        },
        uploadPhotoPost(event) {
            //This is the method that will upload either photo post or video post. 
            this.posting = true;

            if(this.$refs.photopostform.validate() && this.photoPostPhoto) {
                let utcTime = Date.now();
                let currentDate = new Date();
                let dateString = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`
                let uniqueUserId = this.user.uniqueUserId;
                let username = this.user.username;
                let context = 'personal';
                let caption = this.photoPostCaption;
                let media = this.photoPostPhoto;
                let type = 'photo';

                //Now create form data to contain the multipart/form-data for this media post 
                let fd = new FormData();
                fd.append('utcTime', utcTime);
                fd.append('dateString', dateString);
                fd.append('uniqueUserId', uniqueUserId);
                fd.append('username', username);
                fd.append('context', context);
                fd.append('caption', caption);
                fd.append('media', media, 'photo.jpg');
                fd.append('type', type);
                return axios({
                    method: 'post',
                    url: 'https://www.linkkup.com/api/post/media/upload',
                    data: fd,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then(response => {
                    this.$store.commit('pushUserPost', response.data.newPost);
                    this.$swal(
                        'Great!',
                        'Your Post Was Successfully Uploaded!',
                        'success',
                    );
                    this.posting = false;
                    this.uploadFormDialog = false;
                    this.$refs.photopostform.reset();
                    this.photoPostPhoto = '';
                }).catch(err => {

                });
            }
            else {
                this.posting = false;
                this.$swal(
                    'Uh Oh',
                    'You Either Need To Upload A Photo Or Fill Out Certain Sections Of The Form',
                    'error',
                );
            }
        },
        uploadVideoPost(event) {
            //This is the method that will upload either photo post or video post. 
            this.posting = true;

            if(this.videoPostVideo.name && this.$refs.videopostform.validate()) {
                let utcTime = Date.now();
                let currentDate = new Date();
                let dateString = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`
                let uniqueUserId = this.user.uniqueUserId;
                let username = this.user.username;
                let context = 'personal';
                let caption = this.videoPostCaption;
                let media = this.videoPostVideo;
                let type = 'video';

                //Now create form data to contain the multipart/form-data for this media post 
                let ext = this.videoPostVideo.name.split('.').pop().toString();
                ext = 'video.' + ext;
                let fd = new FormData();
                fd.append('utcTime', utcTime);
                fd.append('dateString', dateString);
                fd.append('uniqueUserId', uniqueUserId);
                fd.append('username', username);
                fd.append('context', context);
                fd.append('caption', caption);
                fd.append('media', media, ext);
                fd.append('type', type);
                return axios({
                    method: 'post',
                    url: 'https://www.linkkup.com/api/post/media/upload',
                    data: fd,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then(response => {
                    this.$store.commit('pushUserPost', response.data.newPost);
                    this.$swal(
                        'Great!',
                        'Your Post Was Successfully Uploaded!',
                        'success',
                    );
                    this.posting = false;
                    this.uploadFormDialog = false;
                    this.$refs.videopostform.reset();
                    this.videoPostVideo = '';
                }).catch(err => {

                });
            }
            else {
                this.posting = false;
                this.$swal(
                    'Uh Oh',
                    'You Either Need To Upload A Video Or Fill Out Certain Sections Of The Form',
                    'error',
                );
            }
        },
        handleVideoChange(e) {
            //This method will handle updating the value of the videoPostVideo to match the video file
            this.videoPostVideo = e;
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
                this.$store.commit('updateUser', response.data.user);
                let personalPosts = response.data.userPosts;
                personalPosts = this.$_.reject(personalPosts, post => post.context === 'community');
                this.$store.commit('updateUserPosts', personalPosts);
                this.showOverlay = false;
            }).catch(err => {
                this.showOverlay = false;
                
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Liking That Post!',
                    'error',
                );
            })
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
                this.$store.commit('updateUser', response.data.user);
                let personalPosts = response.data.userPosts;
                personalPosts = this.$_.reject(personalPosts, post => post.context === 'community');
                this.$store.commit('updateUserPosts', personalPosts);
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
        deleteNonMediaPost(uniquePostId, uniqueUserId) {
            //This function will call the API to delete a text post. Same functionality will be used for a link post and same route 
            this.showOverlay = true 
            
            return axios({
                method: 'POST',
                url: 'https://www.linkkup.com/api/delete/post',
                data: JSON.stringify({uniquePostId: uniquePostId, uniqueUserId: uniqueUserId}),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                if(response.data.result === 'success') {
                    this.showOverlay = false;
                    this.$swal(
                        'Great!',
                        'Post Successfully Deleted',
                        'success',
                    );
                    this.$store.commit('updateUserPosts', response.data.posts);
                }
            }).catch(err => {
                this.showOverlay = false;
                console.log(err.message);
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Deleting That Post!',
                    'error',
                );
            });
        },
        deleteMediaPost(src, uniqueUserId) {
            //This is a function that will delete media posts by calling the API
            this.showOverlay = true;

            return axios({
                method: 'POST',
                url: 'https://www.linkkup.com/api/delete/media/post',
                data: JSON.stringify({src: src, uniqueUserId: uniqueUserId}),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                this.showOverlay = false;
                this.$swal(
                    'Great!',
                    'Successfully Deleted Post',
                    'success',
                );
                this.$store.commit('updateUserPosts', response.data.posts);
            }).catch(err => {
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Deleting That Post',
                    'error',
                );
            });
        },
        findFollowers() {
            this.$router.push(`/find/followers/${this.$store.state.user.username}`);
        },
        findFollowing() {
            this.$router.push(`/find/following/${this.$store.state.user.username}`);
        },
        findCommunity(event) {
            //This method will handle changing going to the community if someone clicks on it in the about section.
            let community = event.currentTarget.getAttribute('data-com');
            this.$router.push(`/linkkup/community/${community}`);
        },
        findEvent(uniqueEventId) {
            this.$router.push(`/linkkup/events#${uniqueEventId}`);
        },
    },
});
</script>

