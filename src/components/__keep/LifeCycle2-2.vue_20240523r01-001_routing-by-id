<template>
  <div :class="$style.lifecycle2_child">
    <p>input on LifeCycle22.</p>
    <input
      v-model="properties.message"
      :class="$style.message"
      placeholder="edit me">
  
    <p>Message is: {{ properties.message }}</p>
  </div>
</template>

<script>
export default {
  name: 'LifeCycle22',
  data: function() {
    return {
      properties: {
        message: 'default value.',
      },
    }
  },

  /* ################################ ライフサイクル ################################ */
  /**
   * [公式](https://jp.vuejs.org/v2/api/index.html#beforeDestroy) から拝借｡
   *
   * > Vue インスタンスが破棄される直前に呼ばれます。
   * この段階ではインスタンスはまだ完全に機能しています。
   *
   * **このフックはサーバサイドレンダリングでは呼ばれません。**
   */
  beforeDestroy: function() {
    console.log('[LifeCycle2-2] beforeDestroy.')
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
    console.log('[LifeCycle2-2] destroyed.')
  },

  /**
   * [公式](https://jp.vuejs.org/v2/api/index.html#activated) から拝借｡
   *
   * 生き続けたコンポーネントが活性化するとき呼ばれます。
   * このフックはサーバサイドレンダリングでは呼ばれません。
   */
  activated: function() {
    console.log('[LifeCycle2-2] activated.')
  },

  /**
   * [公式](https://jp.vuejs.org/v2/api/index.html#deactivated) から拝借｡
   *
   * 生存し続けたコンポーネントが非活性化されるとき呼ばれます。
   * このフックはサーバサイドレンダリングでは呼ばれません。
   */
  deactivated: function() {
    console.log('[LifeCycle2-2] deactivated.')
  },
}
</script>

<style module>
.lifecycle2_child {
    height: 100%;
    width: 100%;
    padding: 10px;
}

.message {
    width: 400px;
}
</style>

