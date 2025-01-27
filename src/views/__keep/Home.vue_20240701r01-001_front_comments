<template>
  <div :class="$style.component">
    <!-- img 
      alt="Vue logo" 
      src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" / -->
    <img 
      alt="Hakuto logo" 
      src="../assets/Hakuto_logo_small.jpg">
    <h2>Welcome to Hakuto BI Cloud.</h2>
    <br><br>
    <h5>Ver {{ Version }}</h5>
    <br><br>
    <h2>LoginId: {{ loginId }}</h2>
  </div>
</template>

<script>
import { getCurrentUser } from 'aws-amplify/auth';
const fileName = "Home.vue";


export default {
  name: 'HomePage',
  data: function() {
    const funcName = [":data:"];
    console.log(fileName, funcName[0], "In.");
    return {
      loginId: '',
      Version: '1.00',
    }
  },
  beforeCreate: function() {
    const funcName = [":beforeCreate:"];
    console.log(fileName, funcName[0], "In.");

    const getUserInfo = async () => {
      const funcName = [":beforeCreate:", "getUserInfo:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

      const userInfo = await getCurrentUser();
      this.loginId = userInfo.signInDetails.loginId;
      console.log(fileName, funcName[0], funcName[1], "After getCurrentUser():", " userInfo ", userInfo, " this.loginId ", this.loginId);
    }
    getUserInfo();
  }
}
</script>

<style module>
.component {
  margin-top: /*50*/100px;
}

h1 {
  font-size: 36px;
}

h2 {
  font-size: 24px;
}
</style>
