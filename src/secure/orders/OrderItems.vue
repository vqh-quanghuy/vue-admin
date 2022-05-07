<template>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product Title</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="orderItem in orderItems" :key="orderItem.id">
          <td>{{ orderItem.id }}</td>
          <td>{{ orderItem.product_title }}</td>
          <td>{{ orderItem.price }}</td>
          <td>{{ orderItem.quantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  name: "OrderItems",
  setup() {
    let orderItems = ref([]);
    let { params } = useRoute();

    onMounted( async () => {
      let response = await axios.get(`orders/${params.id}`)

      orderItems.value = response.data.data.order_items;
    })

    return {
      orderItems
    }
  },
}
</script>