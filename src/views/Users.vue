<template>
  <div :class="$style.component">
    <UserList :properties="properties" />
  </div>
</template>

<script>
// @ を指定することで `/src` の代替となる
import UserList from '@/components/UserList.vue'
import axios from 'axios'

let users;
const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/accounts';

// 実際にデータを取得する getAccounts 関数
async function getAccounts() {
  console.log("Users.vue:", " getAccounts(): In.");
  let response;

  try {
    response = await axios.get(url);
    console.log("Users.vue:", "getAccounts():", " response.status ", response.status)
    console.log("Users.vue:", "getAccounts():", " response.data ", response.data);
    users = response.data;
    console.log("Users.vue:", "getAccounts():", " users ", users);
    return response;
  }
  catch (error) {
    console.error("Users.vue:", "getAccounts():", " error ", error);
    return error;
  }
}

// getAccounts を呼び出してデータを読み込む
let response_ga = getAccounts();
console.log("Users.vue:", " response_ga ", response_ga);

//users = response_ga.data;

//const users = [
//  {
//    id: 1,
//    name: 'hogehoge',
//    live: 'Japan Tokyo',
//    phone: 'NNN-XXXX-HHHH',
//    gender: 'male',
//    mail: 'hogehoge@mail.com'
//  },
//  {
//    id: 2,
//    name: 'barbar',
//    live: 'Japan Kanagawa',
//    phone: 'NNN-XXXX-BBBB',
//    gender: 'male',
//    mail: 'barbar@mail.com'
//  },
//  {
//    id: 3,
//    name: 'piypiyo',
//    live: 'Japan Kanagawa',
//    phone: 'NNN-XXXX-PPPP',
//    gender: 'female',
//    mail: 'piypiyo@mail.com'
//  },
//  {
//    id: 4,
//    name: 'fugafuga',
//    live: 'Japan Chiba',
//    phone: 'NNN-XXXX-FFFF',
//    gender: 'male',
//    mail: 'fugafuga@mail.com'
//  },
//  {
//    id: 5,
//    name: 'varvar',
//    live: 'Japan Saitama',
//    phone: 'NNN-XXXX-VVVV',
//    gender: 'female',
//    mail: 'varvar@mail.com'
//  }
//]

console.log("Users.vue:", " users ", users);

