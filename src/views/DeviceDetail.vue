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
        <tr>
          <td :class="$style.item">via_1nce_os</td>
          <td :class="$style.value">{{ via_1nce_os }}</td>
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
    <br><br>
    <p>1NCE APIトークンの更新には、1NCEアカウント情報を入力してください。</p>
    <input
      v-model="input_1nce_username"
      :class="$style.input_1nce_username"
      :disabled = valid1nceApiToken
      placeholder="1nce username">
    <input
      v-model="input_1nce_password"
      :class="$style.input_1nce_password"
      :disabled = valid1nceApiToken
      placeholder="1nce password">
    <button
      type="is-info"
      :disabled = valid1nceApiToken
      @click="update1nceApiToken">
      1NCE APIトークン更新
    </button>
    <br><br>
    <p>{{ message_1nce_result }}</p>
    <br><br>
    <!-- div id="map-container">
      <l-map id="map" :zoom="18" :center="[35.686541, 139.698851]">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker :lat-lng="[35.686541, 139.698851]"></l-marker>
      </l-map>
    </div -->
    <!-- div style="height:600px; width:800px" -->
    <div :class="$style.map" v-if=via_1nce_os>
      <l-map ref="map" v-model:zoom="map_zoom" :use-global-leaflet="false" :center="map_marker_position">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <l-marker :lat-lng="map_marker_position"></l-marker>
      </l-map>
    </div>
    <br><br>
    <br><br>
  </div>
</template>

<script>
import axios from 'axios'
import { /*defineProps,*/ ref } from 'vue';
import { useRoute } from 'vue-router'
import { getCurrentInstance } from 'vue';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
const fileName = "DeviceDetail.vue";

console.log(fileName, ":After import:");

let currentInstance;
let devices;
let _1nce_api_token;

//const userBranch = process.env.USER_BRANCH;
const userBranch = localStorage.getItem('userBranch');
console.log(fileName, "userBranch ", userBranch);

//const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/_devices/';
let aws_url_base;
if (userBranch == 'main')
  aws_url_base = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/';
else if (userBranch == 'feature')
  aws_url_base = 'https://4nhe6ayc48.execute-api.ap-northeast-1.amazonaws.com/staging/';

console.log(fileName, "aws_url_base ", aws_url_base);

// 1NCE API: Authorization --> Obtain Access Token
//  curl --request POST \
//     --url https://api.1nce.com/management-api/oauth/token \
//     --header 'accept: application/json' \
//     --header 'authorization: Basic YWFhOmJiYg==' \
//     --header 'content-type: application/json' \
//     --data '
//     {
//       "grant_type": "client_credentials"
//     }
//     '

const _1nce_url_base = 'https://api.1nce.com/management-api/';
console.log(fileName, "_1nce_url_base ", _1nce_url_base);

// 1NCE API: 1NCE OS --> Device Locator --> Get Latest Devices Positions
//  curl --request GET \
//     --url 'https://api.1nce.com/management-api/v1/locate/positions/latest?deviceId=1NCE_DEVICE_ID' \
//     --header 'accept: application/json' \
//     --header 'authorization: Bearer 1NCE_TOKEN'

// 1NCE API: SIM Management --> SIM Usage --> Get SIM Data Quota
//  curl --request GET \
//     --url https://api.1nce.com/management-api/v1/sims/1NCE_DEVICE_ID/quota/data \
//     --header 'accept: application/json' \
//     --header 'authorization: Bearer 1NCE_TOKEN'

const _1nce_url_base_v = _1nce_url_base + 'v1/';
console.log(fileName, "_1nce_url_base_v ", _1nce_url_base_v);

