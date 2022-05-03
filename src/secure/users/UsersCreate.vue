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
      <label>Password</label>
      <input v-model="PASSWORD" type="password" class="form-control" name="password">
    </div>
    <div class="col-12 my-1">
      <label>Password Confirm</label>
      <input v-model="PASSWORD_CONFIRM" type="password" class="form-control" name="password_confirm">
    </div>
    <div class="col-12 my-1">
      <label>Role</label>
      <select v-model="ROLE_ID" name="role_id" class="form-control">
        <option value="0">Select Role</option>
        <option v-for="role in ROLES" :key="role.id" :value="role.id"> {{ role.name }} </option>
      </select>
    </div>
    <div class="row mt-2">
      <div class="col-sm-1">
        <button class="btn btn-outline-secondary w-100">Create</button>
      </div>
      <div class="col-sm-1">
        <router-link to="/users" class="nav-link" active-class="active" aria-current="page">
          Back
        </router-link>
      </div>
    </div>
  </form>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: "UsersCreate",
  setup() {
    const FIRSTNAME = ref('');
    const LASTNAME = ref('');
    const EMAIL = ref('');
    const PASSWORD = ref('');
    const PASSWORD_CONFIRM = ref('');
    const ROLE_ID = ref(0);
    const ROLES = ref([]);
    let router = useRouter();

    onMounted(async () => {
      let response = await axios.get('roles');

      ROLES.value = response.data.data;
    })

    const SUBMIT = async () => {
      if(PASSWORD.value !== PASSWORD_CONFIRM.value) return
      await axios.post('users', {
        first_name: FIRSTNAME.value,
        last_name: LASTNAME.value,
        email: EMAIL.value,
        password: PASSWORD.value,
        role_id: ROLE_ID.value,
      });

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