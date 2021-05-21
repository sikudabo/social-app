<template>
    <div 
        style="text-align: left;" 
    >
        <v-row 
            class="mx-auto" 
        >
            <v-col 
                cols="12" 
            >
                <h3 
                    class="text-center" 
                >
                    About Linkkup 
                </h3>
            </v-col>
        </v-row>
        <v-row>
            <v-col 
                cols="12" 
            >
                <v-card 
                    class="mx-auto"
                    max-width="444px" 
                >
                    <v-img 
                        width="100%" 
                        dark
                        :src="require('../assets/site-images/server-farm.jpg')"
                        color="rgba(0, 0, 0, 0.4)"
                    >
                        <v-row 
                            align="start" 
                        >
                            <v-col 
                                cols="12" 
                            >
                                <v-avatar 
                                    size="200" 
                                    tile 
                                >
                                    <v-img 
                                        :src="require('../assets/site-images/simeon.jpg')" 
                                    ></v-img>
                                </v-avatar>
                            </v-col>
                        </v-row>
                        <v-row 
                            align="end" 
                        >
                            <v-col 
                                cols="12" 
                            >
                                <v-card-title 
                                    class="headline" 
                                >
                                    Simeon Ikudabo 
                                </v-card-title>
                                <v-card-title
                                    class="subtitle" 
                                >
                                    Linkkup Founder & CTO 
                                </v-card-title>
                            </v-col>
                        </v-row>
                    </v-img>
                    <v-card-text>
                        <p>
                            My Name Is Simeon Ikudabo And I Founded Linkkup To Bring People Together With The Power Of Technology. Social Media Platforms Have Made Us So Connected 
                            To Our Devices That We Are Disconnected From Real Human Interaction. The Power Of Linkkup Is That You Build Communities 
                            And Host Events With The Intention Of Meeting With People In Person And Building Strong Connections With Those Around You.
                            On Campus, In A New City Or Even In Your Hometown, You Have So Many People Around You Who You Share Similar Interests With, But 
                            You Will Likely Never Meet Them In Person. Linkkup Empowers You To Find Those People And Build Powerful Friendships In Real Life. 
                            Here Is How We Do It.
                        </p>
                        <v-spacer></v-spacer>
                        <h3>
                            1. Communities 
                        </h3>
                        <p>
                            We Enable You To Buld Communities On Our Platform That Revolve Around Your Interests. You Can Use These Communities 
                            To Meet People In Your Geographical Location Who Share Those Interests. We Enable You To Post Photos, Videos, Blog 
                            Text Posts And Links To News Within These Communities. Unlike Other Platforms, We Do Not Censor You. You Are Free 
                            To Post Whatever Interests You And Engage With Others In Your Community. 
                        </p>
                        <v-spacer></v-spacer>
                        <h3>
                            2. Events 
                        </h3>
                        <p>
                            We Give Your Events Exposure On Linkkup. You Can Post An Event About A Party You Are Throwing, Game You Are Attending, 
                            Movie You Are Watching, Charity Event Your Church Is Having Or Anything You Can Think Of. Events Help You Attract People 
                            In Your Geographical Location With The Same Interests. You Can Build New Friendships With Anyone By Attending These Events 
                            Together. For Example, If You Are Going To A Basketball Game And Have No One To Go With, Post That As An Event And Get People 
                            With An Interest In Going To Join. Technology Has Made Us Lonely, But Linkkup Is Technology That Helps You Rebuild The Connectivity To 
                            People Around You That Has Been Lost. Events Are A Great Tool Towards Building Strong Relationships.
                        </p>
                        <v-spacer></v-spacer>
                        <h3>
                            3. Direct Messaging 
                        </h3>
                        <p>
                            Direct Message Other Users That You Share Interests With. Our Direct Messaging Feature Allows You To Have Personal 
                            Conversations With Those People You Want To Know More About, Speak About Interesting Things With And People You 
                            Want To Meet In Person. Our Interface Makes It Easy To Search For Other Users On Linkkup Either By Their First And 
                            Last Name Or By Their Username. Use This Feature To Engage With Old Friend And Find New Ones. 
                        </p>
                        <v-spacer></v-spacer>
                        <h4>
                            4. Community Chat 
                        </h4>
                        <p>
                            Our Community Chat Feature Allows You To Chat With Other People Within The Community In Real-Time. You Must Join 
                            A Community To Have The Ability To Chat Within It. Doing So Will Enable You To Chat With The Entire Community 
                            About The Topics You Love, And We Empower You To Do It In Real-Time. 
                        </p>
                        <v-divider></v-divider>
                        <v-spacer></v-spacer>
                        <h1 
                            class="mt-3 mb-2" 
                        >
                            About Me 
                        </h1>
                        <v-spacer></v-spacer>
                        <p>
                            I Am A Former Indiana University Football Player. I Got The Idea For Linkkup When I Left Indiana University And 
                            Lost Connections With A Lot Of My Teammates. I Realized That Although We Could Connect On Current Social Media 
                            Platforms, We Had No Way Of Building A Strong Network Of Former Indiana University Football Players. Many Players 
                            Who Played Before Me Lived In My Current Location, But I Didn't Even Know It. That Is When 
                            I Got The Idea To Create An App For That. Linkkup Allows You To Find Those People Close To You Who Like The Same Things. 
                            Technology Has Made Us So Connected To Our Devices That We Are Disconnected 
                            From Those Around Us. I Built Linkkup To Rebuild That Connection. 
                        </p>
                        <p>
                            I Studied Healthcare Administration At Indiana University. In My Free Time I Enjoy Hanging Out With Friends, Meeting 
                            New People, Going To Events And Experiencing New Things And Building Software That Helps People. 
                        </p>
                        <p>
                            If You Want To Join Linkkup As An Employee, Or Simply Chat With Me, My Email Address Is sikudabo@alumni.iu.edu. You 
                            Can Message Me About Anything From Employment Opportunities, To News, To Any Topic You Like. I Am Very Easy To Reach 
                            And Always Down To Discuss Anything. 
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>

export default({
    name: 'About',
    data() {
        return {

        }
    },
    created() {
        if(this.$store.state.user !== null && this.store.state.userAuthenticated !== false) {
            this.$store.commit('alterThemeColor', this.$store.state.user.profileTheme);
        }
    },
});
</script>