export default {
  name: 'DeviceDetail',
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data: function() {
    const funcName = [":data:"];
    console.log(fileName, funcName[0], "In.");
    // 返却するオブジェクト devices は本コンポーネントで表示するユーザ情報
    // 本来ならば DB 等で保持するのだが、今回は記事用のサンプルコードということでリストで持たせている
    console.log(fileName, funcName[0], "Before return():");
    return {
//      devices: null/*devices*/,
//      properties: {
////        headers: [
////          'device_id',
////          'device_name',
////          'dgroup_id',
////        ],
////        dgroups: null/*dgroups*/,
////        devices: null,
//        devices: {
//          device_id: "0",
//          device_name: "0",
//          dgroup_id: "0",
//          id: 0,
//        }
//      },
//      dgroupId: dgroupId.value,
//      deviceId: deviceId.value,
      device_name: '',
      device_id: '',
      via_1nce_os: '',
      map_zoom: 15,
      map_marker_position: [35.6879, 139.7136],       // Hakuto honsya
      valid1nceApiToken: false/*true*/,
      input_1nce_username: '',
      input_1nce_password: '',
      message_1nce_result: '',
    }
  },
  methods: {
    showChart: function() {
      const funcName = [":methods:", "showChart:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

      this.$router.push({
        name: 'chart',
      })
    },
    update1nceApiToken: async function() {
      const funcName = [":methods:", "update1nceApiToken:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

      if (this.via_1nce_os) {
        const _1nce_account_base64 = btoa(this.input_1nce_username + ':' + this.input_1nce_password);
        console.log(fileName, funcName[0], funcName[1], " _1nce_account_base64 ", _1nce_account_base64);

        const axios_data = {
          "grant_type": "client_credentials"
        };
        const axios_headers = {
          headers: {
            "accept": 'application/json',
            "authorization": "Basic " + _1nce_account_base64,
            "Content-type": 'application/json'
          }
        };
        console.log(fileName, funcName[0], funcName[1], " Before axios.post();", " axios_data ", axios_data, " axios_headers ", axios_headers);
//        const response = await axios.post(_1nce_url_base + 'oauth/token', axios_data, axios_headers);
/*
        const response = await axios.post(_1nce_url_base + 'oauth/token', {
          headers: {
            'Accept': 'Application/json',
            'Authorization': 'Basic ' + _1nce_account_base64,
            'Content-type': 'Application/json',
          },
          data: {
            'grant_type': 'client_credentials'
          },
        });
*/
/*
        const response = await axios.post('https://api.1nce.com/management-api/oauth/token', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'accept': 'application/json',
            'authorization': 'Basic bWFydXlhbWEtaEBoYWt1dG8uY28uanA6SGFrdXRvODkxMA==',
            'content-type': 'application/json',
          },
          data: {
            'grant_type': 'client_credentials'
          },
        });
*/
        const response = await axios.post('https://api.1nce.com/management-api/oauth/token');
        console.log(fileName, funcName[0], funcName[1], " response.status ", response.status)
        console.log(fileName, funcName[0], funcName[1], " response.data ", response.data);

        _1nce_api_token = response.data;
        console.log(fileName, funcName[0], funcName[1], " _1nce_api_token ", _1nce_api_token);

        localStorage.setItem('_1nce_api_token', _1nce_api_token);
        console.log(fileName, funcName[0], funcName[1], "After localStorage.setItem():", " _1nce_api_token ", _1nce_api_token);
      
        this.valid1nceApiToken = true;
        this.message_1nce_result = "1NCEトークンの更新成功！！";
      }

      currentInstance = getCurrentInstance();
      console.log(fileName, funcName[0], funcName[1], "After getCurrentInstance():", " currentInstance ", currentInstance);

      currentInstance.proxy.$forceUpdate();
      console.log(fileName, funcName[0], funcName[1], "After instance.proxy.forceUpdate():", " currentInstance ", currentInstance);
    },
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
        response = await axios.get(aws_url_base + '_devices/' + dgroupId);
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
//        this.properties.devices = devices;
//        this.properties.devices = orderChangedDevices;
//        console.log(fileName, funcName[0], funcName[1], "Before return:", " this.devices ", this.devices);
//        console.log(fileName, funcName[0], funcName[1], "Before return:", " this.properties ", this.properties);

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

    // Just for debug only.
    const route = useRoute();
    console.log(fileName, funcName[0], "After useRoute():", " route ", route);
    const id = route.params.id;
    console.log(fileName, funcName[0], "After id = route.params.id:", " id ", id, " route.params.id ", route.params.id);

    // To follow updatad deviceInfo.
    const deviceInfo = ref('');
    deviceInfo.value = JSON.parse(localStorage.getItem('deviceInfo'));
    console.log(fileName, funcName[0], " deviceInfo.value ", deviceInfo.value);

//    this.device_name = devices[id].device_name;
//    this.device_id = devices[id].device_id;
//    this.via_1nce_os = devices[id].via_1nce_os;

    this.device_name = deviceInfo.value['device_name'];
    this.device_id = deviceInfo.value['device_id'];
    this.via_1nce_os = deviceInfo.value['via_1nce_os'];
    console.log(fileName, funcName[0], " this.device_name ", this.device_name, " this.device_id ", this.device_id, " this.via_1nce_os ", this.via_1nce_os);

/*
    _1nce_api_token

    if (this.via_1nce_os) {
      _1nce_device_id = this.device_id.split('_');
      console.log(fileName, funcName[0], " _1nce_device_id ", _1nce_device_id, " _1nce_device_id[0] ", _1nce_device_id[0]);
      response = await axios.get(_1nce_url_base_v + 'locate/positions/latest?deviceId=/' + _1nce_device_id[0]);
      console.log(fileName, funcName[0], " response.status ", response.status)
      console.log(fileName, funcName[0], " response.data ", response.data);
    }
*/
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

.map {
  overflow: hidden;
  /*width: 800px;*/
  width: 80%;
  height: 600px;
  /*display: flex;*/
  /*justify-content: center;*/
  /*margin: 0 auto;*/
  margin: 0px auto 100px auto;
  /*margin-bottom: 100px;*/
}
</style>
