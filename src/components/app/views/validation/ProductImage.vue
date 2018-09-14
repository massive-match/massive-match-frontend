<template>
  <div>
    <img
      :src="productData.productImage.originalValue"
      class="hideImg">
    <div
      class="image"
      :style="productData.productImage.backgroundImg"
      @mouseenter="showIcon(productData.productImage)"
      @mouseleave="hideIcon(productData.productImage)">
      <div v-if="productData.productImage.showButton" class="btnsContainer">
        <button
          v-if="productData.productImage.disableState === true"
          class="btn secondary"
          @click="showEditImage()">
          <i class="el-icon-edit" aria-hidden="true"></i>
        </button>
      </div>
      <el-dialog
        title="Editar imagen"
        :visible.sync="dialogFormVisible"
        class="imageForm">
        <el-form>
          <el-form-item label="Imagen a editar">
            <div
              :style="productData.productImage.backgroundImg"
              class="displayImage">
            </div>
            <el-input v-model="productData.productImage.value" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <button class="btn cancel" @click="cancelEditImage">Cancel</button>
          <button class="btn primary" @click="confirmEditImage">Confirm</button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { edit } from '@/endpoints';

export default {
  data() {
    return {
      sellerLoadedState: false,
      dialogFormVisible: false,
      productData: {
        errorExternalBorder: false,
        productImage: {
          showButton: true,
          disableState: true,
          originalValue: 'https://i.imgur.com/oymLOzs.png',
          value: 'https://i.imgur.com/oymLOzs.png',
          backgroundImg: 'background-image: url(https://i.imgur.com/oymLOzs.png)',
        },
        productUrl: '',
        activeClass: '',
        errorClass: 'error',
      },
      description: [],
    };
  },
  props: {
    productInfo: {
      type: Object,
    },
  },
  methods: {
    loadInfo() {
      let thisProductImages = this.productInfo.images;
      if (thisProductImages !== null && thisProductImages.length > 0) {
        thisProductImages = thisProductImages[0].imagen_url;
      } else if (thisProductImages === null || thisProductImages.length === 0) {
        thisProductImages = 'https://i.imgur.com/oymLOzs.png';
      }
      this.productData.productImage.value = thisProductImages;
      this.productData.productImage.originaValue = thisProductImages;
      this.productData.productImage.backgroundImg = `background-image: url(${thisProductImages})`;
    },
    toggleEdit(el) {
      const elementToToggle = el;
      elementToToggle.originalValue = elementToToggle.value;
      elementToToggle.disableState = !elementToToggle.disableState;
    },
    showIcon(el) {
      const iconToShow = el;
      iconToShow.showButton = true;
    },
    hideIcon(el) {
      const iconToHide = el;
      iconToHide.showButton = false;
    },
    showEditImage() {
      this.productData.productImage.value = '';
      this.dialogFormVisible = true;
    },
    confirmEditImage() {
      const originalImages = this.productInfo.images;
      const el = this.productData.productImage.value;
      const createImageArr = [{
        imagen_url: el,
      }];
      const params = {
        id: this.productInfo.id,
      };
      if (originalImages.length > 0) {
        this.productData.productImage.originalValue = el;
        params.images = originalImages;
        params.images[0].imagen_url = el;
      } else if (originalImages.length === 0) {
        params.images = createImageArr;
      }
      const thisProduct = {
        path: 'products',
        params,
      };
      if (this.productData.productImage.value !== '') {
        // console.log(thisProduct);
        edit(thisProduct).then(() => {
          this.$notify({
            title: 'Completado',
            message: 'Carga exitosa de imágen',
            type: 'success',
          });
          this.productData.productImage.backgroundImg = `background-image: url(${this.productData.productImage.value})`;
        }).catch(() => {
          this.$notify({
            title: 'Error',
            message: 'Error en la carga de imágen',
            type: 'error',
          });
        });
      } else {
        this.$notify({
          title: 'Error',
          message: 'Ingrese una URL',
          type: 'error',
        });
      }
      this.dialogFormVisible = false;
      // Integrar
    },
    cancelEditImage() {
      this.productData.productImage.value = this.productData.productImage.originalValue;
      this.dialogFormVisible = false;
    },
  },
  beforeMount() {
    this.loadInfo();
  },
  watch: {
    productInfo() {
      this.loadInfo();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/scss/_var";
.hideImg {
  display: none;
  width: 1px;
  height: 1px;
}
.productContainer {
  width: 100%;
  margin: 2px;
  height: 210px;
  box-sizing: border-box;
  border: 1px solid $fb-white-3;
  overflow: hidden;
}
.iconsTopContainer {
  text-align: right;
  padding-right: 0.5em;
}
.imageMainContainer {
  height: 100%;
}
.image {
  border-right: 1px solid $fb-white-3;
  height: 208px;
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  .btnsContainer {
    float: right;
    margin-right: 0.5em;
  }
  &.errorValue {
    border: 4px solid $fb-red-1;
    &::after {
      content: '\f06a';
      font-family: FontAwesome;
      color: $fb-red-1;
      font-size: 1.3em;
      margin: 0.3em 0 0 0.3em;
      float: left;
    }
  }
}
.displayImage {
  width: 50px;
  vertical-align: middle;
  height: 50px;
  display: inline-block;
  background: pink;
  background-size: cover;
  background-position: center;
}
.btnsContainer {
  display: inline-block;
  vertical-align: top;
}
.extraInfoContainer {
  height: 100%;
  box-sizing: border-box;
}
.editButtonsContainer {
  display: inline-block;
}
.errorValue {
  &::after {
    content: '\f06a';
    font-family: FontAwesome;
    color: $fb-red-1;
    font-size: 1.3em;
    margin-left: 0.3em;
    vertical-align: middle;
  }
}
.errorBorder {
  border: 2px solid red;
}
.externalLink {
  font-size: 14px;
  color: $fb-grey-2;
  &:hover {
    color: $fb-green-2;
  }
}
</style>
