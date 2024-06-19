<template>
  <div :class="$style.component">
    <!-- h2>Device group list of account_id: {{ account_id }}</h2 -->
    <h2>Device group list of loginId: {{ loginId }}</h2>
    <!-- DgroupList :properties="properties" / -->
    <DgroupList :properties="properties" @eventDeleteDgroup="deleteDgroup" />
    <!-- button type="is-info" @click="listUpdate">listUpdate</button -->
    <!--div :class="$style.delete_dgroup">
      <button
        type="is-info"
        @click="deleteDgroup">
        Select Delete
      </button>
    </div -->
    <br><br>
    <div :class="$style.register_dgroup">
      <p>a-z, A-Z, 0-9, _ is possible for device-group name.</p>
      <input
        v-model="properties.dgroup_name_input"
        :class="$style.dgroup_name_input"
        placeholder="New device-group name">
      <!-- p>Message is: {{ properties.message }}</p -->
      <button
        type="is-info"
        @click="registerDgroup">
        Register
      </button>
    </div>
    <br><br>
    <div :class="$style.message_result">
      <p>Result: {{ properties.message_result }}</p>
    </div>
  </div>
</template>

<script>
// @ を指定することで `/src` の代替となる
import DgroupList from '@/components/DgroupList.vue'
import axios from 'axios'
//import { /*defineProps,*/ ref } from 'vue';
//import { Amplify } from "aws-amplify";
import { getCurrentUser } from 'aws-amplify/auth';
//import { getCurrentInstance } from 'vue';
const fileName = "Dgroups.vue";

console.log(fileName, ":After import: ");

let dgroups;
//let dgroups2 = [];
//const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/dgroups/';
const url_base = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/';

//let userInfo/* = { username, userId, signInDetails }*/; 
let userId;
let loginId;

//let currentInstance;


