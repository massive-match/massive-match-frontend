<template>
  <div class="container">
    <nav-bar/>
    <div v-bind:class="{ content: isApp}">
      <dash-sidebar v-if="isApp"/>
      <content-view/>
    </div>
  </div>
</template>

<script>
import SideBar from './Side';
import Nav from './Nav';
import Content from './Content';

export default {
  components: {
    'dash-sidebar': SideBar,
    'nav-bar': Nav,
    'content-view': Content,
  },
  computed: {
    isApp() {
      if (this.$route.name !== 'login' && this.$route.name !== 'register') {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.content {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
}
</style>
