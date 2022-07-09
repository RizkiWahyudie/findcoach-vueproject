<template>
    <div>
        <div class="border rounded-lg p-4 my-4">
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold">{{ name }}</h3>
                <span class="text-xs text-purple-600 font-semibold">{{time}}</span>
            </div>
            <a :href="'mailto:' + email" class="text-xs text-gray-400 mb-2 hover:text-purple-600">{{email}}</a>
            <div>
                <span class="text-xs text-gray-400 italic">Message :</span>
                <p>{{message}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['name', 'email', 'message', 'time', 'coaches'],
}
</script>