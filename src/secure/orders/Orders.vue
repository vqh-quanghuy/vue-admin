<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <div class="btn-toolbar mb-2 mb-md-2">
      <button @click="EXPORT_FILE" href="javscript:void(0)" class="btn btn-sm btn-outline-secondary">Export</button>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Total</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in ORDERS" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.first_name }} {{ order.last_name }}</td>
          <td>{{ order.email }}</td>
          <td>{{ order.total }}</td>
          <td>
            <div class="btn-group mr-2">
              <router-link :to="`/orders/${order.id}`" class="btn btn-sm btn-outline-secondary mx-1">View</router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Paginator v-if="lastPage!==0" :last-page="lastPage" @page-changed="LOAD($event)"/>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Paginator from '@/secure/components/Paginator.vue'

export default {
  name: "Orders",
  components: { Paginator },
  setup() {
    const ORDERS = ref([]);
    let lastPage = ref(0);

    const LOAD = async (page = 1) => {
      let response = await axios.get(`orders?page=${page}`);

      ORDERS.value = response.data.data;
      if(typeof response.data['meta'] !== 'undefined'){
        lastPage.value = response.data.meta.last_page;
      }
    }

    const EXPORT_FILE = async () => {
      let response = await axios.get('orders/export', {responseType: 'blob'});
      let blob = new Blob([response.data], {type: 'text/csv;charset=utf-8'});
      // const DOWNLOAD_URL = window.URL.createObjectURL(blob);
      // const LINK = document.createElement('a');
      // LINK.setAttribute('href', DOWNLOAD_URL);
      // LINK.setAttribute('download', 'orders.csv');
      // LINK.click();
      const LINK_ELEMENT = document.createElement('a');
      const DOWNLOAD_URL = URL.createObjectURL(blob);
      LINK_ELEMENT.setAttribute('href', DOWNLOAD_URL);
      LINK_ELEMENT.setAttribute('download', 'orders.csv');
      let clickEvent = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': false
      });
      LINK_ELEMENT.dispatchEvent(clickEvent);``
    }

    onMounted(LOAD);

    return {
      ORDERS,
      lastPage,
      LOAD,
      EXPORT_FILE
    }

  },
}
</script>