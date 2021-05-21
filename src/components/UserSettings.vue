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
                <h3>
                    Settings 
                </h3>
                <v-divider></v-divider>
                <v-form 
                    class="mb-4" 
                    ref="firstnameform"
                >
                    <v-text-field 
                        :color="user.profileTheme" 
                        v-model="firstName" 
                        placeholder="First Name" 
                        label="First Name" 
                        :rules="firstNameRules" 
                        v-on:keypress.13="alterFirstName"
                        required 
                    ></v-text-field>
                    <v-btn 
                        class="mt-3"
                        :color="user.profileTheme" 
                        dark 
                        @click="alterFirstName" 
                    >
                        Update
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <v-form 
                    class="mb-4" 
                    ref="lastnameform"
                >
                    <v-text-field 
                        :color="user.profileTheme" 
                        v-model="lastName" 
                        placeholder="Last Name" 
                        label="Last Name" 
                        :rules="lastNameRules" 
                        v-on:keypress.13="alterLastName"
                        required 
                    ></v-text-field>
                    <v-btn 
                        class="mt-3"
                        :color="user.profileTheme" 
                        dark 
                        @click="alterLastName" 
                    >
                        Update
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <v-form 
                    class="mb-4" 
                    ref="passwordform"
                >
                    <v-text-field 
                        :color="user.profileTheme" 
                        v-model="password" 
                        placeholder="Password" 
                        label="Password" 
                        :rules="passwordRules" 
                        v-on:keypress.13="alterPassword"
                        required 
                    ></v-text-field>
                    <v-btn 
                        class="mt-3"
                        :color="user.profileTheme" 
                        dark 
                        @click="alterPassword" 
                    >
                        Update
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <v-form 
                    class="mb-4"
                    ref="emailform" 
                >
                    <v-text-field 
                        name="email"
                        type="email"
                        :color="user.profileTheme"
                        v-model="email"
                        label="Email"
                        placeholder="Email"
                        hint="Must Have A Valid iu.edu Or alumni@iu.edu Email Address To Register"
                        persistent-hint 
                        :rules="emailRules"
                        v-on:keypress.32="noSpaces($event)"
                        v-on:keypress.13="alterEmail"
                        required
                    ></v-text-field>
                    <v-btn 
                        :color="user.profileTheme"
                        dark 
                        @click="alterEmail"
                    >
                        Update 
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <v-form 
                    class="mb-4"
                    ref="majorform" 
                >
                    <v-select 
                        prepend-icon="mdi-school"
                        v-model="major"
                        :color="user.profileTheme"
                        :items="majors"
                        :rules="majorRules"
                        label="Major"
                        required 
                    ></v-select>
                    <v-btn
                        dark 
                        class="mt-3"
                        :color="user.profileTheme" 
                        @click="alterMajor" 
                    >
                        Update 
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <v-form 
                    class="mb-4" 
                    ref="yearform" 
                >
                    <v-select 
                        prepend-icon="mdi-school"
                        v-model="year"
                        :color="user.profileTheme"
                        :items="years"
                        :rules="yearRules"
                        label="School Year"
                        hint="Enter Your Year In School (Required)"
                        required
                    ></v-select>
                    <v-btn 
                        :color="user.profileTheme" 
                        dark 
                        @click="alterYear"
                    >
                        Update 
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <v-form 
                    class="mb-4"
                    ref="interestsform" 
                >
                    <v-select 
                        prepend-icon="mdi-ski"
                        multiple 
                        name="interests"
                        :color="user.profileTheme"
                        v-model="interests"
                        :items="interestsList"
                        label="Interests"
                        hint="Must Select At Least One Interest, But Can Only Select Up To 5"
                        :rules="interestsRules"
                        persistent-hint
                    ></v-select>
                    <v-btn 
                        :color="user.profileTheme"
                        dark 
                        @click="alterInterests" 
                    >
                        Update 
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <v-form 
                    class="mb-4"
                    ref="fraternityform" 
                >
                    <v-select 
                        prepend-icon="mdi-account-tie"
                        name="fraternity"
                        v-model="fraternity"
                        :items="fraternityList"
                        :color="user.profileTheme"
                        label="Fraternity"
                        hint="Enter Your Fraternity If You Are In One"
                        :rules="fraternityRules"
                        persistent-hint
                    ></v-select>
                    <v-btn 
                        class="mt-3"
                        :color="user.profileTheme"
                        dark 
                        @click="alterFraternity" 
                    >
                        Update 
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <v-form 
                    class="mb-4"
                    ref="sororityform" 
                >
                    <v-select
                        prepend-icon="mdi-face-woman"
                        name="sorority"
                        v-model="sorority"
                        :items="sororityList"
                        :rules="sororityRules"
                        :color="user.profileTheme"
                        label="Sorority"
                        hint="Enter Your Sorority If You Are In One"
                        persistent-hint 
                    ></v-select>
                    <v-btn 
                        class="mt-3"
                        :color="user.profileTheme"
                        dark 
                        @click="alterSorority" 
                    >
                        Update 
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <v-form 
                    class="mb-4" 
                    ref="instagramform"
                >
                    <v-text-field 
                        prepend-icon="mdi-instagram"
                        name="instagramHandle"
                        v-model="instagramHandle"
                        placeholder="Enter Your Instagram Username (Optional)"
                        label="Instagram Handle"
                        v-on:keypress.13="alterInstagram"
                    ></v-text-field>
                    <v-btn 
                        class="mt-3"
                        :color="user.profileTheme"
                        dark 
                        @click="alterInstagram" 
                    >
                        Update 
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <v-form 
                    class="mb-4"
                    ref="twitterform" 
                >
                    <v-text-field 
                        prepend-icon="mdi-twitter"
                        name="twitterHandle"
                        v-model="twitterHandle"
                        placeholder="Enter Your Twitter Username  (Optional, Ommit The @ Sign)"
                        label="Twitter Handle" 
                        :color="user.profileTheme" 
                        v-on:keypress.13="alterTwitter"
                    ></v-text-field>
                    <v-btn 
                        :color="user.profileTheme" 
                        class="mt-3"
                        dark 
                        @click="alterTwitter" 
                    >
                        Update 
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <V-form 
                    class="mb-4"
                    ref="youtubeform" 
                >
                    <v-text-field 
                        prepend-icon="mdi-youtube"
                        name="youtubeChannel"
                        v-model="youtubeChannel"
                        placeholder="Enter The URL (Link) To Your Youtube Channel! (Optional)" 
                        label="Youtube Channel" 
                        :color="user.profileTheme"
                        v-on:keypress.13="alterYoutube"
                    ></v-text-field>
                    <v-btn 
                        class="mt-3"
                        :color="user.profileTheme"
                        dark 
                        @click="alterYoutube" 
                    >
                        Update 
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <v-form 
                    ref="sportform"
                    class="mb-4" 
                >
                    <v-select 
                        prepend-icon="mdi-football"
                        name="sport"
                        v-model="sport"
                        :items="sportList"
                        placeholder="Sport You Play For IU Athletics (Optional)"
                        label="IU Sport"
                        hint="If You Play A Sport At IU Let Us Know!"
                        persistent-hint 
                        class="mb-3"
                        :color="user.profileTheme"
                        v-on:keypress.13="alterSport"
                    ></v-select>
                    <v-btn 
                        :color="user.profileTheme" 
                        dark 
                        class="mt-3"
                        @click="alterSport" 
                    >
                        Update 
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <v-form 
                    class="mb-4"
                    ref="bioform" 
                >
                    <v-textarea 
                        v-model="bio"
                        name="bio"
                        placeholder="Tell Us About Yours! (Required)"
                        hint="Give Us A Brief Description Of Yourself In 300 Characters Or Less"
                        class="mb-4 mt-4"
                        :rules="bioRules"
                        :color="user.profileTheme"
                        counter="300"
                    ></v-textarea>
                    <v-btn 
                        :color="user.profileTheme" 
                        dark 
                        class="mt-4" 
                        @click="alterBio" 
                    >
                        Update 
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <v-label 
                    class="font-weight-bold mt-5"
                >
                    Select A Theme Color For Your Profile
                </v-label>
                <v-form 
                    ref="themeform" 
                    class="mb-4" 
                >
                    <v-color-picker 
                        label="Profile Theme" 
                        v-model="themeColor" 
                        :swatches="swatches" 
                        hide-mode-switch hide-inputs show-swatches
                    ></v-color-picker>
                    <v-btn 
                        class="mt-3" 
                        :color="user.profileTheme"
                        dark 
                        @click="alterTheme" 
                    >
                        Update 
                    </v-btn>
                </v-form>
                <v-divider></v-divider>
                <v-label>
                    Update Your Profile Picture 
                </v-label>
                <v-form 
                    ref="avatarform" 
                    class="mb-3" 
                >
                    <image-uploader
                        :debug="1"
                        :maxWidth="1024"
                        :maxHeight="1024"
                        :quality="0.99"
                        outputFormat="blob"
                        :preview=false
                        accept="image/jpeg, image/png, image/jpg"
                        v-model="avatarImg"
                        required
                    ></image-uploader>
                    <v-btn 
                        class="mt-3" 
                        :color="user.profileTheme" 
                        dark 
                        @click="alterAvatar" 
                    >
                        Update 
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </div>
</template>

