<template>
    <div>
        <base-error @close="closeError" :open="dialogVisible">
            {{ errorMsg }}
        </base-error>
        <base-success @close="closeSuccess" :open="successVisible">
            {{ successMsg }}
        </base-success>
        <base-div class="mb-12">
            <h3 class="text-2xl font-semibold mb-3"><span class="text-purple-700">Register</span> as a coach Now!</h3>
            <form @submit.prevent="submitForm">
                <div class="grid gap-6 lg:grid-cols-2 mb-3">
                    <div>
                        <label :class="firstName.state ? labelAlternative : invalidLabel">First Name</label>
                        <input @blur="clearValidity('firstName')" v-model.trim="firstName.val" type="text" :class="firstName.state ? inputAlternative : invalidInput" placeholder="Enter your first name">
                        <p v-if="!firstName.state" :class="invalidInfo">{{ firstName.ket }}</p>
                    </div>
                    <div>
                        <label :class="lastName.state ? labelAlternative : invalidLabel">Last Name</label>
                        <input @blur="clearValidity('lastName')" v-model.trim="lastName.val" type="text" :class="lastName.state ? inputAlternative : invalidInput" placeholder="Enter your last name">
                        <p v-if="!lastName.state" :class="invalidInfo">{{ lastName.ket }}</p>
                    </div>
                </div>
                <div class="mb-3">
                    <label :class="desc.state ? labelAlternative : invalidLabel">Description</label>
                    <textarea @blur="clearValidity('desc')" v-model.trim="desc.val" rows="4" :class="desc.state ? textArea : invalidTextArea" placeholder="Your Description..."></textarea>
                    <p v-if="!desc.state" :class="invalidInfo">{{ desc.ket }}</p>
                </div>
                <div class="mb-4">
                    <label :class="rate.state ? labelAlternative : invalidLabel">Hourly Rate</label>
                    <input @blur="clearNumber('rate')" v-model.number="rate.val" type="number" :class="rate.state ? inputAlternative : invalidInput" placeholder="Enter your hourly rate">
                    <p v-if="!rate.state" :class="invalidInfo">{{ rate.ket }}</p>
                </div>
                <div>
                    <label :class="areas.state ? labelAlternative : invalidLabel">Areas of Expertise</label>
                </div>
                <div class="flex items-center mr-4 mb-1">
                    <input @blur="clearChecked" v-model="areas.val" value="frontend" checked type="checkbox" :class="inputHalf">
                    <label :class="areas.state ? labelHalf : invalidChecked">Frontend Development</label>
                </div>
                <div class="flex items-center mr-4 mb-1">
                    <input @blur="clearChecked" v-model="areas.val" value="backend" checked type="checkbox" :class="inputHalf">
                    <label :class="areas.state ? labelHalf : invalidChecked">Backend Development</label>
                </div>
                <div class="flex items-center mr-4 mb-1">
                    <input @blur="clearChecked" v-model="areas.val" value="career" checked type="checkbox" :class="inputHalf">
                    <label :class="areas.state ? labelHalf : invalidChecked">Career Advisory</label>
                </div>
                <button type="submit" :class="submitClass">Submit</button>
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
            firstName: {
                val: '',
                state: true,
                ket: 'Oops! Please input your first name'
            },
            lastName: {
                val: '',
                state: true,
                ket: 'Oops! Please input your last name'
            },
            desc: {
                val: '',
                state: true,
                ket: 'Oops! Please input your description'
            },
            rate: {
                val: null,
                state: true,
                ket: 'Oops! Please input hourly rate'
            },
            areas: {
                val: [],
                state: true
            },
            isValid: true
        }
    },
    methods: {
        validityForm() {
            this.isValid = true
            if(this.firstName.val === '') {
                this.firstName.state = false;
                this.isValid = false
            }
            if(this.lastName.val === '') {
                this.lastName.state = false;
                this.isValid = false
            }
            if(this.desc.val === '') {
                this.desc.state = false;
                this.isValid = false
            }
            if(!this.rate.val || this.rate.val < 0) {
                this.rate.state = false;
                this.isValid = false
            }
            if(this.areas.val.length === 0) {
                this.areas.state = false;
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
        clearNumber(input) {
            if(!this[input].val || this[input].val < 0) {
                this[input].state = false;
            } else {
                this[input].state = true;
            }
        },
        clearChecked() {
            if(this.areas.val.length === 0) {
                this.areas.state = false;
            } else {
                this.areas.state = true;
            }
        },
        async submitForm() {
            this.validityForm();
            if(this.isValid === false) {
                return;
            }
            try {
                const form = {
                first: this.firstName.val,
                last: this.lastName.val,
                desc: this.desc.val,
                rate: this.rate.val,
                areas: this.areas.val
                }
                // console.log(form)
                await this.$store.dispatch('coaches/regisCoach', form);
                // replace untuk menavigasikan link namun tidak bisa kembali ke form karena di replace
                this.successMsg = 'Success Regis New Coach, Congrats!'
                this.successVisible = true
                setTimeout(() => {
                    this.successVisible = false,
                    this.$router.replace('/coaches');
                }, 2500)
                // this.firstName= '';
                // this.lastName= '';
                // this.desc= '';
                // this.rate= null;
                // this.areas= [];
            } catch (error) {
                // this.errorMsg = error.message || 'Failed to fetch data!'
                this.errorMsg = 'OOPS! Failed Regis New Coach, Database error!'
                this.dialogVisible = true
                setTimeout(() => {
                    this.dialogVisible = false,
                    console.log(error.message),
                    this.$router.replace('/coaches');
                }, 3500)
            }
            this.isLoading = false;
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
        inputHalf() {
            return 'ml-1 w-4 h-4 text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500'
        },
        labelHalf() {
            return 'ml-2 text-sm font-normal text-slate-500'
        },
        submitClass() {
            return 'text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto mt-3 px-5 py-2.5 text-center'
        },
        invalidInput() {
            return 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5'
        },
        invalidLabel() {
            return 'block mb-2 text-sm font-medium text-red-700 dark:text-red-500'
        },
        invalidChecked() {
            return 'ml-2 text-sm font-normal text-red-500'
        },
        invalidInfo() {
            return 'mt-2 text-sm text-red-600 dark:text-red-500'
        },
        invalidTextArea() {
            return 'block p-2.5 w-full text-sm text-red-900 placeholder-red-700 bg-red-50 rounded-lg border border-red-500 focus:ring-red-500 focus:border-red-500'
        }
    }
}
</script>