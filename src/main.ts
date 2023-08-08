import { createApp } from 'vue';
import App from './App.vue';
import router from '@/plugins';
import vuetify from '@/plugins/vuetify';
import { createPinia } from 'pinia';

const pinia = createPinia();

createApp(App).use(vuetify).use(router).use(pinia).mount('#app');
