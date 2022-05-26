<template>
  <div id="root">
    <h2>{{$t('test')}}</h2>
    <div>{{$t("admin")}}</div>
    <button @click="change('zh')">中文</button>
    <button @click="change('en')">英文</button>
  </div>
</template>

<script>
export default {
  name,
  methods: {
    change (type) {
      // 切换语言
      this.$i18n.locale = type
      console.log(this.$t("language.zh"))
    }
  }
}
</script>

<style>
</style>