<template>
    <div>
        <v-row
            class="mb-3" 
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
                <v-avatar 
                    size="168"
                    tile
                >
                    <v-img 
                        :src="`https://www.linkkup.com/api/get-photo?photo=${community.avatar}`" 
                        alt="linkkup Community Avatar"
                    ></v-img>
                </v-avatar>
            </v-col>
        </v-row>
        <v-row 
            class="mb-3" 
        >
            <v-col 
                cols="12" 
            >
                <h4>
                    {{ community.name }} 
                </h4>
            </v-col>
        </v-row>
        <v-row 
            class="mb-3" 
        >
            <v-col 
                cols="12" 
            >
                <p>
                    {{ community.title }} 
                </p>
            </v-col>
        </v-row>
        <v-row 
            v-if="!community.members.find(member => member.uniqueUserId === user.uniqueUserId)"
            class="mb-4" 
        >
            <v-col 
                cols="12" 
            >
                <v-btn 
                    :color="community.communityTheme"
                    outlined 
                    title 
                    @click="joinCommunity"
                >
                    Join Community 
                </v-btn>
            </v-col>
        </v-row>
        <v-row 
            v-else-if="community.members.find(member => member.uniqueUserId === user.uniqueUserId) && community.moderator.uniqueUserId !== user.uniqueUserId"
            class="mb-4"
        >
            <v-col 
                cols="12" 
            >
                <v-btn 
                    :color="community.communityTheme"
                    outlined 
                    tile 
                    @click="leaveCommunity"
                >
                    Leave Community 
                </v-btn>
            </v-col>
        </v-row>
        <v-row 
            v-if="community.members.find(member => member.uniqueUserId === user.uniqueUserId)" 
        >
            <v-col 
                cols="12" 
            >
                <v-btn 
                    :color="community.communityTheme" 
                    tile 
                    outlined
                    @click="goToChat"
                >
                    <v-icon>
                        mdi-chat 
                    </v-icon>
                    Community Chat 
                </v-btn>
            </v-col>
        </v-row>
        <v-row 
            class="mb-4"
        >
            <v-col 
                cols="12" 
            >
                <v-dialog 
                    transition="dialog-bottom-transition"  
                    v-model="dialog" 
                    fullscreen 
                >
                    <template 
                        v-slot:activator="{on, attrs}" 
                    >
                        <v-btn 
                            :color="community.communityTheme" 
                            outlined 
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
                        <v-progress-circular :color="community.communityTheme" indeterminate size="64"></v-progress-circular>
                        <h5>
                        Posting 
                        </h5>
                    </v-overlay>
                    <v-card 
                        width="100%" 
                    >
                        <v-card-title>
                            <v-icon 
                                left 
                                large 
                                style="cursor: pointer;"
                                @click="dialog = !dialog"
                            >
                                mdi-close 
                            </v-icon>
                            <span>
                                Upload Post 
                            </span>
                        </v-card-title>
                        <v-row>
                            <v-col 
                                cols="12" 
                            >
                                <template>
                                    <v-tabs 
                                        :background-color="community.communityTheme"
                                        v-model="postTabs"
                                        centered 
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
                                        <v-tab>
                                            Link 
                                        </v-tab>
                                    </v-tabs>
                                    <v-tabs-items
                                        v-model="postTabs" 
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
                                                    counter="10000" 
                                                    :rules="textPostRules"
                                                    required 
                                                    :color="community.communityTheme"
                                                    v-on:keypress.13="uploadTextPost"
                                                ></v-textarea> 
                                                <v-btn 
                                                    class="mt-3"
                                                    :color="community.communityTheme" 
                                                    dark 
                                                    @click="uploadTextPost"
                                                >
                                                    Upload 
                                                </v-btn>
                                            </v-form>
                                        </v-tab-item>
                                        <v-tab-item>
                                            <v-form 
                                                ref="photopostform" 
                                                :color="community.communityTheme"
                                            >
                                                <v-textarea 
                                                    placeholder="Enter A Photo Caption"
                                                    v-model="photoPostCaption"
                                                    rows="4"
                                                    :counter="1000"
                                                    :rules="postCaptionRules"
                                                    :color="community.communityTheme"
                                                    label="Photo Caption"
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
                                                    :color="community.communityTheme"
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
                                                    label="Video Caption"
                                                    :color="community.communityTheme"
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
                                                    :color="community.communityTheme"
                                                    dark
                                                    @click="uploadVideoPost"
                                                >
                                                    Upload 
                                                </v-btn>
                                            </v-form>
                                        </v-tab-item>
                                        <v-tab-item>
                                            <v-form 
                                                ref="linkpostform" 
                                            >
                                                <v-text-field 
                                                    placeholder="Title"
                                                    label="Link Title" 
                                                    :color="community.communityTheme" 
                                                    v-model="linkPostTitle" 
                                                    :rules="linkPostTitleRules"
                                                    counter="50"
                                                ></v-text-field>
                                                <v-text-field 
                                                    class="mt-4"
                                                    placeholder="URL Link"
                                                    label="Link"
                                                    :color="community.communityTheme"
                                                    v-model="linkPostLink"
                                                    :rules="linkPostLinkRules"
                                                    required 
                                                ></v-text-field>
                                                <v-btn 
                                                    class="mt-3"
                                                    :color="community.communityTheme" 
                                                    dark 
                                                    @click="uploadLinkPost"
                                                >
                                                    Upload 
                                                </v-btn>
                                            </v-form>
                                        </v-tab-item>
                                    </v-tabs-items>
                                </template>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
        <v-row 
            class="mb-4" 
        >
            <v-col 
                cols="12" 
            >
                <template>
                    <v-tabs 
                        :background-color="community.communityTheme" 
                        dark 
                        v-model="tabs" 
                        centered 
                    > 
                        <v-tab>
                            Posts 
                        </v-tab>
                        <v-tab>
                            About 
                        </v-tab>
                        <v-tab 
                            v-if="community.moderator.uniqueUserId === user.uniqueUserId" 
                        >
                            Settings 
                        </v-tab>
                    </v-tabs>
                    <v-tabs-items
                        v-model="tabs" 
                    >
                        <v-tab-item>
                            <v-row>
                                <v-col 
                                    cols="12" 
                                    xs="12"
                                    sm="12" 
                                    md="12"
                                    lg="4"
                                    xl="4" 
                                    v-for="(post, index) in communityPosts"
                                    :key="index"
                                    class="d-lg-flex"
                                >
                                    <v-card 
                                        v-if="post.type === 'text'" 
                                        :id="post.uniquePostId"
                                    >
                                        <v-card-title>
                                            <v-list-item>
                                                <v-list-item-avatar>
                                                    <v-img 
                                                        :src="`https://www.linkkup.com/api/community/avatar/${community.name}`" 
                                                    ></v-img>
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                    <v-list-item-title 
                                                        class="title" 
                                                        style="cursor: pointer;"
                                                        @click="goToProfile($event)"
                                                        :data-profile="post.username"
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
                                                    :color="community.communityTheme"
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
                                                    :color="community.communityTheme"
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
                                                    :color="community.communityTheme"
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
                                                v-if="post.uniqueUserId === user.uniqueUserId || user.uniqueUserId === community.moderator.uniqueUserId"
                                                :color="community.communityTheme" 
                                                icon 
                                                @click="deleteNonMediaPost(post.uniquePostId, post.uniqueUserId)"
                                            >
                                                <v-icon>
                                                    mdi-trash-can 
                                                </v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                    <!--This Is The End Of The Text Posts.-->
                                    <!--Now Being The UI To Display A Link Post!-->
                                    <v-card 
                                        v-else-if="post.type === 'link'" 
                                        :id="post.uniquePostId"
                                    >
                                        <v-card-title>
                                            <v-list-item>
                                                <v-list-item-avatar>
                                                    <v-img 
                                                        :src="`https://www.linkkup.com/api/community/avatar/${community.name}`" 
                                                    ></v-img>
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                    <v-list-item-title 
                                                        class="title" 
                                                        style="cursor: pointer;"
                                                        @click="goToProfile($event)"
                                                        :data-profile="post.username"
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
                                                    :color="community.communityTheme"
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
                                                    :color="community.communityTheme"
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
                                                    :color="community.communityTheme"
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
                                                v-if="post.uniqueUserId === user.uniqueUserId || user.uniqueUserId === community.moderator.uniqueUserId"
                                                :color="community.communityTheme" 
                                                icon 
                                                @click="deleteNonMediaPost(post.uniquePostId, post.uniqueUserId)"
                                            >
                                                <v-icon>
                                                    mdi-trash-can 
                                                </v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                    <!--This Is The End Of the Link Post UI-->
                                    <!--Now Begin The Photo Posts Card Section-->
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
                                                        :src="`https://www.linkkup.com/api/community/avatar/${community.name}`"
                                                        alt="linkkup Community Avatar"
                                                    ></v-img>
                                                </v-list-item-avatar>
                                                <v-list-item-content 
                                                    style="cursor: pointer;" 
                                                    :data-profile="post.username" 
                                                    @click="goToProfile($event)" 
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
                                                    :color="community.communityTheme"
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
                                                    :color="community.communityTheme"
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
                                                    :color="community.communityTheme"
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
                                                v-if="post.uniqueUserId === user.uniqueUserId || community.moderator.uniqueUserId === user.uniqueUserId"
                                                :color="community.communityTheme" 
                                                icon 
                                                @click="deleteMediaPost(post.src, post.uniqueUserId)"
                                            >
                                                <v-icon>
                                                    mdi-trash-can 
                                                </v-icon>
                                            </v-btn>
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
                                                >
                                                    <v-img 
                                                        :src="`https://www.linkkup.com/api/community/avatar/${community.name}`"
                                                        alt="linkkup Community Avatar"
                                                    ></v-img>
                                                </v-list-item-avatar>
                                                <v-list-item-content 
                                                    style="cursor: pointer;" 
                                                    :data-profile="post.username" 
                                                    @click="goToProfile($event)" 
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
                                                    :color="community.communityTheme"
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
                                                    :color="community.communityTheme"
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
                                                    :color="community.communityTheme"
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
                                                v-if="post.uniqueUserId === user.uniqueUserId || community.moderator.uniqueUserId === user.uniqueUserId"
                                                :color="community.communityTheme" 
                                                icon 
                                                @click="deleteMediaPost(post.src, post.uniqueUserId)"
                                            >
                                                <v-icon>
                                                    mdi-trash-can 
                                                </v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                    <!--End Of Video Posts UI In The Community-->
                                </v-col>
                            </v-row>
                        </v-tab-item>
                        <!--End Of The Section For Posts.-->
                        <!--Begin The Tab Item For The About Community Section-->
                        <v-tab-item>
                            <v-card 
                                width="100%" 
                                style="text-align: left;"
                            >
                                <v-list>
                                    <v-subtitle 
                                        class="subtitle" 
                                    >
                                        Community Description 
                                    </v-subtitle>
                                    <v-list-item>
                                        <v-card-text>
                                            <small>
                                                {{ community.title }}
                                            </small>
                                        </v-card-text>
                                    </v-list-item>
                                </v-list>
                                <v-divider></v-divider>
                                <v-list>
                                    <v-subtitle 
                                        class="subtitle" 
                                    >
                                        Members 
                                    </v-subtitle>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title 
                                                class="title"
                                            >
                                                {{ community.members.length }}
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                                <v-divider></v-divider>
                                <v-list>
                                    <v-subtitle 
                                        class="subtitle" 
                                    >
                                        Rules 
                                    </v-subtitle>
                                    <div 
                                        v-if="community.rules.length > 0" 
                                    >
                                        <v-list-item 
                                            v-for="(rule, index) in community.rules" 
                                            :key="index" 
                                        >
                                            <v-card-text>
                                                <small>
                                                    {{ index + 1 }}.   {{ rule }}
                                                </small>
                                            </v-card-text>
                                        </v-list-item>
                                    </div>
                                </v-list>
                                </v-divider></v-divider>
                                <v-list>
                                    <v-subtitle 
                                        class="subtitle" 
                                    >
                                        Moderator 
                                    </v-subtitle>
                                    <v-list-item>
                                        <v-list-item-avatar 
                                            style="cursor: pointer;" 
                                            :data-profile="community.moderator.username" 
                                            @click="goToProfile($event)" 
                                        >
                                            <v-img 
                                                :src="`https://www.linkkup.com/api/user/avatar/${community.moderator.uniqueUserId}`"
                                            ></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title 
                                                class="title"
                                            >
                                                {{ community.moderator.username }}
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                                <v-divider></v-divider>
                                <v-list>
                                    <v-subtitle 
                                        class="subtitle" 
                                    >
                                        Community Topics 
                                    </v-subtitle>
                                    <v-list-item 
                                        v-for="(topic, index) in community.topics" 
                                        :key="index" 
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title 
                                                class="title" 
                                            >
                                                <small>
                                                    {{ topic }} 
                                                </small>
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                                <v-divider></v-divider>
                                <v-list>
                                    <v-subtitle 
                                        class="subtitle" 
                                    >
                                        Community Rating 
                                    </v-subtitle>
                                    <v-card>
                                        <v-rating 
                                            :value="community.rating"
                                            :color="community.communityTheme"
                                            readonly 
                                        ></v-rating>
                                    </v-card>
                                </v-list>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-row>
                                <v-col 
                                    cols="12" 
                                >
                                    <p>
                                        Alter Community Settings 
                                    </p>
                                    <v-form 
                                        ref="altertitleform" 
                                        class="mb-4"
                                    >
                                        <v-text-field 
                                            :color="community.communityTheme"
                                            v-model="alterTitle"
                                            :rules="alterTitleRules"
                                            label="Title"
                                            placeholder="Community Title" 
                                            counter="50"
                                            required
                                            v-on:keypress.13="alterTitleMethod"
                                        ></v-text-field>
                                        <v-btn 
                                            class="mt-3"
                                            :color="community.communityTheme"
                                            dark 
                                            @click="alterTitleMethod"
                                        >
                                            Update
                                        </v-btn>
                                    </v-form>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row 
                                class="mb-4" 
                            >
                                <v-col 
                                    cols="12" 
                                >
                                    <p>
                                        Rules
                                    </p>
                                    <v-list>
                                        <v-list-item 
                                            v-for="(rule, index) in community.rules" 
                                            :key="index" 
                                            class="mb-3"
                                        >
                                            <small>
                                                {{ index + 1 }}. {{ rule }} 
                                            </small>
                                            <v-spacer></v-spacer>
                                            <v-btn 
                                                :color="community.communityTheme"
                                                dark 
                                                small
                                                @click="deleteRule(rule)"
                                            >
                                                Delete 
                                            </v-btn>
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row 
                                class="mb-4" 
                            >
                                <v-col 
                                    cols="12" 
                                >
                                    <p>
                                        Add Rule 
                                    </p>
                                    <v-form 
                                        ref="newruleform"
                                    >
                                        <v-text-field 
                                            :color="community.communityTheme"
                                            v-model="newRule"
                                            :rules="newRuleRules"
                                            placeholder="Add A New Community Rule (You Can Only Have Up To 10 Rules)"
                                            label="Rule"
                                            required 
                                            v-on:keypress.13="addRule"
                                        ></v-text-field>
                                        <v-btn 
                                            class="mt-3"
                                            :color="community.communityTheme"
                                            dark 
                                            @click="addRule"
                                        >
                                            Update 
                                        </v-btn>
                                    </v-form>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row 
                                class="mb-4" 
                            >
                                <v-col 
                                    cols="12" 
                                >
                                    <p>
                                        Community Theme Color 
                                    </p>
                                    <v-color-picker v-model="swatch" :swatches="swatches" hide-mode-switch hide-inputs show-swatches></v-color-picker>
                                    <v-btn 
                                        class="mt-3" 
                                        :color="community.communityTheme"
                                        dark
                                        @click="updateTheme"
                                    >
                                        Update 
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                                <v-col 
                                    cols="12" 
                                >
                                    <p>
                                        Update Community Avatar 
                                    </p>
                                    <image-uploader
                                        :debug="1"
                                        :maxWidth="1024"
                                        :maxHeight="1024"
                                        :quality="0.99"
                                        outputFormat="blob"
                                        :preview=true
                                        accept="image/jpeg, image/png, image/jpg"
                                        v-model="newAvatar"
                                        required
                                    ></image-uploader>
                                    <v-btn 
                                        :color="community.communityTheme"
                                        dark 
                                        @click="updateAvatar" 
                                    >
                                        Update 
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                                <v-col 
                                    cols="12" 
                                >
                                    <v-list>
                                        <v-subtitle 
                                            class="subtitle" 
                                        >
                                            Blocked Users 
                                        </v-subtitle>
                                        <v-list-item 
                                            v-for="(blockedUser, index) in community.blockList" 
                                            :key="index"
                                        >
                                            <v-list-item-avatar>
                                                <v-img 
                                                    :src="`https://www.linkkup.com/api/user/avatar/${blockedUser.uniqueUserId}`"
                                                ></v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title 
                                                    class="title"
                                                >
                                                    {{ blockedUser.username }} 
                                                </v-list-item-title>
                                            </v-list-item-content>
                                            <v-spacer></v-spacer>
                                            <v-btn 
                                                :color="community.communityTheme"
                                                dark 
                                                @click="unblockUser(blockedUser.uniqueUserId)"
                                            >
                                                Unblock 
                                            </v-btn>
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row 
                                class="mt-3"
                            >
                                <v-col 
                                    cols="12" 
                                >
                                    <p>
                                        Block A User From This Community 
                                    </p>
                                    <v-form 
                                        ref="blockuserform"
                                    >
                                        <v-text-field 
                                            :color="community.communityTheme"
                                            label="Username"
                                            placeholder="Enter The Username Of A User To Block!" 
                                            v-model="blockUsername"
                                            :rules="blockUsernameRules" 
                                            required 
                                        ></v-text-field>
                                        <v-btn 
                                            :color="community.communityTheme"
                                            dark 
                                            @click="blockUser" 
                                        >
                                            Block 
                                        </v-btn>
                                    </v-form>
                                </v-col>
                            </v-row>
                        </v-tab-item>
                    </v-tabs-items>
                </template>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import {_} from 'vue-underscore';

