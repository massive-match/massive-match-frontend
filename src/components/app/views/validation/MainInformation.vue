<template>
  <div>
    <!-- Main Information -->
    <div
      class="productIdentity"
      @mouseenter="showIcon(productData.productMainInformation)"
      @mouseleave="hideIcon(productData.productMainInformation)">
      <el-select
        class="sellerNameSelector"
        v-model="productData.productMainInformation.information.productSeller.label"
        :disabled="true"
        @change="setSelectedValue"
        filterable>
        <el-option
          v-for="(seller, index)
          in productData.productMainInformation.information.productSeller.options"
          :key="index"
          :label="seller.label"
          :value="seller.value">
        </el-option>
      </el-select>
      <el-input
        v-for="(element, index) in productData.productMainInformation.information"
        v-if="element.type !== 'seller'"
        :key="index"
        :class="element.type === 'model' ? 'modelStyle' : 'identityNameStyle'"
        v-bind:style="{
          width: `${(element.value.length + 4) * 8}px`,
          minWidth: element.value.length < 5 && element.type !== 'brand' ? '60px' : '',
          maxWidth: element.value.length < 1 && element.type === 'brand' ? '20px' : ''}"
        @keyup.native.enter="sendEdit(element)"
        @keyup.native.esc="cancelEdit(element)"
        v-model="element.value"
        :disabled="productData.productMainInformation.disableState">
      </el-input>
      <div v-if="productData.productMainInformation.showButton" class="btnsContainer">
        <div v-if="productData.productMainInformation.disableState">
          <button
            class="btn secondary"
            @click="toggleEdit(productData.productMainInformation)">
            <i class="el-icon-edit" aria-hidden="true"></i>
          </button>
        </div>
        <div class="editButtonsContainer" v-else>
          <button
            class="btn primary"
            @click="sendEdit(productData.productMainInformation)">
            <i class="el-icon-check" aria-hidden="true"></i>
          </button>
          <button
            class="btn cancel"
            @click="cancelEdit(productData.productMainInformation)">
            <i class="el-icon-close" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
    <!-- J container -->
    <div
      class="jContainer">
      <p
        v-if="productInfo.tags.length > 0"
        class="jStyle">{{productInfo.tags[0].relation_categories[0].id}}</p>
        <p
        v-else
        class="jStyle errorValue">J No Definida</p>
    </div>
    <p class="categoryStyle">
      <span class="informationTitleStyle">Categoría:</span>
      CATEGORÍA
    </p>
    <!-- Additional Information -->
    <div
      class="additionalInfoContainer"
      @mouseenter="showIcon(productData.additionalInfo)"
      @mouseleave="hideIcon(productData.additionalInfo)">
      <p class="informationTitleStyle">Información Adicional:</p>
      <el-input
        @keyup.native.enter="sendEdit(productData.additionalInfo)"
        @keyup.native.esc="cancelEdit(productData.additionalInfo)"
        v-model="productData.additionalInfo.value"
        :rows="4"
        resize="none"
        type="textarea" :disabled="productData.additionalInfo.disableState"
        class="additionalInfoStyle">
      </el-input>
      <div v-if="productData.additionalInfo.showButton" class="btnsContainer">
        <button
          v-if="productData.additionalInfo.disableState === true"
          class="btn secondary"
          @click="toggleEdit(productData.additionalInfo)">
          <i class="el-icon-edit" aria-hidden="true"></i>
        </button>
        <div
          class="editButtonsContainer"
          v-if="productData.additionalInfo.disableState === false">
          <button
            class="btn primary"
            @click="sendEdit(productData.additionalInfo)">
            <i class="el-icon-check" aria-hidden="true"></i>
          </button>
          <button
            class="btn cancel"
            @click="cancelEdit(productData.additionalInfo)">
            <i class="el-icon-close" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductImage from './ProductImage';
import Required from './Required';

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
      const productNameData = this.productData.productMainInformation.information;
      productNameData.productSeller.label = this.productInfo.seller.name;
      productNameData.productSeller.value = this.productInfo.seller.id;
      productNameData.productBrand.value = this.productInfo.brand;
      productNameData.productName.value = this.productInfo.name;
      productNameData.productModel.value = this.productInfo.model;
    },
    toggleEdit(el) {
      const elementToToggle = el;
      Object.keys(elementToToggle.information).forEach((editable) => {
        const elInformation = elementToToggle.information[editable];
        elInformation.originalValue = elInformation.value;
      });
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
      Object.keys(infoToEdit.information).forEach((editable) => {
        infoToEdit.information[editable].originalValue = infoToEdit.information[editable].value;
      });
      this.$emit('editMainInformation', infoToEdit);
    },
    cancelEdit(el) {
      const infoToEdit = el;
      Object.keys(infoToEdit.information).forEach((editable) => {
        infoToEdit.information[editable].value = infoToEdit.information[editable].originalValue;
      });
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
  },
  beforeMount() {
    this.loadInfo();
    this.setSelectorSeller();
  },
  watch: {
    productInfo() {
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
.modelStyle {
  display: inline-block;
  &::before {
    content: 'm-';
    color: $fb-green-1;
  }
}
.identityNameStyle {
  margin-right: 10px;
  position: relative;
  &::after {
    content: '-';
    position: absolute;
    top: 5px;
  }
  &:nth-child(3) {
    &::after {
      content: '';
    }
  }
}
.categoryStyle {
  font-size: 12px;
  margin: 0 0 1em 0;
}
.informationTitleStyle {
  font-weight: 700;
  font-size: 13px;
  margin: 0.5em 0 0 0;
}
.jContainer {
  display: inline-block;
  box-sizing: border-box;
  margin: 0.3em 0;
}
.additionalInfoStyle {
  width: 80%;
  overflow: scroll;
  margin: 0;
  height: 80px;
  font-size: 12px;
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
.externalLink {
  font-size: 14px;
  color: $fb-grey-2;
  &:hover {
    color: $fb-green-2;
  }
}
</style>
