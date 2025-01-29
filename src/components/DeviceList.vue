<template>
  <div>
    <!-- h1>This page is device list.</h1 -->
    <!-- h2>Device list of dgroup_id: {{ dgroupId }}</h2 -->
    <div :class="$style.devicelist">
      <table>
        <thead>
          <tr>
            <!-- th><input :class="$style.headerRadio" type="radio" @click="select"></th -->
            <!-- th><input :class="$style.headerRadio" type="radio" v-on:click="select"></th -->
            <!-- th><input :class="$style.headerRadio" type="radio" v-on:change="select"></th -->
            <th><input :class="$style.headerRadio" type="radio"></th>
            <th v-for="(header, index) in properties.headers" v-bind:key="index">
              {{header}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="device in properties.devices" v-bind:key="device.id">
            <td><input type="radio" :value="device" v-model="selected"></td>
            <td>{{device.device_name}}</td>
            <td>{{device.device_id}}</td>
            <td>{{device.via_1nce_os}}</td>
            <!-- td>{{device.dgroup_id}}</td -->
          </tr>
        </tbody>
      </table>
    </div>
    <br><br>
    <div :class="$style.show_device_info">
      <button
        type="is-info"
        :disabled=!enSelect
        @click="showDeviceInfo">
        Show device info
      </button>
    </div>
    <div :class="$style.delete_device">
      <button
        type="is-info"
        :disabled=!enSelect
        @click="selectDeleteDevice">
        Select Delete
      </button>
    </div>
    <div :class="$style.delete_device">
      <p>※注意：元に戻せませんので、削除前によくご確認ください。</p>
    </div>
  </div>
</template>

<script>
//import { useStorage } from '@vueuse/core';
//import { ref } from 'vue';
import { toRaw } from 'vue';
const fileName = "DeviceList.vue";

console.log(fileName, ":After import:");


export default {
  name: 'DeviceList',
  props: {
    properties: {
      type: Object,
      'default': () => { return null },
    }
  },
  data: function() {
    console.log(fileName, ":data-function():", " this.properties ", this.properties);
    console.log(fileName, ":data-function():", " toRaw(this.properties).devices ", toRaw(this.properties).devices);

    console.log(fileName, ":data-function():", "Before return():");
    return {
      selected: null,
      enSelect: false,
    }
  },
  methods: {
/*
    // templateのheaderのところで記述しているせいか、呼ばれないため、使わない。
    select: function() {
      this.selected = []
      console.log(fileName, ":select-function(): In:", " this.selected ", this.selected, " this.items ", this.items, " this.item ", this.item);
      for (let i in this.item) {
        this.selected.push(this.items[i].id)
        console.log(fileName, ":select-function(): for loop:", " this.selected ", this.selected, " this.items[i] ", this.items[i]);
      }
    },
*/

    showDeviceInfo: function() {
      const funcName = [":methods:", "showDeviceInfo:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

//      const msg = useStorage('msg', 'Hello World!')
//      console.log(fileName, ":showDeviceInfo():", " msg.value ", msg.value);

//      const saveLocal = (deviceId) => {
      const saveDeviceInfo = (deviceInfo) => {
          const funcName = [":methods:", "showDeviceInfo:", "saveDeviceInfo:"];
//        localStorage.setItem('deviceId', deviceId);
        localStorage.setItem('deviceInfo', deviceInfo);
//        console.log(fileName, funcName[0], funcName[1], funcName[2], "After localStorage.setItem():", " deviceId ", deviceId);
        console.log(fileName, funcName[0], funcName[1], funcName[2], "After localStorage.setItem():", " deviceInfo ", deviceInfo);
      }

      if (!this.selected) {
        alert('No data selected...')
        return false
      }

      const deviceInfoJson = JSON.stringify(this.selected);

//      saveLocal(this.selected['device_id']);
      saveDeviceInfo(deviceInfoJson);
//      console.log(fileName, funcName[0], funcName[1], "After saveLocal():", " this.selected ", this.selected);
      console.log(fileName, funcName[0], funcName[1], "After saveDeviceInfo():", " this.selected ", this.selected, " deviceInfoJson ", deviceInfoJson);

//      const deviceId = ref('');
//      deviceId.value = localStorage.getItem('deviceId');
//      console.log(fileName, ":After localStorage.getItem():", " deviceId.value ", deviceId.value);

//      this.$localStorage.set('devicelist_id', selected['id'])
//      console.log(fileName, ":After localStorage.set():", " selected['id'] ", selected['id']);

      this.$router.push({
        name: 'device-detail',
        params: {
          id: this.selected['id'],
//          device_id: this.selected['device_id'],
        }
      })
    },

    selectDeleteDevice: function() {
      const funcName = [":methods:", "selectDeleteDevice:"];
      console.log(fileName, funcName[0], funcName[1], "In.");
      console.log(fileName, funcName[0], funcName[1], " this.properties ", this.properties);

      if (!this.selected) {
        alert('No data selected...');
        return false;
      }

      if (confirm('選択Deviceの削除を実行してもよろしいですか？')) {
        // OKがクリックされた場合の処理
        this.$emit('eventDeleteDevice', { 'selected': this.selected });
        console.log(fileName, funcName[0], funcName[1], "After $emit()", " this.selected ", this.selected);
      }
      else {
        // キャンセルがクリックされた場合の処理
        alert('操作はキャンセルされました');
      }
    },
  },
  beforeCreate: function() {
    const funcName = [":beforeCreate:"];
    console.log(fileName, funcName[0], "In.");
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

    this.enSelect = !(this.selected == null);
    console.log(fileName, funcName[0], " this.selected ", this.selected, " this.items ", this.items, " this.item ", this.item);
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
.devicelist {
  margin: auto;
  width: 100%;
  /* 子要素を中央に配置する */
  display: flex;
  justify-content: center;
  align-items: center;
}

.devicelist li {
    padding: 8px 25px;
    border-bottom: 1px solid #000000;
}

.devicelist td {
    padding: 8px 25px;
    border-bottom: 1px solid #000000;
}

.devicetable {
  border: solid 1px;
  width: 90%;
  border-collapse: collapse;
  /* 子要素を中央に配置する */
  justify-content: center;
  align-items: center;
}

.headerRadio {
  opacity:0;
}

.delete_device {
  font-size: 16px;
	display: flex;
	align-items: flex-start; /*ここは任意の値でOK*/
	justify-content: flex-end;
  margin-right: 100px;
}
</style>

