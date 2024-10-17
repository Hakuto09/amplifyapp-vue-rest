<template>
  <div :class="$style.component">
    <!-- h2>Device group list of account_id: {{ account_id }}</h2 -->
    <h3>Device group list of loginId: {{ loginId }}</h3>
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
        v-model="dgroup_name_input"
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
      <p>{{ message_result }}</p>
    </div>
    <br><br>
    <button
        type="is-info"
        @click="refreshDisplay">
        Refresh
      </button>
  </div>
</template>

<script>
// @ を指定することで `/src` の代替となる
import DgroupList from '@/components/DgroupList.vue'
import axios from 'axios'
//import { /*defineProps,*/ ref } from 'vue';
//import { Amplify } from "aws-amplify";
//import { Auth } from 'aws-amplify'
import { fetchAuthSession } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';
//import { currentSession } from 'aws-amplify/auth';
//import { getCurrentInstance } from 'vue';
const fileName = "Dgroups.vue";

console.log(fileName, ":After import: ");

//const userBranch = process.env.USER_BRANCH;
const userBranch = localStorage.getItem('userBranch');
console.log(fileName, "userBranch ", userBranch);

//let idToken;
let dgroups;
//let dgroups2 = [];
//const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/dgroups/';
let aws_url_base;
if (userBranch == 'main')
  aws_url_base = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/';
else if (userBranch == 'feature')
  aws_url_base = 'https://4nhe6ayc48.execute-api.ap-northeast-1.amazonaws.com/staging/';

console.log(fileName, "aws_url_base ", aws_url_base);

