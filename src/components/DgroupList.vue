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
            <!-- th><input :class="$style.headerRadio" type="radio" @click="selectRadio"></th -->
            <!-- th><input :class="$style.headerRadio" type="radio" @change="changeRadio"></th -->
            <th><input :class="$style.headerRadio" type="radio"></th>
            <th v-for="(header, index) in properties.headers" v-bind:key="index">
              {{header}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dgroup in properties.dgroups" v-bind:key="dgroup.id">
            <td><input type="radio" :value="dgroup" v-model="selected"></td>
            <!-- td><input type="radio" :value="dgroup" v-model="selected" @click="selectRadio"></td -->
            <td>{{dgroup.dgroup_name}}</td>
            <td>{{dgroup.dgroup_id}}</td>
            <!-- td>{{dgroup.account_id}}</td -->
          </tr>
        </tbody>
      </table>
    </div>
    <br><br>
    <div :class="$style.select_dgroup">
      <button
        type="is-info"
        :disabled=!enSelect
        @click="selectDgroup">
        Select dgroup
      </button>
    </div>
    <div :class="$style.delete_dgroup">
      <button
        type="is-info"
        :disabled=!enSelect
        @click="selectDeleteDgroup">
        Select Delete
      </button>
    </div>
    <!-- div>
      <button :disabled="dialog.isRevealed.value" @click="onClick">
        確認
      </button>
      <div v-if="dialog.isRevealed.value">
        ダイアログ表示
        <button @click="dialog.confirm">
          OK
        </button>
        <button @click="dialog.cancel">
          Cancel
        </button>
      </div>
    </div -->
  </div>
  <v-app>
    <v-btn @click="my_dialog = true">開く</v-btn>
    <v-dialog v-model="my_dialog" max-width="400">
      <v-card>
        <v-card-title>
          <div>タイトル</div>
        </v-card-title>
        <v-card-text>
          <p>本文</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="my_dialog = false">閉じる</v-btn>
          <v-btn @click="confirm">確認</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>

  <button @click="openDialog">
    Show Modal
  </button>

  <teleport to="body">
    <div v-if="isRevealed" class="modal-layout">
      <div class="modal">
        <h2>Confirm?</h2>
        <button @click="confirm(true)">
          Yes
        </button>
        <button @click="confirm(false)">
          No
        </button>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { useConfirmDialog } from '@vueuse/core'

const {
  isRevealed,
  reveal,
  confirm,
  cancel,
} = useConfirmDialog()
console.log("cancel: ", cancel);

async function openDialog() {
  console.log("openDialog(): In.");
  const { data, isCanceled } = await reveal();
  console.log("openDialog(): After reveal():", " data ", data, " isCanceled ", isCanceled);
  if (!isCanceled) {
    console.log(data)
  }
}
</script>

<script>
//import { useStorage } from '@vueuse/core';
//import { ref } from 'vue';
//import { toRaw } from 'vue';
//import { useConfirmDialog } from '@vueuse/core';
const fileName = "DgroupList.vue";

console.log(fileName, ":After import:");

//let dialog;
const dialog = useConfirmDialog();

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
      enSelect: false,
//      dialog: dialog,
      my_dialog: false,
    }
  },
  methods: {
/*
    // templateのリストのところで記述して呼ばれはするが、なぜか一つ前のthis.selectedしか取得できないため、使わない。
    selectRadio: function() {
      const funcName = [":methods:", "selectRadio:"];
      console.log(fileName, funcName[0], funcName[1], "In.", " this.selected ", this.selected, " this.items ", this.items, " this.item ", this.item);

//      this.selected = []
//      for (let i in this.item) {
//        this.selected.push(this.items[i].id)
//        console.log(fileName, ":select-function(): for loop:", " this.selected ", this.selected, " this.items[i] ", this.items[i]);
//      }
    },
*/
/*
    // templateのheaderのところで記述しているせいか、呼ばれないため、使わない。
    changeRadio: function() {
      const funcName = [":methods:", "changeRadio:"];
      console.log(fileName, funcName[0], funcName[1], "In.", " this.selected ", this.selected, " this.items ", this.items, " this.item ", this.item);
    },
*/

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

//      const dgroupInfo = toRaw(this.selected);
      const dgroupInfoJson = JSON.stringify(this.selected);
//      saveLocal(this.selected['dgroup_id']);
//      saveDgroupInfo(this.selected);
      saveDgroupInfo(dgroupInfoJson);
//      console.log(fileName, funcName[0], funcName[1], "After saveLocal():", " this.selected ", this.selected);
//      console.log(fileName, funcName[0], funcName[1], "After saveDgroupInfo():", " this.selected ", this.selected);
//      console.log(fileName, funcName[0], funcName[1], "After saveDgroupInfo():", " this.selected ", this.selected, ' dgroupInfo ', dgroupInfo);
      console.log(fileName, funcName[0], funcName[1], "After saveDgroupInfo():", " this.selected ", this.selected, ' dgroupInfoJson ', dgroupInfoJson);

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

    selectDeleteDgroup: async function() {
      const funcName = [":methods:", "selectDeleteDgroup:"];
      console.log(fileName, funcName[0], funcName[1], "In.");

/*
//      dialog = useConfirmDialog();
      console.log(fileName, funcName[0], funcName[1], "Before await dialog.reveal():", " dialog ", dialog);
      const { isCanceled } = await dialog.reveal();
      console.log(fileName, funcName[0], funcName[1], "After await dialog.reveal():", " isCanceled ", isCanceled);
      if (isCanceled) return;
*/

      console.log(fileName, funcName[0], funcName[1], "Befreo dialog.confirm():");
      if (await dialog.confirm("XXXしますか？")) {
        // OKの時の処理
        console.log(fileName, funcName[0], funcName[1], "OKが押されました");
      }
      else {
        // Cancelの時の処理
        console.log(fileName, funcName[0], funcName[1], "キャンセルが押されました");
        await dialog.alert("キャンセルしました。")
      }
      this.emitDeleteDgroup();
    },

    confirm() {
      alert('確認しました')
      this.my_dialog = false
    },

    emitDeleteDgroup: function() {
      const funcName = [":methods:", "emitDeleteDgroup:"];
      console.log(fileName, funcName[0], funcName[1], "In.", " this.properties ", this.properties);

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

