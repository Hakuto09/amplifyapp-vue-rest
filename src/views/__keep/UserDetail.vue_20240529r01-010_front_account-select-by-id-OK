<template>
  <div :class="$style.component">
    <h1>This page is user detail.</h1>
    <div
      :class="$style.userinfo">
      <table>
        <th :class="$style.item">
          ITEM
        </th>
        <th :class="$style.value">
          VALUE
        </th>
        <!-- users のリストにアクセスする際、インデックスは 0 からなので受け取った id の値から `-1` する -->
        <tr
          v-for="(value, name) in users[$route.params.id/* - 1*/]"
          :key="name">
        <!-- tr
          v-for="(value, name) in $route.params"
          :key="name" -->
          <td :class="$style.item">
            {{ name }}
          </td>
          <td :class="$style.value">
            {{ value }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

let users;
const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/accounts';

// 実際にデータを取得する getAccounts 関数
async function getAccounts() {
  console.log("UserDetail.vue:", " getAccounts(): In.");
  let response;

  try {
    response = await axios.get(url);
    console.log("UserDetail.vue:", "getAccounts():", " response.status ", response.status)
    console.log("UserDetail.vue:", "getAccounts():", " response.data ", response.data);
    users = response.data;
    return response;
  }
  catch (error) {
    console.error("UserDetail.vue:", "getAccounts():", " error ", error);
    return error;
  }
}

// getAccounts を呼び出してデータを読み込む
let response_ga = getAccounts();
console.log("UserDetail.vue:", " response_ga ", response_ga);

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

console.log("UserDetail.vue:", " users ", users);

export default {
  name: 'UserDetail',
  data: function() {
    console.log("UserDetail.vue:", "data-function():", " users ", users);
    // 返却するオブジェクト users は本コンポーネントで表示するユーザ情報
    // 本来ならば DB 等で保持するのだが、今回は記事用のサンプルコードということでリストで持たせている
    return {
      users: users,
    }
  }
}
</script>

<style module>
.component {
  margin-top: 50px;
  height: 500px;
  width: 100%;
}

.userinfo {
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.item {
  width: 150px;
}

.value {
  width: 400px;
}
</style>
