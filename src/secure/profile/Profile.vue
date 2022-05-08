
<template>
  <h2>Account Information</h2>
  <hr>
  <form @submit.prevent="SUBMIT_INFO">
    <div class="form-group">
      <label>First Name</label>
      <input type="text" class="form-control" name="first_name" v-model="FIRSTNAME">
    </div>
    <div class="form-group">
      <label>Last Name</label>
      <input type="text" class="form-control" name="last_name" v-model="LASTNAME">
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="text" class="form-control" name="EMAIL" v-model="EMAIL">
    </div>

    <button class="btn btn-outline-secondary my-2">Save</button>
  </form>

  <h2 class="mt-4">Change Password</h2>
  <hr>
  <form @submit.prevent="SUBMIT_PASSWORD">
    <div class="form-group">
      <label>Password</label>
      <input type="PASSWORD" class="form-control" name="PASSWORD" v-model="PASSWORD">
    </div>
    <div class="form-group">
      <label>Password Confirm</label>
      <input type="PASSWORD" class="form-control" name="PASSWORD_confirm" v-model="PASSWORD_CONFIRM">
    </div>

    <button class="btn btn-outline-secondary my-2">Save</button>
  </form>
</template>

<script lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { User } from "@/classes/user";
import { useStore } from 'vuex';


export default {
  name: "Profile",
  setup() {
    const FIRSTNAME = ref('');
    const LASTNAME = ref('');
    const EMAIL = ref('');
    const PASSWORD = ref('');
    const PASSWORD_CONFIRM = ref('');
    const USER_ID = ref(0);
    let store = useStore();

    onMounted(async () => {
      const USER = computed(() => store.state.User.user);
      // let response = await axios.get('user');
      // const USER: User = response.data.data;
      FIRSTNAME.value = USER.value.first_name;
      LASTNAME.value = USER.value.last_name;
      EMAIL.value = USER.value.email;
      USER_ID.value = USER.value.id;
    });

    const SUBMIT_INFO = async () => {
      let response = await axios.put(`users/info/${USER_ID.value}`, {
        first_name: FIRSTNAME.value,
        last_name: LASTNAME.value,
        email: EMAIL.value,
      });

      const u: User = response.data.data;

      await store.dispatch('User/setUser', new User(
        u.id,
        u.first_name,
        u.last_name,
        u.email,
        u.role,
        u.permissions
      ));
    }

    const SUBMIT_PASSWORD = async () => {
      await axios.put('users/password', {
        password: PASSWORD.value,
        password_confirm: PASSWORD_CONFIRM.value
      });
      PASSWORD.value = '';
      PASSWORD_CONFIRM.value = '';
    }
    return {
      FIRSTNAME,
      LASTNAME,
      EMAIL,
      PASSWORD,
      PASSWORD_CONFIRM,
      SUBMIT_INFO,
      SUBMIT_PASSWORD
    }
  }
}
</script>