<template>
  <div :class="$style.component">
    <!-- h2>Device list of dgroup_id: {{ dgroup_id }}</h2 -->
    <h3>Device list of dgroup_name: {{ dgroup_name }}</h3>
    <DeviceList :properties="properties" @eventDeleteDevice="deleteDevice" />
    <br><br>
    <div :class="$style.register_device">
      <p>a-z, A-Z, 0-9, _ is possible for device name.</p>
      <input
        v-model="device_name_input"
        :class="$style.device_name_input"
        placeholder="New device name">
      <input
        v-model="csr_input"
        :class="$style.csr_input"
        :disabled=!useCsr
        placeholder="CSR for new device">
      <button
        type="is-info"
        @click="registerDevice">
        Register
      </button>
      <input
        :class="$style.checkbox"
        type="checkbox"
        id="checkboxVia1nceOs"
        v-model="via1nceOs">
      <label for="checkboxVia1nceOs">1NCE OS経由</label>
      <input
        :class="$style.checkbox"
        type="checkbox"
        id="checkboxUseCsr"
        v-model="useCsr">
      <label for="checkboxUseCsr">CSR使用</label>
      <input
        :class="$style.checkbox"
        type="checkbox"
        id="checkboxDisplayCert"
        v-model="displayCert"
        @change="changedDisplayCert">
      <label for="checkboxDisplayCert">認証情報を表示する</label>
      <!-- pre>{{ $data }}</pre -->
    </div>
    <br><br>
    <p>{{ message_result }}</p>
    <p>{{ message_caution }}</p>
    <p>{{ message_certificatePem }}</p>
    <p>{{ message_PrivateKey }}</p>
    <div :class="$style.save_cert_info">
      <button
        type="is-info"
        :disabled=!enSaveCertInfo
        @click="saveCertInfo">
        認証情報をファイル保存
      </button>
    </div>
    <br><br>
    <button
      type="is-info"
      @click="refreshDisplay(true)">
      Refresh
    </button>
  </div>
</template>

<script>
// @ を指定することで `/src` の代替となる
import DeviceList from '@/components/DeviceList.vue'
import axios from 'axios'
import { /*defineProps,*/ ref } from 'vue';
//import { Amplify } from "aws-amplify";
import { fetchAuthSession } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';
//import * as fs from "fs-extra";
import { userBranch } from '../userbranch.js';
const fileName = "Devices.vue";

console.log(fileName, ":After import:");

console.log(userBranch);

/*
const props = defineProps({
  message: String,
})
const parentData = ref(props.defineProps);
console.log(fileName, ":After reg(prop):", " parentData.value ", parentData.value);
*/

let userInfo;
//let idToken;
const dgroupInfo = ref('');
let devices;
let ddata;

////const userBranch = process.env.USER_BRANCH;
//const userBranch = localStorage.getItem('userBranch');
//console.log(fileName, "userBranch ", userBranch);

//const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/_devices/';
let aws_url_base;
if (userBranch == 'main')
  aws_url_base = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/';
else if (userBranch == 'feature')
  aws_url_base = 'https://4nhe6ayc48.execute-api.ap-northeast-1.amazonaws.com/staging/';

console.log(fileName, "aws_url_base ", aws_url_base);

let responseData;
let certificatePem = '';
let PrivateKey = '';