export default {
  name: 'UsersInfo',

  components: {
    UserList
  },
  beforeCreate: function() {
    console.log("Users.vue:", " beforeCreate-function(): In.");
//    async function getAccounts2() {
//      console.log("Users.vue:", " getAccounts2(): In.");
// 
////      let response;
////      try {
////        response = await axios.get(url);
////        while (response.status != 200){
////          console.log("Users.vue:", "getAccounts2():", " response.status ", response.status);
////          console.log("Users.vue:", "getAccounts2():", " response.data ", response.data);
////          if (response.status == 200){
////            return response;
////          }
////        }
////      }
////      catch (error) {
////        console.error("Users.vue:", "getAccounts2():", " error ", error);
////        return error;
////      }
//
//      // 非同期処理
//      await axios.get(url)
//      .then((response) => {
//        // 非同期処理が成功した場合
//        console.log("Users.vue:", "getAccounts2():", " response.status ", response.status);
//        console.log("Users.vue:", "getAccounts2():", " response.data ", response.data);
//        users = response.data;
//        console.log("Users.vue:", " At axios.get().then: ", " users ", users);
//        return response;
//      })
//      .catch((error) => {
//        // 非同期処理が失敗した場合
//        console.error("Users.vue:", "getAccounts2():", " error ", error);
//        return error;
//      })
//    }

//    const getAccounts2 = async () => {
//      let response_ga;
////      for (let item of Array) {
//      try {
//        await new Promise((resolve, reject) => {
//          /*await*/ axios.get(url)
//          .then((response) => {
//            // 非同期処理が成功した場合
//            console.log("Users.vue:", "getAccounts2():", " response.status ", response.status);
//            console.log("Users.vue:", "getAccounts2():", " response.data ", response.data);
//            response_ga = response;
//            resolve() // 処理が完了したらPromiseをresolveします
//          })
//          .catch((error) => {
//            // 非同期処理が失敗した場合
//            console.error("Users.vue:", "getAccounts2():", " error ", error);
//            reject(error) // エラーが発生したらPromiseをrejectします
//          })
//        })
//      } catch (err) {
//        // エラーハンドリングをここで行うことができます
//        // または、エラーを外部に伝播させるために再度throwすることもできます
////        throw err
//        console.log("Users.vue:", " Promise().catch: ", " err ", err);
//      }
////    }
//      // 完全に終了した後に実行されます
//      users = response_ga.data;
//      console.log("Users.vue:", " 完全終了: ", " users ", users);
//    }
//
//    // getAccounts2 を呼び出してデータを読み込む
//    getAccounts2();
////    let response_ga = getAccounts2();
////    console.log("Users.vue:", " After getAccounts2(): ", " response_ga ", response_ga);
//
////    users = response_ga.data;
//    console.log("Users.vue:", " After getAccounts2(): ", " users ", users);
  },
  methods: {
    console.log("Users.vue:", " methods: In.");
//    fetchSample: async function(){
//      let ret = null
//      // 非同期処理を記述
////      await axios.get(url, {
////        .then((response) => {
////          console.log("Users.vue:", " methods: ", " axios.get().then: ", " response ", response);
////          ret = response
////        })
////        .catch((error) => {
////          this.errorMsg = 'Error! Could not reach the API. ' + error;
////          console.log("Users.vue:", " methods: ", " axios.get().catch: ", " this.errorMsg ", this.errorMsg);
////        })
////      })
//      await axios.get(url)
//      .then((response) => {
//        console.log("Users.vue:", " methods: ", " axios.get().then: ", " response ", response);
//        ret = response
//      })
//      .catch((error) => {
//        this.errorMsg = 'Error! Could not reach the API. ' + error;
//        console.log("Users.vue:", " methods: ", " axios.get().catch: ", " this.errorMsg ", this.errorMsg);
//      })
//      return ret;
//    },
//    settingXxx: async function(){
//      // this.fetchSample()の実行が完了するまで待機
//      let result = await this.fetchSample()
//      console.log("Users.vue:", " methods: ", " After this.fetchSample(): ", " result ", result); //待機後の残りの処理を記述
//    }
////    let result = this.fetchSample();
////    console.log("Users.vue:", " methods: ", " After this.fetchSample(): ", " result ", result); //待機後の残りの処理を記述
//    settingXxx();
  },
  created: function() {
    console.log("Users.vue:", " created-function(): In.");
  },
  beforeMount: function() {
    console.log("Users.vue:", " beforeMount-function(): In.");
  },
  mounted: function() {
    console.log("Users.vue:", " mounted-function(): In.");
  },
  beforeUpdate: function() {
    console.log("Users.vue:", " beforeUpdate-function(): In.");
  },
  updated: function() {
    console.log("Users.vue:", " updated-function(): In.");
  },
  beforeUnmount: function() {
    console.log("Users.vue:", " beforeUnmount-function(): In.");
  },
  unmounted: function() {
    console.log("Users.vue:", " unmounted-function(): In.");
  },
  data: function() {
    console.log("Users.vue:", " data-function(): In.");
//    console.log("Users.vue:", " Before loop: users === 'undefined': ", " typeof users ", typeof users, " users ", users);
//    while (typeof users === 'undefined'){
//      console.log("Users.vue:", " loop: users === 'undefined'");
//    }
//    console.log("Users.vue:", " After loop: users === 'undefined': ", " typeof users ", typeof users, " users ", users);
    // ここで返却するデータは子コンポーネント `UserList.vue` で表示するユーザ情報
    // 本来ならば DB 等で保持するのだが、今回は記事用のサンプルコードということでリストで持たせている
    return {
      properties: {
        headers: [
//          'id',
//          'name',
//          'live',
//          'phone',
//          'gender',
//          'mail',
          'account_name',
          'password',
          'account_id',
          'email',
        ],
        users: users,
      }
    }
  }
}
</script>

<style module>
.component {
  margin-top: 50px;
}
</style>
