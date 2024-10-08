<template>
  <div :class="$style.component">
    <!-- h2>Device details with device_id: {{ $route.params.device_id }}</h2 -->
    <!-- h2>route.params.id: {{ $route.params.id }}</h2 -->
    <!-- h2>route.params.device_id: {{ $route.params.device_id }}</h2 -->
    <!-- h2>Device details of device_id: {{ deviceId }}</h2 -->
    <h3>Device detail of device_name: {{ device_name }}</h3>
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
    <p>{{ message_1nce_token_result }}</p>
    <br><br>
    <h3>1NCE Latest Devices Positions 情報</h3>
    <h5>(接続先の基地局位置情報)</h5>
    <!-- div id="map-container">
      <l-map id="map" :zoom="18" :center="[35.686541, 139.698851]">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker :lat-lng="[35.686541, 139.698851]"></l-marker>
      </l-map>
    </div -->
    <!-- div style="height:600px; width:800px" -->
    <div :class="$style.map" v-if=via_1nce_os>
      <l-map ref="map" v-model:zoom="map_zoom" :use-global-leaflet="false" :center="d_1nce_map_marker_position">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <l-marker :lat-lng="d_1nce_map_marker_position"></l-marker>
      </l-map>
    </div>
    <br><br>
    <p>{{ message_1nce_locate_result }}</p>
    <br><br>
    <h3>1NCE SIM Data Quata 情報</h3>
    <h5>SIM残量: {{ d_1nce_sim_data_quata_volume }} MB</h5>
    <br><br>
    <p>{{ message_1nce_sim_quota_result }}</p>
    <p>JSONデータ: {{ d_1nce_sim_data_quata_all_json }}</p>
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
//let _1nce_api_token = '';

//axios.defaults.withCredentials = true;

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
      d_1nce_sim_data_quata_all_json: '',
      d_1nce_sim_data_quata_volume: 0.0,
//      d_1nce_map_marker_position: [35.6879, 139.7136],       // Hakuto 本社
      d_1nce_map_marker_position: [35.68143661183725, 139.76745739072646], // 東京駅
      valid1nceApiToken: true,
      input_1nce_username: '',
      input_1nce_password: '',
      message_1nce_token_result: 'こちらは、1NCE OS経由デバイス (via_1nce_os = true) の場合のみ使用します。',
      message_1nce_locate_result: 'こちらは、1NCE OS経由デバイス (via_1nce_os = true) の場合のみ表示されます。',
      message_1nce_sim_quota_result: 'こちらは、1NCE OS経由デバイス (via_1nce_os = true) の場合のみ表示されます。',
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
//    update1nceApiToken: async function() {
    update1nceApiToken: function() {
        const funcName = [":methods:", "update1nceApiToken:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

      const _1nce_account_base64 = btoa(this.input_1nce_username + ':' + this.input_1nce_password);

      console.log(fileName, funcName[0], funcName[1], " Before axios.post(1nce token);", " _1nce_account_base64 ", _1nce_account_base64);
//      const response = await axios.post('https://api.1nce.com/management-api/oauth/token', {
      axios.post('https://api.1nce.com/management-api/oauth/token', {
          'grant_type': 'client_credentials',
        }, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Basic ' + _1nce_account_base64,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
          // レスポンス処理
        console.log(fileName, funcName[0], funcName[1], " axios.get(1nce token).then:", " response.status ", response.status)
        console.log(fileName, funcName[0], funcName[1], " axios.get(1nce token).then:", " response.data ", response.data);

        const _1nce_api_token = response.data['access_token'];
        console.log(fileName, funcName[0], funcName[1], " axios.get(1nce token).then:", " _1nce_api_token ", _1nce_api_token);

        localStorage.setItem('_1nce_api_token', _1nce_api_token);
        console.log(fileName, funcName[0], funcName[1], " After localStorage.setItem():", " _1nce_api_token ", _1nce_api_token);
      
        this.valid1nceApiToken = true;
        this.message_1nce_token_result = "1NCE APIトークンの更新成功！！";

        // Update 1NCE SIM Data Quata.
        this.update1nceSimDataQuata();
        console.log(fileName, funcName[0], funcName[1], "this.update1nceSimDataQuata():");

        // Update 1NCE Locate Position.
        this.update1nceLocatePosition();
        console.log(fileName, funcName[0], funcName[1], "this.update1nceLocatePosition():");
      })
      .catch(error => {
        // エラーハンドリング
        console.log(fileName, funcName[0], funcName[1], " axios.get(1nce token).catch:", " error ", error)

        this.valid1nceApiToken = false;
        this.message_1nce_token_result = "1NCE APIトークンの更新に失敗しました。再度試行してください。";
      });

      currentInstance.proxy.$forceUpdate();
      console.log(fileName, funcName[0], funcName[1], "After instance.proxy.forceUpdate():", " currentInstance ", currentInstance);
    },
    update1nceSimDataQuata: function() {
      const funcName = [":methods:", "update1nceSimDataQuata:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

      const _1nce_api_token = localStorage.getItem('_1nce_api_token');
      console.log(fileName, funcName[0], funcName[1], "After localStorage.getItem():", " _1nce_api_token ", _1nce_api_token);

      if (_1nce_api_token != '') {
        const _1nce_device_id = this.device_name.split('_');

        // GETリクエストの記述
        console.log(fileName, funcName[0], funcName[1], " Before no-await axios.get(1nce sim-data-quata):", " _1nce_device_id ", _1nce_device_id, " _1nce_device_id[0] ", _1nce_device_id[0]);
        axios.get(_1nce_url_base_v + 'sims/' + _1nce_device_id[0] + '/quota/data', {
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + _1nce_api_token,
            },
          }
        )
        .then(response => {
          // レスポンス処理
          console.log(fileName, funcName[0], funcName[1], " axios.get(1nce sim-data-quata).then:", " response.status ", response.status)
          console.log(fileName, funcName[0], funcName[1], " axios.get(1nce sim-data-quata).then:", " response.data ", response.data);

//          console.log(fileName, funcName[0], funcName[1], " Before set this.d_1nce_sim_data_quata_all_json:");
          this.d_1nce_sim_data_quata_all_json = response.data;
          console.log(fileName, funcName[0], funcName[1], " After set this.d_1nce_sim_data_quata_all_json:", " this.d_1nce_sim_data_quata_all_json ", this.d_1nce_sim_data_quata_all_json);
          this.d_1nce_sim_data_quata_volume = this.d_1nce_sim_data_quata_all_json.volume;
          console.log(fileName, funcName[0], funcName[1], " After set this.d_1nce_sim_data_quata_volume:", " this.d_1nce_sim_data_quata_volume ", this.d_1nce_sim_data_quata_volume);

          this.message_1nce_token_result = "1NCE APIトークンは有効です。";
          this.message_1nce_sim_quota_result = "1NCE SIMのデータ割当情報の取得に成功しました。";
        })
        .catch(error => {
          // エラーハンドリング
          console.log(fileName, funcName[0], funcName[1], " axios.get(1nce sim-data-quata).catch:", " error ", error)

          this.valid1nceApiToken = false;
          this.message_1nce_token_result = "1NCE APIアクセスに失敗しました。トークンを更新してください ↑";
          this.message_1nce_sim_quota_result = "1NCE SIMのデータ割当情報の取得に失敗しました。1NCE APIトークンを更新してください ↑";
        });
      }
      else {
        this.valid1nceApiToken = false;
        this.message_1nce_token_result = "1NCE APIトークンが無効です。更新してください。";
      }
    },
