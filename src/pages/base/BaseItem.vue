<template>
    <div class="border rounded-lg p-4 my-4">
        <h3 class="text-2xl font-semibold">{{ fullname }}</h3>
        <p class="text-sm text-green-600 font-semibold mb-4">${{ hourlyRate }}/hour</p>
        <div class="uppercase flex flex-wrap">
            <span class="rounded-3xl text-sm px-5 pt-2 pb-3 mr-2 text-white font-semibold mb-2"
                v-for="area in areas"
                :key="area"
                :class="{'frontend': area === 'frontend', 'backend': area === 'backend', 'career': area === 'career'}"
            >{{ area }}</span>
        </div>
        <div class="flex justify-center md:justify-between">
            <div></div>
            <div class="mt-4 md:mt-0 inline-flex rounded-md shadow-sm" role="group">
                <router-link :to="chatCoaches" class="flex py-2 px-4 text-sm font-medium text-pink-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-pink-700 focus:z-10 focus:ring-2 focus:ring-pink-700 focus:text-pink-700">
                    <svg class="w-6 h-5 mr-1 -ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="rgb(190, 24, 93)" d="M17,9H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Zm-4,4H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Z"/></svg>
                    Chat Coach
                </router-link>
                <router-link :to="detailCoaches" class="flex py-2 px-4 text-sm font-medium text-blue-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                    <svg class="w-6 h-5 mr-1 -ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="rgb(29, 78, 216)" d="M12,11a1,1,0,0,0-1,1v3a1,1,0,0,0,2,0V12A1,1,0,0,0,12,11Zm0-3a1,1,0,1,0,1,1A1,1,0,0,0,12,8Zm0-6A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,.3-.71,1,1,0,0,0-.3-.7A8,8,0,1,1,12,20Z"/></svg>
                    Details
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['id', 'firstName', 'lastName', 'areas', 'description', 'hourlyRate'],
    computed: {
        fullname() {
            return this.firstName + ' ' + this.lastName;
        },
        chatCoaches() {
            // return '/coaches/' + this.id + '/contact';
            return this.$route.path + '/' + this.id + '/contact';
        },
        detailCoaches() {
            return '/coaches/' + this.id;
        }
    }
}
</script>