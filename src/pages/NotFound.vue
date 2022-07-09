<template>
    <div class="min-h-screen flex items-center -mt-20">
        <div class="max-w-full mx-3 sm:mx-4 md:max-w-2xl lg:max-w-4xl md:mx-auto p-4">
            <img src="./assets/errorPage.webp" alt="" class="max-w-full sm:max-w-xl mx-auto flex-auto">
            <div class="text-center">
                <h3 class="font-mono font-bold text-2xl text-gray-700">OOPSY... PAGE NOT FOUND</h3>
                <span class="block mb-6 text-sm font-medium text-gray-400">We suggest you go to homepage while we fixing the problem🧐</span>
                <router-link to='/' class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5">
                    Back to Home
                </router-link>
            </div>
        </div>
    </div>
</template>