<script> 

export default({
    name: 'UserSettings',
    data() {
        return {
            showOverlay: false,
            firstName: '',
            firstNameRules: [
                v => !!v || 'Must Enter A Valid First Name',
            ],
            lastName: '',
            lastNameRules: [
                v => !!v || 'Must Enter A Valid Last Name',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Must Enter A Password!',
                v => v.length >= 6 || 'Password Must Be At Least 6 Characters Long!',
            ],
            emailRe: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            email: '',
            emailRules: [
                v => !!v || 'Must Enter An Email Address!',
                v => (v.endsWith('iu.edu') || v.endsWith('alumni@iu.edu')) || 'Must Have A Valid IU Email Address!',
                v => this.emailRe.test(v) || 'Must Enter A Valid Email Format!',
            ],
            major: '',
            majorRules: [
                v => !!v || 'Must Enter A Major! Enter Undecided Or None If You Do Not Have One',
            ],
            majors: [
                 'Undecided', 'None', 'Accounting', 'African Studies', "Agriculture", 'Anatomy', 'Animal Behavior', 'Anthropology', 'Apparel Merchandising', 
                'Applied Research & Inquiry', 'Applied Statistics', 'Architecture', 'Art', 'Asian Studies', 'Astronomy', 'Astrophysics', 'Atheletic Administration/Sports Management',
                'Athletic Training', 'Atmospheric Science', 'Audiology', 'Behaviorial Health', 'Biblical', 'Biochemistry', 'Bioinformatics',
                'Biology', 'Biostatistics', 'Biotechnology', 'Business', 'Chemistry', 'Community Health', 'Computer Science', 'Counseling',
                'Criminal Justice', 'Dietetics', 'Earth Science', 'Economics', 'Education', 'Energy', 'English', 'Entrepreneurship', 
                'Environmental Studies', 'Epidemiology', 'European Studies', 'Evolution', 'Exercise Science', 'Family Health', 'Farming', 'Fashion',
                'Finance', 'Folklore', 'Food Studies', 'French', 'Game Design', 'Gender Studies', 'General Studies', 'Geography', 'Geology',
                'German', 'Government', 'Hazard Materials Management', 'Health Physics', 'Health Policy', 'Healthcare Management', 'Higher Education',
                'History', 'Human Biology', 'Human Resources', 'Improvement Science', 'India Studies', 'individualized Major', 'Informatics', 'Information',
                'Intelligent Systems Engineering', 'Interior Design', 'International Business', 'International Studies', 'Islamic Studies',
                'Italian', 'Japanese', 'Jewish Studies', 'Journalism', 'Kinesiology', 'Labor Studies', 'Language And Speech', 'Law',
                'Learning Development', 'Liberal Arts', 'Liberal Studies', 'Linguistics', 'Literacy', 'Local Government', 'Logic', 'Management',
                'Marketing', 'Martial Arts', 'Mathematical Physics', 'Mathematics', 'Media', 'Medical', 'Medieval', 'Mental Health',
                'Microbiology', 'Music', 'Neuroscience', 'Nonprofit Management', 'Nursing', 'Nutrition', 'Operations', 'Optometry', 
                'Outdoor Recreation', 'Parks And Public Lands', 'Pathology', 'Pharmacology', 'Philosophy', 'Physical Activity', 
                'Physics', 'Physiology', 'Policy', 'Political Science', 'Portuguese', 'Product Management', 'Professional Sales', 
                'Psychology', 'Public And Nonprofit Management', 'Public Affairs', 'Public Health', 'Public Management', 'Recreation',
                'Religious Studies', 'Renaissance Studies', 'Russian', 'Safety', 'Secondary Education', 'Sexual Health', 'Social Studies',
                'Social Work', 'Sociology', 'Spanish', 'Special Education', 'Speech And Hearing', 'Sports Marketing And Management', 
                'Statistics', 'Student Affairs', 'Studio Art', 'Supply Chain Operations', 'Supply Chain Management', 'Sustainability',
                'Theatre And Drama', 'Tourism', 'Urban Studies', 'Victorian Studies', 'Vision Science', 'Visual Arts Education',
                'Water Management', 'World Languages Education', 'Youth Development',
            ],
            year: '',
            years: [
                'Freshman', 'Sophmore', 'Junior', 'Senior', 'Victor Lap', 'Grad School',
            ],
            yearRules: [
                v => !!v || 'Must Enter A Year In School!',
            ],
            interests: [],
            interestsRules: [
                v => v.length > 0 || "Must Select At Least One Interest",
                v => v.length <= 5 || "Can Only Select Up To 5 Interests",
            ],
            interestsList: [
                'Activism', 'Animals And Pets', 'Art', 'Astrology', 'Bars', 'Baseball', 'Beauty And Makeup', 'Biking', 'Black Lives Matter', 'Business', 'Careers', 'Cars And Motor Vehicles', 
                'Celebrity', 'College Baseball', 'College Basketball', 'College Football', 'Computer Science', 'Crafts And DYI', 'Crossfit', 'Crypto', 'Culture Race And Ethnicity', 'Day Trading', 'Economics',
                'Education', 'Electronics', 'Ethics And Philosophy', 'Family And Relationships', 'Fashion', 'Filming', 'Fitness And Nutrition', 'Food And Drink', 'Funny/Humor',
                'Gaming', 'Gender', 'Greek Life', 'History', 'Hobbies', 'Home And Garden', 'Hoosier Sports', 'Investing', 'International Culture', 'Internet Culture', 'Intramural Sports', 'Marijuna', 'Marketplace And Deals',
                'Mature Themes And Adult Content', 'Medical And Mental Health', "Men's Health", 'linkkup', 'Military', 'Movies', 'Music', 'NBA', 'NFL', 'Nigeria', 'Nursing',
                'Outdoors And Nature', 'Partying', 'Personal Connections', 'Photography', 'Podcasts And Streamers', 'Politics', 'Pop Culture', 'Programming', 'Public Policy', 'Reading Writing And Literature', 
                'Religion And Spirituality', 'Rowing', 'Running', 'Science', 'Sexual Health And Orientation', 'Side Hustle', 'Sports', 'Soccer', 'Social Justice', 'Tabletop Games', 'Television', 'Theatre', 'Track & Field', 'Volleyball',
                "Women's Health", 'World News', 'Working Out/Gym', 'Work/Labor'
            ],
            fraternity: '',
            fraternityList: [
                'Acacia', 'Alpha Kappa Lambda', 'Alpha Pi Alpha', 'Alpha Tau Omega', 'Beta Chi Theta', 'Beta Sigma Psi', 'Beta Theta Pi',
                'Chi Phi', 'Delta Chi', 'Delta Kappa Epsilon', 'Delta Sigma Phi', 'Delta Tau Delta', 'Delta Upsilon', 'Iota Phi Theta',
                'Kappa Alpha Psi', 'Kappa Delta Rho', 'Kappa Sigma', 'Lambda Chi Alpha', 'Omega Psi Phi', 'Phi Beta Sigma', 'Phi Delta Theta',
                'Phi Gamma Delta', 'Phi Kappa Psi', 'Phi Kappa Sigma', 'Phi Kappa Tau', 'Phi Sigma Kappa', 'Pi Kappa Alpha', 'Pi Kappa Phi',
                'Pi Lambda Phi', 'Sigma Alpha Epsilon', 'Sigma Alpha Mu', 'Sigma Chi', 'Sigma Lambda Beta', 'Sigma Nu', 'Sigma Phi Beta',
                'Sigma Phi Epsilon', 'Sigma Pi', 'Tau Epsilon Phi', 'Theta Chi', 'Zeta Beta Tau',
            ],
            fraternityRules: [
                v => !!v || 'Must Select A Fraternity!',
            ],
            sorority: '',
            sororityList: [
                'Alpha Chi Omega', 'Alpha Delta Pi', 'Alpha Epsilon Phi', 'Alpha Gamma Delta', 'Alpha Kappa Alpha', 'Alpha Omicron Pi',
                'Alpha Phi', 'Alpha Sigma Alpha', 'Alpha Xi Delta', 'Chi Omega', 'Delta Delta Delta', 'Delta Gamma', 'Delta Phi Epsilon',
                'Delta Sigma Theta', 'Delta Zeta', 'Gamma Phi Beta', 'Kappa Alpha Theta', 'Kappa Delta', 'Kappa Kappa Gamma', 'Phi Mu',
                'Pi Beta Phi', 'Sigma Delta Tau', 'Sigma Gamma Rho', 'Sigma Kappa', 'Theta Phi Alpha', 'Zeta Phi Beta', 'Zeta Tau Alpha',
            ],
            sororityRules: [
                v => !!v || 'Must Select A Sorority!',
            ],
            instagramHandle: '',
            twitterHandle: '',
            youtubeChannel: '',
            sport: '',
            sportList: [
                'Football', 'Basketball', 'Baseball', 'Volleyball', 'Golf', 'Soccer', 'Swimming And Diving', 'Tennis', 'Wrestling',
                'Field Hockey', 'Rowing', 'Softball', 'Track And Field', 'Water Polo', 'Cross Country',
            ],
            bio: '',
            bioRules: [
                v => v.length > 10 || "Tell Us A Little More Than That!",
                v => v.length <= 300 || "Bio's Must Be Less Than 300 Characters!",
            ],
            themeColor: '',
            swatches: [
                        ['#DC143C', '#AA0000', '#550000', '#7D3C98'],
                        ['#0B5345', '#1A5276', '#4A235A', '#192841'],
                        ['#00FF00', '#00AA00', '#005500', '#BA4A00'],
                        ['#00FFFF', '#00AAAA', '#005555', '#95A5A6 '],
                        ['#0000FF', '#0000AA', '#000055', '#000000'],
                    ],
            avatarImg: '',
        }
    },
    created() {
        this.$store.commit('alterThemeColor', this.$store.state.user.profileTheme);
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
        alterFirstName(e) {
            //Method For Altering A First Name 
            e.preventDefault();
            this.showOverlay = true 
            if(this.$refs.firstnameform.validate()) {
                let firstName = this.firstName;

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/change/firstname',
                    data: JSON.stringify({
                        firstName: firstName,
                        uniqueUserId: this.user.uniqueUserId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.$store.commit('updateUser', response.data.user, response.data.user.profileTheme);
                    this.$refs.firstnameform.reset();
                    this.firstName = '';
                }).catch(err => {
                    this.showOverlay = false; 
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Updating Your First Name!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false; 
                this.$swal(
                    'Uh Oh',
                    'You Did Not Fill Out That Field Properly!',
                    'error',
                );
            }
        },
        alterLastName(e) {
            //Method For Altering A First Name 
            e.preventDefault();
            this.showOverlay = true 
            if(this.$refs.lastnameform.validate()) {
                let lastName = this.lastName;

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/change/lastname',
                    data: JSON.stringify({
                        lastName: lastName,
                        uniqueUserId: this.user.uniqueUserId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.$store.commit('updateUser', response.data.user, response.data.user.profileTheme);
                    this.$refs.lastnameform.reset();
                    this.lastName = '';
                }).catch(err => {
                    this.showOverlay = false; 
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Updating Your Last Name!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false; 
                this.$swal(
                    'Uh Oh',
                    'You Did Not Fill Out That Field Properly!',
                    'error',
                );
            }
        },
        alterPassword(e) {
            //Method For Altering A First Name 
            e.preventDefault();
            this.showOverlay = true 
            if(this.$refs.passwordform.validate()) {
                let password = this.password;

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/change/password',
                    data: JSON.stringify({
                        password: password,
                        uniqueUserId: this.user.uniqueUserId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.$store.commit('updateUser', response.data.user, response.data.user.profileTheme);
                    this.$refs.passwordform.reset();
                    this.password = '';
                }).catch(err => {
                    this.showOverlay = false; 
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Updating Your Password!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false; 
                this.$swal(
                    'Uh Oh',
                    'You Did Not Fill Out That Field Properly!',
                    'error',
                );
            }
        },
        alterEmail(e) {
            //Method For Altering A First Name 
            e.preventDefault();
            this.showOverlay = true 
            if(this.$refs.emailform.validate()) {
                let email = this.email;

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/change/email',
                    data: JSON.stringify({
                        email: email,
                        uniqueUserId: this.user.uniqueUserId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.$store.commit('updateUser', response.data.user, response.data.user.profileTheme);
                    this.$refs.emailform.reset();
                    this.email = '';
                }).catch(err => {
                    this.showOverlay = false; 
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Updating Your Email!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false; 
                this.$swal(
                    'Uh Oh',
                    'You Did Not Fill Out That Field Properly!',
                    'error',
                );
            }
        },
        alterMajor(e) {
            //Method For Altering A First Name 
            e.preventDefault();
            this.showOverlay = true 
            if(this.$refs.majorform.validate()) {
                let major = this.major;

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/change/major',
                    data: JSON.stringify({
                        major: major,
                        uniqueUserId: this.user.uniqueUserId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.$store.commit('updateUser', response.data.user, response.data.user.profileTheme);
                    this.$refs.majorform.reset();
                    this.major = '';
                }).catch(err => {
                    this.showOverlay = false; 
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Updating Your Major!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false; 
                this.$swal(
                    'Uh Oh',
                    'You Did Not Fill Out That Field Properly!',
                    'error',
                );
            }
        },
        alterYear(e) {
            //Method For Altering A First Name 
            e.preventDefault();
            this.showOverlay = true 
            if(this.$refs.yearform.validate()) {
                let year = this.year;

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/change/year',
                    data: JSON.stringify({
                        year: year,
                        uniqueUserId: this.user.uniqueUserId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.$store.commit('updateUser', response.data.user, response.data.user.profileTheme);
                    this.$refs.yearform.reset();
                    this.year = '';
                }).catch(err => {
                    this.showOverlay = false; 
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Updating Your Year In School!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false; 
                this.$swal(
                    'Uh Oh',
                    'You Did Not Fill Out That Field Properly!',
                    'error',
                );
            }
        },
        alterInterests(e) {
            //Method For Altering A First Name 
            e.preventDefault();
            this.showOverlay = true 
            if(this.$refs.interestsform.validate()) {
                let interests = this.interests;

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/change/interests',
                    data: JSON.stringify({
                        interests: interests,
                        uniqueUserId: this.user.uniqueUserId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.$store.commit('updateUser', response.data.user, response.data.user.profileTheme);
                    this.$refs.interestsform.reset();
                    this.interests = [];
                }).catch(err => {
                    this.showOverlay = false; 
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Updating Your Interests!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false; 
                this.$swal(
                    'Uh Oh',
                    'You Did Not Fill Out That Field Properly!',
                    'error',
                );
            }
        },
        alterFraternity(e) {
            //Method For Altering A First Name 
            e.preventDefault();
            this.showOverlay = true 
            if(this.$refs.fraternityform.validate()) {
                let fraternity = this.fraternity;

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/change/fraternity',
                    data: JSON.stringify({
                        fraternity: fraternity,
                        uniqueUserId: this.user.uniqueUserId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.$store.commit('updateUser', response.data.user, response.data.user.profileTheme);
                    this.$refs.fraternityform.reset();
                    this.fraternity = '';
                }).catch(err => {
                    this.showOverlay = false; 
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Updating Your Fraternity!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false; 
                this.$swal(
                    'Uh Oh',
                    'You Did Not Fill Out That Field Properly!',
                    'error',
                );
            }
        },
        alterSorority(e) {
            //Method For Altering A First Name 
            e.preventDefault();
            this.showOverlay = true 
            if(this.$refs.sororityform.validate()) {
                let sorority = this.sorority;

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/change/sorority',
                    data: JSON.stringify({
                        sorority: sorority,
                        uniqueUserId: this.user.uniqueUserId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.$store.commit('updateUser', response.data.user, response.data.user.profileTheme);
                    this.$refs.sororityform.reset();
                    this.sorority = '';
                }).catch(err => {
                    this.showOverlay = false; 
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Updating Your Sorority!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false; 
                this.$swal(
                    'Uh Oh',
                    'You Did Not Fill Out That Field Properly!',
                    'error',
                );
            }
        },
        alterInstagram(e) {
            //Method For Altering A First Name 
            e.preventDefault();
            this.showOverlay = true 
            if(this.$refs.instagramform.validate()) {
                let instagram = this.instagramHandle;

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/change/instagram',
                    data: JSON.stringify({
                        instagram: instagram,
                        uniqueUserId: this.user.uniqueUserId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.$store.commit('updateUser', response.data.user, response.data.user.profileTheme);
                    this.$refs.instagramform.reset();
                    this.instagramHandle = '';
                }).catch(err => {
                    this.showOverlay = false; 
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Updating Your Instagram Handle!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false; 
                this.$swal(
                    'Uh Oh',
                    'You Did Not Fill Out That Field Properly!',
                    'error',
                );
            }
        },
        alterTwitter(e) {
            //Method For Altering A First Name 
            e.preventDefault();
            this.showOverlay = true 
            if(this.$refs.twitterform.validate()) {
                let twitter = this.twitterHandle;

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/change/twitter',
                    data: JSON.stringify({
                        twitter: twitter,
                        uniqueUserId: this.user.uniqueUserId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.$store.commit('updateUser', response.data.user, response.data.user.profileTheme);
                    this.$refs.twitterform.reset();
                    this.twitterHandle = '';
                }).catch(err => {
                    this.showOverlay = false; 
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Updating Your Twitter Handle!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false; 
                this.$swal(
                    'Uh Oh',
                    'You Did Not Fill Out That Field Properly!',
                    'error',
                );
            }
        },
        alterYoutube(e) {
            //Method For Altering A First Name 
            e.preventDefault();
            this.showOverlay = true 
            if(this.$refs.youtubeform.validate()) {
                let youtube = this.youtubeChannel;

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/change/youtube',
                    data: JSON.stringify({
                        youtube: youtube,
                        uniqueUserId: this.user.uniqueUserId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.$store.commit('updateUser', response.data.user, response.data.user.profileTheme);
                    this.$refs.youtubeform.reset();
                    this.youtubeChannel = '';
                }).catch(err => {
                    this.showOverlay = false; 
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Updating Your Youtube Channel!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false; 
                this.$swal(
                    'Uh Oh',
                    'You Did Not Fill Out That Field Properly!',
                    'error',
                );
            }
        },
        alterSport(e) {
            //Method For Altering A First Name 
            e.preventDefault();
            this.showOverlay = true 
            if(this.$refs.sportform.validate()) {
                let sport = this.sport;

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/change/sport',
                    data: JSON.stringify({
                        sport: sport,
                        uniqueUserId: this.user.uniqueUserId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.$store.commit('updateUser', response.data.user, response.data.user.profileTheme);
                    this.$refs.sportform.reset();
                    this.sport = '';
                }).catch(err => {
                    this.showOverlay = false; 
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Updating Your Sport!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false; 
                this.$swal(
                    'Uh Oh',
                    'You Did Not Fill Out That Field Properly!',
                    'error',
                );
            }
        },
        alterBio(e) {
            //Method For Altering A First Name 
            e.preventDefault();
            this.showOverlay = true 
            if(this.$refs.bioform.validate()) {
                let bio = this.bio;

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/change/bio',
                    data: JSON.stringify({
                        bio: bio,
                        uniqueUserId: this.user.uniqueUserId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.$store.commit('updateUser', response.data.user, response.data.user.profileTheme);
                    this.$refs.bioform.reset();
                    this.bio = '';
                }).catch(err => {
                    this.showOverlay = false; 
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Updating Your Bio!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false; 
                this.$swal(
                    'Uh Oh',
                    'You Did Not Fill Out That Field Properly!',
                    'error',
                );
            }
        },
        alterTheme(e) {
            //Method For Altering A First Name 
            e.preventDefault();
            this.showOverlay = true 
            if(this.$refs.themeform.validate()) {
                let theme = this.themeColor;

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/change/theme',
                    data: JSON.stringify({
                        theme: theme,
                        uniqueUserId: this.user.uniqueUserId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.$store.commit('updateUser', response.data.user, response.data.user.profileTheme);
                }).catch(err => {
                    this.showOverlay = false; 
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh',
                        'There Was An Error Updating Your Profile Theme Color!',
                        'error',
                    );
                });
            }
            else {
                this.showOverlay = false; 
                this.$swal(
                    'Uh Oh',
                    'You Did Not Fill Out That Field Properly!',
                    'error',
                );
            }
        },
        alterAvatar() {
            //This is the method to alter an avatar image 
            this.showOverlay = true 
            if(this.avatarImg !== '') {
                let fd = new FormData();
                fd.append('uniqueUserId', this.user.uniqueUserId);
                fd.append('avatar', this.avatarImg, 'avatar.jpg');
                fd.append('oldAvatar', this.user.avatar);

                return axios({
                    method: 'POST',
                    url: 'https://www.linkkup.com/api/change/avatar',
                    data: fd,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then(response => {
                    this.showOverlay = false;
                    this.$store.commit('updateUser', response.data.user);
                    this.avatarImg = '';
                }).catch(err => {
                    this.showOverlay = false;
                    console.log(err.message);
                    this.$swal(
                        'Uh Oh!',
                        'There Was An Error Updating Your Profile Picture!',
                        'error',
                    )
                });
            }
            else {
                this.$swal(
                    'Uh Oh',
                    'You Must Enter An Avatar Image!',
                    'error',
                );
            }
        },
    },
});
</script>
