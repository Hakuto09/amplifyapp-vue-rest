<template>
  <div :class="$style.component">
    <!-- h2>Device details with device_id: {{ $route.params.device_id }}</h2 -->
    <!-- h2>route.params.id: {{ $route.params.id }}</h2 -->
    <!-- h2>route.params.device_id: {{ $route.params.device_id }}</h2 -->
    <!-- h2>Device details of device_id: {{ deviceId }}</h2 -->
    <div
      :class="$style.deviceinfo">
      <table>
        <th :class="$style.item">ITEM</th>
        <th :class="$style.value">VALUE</th>
        <!-- devices のリストにアクセスする際、インデックスは 0 からなので受け取った id の値から `-1` する -->
        <!-- tr
          v-for="(value, name) in properties.devices[$route.params.id/* - 1*/]"
          :key="name">
          <td :class="$style.item">
            {{ name }}
          </td>
          <td :class="$style.value">
            {{ value }}
          </td>
        </tr -->
        <tr>
          <td :class="$style.item">device_name</td>
          <td :class="$style.value">{{ device_name }}</td>
        </tr>
        <tr>
          <td :class="$style.item">device_id</td>
          <td :class="$style.value">{{ device_id }}</td>
        </tr>
      </table>
    </div>
    <br><br>
    <div :class="$style.show_chart">
      <button
        type="is-info"
        @click="showChart">
        Show chart
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { /*defineProps,*/ ref } from 'vue';
import { useRoute } from 'vue-router'
import { getCurrentInstance } from 'vue';
const fileName = "DeviceDetail.vue";

console.log(fileName, ":After import:");

let currentInstance;
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
//          'device_id',
//          'device_name',
//          'dgroup_id',
//        ],
//        dgroups: null/*dgroups*/,
//        devices: null,
        devices: {
          device_id: "0",
          device_name: "0",
          dgroup_id: "0",
          id: 0,
        }
      },
//      dgroupId: dgroupId.value,
//      deviceId: deviceId.value,
      device_name: '',
      device_id: '',
    }
  },
  methods: {
    showChart: function() {
      const funcName = [":methods:", "showChart:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

      this.$router.push({
        name: 'chart',
      })
    }
  },
  beforeCreate: function() {
    const funcName = [":beforeCreate:"];
    console.log(fileName, funcName[0], "In.");

    currentInstance = getCurrentInstance();
    console.log(fileName, funcName[0], "After getCurrentInstance():", " currentInstance ", currentInstance);

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
        devices.sort( function(a, b) {
          return a.device_name > b.device_name ? 1 : -1;
        });
        console.log(fileName, funcName[0], funcName[1], "After devices.sort():", " devices ", devices);
        for (let i = 0; i < devices.length; i++) {
          devices[i].id = i;
//          this.devices[i] = devices[i];
        }
        console.log(fileName, funcName[0], funcName[1], "After add id:", " devices ", devices);
/*
        const order = ['device_name', 'device_id', 'dgroup_id', 'id'];
        const orderChangedDevices = [];
        for (let i = 0; i < devices.length; i++) {
//          orderChangedDevices.push(order.map(x => {
//            return order[x] + ":" + devices[i][x];
//          }))
          orderChangedDevices.push(order.map(key => [key.toString(), devices[i][key]]));
        }
        console.log(fileName, funcName[0], funcName[1], "After order change:", " devices ", devices, " orderChangedDevices ", orderChangedDevices);
*/
//        this.devices = devices;
        this.properties.devices = devices;
//        this.properties.devices = orderChangedDevices;
//        console.log(fileName, funcName[0], funcName[1], "Before return:", " this.devices ", this.devices);
        console.log(fileName, funcName[0], funcName[1], "Before return:", " this.properties ", this.properties);

        currentInstance.proxy.$forceUpdate();
        console.log(fileName, funcName[0], funcName[1], "After instance.proxy.forceUpdate():", " currentInstance ", currentInstance);

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
        console.error(fileName, funcName[0], funcName[1], "catch for axios.get(dgroupId):", " error ", error);
        return error;
      }
    }

    const dgroupInfo = ref('');
    const dgroupId = ref('');
//    dgroupId.value = localStorage.getItem('dgroupId');
//    dgroupInfo.value = localStorage.getItem('dgroupInfo');
    dgroupInfo.value = JSON.parse(localStorage.getItem('dgroupInfo'));
    dgroupId.value = dgroupInfo.value['dgroup_id'];
//    console.log(fileName, funcName[0], funcName[1], "After localStorage.getItem():", " dgroupId.value ", dgroupId.value);
    console.log(fileName, funcName[0], "After localStorage.getItem():", " dgroupId.value ", dgroupId.value, ' dgroupInfo.value ', dgroupInfo.value);

    // getDevices を呼び出してデータを読み込む
    let response_ga = getDevices(dgroupId.value);
    console.log(fileName, funcName[0], ":After getDevices():", " devices ", devices, " response_ga ", response_ga);

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

    const route = useRoute();
    console.log(fileName, funcName[0], funcName[1], "After useRoute():", " route ", route);
    const id = route.params.id;
    console.log(fileName, funcName[0], funcName[1], "After id = route.params.id:", " id ", id, " route.params.id ", route.params.id);

    this.device_name = devices[id].device_name;
    this.device_id = devices[id].device_id;
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
  margin-top: /*50*/100px;
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
