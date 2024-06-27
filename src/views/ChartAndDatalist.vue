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
    <div :class="$style.write_csv">
      <button
        type="is-info"
        @click="writeCSV">
        CSVファイル出力
      </button>
    </div>
    <br><br>
    <p>開始日時</p>
    <div :class="$style.set_date">
      <button
        type="is-info"
        @click="setDateStartNow">
        現在日時 (-1分) を設定
      </button>
    </div>
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
    <div :class="$style.set_date">
      <button
        type="is-info"
        @click="setDateEndNow">
        現在日時を設定
      </button>
    </div>
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

let ddata;
const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/ddata/';

// Graph data reset.
let labels = [];
let data0s = [];
let data1s = [];
//let data2s = [];

let date_start;
let date_end;

/*
const chartData = {
  labels: [],
  datasets: [
    {
      label: 'data0',
      yAxisID: "yleft",
      backgroundColor: "rgba(2,63,138,0.8)",
      fill: false,
      borderWidth: 2,
      borderColor: "rgba(2,63,138,0.8)",
//      pointBorderColor: "#fff",
//      pointBackgroundColor: "rgba(2,63,138,0.8)",
//      pointBorderWidth: 2,
//      pointHoverRadius: 5,
//      pointHoverBackgroundColor: "#1D5191",
//      pointHoverBorderColor: "#fff",
//      pointHoverBorderWidth: 2,
      tension: 0,
      data: [],
    },
    {
      label: 'data1',
      yAxisID: "yright",
//          backgroundColor: '#f879f9',
      backgroundColor: "rgba(201,60,58,0.8)",
      fill: false,
      borderWidth: 2,
      borderColor: "rgba(201,60,58,0.8)",
//      pointBorderColor: "#fff",
//      pointBackgroundColor: "rgba(201,60,58,0.8)",
//      pointBorderWidth: 2,
//      pointHoverRadius: 5,
//      pointHoverBackgroundColor: "#9A1B19",
//      pointHoverBorderColor: "#fff",
//      pointHoverBorderWidth: 2,
      tension: 0,
      data: [],
    },
//    {
//      label: 'data2',
//      yAxisID: "yright",
////          backgroundColor: '#f8f979',
//      backgroundColor: "#DB514E",
//      data: data2s,
//    },
  ]
}
*/

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
      data: {
        labels: labels/*[]*/,
        datasets: [
          {
            data: data0s/*[]*/,
          },
          {
            data: data1s/*[]*/,
          },
/*
          {
            data: [],
          },
*/
        ],
      },
      options: null/*chartOptions*/,
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
  methods: {
    setDateStartNow: function() {
      const funcName = [":methods:", "sedDateStartNow:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

      date_start = new Date();
      date_start.setMinutes(date_start.getMinutes() - 1);
//      localStorage.setItem('date_start', date_start);
      this.date_start = date_start;
      console.log(fileName, funcName[0], funcName[1], "In.", " date_start ", date_start, " this.date_start ", this.date_start);
    },

    setDateEndNow: function() {
      const funcName = [":methods:", "sedDateEndNow:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

      date_end = new Date();
//      localStorage.setItem('date_end', date_end);
      this.date_end = date_end;
      console.log(fileName, funcName[0], funcName[1], "In.", " date_end ", date_end, " this.date_end ", this.date_end);
    },

    convertJSONtoCSV: function() {
      const funcName = [":methods:", "convertJSONtoCSV:"];
      console.log(fileName, funcName[0], funcName[1], "In:");

      let keys = ["device_name", "device_id", "date", "data0", "data1"];
      let numOfColumns = keys.length;
      let numOfRows = ddata.length;
      let csvStr = "";

      console.log(fileName, funcName[0], funcName[1], "In 2:", ' keys ', keys, ' numOfColumns ', numOfColumns, ' numOfRows ', numOfRows);

      /*
      JSON.parse(jsons[0], (key) => {
        if(key) {
          keys.push(key);   // keyの取得
          count++;
        }
      })
      */
    
      for(let i = 0; i < numOfColumns; i++) {
        if(i == numOfColumns - 1) {   // 行末の処理
          csvStr = csvStr.concat(keys[i],"\n");
        }
        else {
          csvStr = csvStr.concat(keys[i],", ");
        }
      }

      console.log(fileName, funcName[0], funcName[1], "After listup header with keys:", ' keys ', keys, " csvStr ", csvStr);

      /*
      let j = 0;
      while(jsons[j] !== null) {
        JSON.parse(jsons[j], (key, value) => {
          if(key) { values.push(value); }
        })
    
        console_logger.warn('convertJSONtoCSV() Before convert values: ', " values ", values);

        for(let i = 0; i < count; i++) {
          if(i == count - 1)  { csvStr = csvStr.concat(values[i],"\n"); }   // 行末の処理
          else                { csvStr = csvStr.concat(values[i],", "); }
        }

        j++;
      }
      */

      for(let i = 0; i < numOfRows; i++) {
        csvStr = csvStr.concat(this.device_name,", ");
        csvStr = csvStr.concat(ddata[i].device_id,", ");
        csvStr = csvStr.concat(ddata[i].createdAt,", ");
        csvStr = csvStr.concat(ddata[i].data0,", ");
        csvStr = csvStr.concat(ddata[i].data1,"\n");
      }

      console.log(fileName, funcName[0], funcName[1], "After write values:", " csvStr ", csvStr);

      return csvStr;
    },

    writeCSV: async function(/*event*/) {
      const funcName = [":methods:", "writeCSV:"];
      console.log(fileName, funcName[0], funcName[1], "In:");

//      setDisableButtons(true);
//      event.preventDefault();

      const opts = {
        suggestedName: 'example',
        types: [{
          description: 'CSV file',
          accept: {'text/csv': ['.csv']},
        }],
      };
      const handle = await window.showSaveFilePicker(opts);
      const writable = await handle.createWritable();
      const csv = this.convertJSONtoCSV(/*notes*/);
    
      console.log(fileName, funcName[0], funcName[1], "Before csv write:", " opts ", opts, " handle ", handle, ' writable ', writable, ' csv ', csv);
    
      await writable.write(csv);
      await writable.close();

      /*
      if(csvStr == "") {
        console_logger.warn("empty Text .")
        return 
      }
    
      // 既存ファイルの上書き "overwrite" / 既存ファイルの書き換え "rewrite"
      const WRITE_CONFIG = "rewrite"
    
      if (WRITE_CONFIG == "rewrite") {
        fse.writeFileSync(filename, csvStr)
        console_logger.warn("Rewrite csv file.")
      }
  //    else if (WRITE_CONFIG == "overwrite") {
  //      fs.appendFileSync("./test.csv",csvStr);
  //      console.log("overwrite csv file .")
  //    }
      else {
        console_logger.warn("Please check! cannot write csvfile.")
      }
      */

//      setDisableButtons(false);
//      event.target.reset();
      console.log(fileName, funcName[0], funcName[1], "Out:");
    }
  },
  beforeCreate: function() {
    const funcName = [":beforeCreate:"];
    console.log(fileName, funcName[0], "In.");

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

        const chartData_L = {
          labels: [],
          datasets: [
            {
              label: 'data0',
              yAxisID: "yleft",
              backgroundColor: "rgba(2,63,138,0.8)",
              fill: false,
              borderWidth: 2,
              borderColor: "rgba(2,63,138,0.8)",
              tension: 0,
              data: [],
            },
            {
              label: 'data1',
              yAxisID: "yright",
              backgroundColor: "rgba(201,60,58,0.8)",
              fill: false,
              borderWidth: 2,
              borderColor: "rgba(201,60,58,0.8)",
              tension: 0,
              data: [],
            },
          ]
        }

//        this.data = chartData;
        this.data = chartData_L;
        this.data.labels = labels;
        this.data.datasets[0].data = data0s;
        this.data.datasets[1].data = data1s;
        this.options = chartOptions;

        //        this.device_id = deviceId;
//        this.device_id = deviceInfo.device_id;
        this.device_id = deviceInfo['device_id'];
//        this.device_name = deviceInfo.device_name;
        this.device_name = deviceInfo['device_name'];
//        console.log(fileName, funcName[0], funcName[1], "Before return:", " this.data ", this.data, " this.options ", this.options, " this.device_id ", this.device_id);
        console.log(fileName, funcName[0], funcName[1], "Before return:", " this.data ", this.data, " this.options ", this.options, " this.device_id ", this.device_id," this.device_name ", this.device_name, " deviceInfo ", deviceInfo);
//        console.log(fileName, funcName[0], funcName[1], "Before return 2:", " deviceInfo.device_id ", deviceInfo.device_id, " deviceInfo['device_id'] ", deviceInfo['device_id'], " deviceInfo.device_name ", deviceInfo.device_name, " deviceInfo['device_name'] ", deviceInfo['device_name']);
        console.log(fileName, funcName[0], funcName[1], "Before return 2:", " deviceInfo['device_id'] ", deviceInfo['device_id'], " deviceInfo['device_name'] ", deviceInfo['device_name']);
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

    if (!date_start) {
      date_start = localStorage.getItem('date_start');
      this.date_start = date_start;
      if (!date_start) {
        date_start = new Date();
        date_start.setMonth(date_start.getMonth() - 1);
        localStorage.setItem('date_start', date_start);
        this.date_start = date_start;
      }
    }

    if (!date_end) {
      date_end = localStorage.getItem('date_end');
      this.date_end = date_end;
      if (!date_end) {
        date_end = new Date();
        localStorage.setItem('date_end', date_end);
        this.date_end = date_end;
      }
    }

    let date_start_iso = dateTimeToISOString(date_start);
    let date_end_iso = dateTimeToISOString(date_end);

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
    console.log(fileName, funcName[0], "In.");

    const getDeviceData = async (deviceInfo, date_start_iso, date_end_iso) => {
      const funcName = [":beforeUpdate:", "getDeviceData():"];
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
//            labels_L.push(dateTimeNtJst);
            data0s.push(ddata[i].data0);
            data1s.push(ddata[i].data1);
//            data2s.push(ddata[i/*j*/].data2);
          }
          console.log(fileName, funcName[0], funcName[1], ":After loop for chart data", " labels ", labels, " data0s ", data0s, " data1s ", data1s/*, " data2s ", data2s*/);
//          console.log(fileName, funcName[0], funcName[1], ":After loop for chart data L", " labels_L ", labels_L,);
        }

        const chartData_L = {
          labels: [],
          datasets: [
            {
              label: 'data0',
              yAxisID: "yleft",
              backgroundColor: "rgba(2,63,138,0.8)",
              fill: false,
              borderWidth: 2,
              borderColor: "rgba(2,63,138,0.8)",
              tension: 0,
              data: [],
            },
            {
              label: 'data1',
              yAxisID: "yright",
              backgroundColor: "rgba(201,60,58,0.8)",
              fill: false,
              borderWidth: 2,
              borderColor: "rgba(201,60,58,0.8)",
              tension: 0,
              data: [],
            },
          ]
        }

//        this.data = chartData;
        this.data = chartData_L;
        this.data.labels = labels;
//        this.data.labels = labels_L;
//        labels = labels_L;
        this.data.datasets[0].data = data0s;
        this.data.datasets[1].data = data1s;
        this.options = chartOptions;
//        this.options = chartOptions_L;

        //        this.device_id = deviceId;
//        this.device_id = deviceInfo.device_id;
        this.device_id = deviceInfo['device_id'];
//        this.device_name = deviceInfo.device_name;
        this.device_name = deviceInfo['device_name'];
//        console.log(fileName, funcName[0], funcName[1], "Before return:", " this.data ", this.data, " this.options ", this.options, " this.device_id ", this.device_id);
        console.log(fileName, funcName[0], funcName[1], "Before return:", " this.data ", this.data, " this.options ", this.options, " this.device_id ", this.device_id," this.device_name ", this.device_name, " deviceInfo ", deviceInfo);
//        console.log(fileName, funcName[0], funcName[1], "Before return 2:", " deviceInfo.device_id ", deviceInfo.device_id, " deviceInfo['device_id'] ", deviceInfo['device_id'], " deviceInfo.device_name ", deviceInfo.device_name, " deviceInfo['device_name'] ", deviceInfo['device_name']);
        console.log(fileName, funcName[0], funcName[1], "Before return 2:", " deviceInfo['device_id'] ", deviceInfo['device_id'], " deviceInfo['device_name'] ", deviceInfo['device_name']);
        return response;
      }
      catch (error) {
        console.error(fileName, funcName[0], funcName[1], " error ", error);
        return error;
      }
    }

    let reRenderFlag = false;
    if (this.date_start != localStorage.getItem('date_start')) {
      reRenderFlag = true;
      date_start = this.date_start;
      localStorage.setItem('date_start', this.date_start);
    }

    if (this.date_end != localStorage.getItem('date_end')) {
      reRenderFlag = true;
      date_end = this.date_end;
      localStorage.setItem('date_end', this.date_end);
    }

    console.log(fileName, funcName[0], ":Before if (reRenderFlag):", " reRenderFlag ", reRenderFlag);
    if (reRenderFlag) {
      const deviceInfo = ref('');
      deviceInfo.value = JSON.parse(localStorage.getItem('deviceInfo'));
      console.log(fileName, funcName[0], " deviceInfo.value ", deviceInfo.value);

      let date_start_iso = dateTimeToISOString(this.date_start);
      let date_end_iso = dateTimeToISOString(this.date_end);

      // getDevices を呼び出してデータを読み込む
      let response_ga = getDeviceData(deviceInfo.value, date_start_iso, date_end_iso);
      console.log(fileName, funcName[0], ":After getDeviceData()", " ddata ", ddata, " response_ga ", response_ga);
    }
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

#box {
  max-width: 550px;
  margin: auto;
  padding: 15px;
  border: 2px solid #dcdcdc;
}

.write_csv {
  font-size: 12px;
  display: flex;
  justify-content: right;
}

.set_date {
  font-size: 12px;
}
</style>