export default {
  name: 'Devices',

//  props: ['account_id'], //propsオプションで受け取る値の名前を指定
  components: {
    DeviceList
  },
  data: /*async*/ function() {
    const funcName = [":data:"];
    console.log(fileName, funcName[0], "In.");

//    const dgroupId = ref('');
//    dgroupId.value = localStorage.getItem('dgroupId');
//    console.log(fileName, ":After localStorage.getItem():", " dgroupId.value ", dgroupId.value);

//    const ret = getDevices(dgroupId.value);
//    console.log(fileName, ":data-function():", "After getDevices():", " ret ", ret);

    // ここで返却するデータは子コンポーネント `DeviceList.vue` で表示するユーザ情報
    // 本来ならば DB 等で保持するのだが、今回は記事用のサンプルコードということでリストで持たせている
    console.log(fileName, ":data-function():", "Before return():", " devices ", devices);
    return {
      properties: {
        headers: [
          'device name',
          'device id',
          'via_1nce_os',
//          'dgroup_id',
        ],
        devices: null/*devices*/,
      },
      dgroup_id: '',
      dgroup_name: '',
      useCsr: false,
      via1nceOs: false,
      displayCert: true,
      device_name_input: '',
      csr_input: '',
      enSaveCertInfo: false,
      message_result: '',
      message_caution: '',
      message_certificatePem: '',
      message_PrivateKey: '',
    }
  },
//  methods: function() {
  methods: {
      //    let account_id = ref('')
//    console.log(fileName, ":methods-function():", " account_id ", account_id);
//    console.log(fileName, ":methods-function():", " this.account_id ", this.account_id);

    registerDevice: async function() {
      const funcName = [":methods:", "registerDevice:"];
      console.log(fileName, funcName[0], funcName[1], "In.");
      console.log(fileName, funcName[0], funcName[1], " this.properties ", this.properties);

      this.refreshDisplay(false);

      // 入力値の空欄チェック
      if (this.device_name_input == '') {
        this.message_result = '正しいデバイス名を入力してください。';
        return;
      }

      let response_api;
      let res = 0;
      let check_existing_flag; 

      const dgroupInfo = ref('');
      const dgroupId = ref('');
//      dgroupId.value = localStorage.getItem('dgroupId');
//      dgroupInfo.value = localStorage.getItem('dgroupInfo');
      dgroupInfo.value = JSON.parse(localStorage.getItem('dgroupInfo'));
      dgroupId.value = dgroupInfo.value['dgroup_id'];
//      console.log(fileName, funcName[0], funcName[1], "After localStorage.getItem():", " dgroupId.value ", dgroupId.value);
      console.log(fileName, funcName[0], funcName[1], "After localStorage.getItem():", " dgroupId.value ", dgroupId.value, ' dgroupInfo.value ', dgroupInfo.value);

      let csr = '';
      if (this.useCsr) {
        csr = this.csr_input;
      }

      // Device関連リソースの登録
      for (let i = 0; i < 2; i++) {
        check_existing_flag = !i;
        console.log(fileName, funcName[0], funcName[1], "Before await axios.post_device):", " check_existing_flag ", check_existing_flag);
        const idToken = (await fetchAuthSession()).tokens.idToken ?? '';
        await axios.post(aws_url_base + '_device', {
            device_name: this.device_name_input,
            dgroup_id: dgroupId.value,
            via_1nce_os: this.via1nceOs,
            account_id: userInfo.userId,
            csr: csr,
            check_existing_flag: check_existing_flag,
          }, {
              headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        )
        .then(function(response) {
//          this.message_result = 'Success';
          res = 1;
          responseData = response.data;
          console.log(funcName[0], funcName[1], "axios.post(_device).then:", " response.data ", response.data);
        })
        .catch(function(error) {
//          this.message_result = 'Error';
          res = -1;
          console.log(funcName[0], funcName[1], "axios.post(_device).catch:", " error ", error);
        })
        
        if (check_existing_flag && res == 1) {
          this.message_result = 'Duplicattion error';
          return;
        }
      }

      console.log(fileName, funcName[0], funcName[1], "After await axios.post(_device):", " res ", res, ' responseData ', responseData);

      if (res == 1) {
        certificatePem = responseData.certificatePem;
        PrivateKey = responseData.PrivateKey;

        this.message_caution = 'セキュリティの観点より、以下認証情報は再表示しませんので、必ず保存しておくようにしてください。';
//        this.message_result = 'Register Success: ' + JSON.stringify(responseData);
        this.message_result = 'Register Success';
        if (this.displayCert) {
          this.message_certificatePem = 'certificatePem: ' + certificatePem;
          if (!this.useCsr) {
            this.message_PrivateKey = 'PrivateKey: ' + PrivateKey;
            this.enSaveCertInfo = (certificatePem != '') && (PrivateKey != '');
          }
          else {
            this.enSaveCertInfo = (PrivateKey != '');
          }
        }
        else {
          this.message_certificatePem = 'certificatePem: ' + '*****';
          if (!this.useCsr) {
            this.message_PrivateKey = 'PrivateKey: ' + '*****';
            this.enSaveCertInfo = (certificatePem != '') && (PrivateKey != '');
          }
          else {
            this.enSaveCertInfo = (PrivateKey != '');
          }
        }
      }
      else if (res == -1)  {
        this.message_result = 'Register Error';
      }
      else {
        this.message_result = '';
      }
      console.log(fileName, funcName[0], funcName[1], "After if res:", " this.message_result ", this.message_result);

      // Deviceリストの更新
      try {
        const idToken = (await fetchAuthSession()).tokens.idToken ?? '';
        response_api = await axios.get(aws_url_base + '_devices/' + dgroupId.value, {
          headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        );
        console.log(fileName, funcName[0], funcName[1], "After axios.get(_devices)", " response_api ", response_api);
      }
      catch (error) {
        this.message_result = 'Delete Error';
        console.error(fileName, funcName[0], funcName[1], "catch for axios.get(_devices):", " error ", error);
        return error;
      }
      console.log(fileName, funcName[0], funcName[1], "After axios.get(_devices):", " response_api ", response_api);
      devices = response_api.data;
      devices.sort( function(a, b) {
        return a.device_name > b.device_name ? 1 : -1;
      });
      console.log(fileName, funcName[0], funcName[1], "After devices.sort():", " devices ", devices);
      for (let i = 0; i < devices.length; i++) {
        devices[i].id = i;
      }
      this.properties.devices = devices;
      console.log(fileName, funcName[0], funcName[1], "After this.properties update:", " this.properties ", this.properties);

      console.log(fileName, funcName[0], funcName[1], "Out.");
    },

    deleteDevice: async function(childData) {
      const funcName = [":methods:", "deleteDevice:"];
      console.log(fileName, funcName[0], funcName[1], "In.");
      console.log(fileName, funcName[0], funcName[1], " this.properties ", this.properties);
      console.log(fileName, funcName[0], funcName[1], " childData ", childData);

      this.refreshDisplay(true);

      let response_api;
      let res = 0;
      let device_id_selected = childData.selected.device_id;
      let device_name_selected = childData.selected.device_name;
      let dgroup_id_selected = childData.selected.dgroup_id;
      let via_1nce_os_selected = childData.selected.via_1nce_os;

      let response;

      if (via_1nce_os_selected != true) {
        via_1nce_os_selected = false;
      }

      try {
        const idToken = (await fetchAuthSession()).tokens.idToken ?? '';
//        response = await axios.get(aws_url_base + 'ddata/' + device_id_selected, {
        response = await axios.get(aws_url_base + 'ddata_between/' + device_id_selected + '?date_start=all' + '&date_end=all', {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        console.log(fileName, funcName[0], funcName[1], "After axios.get(ddata)", " response ", response);
        ddata = response.data;
      }
      catch (error) {
        this.message_result = 'Delete Error';
        console.error(fileName, funcName[0], funcName[1], "catch for axios.get(ddata:", " error ", error);
        return error;
      }

      if (ddata != null) {
        let loops = ddata.length;
        for(let i = 0; i < loops; ++i) {
          try {
            const idToken = (await fetchAuthSession()).tokens.idToken ?? '';
            response = await axios.delete(aws_url_base + 'ddata/' + device_id_selected + '/' + ddata[i].createdAt, {
                headers: {
                  Authorization: `Bearer ${idToken}`,
               },
              }
            );
            console.log(fileName, funcName[0], funcName[1], "After axios.delete(ddata):", " response ", response)
          }
          catch (error) {
            this.message_result = 'Delete Error';
            console.error(fileName, funcName[0], funcName[1], "catch for axios.delete(ddata):", " error ", error);
            return error;
          }
        }
        console.log(fileName, funcName[0], funcName[1], ":After loop for ddata:", " loops ", loops);
      }

      const payload = {
        device_name: device_name_selected,
        dgroup_id: dgroup_id_selected,
        via_1nce_os: via_1nce_os_selected,
      }

      res = 0;

      // Device関連リソースの削除
      console.log(fileName, funcName[0], funcName[1], "Before await axios.delete():", " payload ", payload);
      const idToken = (await fetchAuthSession()).tokens.idToken ?? '';
      await axios.delete(aws_url_base + '_device', {
          data: payload,
          headers: {
              Authorization: `Bearer ${idToken}`,
          },
        }
      )
      .then(function(response) {
        res = 1;
        console.log(funcName[0], funcName[1], "axios.delete(_device).then:", " response.data ", response.data);
      })
      .catch(function(error) {
        res = -1;
        console.log(funcName[0], funcName[1], "axios.delete(_device).catch:", " error ", error);
      })
      
      console.log(fileName, funcName[0], funcName[1], "After await axios.delete(_device):", " res ", res);

      if (res == 1)        { this.message_result = 'Delete Success';  }
      else if (res == -1)  { this.message_result = 'Delete Error'; }
      else                 { this.message_result = ''; }
      console.log(fileName, funcName[0], funcName[1], "After if res of axios.delete(_device):", " this.message_result ", this.message_result);

      // Deviceリストの更新
      try {
        const idToken = (await fetchAuthSession()).tokens.idToken ?? '';
        response_api = await axios.get(aws_url_base + '_devices/' + dgroup_id_selected, {
          headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        console.log(fileName, funcName[0], funcName[1], "After axios.get(_devices)", " response_api ", response_api);
      }
      catch (error) {
        console.error(fileName, funcName[0], funcName[1], "catch for axios.get(_devices):", " error ", error);
        return error;
      }
      console.log(fileName, funcName[0], funcName[1], "After axios.get(_devices):", " response_api ", response_api);
      devices = response_api.data;
      devices.sort( function(a, b) {
        return a.device_name > b.device_name ? 1 : -1;
      });
      console.log(fileName, funcName[0], funcName[1], "After devices.sort():", " devices ", devices);
      for (let i = 0; i < devices.length; i++) {
        devices[i].id = i;
      }
      this.properties.devices = devices;
      console.log(fileName, funcName[0], funcName[1], "After this.properties update:", " this.properties ", this.properties);

      console.log(fileName, funcName[0], funcName[1], "Out.");
    },
    
    saveCertInfo: function() {
      const funcName = [":methods:", "saveCertInfo:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

/*
      const saveFileName = "test.txt";
      fs.writeFile(saveFileName, this.certificatePem, (err) => {
        if (err) {
          alert(err);
        }
      });
*/

      // write file for certificatePem.
//      let write_json = JSON.stringify(block_id);
      let write_text = certificatePem;
//      let blob = new Blob([write_json], {type: 'application/json'});
      let blob = new Blob([write_text], {type: 'application/text'});
      let a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
//      document.body.appendChild(a); // Firefoxで必要
      a.download = 'deviceCert.pem';
      a.click();
//      document.body.removeChild(a); // Firefoxで必要
      console.log(fileName, funcName[0], funcName[1], "After a.click for certificatePem", ' write_text ', write_text, ' blob ', blob, ' a.href ', a.href, ' a.download ', a.download);
      URL.revokeObjectURL(a.href);

      if (!this.useCsr) {
        // write file for PrivateKey.
        write_text = PrivateKey;
        blob = new Blob([write_text], {type: 'application/text'});
        a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
//        document.body.appendChild(a); // Firefoxで必要
        a.download = 'private.key';
        a.click();
//        document.body.removeChild(a); // Firefoxで必要
        console.log(fileName, funcName[0], funcName[1], "After a.click for PrivateKey", ' write_text ', write_text, ' blob ', blob, ' a.href ', a.href, ' a.download ', a.download);
        URL.revokeObjectURL(a.href);
      }
    },

    refreshDisplay: function(creanInput) {
      const funcName = [":methods:", "refreshDisplay:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

      certificatePem = '';
      PrivateKey = '';
      this.enSaveCertInfo = false;

      if (creanInput) {
        this.device_name_input = ''; 
        this.csr_input = ''; 
      }
      this.message_result = 'Please input a new device name';
      this.message_caution = '';
      this.message_certificatePem = '';
      this.message_PrivateKey = '';
    },

    changedDisplayCert: function() {
      const funcName = [":methods:", "changedDisplayCert:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

      if (this.displayCert) {
        this.message_certificatePem = 'certificatePem: ' + certificatePem;
        if (!this.useCsr) {
          this.message_PrivateKey = 'PrivateKey: ' + PrivateKey;
        }
      }
      else {
        this.message_certificatePem = 'certificatePem: ' + '*****';
        if (!this.useCsr) {
          this.message_PrivateKey = 'PrivateKey: ' + '*****';
        }
      }
    },
  },
  beforeCreate: function() {
    const funcName = [":beforeCreate:"];
    console.log(fileName, funcName[0], "In.");

//    async function getDevices(dgroupId) {
//    const getDevices = async (dgroupId) => {
    const getUserAndDevices = async (dgroupId) => {
      const funcName = [":beforeCreate:", "getUserAndDevices:"];
      console.log(fileName, funcName[0], funcName[1], "In.", " dgroupId ", dgroupId);

      userInfo = await getCurrentUser();
      console.log(fileName, funcName[0], funcName[1], "After await getCurrentUser():", " userInfo ", userInfo);

      let response_api;

      try {
        const idToken = (await fetchAuthSession()).tokens.idToken ?? '';
//        console.log(fileName, funcName[0], funcName[1], "After (await fetchAuthSession()).tokens", ' idToken ', idToken);
    //    response_api = await axios.get(url + properties.account_id);
    //    response_api = await axios.get(url + this.account_id);
//        response_api = await axios.get(url + dgroupId);
        response_api = await axios.get(aws_url_base + '_devices/' + dgroupId, {
          headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
//        console.log(fileName, funcName[0], funcName[1], " response_api.status ", response_api.status)
        console.log(fileName, funcName[0], funcName[1], "After axios.get(_devices):", " response_api.data ", response_api.data);
        devices = response_api.data;
        devices.sort( function(a, b) {
          return a.device_name > b.device_name ? 1 : -1;
        });
        console.log(fileName, funcName[0], funcName[1], "After devices.sort(_devices):", " devices ", devices);
        for (let i = 0; i < devices.length; i++) {
          devices[i].id = i;
        }
        console.log(fileName, funcName[0], funcName[1], "After add id:", " devices ", devices);
        this.properties.devices = devices;
        this.dgroup_id = dgroupId;
        this.dgroup_name = dgroupInfo.value['dgroup_name'];
        console.log(fileName, funcName[0], funcName[1], "Before return:", " this.properties ", this.properties, " this.dgroup_id ", this.dgroup_id, " this.dgroup_name ", this.dgroup_name);
        return response_api;
      }
      catch (error) {
        console.error(fileName, funcName[0], funcName[1], "catch for axios.get(_devices):", " error ", error);
        return error;
      }
    }

//    const dgroupInfo = ref('');
    const dgroupId = ref('');
//    dgroupId.value = localStorage.getItem('dgroupId');
//    dgroupInfo.value = localStorage.getItem('dgroupInfo');
    dgroupInfo.value = JSON.parse(localStorage.getItem('dgroupInfo'));
    dgroupId.value = dgroupInfo.value['dgroup_id'];
    //    console.log(fileName, funcName[0], funcName[1], "After localStorage.getItem():", " dgroupId.value ", dgroupId.value);
    console.log(fileName, funcName[0], "After localStorage.getItem():", " dgroupId.value ", dgroupId.value, ' dgroupInfo.value ', dgroupInfo.value);

    const ret = getUserAndDevices(dgroupId.value);
    console.log(fileName, funcName[0], "After getDevices():", " ret ", ret);
  },
  created: function() {
    const funcName = [":created:"];
    console.log(fileName, funcName[0], "In.");

//    this.message_result = 'Please input a new device name';
    this.refreshDisplay(true);
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
  margin-top: /*50*/100px;
}

.device_name_input {
  font-size: 10px;
}

.csr_input {
  font-size: 10px;
}

.message_reslt {
  font-size: 10px;
}

.delete_device {
  font-size: 16px;
	display: flex;
	align-items: flex-start; /*ここは任意の値でOK*/
	justify-content: flex-end;
  margin-right: 100px;
}

.checkbox {
  margin-left: 20px;
}

.save_cert_info {
  /*font-size: 16px;*/
	display: flex;
	align-items: flex-start; /*ここは任意の値でOK*/
	justify-content: flex-end;
  margin-right: 100px;
}

/*
h1 {
  font-size: 36px;
}

h2 {
  font-size: 24px;
}

p {
  font-size: 12px;
}
*/

</style>
