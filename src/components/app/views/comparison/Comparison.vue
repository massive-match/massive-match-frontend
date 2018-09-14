<template>
  <div>
    <el-row>
      <el-col :span="24" class="title-box">
        <h2 class="title">Comparación</h2>
        <p class="subtitle">Revisa nuestros productos versus la competencia</p>
      </el-col>
    </el-row>
    <el-row>
      <div>
        <h2>Mercado Libre</h2>
        <top/>
      </div>
    </el-row>
  </div>
</template>

<script>
import { getAll } from '@/endpoints';
import Top from './Top';

export default {
  components: {
    top: Top,
  },
  data() {
    return {
    };
  },
  methods: {
    getProducts() {
      getAll({ path: 'products' }).then((response) => {
        this.products = response.data;
      }).catch(() => {
        this.$notify({
          type: 'error',
          title: 'Error',
          message: 'Problemas al obtener productos',
        });
      });
    },
  },
  beforeMount() {
    this.getProducts();
  },
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/scss/_var";

.fixPadding {
  padding: 0 20px;
  box-sizing: border-box;
}
.selectedResultsAndCheckBox {
  padding-top: 1em;
}
.selectedResultsNumber {
  text-align: left;
  p {
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    margin: 0 1em 0 0;
    &.softGrey {
      color: $fb-grey-1;
    }
  }
}
.checkBoxIntermediary {
  text-align: right;
}
.productsContainer {
  box-sizing: border-box;
  overflow: scroll;
  height: 100% !important;
  padding: 0 20px 310px 20px;
}
.pagination {
  height: 60px;
  width: calc(100% - 65px);
  background: white;
  position: absolute;
  bottom: 0;
  z-index: 10;
  box-shadow: 2px 0 4px 0 rgba(0,0,0,0.24);
}
.paginationElement {
  margin: 14px 0;
}
</style>
