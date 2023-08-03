import { createApp } from 'vue'
import App from './App.vue'

//import bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

//import router
import router from './router'

//import Sweet Alert 2
import Swal from 'sweetalert2'

//import axios
import axios from 'axios'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(fas)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

//use router
app.use(router)
app.use(VueAwesomePaginate)

app.mount('#app')

app.config.globalProperties.axios=axios
app.config.globalProperties.Swal=Swal

app.config.globalProperties.urlApi='http://perpus-api.mamorasoft.com/api/'
app.config.globalProperties.urlOnly='http://perpus-api.mamorasoft.com/'