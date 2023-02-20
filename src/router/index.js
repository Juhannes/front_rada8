import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyAdvertisementsView from "@/views/MyAdvertisementsView.vue";
import NewUserView from "@/views/NewUserView.vue";
import LoginView from "@/views/LoginView.vue";
import MessagesView from "@/views/MessagesView.vue";
import MyAdvertisementsEditView from "@/views/MyAdvertisementsEditView.vue";
import MyAdvertisementsDeleteView from "@/views/MyAdvertisementsDeleteView.vue";
import AdvertisementsView from "@/views/AdvertisementsView.vue";
import NewAdvertisementView from "@/views/NewAdvertisementView.vue";
import MyProfileView from "@/views/MyProfileView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/advertisements',
    name: 'advertisementsRoute',
    component: AdvertisementsView
  },
  {
    path: '/new-advertisement',
    name: 'newAdvertisementRoute',
    component: NewAdvertisementView
  },
  {
    path: '/login',
    name: 'loginRoute',
    component: LoginView
  },
  {
    path: '/new-user',
    name: 'newUserRoute',
    component: NewUserView
  },
  {
    path: '/profile',
    name: 'myProfileRoute',
    component: MyProfileView
  },
    {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/my-advertisements',
    name: 'myAdvertisementsRoute',
    component: MyAdvertisementsView
  },
  {
    path: '/my-advertisements-edit',
    name: 'myAdvertisementsEditRoute',
    component: MyAdvertisementsEditView
  },
  {
    path: '/my-advertisements-delete',
    name: 'myAdvertisementsDeleteRoute',
    component: MyAdvertisementsDeleteView
  },
  {
    path: '/messages',
    name: 'messageRoute',
    component: MessagesView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
