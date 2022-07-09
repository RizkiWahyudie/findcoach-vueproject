<template>
    <div class="mb-10">
        <base-error @close="closeError" :open="dialogVisible">
            {{ errorMsg }}
        </base-error>
        <base-div>
            <h3 class="text-purple-700 text-center italic text-xl font-medium">Requests Receive</h3>
            <base-spinner v-if="isLoading" class="mt-6"></base-spinner>
            <div v-else-if="message && message.length > 0">
                <base-message
                    v-for="msg in filterMsg"
                    :key="msg.id"
                    :name="msg.name"
                    :email="msg.email"
                    :message="msg.message"
                    :time="msg.time"
                    :coaches="msg.coachId"
                ></base-message>
            </div>
            <div v-else class="flex flex-wrap justify-center my-4">
                <img class="w-1/4" src="../assets/no-results-found.png" alt="">
                <h3 class="w-full text-center font-semibold text-lg">Haven't made a request yet</h3>
            </div>
        </base-div>
    </div>
</template>

<script>
import BaseMessage from '../base/BaseMessage.vue'

export default {
    data() {
        return {
            dialogVisible: false,
            isLoading: false,
            dummy: true,
            errorMsg: null
        }
    },
    components: {
        BaseMessage
    },
    computed: {
        message() {
            return this.$store.getters['request/requests'];
        },
        userId() {
            return this.$store.getters.userId;
        },
        filterMsg() {
            return this.message.filter(msg => msg.coachId === this.userId);
        },
    },
    created() {
        this.getMessage();
    },
    methods: {
        async getMessage() {
            this.isLoading = true
            this.dummy = false
            try {
                await this.$store.dispatch('request/getMessage');
            } catch (error) {
                this.errorMsg = error.message || 'Failed to fetch data!'
                this.dialogVisible = true
                setTimeout(() => {
                    this.dialogVisible = false
                }, 3500)
            }
            this.isLoading = false;
        },
        closeError() {
            this.dialogVisible = false
        },
    }
}
</script>