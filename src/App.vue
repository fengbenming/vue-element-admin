<template>
  <div id="app">
    <!-- <keep-alive include="productSell">
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view /> -->

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
