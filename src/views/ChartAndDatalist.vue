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

let ddata;
const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/ddata/';

// データを取得する関数
async function getDeviceData(deviceId) {
  console.log(fileName, ":getDeviceData(): In.", " deviceId ", deviceId);
  let response;

  try {
    response = await axios.get(url + deviceId);
    console.log(fileName, ":getDeviceData():", " response.status ", response.status)
    console.log(fileName, ":getDeviceData():", " response.data ", response.data);
    ddata = response.data;
    return response;
  }
  catch (error) {
    console.error(fileName, ":getDeviceData():", " error ", error);
    return error;
  }
}

export default {
  name: 'ChartAndDatalist',
  components: {
    Line
  },
  data: function() {
    console.log(fileName, ":data-function(): In.");

    const deviceId = ref('');
    deviceId.value = localStorage.getItem('deviceId');
    console.log(fileName, ":After localStorage.getItem():", " deviceId.value ", deviceId.value);

    // getDevices を呼び出してデータを読み込む
    let response_ga = getDeviceData(deviceId.value);
    console.log(fileName, ":After getDeviceData()", " ddata ", ddata, " response_ga ", response_ga);

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