export default({
    name: 'CommunityPage',
    data() {
        return {
            community: null,
            communityPosts: null,
            tabs: null,
            dialog: false,
            posting: false,
            showOverlay: false,
            postTabs: null,
            textPostRules: [
                v => !!v || 'Must Enter Some Text!',
                v => v.length <= 10000 || 'Post Must Be Less Than 10,000 Characters!',
            ],
            textPostText: '',
            postCaptionRules: [
                v => v.length <= 1000 || "Personal Media Post Captions Cannot Contain More Than 1000 Characters",
            ],
            photoPostCaption: '',
            photoPostPhoto: '',
            videoPostCaption: '',
            videoPostVideo: '',
            linkPostLink: '',
            linkPostLinkRules: [
                v => !!v || 'Must Enter A Link!',
            ],
            linkPostTitle: '',
            linkPostTitleRules: [
                v => v.length <= 50 || 'Link Post Title Cannot Be More Than 50 Characters!',
            ],
            alterTitle: '',
            alterTitleRules: [
                v => !!v || 'Must Enter A Title!',
                v => v.length <= 50 || 'Title Cannot Be More Than 50 Characters!',
            ],
            newRule: '',
            newRuleRules: [
                v => !!v || 'You Must Enter A New Rule!',
            ],
            swatches: [
                        ['#DC143C', '#AA0000', '#550000', '#7D3C98'],
                        ['#0B5345', '#1A5276', '#4A235A', '#192841'],
                        ['#00FF00', '#00AA00', '#005500', '#BA4A00'],
                        ['#00FFFF', '#00AAAA', '#005555', '#95A5A6 '],
                        ['#0000FF', '#0000AA', '#000055', '#000000'],
                    ],
            swatch: '',
            newAvatar: '',
            blockUsername: '',
            blockUsernameRules: [
                v => !!v || 'Must Enter A Username To Block!',
            ],
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
    methods: {
        fetchCommunity() {
            //This method will handle fetching the community from the database. 
            let communityName = this.$route.params.community;

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
                        this.communityPosts = response.data.posts;
                        this.$store.commit('alterThemeColor', response.data.community.communityTheme);
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
        inCommunity() {
            //Method that test to see if the current user is in the community 
            if(community.members.find(member => member.uniqueUserId === this.user.uniqueUserId)) {
                return true;
            }
            else {
                return false;
            }
        },
        uploadTextPost() {
            //This method will handle uploading a text post to the server 
            this.posting = true //add the overlay on the dialog while this is posting 
            if(this.$refs.textpostform.validate()) {
                let text = this.textPostText;
                let currentDate = new Date();
                let dateString = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`
                let uniqueUserId = this.user.uniqueUserId;
                let username = this.user.username;
                let utcTime = Date.now();
                let type = 'text';
                let context = 'community';
                let community = this.community.name;
                let data = JSON.stringify({text: text, utcTime: utcTime, dateString: dateString, uniqueUserId: uniqueUserId, username: username, context: context, type: type, community: community});

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/post/upload',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data,
                }).then(response => {
                    this.$swal(
                        'Great!',
                        'Your Post Was Successfully Uploaded!',
                        'success',
                    );
                    this.posting= false;
                    this.$refs.textpostform.reset();
                    this.$refs.textpostform.resetValidation();
                    this.dialog = false;
                    this.communityPosts.unshift(response.data.newPost);
                }).catch(err => {
                    this.posting = false;
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Posting That Post!',
                        'error',
                    );
                });
            }
            else {
                this.posting = false;
                this.$swal(
                    'Uh Oh',
                    'Make Sure You Filled Out The Form Correctly To Make This Post!',
                    'error',
                );
            }
        },
        uploadLinkPost() {
            //This method will handle uploading a text post to the server 
            this.posting = true //add the overlay on the dialog while this is posting 
            if(this.$refs.linkpostform.validate()) {
                let text = ''
                let currentDate = new Date();
                let dateString = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`
                let uniqueUserId = this.user.uniqueUserId;
                let username = this.user.username;
                let utcTime = Date.now();
                let type = 'link';
                let context = 'community';
                let community = this.community.name;
                let link = this.linkPostLink;
                let title = this.linkPostTitle;
                let data = JSON.stringify({text: text, link: link, title: title, utcTime: utcTime, dateString: dateString, uniqueUserId: uniqueUserId, username: username, context: context, type: type, community: community});

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/link/post/upload',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data,
                }).then(response => {
                    this.$swal(
                        'Great!',
                        'Your Post Was Successfully Uploaded!',
                        'success',
                    );
                    this.posting= false;
                    this.$refs.textpostform.reset();
                    this.$refs.textpostform.resetValidation();
                    this.dialog = false;
                    this.communityPosts.unshift(response.data.newPost);
                }).catch(err => {
                    this.posting = false;
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Posting That Post!',
                        'error',
                    );
                });
            }
            else {
                this.posting = false;
                this.$swal(
                    'Uh Oh',
                    'Make Sure You Filled Out The Form Correctly To Make This Post!',
                    'error',
                );
            }
        },
        goToProfile(event) {
            let username = event.currentTarget.getAttribute('data-profile');
            this.$router.push(`/linkkup/profile/${username}`);
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
                let updatePostLikes = this.$_.find(this.communityPosts, post => post.uniquePostId === uniquePostId);
                let newLiker = {
                    username: this.user.username,
                    uniqueUserId: this.user.uniqueUserId,
                };
                updatePostLikes.likes.push(newLiker);
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
                let unlikePost = this.$_.find(this.communityPosts, post => post.uniquePostId === uniquePostId);
                unlikePost.likes = this.$_.reject(unlikePost.likes, liker => liker.uniqueUserId === uniqueUserId);
                this.showOverlay = false;
            }).catch(err => {
                console.log(err.message);
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Unliking That Post!',
                    'error',
                );
            });
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
                let context = 'community';
                let caption = this.photoPostCaption;
                let media = this.photoPostPhoto;
                let type = 'photo';
                let community = this.community.name;

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
                fd.append('community', community);
                return axios({
                    method: 'post',
                    url: 'https://www.linkkup.com/api/post/media/upload',
                    data: fd,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then(response => {
                    //this.$store.commit('pushUserPost', response.data.newPost);
                    this.communityPosts.unshift(response.data.newPost);
                    this.$swal(
                        'Great!',
                        'Your Post Was Successfully Uploaded!',
                        'success',
                    );
                    this.posting = false;
                    this.dialog = false;
                    this.$refs.photopostform.reset();
                    this.photoPostPhoto = '';
                }).catch(err => {
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Posting That Photo',
                        'error',
                    );
                    console.log(err.message);
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
                    //this.$store.commit('updateUserPosts', response.data.posts);
                    this.communityPosts = this.$_.reject(this.communityPosts, post => post.uniquePostId === uniquePostId);
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
                //this.$store.commit('updateUserPosts', response.data.posts);
                this.communityPosts = this.$_.reject(this.communityPosts, post => post.src === src);
            }).catch(err => {
                console.log(err.message);
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Deleting That Post',
                    'error',
                );
            });
        },
        handleVideoChange(e) {
            //This method will handle updating the value of the videoPostVideo to match the video file
            this.videoPostVideo = e;
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
                let context = 'community';
                let caption = this.videoPostCaption;
                let media = this.videoPostVideo;
                let type = 'video';
                let community = this.community.name;

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
                fd.append('community', community);
                return axios({
                    method: 'post',
                    url: 'https://www.linkkup.com/api/post/media/upload',
                    data: fd,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then(response => {
                    //this.$store.commit('pushUserPost', response.data.newPost);
                    this.communityPosts.unshift(response.data.newPost);
                    this.$swal(
                        'Great!',
                        'Your Post Was Successfully Uploaded!',
                        'success',
                    );
                    this.posting = false;
                    this.dialog = false;
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
        joinCommunity() {
            //A method that enables a user visiting the page to join the community 
            this.showOverlay = true;
            let username = this.user.username;
            let uniqueUserId = this.user.uniqueUserId;
            let name = this.community.name;
            
            return axios({
                url: 'https://www.linkkup.com/api/join/community',
                method: 'POST',
                data: JSON.stringify({username: username, uniqueUserId: uniqueUserId, name: name}),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                this.showOverlay = false;
                let newMember = {
                    username: this.user.username,
                    uniqueUserId: this.user.uniqueUserId,
                };
                this.community.members.push(newMember);
            }).catch(err => {
                this.showOverlay = false;
                console.log(err.message);
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Joining This Community!',
                    'error',
                );
            });
        },
        leaveCommunity() {
            //This method will handle a user leaving a community 
            this.showOverlay = true;
            let username = this.user.username;
            let uniqueUserId = this.user.uniqueUserId;
            let name = this.community.name;

            return axios({
                method: 'POST',
                url: 'https://www.linkkup.com/api/leave/community',
                data: JSON.stringify({username: username, uniqueUserId: uniqueUserId, name: name}),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                this.showOverlay = false;
                this.community.members = this.$_.reject(this.community.members, member => member.uniqueUserId === this.user.uniqueUserId);
            }).catch(err => {
                this.showOverlay = false;
                console.log(err.message);
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Leaving This Community',
                    'error',
                );
            });
        },
        alterTitleMethod() {
            //This method will handle altering a title for the community.
            this.showOverlay = true; 
            if(this.$refs.altertitleform.validate()) {
                let title = this.alterTitle;
                let community = this.community.name;

                return axios({
                    method: 'POST', 
                    url: 'https://www.linkkup.com/api/update/title',
                    data: JSON.stringify({title: title, community: community}),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.community.title = title;
                    this.$refs.altertitleform.reset();
                    this.$swal(
                        'Great!',
                        'Successfully Updated The Community Title!',
                        'success',
                    );
                }).catch(err => {
                    this.showOverlay = false;
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Updating The Community Title!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'Make Sure The Form Is Filled Out Correctly To Update The Title!',
                    'error',
                );
            }
        },
        deleteRule(rule) {
            //This method will be used to delete a rule from a community.
            this.showOverlay = true;
            let community = this.community.name;

            return axios({
                method: 'POST',
                url: 'https://www.linkkup.com/api/delete/rule',
                data: JSON.stringify({rule: rule, community: community}),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                this.showOverlay = false;
                this.community.rules = this.$_.reject(this.community.rules, r => r === rule);
                this.$swal(
                    'Great!',
                    'Successfully Deleted Rule!',
                    'success',
                );
            }).catch(err => {
                this.showOverlay = false;
                console.log(err.message);
                this.$swal(
                    'Uh Oh!',
                    'There Was An Error Deleting That Rule!',
                    'error',
                );
            });
        },
        addRule() {
            //This method will be responsible for adding a new community  rule or informing the user that they have too many 
            this.showOverlay = true;
            if(this.$refs.newruleform.validate()) {
                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/add/rule',
                    data: JSON.stringify({community: this.community.name, rule: this.newRule}),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    if(response.data === 'too many rules') {
                        this.$swal(
                            'Uh Oh',
                            'You Already Have 10 Community Rules. You Must Delete One To Add Another!',
                            'error',
                        );
                    }
                    else {
                        let ruleAdder = this.newRule;
                        this.showOverlay = false;
                        this.$refs.newruleform.reset();
                        this.community.rules.push(ruleAdder);
                    }
                }).catch(err => {
                    this.showOverlay = false;
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Adding That Rule!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'Make Sure You Filled Out The Form Properly To Add A New Rule!',
                    'error',
                );
            }
        },
        updateTheme() {
            //This is a method that will update the theme color for a community.
            this.showOverlay = true;
            let color = this.swatch;

            return axios({
                method: 'POST',
                url: 'https://www.linkkup.com/api/update/theme',
                data: JSON.stringify({community: this.community.name, color: color}),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                this.showOverlay = false;
                this.community.communityTheme = color;
                this.$store.commit('alterThemeColor', color);
            }).catch(err => {
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Updating The Theme Color For This Community',
                    'error',
                );
            });
        },
        updateAvatar() {
            //This is the method used for updating a community avatar 
            this.showOverlay = true;
            if(this.newAvatar !== '') {
                let fd = new FormData();
                fd.append('community', this.community.name);
                fd.append('avatar', this.newAvatar, 'avatar.jpg');
                fd.append('oldAvatar', this.community.avatar);
                
                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/update/avatar',
                    data: fd,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.community.avatar = response.data.avatar;
                    this.newAvatar = '';
                }).catch(err => {
                    this.showOverlay = false;
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Updating The Community Avatar!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh!',
                    'Must Enter An Avatar Image!',
                    'error',
                );
            }
        },
        unblockUser(uniqueUserId) {
            //This is the method that will handle unblocking a user from the community
            this.showOverlay = true;
            let community = this.community.name;

            return axios({
                method: 'POST',
                url: 'https://www.linkkup.com/api/unblock/user',
                data: JSON.stringify({community: community, uniqueUserId: uniqueUserId}),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                this.showOverlay = false;
                this.community.blockList = this.$_.reject(this.community.blockList, user => user.uniqueUserId === uniqueUserId);
            }).catch(err => {
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Unblocking That User!',
                    'error',
                );
            });
        },
        blockUser() {
            //This method will handle blocking a user from the community 
            this.showOverlay = true;
            if(this.$refs.blockuserform.validate()) {
                let username = this.blockUsername;
                let community = this.community.name;

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/block/user',
                    data: JSON.stringify({username: username, community: community}),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    if(response.data === 'user not found') {
                        this.$swal(
                            'Uh Oh',
                            'That Username Was Not Found, So We Cannot Block That User!',
                            'error',
                        );
                    }
                    else {
                        let blockedUser = {
                            username: username,
                            uniqueUserId: response.data.uniqueUserId,
                        };
                        this.community.blockList.push(blockedUser);
                        this.$refs.blockuserform.reset();
                    }
                }).catch(err => {
                    this.showOverlay = false;
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Blocking That User!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'Make Sure You Filled Out The Form Properly To Block A User!',
                    'error',
                );
            }
        },
        goToChat() {
            //Method that will route us to the community chat room when the Community Chat button is pressed 
            this.$router.push(`/linkkup/community/chat/${this.community.name}`);
        },
    },
});
</script>