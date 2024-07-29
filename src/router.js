import{createWebHistory,createRouter} from 'vue-router'

import CoachDetail from './Coaches/CoachDetail.vue'
import CoachesList from './Coaches/CoachesList.vue'
import ContactCoach from './Coaches/ContactCoach.vue'
import CoachRegistration from './Coaches/CoachRegistration.vue'
import RequestReceived from './Requests/RequestReceived.vue'
import NotFound from  './UI/NotFound.vue'

const routes = [
    {
        path : '/',
        redirect : '/coaches'
    },
    {
        name : 'coaches',
        path : '/coaches',
        component : CoachesList
    },
    {
        name : 'coachesdetails',
        path : '/coaches/:id',
        component : CoachDetail,
        props: true,
        children : [
            {
                path : 'contact',
                component : ContactCoach, 
            }
        ]
    },
    {
        name : 'register',
        path : '/register',
        component : CoachRegistration
    },
    {
        name : 'requests',
        path : '/requests',
        component : RequestReceived
    },
    {
        path:'/:notFound(.*)',
        //HERE YOU CAN EITHER REDIRECT THE USER TO A DIFFERENT COMPONENT 
        // redirect: '/teams',

        //OR
        //YOU CAN CREATE A DEFAULT COMPONENT FOR PAGE NOT FOUND & REDIRECT THE USER TO THAT COMPONENT
        component: NotFound,

    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;
