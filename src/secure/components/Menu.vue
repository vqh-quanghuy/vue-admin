<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link" active-class="active" aria-current="page">
            Dashboard
          </router-link>
        </li>
        <li v-if="USER.canView('users')" class="nav-item">
          <router-link to="/users" class="nav-link" active-class="active" aria-current="page">
            Users
          </router-link>
        </li>
        <li v-if="USER.canView('roles')" class="nav-item">
          <router-link to="/roles" class="nav-link" active-class="active" aria-current="page">
            Roles
          </router-link>
        </li>
        <li v-if="USER.canView('products')" class="nav-item">
          <router-link to="/products" class="nav-link" active-class="active" aria-current="page">
            Products
          </router-link>
        </li>
        <li v-if="USER.canView('orders')" class="nav-item">
          <router-link to="/orders" class="nav-link" active-class="active" aria-current="page">
            Orders
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: "Menu",
  setup() {
    let store = useStore();
    const USER = computed(() => store.state.User.user);

    return {
      USER
    }
  }
}
</script>

<style>
.nav-link {
  color: #303030;
}
.active {
  color: #0d6efd;
}
</style>