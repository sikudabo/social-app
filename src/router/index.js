import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home';
import Contact from '../components/Contact';
import Practice from '../components/Practice';
import SignUp from '../components/SignUp';
import ProfilePage from '../components/ProfilePage';
import Comment from '../components/Comment';
import SearchUsers from '../components/SearchUsers';
import MixcitiProfile from '../components/MixcitiProfile';
import FindFollowers from '../components/FindFollowers';
import FindFollowing from '../components/FindFollowing';
import BuildCommunity from '../components/BuildCommunity';
import CommunityPage from '../components/CommunityPage';
import SearchCommunities from '../components/SearchCommunities';
import CommunityChat from '../components/CommunityChat';
import Messages from '../components/Messages';
import Thread from '../components/Thread';
import CreateEvent from '../components/CreateEvent';
import Events from '../components/Events';
import AttendingEvent from '../components/AttendingEvent';
import UserSettings from '../components/UserSettings';
import Feed from '../components/Feed';
import ForgotCredentials from '../components/ForgotCredentials';
import About from '../components/About';
import Music from '../components/Music';
import Song from '../components/Song';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
    },
    {
      path: '/practice',
      name: 'Practice',
      component: Practice,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/profile/:user',
      name: 'ProfilePage',
      component: ProfilePage,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/comments/:uniquepostid',
      name: 'Comment',
      component: Comment,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/search/users',
      name: 'SearchUsers',
      component: SearchUsers,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/linkkup/profile/:username',
      name: 'MixcitiProfile',
      component: MixcitiProfile,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/find/followers/:username',
      name: 'FindFollowers',
      component: FindFollowers,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/find/following/:username',
      name: 'FindFollowing',
      component: FindFollowing,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/linkkup/build/community',
      name: 'BuildCommunity',
      component: BuildCommunity,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/linkkup/community/:community',
      name: 'CommunityPage',
      component: CommunityPage,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/search/communities',
      name: 'SearchCommunities',
      component: SearchCommunities,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/linkkup/community/chat/:name',
      name: 'CommunityChat',
      component: CommunityChat,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/linkkup/messages',
      name: 'Messages',
      component: Messages,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/linkkup/messages/thread/:threadid',
      name: 'Thread',
      component: Thread,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/linkkup/create/event',
      name: 'CreateEvent',
      component: CreateEvent,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/linkkup/events',
      name: 'Events',
      component: Events,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/linkkup/event/attending/:event',
      name: 'AttendingEvent',
      component: AttendingEvent,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/linkkup/user/settings',
      name: 'UserSettings',
      component: UserSettings,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/linkkup/feed',
      name: 'Feed',
      component: Feed,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/forgot/credentials',
      name: 'ForgotCredentials',
      component: ForgotCredentials,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/linkkup/about',
      name: 'About',
      component: About,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/linkkup/music',
      name: 'Music',
      component: Music,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/linkkup/song/:id',
      name: 'Song',
      component: Song,
      meta: {
        requireAuth: true,
      },
    },
  ],
});