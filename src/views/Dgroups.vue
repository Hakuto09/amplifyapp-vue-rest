<template>
  <div :class="$style.component">
    <DgroupList :properties="properties" />
  </div>
</template>

<script>
// @ を指定することで `/src` の代替となる
import DgroupList from '@/components/DgroupList.vue'
import axios from 'axios'
import { defineProps, ref } from 'vue';

const props = defineProps({
  message: String,
})
const parentData = ref(props.defineProps);
console.log("Dgroups.vue:", "After reg(prop):", " parentData.value ", parentData.value);

let dgroups;
const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/dgroups/';

// 実際にデータを取得する getDgroups 関数
async function getDgroups() {
  console.log("Dgroups.vue:", " getDgroups(): In.");
  let response_api;

  try {
//    response_api = await axios.get(url + properties.account_id);
    response_api = await axios.get(url + parentData.value);
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

// getDgroups を呼び出してデータを読み込む
let ret = getDgroups();
console.log("Dgroups.vue:", "After getDgroups():", " ret ", ret);

export default {
  name: 'Dgroups',

  props: ['message'], //propsオプションで受け取る値の名前を指定
  components: {
    DgroupList
  },
  data: function() {
    console.log("Dgroups.vue:", " data-function(): In.");
    // ここで返却するデータは子コンポーネント `DgroupList.vue` で表示するユーザ情報
    // 本来ならば DB 等で保持するのだが、今回は記事用のサンプルコードということでリストで持たせている
    return {
      properties: {
        headers: [
          'dgroup_id',
          'dgroup_name',
          'account_id',
        ],
        dgroups: dgroups,
        message: parentData,
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
