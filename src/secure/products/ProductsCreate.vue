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
        <button class="btn btn-outline-secondary w-100">Create</button>
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
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import ImageUpload from '@/secure/components/ImageUpload.vue'

export default {
  name: "ProductsCreate",
  components: { ImageUpload },
  setup() {
    const TITLE = ref('');
    const DESCRIPTION = ref('');
    const IMAGE = ref('');
    const PRICE = ref(0);
    let router = useRouter();

    const SUBMIT = async () => {
      let response = await axios.post('products', {
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