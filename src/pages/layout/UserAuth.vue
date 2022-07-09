<template>
    <div>
        <base-error @close="closeError" :open="dialogVisible">
            {{ error }}
        </base-error>
        <base-success @close="closeSuccess" :open="successVisible">
            {{ successMsg }}
        </base-success>
        <base-success @close="closeSignup" :open="successSignup">
            {{ signupMsg }}
        </base-success>
        <div class="absolute top-3 left-2 flex items-center">
            <img src="https://image3.mouthshut.com/images/imagesp/925739273s.png" class="rounded-full w-8" alt="">
            <span class="block ml-2 font-semibold text-purple-900">FindCoach</span>
        </div>
        <div class="min-h-screen">
            <div class="flex items-center bg-white min-h-screen">
                <div class="flex-1 bg-login min-h-screen hidden md:flex items-center">
                    <img src="../assets/login.webp" alt="">
                </div>
                <div class="flex-1">
                    <form class="form-login" @submit.prevent="submitAuth">
                        <h3 class="text-2xl text-center mb-8 font-semibold font-serif text-purple-900">Get Started <span class="block">your dream as a coach Now!</span></h3>
                        <div class="mb-4">
                            <label :class="email.state ? labelAlternative : invalidLabel">Email</label>
                            <input @blur="clearValidity('email')" v-model.trim="email.val" type="text" :class="email.state ? inputAlternative : invalidInput" placeholder="Input your email">
                            <p v-if="!email.state" :class="invalidInfo">{{ email.ket }}</p>
                        </div>
                        <div class="mb-6">
                            <label :class="password.state ? labelAlternative : invalidLabel">Password</label>
                            <input @blur="clearValidity('password')" v-model.trim="password.val" type="text" :class="password.state ? inputAlternative : invalidInput" placeholder="*****">
                            <p v-if="!password.state" :class="invalidInfo">{{ password.ket }}</p>
                        </div>
                        <div class="flex justify-center">
                            <button type="submit" class="mr-2 flex-1 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                                <div v-if="isLoading">
                                    <svg role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                    </svg> Loading ...
                                </div>
                                <h3 v-else>{{submitBtn}}</h3>
                            </button>
                            <button @click="switchAuthMode" type="button" class="text-purple-700 border border-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                {{switchBtn}} Instead
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: {
                val: '',
                state: true,
                ket: ''
            },
            password: {
                val: '',
                state: true,
                ket: 'Oops! Please input password'
            },
            isValid: true,
            mode: 'login',
            // spinner loading login page
            isLoading: false,
            // error hndling
            error: null,
            // error alert
            dialogVisible: false,
            // success alert
            successVisible: false,
            successMsg: null,
            successSignup: false,
            signupMsg: null,
        }
    },
    methods: {
        validityForm() {
            this.isValid = true
            if(this.email.val === '') {
                this.email.state = false;
                this.isValid = false;
                this.email.ket = 'Oops! Please input email';
            } else if(!this.email.val.includes('@')) {
                this.email.state = false;
                this.isValid = false;
                this.email.ket = 'Oops! Please added @ for your email!'
            }
            if(this.password.val === '') {
                this.password.state = false;
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
        async submitAuth() {
            this.validityForm();
            if(this.isValid === false) {
                return
            }
            this.isLoading = true;
            const dataForm = {
                email: this.email.val,
                password: this.password.val
            }
            const regist = '/' + (this.$route.query.redirect || 'coaches')
            try {
                if(this.mode === 'login') {
                    await this.$store.dispatch('login', dataForm);
                    // this.$router.push('/');
                    this.successMsg = 'Yeay, success login!'
                    this.successVisible = true
                    setTimeout(() => {
                        this.successVisible = false,
                        // replace untuk menavigasikan link namun tidak bisa kembali ke form karena di replace
                        this.$router.replace(regist);
                    }, 2500)
                } else {
                    await this.$store.dispatch('signup', dataForm);
                    this.signupMsg = 'Yeay, success create account!'
                    this.successSignup = true
                    setTimeout(() => {
                        this.successSignup = false;
                    }, 2500)
                    this.mode = 'login'
                }
            } catch (error) {
                this.error = error.message
                this.dialogVisible = true
                setTimeout(() => {
                    this.dialogVisible = false
                }, 4000)
            }
            this.isLoading = false
        },
        switchAuthMode() {
            if(this.mode === 'login') {
                this.mode = 'signup'
            } else {
                this.mode = 'login'
            }
        },
        closeError() {
            this.dialogVisible = false
        },
        closeSuccess() {
            this.successVisible = false
        },
        closeSignup() {
            this.successSignup = false
        },
    },
    computed: {
        submitBtn() {
            if(this.mode === 'login') {
                return 'Login'
            } else {
                return 'Signup'
            }
        },
        switchBtn() {
            if(this.mode === 'login') {
                return 'Signup'
            } else {
                return 'Login'
            }
        },
        labelAlternative() {
            return 'block mb-2 text-sm font-medium text-gray-900'
        },
        inputAlternative() {
            return 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5'
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
    }
}
</script>