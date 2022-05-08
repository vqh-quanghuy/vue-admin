<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <div class="btn-toolbar mb-2 mb-md-2">
      <router-link v-if="AUTHENTICATED.canEdit('roles')" to="/roles/create" class="btn btn-sm btn-outline-secondary"
        >Add</router-link
      >
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th v-if="AUTHENTICATED.canEdit('roles')" scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in ROLES" :key="role.id">
          <td>{{ role.id }}</td>
          <td>{{ role.name }}</td>
          <td>
            <div class="btn-group mx-1">
              <router-link v-if="AUTHENTICATED.canEdit('roles')" :to="`/roles/${role.id}/edit`" class="btn btn-sm btn-outline-secondary mx-1">Edit</router-link>
            </div>
            <div class="btn-group mx-1">
              <a v-if="AUTHENTICATED.canEdit('roles')" @click="DEL(role.id)" href="javascript:void(0)" class="btn btn-sm btn-outline-secondary mx-1">Delete</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Paginator v-if="lastPage!==0" :last-page="lastPage" @page-changed="LOAD($event)"/>
</template>

<script lang="ts">
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import { Entity } from "@/interfaces/entity";
import Paginator from '@/secure/components/Paginator.vue';
import { useStore } from 'vuex';

export default {
  components: { Paginator },
  name: "Roles",
  setup() {
    const ROLES = ref([]);
    let lastPage = ref(0);
    let store = useStore();

    const AUTHENTICATED = computed(() => store.state.User.user);

    const LOAD = async (page = 1) => {
      let response = await axios.get("roles");
      ROLES.value = response.data.data;
      if(typeof response.data['meta'] !== 'undefined'){
        lastPage.value = response.data.meta.last_page;
      }
    };

    const DEL = async (id: number) => {
      if (confirm("Are you sure to delete this record?")) {
        await axios.delete(`roles/${id}`);

        ROLES.value = ROLES.value.filter((role: Entity) => role.id !== id);
      }
    };

    onMounted(LOAD);

    return {
      ROLES,
      AUTHENTICATED,
      lastPage,
      DEL,
      LOAD
    };
  },
};
</script>