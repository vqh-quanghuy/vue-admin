<template>
  <form @submit.prevent="SUBMIT" class="my-3">
    <div class="col-12 my-1">
      <label>First name</label>
      <input v-model="FIRSTNAME" type="text" class="form-control" name="first_name">
    </div>
    <div class="col-12 my-1">
      <label>Last name</label>
      <input v-model="LASTNAME" type="text" class="form-control" name="last_name">
    </div>
    <div class="col-12 my-1">
      <label>Email</label>
      <input v-model="EMAIL" type="text" class="form-control" name="email">
    </div>
    <div class="col-12 my-1">
      <label>New Password</label>
      <input v-model="PASSWORD" type="password" class="form-control" name="password">
    </div>
    <div class="col-12 my-1">
      <label>New Password Confirm</label>
      <input v-model="PASSWORD_CONFIRM" type="password" class="form-control" name="password_confirm">
    </div>
    <div class="col-12 my-1">
      <label>Role</label>
      <select v-model="ROLE_ID" name="role_id" class="form-control">
        <option>Select Role</option>
        <option v-for="role in ROLES" :key="role.id" :value="role.id"> {{ role.name }} </option>
      </select>
    </div>
    <div class="row mt-2">
      <div class="col-2 col-xl-1">
        <button class="btn btn-outline-secondary w-100">Update User</button>
      </div>
      <div class="col-2 col-xl-1">
        <router-link to="/users" class="nav-link" active-class="active" aria-current="page">
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
import { User } from '@/classes/user';

export default {
  name: "UsersEdit",
  setup() {
    const FIRSTNAME = ref('');
    const LASTNAME = ref('');
    const EMAIL = ref('');
    const PASSWORD = ref('');
    const PASSWORD_CONFIRM = ref('');
    const ROLE_ID = ref(0);
    const ROLES = ref([]);
    let router = useRouter();
    let { params } = useRoute();

    onMounted(async () => {
      let response = await axios.get('roles');

      ROLES.value = response.data.data;

      let userCall = await axios.get(`users/${params.id}`);

      const USER: User = userCall.data.data;

      FIRSTNAME.value = USER.first_name;
      LASTNAME.value = USER.last_name;
      EMAIL.value = USER.email;
      ROLE_ID.value = USER.role.id;
    })

    const SUBMIT = async () => {
      if(ROLE_ID.value === 0) return
      if(PASSWORD.value !== '') {
        if(PASSWORD.value !== PASSWORD_CONFIRM.value) return
        await axios.put(`users/${params.id}`, {
          first_name: FIRSTNAME.value,
          last_name: LASTNAME.value,
          email: EMAIL.value,
          password: PASSWORD.value,
          role_id: ROLE_ID.value,
        });
      } else {
        await axios.put(`users/${params.id}`, {
          first_name: FIRSTNAME.value,
          last_name: LASTNAME.value,
          email: EMAIL.value,
          role_id: ROLE_ID.value,
        });
      }
      
      await router.push('/users');
    }

    return {
      FIRSTNAME,
      LASTNAME,
      EMAIL,
      PASSWORD,
      PASSWORD_CONFIRM,
      ROLE_ID,
      ROLES,
      SUBMIT
    }
  }
}
</script>