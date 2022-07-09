export default {
    namespaced: true,
    state() {
        return {
            coaches: [
                // {
                //     id: 'c1',
                //     firstName: 'Maximilian',
                //     lastName: 'Schwarzmüller',
                //     areas: ['frontend', 'backend', 'career'],
                //     description:
                //         "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                //     hourlyRate: 30
                // },
                // {
                //     id: 'c2',
                //     firstName: 'Rizki',
                //     lastName: 'Wahyudie',
                //     areas: ['frontend', 'career'],
                //     description:
                //         'I am Rizki and as a junior developer in a big tech company, I can help you get your first job or progress in your current role.',
                //     hourlyRate: 50
                // }
            ]
        }
    },
    mutations: {
        regisCoach(state, payload) {
            state.coaches.unshift(payload);
        },
        setCoaches(state, payload) {
            state.coaches = payload;
        }
    },
    actions: {
        async regisCoach(context, data) {
            const userId = context.rootGetters.userId;
            const coachData = {
                id: userId,
                firstName: data.first,
                lastName: data.last,
                description: data.desc,
                areas: data.areas,
                hourlyRate: data.rate
            }
            // token untuk mengakses fitur regis coach apabila sudah login mendapatkan tokennya
            const token = context.rootGetters.token;
            const response = await fetch(`https://findcoach-projectvue-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json?auth=` + token, {
                method: 'POST',
                body: JSON.stringify(coachData)
            })
            const responseData = await response.json();
            if(!response.ok) {
                // error ...
                const error = new Error(responseData.message);
                throw error;
            }
            context.commit('regisCoach', {
                ...coachData,
            });
        },
        async getCoaches(context) {
            const response = await fetch(`https://findcoach-projectvue-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`)
            const responseData = await response.json();
            if(!response.ok) {
                // error ...
                const error = new Error(responseData.message);
                throw error;
            }

            const coaches = [];
            for (const key in responseData) {
                const coach = {
                    id: responseData[key].id,
                    firstName: responseData[key].firstName,
                    lastName: responseData[key].lastName,
                    description: responseData[key].description,
                    areas: responseData[key].areas,
                    hourlyRate: responseData[key].hourlyRate
                }
                coaches.unshift(coach);
            }
            context.commit('setCoaches', coaches);
        }
    },
    getters: {
        coaches(state) {
            return state.coaches;
        },
        hasCoaches(state) {
            return state.coaches && state.coaches.length > 0
        }
    },
}