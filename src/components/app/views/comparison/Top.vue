<template>
  <div>
    <el-carousel
      :interval="40000000"
      type="card"
      height="200px"
      v-loading="loading">
      <el-carousel-item v-for="item in products" :key="item.id">
        <item
          :title="item.name.slice(0, 10)"
          :price="item.history_products[0].price"
          :image="item.images[0].imagen_url"
          @click.native="handleClick(item.id)"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getAll } from '@/endpoints';
import Item from './Item';

export default {
  components: {
    item: Item,
  },
  data() {
    return {
      products: [
        {
          id: '',
          name: '',
          history_products: [{ price: 0 }],
          images: [{ imagen_url: '' }],
        },
      ],
      loading: true,
    };
  },
  methods: {
    handleClick(id = 5) {
      console.log('handleClick');
      this.$router.push({ name: 'product', params: { id } });
    },
    getProducts() {
      getAll({ path: 'products', params: { limit: 10 } }).then((response) => {
        this.products = response.data;
        this.loading = false;
      }).catch(() => {
        this.$notify({
          type: 'error',
          title: 'Error',
          message: 'Problemas al obtener productos',
        });
        this.loading = false;
      });
    },
  },
  beforeMount() {
    this.getProducts();
  },
};
</script>