export default {
  name: 'Dgroups',

//  props: ['account_id'], //propsオプションで受け取る値の名前を指定
  components: {
    DgroupList
  },
  data: /*async*/ function() {
    const funcName = [":data:"];
    console.log(fileName, funcName[0], "In.");
/*
    let response_api;
    let getDgroupsFinFlag = 0;

    // 実際にデータを取得する getDgroups 関数
    async function getDgroups() {
      console.log(fileName, ":data-function():", ":getDgroups(): In.");

      console.log(fileName, ":data-function():", ":getDgroups():", "Before await getCurrentUser():");
      const { username, userId, signInDetails } = await getCurrentUser();
    //  console.log(fileName, ":getDgroups():", " authUser ", authUser);
      console.log(fileName, ":data-function():", ":getDgroups():", "After await getCurrentUser():", " username ", username, " userId ", userId, " signInDetails ", signInDetails);

//      let response_api;

      try {
        console.log(fileName, ":data-function():", ":getDgroups():", "Before await axios.get()");
        response_api = await axios.get(url + userId);
        console.log(fileName, ":data-function():", ":getDgroups():", "After await axios.get()", " response_api.status ", response_api.status);
        console.log(fileName, ":data-function():", ":getDgroups():", " response_api.data ", response_api.data);
        dgroups = response_api.data;
        for (let i = 0; i < dgroups.length; i++) {
          dgroups[i].id = i;
        }
        console.log(fileName, ":data-function():", ":getDgroups():", " dgroups ", dgroups);
        getDgroupsFinFlag = 1;
        // this.$setを使ってリアクティブにする
//        this.$set(this.dgroups, 'dgroups', dgroups);
        return response_api;
      }
      catch (error) {
        console.error(fileName, ":data-function():", ":getDgroups():", " error ", error);
        getDgroupsFinFlag = 1;
        return error;
      }
    }

    //  if (userId) {
    const ret = getDgroups();
    console.log(fileName, ":data-function():", "After getDgroups():", " ret ", ret);
//  }
*/
/*
    function myPromise() {
      return new Promise(function(resolve/*, reject* /) {
//        for (let i = 0; i < 10; i++) {
          setTimeout(function() {
           /*if (getDgroupsFinFlag)* / resolve("Dgroups.vue: data-function(): 2nd")
          }, 1000)
//        }
      })
    }
    console.log(fileName, ":data-function():", "1st");
//    while (!getDgroupsFinFlag) {
      let cnt = 0;
      myPromise().then(
        function(second) {
          console.log(second)
          console.log(fileName, ":data-function():", "3rd", " cnt ", cnt, " getDgroupsFinFlag ", getDgroupsFinFlag)
          cnt++;
        }
      )
//    }
*/

    // ここで返却するデータは子コンポーネント `DgroupList.vue` で表示するユーザ情報
    // 本来ならば DB 等で保持するのだが、今回は記事用のサンプルコードということでリストで持たせている
//    let account_id = ref('')
//    console.log(fileName, ":data-function():", " account_id ", account_id);
//    console.log(fileName, ":data-function():", " this.account_id ", this.account_id);

    console.log(fileName, ":data-function():", "Before return():", " dgroups ", dgroups);
    return {
      properties: {
        headers: [
          'dgroup name',
          'dgroup id',
//          'account id',
        ],
        dgroups: null/*dgroups*/,
//        account_id: this.account_id,
        dgroup_name_input: '',
        message_result: '',
      },
      account_id: 0/*userId*/,
    }
  },
//  methods: function() {
  methods: {
//    console.log(fileName, ":methods-function():", " this.account_id ", this.account_id);
//    console.log(fileName, ":methods:", "In");

//    registerDgroup: function() {
    registerDgroup: async function() {
//    const :registerDgroup = async () => {
      const funcName = [":methods:", "regsiterDgroup:"];
      console.log(fileName, funcName[0], funcName[1], "In.");
      console.log(fileName, funcName[0], funcName[1], " this.properties ", this.properties);

      let response_api;
      let res = 0;
      let check_existing_flag; 

      // Dgroup関連リソースの登録
      for (let i = 0; i < 2; i++) {
        check_existing_flag = !i;
        console.log(fileName, funcName[0], funcName[1], "Before await axios.post():", " check_existing_flag ", check_existing_flag);
  //      axios.post(url_base + 'dgroup',
        await axios.post(url_base + 'dgroup',
          {
            dgroup_name: this.properties.dgroup_name_input,
            account_id: /*userInfo.*/userId,
            check_existing_flag: check_existing_flag,
          })
          .then(function(response) {
  //          this.properties.message_result = 'Success';
            res = 1;
            console.log(funcName[0], funcName[1], "axios.post().then", " response.data ", response.data);
          })
          .catch(function(error) {
  //          this.properties.message_result = 'Error';
            res = -1;
            console.log(funcName[0], funcName[1], "axios.post().catch", " error ", error);
          })
        
        if (check_existing_flag && res == 1) {
          this.properties.message_result = 'Duplicattion error';
          return;
        }
      }

      console.log(fileName, funcName[0], funcName[1], "After await axios.post():", " res ", res);

      if (res == 1)        { this.properties.message_result = 'Register Success';  }
      else if (res == -1)  { this.properties.message_result = 'Register Error';    }
      else                 { this.properties.message_result = '';         }
      console.log(fileName, funcName[0], funcName[1], "After if res:", " this.properties.message_result ", this.properties.message_result);

      // Dgroupリストの更新
      response_api = await axios.get(url_base + 'dgroups/' + /*userInfo.*/userId);
      console.log(fileName, funcName[0], funcName[1], "After axios.get():", " response_api ", response_api);
      dgroups = response_api.data;
      for (let i = 0; i < dgroups.length; i++) {
        dgroups[i].id = i;
      }
      console.log(fileName, funcName[0], funcName[1], "Before dgroups.sort():", " dgroups ", dgroups);
      dgroups.sort( function(a, b) {
        return a.dgroup_name > b.dgroup_name ? 1 : -1;
      });
      this.properties.dgroups = dgroups;
      console.log(fileName, funcName[0], funcName[1], "After this.properties update:", " this.properties ", this.properties, " this.account_id ", this.account_id);

      console.log(fileName, funcName[0], funcName[1], "Out.");
    },

//    deleteDgroup: async function() {
    deleteDgroup: async function(childData) {
      const funcName = [":methods:", "deleteDgroup:"];
      console.log(fileName, funcName[0], funcName[1], "In.");
      console.log(fileName, funcName[0], funcName[1], " this.properties ", this.properties);
      console.log(fileName, funcName[0], funcName[1], " childData ", childData);

      let response_api;
      let res = 0;
      const payload = {
//        dgroup_id: childData.selected.dgroup_id,
        dgroup_name: childData.selected.dgroup_name,
        account_id: childData.selected.account_id,
      }

      // Dgroup関連リソースの削除
      console.log(fileName, funcName[0], funcName[1], "Before await axios.delete():", " payload ", payload);
      await axios.delete(url_base + 'dgroup',
        {
          data: payload,
        })
        .then(function(response) {
          res = 1;
          console.log(funcName[0], funcName[1], "axios.delete().then", " response.data ", response.data);
        })
        .catch(function(error) {
          res = -1;
          console.log(funcName[0], funcName[1], "axios.delete().catch", " error ", error);
        })
      
      console.log(fileName, funcName[0], funcName[1], "After await axios.delete():", " res ", res);

      if (res == 1)        { this.properties.message_result = 'Delete Success';  }
      else if (res == -1)  { this.properties.message_result = 'Delete Error';    }
      else                 { this.properties.message_result = '';         }
      console.log(fileName, funcName[0], funcName[1], "After if res:", " this.properties.message_result ", this.properties.message_result);

      // Dgroupリストの更新
      response_api = await axios.get(url_base + 'dgroups/' + /*userInfo.*/userId);
      console.log(fileName, funcName[0], funcName[1], "After axios.get():", " response_api ", response_api);
      dgroups = response_api.data;
      for (let i = 0; i < dgroups.length; i++) {
        dgroups[i].id = i;
      }
      console.log(fileName, funcName[0], funcName[1], "Before dgroups.sort():", " dgroups ", dgroups);
      dgroups.sort( function(a, b) {
        return a.dgroup_name > b.dgroup_name ? 1 : -1;
      });
      this.properties.dgroups = dgroups;
      console.log(fileName, funcName[0], funcName[1], "After this.properties update:", " this.properties ", this.properties, " this.account_id ", this.account_id);

      console.log(fileName, funcName[0], funcName[1], "Out.");
    }

    /*
    listUpdate: function() {
      console.log(fileName, ":methods:", ":listUpdate():", "In.", " this.properties ", this.properties);

//      let userInfo/* = { username, userId, signInDetails }* /; 
      let response_api;
//      const getCurrentUserlap = async () => {
      const axiosGetLap = async () => {
        console.log(fileName, ":methods:", ":listUpdate():", "Before await getCurrentUser():");
        userInfo = await getCurrentUser();
        console.log(fileName, ":methods:", ":listUpdate():", "After await getCurrentUser():", " userInfo ", userInfo);
//      }
//      getCurrentUserlap();
//      console.log(fileName, ":methods:", ":listUpdate():", "Mid.");
//      const axiosGetLap = async () => {
        console.log(fileName, ":methods:", ":listUpdate():", "Before await axios.get():", " url + userId ", url + userInfo.userId);
        response_api = await axios.get(url + userInfo.userId);
        console.log(fileName, ":methods:", ":listUpdate():", "After await axios.get():", " response_api.status ", response_api.status);
        dgroups = response_api.data;
        for (let i = 0; i < dgroups.length; i++) {
          dgroups[i].id = i;
        }
        console.log(fileName, ":methods:", ":listUpdate():", ":getDgroups():", " dgroups ", dgroups);
  //        getDgroupsFinFlag = 1;
        // this.$setを使ってリアクティブにする
//        this.$set(this.dgroups, 'dgroups', dgroups);
//        this.dgroups = dgroups2;
//        this.dgroups = dgroups;
        this.properties.dgroups = dgroups;
//        console.log(fileName, ":methods:", ":Before instance.proxy.forceUpdate():", " this.dgroups ", this.dgroups, " currentInstance ", currentInstance);
//        currentInstance.proxy.$forceUpdate();
//        console.log(fileName, ":methods:", ":After instance.proxy.forceUpdate():");
      }
      axiosGetLap();

      console.log(fileName, ":methods:", ":listUpdate():", "Out.");
    }
*/
  },
  beforeCreate: function() {
    const funcName = [":beforeCreate:"];
    console.log(fileName, funcName[0], "In.");

//    try {
//      this.properties.dgroup_name_input = 'Please input a new device-group name';
//      console.log(`message is ${this.properties.message}`)
//    } catch (e) {
//      console.log(e)
//    }
//    console.log(fileName, funcName[0], " this.properties.dgroup_name_input ", this.properties.dgroup_name_input)

//    currentInstance = getCurrentInstance();
//    console.log(fileName, ":beforeCreate-function():", " currentInstance ", currentInstance);

/*
    function myPromise() {
      return new Promise(function(resolve/*, reject* /) {
        setTimeout(function() {
          resolve("Dgroups.vue:beforeCreate-function():2nd")
//          resolve(fileName, ":beforeCreate-function():", "2nd")
        }, 10000)
      })
    }
    console.log(fileName, ":beforeCreate-function():", "1st");
    myPromise().then(
      function(second) {
        console.log(second)
        console.log(fileName, ":beforeCreate-function():", "3rd")
      }
    )
*/

//    let userInfo/* = { username, userId, signInDetails }* /; 
    let response_api;
//    async function getUserAndDgroups() {
    const getUserAndDgroups = async () => {
      const funcName = [":beforeCreate:", "getUserAndDgroups:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

//      userInfo = await getCurrentUser();
      const { signInDetails, userInfo } = await getCurrentUser();
      this.account_id = userInfo.userId;
      loginId = signInDetails.loginId;
      userId = userInfo.userId;
//      console.log(fileName, funcName[0], funcName[1], "After await getCurrentUser():", " userInfo ", userInfo);
      console.log(fileName, funcName[0], funcName[1], "After await getCurrentUser():", " userInfo ", userInfo, " signInDetails ", signInDetails, " loginId ", loginId, " userId ", userId);

      //    getCurrentUserlap();
//    console.log(fileName, ":beforeCreate-function(): Mid.");
//    const axiosGetLap = async () => {
      console.log(fileName, funcName[0], funcName[1], "Before axios.get():", " userInfo ", userInfo);
      response_api = await axios.get(url_base + 'dgroups/' + userInfo.userId);
/*
      axios.get(url_base + 'dgroups' + userInfo.userId)
        .then(function(response) {
          response_api = response;
          console.log(funcName[0], funcName[1], "axios.post().then", " response.data ", response.data);
        })
        .catch(function(error) {
          console.log(funcName[0], funcName[1], "axios.post().catch", " error ", error);
        })
*/
      console.log(fileName, funcName[0], funcName[1], "After axios.get():", " response_api ", response_api);
      dgroups = response_api.data;
      for (let i = 0; i < dgroups.length; i++) {
        dgroups[i].id = i;
      }
      console.log(fileName, funcName[0], funcName[1], "Before dgroups.sort():", " dgroups ", dgroups);
      dgroups.sort( function(a, b) {
        return a.dgroup_name > b.dgroup_name ? 1 : -1;
      });

//      console.log(fileName, funcName[0], funcName[1], "Before this.properties.dgroups = dgroups", " dgroups ", dgroups, " this.properties.dgroups ", this.properties.dgroups);
      console.log(fileName, funcName[0], funcName[1], "Before this.properties.dgroups = dgroups", " dgroups ", dgroups, " this ", this);
//        getDgroupsFinFlag = 1;
      // this.$setを使ってリアクティブにする
//      this.$set(this.dgroups, 'dgroups', dgroups);
      this.properties.dgroups = dgroups;
      console.log(fileName, funcName[0], funcName[1], "After this.properties update:", " this.properties ", this.properties, " this.account_id ", this.account_id);
    }

//    console.log(fileName, funcName[0], "Before getUserAndDgroups()", " this ", this);
    console.log(fileName, funcName[0], "Before getUserAndDgroups()", " this.properties ", this.properties);
    getUserAndDgroups();
//    this.getUserAndDgroups();
//    console.log(fileName, funcName[0], "After getUserAndDgroups()", " ret ", ret);

//    listUpdate(this.properties);
//    this.listUpdate();
//    this.$listUpdate();
//    console.log(fileName, ":beforeCreate-function():", "After listUpdate()");
    console.log(fileName, funcName[0], "Out.");
  },
  created: function() {
    const funcName = [":created:"];
    console.log(fileName, funcName[0], "In.");

    this.properties.message_result = 'Please input a new device-group name';
    console.log(fileName, funcName[0], `this.properties.dgroup_name_input = ${this.properties.dgroup_name_input}`)
    console.log(fileName, funcName[0], " this.properties.dgroup_name_input ", this.properties.dgroup_name_input)
    console.log(fileName, funcName[0], " this.properties.message_result ", this.properties.message_result)
  },
  beforeMount: function() {
    const funcName = [":beforeMount:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], " this.properties.dgroup_name_input ", this.properties.dgroup_name_input)
    console.log(fileName, funcName[0], " this.properties.message_result ", this.properties.message_result)
  },
  mounted: function() {
    const funcName = [":mounted:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], " this.properties.dgroup_name_input ", this.properties.dgroup_name_input)
    console.log(fileName, funcName[0], " this.properties.message_result ", this.properties.message_result)
  },
  beforeUpdate: function() {
    const funcName = [":beforeUpdate:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], " this.properties.dgroup_name_input ", this.properties.dgroup_name_input)
    console.log(fileName, funcName[0], " this.properties.message_result ", this.properties.message_result)
  },
  updated: function() {
    const funcName = [":updated:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], " this.properties.dgroup_name_input ", this.properties.dgroup_name_input)
    console.log(fileName, funcName[0], " this.properties.message_result ", this.properties.message_result)
  },
  beforeUnmount: function() {
    const funcName = [":beforeUnmount:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], " this.properties.dgroup_name_input ", this.properties.dgroup_name_input)
    console.log(fileName, funcName[0], " this.properties.message_result ", this.properties.message_result)
  },
  unmounted: function() {
    const funcName = [":unmounted:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], " this.properties.dgroup_name_input ", this.properties.dgroup_name_input)
    console.log(fileName, funcName[0], " this.properties.message_result ", this.properties.message_result)
  },
}
</script>

<style module>
.component {
  margin-top: /*50*/100px;
}

.dgroup_name_input {
  font-size: 10px;
}

.message_reslt {
  font-size: 10px;
}

.delete_dgroup {
  font-size: 16px;
	display: flex;
	align-items: flex-start; /*ここは任意の値でOK*/
	justify-content: flex-end;
  margin-right: 100px;
}

h1 {
  font-size: 36px;
}

h2 {
  font-size: 24px;
}

p {
  font-size: 12px;
}
</style>
