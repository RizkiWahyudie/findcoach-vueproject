<template>
    <div>
        <base-error @close="closeError" :open="dialogVisible">
            {{ errorMsg }}
        </base-error>
        <base-success @close="closeSuccess" :open="successVisible">
            {{ successMsg }}
        </base-success>
        <base-div class="mb-4">
            <h3 class="text-2xl font-semibold mb-3"><span class="text-purple-700">Send</span> message</h3>
            <form @submit.prevent="submitForm">
                <div class="grid gap-6 lg:grid-cols-2">
                    <div class="-mb-3 lg:mb-3">
                        <label :class="name.state ? labelAlternative : invalidLabel">Name</label>
                        <input @blur="clearValidity('name')" v-model.trim="name.val" type="text" :class="name.state ? inputAlternative : invalidInput" placeholder="Enter your name">
                        <p v-if="!name.state" :class="invalidInfo">{{ name.ket }}</p>
                    </div>
                    <div class="mb-3">
                        <label :class="email.state ? labelAlternative : invalidLabel">Email</label>
                        <input @blur="clearValidity('email')" v-model.trim="email.val" type="email" :class="email.state ? inputAlternative : invalidInput" placeholder="Enter your email">
                        <p v-if="!email.state" :class="invalidInfo">{{ email.ket }}</p>
                    </div>
                </div>
                <div class="mb-3">
                    <label :class="message.state ? labelAlternative : invalidLabel">Message</label>
                    <textarea @blur="clearValidity('message')" v-model.trim="message.val" rows="4" :class="message.state ? textArea : invalidTextArea" placeholder="Your message..."></textarea>
                    <p v-if="!message.state" :class="invalidInfo">{{ message.ket }}</p>
                </div>
                <button type="submit" :class="submitClass">
                    <svg class="w-6 h-5 mr-1 -ml-1 fill-white" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>telegram</title><path :d="svgBtn"/></svg>
                    Send
                </button>
            </form>
        </base-div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            successVisible: false,
            dialogVisible: false,
            errorMsg: null,
            successMsg: null,
            name: {
                val: '',
                state: true,
                ket: 'Oops! Please input your name'
            },
            email: {
                val: '',
                state: true,
                ket: 'Oops! Please input your email'
            },
            message: {
                val: '',
                state: true,
                ket: 'Oops! Please input your message'
            },
            isValid: true
        }
    },
    methods: {
        validityForm() {
            this.isValid = true
            if(this.name.val === '') {
                this.name.state = false;
                this.isValid = false
            }
            if(this.email.val === '') {
                this.email.state = false;
                this.isValid = false
            }
            if(this.message.val === '') {
                this.message.state = false;
                this.isValid = false
            }
        },
        clearValidity(input) {
            if(this[input].val === '') {
                this[input].state = false
            } else {
                this[input].state = true
            }
        },
        async submitForm() {
            this.validityForm();
            if(this.isValid === false) {
                return;
            }
            try {
                const time = new Date().toLocaleTimeString();
                const date = new Date().toLocaleDateString();
                const form = {
                    name: this.name.val,
                    email: this.email.val,
                    message: this.message.val,
                    // id coach diambil dari URL path dynamic pada router CoachDetail.vue
                    coachId: this.$route.params.id,
                    watch: time + ' ' + date
                }
                // console.log(form)
                await this.$store.dispatch('request/sendMsg', form);
                this.successMsg = 'Yeay, your message Success!'
                this.successVisible = true
                setTimeout(() => {
                    this.successVisible = false,
                    // replace untuk menavigasikan link namun tidak bisa kembali ke form karena di replace
                    this.$router.replace('/coaches');
                }, 2500)
                // this.name= '';
                // this.email= '';
                // this.message= '';
            } catch (error) {
                this.errorMsg = 'OOPS! Failed sending your message, Database error!'
                this.dialogVisible = true
                setTimeout(() => {
                    this.dialogVisible = false,
                    console.log(error.message),
                    this.$router.replace('/coaches');
                }, 3500)
            }
        },
        closeError() {
            this.dialogVisible = false
        },
        closeSuccess() {
            this.successVisible = false
        },
    },
    computed: {
        labelAlternative() {
            return 'block mb-2 text-sm font-medium text-gray-900'
        },
        inputAlternative() {
            return 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5'
        },
        textArea() {
            return 'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500'
        },
        submitClass() {
            return 'flex justify-center text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto mt-3 px-5 py-2.5 text-center'
        },
        invalidInput() {
            return 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5'
        },
        invalidLabel() {
            return 'block mb-2 text-sm font-medium text-red-700 dark:text-red-500'
        },
        invalidInfo() {
            return 'mt-2 text-sm text-red-600 dark:text-red-500'
        },
        invalidTextArea() {
            return 'block p-2.5 w-full text-sm text-red-900 placeholder-red-700 bg-red-50 rounded-lg border border-red-500 focus:ring-red-500 focus:border-red-500'
        },
        svgBtn () {
            return 'M22.26465,2.42773a2.04837,2.04837,0,0,0-2.07813-.32421L2.26562,9.33887a2.043,2.043,0,0,0,.1045,3.81836l3.625,1.26074,2.0205,6.68164A.998.998,0,0,0,8.134,21.352c.00775.012.01868.02093.02692.03259a.98844.98844,0,0,0,.21143.21576c.02307.01758.04516.03406.06982.04968a.98592.98592,0,0,0,.31073.13611l.01184.001.00671.00287a1.02183,1.02183,0,0,0,.20215.02051c.00653,0,.01233-.00312.0188-.00324a.99255.99255,0,0,0,.30109-.05231c.02258-.00769.04193-.02056.06384-.02984a.9931.9931,0,0,0,.20429-.11456,250.75993,250.75993,0,0,1,.15222-.12818L12.416,18.499l4.03027,3.12207a2.02322,2.02322,0,0,0,1.24121.42676A2.05413,2.05413,0,0,0,19.69531,20.415L22.958,4.39844A2.02966,2.02966,0,0,0,22.26465,2.42773ZM9.37012,14.73633a.99357.99357,0,0,0-.27246.50586l-.30951,1.504-.78406-2.59307,4.06525-2.11695ZM17.67188,20.04l-4.7627-3.68945a1.00134,1.00134,0,0,0-1.35352.11914l-.86541.9552.30584-1.48645,7.083-7.083a.99975.99975,0,0,0-1.16894-1.59375L6.74487,12.55432,3.02051,11.19141,20.999,3.999Z'
        }
    }
}
</script>