<script setup>
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
//import { Hub } from "aws-amplify";

console.log(fileName, ":<script setup>:", " After import: ");
</script>

<script>
//import Dgroups from './views/Dgroups.vue';
import { /*defineProps,*/ ref } from 'vue';
import { /*Authenticator,*/ useAuthenticator } from "@aws-amplify/ui-vue";
import { toRaw } from 'vue';
//import { toRefs, reactive } from 'vue';
import { getCurrentUser } from 'aws-amplify/auth'
import router from './router'
const fileName = "App.vue";

//const disConsoleLog = true;
const disConsoleLog = false;

const userBranch = 'main';
//const userBranch = 'feature';

/*
function swConsoleLog(word){
  if (swConsoleLog) {
    console.log(word);
  }
}
  */

//if (import.meta.env.VITE_APP_ENV === 'prod') {
if (disConsoleLog) {
    // 本番環境の場合、コンソール出力を無効にする
    console.log = console.info = console.debug = console.warn = console.error = () => {};
}

console.log(fileName, ":<script>:", " After import: ");
//swConsoleLog([fileName, ":<script>:", " After import: "]);

localStorage.setItem('userBranch', userBranch);
console.log(fileName, " After setItem: ", 'userBranch ', userBranch);

/*
const listener = (data) => {
  const { payload } = data;
  console.log(payload.data);
  switch (payload.event) {
    case "configured":
      console.log(`event: ${payload.event}`);
      break;
    case "signIn":
      console.log(`event: ${payload.event}`);
      break;
    case "signIn_failure":
      console.log(`event: ${payload.event}`);
      break;
    case "signUp":
      console.log(`event: ${payload.event}`);
      break;
    case "signUp_failure":
      console.log(`event: ${payload.event}`);
      break;
    case "confirmSignUp":
      console.log(`event: ${payload.event}`);
      break;
    case "completeNewPassword_failure":
      console.log(`event: ${payload.event}`);
      break;
    case "autoSignIn":
      console.log(`event: ${payload.event}`);
      break;
    case "autoSignIn_failure":
      console.log(`event: ${payload.event}`);
      break;
    case "forgotPassword":
      console.log(`event: ${payload.event}`);
      break;
    case "forgotPassword_failure":
      console.log(`event: ${payload.event}`);
      break;
    case "forgotPasswordSubmit":
      console.log(`event: ${payload.event}`);
      break;
    case "forgotPasswordSubmit_failure":
      console.log(`event: ${payload.event}`);
      break;
    case "verify":
      console.log(`event: ${payload.event}`);
      break;
    case "tokenRefresh":
      console.log(`event: ${payload.event}`);
      break;
    case "tokenRefresh_failure":
      console.log(`event: ${payload.event}`);
      break;
    case "cognitoHostedUI":
      console.log(`event: ${payload.event}`);
      break;
    case "cognitoHostedUI_failure":
      console.log(`event: ${payload.event}`);
      break;
    case "customOAuthState":
      console.log(`event: ${payload.event}`);
      break;
    case "customState_failure":
      console.log(`event: ${payload.event}`);
      break;
    case "parsingCallbackUrl":
      console.log(`event: ${payload.event}`);
      break;
    case "userDeleted":
      console.log(`event: ${payload.event}`);
      break;
    case "updateUserAttributes":
      console.log(`event: ${payload.event}`);
      break;
    case "updateUserAttributes_failure":
      console.log(`event: ${payload.event}`);
      break;
    case "signOut":
      console.log(`event: ${payload.event}`);
      break;
  }
};

Hub.listen("auth", listener);
*/

