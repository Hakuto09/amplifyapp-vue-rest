<template>
  <div>
    <h1>This page is user list.</h1>
    <div :class="$style.userlist">
      <!-- Buefy のテーブルを使って実現 -->
      <!-- https://buefy.org/documentation/table/ -->
      <b-table
        :data="properties.users"
        :columns="columns"
        :striped="true"
        :hoverable="true"
        :selected.sync="selected" />
    </div>
    <div :class="$style.showmore">
      <b-button
        type="is-info"
        @click="showMoreInformation">
        Show more selected...
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  props: {
    properties: {
      type: Object,
      'default': () => { return null },
    }
  },
  data: function() {
    return { 
      // `selected`, `columns` は Buefy のテーブルを使用する際に必要なパラメータ
      // https://buefy.org/documentation/table/
      selected: null,
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '50',
          numeric: true
        },
        {
          field: 'name',
          label: 'NAME',
          width: '400',
          centered: true
        },
        {
          field: 'mail',
          label: 'MAIL',
          width: '400',
          centered: true
        },
      ]
    }
  },
  methods: {
    showMoreInformation: function() {
      // アロー関数で定義すると `this` で `selected` が参照できない｡
      // 詳細は https://qiita.com/_Keitaro_/items/d48733a19c10889e2365 を参照のこと｡
      if (!this.selected) {
        alert('No data selected...')
        return false
      }
      const selected = this.selected
      this.$router.push({
        name: 'user-detail',
        params: { id: selected['id'] }
      })
    }
  }
}
</script>

// スタイルは割愛
