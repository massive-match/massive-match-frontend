<template>
  <div>
    <!-- Required Info Container -->
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
        filterable
        v-if="required.options.length > 0"
        v-model="required.value"
        placeholder=""
        :disabled="required.disableState">
        <el-option
          v-for="(item, index) in required.options"
          :key="index"
          :label="item.type"
          :value="item.type">
        </el-option>
      </el-select>
      <el-input
        v-if="required.options.length < 1"
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
</template>
<script>

export default {
  data() {
    return {
      dialogFormVisible: false,
      productData: {
        testing: [],
        notOptional: [],
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
      this.productData.notOptional = [];
      // Setear Información Obligatoria
      this.productInfo.descriptions.forEach((el, index) => {
        // Integrar opciones con selector
        const newItem = {
          key: el.attribute.value,
          showButton: false,
          disableState: true,
          value: el.description,
          attributes_id: el.attributes_id,
          products_id: el.products_id,
          id: el.id,
          type: 'required',
          options: el.attribute.types,
          index,
        };
        this.productData.notOptional.push(newItem);
      });
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
      this.$emit('requiredToEdit', el);
    },
    cancelEdit(el) {
      const infoToEdit = el;
      infoToEdit.value = infoToEdit.originalValue;
      infoToEdit.disableState = true;
      // Integrar
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
</style>
