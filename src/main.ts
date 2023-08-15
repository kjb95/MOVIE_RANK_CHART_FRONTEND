import { createApp } from 'vue';
import App from './App.vue';
import router from '@/plugins';
import vuetify from '@/plugins/vuetify';
import { createPinia } from 'pinia';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const pinia = createPinia();

createApp(App).use(vuetify).use(router).use(pinia).component('VueDatePicker', VueDatePicker).mount('#app');
