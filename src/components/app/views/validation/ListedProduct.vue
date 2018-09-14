<template>
  <div>
    <el-row
      :class="[productData.errorExternalBorder ? 'errorBorder' : '']"
      class="productContainer">
      <!-- Image Container Interaction -->
      <el-col :span="4" class="imageMainContainer">
        <productImage
          :productInfo="productInfo" />
      </el-col>
      <!-- Main Information -->
      <el-col
        :span="14"
        class="mainInformationContainer">
        <mainInformation
          :productInfo="productInfo"
          :sellersList="sellersList"
          @editMainInformation="sendEdit"/>
      </el-col>
      <el-col :span="6" class="extraInfoContainer">
        <div class="iconsTopContainer">
          <button
            @click="sendSvlRequest"
            class="transparentBtn">SUBIR A SVL
            <i class="fa fa-upload" aria-hidden="true"></i>
          </button>
          <a :href="productInfo.url" target="_blank" class="btn externalLink" >
            <button class="transparentBtn">IR AL LINK</button>
            <i class="fa fa-external-link" aria-hidden="true"></i>
          </a>
          <!-- <el-checkbox></el-checkbox> -->
        </div>
        <!-- Price Container -->
        <div
          class="priceContainer"
          @mouseenter="showIcon(productData.productPrice)"
          @mouseleave="hideIcon(productData.productPrice)">
          <p
            class="priceTitleStyle"
            v-bind:class="[productData.productPrice.value > 0 ? '' : 'errorValue']">
            Precio:</p>
          <span class="sign">$</span>
          <el-input-number
            @keyup.native.enter="sendEdit(productData.productPrice)"
            @keyup.native.esc="cancelEdit(productData.productPrice)"
            v-model="productData.productPrice.value"
            type="number"
            :disabled="productData.productPrice.disableState"
            class="priceStyle">
          </el-input-number>
          <div v-if="productData.productPrice.showButton" class="btnsContainer">
            <button
              v-if="productData.productPrice.disableState === true"
              class="btn secondary"
              @click="toggleEdit(productData.productPrice)">
              <i class="el-icon-edit" aria-hidden="true"></i>
            </button>
            <div
              class="editButtonsContainer"
              v-if="productData.productPrice.disableState === false">
              <button
                class="btn primary"
                @click="sendEdit(productData.productPrice)">
                <i class="el-icon-check" aria-hidden="true"></i>
              </button>
              <button
                class="btn cancel"
                @click="cancelEdit(productData.productPrice)">
                <i class="el-icon-close" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- Required Info Container -->
        <div class="requiredInfo">
          <required
          v-on:requiredToEdit="handleRequired"
          :productInfo="productInfo" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { edit, add } from '@/endpoints';
import ProductImage from './ProductImage';
import Required from './Required';
import MainInformation from './MainInformation';

