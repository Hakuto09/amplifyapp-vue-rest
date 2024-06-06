<template>
  <div :class="$style.component">
    <!-- h2>Device details with device_id: {{ $route.params.device_id }}</h2 -->
    <h2>Device details of device_id: {{ deviceId }}</h2>
    <div
      :class="$style.deviceinfo">
      <table>
        <th :class="$style.item">
          ITEM
        </th>
        <th :class="$style.value">
          VALUE
        </th>
        <!-- devices のリストにアクセスする際、インデックスは 0 からなので受け取った id の値から `-1` する -->
        <tr
          v-for="(value, name) in devices[$route.params.id/* - 1*/]"
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
import axios from 'axios'
import { /*defineProps,*/ ref } from 'vue';
const fileName = "DeviceDetail.vue";

console.log(fileName, ":After import:");

let devices;
const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/_devices/';

// 実際にデータを取得する getDevices 関数
async function getDevices(dgroupId) {
  console.log(fileName, ":getDevices(): In.", " dgroupId ", dgroupId);
  let response;

  try {
    response = await axios.get(url + dgroupId);
    console.log(fileName, ":getDevices():", " response.status ", response.status)
    console.log(fileName, ":getDevices():", " response.data ", response.data);
    devices = response.data;
    return response;
  }
  catch (error) {
    console.error(fileName, ":getDevices():", " error ", error);
    return error;
  }
}

export default {
  name: 'DeviceDetail',
  data: function() {
    console.log(fileName, ":data-function():", " devices ", devices);
    // 返却するオブジェクト devices は本コンポーネントで表示するユーザ情報
    // 本来ならば DB 等で保持するのだが、今回は記事用のサンプルコードということでリストで持たせている

    const dgroupId = ref('');
    dgroupId.value = localStorage.getItem('dgroupId');
    console.log(fileName, ":After localStorage.getItem():", " dgroupId.value ", dgroupId.value);

    // getDevices を呼び出してデータを読み込む
    let response_ga = getDevices(dgroupId.value);
    console.log(fileName, ":After getDevices()", " devices ", devices, " response_ga ", response_ga);

    const deviceId = ref('');
    deviceId.value = localStorage.getItem('deviceId');
    console.log(fileName, ":After localStorage.getItem():", " deviceId.value ", deviceId.value);

    console.log(fileName, ":data-function():", "Before return():", " devices ", devices, " dgroupId.value ", dgroupId.value, " deviceId.value ", deviceId.value);
    return {
      devices: devices,
      dgroupId: dgroupId.value,
      deviceId: deviceId.value,
    }
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
  height: 500px;
  width: 100%;
}

.deviceinfo {
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
