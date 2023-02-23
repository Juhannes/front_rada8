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

const router = new VueRouter({
  mode: 'history',
  routes: [ {
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
      path: '',
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
    },]
})

export default router
