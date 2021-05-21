<template>
    <div>
        <v-row>
            <v-col 
                cols="12"
                class="text-center"
            >
                <h3>
                    Sign Up For linkkup Today
                </h3>
                <v-switch 
                    v-model='validated'
                    label='Form Validated'
                    color='rgb(220, 20, 60)'
                    readonly
                ></v-switch>
                <v-form 
                    ref='form'
                    v-model="validated"
                    >
                    <v-text-field 
                        prepend-icon="mdi-yoga"
                        name="username"
                        v-model="username"
                        label="Username"
                        placeholder="Username"
                        hint="Username Must Be Between 6 And 20 Characters With No Spaces"
                        :rules="usernameRules"
                        v-on:keypress.32="noSpaces($event)"
                        required
                    ></v-text-field>
                    <v-text-field 
                        prepend-icon="mdi-lock-check"
                        name="password"
                        type="password"
                        v-model="password"
                        label="Password"
                        placeholder="Password"
                        hint="Password Must Be At Least 6 Characters"
                        :rules="passwordRules"
                        required
                    ></v-text-field>
                    <v-text-field 
                        prepend-icon="mdi-pencil"
                        name="firstName"
                        v-model="firstName"
                        label="First Name"
                        placeholder="First Name"
                        hint="Enter Your First Name"
                        :rules="firstNameRules"
                        required 
                    ></v-text-field>
                    <v-text-field 
                        prepend-icon="mdi-pencil"
                        name="lastName"
                        v-model="lastName"
                        label="Last Name"
                        placeholder="Last Name"
                        hint="Enter Last Name"
                        :rules="lastNameRules"
                    ></v-text-field>
                    <v-text-field 
                        prepend-icon="mdi-card-account-mail-outline"
                        name="email"
                        type="email"
                        v-model="email"
                        label="Email"
                        placeholder="Email"
                        hint="Must Have A Valid iu.edu Or alumni@iu.edu Email Address To Register"
                        :rules="emailRules"
                        v-on:keypress.32="noSpaces($event)"
                        required
                    ></v-text-field>
                    <v-text-field 
                        prepend-icon="mdi-home-variant"
                        name="hometown"
                        v-model="hometown"
                        label="Hometown"
                        placeholder="Hometown"
                        hint="Must Enter Your Home Town"
                        :rules="homeTownRules"
                        required
                    ></v-text-field>
                    <v-select 
                        prepend-icon="mdi-home-variant"
                        v-model="homeState"
                        :items="states"
                        :rules="homeStateRules"
                        label="Home State"
                        required
                    ></v-select>
                    <v-select 
                        prepend-icon="mdi-school"
                        v-model="major"
                        :items="majors"
                        :rules="majorRules"
                        label="Major"
                        required 
                    ></v-select>
                    <v-select 
                        prepend-icon="mdi-school"
                        v-model="schoolYear"
                        :items="schoolYears"
                        :rules="schoolYearRules"
                        label="School Year"
                        hint="Enter Your Year In School (Required)"
                        required
                    ></v-select>
                    <v-select 
                        prepend-icon="mdi-ski"
                        multiple 
                        name="interests"
                        v-model="interests"
                        :items="interestsList"
                        label="Interests"
                        hint="Must Select At Least One Interest, But Can Only Select Up To 5"
                        :rules="interestsRules"
                        persistent-hint
                    ></v-select>
                    <v-select 
                        prepend-icon="mdi-account-tie"
                        name="fraternity"
                        v-model="fraternity"
                        :items="fraternityList"
                        label="Fraternity (Optional)"
                        hint="Enter Your Fraternity If You Are In One"
                        persistent-hint
                    ></v-select>
                    <v-select
                        prepend-icon="mdi-face-woman"
                        name="sorority"
                        v-model="sorority"
                        :items="sororityList"
                        label="Sorority (Optional)"
                        hint="Enter Your Sorority If You Are In One"
                        persistent-hint 
                    ></v-select>
                    <v-text-field 
                        prepend-icon="mdi-instagram"
                        name="instagramHandle"
                        v-model="instagramHandle"
                        placeholder="Enter Your Instagram Username (Optional)"
                        label="Instagram Handle"
                    ></v-text-field>
                    <v-text-field 
                        prepend-icon="mdi-twitter"
                        name="twitterHandle"
                        v-model="twitterHandle"
                        placeholder="Enter Your Twitter Username  (Optional, Ommit The @ Sign)"
                        label="Twitter Handle" 
                    ></v-text-field>
                    <v-text-field 
                        prepend-icon="mdi-youtube"
                        name="youtubeChannel"
                        v-model="youtubeChannel"
                        placeholder="Enter The URL (Link) To Your Youtube Channel! (Optional)" 
                        label="Youtube Channel" 
                    ></v-text-field>
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
                    ></v-select>
                    <v-textarea 
                        v-model="bio"
                        name="bio"
                        placeholder="Tell Us About Yours! (Required)"
                        hint="Give Us A Brief Description Of Yourself In 300 Characters Or Less"
                        class="mb-4 mt-4"
                        :rules="bioRules"
                        counter="300"
                    ></v-textarea>
                    <v-spacer></v-spacer>
                    <v-row>
                        <v-col 
                            cols="12"
                            class="mb-3"
                        >
                            <v-label class="font-weight-bold">
                                Select An Avatar Image (Required)
                            </v-label>
                            <image-uploader
                                :debug="1"
                                :maxWidth="1024"
                                :maxHeight="1024"
                                :quality="0.99"
                                outputFormat="blob"
                                :preview=true
                                accept="image/jpeg, image/png, image/jpg"
                                v-model="avatarImg"
                                required
                            ></image-uploader>
                            <v-spacer></v-spacer>
                        </v-col>
                    </v-row>
                    <v-label 
                        class="font-weight-bold mt-5"
                    >
                        Select A Theme Color For Your Profile
                    </v-label>
                    <v-color-picker label="Profile Theme" v-model="themeColor" :swatches="swatches" hide-mode-switch hide-inputs show-swatches></v-color-picker>
                    <v-spacer></v-spacer>
                     <v-btn 
                        color="rgb(220, 20, 60)"
                        :disabled="btnDisable"
                        @click="validateNewProfile"
                        dark
                    >
                        Build Profile
                    </v-btn>
                    <v-overlay :value="submittingForm">
                        <v-progress-circular indeterminate size="64"></v-progress-circular>
                        <h5>
                            Building Profile 
                        </h5>
                    </v-overlay>
                    <v-alert
                        prominent
                        type="error"
                        v-show="noAvatar"
                        >
                            <v-row align="center">
                                <v-col class="grow">
                                    You Must Select An Avatar Image
                                </v-col>
                                <v-col class="shrink">
                                    <v-btn @click="noAvatar = false">Take action</v-btn>
                                </v-col>
                            </v-row>
                    </v-alert>
                </v-form>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import axios from 'axios';

