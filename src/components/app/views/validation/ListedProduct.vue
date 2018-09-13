<template>
  <div>
    <el-row
      :class="[productData.errorExternalBorder ? 'errorBorder' : '']"
      class="productContainer">
      <!-- Image Container Interaction -->
      <el-col :span="4" class="imageMainContainer">
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
      </el-col>
      <!-- Main Information -->
      <el-col
        :span="14"
        class="mainInformationContainer">
        <div
          class="productIdentity"
          @mouseenter="showIcon(productData.productMainInformation)"
          @mouseleave="hideIcon(productData.productMainInformation)">
          <el-input
            v-for="(element, index) in productData.productMainInformation.information"
            :key="index"
            :class="element.type === 'model' ? 'modelStyle' : 'identityNameStyle'"
            v-bind:style="{
              width: `${(element.value.length + 4) * 7}px`,
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
          class="jContainer" @mouseenter="showIcon(productData.jInput)"
          @mouseleave="hideIcon(productData.jInput)">
          <p class="jStyle">{{productData.jInput.value}}</p>
        </div>
        <p class="categoryStyle">
          <span class="informationTitleStyle">Categoría:</span>
          {{productInfo.tags[0]}}
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
      </el-col>
      <el-col :span="6" class="extraInfoContainer">
        <div class="iconsTopContainer">
          <a :href="productInfo.url" target="_blank" class="btn externalLink" >
            <i class="fa fa-external-link" aria-hidden="true"></i>
          </a>
          <el-checkbox></el-checkbox>
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
        <!-- Requiered Info Container -->
        <div class="requiredInfo">
          <div
            v-for="(required, index) in productData.notOptional"
            :key="index"
            class="requiredInfoContainer"
            @mouseenter="showIcon(required)"
            @mouseleave="hideIcon(required)">
            <p
              class="requiredTitleStyle"
              v-bind:class="[required.value.length > 0 ? '' : 'errorValue']">{{required.key}}: </p>
            <el-select
              v-if="required.select"
              v-model="required.value"
              placeholder=""
              :disabled="required.disableState">
              <el-option
                v-for="item in required.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input
              v-if="!required.select"
              v-bind:style="{ width: `${(required.value.length + 4) * 7}px`}"
              @keyup.native.enter="sendEdit(required)"
              @keyup.native.esc="cancelEdit(required)"
              v-model="required.value"
              :disabled="required.disableState"
              class="priceStyle">
            </el-input>
            <div v-if="required.showButton" class="btnsContainer">
              <div v-if="required.disableState">
                <button
                  class="btn secondary"
                  @click="toggleEdit(required)">
                  <i class="el-icon-edit" aria-hidden="true"></i>
                </button>
              </div>
              <div class="editButtonsContainer" v-else>
                <button
                  class="btn primary"
                  @click="sendEdit(required)">
                  <i class="el-icon-check" aria-hidden="true"></i>
                </button>
                <button
                  class="btn cancel"
                  @click="cancelEdit(required)">
                  <i class="el-icon-close" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { edit } from '@/endpoints';

export default {
  data() {
    return {
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
        productMainInformation: {
          showButton: true,
          disableState: true,
          type: 'identity',
          information: {
            productSeller: {
              value: 'Seller',
              originalValue: '',
              type: 'seller',
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
        productBrand: {
          showButton: false,
          disableState: true,
          value: 'Fernapet',
          originalValue: '',
          type: 'brand',
        },
        productName: {
          showButton: false,
          disableState: true,
          value: 'Mesa Comedor Rectangular Madera',
          originalValue: '',
          type: 'name',
        },
        productModel: {
          showButton: false,
          disableState: true,
          value: '28871',
          originalValue: '',
          type: 'model',
        },
        jInput: {
          value: 'J13020101_6',
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
        testing: ['tipo', 'tamaño', 'suavidad', 'potencia', 'calidad', 'poder'],
        notOptional: {
          tipo: {
            select: true,
            options: [{
              value: 'Option1',
              label: 'Option1',
            }, {
              value: 'Option2',
              label: 'Option2',
            }, {
              value: 'Option3',
              label: 'Option3',
            }, {
              value: 'Option4',
              label: 'Option4',
            }, {
              value: 'Option5',
              label: 'Option5',
            }],
            key: 'Tipo',
            value: '',
            showButton: false,
            disableState: true,
          },
          tamaño: {
            select: false,
            key: 'Tamaño',
            value: 'chiquitito',
            showButton: false,
            disableState: true,
          },
          suavidad: {
            select: false,
            key: 'Suavidad',
            value: 'nivel puppies',
            showButton: false,
            disableState: true,
          },
          potencia: {
            select: false,
            key: 'Potencia',
            value: 'incalculable',
            showButton: false,
            disableState: true,
          },
          calidad: {
            select: false,
            key: 'Calidad',
            value: 'maxima',
            showButton: false,
            disableState: true,
          },
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
      this.productData.additionalInfo.value = this.productInfo.description;
      this.productData.productPrice.value = this.productInfo.history_products[0].price;
      if (thisProductImages.length > 0) {
        thisProductImages = thisProductImages[0].imagen_url;
      } else if (thisProductImages.length === 0) {
        thisProductImages = 'https://i.imgur.com/oymLOzs.png';
      }
      this.productData.productImage.value = thisProductImages;
      this.productData.productImage.originaValue = thisProductImages;
      this.productData.productImage.backgroundImg = `background-image: url(${thisProductImages})`;
      const productNameData = this.productData.productMainInformation.information;
      productNameData.productSeller.value = this.productInfo.seller.name;
      productNameData.productBrand.value = this.productInfo.brand;
      productNameData.productName.value = this.productInfo.name;
      productNameData.productModel.value = this.productInfo.model;
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
      const typeToChange = el.type;
      const changeToNumber = parseInt(el.value, 10);
      const params = {
        id: this.productInfo.id,
      };
      if (el.type === 'price') {
        const originalPrices = this.productInfo.history_products;
        params.history_products = originalPrices;
        params.history_products[0].price = changeToNumber;
      } else if (el.type === 'identity') {
        const productIdentity = this.productData.productMainInformation.information;
        params.name = productIdentity.productName.value;
        params.brand = productIdentity.productBrand.value;
        params.model = productIdentity.productModel.value;
        // params.seller = {
        //   name: productIdentity.productSeller.value,
        // };
        // Object.keys(el.information).forEach((key) => {
        //   const elementIdentity = el.information[key];
        //   params[elementIdentity.type] = elementIdentity.value;
        // });
      } else {
        params[typeToChange] = el.value;
      }
      const thisProduct = {
        path: 'products',
        /* eslint-disable-next-line */
        params: params,
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
      const infoToEdit = el;
      infoToEdit.disableState = true;
    },
    cancelEdit(el) {
      const infoToEdit = el;
      infoToEdit.value = infoToEdit.originalValue;
      infoToEdit.disableState = true;
      // Integrar
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
        /* eslint-disable-next-line */
        params: params,
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
    // console.log(this.productInfo);
    // this.testing.forEach((item) => {
    //   const newItem = {
    //     key: item,
    //     showButton: false,
    //     disableState: true,
    //     value: 'Naranjo con estrellas',
    //   };
    //   this.notOptional.push(newItem);
    // });
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
  background: pink;
  height: 100%;
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
  overflow: scroll;
  height: 70%;
  padding-top: 0.5em;
  text-align: left;
}
.requiredTitleStyle {
  font-weight: 700;
  font-size: 14px;
  display: inline-block;
  margin: 0 0 0.6em;
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
