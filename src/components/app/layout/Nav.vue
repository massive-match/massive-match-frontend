<template>
  <div class="nav">
    <div class="line"></div>
    <img src="../../../assets/img/logo_falabella.svg" class="fb-logo">
    <nav class="menu">
      <div class="item1"></div>
      <div class="item2">
        <el-button type="text" class="nav-el" v-if="isApp">
          <i class="fa fa-cog nav-el-i"></i>
          <span class="nav-el-text"> Configuración</span>
        </el-button>
        <el-button
          type="text"
          class="nav-el"
          @click="$router.push({ name: 'login' })"
          v-if="$route.name === 'register'">
          <span class="nav-el-text">¿Tienes cuenta? Ingresa</span>
        </el-button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    isApp() {
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/_var";
.nav {
  height: 50px;
  width: 100%;
}
.line {
  width: 100%;
  height: 3px;
  background-color: $fb-green-1;
}
.menu {
  width: 100%;
  height: 47px;
  background-color: $fb-black-1;
  display: grid;
  grid-template-columns: 1fr 200px;
}
.fb-logo {
  position: absolute;
  width: 46px;
  height: 68px;
  left: 0;
  top: 0;
  z-index: 1;
  margin-left: 10px;
}
.nav-el {
  color: $fb-white-1;
}
.nav-el-text {
  text-transform: uppercase;
  font-size: 12px;
}
.nav-el-i {
  font-size: 18px;
}
</style>
