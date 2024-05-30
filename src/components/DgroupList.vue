<template>
  <div>
    <h1>This page is dgroup list.</h1>
    <div :class="$style.dgrouplist">
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
          <!-- tr v-for="dgroup in properties.dgroups" v-bind:key="dgroup.id" -->
          <tr v-for="dgroup in properties.dgroups" v-bind:key="dgroup.account_id">
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
export default {
  name: 'dgroupList',
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
      console.log("dgroupList.vue:", "select-function(): In:", " this.selected ", this.selected, " this.items ", this.items, " this.item ", this.item);
      for (let i in this.item) {
        this.selected.push(this.items[i].id)
        console.log("dgroupList.vue:", "select-function(): for loop:", " this.selected ", this.selected, " this.items[i] ", this.items[i]);
      }
    },
    showMoreInformation: function() {
      // アロー関数で定義すると `this` で `selected` が参照できない｡
      // 詳細は https://qiita.com/_Keitaro_/items/d48733a19c10889e2365 を参照のこと｡
      if (!this.selected) {
        alert('No data selected...')
        return false
      }
      const selected = this.selected
      console.log("dgroupList.vue:", "showMoreInformation():", " this ", this);
      console.log("dgroupList.vue:", "showMoreInformation():", " selected ", selected);
      this.$router.push({
        name: 'dgroup-detail',
        params: {
          id: selected['id']
        }
      })
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

