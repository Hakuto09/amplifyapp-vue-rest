<template>
  <div :class="$style.component">
    <DeviceList :properties="properties" />
  </div>
</template>

<script>
// @ を指定することで `/src` の代替となる
import DeviceList from '@/components/DeviceList.vue'
import axios from 'axios'
import { /*defineProps,*/ ref } from 'vue';
//import { Amplify } from "aws-amplify";
//import { getCurrentUser } from 'aws-amplify/auth';

console.log("Devices.vue:", " After import: ");

/*
const props = defineProps({
  message: String,
})
const parentData = ref(props.defineProps);
console.log("Devices.vue:", "After reg(prop):", " parentData.value ", parentData.value);
*/

let devices;
const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/_devices/';

// 実際にデータを取得する getDevices 関数
async function getDevices(dgroupId) {
  console.log("Devices.vue:", " getDevices(): In.", " dgroupId ", dgroupId);

//  let authUser = await Amplify.Auth.getCurrentUser();
//  let authUser = await getCurrentUser();
//const { username, userId, signInDetails } = await getCurrentUser();
//  console.log("Devices.vue:", "getDevices():", " authUser ", authUser);
//console.log("Devices.vue:", "getDevices():", " username ", username, " userId ", userId, " signInDetails ", signInDetails);

  let response_api;

  try {
//    response_api = await axios.get(url + properties.account_id);
//    response_api = await axios.get(url + this.account_id);
    response_api = await axios.get(url + dgroupId);
    console.log("Devices.vue:", "getDevices():", " response_api.status ", response_api.status)
    console.log("Devices.vue:", "getDevices():", " response_api.data ", response_api.data);
    devices = response_api.data;
    for (let i = 0; i < devices.length; i++) {
      devices[i].id = i;
    }
    console.log("Devices.vue:", "getDevices():", " devices ", devices);
    return response_api;
  }
  catch (error) {
    console.error("Devices.vue:", "getDevices():", " error ", error);
    return error;
  }
}

// getDevices を呼び出してデータを読み込む
//let ret = getDevices();
//console.log("Devices.vue:", "After getDevices():", " ret ", ret);

export default {
  name: 'Devices',

//  props: ['account_id'], //propsオプションで受け取る値の名前を指定
  components: {
    DeviceList
  },
  data: /*async*/ function() {
    console.log("Devices.vue:", " data-function(): In.");

    const dgroupId = ref('');
    dgroupId.value = localStorage.getItem('dgroupId');
    console.log("Devices.vue:", "After localStorage.getItem():", " dgroupId.value ", dgroupId.value);

    const ret = getDevices(dgroupId.value);
    console.log("Devices.vue:", "data-function():", "After getDevices():", " ret ", ret);

    // ここで返却するデータは子コンポーネント `DeviceList.vue` で表示するユーザ情報
    // 本来ならば DB 等で保持するのだが、今回は記事用のサンプルコードということでリストで持たせている
    console.log("Devices.vue:", "data-function():", "Before return():", " devices ", devices);
    return {
      properties: {
        headers: [
          'device_id',
          'device_name',
          'dgroup_id',
        ],
        devices: devices,
      }
    }
  },
  methods: function() {
//    let account_id = ref('')
//    console.log("Devices.vue:", "methods-function():", " account_id ", account_id);
    console.log("Devices.vue:", "methods-function():", " this.account_id ", this.account_id);
  }
}
</script>

<style module>
.component {
  margin-top: 50px;
}
</style>
