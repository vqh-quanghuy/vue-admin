<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <div class="btn-toolbar mb-2 mb-md-2">
      <router-link v-if="AUTHENTICATED.canEdit('users')" to="/users/create" class="btn btn-sm btn-outline-secondary">Add</router-link>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th v-if="AUTHENTICATED.canEdit('users')" scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in USERS" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.first_name }} {{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role.name }}</td>
          <td>
            <div class="btn-group mr-2">
              <router-link v-if="AUTHENTICATED.canEdit('users')" :to="`/users/${user.id}/edit`" class="btn btn-sm btn-outline-secondary mx-1">Edit</router-link>
            </div>
            <div class="btn-group mr-2">
              <a v-if="AUTHENTICATED.canEdit('users')" @click="DEL(user.id)" href="javascript:void(0)" class="btn btn-sm btn-outline-secondary mx-1">Delete</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Paginator v-if="lastPage!==0" :last-page="lastPage" @page-changed="LOAD($event)"/>
</template>

<script lang="ts">
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { Entity } from "@/interfaces/entity";
import Paginator from '@/secure/components/Paginator.vue';
import { useStore } from 'vuex';

export default {
  components: { Paginator },
  name: "Users",
  setup() {
    const USERS = ref([]);
    let lastPage = ref(0);
    let store = useStore();

    const AUTHENTICATED = computed(() => store.state.User.user);

    const LOAD = async (page = 1) => {
      let response = await axios.get(`users?page=${page}`);

      USERS.value = response.data.data;
      if(typeof response.data['meta'] !== 'undefined'){
        lastPage.value = response.data.meta.last_page;
      }
    };

    const DEL = async (id: number) => {
      if (confirm("Are you sure to delete this record?")) {
        await axios.delete(`users/${id}`);

        USERS.value = USERS.value.filter((user: Entity) => user.id !== id);
      }
    };

    onMounted(LOAD);

    return {
      USERS,
      AUTHENTICATED,
      lastPage,
      DEL,
      LOAD
    };
  },
};
</script>