//    update1nceLocatePosition: async function() {
    update1nceLocatePosition: function() {
      const funcName = [":methods:", "update1nceLocatePosition:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

      const _1nce_api_token = localStorage.getItem('_1nce_api_token');
      console.log(fileName, funcName[0], funcName[1], "After localStorage.getItem():", " _1nce_api_token ", _1nce_api_token);

      if (_1nce_api_token != '') {
        const _1nce_device_id = this.device_name.split('_');

        // GETリクエストの記述
        console.log(fileName, funcName[0], funcName[1], " Before no-await axios.get(1nce locate):", " _1nce_device_id ", _1nce_device_id, " _1nce_device_id[0] ", _1nce_device_id[0]);
        axios.get(_1nce_url_base_v + 'locate/positions/latest?deviceId=' + _1nce_device_id[0], {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + _1nce_api_token,
            },
          }
        )
        .then(response => {
          // レスポンス処理
          console.log(fileName, funcName[0], funcName[1], " axios.get(1nce locate).then:", " response.status ", response.status)
          console.log(fileName, funcName[0], funcName[1], " axios.get(1nce locate).then:", " response.data ", response.data);

          if (response.data.coordinates == []) {
            console.log(fileName, funcName[0], funcName[1], " if (response.data.coordinates == []):");

            this.message_1nce_locate_result = "1NCE SIM デバイスの位置情報が登録されていません。";
          }
          else {
//            console.log(fileName, funcName[0], funcName[1], " Before set map position");
            this.d_1nce_map_marker_position = [response.data.coordinates[0].coordinate[1], response.data.coordinates[0].coordinate[0]]; // 緯度 latitude, 経度 longitude
            console.log(fileName, funcName[0], funcName[1], " After set map position:", " this.d_1nce_map_marker_position ", this.d_1nce_map_marker_position);

            this.message_1nce_locate_result = "1NCE SIM デバイスの位置情報の取得に成功しました。";
          }
          this.message_1nce_token_result = "1NCE APIトークンは有効です。";
         })
        .catch(error => {
          // エラーハンドリング
          console.log(fileName, funcName[0], funcName[1], " axios.get(1nce locate).catch:", " error ", error)

          this.valid1nceApiToken = false;
          this.message_1nce_token_result = "1NCE APIアクセスに失敗しました。トークンを更新してください。";
          this.message_1nce_locate_result = "1NCE SIM デバイスの位置情報の取得に失敗しました。1NCE APIトークンを更新してください ↑";
        });

/*
        console.log(fileName, funcName[0], funcName[1], " Before await axios.get(1nce locate);", " _1nce_device_id ", _1nce_device_id, " _1nce_device_id[0] ", _1nce_device_id[0]);
        const response = await axios.get(_1nce_url_base_v + 'locate/positions/latest?deviceId=' + _1nce_device_id[0], {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + _1nce_api_token,
            },
          }
        );
        console.log(fileName, funcName[0], funcName[1], " After await axios.get(1nce locate):", " response.status ", response.status)
        console.log(fileName, funcName[0], funcName[1], " After await axios.get(1nce locate):", " response.data ", response.data);
*/

/*
        console.log(fileName, funcName[0], funcName[1], " Before set map position");
//        this.d_1nce_map_marker_position[0] = response.data.coordinates[0].coordinate[1]; // 緯度 latitude
//        this.d_1nce_map_marker_position[1] = response.data.coordinates[0].coordinate[0]; // 経度 longitude
        this.d_1nce_map_marker_position = [response.data.coordinates[0].coordinate[1], response.data.coordinates[0].coordinate[0]]; // 緯度 latitude, 経度 longitude
        console.log(fileName, funcName[0], funcName[1], " After set map position", " this.d_1nce_map_marker_position ", this.d_1nce_map_marker_position);
*/
      }
      else {
        this.valid1nceApiToken = false;
        this.message_1nce_token_result = "1NCE APIトークンが無効です。更新してください。";
      }

//      currentInstance.proxy.$forceUpdate();
//      console.log(fileName, funcName[0], funcName[1], "After instance.proxy.forceUpdate():", " currentInstance ", currentInstance);
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

    // To follow updatad deviceInfo.
    const deviceInfo = ref('');
    deviceInfo.value = JSON.parse(localStorage.getItem('deviceInfo'));
    console.log(fileName, funcName[0], " deviceInfo.value ", deviceInfo.value);

    this.device_name = deviceInfo.value['device_name'];
    this.device_id = deviceInfo.value['device_id'];
    this.via_1nce_os = deviceInfo.value['via_1nce_os'];
    console.log(fileName, funcName[0], " this.device_name ", this.device_name, " this.device_id ", this.device_id, " this.via_1nce_os ", this.via_1nce_os);

    console.log(fileName, funcName[0], "Out.");
  },
  created: function() {
    const funcName = [":created:"];
    console.log(fileName, funcName[0], "In.");

    if (this.via_1nce_os) {
      console.log(fileName, funcName[0], " Before this.update1nceSimDataQuata():");
      this.update1nceSimDataQuata();

      console.log(fileName, funcName[0], " Before this.update1nceLocatePosition():");
      this.update1nceLocatePosition();
    }
    else {
      // Not via 1nce os.
      console.log(fileName, funcName[0], " Before this.valid1nceApiToken = true", " this.via_1nce_os ", this.via_1nce_os);
      this.valid1nceApiToken = true;
//      _1nce_api_token = '';
    }

    console.log(fileName, funcName[0], "Out.");
  },
  beforeMount: function() {
    const funcName = [":beforeMount:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], "Out.");
  },
  mounted: function() {
    const funcName = [":mounted:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], "Out.");
  },
  beforeUpdate: function() {
    const funcName = [":beforeUpdate:"];
    console.log(fileName, funcName[0], "In.");

    // Just for debug only.
    const route = useRoute();
    console.log(fileName, funcName[0], "After useRoute():", " route ", route);
    const id = route.params.id;
    console.log(fileName, funcName[0], "After id = route.params.id:", " id ", id, " route.params.id ", route.params.id);

//    this.device_name = devices[id].device_name;
//    this.device_id = devices[id].device_id;
//    this.via_1nce_os = devices[id].via_1nce_os;

    console.log(fileName, funcName[0], "Out.");
  },
  updated: function() {
    const funcName = [":updated:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], "Out.");
  },
  beforeUnmount: function() {
    const funcName = [":beforeUnmount:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], "Out.");
  },
  unmounted: function() {
    const funcName = [":unmounted:"];
    console.log(fileName, funcName[0], "In.");

    console.log(fileName, funcName[0], "Out.");
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
  margin: 0 auto;
  /*margin: 0px auto 100px auto;*/
  /*margin-bottom: 100px;*/
}
</style>