export default({
    name: 'SignUp',
    data() {
        return {
            validated: false,
            noAvatar: false,
            username: '',
            usernameRe: /^\w+$/,
            alphaStartRe: /^[A-Za-z]+$/,
            emailRe: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            usernameRules: [
                v => !!v || "You Must Enter A Username!",
                v => v.length >= 6 || "Username Must Be At Least 6 Characters!",
                v => v.length <= 20 || "Username Cannot Be Greater Than 20 Characters!",
                v => this.usernameRe.test(v) || 'Username Can Only Container Letters Numbers And UnderScores!',
                v => this.alphaStartRe.test(v.slice(0, 1)) || 'Username Must Start With A Letter!',
            ],
            password: '',
            passwordRules: [
                v => !!v || "You Must Enter A Password!",
                v => v.length >= 6 || 'Password Must Be At Least 6 Characters!',
            ],
            firstName: '',
            firstNameRules: [
                v => !!v || "You Must Enter A First Name!",
            ],
            lastName: '',
            lastNameRules: [
                v => !!v || 'You Must Enter A Last Name!',
            ],
            email: '',
            emailRules: [
                v => !!v || 'Must Enter An Email Address!',
                v => (v.endsWith('iu.edu') || v.endsWith('alumni@iu.edu')) || 'Must Have A Valid IU Email Address!',
                v => this.emailRe.test(v) || 'Must Enter A Valid Email Format!',
            ],
            hometown: '',
            homeTownRules: [
                v => !!v || 'Must Enter A Hometown!',
            ],
            homeState: '',
            homeStateRules: [
                v => !!v || 'Must Enter Your Home State!',
            ],
            states: [
                'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Deleware', 'Florida', 'Georgia',
                'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 
                'Massachesetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
                'New Jersey', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
                'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
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
            schoolYear: '',
            schoolYears: [
                'Freshman', 'Sophomore', 'Junior', 'Senior', 'Victory Lap', 'Grad School',
            ],
            schoolYearRules: [
                v => !!v || "Please Select Your Year In School!",
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
            sorority: '',
            sororityList: [
                'Alpha Chi Omega', 'Alpha Delta Pi', 'Alpha Epsilon Phi', 'Alpha Gamma Delta', 'Alpha Kappa Alpha', 'Alpha Omicron Pi',
                'Alpha Phi', 'Alpha Sigma Alpha', 'Alpha Xi Delta', 'Chi Omega', 'Delta Delta Delta', 'Delta Gamma', 'Delta Phi Epsilon',
                'Delta Sigma Theta', 'Delta Zeta', 'Gamma Phi Beta', 'Kappa Alpha Theta', 'Kappa Delta', 'Kappa Kappa Gamma', 'Phi Mu',
                'Pi Beta Phi', 'Sigma Delta Tau', 'Sigma Gamma Rho', 'Sigma Kappa', 'Theta Phi Alpha', 'Zeta Phi Beta', 'Zeta Tau Alpha',
            ],
            instagramHandle: '',
            twitterHandle: '',
            youtubeChannel: '',
            sport: '',
            sportList: [
                'Football', 'Basketball', 'Baseball', 'Volleyball', 'Golf', 'Soccer', 'Swimming And Diving', 'Tennis', 'Wrestling',
                'Field Hockey', 'Rowing', 'Softball', 'Track And Field', 'Water Polo', 'Cross Country',
            ],
            avatarImg: null,
            themeColor: '',
            swatches: [
                        ['#DC143C', '#AA0000', '#550000', '#7D3C98'],
                        ['#0B5345', '#1A5276', '#4A235A', '#192841'],
                        ['#00FF00', '#00AA00', '#005500', '#BA4A00'],
                        ['#00FFFF', '#00AAAA', '#005555', '#95A5A6 '],
                        ['#0000FF', '#0000AA', '#000055', '#000000'],
                    ],
            bio: '',
            bioRules: [
                v => v.length > 10 || "Tell Us A Little More Than That!",
                v => v.length <= 300 || "Bio's Must Be Less Than 300 Characters!",
            ],
            btnDisable: false,
            submittingForm: false,
        }
    },
    methods: {
        noSpaces(event) {
            event.preventDefault();
            return false;
        },
        validateNewProfile() {
            if(this.$refs.form.validate()) {
                if(this.avatarImg) {
                    this.btnDisable = true;
                    this.submittingForm = true;

                    let fd = new FormData();
                    fd.append('username', this.username);
                    fd.append('password', this.password);
                    fd.append('firstName', this.firstName);
                    fd.append('lastName', this.lastName);
                    fd.append('email', this.email);
                    fd.append('hometown', this.hometown);
                    fd.append('homeState', this.homeState);
                    fd.append('major', this.major);
                    fd.append('interests', this.interests);
                    fd.append('fraternity', this.fraternity);
                    fd.append('sorority', this.sorority);
                    fd.append('schoolYear', this.schoolYear);
                    fd.append('twitterHandle', this.twitterHandle);
                    fd.append('instagramHandle', this.instagramHandle);
                    fd.append('youtubeChannel', this.youtubeChannel);
                    fd.append('sport', this.sport);
                    fd.append('bio', this.bio);
                    fd.append('avatar', this.avatarImg, 'avatar.jpg');
                    fd.append('profileTheme', this.themeColor);

                    return axios({
                        method: 'post',
                        data: fd,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        url: 'https://www.linkkup.com/createUser',
                    })
                    .then(response => {
                        if(response.data === 'username taken') {
                            this.$swal(
                                'Uh Oh',
                                'We Are Sorry, That Username Is Taken. Please Select Another!',
                                'error',
                            );
                            this.btnDisable = false;
                            this.submittingForm = false;
                        }
                        else {
                            this.$swal(
                                'Great!',
                                'You Have Successfully Created A linkkup Account!',
                                'success',
                            );
                            this.$store.commit('authenticatedUser');
                            this.$store.commit('updateUser', response.data.user);
                            this.$store.commit('updateUserPosts', []);
                            this.$router.push(`/profile/${response.data.user.username}`);
                            this.btnDisable = false;
                            this.submittingForm = false;
                        }
                    })
                    .catch(err => {
                        this.$swal(
                            'Uh Oh',
                            'There Was An Error Creating Your Account. Please Try Again!',
                            'error',
                        );
                        this.btnDisable = false;
                        this.submittingForm = false;
                    });
                }
                else {
                    this.$swal(
                        'Uh Oh',
                        'You Forgot To Add An Avatar Image For Your Profile!',
                        'error',
                    );
                }
            }
            else {
                this.$swal(
                    'Uh Oh',
                    'You Are Missing Some Required Fields Or Did Not Fill Out The Form Properly. Check It Again',
                    'error',
                );
            }
        },
    },
});
</script>