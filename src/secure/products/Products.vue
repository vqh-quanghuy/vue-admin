<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <div class="btn-toolbar mb-2 mb-md-2">
      <router-link to="/products/create" class="btn btn-sm btn-outline-secondary"
        >Add</router-link
      >
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col" width="160">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in PRODUCTS" :key="product.id">
          <td>{{ product.id }}</td>
          <td><img :src="product.image" height="50" /></td>
          <td>{{ product.title }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>
            <div class="btn-group mx-1">
              <router-link
                :to="`/products/${product.id}/edit`"
                class="btn btn-sm btn-outline-secondary mx-1"
                >Edit</router-link
              >
            </div>
            <div class="btn-group mx-1">
              <a @click="DEL(product.id)" href="javascript:void(0)" class="btn btn-sm btn-outline-secondary mx-1">Delete</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Paginator v-if="lastPage!==0" :last-page="lastPage" @page-changed="LOAD($event)"/>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { Entity } from "@/interfaces/entity";
import Paginator from '@/secure/components/Paginator.vue';

export default {
  components: { Paginator },
  name: "Products",
  setup() {
    const PRODUCTS = ref([]);
    let lastPage = ref(0);

    const LOAD = async (page = 1) => {
      let response = await axios.get(`products?page=${page}`);

      PRODUCTS.value = response.data.data;
      if(typeof response.data['meta'] !== 'undefined'){
        lastPage.value = response.data.meta.last_page;
      }
    };

    onMounted(LOAD)

    const DEL = async (id: number) => {
      if (confirm("Are you sure to delete this record?")) {
        await axios.delete(`products/${id}`);

        PRODUCTS.value = PRODUCTS.value.filter(
          (product: Entity) => product.id !== id
        );
      }
    };

    return {
      PRODUCTS,
      lastPage,
      DEL,
      LOAD
    };
  },
};
</script>