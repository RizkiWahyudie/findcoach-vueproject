<template>
    <div>
        <base-error @close="closeError" :open="dialogVisible">
            {{ errorMsg }}
        </base-error>
        <section>
            <base-div class="mb-6">
                <h3 class="text-lg font-semibold">Find your coach</h3>
                <div class="flex mt-2">
                    <div class="flex items-center mr-4">
                        <input checked id="frontend" @change="filterChecked" type="checkbox" class="w-4 h-4 text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label class="ml-2 text-sm font-medium text-gray-900 ">Frontend</label>
                    </div>
                    <div class="flex items-center mr-4">
                        <input checked id="backend" @change="filterChecked" type="checkbox" class="w-4 h-4 text-teal-600 bg-gray-100 rounded border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label class="ml-2 text-sm font-medium text-gray-900 ">Backend</label>
                    </div>
                    <div class="flex items-center mr-4">
                        <input checked id="career" @change="filterChecked" type="checkbox" class="w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label class="ml-2 text-sm font-medium text-gray-900 ">Career</label>
                    </div>
                </div>
            </base-div>
        </section>
        <section>
            <base-div class="mb-10">
                <div class="flex flex-row justify-between items-center">
                    <button @click="getCoaches" class="text-gray-900 bg-white hover:bg-slate-50 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-slate-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2">
                        <svg class="w-6 h-5 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="rgb(126, 34, 206)" d="M21,11a1,1,0,0,0-1,1,8.05,8.05,0,1,1-2.22-5.5h-2.4a1,1,0,0,0,0,2h4.53a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4.77A10,10,0,1,0,22,12,1,1,0,0,0,21,11Z"/></svg>
                        Refresh
                    </button>
                    <router-link v-if="!isLogin" to="/auth?redirect=register" class="flex focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5">
                        <svg class="w-6 h-5 mr-1 -ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="rgb(250, 250, 250)" d="M13,14H9a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2ZM17,4H15.82A3,3,0,0,0,13,2H11A3,3,0,0,0,8.18,4H7A3,3,0,0,0,4,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V7A3,3,0,0,0,17,4ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm8,14a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V7A1,1,0,0,1,7,6H8V7A1,1,0,0,0,9,8h6a1,1,0,0,0,1-1V6h1a1,1,0,0,1,1,1Zm-3-9H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z"/></svg>
                        Must Login
                    </router-link>
                    <router-link v-else-if="isLogin && !filterCoach" to="/register" class="flex focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5">
                        <svg class="w-6 h-5 mr-1 -ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="rgb(250, 250, 250)" d="M13,14H9a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2ZM17,4H15.82A3,3,0,0,0,13,2H11A3,3,0,0,0,8.18,4H7A3,3,0,0,0,4,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V7A3,3,0,0,0,17,4ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm8,14a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V7A1,1,0,0,1,7,6H8V7A1,1,0,0,0,9,8h6a1,1,0,0,0,1-1V6h1a1,1,0,0,1,1,1Zm-3-9H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z"/></svg>
                        Register a Coach
                    </router-link>
                    <button type="button" v-else-if="isLogin && filterCoach" class="flex focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5">
                        Hallo Coach {{ filterCoach.firstName }}👋🏻
                    </button>
                </div>
                <!-- <p v-if="!!errorMsg">{{ errorMsg }}</p> -->
                <p v-if="dummy" class="ml-1 text-gray-500 text-xs mt-1">This is file dummy, Please click button <span class="text-purple-700 font-semibold">Refresh</span> for see data from database</p>
                <base-spinner v-if="isLoading" class="mt-6"></base-spinner>
                <ul v-else-if="emptyCoaches">
                    <base-item 
                        v-for="coach in filterCoaches"
                        :key="coach.id"
                        :id="coach.id"
                        :first-name="coach.firstName"
                        :last-name="coach.lastName"
                        :areas="coach.areas"
                        :description="coach.description"
                        :hourly-rate="coach.hourlyRate"
                    ></base-item>
                </ul>
                <div v-else class="flex flex-wrap justify-center my-4">
                    <img class="w-1/4" src="../assets/no-results-found.png" alt="">
                    <h3 class="w-full text-center font-semibold text-lg">Coaches NotFound</h3>
                </div>
            </base-div>
        </section>
    </div>
</template>

<script>
import BaseItem from '../base/BaseItem.vue';

export default {
    components: {
        BaseItem
    },
    data() {
        return {
            dialogVisible: false,
            isLoading: false,
            dummy: true,
            filter:
            {
                frontend: true,
                backend: true,
                career: true,
            },
            errorMsg: null,
            coachesFilter: []
        }
    },
    computed: {
        // FILTERING
        filterCoaches() {
            const coaches = this.$store.getters['coaches/coaches'];
            // Jika pengkondisian dibawah true setiap ifnya maka dikirimkan data kedalam filternya lalu di looping untuk ditampilkan
            // jika yang dicheked hanya backend artinya hanya backend yang bernilai true maka data coaches yang ada backednya dikirim ke looping
            return coaches.filter(coach => {
                // filter berfungsi untuk mencari data didalam array berdasarkan yang dicari
                // includes adalah boolean yang menyatakan apakah kata atau karakter yang kita cari terdapat dalam string tersebut atau tidak.
                // jika data filter frontendnya true sesuai dengan areas frontend maka return true
                if(this.filter.frontend && coach.areas.includes('frontend')) {
                    return true;
                }
                // jika data filter backendnya true sesuai dengan areas backend maka return true
                if(this.filter.backend && coach.areas.includes('backend')) {
                    return true;
                }
                // jika data filter careernya true sesuai dengan areas career maka return true
                if(this.filter.career && coach.areas.includes('career')) {
                    return true;
                }
                return false
            })
        },
        emptyCoaches() {
            return !this.isLoading && this.$store.getters['coaches/hasCoaches']
        },
        isLogin() {
            // gapake namespace jadi global
            return this.$store.getters.isAuthenticated;
        },
        coachId() {
            return this.$store.getters['coaches/coaches'];
        },
        userId() {
            return this.$store.getters.userId;
        },
        filterCoach() {
            return this.coachId.find(coaches => coaches.id === this.userId);
        },
    },
    created() {
        this.getCoaches();
    },
    methods: {
        // FILTERING
        filterChecked(e) {
            // mengambil nama id nya seperti frontend backend career
            const inputId = e.target.id;
            // console.log(inputId);
            // mengambil nilai true false checked kalo checked true
            const isActive = e.target.checked;
            // console.log(isActive);
            const updateFilter = {
                // copy paste data filter dengan spread ...
                ...this.filter,
                // jadi sama kaya data filter diatas
                // frontend: true
                // nah kurang lebih kaya gitu
                [inputId]: isActive
            };
            this.filter = updateFilter;
        },
        async getCoaches() {
            this.isLoading = true
            this.dummy = false
            try {
                await this.$store.dispatch('coaches/getCoaches');
            } catch (error) {
                this.errorMsg = error.message || 'Failed to fetch data!'
                this.dialogVisible = true
                setTimeout(() => {
                    this.dialogVisible = false
                }, 2000)
            }
            this.isLoading = false;
        },
        closeError() {
            this.dialogVisible = false
        },
    }
}
</script>