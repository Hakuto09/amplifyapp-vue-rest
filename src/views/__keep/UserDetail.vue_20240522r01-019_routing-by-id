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
          v-for="(value, name) in users[$route.params.id - 1]"
          :key="name">
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
export default {
  name: 'UserDetail',
  data: function () {
    // 返却するオブジェクト users は本コンポーネントで表示するユーザ情報
    // 本来ならば DB 等で保持するのだが、今回は記事用のサンプルコードということでリストで持たせている
    return {
      users: [
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
      ],
    }
  }
}
</script>

// スタイルは割愛
