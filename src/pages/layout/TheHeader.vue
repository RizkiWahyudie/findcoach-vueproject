<template>
    <header class="nav-header">
        <nav class="nav">
            <div class="nav-flex">
                <a href="/" class="flex items-center">
                    <img src="https://image3.mouthshut.com/images/imagesp/925739273s.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo">
                    <span class="nav-textLogo">FindCoach</span>
                </a>
                <button @click="btnClick" type="button" class="nav-mobile" aria-controls="mobile-menu" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
                <div class="w-full md:block md:w-auto" :class="{'hidden' : navBtn}">
                    <ul class="nav-ul">
                        <li>
                            <router-link to="/coaches" class="nav-nonActive" active-class="nav-active">All coach</router-link>
                        </li>
                        <li v-if="isLogin">
                            <router-link to="/requests" class="nav-nonActive" active-class="nav-active">Requests</router-link>
                        </li>
                        <li v-if="isLogin">
                            <button type="button" @click="isLogout" class="nav-nonActive" active-class="nav-active">Logout</button>
                        </li>
                        <li v-else>
                            <router-link to="/auth" class="nav-nonActive" active-class="nav-active">Login</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    data() {
        return {
            navBtn: true
        }
    },
    computed: {
        isLogin() {
            // gapake namespace jadi global
            return this.$store.getters.isAuthenticated;
        },
    },
    methods: {
        isLogout() {
            this.$store.dispatch('logout');
            this.$router.replace('/coaches');
        },
        btnClick() {
            this.navBtn = !this.navBtn
        }
    }
}
</script>