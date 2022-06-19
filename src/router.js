import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

const routes = [
    {
        path: '/',
        name: 'app',
        component: App,
        children: [
            {
                path: '/listarecetas',
                name: 'ListaRecetas',
                component: () => import('./components/ListaRecetas.vue')
            },
            {
                path: '/listaingredientes',
                name: 'ListaIngredientes',
                component: () => import('./components/ListaIngredientes.vue')
            },
            {
                path: '/nuevareceta',
                name: 'NuevaReceta',
                component: () => import('./components/NuevaReceta.vue')
            },
            {
                path: '/nuevoingrediente',
                name: 'NuevoIngrediente',
                component: () => import('./components/NuevoIngrediente.vue')
            },



           
     
      
            {
                path: '/empty',
                name: 'empty',
                component: () => import('./components/EmptyPage.vue')
            },
            {
                path: '/documentation',
                name: 'documentation',
                component: () => import('./components/Documentation.vue')
            },

        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/Login.vue')
    },
    {
        path: '/landing',
        name: 'landing',
        component: () => import('./pages/LandingDemo.vue')
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('./pages/Error.vue')
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('./pages/NotFound.vue')
    },
    {
        path: '/access',
        name: 'access',
        component: () => import('./pages/Access.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
