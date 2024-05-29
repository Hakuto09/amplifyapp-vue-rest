<template>
  <authenticator>
  <template v-slot="{ user, signOut }">
  <div id="app">
    <div 
      id="nav" 
      class="tab-area-base">
      <ul class="tab-menu-base">
        <li>
          <router-link to="/">
            Home
          </router-link>
        </li>
        <li>
          <router-link to="/routing">
            Rounting Test
          </router-link>
        </li>
        <li>
          <router-link to="/life-cycle">
            Life Cycle
          </router-link>
        </li>
        <li>
          <router-link to="/life-cycle2">
            Life Cycle2
          </router-link>
        </li>
        <li>
          <router-link to="/users">
            User List
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'user-detail', params: {id: 1}}">
            UserDetail
          </router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
  <h1>Hello {{ user.username }}!</h1>
  <button @click="signOut">Sign Out</button>
  </template>
  </authenticator>
</template>

<script>
//import { Authenticator } from "@aws-amplify/ui-vue";
//import "@aws-amplify/ui-vue/styles.css";
//import { Hub } from "aws-amplify";

console.log("App.vue:", " After import: ");

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
</script>

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
</style>
