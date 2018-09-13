<template>
  <div>
    <el-row>
      <el-col :span="24" class="title-box">
        <h2 class="title">Validación</h2>
        <p class="subtitle">Verifica que la información obligatoria esté completa</p>
      </el-col>
    </el-row>
    <selectors class="fixPadding" />
    <el-row class="selectedResultsAndCheckBox">
      <el-col :span="12">
        <div class="selectedResultsNumber fixPadding">
          <p>TOTAL ({{totalProductsNumber}})</p>
          <p class="softGrey">VÁLIDOS (XXX)</p>
          <p class="softGrey">INVÁLIDOS (XXX)</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="checkBoxIntermediary fixPadding">
          <el-checkbox>SELECCIONAR VÁLIDOS</el-checkbox>
        </div>
      </el-col>
    </el-row>
    <el-row class="productsContainer">
      <el-col :span="24">
        <listedProduct
        v-for="(product, index) in totalProducts"
        :key="index"
        :productInfo="totalProducts[index]"/>
      </el-col>
    </el-row>
    <el-row class="pagination">
      <el-col :span="24">
        <el-pagination
          class="paginationElement"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 50, 100, 200]"
          :page-size="10"
          layout="sizes, prev, pager, next, jumper"
          :total="totalProductsNumber">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAll } from '@/endpoints';
import Selectors from './Selectors';
import ListedProduct from './ListedProduct';

export default {
  data() {
    return {
      totalProducts: [],
      currentPage: 1,
      currentLimit: 10,
      totalProductsNumber: 0,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.currentLimit = val;
      this.handleLoadProducts();
    },
    handleCurrentChange() {
      this.handleLoadProducts();
    },
    handleLoadProducts() {
      const getProducts = {
        path: `products?offset=${(this.currentPage * this.currentLimit) - this.currentLimit}&limit=${this.currentLimit}`,
      };
      getAll(getProducts).then((res) => {
        this.totalProducts = res.data;
        this.totalProductsNumber = parseFloat(res.headers['x-total-count']);
      }).catch(() => {
        this.$notify({
          title: 'Error',
          message: 'Error en la carga de productos',
          type: 'error',
        });
      });
    },
  },
  components: {
    selectors: Selectors,
    listedProduct: ListedProduct,
  },
  beforeMount() {
    this.handleLoadProducts();
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
