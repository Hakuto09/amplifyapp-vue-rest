<template>
  <div :class="$style.component">
    <UserList :properties="properties" />
  </div>
</template>

<script>
// @ を指定することで `/src` の代替となる
import UserList from '@/components/UserList.vue'
import axios from 'axios'

axios.get('https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/accounts')
      .then(response => {
        console.log(response.data)
        console.log(response.status)
      })

// 実際にデータを取得する getRequest 関数
async function getRequest() {
  let response;
  try {
    response = await axios.get('https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/accounts');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
// getRequest を呼び出してデータを読み込む
getRequest();

const users = [
  {
    id: 1,
    name: 'hogehoge',
    live: 'Japan Tokyo',
    phone: 'NNN-XXXX-HHHH',
    gender: 'male',
    mail: 'hogehoge@mail.com'
  },
  {
    id: 2,
    name: 'barbar',
    live: 'Japan Kanagawa',
    phone: 'NNN-XXXX-BBBB',
    gender: 'male',
    mail: 'barbar@mail.com'
  },
  {
    id: 3,
    name: 'piypiyo',
    live: 'Japan Kanagawa',
    phone: 'NNN-XXXX-PPPP',
    gender: 'female',
    mail: 'piypiyo@mail.com'
  },
  {
    id: 4,
    name: 'fugafuga',
    live: 'Japan Chiba',
    phone: 'NNN-XXXX-FFFF',
    gender: 'male',
    mail: 'fugafuga@mail.com'
  },
  {
    id: 5,
    name: 'varvar',
    live: 'Japan Saitama',
    phone: 'NNN-XXXX-VVVV',
    gender: 'female',
    mail: 'varvar@mail.com'
  }
]

export default {
  name: 'UsersInfo',

  components: {
    UserList
  },
  data: function() {
    // ここで返却するデータは子コンポーネント `UserList.vue` で表示するユーザ情報
    // 本来ならば DB 等で保持するのだが、今回は記事用のサンプルコードということでリストで持たせている
    return {
      properties: {
        headers: [
          'id',
          'name',
          'live',
          'phone',
          'gender',
          'mail',
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
