<template>
  <div>
    <div class="head">
      Precio: ${{ price }}
    </div>
    <div class="image" :style="`background-image: url(${image})`">
    </div>
    <div class="footer">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.image {
  width: 100px;
  height: 100px;
}
</style>
