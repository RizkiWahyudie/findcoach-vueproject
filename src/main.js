import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import router from './router';
import BaseDiv from './pages/base/BaseDiv.vue';
import store from './store/index.js';
import BaseSpinner from './pages/base/BaseSpinner.vue';
// import BaseError from './pages/base/BaseError.vue';
import BaseSuccess from './pages/base/BaseSuccess.vue'

const BaseError = defineAsyncComponent(() => import('./pages/base/BaseError.vue'))

const app = createApp(App);
app.use(router);
app.use(store);

app.component('base-div', BaseDiv),
app.component('base-spinner', BaseSpinner)
app.component('base-error', BaseError)
app.component('base-success', BaseSuccess)

app.mount('#app');