let userInfo/* = { username, userId, signInDetails }*/; 
let userId;
//let loginId;

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
      },
      dgroup_name_input: '',
      account_id: '',
      loginId: '',
      message_result: '',
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

      this.refreshDisplay();

      // 入力値の空欄チェック
      if (this.dgroup_name_input == '') {
        this.message_result = '正しいデバイスグループ名を入力してください。';
        return;
      }

      let response_api;
      let res = 0;
      let check_existing_flag; 

      // Dgroup関連リソースの登録
      for (let i = 0; i < 2; i++) {
        check_existing_flag = !i;
        console.log(fileName, funcName[0], funcName[1], "Before await axios.post():", " check_existing_flag ", check_existing_flag);
        const idToken = (await fetchAuthSession()).tokens.idToken ?? '';
//        axios.post(aws_url_base + 'dgroup',
        await axios.post(aws_url_base + 'dgroup', {
            dgroup_name: this.dgroup_name_input,
            account_id: /*userInfo.*/userId,
            check_existing_flag: check_existing_flag,
          }, {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        )
        .then(function(response) {
//          this.message_result = 'Success';
          res = 1;
          console.log(funcName[0], funcName[1], "axios.post().then:", " response.data ", response.data);
        })
        .catch(function(error) {
//          this.message_result = 'Error';
          res = -1;
          console.log(funcName[0], funcName[1], "axios.post().catch:", " error ", error);
        })
        
        if (check_existing_flag && res == 1) {
          this.message_result = 'Duplicattion error';
          return;
        }
      }

      console.log(fileName, funcName[0], funcName[1], "After await axios.post():", " res ", res);

      if (res == 1)        { this.message_result = 'Register Success';  }
      else if (res == -1)  { this.message_result = 'Register Error';    }
      else                 { this.message_result = '';         }
      console.log(fileName, funcName[0], funcName[1], "After if res:", " this.message_result ", this.message_result);

      // Dgroupリストの更新
      try {
        const idToken = (await fetchAuthSession()).tokens.idToken ?? '';
        response_api = await axios.get(aws_url_base + 'dgroups/' + /*userInfo.*/userId, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        console.log(fileName, funcName[0], funcName[1], "After axios.get(dgroups)", " response_api ", response_api);
      }
      catch (error) {
        console.error(fileName, funcName[0], funcName[1], "catch for axios.get(dgroups):", " error ", error);
        return error;
      }
      console.log(fileName, funcName[0], funcName[1], "After axios.get(dgroups):", " response_api ", response_api);
      dgroups = response_api.data;
      dgroups.sort( function(a, b) {
        return a.dgroup_name > b.dgroup_name ? 1 : -1;
      });
      console.log(fileName, funcName[0], funcName[1], "After dgroups.sort():", " dgroups ", dgroups);
      for (let i = 0; i < dgroups.length; i++) {
        dgroups[i].id = i;
      }
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

      this.refreshDisplay();

      let response_api;
      const dgroup_id_selected = childData.selected.dgroup_id;
      const dgroup_name_selected = childData.selected.dgroup_name;
      const account_id_selected = childData.selected.account_id;

      // Deviceリストの取得
      try {
        const idToken = (await fetchAuthSession()).tokens.idToken ?? '';
        response_api = await axios.get(aws_url_base + '_devices/' + dgroup_id_selected, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        console.log(fileName, funcName[0], funcName[1], "After axios.get(_devices)", " response_api ", response_api);
      }
      catch (error) {
        console.error(fileName, funcName[0], funcName[1], "catch for axios.get(_devices):", " error ", error);
        return error;
      }
      console.log(fileName, funcName[0], funcName[1], "After axios.get(_devices):", " response_api ", response_api);
      const devices = response_api.data;
      console.log(fileName, funcName[0], funcName[1], "After devices = response_api.data:", " devices ", devices);
//      if (devices != null) {
//      if (devices != []) {
      if (devices.length) {
        this.message_result = 'Delete Error: 事前に紐付いているデバイスを削除してください。';
        console.log(fileName, funcName[0], funcName[1], "if (devices.length) In.:", " this.message_result ", this.message_result);
        return /*error*/;
      }

      let res = 0;
      const payload = {
//        dgroup_id: dgroup_id_selected,
        dgroup_name: dgroup_name_selected,
        account_id: account_id_selected,
      }

      // Dgroup関連リソースの削除
      console.log(fileName, funcName[0], funcName[1], "Before await axios.delete(dgroup):", " payload ", payload);
      const idToken = (await fetchAuthSession()).tokens.idToken ?? '';
      await axios.delete(aws_url_base + 'dgroup', {
          data: payload,
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      )
      .then(function(response) {
        res = 1;
        console.log(funcName[0], funcName[1], "axios.delete(dgroup).then:", " response.data ", response.data);
      })
      .catch(function(error) {
        res = -1;
        console.log(funcName[0], funcName[1], "axios.delete(dgroup).catch:", " error ", error);
      })
      
      console.log(fileName, funcName[0], funcName[1], "After await axios.delete(dgroup):", " res ", res);

      if (res == 1)        { this.message_result = 'Delete Success';  }
      else if (res == -1)  { this.message_result = 'Delete Error';    }
      else                 { this.message_result = '';         }
      console.log(fileName, funcName[0], funcName[1], "After if res:", " this.message_result ", this.message_result);

      // Dgroupリストの更新
      try {
        const idToken = (await fetchAuthSession()).tokens.idToken ?? '';
        response_api = await axios.get(aws_url_base + 'dgroups/' + /*userInfo.*/userId, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        console.log(fileName, funcName[0], funcName[1], "After axios.get(dgroups)", " response_api ", response_api);
      }
      catch (error) {
        console.error(fileName, funcName[0], funcName[1], "catch for axios.get(dgroups):", " error ", error);
        return error;
      }
      console.log(fileName, funcName[0], funcName[1], "After axios.get(dgroup):", " response_api ", response_api);
      dgroups = response_api.data;
      dgroups.sort( function(a, b) {
        return a.dgroup_name > b.dgroup_name ? 1 : -1;
      });
      console.log(fileName, funcName[0], funcName[1], "After dgroups.sort():", " dgroups ", dgroups);
      for (let i = 0; i < dgroups.length; i++) {
        dgroups[i].id = i;
      }
      this.properties.dgroups = dgroups;
      console.log(fileName, funcName[0], funcName[1], "After this.properties update:", " this.properties ", this.properties, " this.account_id ", this.account_id);

      console.log(fileName, funcName[0], funcName[1], "Out.");
    },

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
    },
*/
    refreshDisplay: function() {
      const funcName = [":methods:", "refreshDisplay:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

      this.message_result = 'Please input a new device-group name';
    },
  },
  beforeCreate: function() {
    const funcName = [":beforeCreate:"];
    console.log(fileName, funcName[0], "In.");

//    let userInfo/* = { username, userId, signInDetails }* /; 
    let response_api;
//    async function getUserAndDgroups() {
    const getUserAndDgroups = async () => {
      const funcName = [":beforeCreate:", "getUserAndDgroups:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

      userInfo = await getCurrentUser();
//      const { signInDetails, userInfo } = await getCurrentUser();
      this.account_id = userInfo.userId;
      this.loginId = userInfo.signInDetails.loginId;
      userId = userInfo.userId;
//      console.log(fileName, funcName[0], funcName[1], "After await getCurrentUser():", " userInfo ", userInfo);
//      console.log(fileName, funcName[0], funcName[1], "After await getCurrentUser():", " userInfo ", userInfo, " signInDetails ", signInDetails, " loginId ", loginId, " userId ", userId);
      console.log(fileName, funcName[0], funcName[1], "After await getCurrentUser():", " userInfo ", userInfo, " this.loginId ", this.loginId, " userId ", userId);

      try {
//        const token = await Amplify.Auth.currentSession().getIdToken().getJwtToken();
//        const token =  localStorage.getItem('CognitoIdentityServiceProvider.2jh0uupmavlaf3h595p6dvb30r.27b4fa38-1041-7025-21d6-8054e8e5d83b.idToken');
//        const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
        const idToken = (await fetchAuthSession()).tokens.idToken ?? '';
//        console.log(fileName, funcName[0], funcName[1], "After (await fetchAuthSession()).tokens", " accessToken ", accessToken, ' idToken ', idToken);
//        console.log(fileName, funcName[0], funcName[1], "After (await fetchAuthSession()).tokens", ' idToken ', idToken);
        response_api = await axios.get(aws_url_base + 'dgroups/' + userInfo.userId, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        console.log(fileName, funcName[0], funcName[1], "After axios.get(dgroups)", " response_api ", response_api);
      }
      catch (error) {
        this.message_result = 'Delete Error';
        console.error(fileName, funcName[0], funcName[1], "catch for axios.get(dgroups):", " error ", error);
        return error;
      }
      console.log(fileName, funcName[0], funcName[1], "After axios.get(dgroups):", " response_api ", response_api);
      dgroups = response_api.data;
      dgroups.sort( function(a, b) {
        return a.dgroup_name > b.dgroup_name ? 1 : -1;
      });
      console.log(fileName, funcName[0], funcName[1], "After dgroups.sort():", " dgroups ", dgroups);
      for (let i = 0; i < dgroups.length; i++) {
        dgroups[i].id = i;
      }

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

//    this.message_result = 'Please input a new device-group name';
    this.refreshDisplay();

    console.log(fileName, funcName[0], `this.dgroup_name_input = ${this.dgroup_name_input}`)
    console.log(fileName, funcName[0], " this.dgroup_name_input ", this.dgroup_name_input)
    console.log(fileName, funcName[0], " this.message_result ", this.message_result)
  },
  beforeMount: function() {
    const funcName = [":beforeMount:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], " this.dgroup_name_input ", this.dgroup_name_input)
    console.log(fileName, funcName[0], " this.message_result ", this.message_result)
  },
  mounted: function() {
    const funcName = [":mounted:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], " this.dgroup_name_input ", this.dgroup_name_input)
    console.log(fileName, funcName[0], " this.message_result ", this.message_result)
  },
  beforeUpdate: function() {
    const funcName = [":beforeUpdate:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], " this.dgroup_name_input ", this.dgroup_name_input)
    console.log(fileName, funcName[0], " this.message_result ", this.message_result)
  },
  updated: function() {
    const funcName = [":updated:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], " this.dgroup_name_input ", this.dgroup_name_input)
    console.log(fileName, funcName[0], " this.message_result ", this.message_result)
  },
  beforeUnmount: function() {
    const funcName = [":beforeUnmount:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], " this.dgroup_name_input ", this.dgroup_name_input)
    console.log(fileName, funcName[0], " this.message_result ", this.message_result)
  },
  unmounted: function() {
    const funcName = [":unmounted:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], " this.dgroup_name_input ", this.dgroup_name_input)
    console.log(fileName, funcName[0], " this.message_result ", this.message_result)
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

/*
h1 {
  font-size: 36px;
}

h2 {
  font-size: 24px;
}

p {
  font-size: 12px;
}
*/

</style>
