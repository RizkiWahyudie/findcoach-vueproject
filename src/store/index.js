import { createStore } from 'vuex'
import coachesModules from './coaches/coaches.js';
import requests from './requests/requests.js';
import authentication from './auth/auth.js';

const store = createStore({
    modules: {
        coaches: coachesModules,
        request: requests,
        auth: authentication
    },
    state() {
        return {
        }
    },
})

export default store;