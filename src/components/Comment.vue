<template>
    <div
        style="text-align: left" 
    >
        <v-overlay 
            :value="showOverlay"
        >
            <v-progress-circular :color="currentTheme" indeterminate size="64"></v-progress-circular>
            <h5>
            Posting 
            </h5>
        </v-overlay>
        <!--I may be able to remove the stipulation that a post be the personal type because 
            Each comment post should essentially work the same way due to the front-end and backe-end 
            business logic that I am adding for comments 
         -->
        <div 
            
        >
            <v-card 
                v-if="post.type === 'text'" 
            >
                <v-card-title>
                    <v-list-item>
                        <v-list-item-avatar 
                            :data-username="post.username"
                            @click="profileView($event)" 
                            style="cursor: pointer;"
                            v-if="post.context === 'personal'"
                        >
                            <v-img 
                                :src="`https://www.linkkup.com/api/user/avatar/${post.uniqueUserId}`" 
                                alt="linkkup Avatar" 
                            ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-avatar 
                            v-else-if="post.context === 'community'"
                            style="cursor: pointer;"
                            :data-community="post.community"
                            @click="communityView($event)"
                        >
                            <v-img 
                                :src="`https://www.linkkup.com/api/community/avatar/${post.community}`" 
                                alt="linkkup Community Avatar" 
                            ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title 
                                style="cursor: pointer;" 
                                :data-username="post.username" 
                                @click="profileView($event)" 
                            >
                                {{ post.username }}
                            </v-list-item-title>
                            <v-list-item-subtitle 
                                style="cursor: pointer;" 
                                :data-community="post.community" 
                                @click="communityView($event)" 
                            >
                                {{ post.community }} 
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action-text>
                            {{ timeDifference(post.utcTime, post.dateString) }}
                        </v-list-item-action-text>
                    </v-list-item>
                </v-card-title>
                <v-card-text
                    style="text-align: center" 
                >
                    {{ post.text }}
                </v-card-text>
                <v-card-actions>
                    <div 
                        v-if="postLikedTest(post.likes, this.$store.state.user.uniqueUserId)"
                    >
                        <v-btn 
                            icon 
                            :color="currentTheme"
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
                            :color="currentTheme"
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
                </v-card-actions>
                <v-divider></v-divider>
                <v-form 
                    ref="commentform"
                    class="mt-4 mb-4"
                >
                    <v-textarea 
                        name="comment"
                        placeholder="Add A Comment..."
                        persistent-hint 
                        label="Comment"
                        counter="10000"
                        :color="currentTheme"
                        :rules="commentRules"
                        v-on:keypress.13="sendComment"
                        v-model="userComment"
                    ></v-textarea>
                    <v-btn 
                        :color="currentTheme" 
                        dark 
                        depressed
                        class="mt-4"
                        @click="sendComment"
                    >
                        Comment 
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <div 
                    v-if="post.comments.length < 1" 
                >
                </div>
                <div 
                    v-else 
                >
                    <v-list>
                        <v-card 
                            v-for="(comment, index) in post.comments" 
                            :key='index'
                            :id="comment.uniqueCommentId"
                            width="100%"
                            class="mb-4"
                            elevation="3"
                        >
                            <v-list-item>
                                <v-list-item-avatar 
                                    :data-username="comment.username" 
                                    @click="profileView($event)"
                                    style="cursor: pointer;" 
                                >
                                    <v-img 
                                        :src="`https://www.linkkup.com/api/user/avatar/${comment.uniqueUserId}`" 
                                    ></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <small>
                                            {{ comment.username }}
                                        </small>
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action-text>
                                    <small>
                                        {{ timeDifference(comment.utcTime, comment.dateString) }} 
                                    </small>
                                </v-list-item-action-text>
                            </v-list-item>
                            <v-card-text>
                                <small>
                                    {{ comment.text }} 
                                </small>
                            </v-card-text>
                            <v-card-actions>
                                <div 
                                    v-if="commentLikedTest(comment.likes, user.uniqueUserId)"
                                >
                                    <v-btn 
                                        icon 
                                        :color="currentTheme"
                                        @click="unlikeComment"
                                        :data-unlikecomment="comment.uniqueCommentId"
                                        :data-unlikeuser="comment.uniqueUserId"
                                    >
                                        <v-icon>
                                            mdi-thumb-up
                                        </v-icon>
                                        <small 
                                            v-if="comment.likes.length > 0" 
                                        >
                                            {{ comment.likes.length }} 
                                        </small>
                                    </v-btn>
                                </div>
                                <div 
                                    v-else 
                                >
                                    <v-btn 
                                        icon
                                        :color="currentTheme"
                                        @click="likeComment"
                                        :data-likecomment="comment.uniqueCommentId"
                                        :data-likeuser="comment.uniqueUserId"
                                    >
                                        <v-icon>
                                            mdi-thumb-up-outline
                                        </v-icon>
                                        <small 
                                            v-if="comment.likes.length > 0" 
                                        >
                                            {{ comment.likes.length }} 
                                        </small>
                                    </v-btn>
                                </div>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    v-if="comment.uniqueUserId === user.uniqueUserId || post.uniqueUserId === user.uniqueUserId"
                                    :color="currentTheme" 
                                    icon 
                                    @click="deleteComment(post.uniquePostId, comment.uniqueCommentId, user.uniqueUserId)" 
                                >
                                    <v-icon>
                                        mdi-trash-can 
                                    </v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-divider></v-divider>
                    </v-list>
                </div>
            </v-card>
            <!--End of the card for text posts-->
            <!--Beginning Of Link Posts UI Logic-->
            <v-card 
                v-if="post.type === 'link'" 
            >
                <v-card-title>
                    <v-list-item>
                        <v-list-item-avatar 
                            :data-username="post.username"
                            @click="profileView($event)" 
                            style="cursor: pointer;"
                            v-if="post.context === 'personal'"
                        >
                            <v-img 
                                :src="`https://www.linkkup.com/api/user/avatar/${post.uniqueUserId}`" 
                                alt="linkkup Avatar" 
                            ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-avatar 
                            v-else-if="post.context === 'community'"
                            style="cursor: pointer;"
                            :data-community="post.community"
                            @click="communityView($event)"
                        >
                            <v-img 
                                :src="`https://www.linkkup.com/api/community/avatar/${post.community}`" 
                                alt="linkkup Community Avatar" 
                            ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title 
                                style="cursor: pointer;" 
                                :data-username="post.username" 
                                @click="profileView($event)" 
                            >
                                {{ post.username }}
                            </v-list-item-title>
                            <v-list-item-subtitle 
                                style="cursor: pointer;" 
                                :data-community="post.community" 
                                @click="communityView($event)" 
                            >
                                {{ post.community }} 
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action-text>
                            {{ timeDifference(post.utcTime, post.dateString) }}
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
                <v-card-text
                    style="text-align: center" 
                >
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
                        v-if="postLikedTest(post.likes, this.$store.state.user.uniqueUserId)"
                    >
                        <v-btn 
                            icon 
                            :color="currentTheme"
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
                            :color="currentTheme"
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
                </v-card-actions>
                <v-divider></v-divider>
                <v-form 
                    ref="commentform"
                    class="mt-4 mb-4"
                >
                    <v-textarea 
                        name="comment"
                        placeholder="Add A Comment..."
                        persistent-hint 
                        label="Comment"
                        counter="10000"
                        :color="currentTheme"
                        :rules="commentRules"
                        v-on:keypress.13="sendComment"
                        v-model="userComment"
                    ></v-textarea>
                    <v-btn 
                        :color="currentTheme" 
                        dark 
                        depressed
                        class="mt-4"
                        @click="sendComment"
                    >
                        Comment 
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <div 
                    v-if="post.comments.length < 1" 
                >
                </div>
                <div 
                    v-else 
                >
                    <v-list>
                        <v-card 
                            v-for="(comment, index) in post.comments" 
                            :key='index'
                            :id="comment.uniqueCommentId"
                            width="100%"
                            class="mb-4"
                            elevation="3"
                        >
                            <v-list-item>
                                <v-list-item-avatar 
                                    :data-username="comment.username" 
                                    @click="profileView($event)"
                                    style="cursor: pointer;" 
                                >
                                    <v-img 
                                        :src="`https://www.linkkup.com/api/user/avatar/${comment.uniqueUserId}`" 
                                    ></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <small>
                                            {{ comment.username }}
                                        </small>
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action-text>
                                    <small>
                                        {{ timeDifference(comment.utcTime, comment.dateString) }} 
                                    </small>
                                </v-list-item-action-text>
                            </v-list-item>
                            <v-card-text>
                                <small>
                                    {{ comment.text }} 
                                </small>
                            </v-card-text>
                            <v-card-actions>
                                <div 
                                    v-if="commentLikedTest(comment.likes, user.uniqueUserId)"
                                >
                                    <v-btn 
                                        icon 
                                        :color="currentTheme"
                                        @click="unlikeComment"
                                        :data-unlikecomment="comment.uniqueCommentId"
                                        :data-unlikeuser="comment.uniqueUserId"
                                    >
                                        <v-icon>
                                            mdi-thumb-up
                                        </v-icon>
                                        <small 
                                            v-if="comment.likes.length > 0" 
                                        >
                                            {{ comment.likes.length }} 
                                        </small>
                                    </v-btn>
                                </div>
                                <div 
                                    v-else 
                                >
                                    <v-btn 
                                        icon
                                        :color="currentTheme"
                                        @click="likeComment"
                                        :data-likecomment="comment.uniqueCommentId"
                                        :data-likeuser="comment.uniqueUserId"
                                    >
                                        <v-icon>
                                            mdi-thumb-up-outline
                                        </v-icon>
                                        <small 
                                            v-if="comment.likes.length > 0" 
                                        >
                                            {{ comment.likes.length }} 
                                        </small>
                                    </v-btn>
                                </div>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    v-if="comment.uniqueUserId === user.uniqueUserId || post.uniqueUserId === user.uniqueUserId"
                                    :color="currentTheme" 
                                    icon 
                                    @click="deleteComment(post.uniquePostId, comment.uniqueCommentId, user.uniqueUserId)" 
                                >
                                    <v-icon>
                                        mdi-trash-can 
                                    </v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-divider></v-divider>
                    </v-list>
                </div>
            </v-card>
            <!--End of the card for link posts-->
            <!--Begin the card and logic for photo posts that are personal posts-->
            <v-card 
                v-else-if="post.type === 'photo'"
                max-width="444px" 
                class="mx-auto"
            >
                <v-card-title>
                    <v-list-item>
                        <v-list-item-avatar 
                            :data-username="post.username"
                            @click="profileView($event)" 
                            style="cursor: pointer;"
                            v-if="post.context === 'personal'"
                        >
                            <v-img 
                                :src="`https://www.linkkup.com/api/user/avatar/${post.uniqueUserId}`" 
                                alt="linkkup Avatar" 
                            ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-avatar 
                            v-else-if="post.context === 'community'"
                            style="cursor: pointer;"
                            :data-community="post.community"
                            @click="communityView($event)"
                        >
                            <v-img 
                                :src="`https://www.linkkup.com/api/community/avatar/${post.community}`" 
                                alt="linkkup Community Avatar" 
                            ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title 
                                style="cursor: pointer;" 
                                :data-username="post.username" 
                                @click="profileView($event)" 
                            >
                                {{ post.username }}
                            </v-list-item-title>
                            <v-list-item-subtitle 
                                style="cursor: pointer;" 
                                :data-community="post.community" 
                                @click="communityView($event)" 
                            >
                                {{ post.community }} 
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action-text>
                            {{ timeDifference(post.utcTime, post.dateString) }}
                        </v-list-item-action-text>
                    </v-list-item>
                </v-card-title>
                    <v-img 
                        :src="`https://www.linkkup.com/api/get-photo?photo=${post.src}`" 
                        alt="linkkup Personal Post Photo"
                    ></v-img>
                <v-card-text
                    style="text-align: center" 
                >
                    {{ post.caption }}
                </v-card-text>
                <v-card-actions>
                    <div 
                        v-if="postLikedTest(post.likes, this.$store.state.user.uniqueUserId)"
                    >
                        <v-btn 
                            icon 
                            :color="currentTheme"
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
                            :color="currentTheme"
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
                </v-card-actions>
                <v-divider></v-divider>
                <v-form 
                    ref="commentform"
                    class="mt-4 mb-4"
                >
                    <v-textarea 
                        name="comment"
                        placeholder="Add A Comment..."
                        persistent-hint 
                        label="Comment"
                        counter="10000"
                        :color="currentTheme"
                        :rules="commentRules"
                        v-on:keypress.13="sendComment"
                        v-model="userComment"
                    ></v-textarea>
                    <v-btn 
                        :color="currentTheme" 
                        dark 
                        depressed
                        class="mt-4"
                        @click="sendComment"
                    >
                        Comment 
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <div 
                    v-if="post.comments.length < 1" 
                >
                </div>
                <div 
                    v-else 
                >
                    <v-list>
                        <v-card 
                            v-for="(comment, index) in post.comments" 
                            :key='index'
                            :id="comment.uniqueCommentId"
                            width="100%"
                            class="mb-4"
                            elevation="3"
                        >
                            <v-list-item>
                                <v-list-item-avatar 
                                    :data-username="comment.username" 
                                    @click="profileView($event)" 
                                    style="cursor: pointer;" 
                                >
                                    <v-img 
                                        :src="`https://www.linkkup.com/api/user/avatar/${comment.uniqueUserId}`" 
                                    ></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <small>
                                            {{ comment.username }}
                                        </small>
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action-text>
                                    <small>
                                        {{ timeDifference(comment.utcTime, comment.dateString) }} 
                                    </small>
                                </v-list-item-action-text>
                            </v-list-item>
                            <v-card-text>
                                <small>
                                    {{ comment.text }} 
                                </small>
                            </v-card-text>
                            <v-card-actions>
                                <div 
                                    v-if="commentLikedTest(comment.likes, user.uniqueUserId)"
                                >
                                    <v-btn 
                                        icon 
                                        :color="currentTheme"
                                        @click="unlikeComment"
                                        :data-unlikecomment="comment.uniqueCommentId"
                                        :data-unlikeuser="comment.uniqueUserId"
                                    >
                                        <v-icon>
                                            mdi-thumb-up
                                        </v-icon>
                                        <small 
                                            v-if="comment.likes.length > 0" 
                                        >
                                            {{ comment.likes.length }} 
                                        </small>
                                    </v-btn>
                                </div>
                                <div 
                                    v-else 
                                >
                                    <v-btn 
                                        icon
                                        :color="currentTheme"
                                        @click="likeComment"
                                        :data-likecomment="comment.uniqueCommentId"
                                        :data-likeuser="comment.uniqueUserId"
                                    >
                                        <v-icon>
                                            mdi-thumb-up-outline
                                        </v-icon>
                                        <small 
                                            v-if="comment.likes.length > 0" 
                                        >
                                            {{ comment.likes.length }} 
                                        </small>
                                    </v-btn>
                                </div>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    v-if="comment.uniqueUserId === user.uniqueUserId || post.uniqueUserId === user.uniqueUserId"
                                    :color="currentTheme" 
                                    icon 
                                    @click="deleteComment(post.uniquePostId, comment.uniqueCommentId, user.uniqueUserId)" 
                                >
                                    <v-icon>
                                        mdi-trash-can 
                                    </v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-divider></v-divider>
                    </v-list>
                </div>
            </v-card>
            <!--End of the card and logic for photo posts and comments-->
            <!--Begin the card and logic for video posts and comments-->
            <v-card 
                v-else-if="post.type === 'video'" 
            >
                <v-card-title>
                    <v-list-item>
                        <v-list-item-avatar 
                            :data-username="post.username"
                            @click="profileView($event)" 
                            style="cursor: pointer;"
                            v-if="post.context === 'personal'"
                        >
                            <v-img 
                                :src="`https://www.linkkup.com/api/user/avatar/${post.uniqueUserId}`" 
                                alt="linkkup Avatar" 
                            ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-avatar 
                            v-else-if="post.context === 'community'"
                            style="cursor: pointer;"
                            :data-community="post.community"
                            @click="communityView($event)"
                        >
                            <v-img 
                                :src="`https://www.linkkup.com/api/community/avatar/${post.community}`" 
                                alt="linkkup Community Avatar" 
                            ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title 
                                style="cursor: pointer;" 
                                :data-username="post.username" 
                                @click="profileView($event)" 
                            >
                                {{ post.username }}
                            </v-list-item-title>
                            <v-list-item-subtitle 
                                style="cursor: pointer;" 
                                :data-community="post.community" 
                                @click="communityView($event)" 
                            >
                                {{ post.community }} 
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action-text>
                            {{ timeDifference(post.utcTime, post.dateString) }}
                        </v-list-item-action-text>
                    </v-list-item>
                </v-card-title>
                <div 
                    max-height="500px" 
                    width="100%" 
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
                <v-card-text
                    style="text-align: center" 
                >
                    {{ post.caption }}
                </v-card-text>
                <v-card-actions>
                    <div 
                        v-if="postLikedTest(post.likes, this.$store.state.user.uniqueUserId)"
                    >
                        <v-btn 
                            icon 
                            :color="currentTheme"
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
                            :color="currentTheme"
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
                </v-card-actions>
                <v-divider></v-divider>
                <v-form 
                    ref="commentform"
                    class="mt-4 mb-4"
                >
                    <v-textarea 
                        name="comment"
                        placeholder="Add A Comment..."
                        persistent-hint 
                        label="Comment"
                        counter="10000"
                        :color="currentTheme"
                        :rules="commentRules"
                        v-on:keypress.13="sendComment"
                        v-model="userComment"
                    ></v-textarea>
                    <v-btn 
                        :color="currentTheme" 
                        dark 
                        depressed
                        class="mt-4"
                        @click="sendComment"
                    >
                        Comment 
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <div 
                    v-if="post.comments.length < 1" 
                >
                </div>
                <div 
                    v-else 
                >
                    <v-list>
                        <v-card 
                            v-for="(comment, index) in post.comments" 
                            :key='index'
                            :id="comment.uniqueCommentId"
                            width="100%"
                            class="mb-4"
                            elevation="3"
                        >
                            <v-list-item>
                                <v-list-item-avatar 
                                    :data-username="comment.username"
                                    @click="profileView($event)"
                                    style="cursor: pointer;" 
                                >
                                    <v-img 
                                        :src="`https://www.linkkup.com/api/user/avatar/${comment.uniqueUserId}`" 
                                    ></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <small>
                                            {{ comment.username }}
                                        </small>
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action-text>
                                    <small>
                                        {{ timeDifference(comment.utcTime, comment.dateString) }} 
                                    </small>
                                </v-list-item-action-text>
                            </v-list-item>
                            <v-card-text>
                                <small>
                                    {{ comment.text }} 
                                </small>
                            </v-card-text>
                            <v-card-actions>
                                <div 
                                    v-if="commentLikedTest(comment.likes, user.uniqueUserId)"
                                >
                                    <v-btn 
                                        icon 
                                        :color="currentTheme"
                                        @click="unlikeComment"
                                        :data-unlikecomment="comment.uniqueCommentId"
                                        :data-unlikeuser="comment.uniqueUserId"
                                    >
                                        <v-icon>
                                            mdi-thumb-up
                                        </v-icon>
                                        <small 
                                            v-if="comment.likes.length > 0" 
                                        >
                                            {{ comment.likes.length }} 
                                        </small>
                                    </v-btn>
                                </div>
                                <div 
                                    v-else 
                                >
                                    <v-btn 
                                        icon 
                                        :color="currentTheme"
                                        @click="likeComment"
                                        :data-likecomment="comment.uniqueCommentId"
                                        :data-likeuser="comment.uniqueUserId"
                                    >
                                        <v-icon>
                                            mdi-thumb-up-outline
                                        </v-icon>
                                        <small 
                                            v-if="comment.likes.length > 0" 
                                        >
                                            {{ comment.likes.length }} 
                                        </small>
                                    </v-btn>
                                </div>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    v-if="comment.uniqueUserId === user.uniqueUserId || post.uniqueUserId === user.uniqueUserId"
                                    :color="currentTheme" 
                                    icon 
                                    @click="deleteComment(post.uniquePostId, comment.uniqueCommentId, user.uniqueUserId)" 
                                >
                                    <v-icon>
                                        mdi-trash-can 
                                    </v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-divider></v-divider>
                    </v-list>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>

