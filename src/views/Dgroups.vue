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

console.log("Dgroups.vue:", " After import: ");

let dgroups;
const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/dgroups/';


export default {
  name: 'Dgroups',

//  props: ['account_id'], //propsオプションで受け取る値の名前を指定
  components: {
    DgroupList
  },
  data: /*async*/ function() {
    console.log("Dgroups.vue:", " data-function(): In.");

//  if (userId) {
    const ret = this.getDgroups(/*userId*/);
    console.log("Dgroups.vue:", "data-function():", "After getDgroups():", " ret ", ret);
//  }

    // ここで返却するデータは子コンポーネント `DgroupList.vue` で表示するユーザ情報
    // 本来ならば DB 等で保持するのだが、今回は記事用のサンプルコードということでリストで持たせている
//    let account_id = ref('')
//    console.log("Dgroups.vue:", "data-function():", " account_id ", account_id);
//    console.log("Dgroups.vue:", "data-function():", " this.account_id ", this.account_id);
    console.log("Dgroups.vue:", "data-function():", "Before return():", " dgroups ", dgroups);
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
//    console.log("Dgroups.vue:", "methods-function():", " account_id ", account_id);
    console.log("Dgroups.vue:", "methods-function():", " this.account_id ", this.account_id);

    // 実際にデータを取得する getDgroups 関数
    async function getDgroups(/*userId*/) {
      console.log("Dgroups.vue:", " getDgroups(): In.");

    //  let authUser = await Amplify.Auth.getCurrentUser();
    //  let authUser = await getCurrentUser();
      const { username, userId, signInDetails } = await getCurrentUser();
    //  console.log("Dgroups.vue:", "getDgroups():", " authUser ", authUser);
      console.log("Dgroups.vue:", "getDgroups():", " username ", username, " userId ", userId, " signInDetails ", signInDetails);

      let response_api;

      try {
    //    response_api = await axios.get(url + properties.account_id);
    //    response_api = await axios.get(url + this.account_id);
        response_api = await axios.get(url + userId);
        console.log("Dgroups.vue:", "getDgroups():", " response_api.status ", response_api.status)
        console.log("Dgroups.vue:", "getDgroups():", " response_api.data ", response_api.data);
        dgroups = response_api.data;
        for (let i = 0; i < dgroups.length; i++) {
          dgroups[i].id = i;
        }
        console.log("Dgroups.vue:", "getDgroups():", " dgroups ", dgroups);
        return response_api;
      }
      catch (error) {
        console.error("Dgroups.vue:", "getDgroups():", " error ", error);
        return error;
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
