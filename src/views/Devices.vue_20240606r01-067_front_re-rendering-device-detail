<template>
  <div :class="$style.component">
    <h2>Device list of dgroup_id: {{ dgroup_id }}</h2>
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


export default {
  name: 'Devices',

//  props: ['account_id'], //propsオプションで受け取る値の名前を指定
  components: {
    DeviceList
  },
  data: /*async*/ function() {
    const funcName = [":data:"];
    console.log(fileName, funcName[0], "In.");

//    const dgroupId = ref('');
//    dgroupId.value = localStorage.getItem('dgroupId');
//    console.log(fileName, ":After localStorage.getItem():", " dgroupId.value ", dgroupId.value);

//    const ret = getDevices(dgroupId.value);
//    console.log(fileName, ":data-function():", "After getDevices():", " ret ", ret);

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
        devices: null/*devices*/,
      },
      dgroup_id: 0,
    }
  },
  methods: function() {
//    let account_id = ref('')
//    console.log(fileName, ":methods-function():", " account_id ", account_id);
    console.log(fileName, ":methods-function():", " this.account_id ", this.account_id);
  },
  beforeCreate: function() {
    const funcName = [":beforeCreate:"];
    console.log(fileName, funcName[0], "In.");

//    async function getDevices(dgroupId) {
    const getDevices = async (dgroupId) => {
      const funcName = [":beforeCreate:", "getDevices:"];
      console.log(fileName, funcName[0], funcName[1], "In.", " dgroupId ", dgroupId);

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
//        console.log(fileName, funcName[0], funcName[1], " response_api.status ", response_api.status)
        console.log(fileName, funcName[0], funcName[1], "After axios.get():", " response_api.data ", response_api.data);
        devices = response_api.data;
        for (let i = 0; i < devices.length; i++) {
          devices[i].id = i;
        }
        console.log(fileName, funcName[0], funcName[1], "After add id:", " devices ", devices);
        this.properties.devices = devices;
        this.dgroup_id = dgroupId;
        console.log(fileName, funcName[0], funcName[1], "Before return:", " this.properties ", this.properties, " this.dgroup_id ", this.dgroup_id);
        return response_api;
      }
      catch (error) {
        console.error(fileName, funcName[0], funcName[1], " error ", error);
        return error;
      }
    }

    const dgroupId = ref('');
    dgroupId.value = localStorage.getItem('dgroupId');
    console.log(fileName, funcName[0], "After localStorage.getItem():", " dgroupId.value ", dgroupId.value);

    const ret = getDevices(dgroupId.value);
    console.log(fileName, funcName[0], "After getDevices():", " ret ", ret);
  },
  created: function() {
    const funcName = [":created:"];
    console.log(fileName, funcName[0], "In.");
  },
  beforeMount: function() {
    const funcName = [":beforeMount:"];
    console.log(fileName, funcName[0], "In.");
  },
  mounted: function() {
    const funcName = [":mounted:"];
    console.log(fileName, funcName[0], "In.");
  },
  beforeUpdate: function() {
    const funcName = [":beforeUpdate:"];
    console.log(fileName, funcName[0], "In.");
  },
  updated: function() {
    const funcName = [":updated:"];
    console.log(fileName, funcName[0], "In.");
  },
  beforeUnmount: function() {
    const funcName = [":beforeUnmount:"];
    console.log(fileName, funcName[0], "In.");
  },
  unmounted: function() {
    const funcName = [":unmounted:"];
    console.log(fileName, funcName[0], "In.");
  },
}
</script>

<style module>
.component {
  margin-top: 50px;
}
</style>
