<template>
  <div :class="$style.component">
    <!-- h2>Device details with device_id: {{ $route.params.device_id }}</h2 -->
    <h2>Chart and data list of device_id: {{ deviceId }}</h2>
    <div>
      <Line :data="data" :options="options" />
    </div>
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
        <!-- tr
          v-for="(value, name) in devices[$route.params.id/* - 1*/]"
          :key="name">
          <td :class="$style.item">
            {{ name }}
          </td>
          <td :class="$style.value">
            {{ value }}
          </td>
        </tr -->
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { /*defineProps,*/ ref } from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
const fileName = "ChartAndDatalist.vue";

console.log(fileName, ":After import:");

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

let devices;
const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/_devices/';

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

export default {
  name: 'ChartAndDatalist',
  components: {
    Line
  },
  data: function() {
    console.log(fileName, ":data-function():", " devices ", devices);

    const dgroupId = ref('');
    dgroupId.value = localStorage.getItem('dgroupId');
    console.log("DeviceDetail.vue:", "After localStorage.getItem():", " dgroupId.value ", dgroupId.value);

    // getDevices を呼び出してデータを読み込む
    let response_ga = getDevices(dgroupId.value);
    console.log("DeviceDetail.vue:", "After getDevices()", " devices ", devices, " response_ga ", response_ga);

    const deviceId = ref('');
    deviceId.value = localStorage.getItem('deviceId');
    console.log("DeviceDetail.vue:", "After localStorage.getItem():", " deviceId.value ", deviceId.value);

    const chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    return {
      data: chartData,
      options: chartOptions,
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
