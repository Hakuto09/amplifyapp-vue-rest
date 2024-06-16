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
            <td>{{dgroup.dgroup_name}}</td>
            <td>{{dgroup.dgroup_id}}</td>
            <!-- td>{{dgroup.account_id}}</td -->
          </tr>
        </tbody>
      </table>
    </div>
    <div :class="$style.select_dgroup">
      <button
        type="is-info"
        @click="selectDgroup">
        Select dgroup
      </button>
    </div>
    <div :class="$style.delete_dgroup">
      <button
        type="is-info"
        @click="selectDeleteDgroup">
        Select Delete
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

/*
      const saveLocal = (dgroupId) => {
        const funcName = [":methods:", "selectDgroup:", "saveLocal:"];
        localStorage.setItem('dgroupId', dgroupId);
        console.log(fileName, funcName[0], funcName[1], funcName[2], "After localStorage.setItem():", " dgroupId ", dgroupId);
      }
*/

      const saveDgroupInfo = (dgroupInfo) => {
        const funcName = [":methods:", "selectDgroup:", "saveDgroupInfo:"];
        localStorage.setItem('dgroupInfo', dgroupInfo);
        console.log(fileName, funcName[0], funcName[1], funcName[2], "After localStorage.setItem():", " dgroupInfo ", dgroupInfo);
      }

      if (!this.selected) {
        alert('No data selected...');
        return false;
      }

//      saveLocal(this.selected['dgroup_id']);
      saveDgroupInfo(this.selected);
//      console.log(fileName, funcName[0], funcName[1], "After saveLocal():", " this.selected ", this.selected);
      console.log(fileName, funcName[0], funcName[1], "After saveDgroupInfo():", " this.selected ", this.selected);

//      const dgroupId = ref('');
//      dgroupId.value = localStorage.getItem('dgroupId');
//      console.log(fileName, ":After localStorage.getItem():", " dgroupId.value ", dgroupId.value);

//      this.$localStorage.set('dgrouplist_id', selected['id'])
//      console.log(fileName, ":After localStorage.set():", " selected['id'] ", selected['id']);

      this.$router.push({
        name: 'devices',
//        params: {
//          id: this.selected['id'],
//        }
      })
    },
    selectDeleteDgroup: function() {
      const funcName = [":methods:", "eventDeleteDgroup:"];
      console.log(fileName, funcName[0], funcName[1], "In.");
      console.log(fileName, funcName[0], funcName[1], " this.properties ", this.properties);

      if (!this.selected) {
        alert('No data selected...');
        return false;
      }

//      const emit = defineEmits(['eventDeleteDgroup']);
//      const execEmit = () => {
//        emit('eventDeleteDgroup', { 'selected': this.selected });
      this.$emit('eventDeleteDgroup', { 'selected': this.selected });
      console.log(fileName, funcName[0], funcName[1], "After $emit()", " this.selected ", this.selected);
        //      }
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
  },
  updated: function() {
    const funcName = [":updated:"];
    console.log(fileName, funcName[0], "In.");

//    this.selected = 0;
//    console.log(fileName, funcName[0], "After this.selected = 0:", " this.selected ", this.selected);
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
  justify-content: center;
  /*justify-content: space-between;*/
  /*justify-content: space-around;*/
  /*justify-content: space-evenly;*/
  align-items: center;
}

.dgrouplist li {
    padding: 8px 25px;
    border-bottom: 1px solid #000000;
}

.dgrouplist td {
    padding: 8px 25px;
    border-bottom: 1px solid #000000;
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

.delete_dgroup {
  font-size: 16px;
	display: flex;
	align-items: flex-start; /*ここは任意の値でOK*/
	justify-content: flex-end;
  margin-right: 100px;
}
</style>

