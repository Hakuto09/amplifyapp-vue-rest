<template>
  <div :class="$style.component">
    <!-- img 
      alt="Vue logo" 
      src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" / -->
    <img 
      alt="Hakuto logo" 
      src="../assets/Hakuto_logo_small.jpg">
    <h3>Welcome to Hakuto BI Cloud.</h3>
    <br><br>
    <h4>Ver {{ Version }}</h4>
    <br><br>
    <h3>LoginId: {{ loginId }}</h3>
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

    const getAndSetUserInfo = async () => {
      const funcName = [":beforeCreate:", "getUserInfo:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

      const userInfo = await getCurrentUser();
      this.loginId = userInfo.signInDetails.loginId;
      console.log(fileName, funcName[0], funcName[1], "After getCurrentUser():", " userInfo ", userInfo, " this.loginId ", this.loginId);

      const preLoginId = localStorage.getItem('loginId');
      console.log(fileName, funcName[0], funcName[1], ":After getItem(): ", "preLoginId ", preLoginId);
      const detectUserChanged = this.loginId != preLoginId;
      if (detectUserChanged) {
        console.log(fileName, funcName[0], funcName[1], ":Detect user changed!!:", " detectUserChanged ", detectUserChanged);
        // Reset parameters
        localStorage.setItem('data0_name', '');
        localStorage.setItem('data1_name', '');
        localStorage.setItem('date_start', '');
        localStorage.setItem('date_end', '');
        localStorage.setItem('dgroupInfo', '');
      }
      else {
        console.log(fileName, funcName[0], funcName[1], ":No user change.", " detectUserChanged ", detectUserChanged);
      }
      localStorage.setItem('loginId', this.loginId);
      console.log(fileName, funcName[0], funcName[1], ":After setItem(): ", "loginId ", this.loginId);
    }

    getAndSetUserInfo();
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
