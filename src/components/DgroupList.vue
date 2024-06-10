<template>
  <div>
    <!-- h1>This page is dgroup list.</h1 -->
    <!-- h2>Device group list of account_id: {{ accountId }}</h2 -->
    <div :class="$style.dgrouplist">
      <!-- div>
        <p>{{ properties.account_id }}</p>
      </div -->
      <table>
        <thead>
          <tr>
            <th><input :class="$style.headerRadio" type="radio" @click="select"></th>
            <th v-for="(header, index) in properties.headers" v-bind:key="index">
              {{header}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dgroup in properties.dgroups" v-bind:key="dgroup.id">
            <td><input type="radio" :value="dgroup" v-model="selected"></td>
            <td>{{dgroup.dgroup_id}}</td>
            <td>{{dgroup.dgroup_name}}</td>
            <!-- td>{{dgroup.account_id}}</td -->
          </tr>
        </tbody>
      </table>
    </div>
    <div :class="$style.showmore">
      <button
        type="is-info"
        @click="selectDgroup">
        Select dgroup
      </button>
    </div>
  </div>
</template>

<script>
//import { useStorage } from '@vueuse/core';
//import { ref } from 'vue';
//import { toRaw } from 'vue';
const fileName = "DgroupList.vue";

console.log(fileName, ":After import:");


export default {
  name: 'DgroupList',
  props: {
    properties: {
      type: Object,
      'default': () => { return null },
    }
  },
  data: function() {
    const funcName = [":data:"];
    console.log(fileName, funcName[0], "In.");

//    console.log(fileName, funcName[0], " this.properties ", this.properties);
//    console.log(fileName, funcName[0], " toRaw(this.properties).dgroups ", toRaw(this.properties).dgroups);

    console.log(fileName, funcName[0], "Before return():");
    return {
      selected: null,
    }
  },
  methods: {
    select: function() {
      this.selected = []
      console.log(fileName, ":select-function(): In:", " this.selected ", this.selected, " this.items ", this.items, " this.item ", this.item);
      for (let i in this.item) {
        this.selected.push(this.items[i].id)
        console.log(fileName, ":select-function(): for loop:", " this.selected ", this.selected, " this.items[i] ", this.items[i]);
      }
    },
    selectDgroup: function() {
      const funcName = [":methods:", "selectDgroup:"];
      console.log(fileName, funcName[0], funcName[1], "In.");
      console.log(fileName, funcName[0], funcName[1], " this.properties ", this.properties);

//      const msg = useStorage('msg', 'Hello World!')
//      console.log(fileName, ":showMoreInformation():", " msg.value ", msg.value);

      const saveLocal = (dgroupId) => {
        const funcName = [":methods:", "selectDgroup:", "saveLocal:"];
        localStorage.setItem('dgroupId', dgroupId);
        console.log(fileName, funcName[0], funcName[1], funcName[2], "After localStorage.setItem():", " dgroupId ", dgroupId);
      }

      if (!this.selected) {
        alert('No data selected...')
        return false
      }

      saveLocal(this.selected['dgroup_id']);
      console.log(fileName, funcName[0], funcName[1], "After saveLocal():", " this.selected ", this.selected);

//      const dgroupId = ref('');
//      dgroupId.value = localStorage.getItem('dgroupId');
//      console.log(fileName, ":After localStorage.getItem():", " dgroupId.value ", dgroupId.value);

//      this.$localStorage.set('dgrouplist_id', selected['id'])
//      console.log(fileName, ":After localStorage.set():", " selected['id'] ", selected['id']);

      /*
      this.$router.push({
        name: 'dgroup-detail',
        params: {
          id: selected['id']
        }
      })
      */
    }
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

.dgrouplist {
  margin: auto;
  width: 100%;
  /* 子要素を中央に配置する */
  display: flex;
  /*justify-content: center; */
  justify-content: space-between;
  align-items: center;
}

.dgrouptable {
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

