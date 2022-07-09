// kita menyimpan expired time login bukan di vuex tapi di local storage
let timer;
export default {
    state() {
        return {
            token: null,
            userId: null,
            tokenExpiration: null,
            setLogout: false
        }
    },
    mutations: {
        setSignup(state, payload) {
            state.token = payload.token;
            state.userId = payload.userId;
            // state.tokenExpiration = payload.tokenExpiration;
        },
        signout(state, payload) {
            state.token = payload.token
            state.userId = payload.userId
            state.tokenExpiration = payload.tokenExpiration
        },
        autoSignout(state) {
            state.setLogout = true
            setTimeout(() => {
                state.setLogout = false
            }, 200);
        }
    },
    actions: {
        async login(context, payload) {
            // API KEY didapat di menu setting firebase
            // link URL didapat dari referensi firebase
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC4itEBgKsH3-4fpAxkgn-A8HevVnYgTnU', {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            });
            const responseData = await response.json();
            if(!response.ok) {
                // error ...
                const error = new Error(responseData.message || 'Incorrect your email/password!')
                throw error;
            }
            // console.log(responseData);

            // OPEN LOCAL STORAGE
            // Menambahkan waktu expired
            const expiresIn = + responseData.expiresIn * 1000;
            // const expiresIn = 5000;
            const expirateDate = new Date().getTime() + expiresIn;
            // setItem fungsinya menympan item-item(data) login kedalam local storage
            localStorage.setItem('token', responseData.idToken);
            localStorage.setItem('userId', responseData.localId);
            localStorage.setItem('tokenExpired', expirateDate);
            // CLOSE

            // mengatur waktu expired apabila sudah tiba waktunya maka otomatis logout
            timer = setTimeout(() => {
                context.dispatch('autoLogout');
            }, expiresIn);

            context.commit('setSignup', {
                // kita buat nama sendiri: nama berdasarkan property name response payload di firebase
                token: responseData.idToken,
                userId: responseData.localId,
                // tokenExpiration: expirateDate
            })
        },
        // actions dibawah untuk auto login
        autoLogin(context) {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const tokenExpiration = localStorage.getItem('tokenExpired');

            const expiresIn = + tokenExpiration - new Date().getTime();
            // Jika waktu expired sudah habis maka mereturn menggagalkan eksekusi auto login
            if(expiresIn < 0) {
                return;
            }
            timer = setTimeout(() => {
                context.dispatch('logout');
            }, expiresIn);

            if(token && userId) {
                context.commit('setSignup', {
                    token: token,
                    userId: userId,
                    // tokenExpiration: null
                })
            }
        },
        async signup(context, payload) {
            // API KEY didapat di menu setting firebase
            // link URL didapat dari referensi firebase
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4itEBgKsH3-4fpAxkgn-A8HevVnYgTnU', {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            });
            const responseData = await response.json();
            if(!response.ok) {
                // error ...
                const error = new Error(responseData.message || 'Email has already exist, Try another email!')
                throw error;
            }
            // console.log(responseData);
            context.commit('setSignup', {
                // kita buat nama sendiri: nama berdasarkan property name response payload di firebase
                token: responseData.idToken,
                userId: responseData.localId,
                tokenExpiration: responseData.expiresIn
            })
        },
        logout(context) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('tokenExpiration');

            clearTimeout(timer);

            context.commit('signout', {
                token: null,
                userId: null,
                tokenExpiration: null,
            })
        },
        autoLogout(context) {
            context.dispatch('logout');
            context.commit('autoSignout');
        }
    },
    getters: {
        userId(state) {
            return state.userId;
        },
        token(state) {
            return state.token;
        },
        isAuthenticated(state) {
            // menjadi boolean true apabila data terisi
            return !!state.token;
        },
        setLogout(state) {
            return state.setLogout;
        }
    },
}