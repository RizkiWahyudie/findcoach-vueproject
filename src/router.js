import { createRouter, createWebHistory } from "vue-router";

import TheHeader from './pages/layout/TheHeader.vue';
import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachList from './pages/coaches/CoachList.vue';
import CoachRegis from './pages/coaches/CoachRegis.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestReceive from './pages/requests/RequestReceive.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/layout/UserAuth.vue';
import store from './store/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', components: {default: CoachList, nav: TheHeader} },
        // isi parameter link disimpan diprops dan diteruskan ke component
        { path: '/coaches/:id', components: {default: CoachDetail, nav: TheHeader}, props: true,
            children: [
                { path: 'contact', component: ContactCoach }
            ]
        },
        { path: '/register', components: {default: CoachRegis, nav: TheHeader}, meta: { requireAuth: true } },
        { path: '/requests', components: {default: RequestReceive, nav: TheHeader}, meta: { requireAuth: true } },
        { path: '/auth', component: UserAuth, meta: { requireIfDoneLoginBlockPageLogin: true } },
        { path: '/:notFound(.*)', components: {default: NotFound, nav: TheHeader} }
    ],
    linkActiveClass: 'active'
})

router.beforeEach((to, _, next) => {
    // to : merupakan tujuan URL kemana
    // from : merupakan asal URL sebelumnya darimana
    // Next mengizinkan atau tidak nya akses ke URL selanjutnya
    
    // Apabila route yang dituju itu true dan status belum login (belum mendapatkan token) maka route nya harus ke /auth
    if(to.meta.requireAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if(to.meta.requireIfDoneLoginBlockPageLogin && store.getters.isAuthenticated) {
        next('/coaches');
    } else {
        next();
    }
})

export default router;