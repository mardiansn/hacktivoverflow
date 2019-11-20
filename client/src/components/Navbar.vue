<template>
  <nav class="p-2 flex justify-between bg-gray-600 items-center shadow-lg" style="height: 8vh;">
    <div class="nav-section flex justify-start items-center w-1/6">
      <div class="nav-logo">Logo</div>
    </div>
    <div class="nav-section flex justify-center items-center p-2 w-1/2">
      <form @submit.prevent="search" class="w-1/2">
        <input v-model="keyword" type="search" class="px-2 w-full bg-gray-600 outline-none text-white" style="border:none; border-bottom: 0.8px solid black">
      </form>
    </div>
    <div class="nav-section flex justify-between items-center w-1/6">
      <div class="nav-item flex items-center">
        <button class="px-4 py-2 bg-yellow-400 mx-4" @click="addQuestion">Add Question</button>
      </div>
      <div class="nav-item flex-items-center">
        <i class="fas fa-door-open text-2xl mx-4 hover:text-red-400 text-white cursor-pointer" @click="logout"></i>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    logout () {
      this.$store.commit('SET_LOGIN_STATUS', false)
      localStorage.removeItem('token')
      this.$notify({ type: 'success', title: 'Successfully logout', text: 'See you again..' })
    },
    search () {
      this.$store.dispatch('searchQuestion', { keyword: this.keyword })
    },
    addQuestion () {
      this.$router.push('/addquestion')
    }
  },
  computed: {
    loginStatus () {
      return this.$store.state.loginStatus
    }
  }
}
</script>

<style>

</style>
