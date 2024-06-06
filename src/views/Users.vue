<template>
  <div :class="$style.component">
    <UserList :properties="properties" />
  </div>
</template>

<script>
// @ を指定することで `/src` の代替となる
import UserList from '@/components/UserList.vue'
import axios from 'axios'
const fileName = "Users.vue";

let users;
const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/accounts';

// 実際にデータを取得する getAccounts 関数
async function getAccounts() {
  console.log(fileName, ":getAccounts(): In.");
  let response;

  try {
    response = await axios.get(url);
    console.log(fileName, ":getAccounts():", " response.status ", response.status)
    console.log(fileName, ":getAccounts():", " response.data ", response.data);
    users = response.data;
    for (let i = 0; i < users.length; i++) {
      users[i].id = i;
    }
    console.log(fileName, ":getAccounts():", " users ", users);
    return response;
  }
  catch (error) {
    console.error(fileName, ":getAccounts():", " error ", error);
    return error;
  }
}

// getAccounts を呼び出してデータを読み込む
let response_ga = getAccounts();
console.log(fileName, ":response_ga ", response_ga);

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

console.log(fileName, ":users ", users);

export default {
  name: 'UsersInfo',

  components: {
    UserList
  },
  beforeCreate: function() {
    console.log(fileName, ":beforeCreate-function(): In.");
//    async function getAccounts2() {
//      console.log(fileName, ":getAccounts2(): In.");
// 
////      let response;
////      try {
////        response = await axios.get(url);
////        while (response.status != 200){
////          console.log(fileName, ":getAccounts2():", " response.status ", response.status);
////          console.log(fileName, ":getAccounts2():", " response.data ", response.data);
////          if (response.status == 200){
////            return response;
////          }
////        }
////      }
////      catch (error) {
////        console.error(fileName, ":getAccounts2():", " error ", error);
////        return error;
////      }
//
//      // 非同期処理
//      await axios.get(url)
//      .then((response) => {
//        // 非同期処理が成功した場合
//        console.log(fileName, ":getAccounts2():", " response.status ", response.status);
//        console.log(fileName, ":getAccounts2():", " response.data ", response.data);
//        users = response.data;
//        console.log(fileName, ":At axios.get().then: ", " users ", users);
//        return response;
//      })
//      .catch((error) => {
//        // 非同期処理が失敗した場合
//        console.error(fileName, ":getAccounts2():", " error ", error);
//        return error;
//      })
//    }
//
//    const getAccounts2 = async () => {
//      let response_ga;
////      for (let item of Array) {
//      try {
//        await new Promise((resolve, reject) => {
//          /*await*/ axios.get(url)
//          .then((response) => {
//            // 非同期処理が成功した場合
//            console.log(fileName, ":getAccounts2():", " response.status ", response.status);
//            console.log(fileName, ":getAccounts2():", " response.data ", response.data);
//            response_ga = response;
//            resolve() // 処理が完了したらPromiseをresolveします
//          })
//          .catch((error) => {
//            // 非同期処理が失敗した場合
//            console.error(fileName, ":getAccounts2():", " error ", error);
//            reject(error) // エラーが発生したらPromiseをrejectします
//          })
//        })
//      } catch (err) {
//        // エラーハンドリングをここで行うことができます
//        // または、エラーを外部に伝播させるために再度throwすることもできます
////        throw err
//        console.log(fileName, ":Promise().catch: ", " err ", err);
//      }
////    }
//      // 完全に終了した後に実行されます
//      users = response_ga.data;
//      console.log(fileName, ":完全終了: ", " users ", users);
//    }
//
//    // getAccounts2 を呼び出してデータを読み込む
//    getAccounts2();
////    let response_ga = getAccounts2();
////    console.log(fileName, ":After getAccounts2(): ", " response_ga ", response_ga);
//
////    users = response_ga.data;
//    console.log(fileName, ":After getAccounts2(): ", " users ", users);
  },
//  methods: {
//    console.log(fileName, ":methods: In.");
//    fetchSample: async function(){
//      let ret = null
//      // 非同期処理を記述
////      await axios.get(url, {
////        .then((response) => {
////          console.log(fileName, ":methods: ", " axios.get().then: ", " response ", response);
////          ret = response
////        })
////        .catch((error) => {
////          this.errorMsg = 'Error! Could not reach the API. ' + error;
////          console.log(fileName, ":methods: ", " axios.get().catch: ", " this.errorMsg ", this.errorMsg);
////        })
////      })
//      await axios.get(url)
//      .then((response) => {
//        console.log(fileName, ":methods: ", " axios.get().then: ", " response ", response);
//        ret = response
//      })
//      .catch((error) => {
//        this.errorMsg = 'Error! Could not reach the API. ' + error;
//        console.log(fileName, ":methods: ", " axios.get().catch: ", " this.errorMsg ", this.errorMsg);
//      })
//      return ret;
//    },
//    settingXxx: async function(){
//      // this.fetchSample()の実行が完了するまで待機
//      let result = await this.fetchSample()
//      console.log(fileName, ":methods: ", " After this.fetchSample(): ", " result ", result); //待機後の残りの処理を記述
//    }
////    let result = this.fetchSample();
////    console.log(fileName, ":methods: ", " After this.fetchSample(): ", " result ", result); //待機後の残りの処理を記述
//    settingXxx();
//  },
  created: function() {
    console.log(fileName, ":created-function(): In.");
  },
  beforeMount: function() {
    console.log(fileName, ":beforeMount-function(): In.");
  },
  mounted: function() {
    console.log(fileName, ":mounted-function(): In.");
  },
  beforeUpdate: function() {
    console.log(fileName, ":beforeUpdate-function(): In.");
  },
  updated: function() {
    console.log(fileName, ":updated-function(): In.");
  },
  beforeUnmount: function() {
    console.log(fileName, ":beforeUnmount-function(): In.");
  },
  unmounted: function() {
    console.log(fileName, ":unmounted-function(): In.");
  },
  data: function() {
    console.log(fileName, ":data-function(): In.");
//    console.log(fileName, ":Before loop: users === 'undefined': ", " typeof users ", typeof users, " users ", users);
//    while (typeof users === 'undefined'){
//      console.log(fileName, ":loop: users === 'undefined'");
//    }
//    console.log(fileName, ":After loop: users === 'undefined': ", " typeof users ", typeof users, " users ", users);
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
          'account_id',
          'account_name',
          'password',
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
