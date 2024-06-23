<template>
  <div :class="$style.component">
    <!-- h2>Device details with device_id: {{ $route.params.device_id }}</h2 -->
    <!-- h2>Chart and data list of device_id: {{ device_id }}</h2 -->
    <h2>Chart of device_name: {{ device_name }}</h2>
    <div>
      <Line width="1280" height="720" :data="data" :options="options" />
    </div>
    <!-- section>
        <div class="form-group">
            <label>Select a date</label>
            <div class="input-group">
                <flat-pickr
                    v-model="date"
                    :config="config"
                    class="form-control"
                    placeholder="Select date"
                    name="date"/>
                <div class="input-group-append">
                    <button class="btn btn-default" type="button" title="Toggle" data-toggle>
                        <i class="fa fa-calendar"/>
                        <span aria-hidden="true" class="sr-only">Toggle</span>
                    </button>
                    <button class="btn btn-default" type="button" title="Clear" data-clear>
                        <i class="fa fa-times"/>
                        <span aria-hidden="true" class="sr-only">Clear</span>
                    </button>
                </div>
            </div>
        </div>
        <pre>Selected date is - {{date}}</pre>
    </section -->
    <br><br>
    <p>開始日時</p>
    <div id="box">
      <datepicker v-model="date_start" 
                  :format="format"
                  dateFormat='yy年mm月dd日'
                  :enable-time-picker="true"
                  week-start="0"
                  locale="jp" 
                  placeholder="日付を選択"
                  select-text="選択"
                  cancel-text="ｷｬﾝｾﾙ"
                  :show-now-button="true"
                  now-button-label="現在を選択"
                  >
      </datepicker>
    </div>
    <br><br>
    <p>終了日時</p>
    <div id="box">
      <datepicker v-model="date_end" 
                  :format="format"
                  dateFormat="yyyy-MM-dd HH:mm"
                  :enable-time-picker="true"
                  week-start="0"
                  locale="jp" 
                  placeholder="日付を選択"
                  select-text="選択"
                  cancel-text="ｷｬﾝｾﾙ"
                  :show-now-button="true"
                  now-button-label="現在を選択"
              >
      </datepicker>
    </div>
    <br><br>
    <br><br>
    <!-- bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <!-- bootstrap end -->
    <!-- Vue 3.2.26 -->
    <script src="https://unpkg.com/vue@3.2.26/dist/vue.global.js"></script>
    <!-- Vue 3.2.26 end -->
    <script src="https://unpkg.com/@vuepic/vue-datepicker@3.6.5/dist/vue-datepicker.iife.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/@vuepic/vue-datepicker@3.6.5/dist/main.css">
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
  Legend,
  TimeScale,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import 'chartjs-adapter-moment';
//import moment from "moment";

import 'bootstrap/dist/css/bootstrap.css';
//import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/material_blue.css';
//import {Hindi} from 'flatpickr/dist/l10n/hi.js';
//import {Japanese} from 'flatpickr/dist/l10n/ja.js';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { getCurrentInstance } from 'vue';
const fileName = "ChartAndDatalist.vue";

console.log(fileName, ":After import:");

//const date = ref('2022-10-28');
//let date = new Date();

// Read more at https://flatpickr.js.org/options/
/*
const config = ref({
  wrap: true, // set wrap to true only when using 'input-group'
  altFormat: 'M j, Y',
  altInput: true,
//  dateFormat: 'Y-m-d',
  dateFormat: 'YYYY-MM-DD HH:mm',
  locale: Japanese,         
});
*/

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
)

let currentInstance;

let ddata;
const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/ddata/';

// Graph data reset.
let labels = [];
let data0s = [];
let data1s = [];
//let data2s = [];

let date_start;
let date_end;

const chartData = {
  labels: labels,
  datasets: [
    {
      label: 'data0',
      yAxisID: "yleft",
      backgroundColor: '#f87979',
      fill: false,
      borderWidth: 2,
      borderColor: "rgba(2,63,138,0.8)",
      pointBorderColor: "#fff",
      pointBackgroundColor: "rgba(2,63,138,0.8)",
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#1D5191",
      pointHoverBorderColor: "#fff",
      pointHoverBorderWidth: 2,
      tension: 0,
      data: data0s,
    },
    {
      label: 'data1',
      yAxisID: "yright",
//          backgroundColor: '#f879f9',
      backgroundColor: "#3A7AC9",
      fill: false,
      borderWidth: 2,
      borderColor: "rgba(201,60,58,0.8)",
      pointBorderColor: "#fff",
      pointBackgroundColor: "rgba(201,60,58,0.8)",
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#9A1B19",
      pointHoverBorderColor: "#fff",
      pointHoverBorderWidth: 2,
      tension: 0,
      data: data1s,
    },
/*
    {
      label: 'data2',
      yAxisID: "yright",
//          backgroundColor: '#f8f979',
      backgroundColor: "#DB514E",
      data: data2s,
    },
*/
  ]
};

