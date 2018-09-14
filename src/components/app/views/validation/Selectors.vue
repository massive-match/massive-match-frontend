<template>
  <div>
    <el-form class="searchSection">
      <el-form-item
        v-for="selector in selectors"
        :label="selector.name"
        :key="selector.index">
        <el-select
          v-model="searchedItems[selector.model]"
          :disabled="selector.disabled"
          filterable
          placeholder="Select"
          :clearable="true">
          <el-option
            v-for="item in selector.options"
            :key="item.label"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button
      class="btn secondary search"
      icon="el-icon-search"
      @click="getSelectorData">Buscar</el-button>
    </el-form>
  </div>
</template>

<script>
import { getAll } from '@/endpoints';

export default {
  data() {
    return {
      totalSerchedProducts: [],
      searchedItems: {
        origen: '',
        seller: '',
        categoria: '',
        subcategoria: '',
        estado: '',
      },
      selectors: {
        origen: {
          model: 'origen',
          name: 'Origen',
          disabled: true,
          options: [
            {
              value: 'mercadolibre',
              label: 'Mercadolibre',
            },
            {
              value: 'mercado ripley',
              label: 'Mercado Ripley',
            },
            {
              value: 'ChinaTown',
              label: 'ChinaTown',
            },
          ],
        },
        seller: {
          model: 'seller',
          name: 'Seller',
          disabled: false,
          options: [],
        },
        categoría: {
          model: 'categoria',
          name: 'Categoría',
          disabled: true,
          options: [
            {
              value: 'muebles',
              label: 'Muebles',
            },
          ],
        },
        subcategoria: {
          model: 'subcategoria',
          name: 'Sub-categoría',
          disabled: true,
          options: [
            {
              value: 'Mesa de comedor',
              label: 'Mesa de comedor',
            },
          ],
        },
        estado: {
          model: 'estado',
          name: 'Estado',
          disabled: false,
          options: [
            {
              value: 'completo',
              label: 'completo',
            },
            {
              value: 'incompleto',
              label: 'incompleto',
            },
          ],
        },
      },
    };
  },
  methods: {
    getSelectorData() {
      // if (this.searchedItems.seller !== '') {
      //   const getFromSellers = {
      //     // path: `products/sellers_id=3`,
      //   };
      //   getAll(getFromSellers).then((res) => {
      //     console.log(res.data);
      //   }).catch(() => {
      //     this.$notify({
      //       title: 'Error',
      //       message: 'Error en la búsqueda',
      //       type: 'error',
      //     });
      //   })
      // }
      // // Integrar Esto
      this.$emit('searchedSelectors', this.searchedItems);
    },
  },
  beforeMount() {
    const getSellers = {
      path: 'sellers',
    };
    getAll(getSellers).then((res) => {
      const dataResult = res.data;
      dataResult.forEach((seller) => {
        const sellerSelector = {
          value: seller.id,
          label: seller.name,
        };
        this.selectors.seller.options.push(sellerSelector);
      });
      this.$emit('allSellers', this.selectors.seller);
    }).catch(() => {
      this.$notify({
        title: 'Error',
        message: 'Error en la carga de sellers',
        type: 'error',
      });
    });
  },
};
</script>
<style lang="scss" scoped>
.searchSection {
  margin: 2px 0 0 2px;
  box-sizing: border-box;
}
.selector-column {
  border: 1px solid grey;
}
.el-form-item {
  width: 18%;
  display: inline-block;
  box-sizing: border-box;
  padding-right: 1em;
  margin: 0;
}
.el-select {
  width: 100%;
}
label.el-form-item__label {
  font-weight: 700;
}
.el-form {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.search {
  width: 9.5%;
  margin-left: 3.45px;
  height: 40px;
  align-self: flex-end;
  margin-bottom: 1px;
}
</style>
