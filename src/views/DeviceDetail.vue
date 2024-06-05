<template>
  <div :class="$style.component">
    <!-- h2>Device details with device_id: {{ $route.params.device_id }}</h2 -->
    <h2>Device details with device_id: {{ deviceId }}</h2>
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
const fileName = "Devices.vue";

console.log(fileName, ":After import:");

let devices;
const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/_devices/';

export default {
  name: 'DeviceDetail',
  data: function() {
    console.log("DeviceDetail.vue:", "data-function():", " devices ", devices);
    // 返却するオブジェクト devices は本コンポーネントで表示するユーザ情報
    // 本来ならば DB 等で保持するのだが、今回は記事用のサンプルコードということでリストで持たせている

    // 実際にデータを取得する getDevices 関数
    async function getDevices(dgroupId) {
      console.log("DeviceDetail.vue:", " getDevices(): In.", " dgroupId ", dgroupId);
      let response;

      try {
        response = await axios.get(url + dgroupId);
        console.log("DeviceDetail.vue:", "getDevices():", " response.status ", response.status)
        console.log("DeviceDetail.vue:", "getDevices():", " response.data ", response.data);
        devices = response.data;
        return response;
      }
      catch (error) {
        console.error("DeviceDetail.vue:", "getDevices():", " error ", error);
        return error;
      }
    }

    const dgroupId = ref('');
    dgroupId.value = localStorage.getItem('dgroupId');
    console.log("DeviceDetail.vue:", "After localStorage.getItem():", " dgroupId.value ", dgroupId.value);

    // getDevices を呼び出してデータを読み込む
    let response_ga = getDevices(dgroupId.value);
    console.log("DeviceDetail.vue:", "After getDevices()", " devices ", devices, " response_ga ", response_ga);

    const deviceId = ref('');
    deviceId.value = localStorage.getItem('deviceId');
    console.log("DeviceDetail.vue:", "After localStorage.getItem():", " deviceId.value ", deviceId.value);

    return {
      devices: devices,
      dgroupId: dgroupId.value,
      deviceId: deviceId.value,
    }
  }
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