const chartOptions = {
  responsive: true,    // グラフのスクロール対応
//      responsive: false,    // グラフのスクロール対応
  maintainAspectRatio: false,
  spanGaps: true,   //点をつなげる場合
  scales: {
    x: {
      type: 'time',
      title: {                   // タイトルの設定  軸ラベル ChartJS ver 4
        display: true,             // ★必須 表示設定 省略時は false
        position: "bottom",        // 表示位置 省略時は top、他に left, right が指定できる
        text: '日付時刻'           // ★必須 タイトルの文字列
      },
      time: {
        unit: 'minute',
        displayFormats: {
          minute: 'YYYY-MM-DD HH:mm'
        }
      },
    },
    yleft: {
      stacked: false,
      title: {                   // タイトルの設定  軸ラベル ChartJS ver 4
        display: true,             // ★必須 表示設定 省略時は false
        position: "left",        // 表示位置 省略時は top、他に left, right が指定できる
        text: 'data0'           // ★必須 タイトルの文字列
      },
    },
    /** yright (y軸・右): Y軸が、複数あるので yleft と yright のように軸にIDを付ける */
    yright: {
      stacked: false,
      position: "right",
      title: {                   // タイトルの設定  軸ラベル ChartJS ver 4
        display: true,             // ★必須 表示設定 省略時は false
        position: "right",        // 表示位置 省略時は top、他に left, right が指定できる
        text: 'data1'           // ★必須 タイトルの文字列
      },
    },
  },
};


function dateTimeToISOString(dateTime){
  // toISOString()で、UTC時間になってしまう（-9時間されてしまう）
  let dateTimeJstTmp = new Date(dateTime);
  dateTimeJstTmp.setHours(dateTimeJstTmp.getHours() + 9);
  let dateTimeJstIso = dateTimeJstTmp.toISOString();
  dateTimeJstIso = dateTimeJstIso.slice(0, 23) + '+09:00';
  return dateTimeJstIso;
}

function dateTimeToNtJst(dateTime){
  const dateTimeNt = dateTime.replace('T', ' ');
  const dateTimeNtJst = dateTimeNt.substr(0, 23);
//  console.log(fileName, funcName[0], funcName[1], ":In loop for chart data", " date_nt ", date_nt, " date_nt_jst ", date_nt_jst);
  return dateTimeNtJst;
}

