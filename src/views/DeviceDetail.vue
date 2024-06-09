<template>
  <div :class="$style.component">
    <!-- h2>Device details with device_id: {{ $route.params.device_id }}</h2 -->
    <!-- h2>route.params.id: {{ $route.params.id }}</h2 -->
    <!-- h2>route.params.device_id: {{ $route.params.device_id }}</h2 -->
    <!-- h2>Device details of device_id: {{ deviceId }}</h2 -->
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
          <td :class="$style.value">
            {{ $route.params.id }}
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


export default {
  name: 'DeviceDetail',
  data: function() {
    const funcName = [":data:"];
    console.log(fileName, funcName[0], "In.");
    // 返却するオブジェクト devices は本コンポーネントで表示するユーザ情報
    // 本来ならば DB 等で保持するのだが、今回は記事用のサンプルコードということでリストで持たせている
    console.log(fileName, funcName[0], "Before return():");
    return {
//      devices: null/*devices*/,
      properties: {
//        headers: [
//          'dgroup_id',
//          'dgroup_name',
//          'account_id',
//        ],
//        dgroups: null/*dgroups*/,
        devices: null,
      },
//      dgroupId: dgroupId.value,
//      deviceId: deviceId.value,
    }
  },
  beforeCreate: function() {
    const funcName = [":beforeCreate:"];
    console.log(fileName, funcName[0], "In.");

//    async function getDevices(dgroupId) {
    const getDevices = async (dgroupId) => {
      const funcName = [":beforeCreate:", "getDevices():"];
      console.log(fileName, funcName[0], funcName[1], "In.", " dgroupId ", dgroupId);
      let response;

      try {
        response = await axios.get(url + dgroupId);
        console.log(fileName, funcName[0], funcName[1], " response.status ", response.status)
        console.log(fileName, funcName[0], funcName[1], " response.data ", response.data);
        devices = response.data;
        for (let i = 0; i < devices.length; i++) {
          devices[i].id = i;
          this.devices[i] = devices[i];
        }
        console.log(fileName, funcName[0], funcName[1], "After add id:", " devices ", devices);
//        this.devices = devices;
        this.properties.devices = devices;
//        console.log(fileName, funcName[0], funcName[1], "Before return:", " this.devices ", this.devices);
        console.log(fileName, funcName[0], funcName[1], "Before return:", " this.properties ", this.properties);

/*
        this.$router.push({
          name: 'chart',
          params: {
            device_id: this.devices['device_id'],
          }
        })
*/

        return response;
      }
      catch (error) {
        console.error(fileName, funcName[0], funcName[1], " error ", error);
        return error;
      }
    }

    const dgroupId = ref('');
    dgroupId.value = localStorage.getItem('dgroupId');
    console.log(fileName, funcName[0], ":After localStorage.getItem():", " dgroupId.value ", dgroupId.value);

    // getDevices を呼び出してデータを読み込む
    let response_ga = getDevices(dgroupId.value);
    console.log(fileName, funcName[0], ":After getDevices()", " devices ", devices, " response_ga ", response_ga);

//    const deviceId = ref('');
//    deviceId.value = localStorage.getItem('deviceId');
//    console.log(fileName, ":After localStorage.getItem():", " deviceId.value ", deviceId.value);
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
