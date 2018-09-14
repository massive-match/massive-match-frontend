<template>
  <div>
    <div :span="24" class="title-box flexContainer">
      <i class="el-icon-search"></i>
      <h2 class="helper">Utiliza el filtro para <span class="helperSub">buscar productos</span></h2>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/scss/_var";
.flexContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 400px);
  flex-direction: column;
}
.helper {
  color: $fb-grey-2;
  text-transform: uppercase;
  width: 300px;
  text-align: center;
}
.helperSub {
  font-weight: 300;
  letter-spacing: 0.1em;
}
.el-icon-search {
  font-size: 4em;
  color: $fb-green-1;
}
</style>
