<template>
    <router-view name="nav"></router-view>
    <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
            <component :is="slotProps.Component"></component>
        </transition>
    </router-view>
</template>

<script>
export default {
    created() {
        this.$store.dispatch('autoLogin');
        // console.log(this.setLogout);
    },
    computed: {
        setLogout() {
            return this.$store.getters.setLogout;
        }
    },
    watch: {
        setLogout() {
            if(this.setLogout === true) {
                // ...
                this.$router.replace('/coaches');
                // console.log(this.setLogout);
            } 
            // else {
            //     console.log(this.setLogout);
            // }
        }
    }
}
</script>