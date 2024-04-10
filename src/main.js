import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store/index.js'

import BaseButton from './components/ui/BaseButton.vue'
import BaseCard from './components/ui/BaseCard.vue'
import BaseDialog from './components/ui/BaseDialog.vue'
import BaseSpinner from './components/ui/BaseSpinner.vue'
import BaseRefreshButton from './components/ui/BaseRefreshButton.vue'

const app= createApp(App)

app.use(router)
app.use(store)

app.component('base-button', BaseButton)
app.component('base-card', BaseCard)
app.component('base-dialog', BaseDialog)
app.component('base-spinner', BaseSpinner)
app.component('base-refresh', BaseRefreshButton)

app.mount('#app')

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
