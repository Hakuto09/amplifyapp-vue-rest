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
  },
  beforeCreate: function() {
    console.log(fileName, ":beforeCreate-function(): In.");
  },
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
}
</script>

<style module>
.component {
  margin-top: 50px;
}
</style>
