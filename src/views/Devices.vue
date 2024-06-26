<template>
  <div :class="$style.component">
    <!-- h2>Device list of dgroup_id: {{ dgroup_id }}</h2 -->
    <h2>Device list of dgroup_name: {{ dgroup_name }}</h2>
    <DeviceList :properties="properties" @eventDeleteDevice="deleteDevice" />
    <br><br>
    <div :class="$style.register_device">
      <p>a-z, A-Z, 0-9, _ is possible for device name.</p>
      <input
        v-model="properties.device_name_input"
        :class="$style.device_name_input"
        placeholder="New device name">
      <input
        v-model="properties.csr_input"
        :class="$style.csr_input"
        placeholder="CSR for new device">
      <button
        type="is-info"
        @click="registerDevice">
        Register
      </button>
      <input :class="$style.checkbox" type="checkbox" id="checkbox" v-model="useCsr">
      <label for="checkbox">CSR使用</label>
      <!-- pre>{{ $data }}</pre -->
    </div>
    <br><br>
    <p>{{ properties.message_result }}</p>
  </div>
</template>

<script>
// @ を指定することで `/src` の代替となる
import DeviceList from '@/components/DeviceList.vue'
import axios from 'axios'
import { /*defineProps,*/ ref } from 'vue';
//import { Amplify } from "aws-amplify";
import { getCurrentUser } from 'aws-amplify/auth';
const fileName = "Devices.vue";

console.log(fileName, ":After import:");

/*
const props = defineProps({
  message: String,
})
const parentData = ref(props.defineProps);
console.log(fileName, ":After reg(prop):", " parentData.value ", parentData.value);
*/

let userInfo;
const dgroupInfo = ref('');
let devices;
//const url = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/_devices/';
const url_base = 'https://ig57m9ooi1.execute-api.ap-northeast-1.amazonaws.com/dev/';

let responseData; 

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
//          'dgroup_id',
        ],
        devices: null/*devices*/,
        dgroup_name_input: '',
        csr_input: '',
        message_result: '',
      },
      dgroup_id: 0,
      dgroup_name: '',
      useCsr: false,
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
        csr = this.properties.csr_input;
      }

      // Device関連リソースの登録
      for (let i = 0; i < 2; i++) {
        check_existing_flag = !i;
        console.log(fileName, funcName[0], funcName[1], "Before await axios.post():", " check_existing_flag ", check_existing_flag);
        await axios.post(url_base + '_device',
          {
            device_name: this.properties.device_name_input,
            dgroup_id: dgroupId.value,
            account_id: userInfo.userId,
            csr: csr,
            check_existing_flag: check_existing_flag,
          })
          .then(function(response) {
  //          this.properties.message_result = 'Success';
            res = 1;
            responseData = response.data;
            console.log(funcName[0], funcName[1], "axios.post().then", " response.data ", response.data);
          })
          .catch(function(error) {
  //          this.properties.message_result = 'Error';
            res = -1;
            console.log(funcName[0], funcName[1], "axios.post().catch", " error ", error);
          })
        
        if (check_existing_flag && res == 1) {
          this.properties.message_result = 'Duplicattion error';
          return;
        }
      }

      console.log(fileName, funcName[0], funcName[1], "After await axios.post():", " res ", res);

      if (res == 1)        { this.properties.message_result = 'Register Success: ' + responseData; }
      else if (res == -1)  { this.properties.message_result = 'Register Error'; }
      else                 { this.properties.message_result = ''; }
      console.log(fileName, funcName[0], funcName[1], "After if res:", " this.properties.message_result ", this.properties.message_result);

      // Deviceリストの更新
      response_api = await axios.get(url_base + '_devices/' + dgroupId.value);
      console.log(fileName, funcName[0], funcName[1], "After axios.get():", " response_api ", response_api);
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

      let response_api;
      let res = 0;
      let dgroup_id = childData.selected.dgroup_id;
      const payload = {
        device_name: childData.selected.device_name,
        dgroup_id: dgroup_id,
      }

      // Device関連リソースの削除
      console.log(fileName, funcName[0], funcName[1], "Before await axios.delete():", " payload ", payload);
      await axios.delete(url_base + '_device',
        {
          data: payload,
        })
        .then(function(response) {
          res = 1;
          console.log(funcName[0], funcName[1], "axios.delete().then", " response.data ", response.data);
        })
        .catch(function(error) {
          res = -1;
          console.log(funcName[0], funcName[1], "axios.delete().catch", " error ", error);
        })
      
      console.log(fileName, funcName[0], funcName[1], "After await axios.delete():", " res ", res);

      if (res == 1)        { this.properties.message_result = 'Delete Success';  }
      else if (res == -1)  { this.properties.message_result = 'Delete Error';    }
      else                 { this.properties.message_result = '';         }
      console.log(fileName, funcName[0], funcName[1], "After if res:", " this.properties.message_result ", this.properties.message_result);

      // Deviceリストの更新
      response_api = await axios.get(url_base + '_devices/' + dgroup_id);
      console.log(fileName, funcName[0], funcName[1], "After axios.get():", " response_api ", response_api);
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
    }
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
    //    response_api = await axios.get(url + properties.account_id);
    //    response_api = await axios.get(url + this.account_id);
//        response_api = await axios.get(url + dgroupId);
        response_api = await axios.get(url_base + '_devices/' + dgroupId);
//        console.log(fileName, funcName[0], funcName[1], " response_api.status ", response_api.status)
        console.log(fileName, funcName[0], funcName[1], "After axios.get():", " response_api.data ", response_api.data);
        devices = response_api.data;
        devices.sort( function(a, b) {
          return a.device_name > b.device_name ? 1 : -1;
       });
        console.log(fileName, funcName[0], funcName[1], "After devices.sort():", " devices ", devices);
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
        console.error(fileName, funcName[0], funcName[1], " error ", error);
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

    this.properties.message_result = 'Please input a new device name';
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
  margin: 20px;
}


h1 {
  font-size: 36px;
}

h2 {
  font-size: 24px;
}

p {
  font-size: 12px;
}
</style>
