<template>
  <div>
    <h1>This page is device list.</h1>
    <div :class="$style.devicelist">
      <table>
        <thead>
          <tr>
            <!-- th><input :class="$style.headerRadio" type="radio" @click="select"></th -->
            <!-- th><input :class="$style.headerRadio" type="radio" v-on:click="select"></th -->
            <th><input :class="$style.headerRadio" type="radio" v-on:change="select"></th>
            <th v-for="(header, index) in properties.headers" v-bind:key="index">
              {{header}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="device in properties.devices" v-bind:key="device.id">
            <td><input type="radio" :value="device" v-model="selected"></td>
            <td>{{device.device_id}}</td>
            <td>{{device.device_name}}</td>
            <td>{{device.dgroup_id}}</td>/
          </tr>
        </tbody>
      </table>
    </div>
    <div :class="$style.showmore">
      <button
        type="is-info"
        @click="showMoreInformation">
        Show more selected...
      </button>
    </div>
  </div>
</template>

<script>
//import { useStorage } from '@vueuse/core';
import { ref } from 'vue';
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
    return {
      selected: null,
    }
  },
  methods: {
    select: function() {
      this.selected = []
      console.log("DeviceList.vue:", "select-function(): In:", " this.selected ", this.selected, " this.items ", this.items, " this.item ", this.item);
      for (let i in this.item) {
        this.selected.push(this.items[i].id)
        console.log("DeviceList.vue:", "select-function(): for loop:", " this.selected ", this.selected, " this.items[i] ", this.items[i]);
      }
    },
    showMoreInformation: function() {
//      const msg = useStorage('msg', 'Hello World!')
//      console.log("DeviceList.vue:", "showMoreInformation():", " msg.value ", msg.value);

      const deviceId = ref('');
      const saveLocal = (deviceId) => {
        localStorage.setItem('deviceId', deviceId);
        console.log("DeviceList.vue:", "saveLocal():", "After localStorage.setItem():", " deviceId ", deviceId);
      }

      if (!this.selected) {
        alert('No data selected...')
        return false
      }
      const selected = this.selected
      console.log("DeviceList.vue:", "showMoreInformation():", " this ", this);
      console.log("DeviceList.vue:", "showMoreInformation():", " selected ", selected);

      saveLocal(selected['device_id']);
      deviceId.value = localStorage.getItem('deviceId');
      console.log("DeviceList.vue:", "After localStorage.getItem():", " deviceId.value ", deviceId.value);

//      this.$localStorage.set('devicelist_id', selected['id'])
//      console.log("DeviceList.vue:", "After localStorage.set():", " selected['id'] ", selected['id']);

      this.$router.push({
        name: 'device-detail',
        params: {
          id: selected['id'],
          device_id: selected['device_id'],
        }
      })
    }
  },
  beforeCreate: function() {
    console.log(fileName, ":beforeCreate-function(): In.");
  },
  created: function() {
    console.log(fileName, ":created-function(): In.");
  },
  beforeMount: function() {
    console.log(fileName, ":beforeMount-function(): In.");
  },
  mounted: function() {
    console.log(fileName, ":mounted-function(): In.");
  },
  beforeUpdate: function() {
    console.log(fileName, ":beforeUpdate-function(): In.");
  },
  updated: function() {
    console.log(fileName, ":updated-function(): In.");
  },
  beforeUnmount: function() {
    console.log(fileName, ":beforeUnmount-function(): In.");
  },
  unmounted: function() {
    console.log(fileName, ":unmounted-function(): In.");
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
</style>

