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
          <input :value="permission.id" @change="SELECT(permission.id, $event.target.checked)" type="checkbox" class="form-check-input">
          <label class="form-check-label">{{ permission.name }}</label>
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-sm-1">
        <button class="btn btn-outline-secondary w-100">Create</button>
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
import { useRouter } from 'vue-router';

export default {
  name: "RolesCreate",
  setup() {
    const NAME = ref('');
    const PERMISSIONS = ref([]);
    const SELECTED = ref([] as number[]);
    let router = useRouter();

    onMounted(async () => {
      let response = await axios.get('permissions');
      PERMISSIONS.value = response.data.data;
    })

    const SELECT = (id: number, checked: boolean) => {
      if(checked) {
        SELECTED.value = [...SELECTED.value, id];
        return;
      }

      SELECTED.value = SELECTED.value.filter(select => select !== id);

    }

    const SUBMIT = async () => {
      await axios.post('roles', {
        name: NAME.value,
        permissions: SELECTED.value
      });

      await router.push('/roles')
    }

    return {
      NAME,
      PERMISSIONS,
      SELECT,
      SUBMIT
    }
  }
}
</script>