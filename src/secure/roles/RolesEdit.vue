<template>
  <form @submit.prevent="SUBMIT" class="my-3">
    <div class="row my-1">
      <label for="name" class="col-sm-2 col-form-label">Name</label>
      <div class="col-sm-10">
        <input v-model="NAME" type="text" class="form-control" name="name">
      </div>
    </div>
    <div class="row my-1">
      <label for="permission" class="col-sm-2 col-form-label">Permissions</label>
      <div class="col-sm-3">
        <div v-for="permission in PERMISSIONS" :key="permission.id" class="form-check form-check-inline col-4">
          <input :value="permission.id" @change="SELECT(permission.id, $event.target.checked)" 
                :checked="CHECKED(permission.id)"
                type="checkbox" class="form-check-input">
          <label class="form-check-label">{{ permission.name }}</label>
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-sm-1">
        <button class="btn btn-outline-secondary w-100">Update Role</button>
      </div>
      <div class="col-sm-1">
        <router-link to="/roles" class="nav-link" active-class="active" aria-current="page">
          Back
        </router-link>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { Role } from '@/classes/role';

export default {
  name: "RolesEdit",
  setup() {
    const NAME = ref('');
    const PERMISSIONS = ref([]);
    const SELECTED = ref([] as number[]);
    let router = useRouter();
    let { params } = useRoute();

    onMounted(async () => {
      let response = await axios.get('permissions');
      PERMISSIONS.value = response.data.data;

      let roleCall = await axios.get(`roles/${params.id}`);

      const ROLE: Role = roleCall.data.data;

      NAME.value = ROLE.name;
      SELECTED.value = ROLE.permissions.map(permission => permission.id);
    })

    const SELECT = (id: number, checked: boolean) => {
      if(checked) {
        SELECTED.value = [...SELECTED.value, id];
        return;
      }

      SELECTED.value = SELECTED.value.filter(select => select !== id);

    }

    const SUBMIT = async () => {
      await axios.put(`roles/${params.id}`, {
        name: NAME.value,
        permissions: SELECTED.value
      });

      await router.push('/roles')
    }

    const CHECKED = (id: number) => SELECTED.value.some(selected => selected === id)

    return {
      NAME,
      PERMISSIONS,
      SELECT,
      SUBMIT,
      CHECKED
    }
  }
}
</script>