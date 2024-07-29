import { createApp } from 'vue';

import App from './App.vue'
import router from './router'
import store from './store.js';
import BaseCard from './UI/BaseCard.vue'
import BaseButton from  './UI/BaseButton.vue'
import BaseBadge from  './UI/BaseBadge.vue'
import BaseSpinner from  './UI/BaseSpinner.vue'
import BaseDialog from  './UI/BaseDialog.vue'

const app = createApp(App)

app.component('base-card', BaseCard); // Register BaseCard globally
app.component('base-button', BaseButton); // Register BaseButton globally
app.component('base-badge', BaseBadge); // Register BaseBadge globally
app.component('base-spinner', BaseSpinner); // Register BaseSpinner globally
app.component('base-dialog', BaseDialog); // Register BaseDialog globally

app.use(router);
app.use(store)

app.mount('#app');

