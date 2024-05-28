<template>
  <div :class="$style.component">
    <UserList :properties="properties" />
  </div>
</template>

<script>
// @ を指定することで `/src` の代替となる
import UserList from '@/components/UserList.vue'
import axios from 'axios'

//axios.get('https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/accounts')
//      .then(response => {
//        console.log(response.data)
//        console.log(response.status)
//      })

// 実際にデータを取得する getAccounts 関数
async function getAccounts() {
  console.log("Users.vue:", " getAccounts(): In.");
  let response;

  try {
    response = await axios.get('https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/accounts');
    console.log("getAccounts():", " response.status ", response.status)
    console.log("getAccounts():", " response.data ", response.data);
    return response;
  }
  catch (error) {
    console.error("getAccounts():", " error ", error);
    return error;
  }
}

// getAccounts を呼び出してデータを読み込む
let response_ga = getAccounts();
console.log("Users.vue:", " response_ga ", response_ga);

let users = response_ga.data;

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
    async function getAccounts2() {
      console.log("Users.vue:", " getAccounts2(): In.");
      let response;

      try {
        response = await axios.get('https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/accounts');
        while (response.status != 200){
          console.log("getAccounts2():", " response.status ", response.status);
          console.log("getAccounts2():", " response.data ", response.data);
          if (response.status == 200){
            return response;
          }
        }
      }
      catch (error) {
        console.error("getAccounts2():", " error ", error);
        return error;
      }
    }

    // getAccounts2 を呼び出してデータを読み込む
    let response_ga = getAccounts2();
    console.log("Users.vue:", " After getAccounts2(): ", " response_ga ", response_ga);

    users = response_ga.data;
    console.log("Users.vue:", " After getAccounts2(): ", " users ", users);
  },
  data: function() {
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