export default {
  data() {
    return {
      sellerLoadedState: false,
      dialogFormVisible: false,
      productData: {
        errorExternalBorder: false,
        productMainInformation: {
          showButton: false,
          disableState: true,
          type: 'identity',
          information: {
            productSeller: {
              label: '',
              value: 0,
              originalValue: '',
              type: 'seller',
              options: [],
            },
            productBrand: {
              value: 'Brand',
              originalValue: '',
              type: 'brand',
            },
            productName: {
              value: 'Name',
              originalValue: '',
              type: 'name',
            },
            productModel: {
              value: 'Model',
              originalValue: '',
              type: 'model',
            },
          },
        },
        additionalInfo: {
          showButton: false,
          disableState: true,
          value: '',
          originalValue: '',
          type: 'description',
        },
        productPrice: {
          showButton: false,
          disableState: true,
          value: 0,
          originalValue: '',
          minWidth: 60,
          type: 'price',
        },
        productUrl: '',
        activeClass: '',
        errorClass: 'error',
      },
      requiredClicked: [],
      description: [],
    };
  },
  components: {
    required: Required,
    productImage: ProductImage,
    mainInformation: MainInformation,

  },
  props: {
    productInfo: {
      type: Object,
    },
    sellersList: {
      type: Array,
    },
  },
  methods: {
    loadInfo() {
      this.productData.additionalInfo.value = this.productInfo.description;
      if (this.productInfo.history_products !== null) {
        this.productData.productPrice.value = this.productInfo.history_products[0].price;
      }
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
    sendEdit(el) {
      const infoToEdit = el;
      const typeToChange = el.type;
      const changeToNumber = parseInt(el.value, 10);
      const params = {
        id: this.productInfo.id,
      };
      if (el.type === 'price') {
        const originalPrices = this.productInfo.history_products;
        params.history_products = originalPrices;
        params.history_products[0].price = changeToNumber;
      } else if (infoToEdit.type === 'identity') {
        const productIdentity = infoToEdit.information;
        params.name = productIdentity.productName.value;
        params.brand = productIdentity.productBrand.value;
        params.model = productIdentity.productModel.value;
        params.sellers_id = productIdentity.productSeller.value;
        // EDITAR SETEO DE SELLER
      } else if (infoToEdit.type === 'required') {
        // INTEGRAR
      } else {
        params[typeToChange] = el.value;
      }
      const thisProduct = {
        path: 'products',
        params,
      };
      // descomentar para editar
      edit(thisProduct).then(() => {
        this.$notify({
          title: 'Completado',
          message: 'Edición realizada exitosamente',
          type: 'success',
        });
      }).catch(() => {
        this.$notify({
          title: 'Error',
          message: 'Error en la edición',
          type: 'error',
        });
      });
      infoToEdit.disableState = true;
    },
    cancelEdit(el) {
      const infoToEdit = el;
      infoToEdit.value = infoToEdit.originalValue;
      infoToEdit.disableState = true;
    },
    handleRequired(el) {
      this.sendEdit(el);
      this.productData.requiredClicked = el;
    },
    setSelectorSeller() {
      const productInformation = this.productData.productMainInformation.information;
      productInformation.productSeller.options = this.sellersList[0].options;
    },
    setSelectedValue(el) {
      const productNameData = this.productData.productMainInformation.information;
      productNameData.productSeller.value = el;
    },
    sendSvlRequest() {
      const requestUrl = {
        path: `svl/${this.productInfo.id}`,
      };
      add(requestUrl).then(() => {
        this.$notify({
          title: 'Completado',
          message: 'Solicitud enviada',
          type: 'success',
        });
      }).catch(() => {
        this.$notify({
          title: 'Error',
          message: 'Error en la solicitud',
          type: 'error',
        });
      });
    },
  },
  beforeMount() {
    this.loadInfo();
    // this.setSelectorSeller();
  },
  mounted() {
    this.$emit('updateLoading', false);
  },
  watch: {
    productInfo() {
      this.$emit('updateLoading', false);
      this.loadInfo();
    },
    sellersList() {
      this.setSelectorSeller();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/scss/_var";
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
.mainInformationContainer {
  text-align: left;
  padding: 13px 18px;
}
.productNameStyle {
  margin: 0;
  font-size: 18px;
}
.jStyle {
  font-size: 14px;
  font-weight: 700;
  color: $fb-green-1;
  margin: 0;
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
.priceContainer {
  text-align: left;
  overflow: hidden;
  .btnsContainer {
    vertical-align: 3px;
  }
}
.priceTitleStyle {
  font-weight: 700;
  font-size: 18px;
  display: inline-block;
  margin: 0;
}
.sign {
  color: $fb-green-1;
  font-weight: 700;
  font-size: 18px;
}
.requiredInfo {
  box-sizing: border-box;
  overflow: scroll;
  height: 70%;
  padding: 0.5em 0;
  text-align: left;
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
.externalLink, .transparentBtn {
  background: transparent;
  border: 0;
  text-decoration: none;
  outline: 0;
  font-size: 12px;
  color: $fb-grey-2;
  cursor: pointer;
  &:hover {
    color: $fb-green-2;
  }
}
.el-checkbox {
  margin-left: 2em;
}

</style>
