export default {
    namespaced: true,
    state() {
        return {
            requests: [
                // {
                //     id: '1',
                //     coachId: 'c1',
                //     name: 'Rizki Wahyudie',
                //     email: 'rizkiwahyudie@gmail.com',
                //     message: 'Hallo coach maximilian, Nice to meet you!',
                //     time: '3:41:25 PM 7/2/2022'
                // }
            ]
        }
    },
    mutations: {
        addRequest(state, payload) {
            state.requests.unshift(payload);
        },
        setMessage(state, payload) {
            state.requests = payload;
        }
    },
    actions: {
        async sendMsg(context, data) {
            const newRequests = {
                id: new Date().toISOString(),
                coachId: data.coachId,
                name: data.name,
                email: data.email,
                message: data.message,
                time: data.watch
            };
            const response = await fetch(`https://findcoach-projectvue-default-rtdb.asia-southeast1.firebasedatabase.app/message.json`, {
                method: 'POST',
                body: JSON.stringify(newRequests)
            })
            const responseData = await response.json();
            if(!response.ok) {
                // error ...
                const error = new Error(responseData.message);
                throw error;
            }
            context.commit('addRequest', newRequests);
        },
        async getMessage(context) {
            const token = context.rootGetters.token;
            // const token = context.rootGetters['auth/token'];
            const response = await fetch(`https://findcoach-projectvue-default-rtdb.asia-southeast1.firebasedatabase.app/message.json?auth=` + token);
            const responseData = await response.json();
            if(!response.ok) {
                // error ...
                const error = new Error(responseData.message);
                throw error;
            }

            const requests = [];
            for(const key in responseData) {
                const dataMsg = {
                    id: responseData[key].id,
                    coachId: responseData[key].coachId,
                    name: responseData[key].name,
                    email: responseData[key].email,
                    message: responseData[key].message,
                    time: responseData[key].time
                }
                requests.unshift(dataMsg);
            }
            context.commit('setMessage', requests);
        },
    },
    getters: {
        requests(state) {
            return state.requests
        },
    }
}