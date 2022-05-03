<template>
  <!-- <main > -->
    <form @submit.prevent="SUBMIT" class="form-signin">
      <h1 class="h3 mb-3 fw-normal">Start Sign-up</h1>

      <div class="form-floating">
        <input v-model="FIRSTNAME" type="text" class="form-control" id="first_name" placeholder="John">
        <label for="floatingInput">First Name</label>
      </div>

      <div class="form-floating">
        <input v-model="LASTNAME" type="text" class="form-control" id="last_name" placeholder="Doe">
        <label for="floatingInput">Last Name</label>
      </div>

      <div class="form-floating">
        <input v-model="EMAIL" type="email" class="form-control" id="email" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
      </div>

      <div class="form-floating">
        <input v-model="PASSWORD" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>

      <div class="form-floating">
        <input v-model="PASSWORD_CONFIRM" type="password" class="form-control" id="floatingPasswordConfirm" placeholder="Password Confirm">
        <label for="floatingPassword">Password Confirm</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary">Sign up</button>
    </form>
  <!-- </main> -->
</template>

<script>
import {ref} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';

export default {
  name: "Register",
  setup() {
    const FIRSTNAME = ref('');
    const LASTNAME = ref('');
    const EMAIL = ref('');
    const PASSWORD = ref('');
    const PASSWORD_CONFIRM = ref('');

    let router = useRouter();

    const SUBMIT = async () => {
      await axios.post('register', {
        first_name: FIRSTNAME.value,
        last_name: LASTNAME.value,
        email: EMAIL.value,
        password: PASSWORD.value,
        password_confirm: PASSWORD_CONFIRM.value,
      });

      await router.push('/login')

    }

    return {
      SUBMIT,
      FIRSTNAME,
      LASTNAME,
      EMAIL,
      PASSWORD,
      PASSWORD_CONFIRM
    }
  }
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: 10px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="text"] {
  margin-bottom: 10px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>