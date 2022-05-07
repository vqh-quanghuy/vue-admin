<template>
  <form @submit.prevent="SUBMIT" class="my-3">
    <div class="col-12 my-1">
      <label>Title</label>
      <input v-model="TITLE" type="text" class="form-control" name="title">
    </div>
    <div class="col-12 my-1">
      <label>Description</label>
      <textarea v-model="DESCRIPTION" type="text" class="form-control" name="description"></textarea>
    </div>
    <div class="col-12 my-1">
      <label>Image</label>
      <div class="input-group flex-nowrap">
        <input v-model="IMAGE" type="text" class="form-control" name="image">
        <ImageUpload @file-uploaded="IMAGE = $event" />
      </div>
    </div>
    <div class="col-12 my-1">
      <label>Price</label>
      <input v-model="PRICE" type="text" class="form-control" name="price">
    </div>
    
    <div class="row mt-2">
      <div class="col-2 col-xl-1">
        <button class="btn btn-outline-secondary w-100">Update Product</button>
      </div>
      <div class="col-2 col-xl-1">
        <router-link to="/products" class="nav-link" active-class="active" aria-current="page">
          Back
        </router-link>
      </div>
    </div>
  </form>
</template>

<script lang="ts" >
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import ImageUpload from '@/secure/components/ImageUpload.vue'
import { Product } from '@/classes/product';

export default {
  name: "ProductsEdit",
  components: { ImageUpload },
  setup() {
    const TITLE = ref('');
    const DESCRIPTION = ref('');
    const IMAGE = ref('');
    const PRICE = ref(0);
    let router = useRouter();
    let { params } = useRoute();

    onMounted( async () => {
      let response = await axios.get(`products/${params.id}`);

      const PRODUCT:Product = response.data.data;

      TITLE.value = PRODUCT.title;
      DESCRIPTION.value = PRODUCT.description;
      IMAGE.value = PRODUCT.image;
      PRICE.value = PRODUCT.price;
    })

    const SUBMIT = async () => {
      let response = await axios.put(`products/${params.id}`, {
        title: TITLE.value,
        description: DESCRIPTION.value,
        image: IMAGE.value,
        price: PRICE.value,
      });

      await router.push('/products');

    }

    return {
      TITLE,
      DESCRIPTION,
      IMAGE,
      PRICE,
      SUBMIT
    }
  }
}
</script>