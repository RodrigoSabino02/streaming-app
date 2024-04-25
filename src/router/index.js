import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('../pages/Movies.vue')
    },
    {
        path: '/series',
        name: 'series',
        component: () => import('../pages/Series.vue')
      },
      {
        path: '/my-list',
        name: 'my list',
        component: () => import('../pages/MyList.vue')
      },
      {
        path: '/movie/:id',
        name: 'movie',
        props: true,
        component: () => import('../pages/Details.vue'),
      },
      {
        path: '/serie/:id',
        name: 'serie',
        props: true,
        component: () => import('../pages/SeriesDetails.vue'),
      },
      {
        path: '/player/:id',
        name: 'player',
        props: true,
        component: () => import('../pages/Player.vue')
      },
  ]
})

export default router