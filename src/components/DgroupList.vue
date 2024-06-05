<template>
  <div>
    <h1>This page is dgroup list.</h1>
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
            <td>{{dgroup.account_id}}</td>
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
    console.log("DgroupList.vue:", "data-function():", " this.properties ", this.properties);

    return {
      selected: null,
    }
  },
  methods: {
    select: function() {
      this.selected = []
      console.log("DgroupList.vue:", "select-function(): In:", " this.selected ", this.selected, " this.items ", this.items, " this.item ", this.item);
      for (let i in this.item) {
        this.selected.push(this.items[i].id)
        console.log("DgroupList.vue:", "select-function(): for loop:", " this.selected ", this.selected, " this.items[i] ", this.items[i]);
      }
    },
    showMoreInformation: function() {
      console.log("DgroupList.vue:", "showMoreInformation():", " this.properties ", this.properties);

//      const msg = useStorage('msg', 'Hello World!')
//      console.log("DgroupList.vue:", "showMoreInformation():", " msg.value ", msg.value);

      const dgroupId = ref('');
      const saveLocal = (dgroupId) => {
        localStorage.setItem('dgroupId', dgroupId);
        console.log("DgroupList.vue:", "saveLocal():", "After localStorage.setItem():", " dgroupId ", dgroupId);
      }

      if (!this.selected) {
        alert('No data selected...')
        return false
      }
      const selected = this.selected
      console.log("DgroupList.vue:", "showMoreInformation():", " this ", this);
      console.log("DgroupList.vue:", "showMoreInformation():", " selected ", selected);

      saveLocal(selected['dgroup_id']);
      dgroupId.value = localStorage.getItem('dgroupId');
      console.log("DgroupList.vue:", "After localStorage.getItem():", " dgroupId.value ", dgroupId.value);

//      this.$localStorage.set('dgrouplist_id', selected['id'])
//      console.log("DgroupList.vue:", "After localStorage.set():", " selected['id'] ", selected['id']);

      /*
      this.$router.push({
        name: 'dgroup-detail',
        params: {
          id: selected['id']
        }
      })
      */
    }
  }
}
</script>

<style module>

.dgrouplist {
  margin: auto;
  width: 100%;
  /* 子要素を中央に配置する */
  display: flex;
  justify-content: center;
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