export default {
  name: 'ChartAndDatalist',
  components: {
    Line,
//    flatPickr,
    datepicker: VueDatePicker,
  },
  data: function() {
    const funcName = [":data:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], "Before return():");
    return {
      data: null,
/*
      data: {
//        labels: [],
        labels: labels,
        datasets: [
          {
//            data: [],
            data: data0s,
          },
          {
//            data: [],
            data: data1s,
          },
        ],
      },
*/
//      data: chartData,
      options: null,
//      options: chartOptions,
      device_id: '',
      device_name: '',
//      date: date,
//      config: config,
//      date: new Date(),
      date_start: date_start/*''*/,
      date_end: date_end/*''*/,
      format: 'yyyy-MM-dd HH:mm', 
    }
  },
  beforeCreate: function() {
    const funcName = [":beforeCreate:"];
    console.log(fileName, funcName[0], "In.");

    currentInstance = getCurrentInstance();
    console.log(fileName, funcName[0], "After getCurrentInstance():", " currentInstance ", currentInstance);

//    async function getDeviceData(deviceId) {
//    const getDeviceData = async (deviceId) => {
    const getDeviceData = async (deviceInfo, date_start_iso, date_end_iso) => {
        const funcName = [":beforeCreate:", "getDeviceData():"];
//      console.log(fileName, funcName[0], funcName[1], "In.", " deviceId ", deviceId);
      console.log(fileName, funcName[0], funcName[1], "In.", " deviceInfo ", deviceInfo, " date_start_iso ", date_start_iso, " date_end_iso ", date_end_iso);
      let response;

      try {
        response = await axios.get(url + deviceInfo.device_id + '?date_start=' + date_start_iso + '&date_end=' + date_end_iso);
        console.log(fileName, funcName[0], funcName[1], " response ", response)
        ddata = response.data;

        if (ddata != null) {
          // Graph data reset.
          labels = [];
          data0s = [];
          data1s = [];
//          data2s = [];

          // add graph data.
          let loops = ddata.length;
          for(let i = 0; i < loops; ++i) {
      //      let j = loops - i - 1;
//            let date_nt = ddata[i/*j*/].createdAt_c.replace('T', ' ');
//            let date_nt_jst = date_nt.substr(0, 23);
//            console.log(fileName, funcName[0], funcName[1], ":In loop for chart data", " date_nt ", date_nt, " date_nt_jst ", date_nt_jst);

            const dateTimeNtJst = dateTimeToNtJst(ddata[i].createdAt_c);
            console.log(fileName, funcName[0], funcName[1], ":In loop for chart data", " i ", i, " ddata[i] ", ddata[i], " dateTimeNtJst ", dateTimeNtJst);

            labels.push(dateTimeNtJst);
            data0s.push(ddata[i].data0);
            data1s.push(ddata[i].data1);
//            data2s.push(ddata[i/*j*/].data2);
          }
          console.log(fileName, funcName[0], funcName[1], ":After loop for chart data", " labels ", labels, " data0s ", data0s, " data1s ", data1s/*, " data2s ", data2s*/);
        }

        const chartDataLocal = chartData;
        const chartOptionsLocal = chartOptions;
        console.log(fileName, funcName[0], funcName[1], "After chartDataLocal and chartOptionsLocal", " chartDataLocal ", chartDataLocal, " chartOptionsLocal ", chartOptionsLocal);
        
//        this.data = chartData;
        this.data = chartDataLocal;
//        this.data.labels = labels;
//        this.data.datasets[0].data = data0s;
//        this.data.datasets[1].data = data1s;
//        this.options = chartOptions;
        this.options = chartOptionsLocal;

        //        this.device_id = deviceId;
//        this.device_id = deviceInfo.device_id;
        this.device_id = deviceInfo['device_id'];
//        this.device_name = deviceInfo.device_name;
        this.device_name = deviceInfo['device_name'];
//        console.log(fileName, funcName[0], funcName[1], "Before return:", " this.data ", this.data, " this.options ", this.options, " this.device_id ", this.device_id);
        console.log(fileName, funcName[0], funcName[1], "Before return:", " this.data ", this.data, " this.options ", this.options, " this.device_id ", this.device_id," this.device_name ", this.device_name, " deviceInfo ", deviceInfo);
//        console.log(fileName, funcName[0], funcName[1], "Before return 2:", " deviceInfo.device_id ", deviceInfo.device_id, " deviceInfo['device_id'] ", deviceInfo['device_id'], " deviceInfo.device_name ", deviceInfo.device_name, " deviceInfo['device_name'] ", deviceInfo['device_name']);
        console.log(fileName, funcName[0], funcName[1], "Before return 2:", " deviceInfo['device_id'] ", deviceInfo['device_id'], " deviceInfo['device_name'] ", deviceInfo['device_name']);

        currentInstance.proxy.$forceUpdate();
        console.log(fileName, funcName[0], funcName[1], "After instance.proxy.forceUpdate():", " currentInstance ", currentInstance);

        return response;
      }
      catch (error) {
        console.error(fileName, funcName[0], funcName[1], " error ", error);
        return error;
      }
    }

//    const deviceId = ref('');
    const deviceInfo = ref('');
//    deviceId.value = localStorage.getItem('deviceId');
    deviceInfo.value = JSON.parse(localStorage.getItem('deviceInfo'));
//    console.log(fileName, funcName[0], " deviceId.value ", deviceId.value);
    console.log(fileName, funcName[0], " deviceInfo.value ", deviceInfo.value);

    if (!/*this.*/date_start) {
      /*this.*/date_start = localStorage.getItem('date_start');
      if (!/*this.*/date_start) {
        /*this.*/date_start = new Date();
        /*this.*/date_start.setMonth(/*this.*/date_start.getMonth() - 1);
        localStorage.setItem('date_start', /*this.*/date_start)
      }
    }

    if (!/*this.*/date_end) {
      /*this.*/date_end = localStorage.getItem('date_end');
      if (!/*this.*/date_end) {
        /*this.*/date_end = new Date();
        localStorage.setItem('date_end', /*this.*/date_end)
      }
    }

    let date_start_iso = dateTimeToISOString(localStorage.getItem('date_start'));
    let date_end_iso = dateTimeToISOString(localStorage.getItem('date_end'));

    // getDevices を呼び出してデータを読み込む
//    let response_ga = getDeviceData(deviceId.value);
    let response_ga = getDeviceData(deviceInfo.value, date_start_iso, date_end_iso);
    console.log(fileName, funcName[0], ":After getDeviceData()", " ddata ", ddata, " response_ga ", response_ga);
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
    console.log(fileName, funcName[0], "In.", " this.data ", this.data);

/*
    this.data.labels = null;
    this.data.datasets[0].data = null;
    this.data.datasets[1].data = null;
    console.log(fileName, funcName[0], "After data.labels and datasets set null.");

    const getDeviceData = async (deviceInfo, date_start_iso, date_end_iso) => {
        const funcName = [":beforeUpdate:", "getDeviceData():"];
//      console.log(fileName, funcName[0], funcName[1], "In.", " deviceId ", deviceId);
      console.log(fileName, funcName[0], funcName[1], "In.", " deviceInfo ", deviceInfo, " date_start_iso ", date_start_iso, " date_end_iso ", date_end_iso);
      let response;

      try {
        response = await axios.get(url + deviceInfo.device_id + '?date_start=' + date_start_iso + '&date_end=' + date_end_iso);
        console.log(fileName, funcName[0], funcName[1], " response ", response)
        ddata = response.data;

        if (ddata != null) {
          // Graph data reset.
          labels = [];
          data0s = [];
          data1s = [];
//          data2s = [];

          // add graph data.
          let loops = ddata.length;
          for(let i = 0; i < loops; ++i) {
            const dateTimeNtJst = dateTimeToNtJst(ddata[i].createdAt_c);
            console.log(fileName, funcName[0], funcName[1], ":In loop for chart data", " i ", i, " ddata[i] ", ddata[i], " dateTimeNtJst ", dateTimeNtJst);

            labels.push(dateTimeNtJst);
//            this.data.labels.push(dateTimeNtJst);
            data0s.push(ddata[i].data0);
//            this.data.datasets[0].data.push(ddata[i].data0);
            data1s.push(ddata[i].data1);
//            this.data.datasets[1].data.push(ddata[i].data1);
//            data2s.push(ddata[i].data2);
          }
          console.log(fileName, funcName[0], funcName[1], ":After loop for chart data", " labels ", labels, " data0s ", data0s, " data1s ", data1s);
        }

//        this.data.labels = labels;
//        this.data.datasets[0].data = data0s;
//        this.data.datasets[1].data = data1s;

        this.device_id = deviceInfo['device_id'];
        this.device_name = deviceInfo['device_name'];
        console.log(fileName, funcName[0], funcName[1], "Before return:", " this.data ", this.data, " this.options ", this.options, " this.device_id ", this.device_id," this.device_name ", this.device_name, " deviceInfo ", deviceInfo);
        console.log(fileName, funcName[0], funcName[1], "Before return 2:", " deviceInfo['device_id'] ", deviceInfo['device_id'], " deviceInfo['device_name'] ", deviceInfo['device_name']);
        return response;
      }
      catch (error) {
        console.error(fileName, funcName[0], funcName[1], " error ", error);
        return error;
      }
    }

    const deviceInfo = ref('');
    deviceInfo.value = JSON.parse(localStorage.getItem('deviceInfo'));
    console.log(fileName, funcName[0], " deviceInfo.value ", deviceInfo.value);

    date_start = this.date_start;
    date_end = this.date_end;

    let date_start_iso = dateTimeToISOString(date_start);
    let date_end_iso = dateTimeToISOString(date_end);

    // getDevices を呼び出してデータを読み込む
    let response_ga = getDeviceData(deviceInfo.value, date_start_iso, date_end_iso);
    console.log(fileName, funcName[0], ":After getDeviceData()", " ddata ", ddata, " response_ga ", response_ga);

    localStorage.setItem('date_start', this.date_start);
    localStorage.setItem('date_end', this.date_end);
    console.log(fileName, funcName[0], "After localStorage.setItem():", " date_start ", this.date_start, " this.date_end ", this.date_end, " date_start ", date_start, " date_end ", date_end, " date_start_iso ", date_start_iso, " date_end_iso ", date_end_iso);
*/
  },
  updated: function() {
    const funcName = [":updated:"];
    console.log(fileName, funcName[0], "In.", " this.data ", this.data);
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

#box {
  max-width: 550px;
  margin: auto;
  padding: 15px;
  border: 2px solid #dcdcdc;
}
</style>
