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
const fileName = "Devices.vue";

console.log(fileName, ":After import:");

/*
const props = defineProps({
  message: String,
})
const parentData = ref(props.defineProps);
console.log(fileName, ":After reg(prop):", " parentData.value ", parentData.value);
*/

let devices;
const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/_devices/';

// 実際にデータを取得する getDevices 関数
async function getDevices(dgroupId) {
  console.log(fileName, ": getDevices(): In.", " dgroupId ", dgroupId);

//  let authUser = await Amplify.Auth.getCurrentUser();
//  let authUser = await getCurrentUser();
//const { username, userId, signInDetails } = await getCurrentUser();
//  console.log(fileName, ":getDevices():", " authUser ", authUser);
//console.log(fileName, ":getDevices():", " username ", username, " userId ", userId, " signInDetails ", signInDetails);

  let response_api;

  try {
//    response_api = await axios.get(url + properties.account_id);
//    response_api = await axios.get(url + this.account_id);
    response_api = await axios.get(url + dgroupId);
    console.log(fileName, ":getDevices():", " response_api.status ", response_api.status)
    console.log(fileName, ":getDevices():", " response_api.data ", response_api.data);
    devices = response_api.data;
    for (let i = 0; i < devices.length; i++) {
      devices[i].id = i;
    }
    console.log(fileName, ":getDevices():", " devices ", devices);
    return response_api;
  }
  catch (error) {
    console.error(fileName, ":getDevices():", " error ", error);
    return error;
  }
}

// getDevices を呼び出してデータを読み込む
//let ret = getDevices();
//console.log(fileName, ":After getDevices():", " ret ", ret);

export default {
  name: 'Devices',

//  props: ['account_id'], //propsオプションで受け取る値の名前を指定
  components: {
    DeviceList
  },
  data: /*async*/ function() {
    console.log(fileName, ": data-function(): In.");

    const dgroupId = ref('');
    dgroupId.value = localStorage.getItem('dgroupId');
    console.log(fileName, ":After localStorage.getItem():", " dgroupId.value ", dgroupId.value);

    const ret = getDevices(dgroupId.value);
    console.log(fileName, ":data-function():", "After getDevices():", " ret ", ret);

    // ここで返却するデータは子コンポーネント `DeviceList.vue` で表示するユーザ情報
    // 本来ならば DB 等で保持するのだが、今回は記事用のサンプルコードということでリストで持たせている
    console.log(fileName, ":data-function():", "Before return():", " devices ", devices);
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
//    console.log(fileName, ":methods-function():", " account_id ", account_id);
    console.log(fileName, ":methods-function():", " this.account_id ", this.account_id);
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