export default {
  name: 'App',

  /*
  components: {
    Dgroups,
  },
  */
  /*
  setup() {
    let inputData = ref('')
    return {
      inputData
    }
  },
  */
  /*
  created() {
    const auth = ref(useAuthenticator());
    console.log(fileName, ":created():", " auth ", auth);
  },
  */
  data: async function() {
    const funcName = [":data:"];
    console.log(fileName, funcName[0], "In.");

//    const auth2 = useAuthenticator();
//    console.log(fileName, ":data-function():", "After useA():", " auth2 ", auth2);

//    let authUser = await getCurrentUser();
//    let authUser = await Amplify.Auth.getCurrentUser();
    const { username, userId, signInDetails } = await getCurrentUser();
    console.log(fileName, funcName[0], ":After getCurrentUser():", " username ", username, " userId ", userId, " signInDetails ", signInDetails);     

//    const state = reactive({msg:'hello world'});
//    console.log(fileName, ":data-function():", "After reactive():", " state ", state);     
//    console.log(fileName, ":data-function():", "After reactive():", " {...state} ", {...state});     
//    console.log(fileName, ":data-function():", "After reactive():", " toRaw(state) ", toRaw(state));
//    const state_raw = toRaw(state);
//    console.log(fileName, ":data-function():", "After toRaw():", " state_raw.msg ", state_raw.msg);

    const auth = ref(useAuthenticator());
    console.log(fileName, funcName[0], ":After ref(): ", "auth ", auth);
    console.log(fileName, funcName[0], ":After ref(): ", "auth.value ", auth.value);
    console.log(fileName, funcName[0], ":After ref(): ", "{...(auth.value)} ", {...(auth.value)});
    console.log(fileName, funcName[0], ":After ref(): ", "toRaw(auth.value) ", toRaw(auth.value));
//    const auth_value_raw = toRaw(auth.value);
//    console.log(fileName, ":data-function():", "After ref():", " auth_value_raw.user ", auth_value_raw.user);
//    console.log(fileName, ":data-function():", "After ref():", " auth_value_raw.authStatus ", auth_value_raw.authStatus);
//    console.log(fileName, ":data-function():", "After ref():", " auth_value_raw.route ", auth_value_raw.route);
//    console.log(fileName, ":data-function():", "After ref():", " auth_value_raw.hasValidationErrors ", auth_value_raw.hasValidationErrors);
//    console.log(fileName, ":data-function():", "After ref():", " auth_value_raw.user.userId ", auth_value_raw.user.userId);

//    const { route, user, signOut } = toRefs(useAuthenticator());
//    console.log(fileName, ":data-function():", "After toRefs():", " route ", route, " user ", user, " signOut ", signOut);

//    const user_raw = toRaw(useAuthenticator());
//    console.log(fileName, ":data-function():", "After toRaw():", " user_raw ", user_raw);
//    console.log(fileName, ":data-function():", "After toRaw():", " user_raw.user ", user_raw.user);
//    console.log(fileName, ":data-function():", "After toRaw():", " user_raw.user.userId ", user_raw.user.userId);

    return {
//      account_id: auth.value.user.userId,
//      account_id: user.userId,
//      account_id: userId,
      userId,
    };
  },
  methods: {

    handleSignOut: async function(signOut) {
      const funcName = [":methods:", "handleSignOut:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

      // AmplifyのSignout処理
      signOut();

      // ブラウザのURL強制書き換え
      router.replace('/');
    },
  },

  beforeCreate: function() {
    const funcName = [":beforeCreate:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], "Out.");
  },
  created: function() {
    const funcName = [":created:"];
    console.log(fileName, funcName[0], "In.");

    const auth = ref(useAuthenticator());
    console.log(fileName, funcName[0], " auth ", auth);

    console.log(fileName, funcName[0], "Out.");
  },
  beforeMount: function() {
    const funcName = [":beforeMount:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], "Out.");
  },
  mounted: function() {
    const funcName = [":mounted:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], "Out.");
  },
  beforeUpdate: function() {
    const funcName = [":beforeUpdate:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], "Out.");
  },
  updated: function() {
    const funcName = [":updated:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], "Out.");
  },
  beforeUnmount: function() {
    const funcName = [":beforeUnmount:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], "Out.");
  },
  unmounted: function() {
    const funcName = [":unmounted:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], "Out.");
  },
}
</script>

<template>
  <!-- authenticator -->
  <authenticator hideSignUp={true}>
    <!-- template v-slot:footer>
      <div></div>
    </template -->
    <!-- template v-slot="{ user, signOut }" -->
    <template v-slot="{ signOut }">
    <!-- template v-model="{ user, signOut }" -->
      <!-- h1>Hello {{ user.username }}!</h1 -->
      <!-- button @click="signOut">Sign Out</button -->
      <button @click="handleSignOut(signOut)">Sign Out</button>
      <div id="app">
        <div>
          <!-- templete v-model="user" / -->
          <!-- Dgroups :account_id=user.username / -->
          <!-- Dgroups :account_id="account_id" / -->
          <!-- Dgroups v-model="user" / -->
          <!-- p>inputData : {{ user.username }}</p -->
        </div>
        <div 
          id="nav" 
          class="tab-area-base">
          <ul class="tab-menu-base">
            <li>
              <router-link to="/" exact active-class="active-link">Home</router-link>
            </li>
            <!-- li>
              <router-link to="/routing" exact active-class="active-link">Rounting Test</router-link>
            </li -->
            <!-- li>
              <router-link to="/life-cycle" exact active-class="active-link">Life Cycle</router-link>
            </li -->
            <!-- li>
              <router-link to="/life-cycle2" exact active-class="active-link">Life Cycle2</router-link>
            </li -->
            <!-- li>
              <router-link to="/users" exact active-class="active-link">User List</router-link>
            </li -->
            <!-- li>
              <router-link :to="{ name: 'user-detail', params: {id: 0} }" exact active-class="active-link">User Detail</router-link>
            </li -->
            <li>
              <router-link to="/dgroups" exact active-class="active-link">Device group List</router-link>
            </li>
            <li>
              <router-link to="/devices" exact active-class="active-link">Device List</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'device-detail', params: { id: 0 } }" exact active-class="active-link">Device Detail</router-link>
              <!-- router-link :to="{ name: 'device-detail', params: { id: 0, device_id: 0 } }">Device Detail</router-link -->
            </li>
            <li>
              <!-- router-link to="/chart">Chart and data list</router-link -->
              <router-link to="/chart" exact active-class="active-link">Chart</router-link>
              <!-- router-link :to="{ name: 'chart', params: { device_id: 0 } }">Chart</router-link -->
            </li>
          </ul>
          <!-- div>
            <h1>Test</h1>
          </div -->
        </div>
        <router-view />
      </div>
    </template>
  </authenticator>
</template>

<style>
html {
  height: 100%;
  width: 100%;
}

h1 {
  font-size: 36px;
}

tr, td, th {
  padding: 5px 0px;
  border-bottom: solid 1px;
  border-bottom-color: rgb(185, 180, 180);
}

tr:last-child, td {
  border-bottom:none;
}

tr:nth-child(even){
    background:rgb(250, 250, 250);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

div.tab-area-base {
  height: 0px;
  width: 95%;
  margin: auto;
}

ul.tab-menu-base {
  overflow: hidden;
  list-style: none;
  margin: 0px auto;
  padding: 0;
  border-bottom: solid 1px;
  border-bottom-color: rgb(200, 200, 200);
}

ul.tab-menu-base li {
  float: left;
  margin: 0px 1px 0 0 ;
  padding: 0;
  background: rgb(240, 240, 240);
  border-radius: 10px 10px 0 0;
  height: 100%;
  width: 130px;
  font-size: 1.1em;
  text-align: center;
}

ul.tab-menu-base li.current {
  background: rgb(240, 240, 240);
}

.active-link {
  /*font-size: 30px;*/
  font-weight: bold;
}
</style>
