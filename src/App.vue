<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { initDnameicRoutes } from '../src/router/index'
export default {
  mounted () {
    initDnameicRoutes()
  },
}
</script>

<style>
html,
body {
  height: 100%;
  overflow: auto;
  margin: 0;
}
html {
  overflow-y: auto;
}
/* html {
  overflow: -moz-hidden-unscrollable;
  height: 100%;
}

body::-webkit-scrollbar {
  display: none;
}

body {
  -ms-overflow-style: none;
  height: 100%;
  width: calc(100vw + 18px);
  overflow: auto;
} */
</style>
