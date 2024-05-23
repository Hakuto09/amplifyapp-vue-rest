<template>
  <div :class="$style.component">
    <div :class="$style.wrapchild">
      <input
        id="Lifecycle21"
        v-model="selectedComponent"
        type="radio"
        value="Lifecycle21">
      <label for="Lifecycle21">Lifecycle21</label>
    </div>
    <div :class="$style.wrapchild">
      <input
        id="Lifecycle22"
        v-model="selectedComponent"
        type="radio"
        value="Lifecycle22">
      <label for="Lifecycle22">Lifecycle22</label>
    </div>

    <h1>selected component is ... {{ selectedComponent }}.</h1>

    <keep-alive>
      <component
        :is="selectedComponent"
        :class="$style.lifecycle2_child_area" />
    </keep-alive>
  </div>
</template>

<script>
import Lifecycle21 from '@/components/LifeCycle2-1.vue'
import Lifecycle22 from '@/components/LifeCycle2-2.vue'

export default {
  name: 'LifeCycle2',
  components: {
    Lifecycle21,
    Lifecycle22
  },
  data: function() {
    return {
      selectedComponent: '',
    }
  },

  /* ################################ ライフサイクル ################################ */
  /**
   * [公式](https://jp.vuejs.org/v2/api/index.html#beforeUpdate) から拝借｡
   *
   * データが変更されるとき、DOM が適用される前に呼ばれます。
   * これは、更新前に既存の DOM にアクセスするのに適しています。
   * 例: 手動で追加されたイベントリスナを削除する
   *
   * このフックはサーバサイドレンダリングでは呼ばれません。
   * サーバサイドでは初期描画のみ実行されるためです。
   */
  beforeUpdate: function() {
    // 注意!!
    // beforeUpdate と updated で同じ変数に対してデータを更新かけると無限ループに陥る
    console.log('[LifeCycle2] beforeUpdate.')
  },

  /**
   * [公式](https://jp.vuejs.org/v2/api/index.html#updated) から拝借｡
   *
   * データが変更後、仮想 DOM が再描画そしてパッチを適用によって呼ばれます。
   * このフックが呼び出されるとき、コンポーネントの DOM は更新した状態になり、このフックで DOM に依存する操作を行うことができます。
   * しかしがながら、ほとんどの場合、無限更新ループに陥る可能性があるため、このフックでは状態を変更するのを回避すべきです。
   *
   * `updated` は 全ての子コンポーネントも再レンダリングされていることを保証**しない**ことに注意してください。
   * ビュー全体が再レンダリングされるまで待つ場合は、 `updated` の代わりに
   * [vm.$nextTick](https://jp.vuejs.org/v2/api/index.html#vm-nextTick) を使うことができます。
   * このフックはサーバサイドレンダリングでは呼ばれません。
   */
  updated: function() {
    // 注意!!
    // beforeUpdate と updated で同じ変数に対してデータを更新かけると無限ループに陥る
    console.log('[LifeCycle2] updated.')
  },

  /**
   * [公式](https://jp.vuejs.org/v2/api/index.html#beforeDestroy) から拝借｡
   *
   * > Vue インスタンスが破棄される直前に呼ばれます。
   * この段階ではインスタンスはまだ完全に機能しています。
   *
   * **このフックはサーバサイドレンダリングでは呼ばれません。**
   */
  beforeDestroy: function() {
    console.log('[LifeCycle2] beforeDestroy.')
  },

  /**
   * [公式](https://jp.vuejs.org/v2/api/index.html#destroyed) から拝借｡
   *
   * Vue インスタンスが破棄された後に呼ばれます。
   * このフックが呼ばれるとき、Vue インスタンスの全てのディレクティブはバウンドしておらず、
   * 全てのイベントリスナは削除されており、そして全ての子の Vue インスタンスは破棄されています。
   *
   * このフックはサーバサイドレンダリングでは呼ばれません。
   */
  destroyed: function() {
    console.log('[LifeCycle2] destroyed.')
  },

  /**
   * [公式](https://jp.vuejs.org/v2/api/index.html#errorCaptured) から拝借｡
   *
   * 任意の子孫コンポーネントからエラーが捕捉されるときに呼び出されます。
   * フックは、エラー、エラーをトリガするコンポーネントインスタンス、
   * そしてどこでエラーが捕捉されたかの文字列情報、これら 3 つの引数を受け取ります。
   * フックはエラーがさらにもっと伝播するのを防ぐために、`false` を返すことができます。
   */
  errorCaptured: function(error, component, info) {
    console.log('[LifeCycle2] errorCaptured.')
    console.log(error)
    console.log(component)
    console.log(info)

    // エラーの伝播を防ぐために、`false` を返す
    // つまり更に上の親へエラーをあげることはせずに､ここで止める
    return false
  },
}
</script>

<style module>
.component {
  margin-top: 50px;
}

.wrapchild {
    margin: 20px;
    display: inline-block;
}

.lifecycle2_child_area {
    margin-top: 20px;
    height: 200px;
    width: 100%;
}
</style>
