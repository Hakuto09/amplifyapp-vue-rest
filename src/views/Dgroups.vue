<template>
  <div :class="$style.component">
    <DgroupList :properties="properties" />
  </div>
</template>

<script>
// @ を指定することで `/src` の代替となる
import DgroupList from '@/components/DgroupList.vue'
import axios from 'axios'
//import { /*defineProps,*/ ref } from 'vue';
//import { Amplify } from "aws-amplify";
import { getCurrentUser } from 'aws-amplify/auth';
const fileName = "Dgroups.vue";

console.log(fileName, ":After import: ");

let dgroups;
const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/dgroups/';


export default {
  name: 'Dgroups',

//  props: ['account_id'], //propsオプションで受け取る値の名前を指定
  components: {
    DgroupList
  },
  data: /*async*/ function() {
    console.log(fileName, ":data-function(): In.");

    // 実際にデータを取得する getDgroups 関数
    async function getDgroups(/*userId*/) {
      console.log(fileName, ":getDgroups(): In.");

      console.log(fileName, ":getDgroups():", "Before await getCurrentUser():");
      const { username, userId, signInDetails } = await getCurrentUser();
    //  console.log(fileName, ":getDgroups():", " authUser ", authUser);
      console.log(fileName, ":getDgroups():", "After await getCurrentUser():", " username ", username, " userId ", userId, " signInDetails ", signInDetails);

      let response_api;

      try {
        console.log(fileName, ":getDgroups():", "Before await axios.get()");
        response_api = await axios.get(url + userId);
        console.log(fileName, ":getDgroups():", "After await axios.get()", " response_api.status ", response_api.status);
        console.log(fileName, ":getDgroups():", " response_api.data ", response_api.data);
        dgroups = response_api.data;
        for (let i = 0; i < dgroups.length; i++) {
          dgroups[i].id = i;
        }
        console.log(fileName, ":getDgroups():", " dgroups ", dgroups);
        return response_api;
      }
      catch (error) {
        console.error(fileName, ":getDgroups():", " error ", error);
        return error;
      }
    }

    //  if (userId) {
    const ret = getDgroups(/*userId*/);
    console.log(fileName, ":data-function():", "After getDgroups():", " ret ", ret);
//  }

    // ここで返却するデータは子コンポーネント `DgroupList.vue` で表示するユーザ情報
    // 本来ならば DB 等で保持するのだが、今回は記事用のサンプルコードということでリストで持たせている
//    let account_id = ref('')
//    console.log(fileName, ":data-function():", " account_id ", account_id);
//    console.log(fileName, ":data-function():", " this.account_id ", this.account_id);

    console.log(fileName, ":data-function():", "Before return():", " dgroups ", dgroups);
    return {
      properties: {
        headers: [
          'dgroup_id',
          'dgroup_name',
          'account_id',
        ],
        dgroups: dgroups,
//        account_id: this.account_id,
      }
    }
  },
  methods: function() {
//    let account_id = ref('')
//    console.log(fileName, ":methods-function():", " account_id ", account_id);
    console.log(fileName, ":methods-function():", " this.account_id ", this.account_id);
  },
  beforeCreate: function() {
    console.log(fileName, ":beforeCreate-function(): In.");
    let userId/* = { username, userId, signInDetails }*/; 
    async () => {
      console.log(fileName, ":beforeCreate-function():", "Before await getCurrentUser():");
      userId = await getCurrentUser();
      console.log(fileName, ":beforeCreate-function():", "After await getCurrentUser():", " userId ", userId);
    }
    console.log(fileName, ":beforeCreate-function(): Mid.");
    let response_api;
    async () => {
      console.log(fileName, ":beforeCreate-function():", "Before await axios.get():");
      response_api = await axios.get(url + userId);
      console.log(fileName, ":beforeCreate-function():", "After await axios.get():", " response_api.status ", response_api.status);
    }
    console.log(fileName, ":beforeCreate-function(): Out.");
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
