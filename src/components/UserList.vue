<template>
  <div>
    <h1>This page is user list.</h1>
    <div :class="$style.userlist">
      <table>
        <thead>
          <tr>
            <th><input :class="$style.headerRadio" type="radio" @click="select"></th>
            <th v-for="(header, index) in properties.headers" v-bind:key="index">
              {{header}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in properties.users" v-bind:key="user.id">
          <!-- tr v-for="user in properties.users" v-bind:key="user.account_id" -->
            <td><input type="radio" :value="user" v-model="selected"></td>
            <!-- td>{{user.id}}</td -->
            <!-- td>{{user.name}}</td -->
            <!-- td>{{user.live}}</td -->
            <!-- td>{{user.phone}}</td -->
            <!-- td>{{user.gender}}</td -->
            <!-- td>{{user.mail}}</td -->
            <td>{{user.account_id}}</td>
            <td>{{user.account_name}}</td>
            <td>{{user.password}}</td>
            <td>{{user.email}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div :class="$style.showmore">
      <button
        type="is-info"
        @click="showMoreInformation">
        Show more selected...
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
const fileName = "UserList.vue";

console.log(fileName, ": After import: ");

export default {
  name: 'UserList',
  props: {
    properties: {
      type: Object,
      'default': () => { return null },
    }
  },
  data: function() {
    return {
      selected: null,
    }
  },
  methods: {
    select: function() {
      this.selected = []
      console.log(fileName, ":select-function(): In:", " this.selected ", this.selected, " this.items ", this.items, " this.item ", this.item);
      for (let i in this.item) {
        this.selected.push(this.items[i].id)
//        this.selected.push(this.items[i].account_id)
        console.log(fileName, ":select-function(): for loop:", " this.selected ", this.selected, " this.items[i] ", this.items[i]);
      }
    },
    showMoreInformation: function() {
      const inputText = ref('');
      inputText.value = localStorage.getItem('inputText');
      console.log(fileName, ":After localStorage.getItem():", " inputText.value ", inputText.value);

      // アロー関数で定義すると `this` で `selected` が参照できない｡
      // 詳細は https://qiita.com/_Keitaro_/items/d48733a19c10889e2365 を参照のこと｡
      if (!this.selected) {
        alert('No data selected...')
        return false
      }
      const selected = this.selected
      console.log(fileName, ":showMoreInformation():", " this ", this);
//      console.log(fileName, ":showMoreInformation():", " this.selectedIndex ", this.selectedIndex);
//      console.log(fileName, ":showMoreInformation():", " this.select.selectedIndex ", this.select.selectedIndex);
      console.log(fileName, ":showMoreInformation():", " selected ", selected);
      this.$router.push({
        name: 'user-detail',
        params: {
          id: selected['id']
//          account_id: selected['account_id'],
//          account_name: selected['account_name'],
//          password: selected['password'],
//          email: selected['email'],
        }
      })
    }
  }
}
</script>

<style module>

.userlist {
  margin: auto;
  width: 100%;
  /* 子要素を中央に配置する */
  display: flex;
  justify-content: center;
  align-items: center;
}

.usertable {
  border: solid 1px;
  width: 90%;
  border-collapse: collapse;
  /* 子要素を中央に配置する */
  justify-content: center;
  align-items: center;
}

.headerRadio {
  opacity:0;
}
</style>