export default({
    name: 'Comment',
    data() {
        return {
            post: {},
            showOverlay: false,
            commentRules: [
                v => !!v || 'Must Enter A Comment!',
                v => v.length <= 10000 || 'Comment Must Be Less Than 10,0000 Characters!',
            ],
            userComment: '',
        }
    },
    created() {
        this.fetchPost();
    },
    methods: {
        fetchPost() {
            let uniquePostId = this.$route.params.uniquepostid;

            return axios({
                method: 'get',
                url: `https://www.linkkup.com/api/comments/${uniquePostId}`,
            }).then(result => {
                this.post = result.data.post;
                this.post.comments = this.post.comments.sort((a, b) => {
                    -b.utcTime;
                });
            }).catch(err => {
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Finding That Post!',
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
        likePost: function(event) {
            //This Is A Method That Will Enable A User To Like Their Own Personal Post
            this.showOverlay = true;
            let uniquePostId = event.currentTarget.getAttribute('data-likepost');
            let uniqueUserId = event.currentTarget.getAttribute('data-likeuser');
            let likingUser = this.$store.state.user.uniqueUserId 
            let ownLike;
            //Distinguish between a user who is liking their own post and one who is not!

            if(likingUser === uniqueUserId) {
                ownLike = true;
            }
            else {
                ownLike = false;
            }
            
            //Send The Post Request With Axios To Like The Post And Increase The Current Carma Of The User
            //Increase The Karma Of The User On This Request So That We Can Use The Same Route Later To Increase Karma...
            //When Someone Other Than The OP Likes The Post.

            return axios({
                method: 'get',
                url: `https://www.linkkup.com/api/like/${uniquePostId}/${likingUser}`,
            }).then(response => {
                if(ownLike === true) {
                    //this.$store.commit('updateUser', response.data.user);
                    //this.$store.commit('updateUserPosts', response.data.userPosts);
                }
                this.post = response.data.userPosts.find(post => post.uniquePostId === this.post.uniquePostId);
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
            let unlikerId = this.$store.state.user.uniqueUserId 
            let ownUnlike;

            if(unlikerId === uniqueUserId) {
                ownUnlike = true;
            }
            else {
                ownUnlike = false;
            }

            //Now we will set up an axios request for them to unlike the post
            return axios({
                method: 'get',
                url: `https://www.linkkup.com/api/unlike/${uniquePostId}/${unlikerId}`,
            }).then(response => {
                if(ownUnlike) {
                    //this.$store.commit('updateUser', response.data.user);
                    //this.$store.commit('updateUserPosts', response.data.userPosts);
                }
                this.post = response.data.userPosts.find(post => post.uniquePostId === this.post.uniquePostId);
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
        sendComment: function() {
            //This Method Will Handle Sending A Comment To The Server And Displaying It To The User.
            this.showOverlay = true;
            if(this.$refs.commentform.validate()) {
                let currentDate = new Date();
                let dateString = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`
                return axios({
                    method: 'post',
                    data: JSON.stringify({uniquePostId: this.post.uniquePostId, uniquePosterId: this.post.uniqueUserId, uniqueCommenterId: this.$store.state.user.uniqueUserId, commenterUsername: this.$store.state.user.username, comment: this.userComment, dateString: dateString}),
                    url: 'https://www.linkkup.com/api/add/comment',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.post = response.data.post;
                    this.$refs.commentform.reset();
                }).catch(err => {
                    this.showOverlay = false;
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Posting That Comment',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'Make Sure The Comment Field Is Properly Filled Out!',
                    'error',
                );
            }
        },
        commentLikedTest(likes, uniqueUserId) {
            let inLikes = likes.includes(uniqueUserId); //See if the uniqueUserId is included in the array of user ID's. 
            if(inLikes) {
                return true;
            }
            else {
                return false;
            }
        },
        likeComment: function(event) {
            //This Is A Method That Will Enable A User To Like A Comment From A Post
            this.showOverlay = true;
            let uniqueCommentId = event.currentTarget.getAttribute('data-likecomment'); //Get the uniqueId of the comment.
            let uniqueLikerId = this.$store.state.user.uniqueUserId //Get the unique id of the person liking the post.
            let uniquePosterId = event.currentTarget.getAttribute('data-likeuser') //This will be the ID of the person who posted the comment
            let uniquePostId = this.post.uniquePostId; //This will be the ID of the post to target.
            let ownPost;
            if(this.post.uniqueUserId === this.$store.state.user.uniqueUserId) {
                ownPost = true;
            }
            else {
                ownPost = false;
            }
            
            //Send The Post Request With Axios To Like The Comment And Increase The Current Carma Of
            //Increase The Karma Of The User On This Request So That We Can Use The Same Route Later To Increase Karma...
            //When Someone Other Than The OP Likes The Post.

            //Get the datestring for this comment like for notification purposes 
            let currentDate = new Date();
            let dateString = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`

            return axios({
                method: 'post',
                data: JSON.stringify({
                    uniquePostId: uniquePostId,
                    uniqueCommentId: uniqueCommentId,
                    uniqueLikerId: uniqueLikerId,
                    uniquePosterId: uniquePosterId,
                    username: this.$store.state.user.username,
                    dateString: dateString,
                }),
                url: 'https://www.linkkup.com/api/like/comment',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                this.showOverlay = false;
                if(ownPost === true) {
                    //this.$store.commit('updateUser', response.data.user);
                }
                this.post = response.data.post;
            }).catch(err => {
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                console.log(err.message);
                this.showOverlay = false;
                
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Liking That Comment!',
                    'error',
                );
            });
        },
        unlikeComment: function(event) {
            this.showOverlay = true;
            //This method will enable a user to unlike their own post. 
            let uniqueCommentId = event.currentTarget.getAttribute('data-unlikecomment');
            let uniquePosterId = event.currentTarget.getAttribute('data-unlikeuser');
            let uniqueUnlikerId = this.$store.state.user.uniqueUserId;
            let uniquePostId = this.post.uniquePostId;
            let ownPost;

            if(this.post.uniqueUserId === this.$store.state.user.uniqueUserId) {
                ownPost = true;
            }
            else {
                ownPost = false;
            }
            //Now we will set up an axios request for them to unlike the post
            return axios({
                method: 'post',
                data: JSON.stringify({
                    uniqueCommentId: uniqueCommentId,
                    uniquePosterId: uniquePosterId,
                    uniqueUnlikerId: uniqueUnlikerId,
                    uniquePostId: uniquePostId,
                }),
                url: `https://www.linkkup.com/api/unlike/comment`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                if(ownPost === true) {
                    //this.$store.commit('updateUser', response.data.user);
                    this.post = response.data.post;
                    this.showOverlay = false;
                }
                else {
                    this.post = response.data.post;
                    this.showOverlay = false;
                }
                this.post = response.data.post;
                this.showOverlay = false;
            }).catch(err => {
                console.log(err.message);
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Unliking That Comment!',
                    'error',
                );
            });
        },
        deleteComment(uniquePostId, uniqueCommentId, uniqueUserId) {
            //This is the function that will delete any comment from a post.
            this.showOverlay = true;

            return axios({
                method: 'POST',
                url: 'https://www.linkkup.com/api/delete/comment',
                data: JSON.stringify({uniquePostId: uniquePostId, uniqueCommentId: uniqueCommentId, uniqueUserId: uniqueUserId}),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                this.showOverlay = false;
                this.$swal(
                    'Great!',
                    'Comment Successfully Deleted!',
                    'success',
                );
                this.post = response.data.post;
                this.showOverlay = false;
            }).catch(err => {
                this.showOverlay = false;
                this.$swal(
                    'Uh Oh',
                    'There Was An Error Deleting That Comment!',
                    'error',
                );
            });
        },
        profileView(event) {
            //This method will handle switching to a profile when an avatar is clicked in posts or comments 
            let username = event.currentTarget.getAttribute('data-username');
            this.$router.push(`/linkkup/profile/${username}`);
        },
        communityView(event) {
            let community = event.currentTarget.getAttribute('data-community');
            this.$router.push(`/linkkup/community/${community}`);
        },
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        userAuthenticated() {
            return this.$store.state.userAuthenticated;
        },
        currentTheme() {
            return this.$store.state.themeColor;
        },
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
