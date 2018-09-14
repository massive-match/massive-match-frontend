<template>
  <div v-loading="loading">
    <el-col :span="24" class="title-box">
        <h2 class="title">Producto</h2>
        <p class="subtitle">Historico de precios versus competencia.</p>
      </el-col>
    <el-row>
      <el-col :span="11">
        PRODUCTO BUSCADO
        <div class="box">
          <el-col :span="8">
            <img
              :src="product.images[0].imagen_url"
              v-if="product.images"
              style="width: 150px; height: 200px">
          </el-col>
          <el-col :span="14" :offset="2">
            <div>
              <h3 class="h" v-if="product.name">{{ `${product.name.slice(0, 10)}...` }}</h3>
            </div>
            <div>
              <p>{{ `${product.description.slice(0, 150)}...` }}</p>
            </div>
            <div>
              <p>{{ product.price }}</p>
            </div>
          </el-col>
        </div>
      </el-col>
      <el-col :span="11">
        COMPARADOR DE PRECIOS
        <div class="box">
          <canvas id="canvas"/>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 40px;">
      PRODUCTO EN OTROS MKP
      <div>
        <top/>
      </div>
    </el-row>
  </div>
</template>

<script>
import Chart from 'chart.js';
import { getOne } from '@/endpoints';
import Top from './Top';

export default {
  components: {
    top: Top,
  },
  data() {
    return {
      product: {
        title: '',
        description: '',
        price: '',
      },
      loading: true,
      config: {},
    };
  },
  computed: {
    labels() {
      if (this.product.history_products) {
        if (this.product.history_products.length === 1) {
          const aux = this.product.history_products.map(value => value.date);
          aux.push(aux[0]);
          aux.push(aux[0]);
          aux.push(aux[0]);
          aux.push(aux[0]);
          return aux;
        }
        return this.product.history_products.map(value => value.date);
      }
      return [];
    },
    dataset() {
      if (this.product.history_products) {
        if (this.product.history_products.length === 1) {
          const aux = this.product.history_products.map(value => value.price);
          aux.push(aux[0]);
          aux.push(aux[0]);
          aux.push(aux[0]);
          aux.push(aux[0]);
          return aux;
        }
        return this.product.history_products.map(value => value.price);
      }
      return [];
    },
    dataset2() {
      if (this.product.history_products) {
        if (this.product.history_products.length === 1) {
          const aux = this.product.history_products.map(value => (value.price - 1000));
          aux.push(aux[0]);
          aux.push(aux[0]);
          aux.push(aux[0]);
          aux.push(aux[0]);
          return aux;
        }
        return this.product.history_products.map(value => value.price);
      }
      return [];
    },
  },
  methods: {
    createChart() {
      const ctx = document.getElementById('canvas').getContext('2d');
      this.chart = new Chart(ctx, this.config);
    },
    getProduct() {
      this.loading = true;
      getOne({ path: 'products', params: { id: this.$route.params.id } }).then((response) => {
        this.product = response.data;
        this.setConfig();
        this.createChart();
        this.loading = false;
      }).catch((error) => {
        console.log({ error });
        this.$notify({
          type: 'error',
          title: 'Error',
          message: 'Problemas al obtener producto',
        });
      });
    },
    setConfig() {
      this.config = {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: this.product.marketplace.name,
              borderColor: '#A0BE03',
              fill: false,
              data: this.dataset,
            },
            {
              label: 'Otro',
              borderColor: '#f291a2',
              fill: false,
              data: this.dataset2,
            },
          ],
        },
        options: {
          responsive: true,
          title: {
            display: false,
          },
        },
      };
    },
  },
  beforeMount() {
    this.getProduct();
  },
  watch: {
    '$route.params.id': function watch() {
      this.loading = true;
      this.getProduct();
    },
  },
};
</script>

<style lang="scss">
@import "../../../../assets/scss/_var";

.box {
  margin: 10px 10px 10px 10px;
  border: 1px solid $fb-white-3;
}
.h {
  // text-decoration: underline;
  // text-decoration-color: $fb-green-2;
  border-bottom: 4px solid $fb-green-2;
}
</style>
