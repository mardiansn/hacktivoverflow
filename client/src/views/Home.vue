<template>
  <div class="home flex w-full" style="height: 92vh;">
    <Sidebar style="width: 15%;"></Sidebar>
    <div class=" width: 85% main-page flex justify-center mx-auto p-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
export default {
  name: 'home',
  components: {
    Sidebar
  },
  computed: {
    loginStatus () {
      return this.$store.state.loginStatus
    }
  },
  beforeEnter: (to, from, next) => {
    if (this.loginStatus) next()
    else next('/landing')
  }
}
</script>
<style>

</style>
