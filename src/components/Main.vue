<template>
  <div id="main">
    <Breadcrumb></Breadcrumb>
    <router-view :key="+new Date"></router-view>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb.vue'

export default {
  name,
  components: {
    Breadcrumb,
  }
}
</script>

<style>
</style>