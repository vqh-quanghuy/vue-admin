<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
    <div class="navbar-nav ms-auto">
      <div class="nav-item text-nowrap">
        <router-link to="/profile" class="nav-link px-3 p-2 text-white">{{user?.first_name}} {{user?.last_name}}</router-link>
      </div>
    </div>
    <div class="navbar-nav">
      <div class="nav-item text-nowrap">
        <a class="nav-link px-3" @click="LOGOUT">Sign out</a>
      </div>
    </div>
  </header>
</template>

<script>
import {useRouter} from "vue-router";

export default {
  name: "Nav",
  props: ['user'],
  setup() {
    let router = useRouter();

    const LOGOUT = () => {
      localStorage.clear();
      router.push('/login')
    }

    return {
      LOGOUT
    }
  }
}
</script>