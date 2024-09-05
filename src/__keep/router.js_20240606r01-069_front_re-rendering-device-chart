import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Users from './views/Users.vue'
import LifeCycle from './views/LifeCycle.vue'
import LifeCycle2 from './views/LifeCycle2.vue'
import UserDetail from './views/UserDetail.vue'
import Routing from './views/Routing.vue'
import Dgroups from './views/Dgroups.vue'
import Devices from './views/Devices.vue'
import DeviceDetail from './views/DeviceDetail.vue'
import ChartAndDatalist from './views/ChartAndDatalist.vue'

//import Vue from 'vue'
//import Login from './views/Login.vue'
//import store from './components/store.js'

// Amplify読み込み
//import { /*components,*/ AmplifyEventBus } from 'aws-amplify-vue'
//import /*Amplify,*/ * as AmplifyModules from 'aws-amplify'
//import { AmplifyPlugin } from 'aws-amplify-vue'
const fileName = "router.js";

console.log(fileName, ":After import: ");

// ルーティング設定
const routes = [
  /*
  {
    path: '/register',
    name: 'Register',
    component: () =>
        import('./views/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
//    component: Login,
    component: () =>
        import('./views/Login.vue'),
  },
  */
  {
    // トップページ
    path: '/',
    name: 'home',
    component: Home,
//    meta: { requiresAuth: true},
  },
  {
    path: '/routing',
    name: 'routing',
    component: Routing,
//    meta: { requiresAuth: true},
  },
  {
    path: '/life-cycle',
    name: 'llfe-cycle',
    component: LifeCycle,
//    meta: { requiresAuth: true},
  },
  {
    path: '/life-cycle2',
    name: 'llfe-cycle2',
    component: LifeCycle2,
//    meta: { requiresAuth: true},
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
//    meta: { requiresAuth: true},
  },
  {
    path: '/users/:id',
    name: 'user-detail',
    component: UserDetail,
//    meta: { requiresAuth: true},
  },
  {
    path: '/dgroups',
    name: 'dgroups',
    component: Dgroups,
//    meta: { requiresAuth: true},
  },
  {
    path: '/devices',
    name: 'devices',
    component: Devices,
//    meta: { requiresAuth: true},
  },
  {
//    path: '/devices/:id',
//    path: '/devices/:device_id',
    path: '/device-detail',
    name: 'device-detail',
    component: DeviceDetail,
//    meta: { requiresAuth: true},
  },
  {
    path: '/chart',
    name: 'chart',
    component: ChartAndDatalist,
//    meta: { requiresAuth: true},
  },
]

const router = createRouter({
//  history: createWebHistory(),
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
console.log(fileName, ":After createRouter(): ");

/*
//Vue.use(AmplifyPlugin, AmplifyModules)

let user;

// ユーザー管理
getUser().then((user) => {
    if (user) {
        router.push({path: '/'});
    }
});
console.log(fileName, ":After getUser(): ");

function getUser() {
    return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((data) => {
        if (data && data.signInUserSession) {
//            store.commit('setUser', data);
            return data;
        }
    }).catch(() => {
//        store.commit('setUser', null);
        return null;
    });
}

// ログイン状態管理
AmplifyEventBus.$on('authState', async (state) => {
    if (state === 'signedOut'){
        user = null;
//        store.commit('setUser', null);
        router.push({path: '/login'});
    } else if (state === 'signedIn') {
        user = await getUser();
        router.push({path: '/'});
    }
});
console.log(fileName, ":After AmplifyEventBus.$on(): ");

// リダイレクト設定
router.beforeResolve(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        user = await getUser();
        if (!user) {
            return next({
                path: '/login'
            });
        }
        return next()
    }
    return next()
});
console.log(fileName, ":After router.beforeResolve(): ");
*/

export default router
