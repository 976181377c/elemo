import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App';
import goods from '@/components/goods/goods';
import seller from '@/components/seller/seller';
import ratings from '@/components/ratings/ratings';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
  },
  {
    path: '/goods',
    name: 'goods',
    component: goods,
  },
  {
    path: '/seller',
    name: 'seller',
    component: seller,
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: ratings,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
