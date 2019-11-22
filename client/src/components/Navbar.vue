<template>
  <nav id="navbar" class="flex justify-between bg-gray-800 items-center shadow-lg p-4">
    <div class="nav-section flex justify-start items-center w-1/6">
      <div class="nav-logo h-16 px-16">
        <img src="../assets/teje-logo.png" alt="logo" class="h-full">
      </div>
    </div>
    <div class="nav-section flex justify-center items-start p-2 w-1/2">
      <form @submit.prevent="search" class="w-1/2 p-2">
        <input v-if="loginStatus" v-model="keyword" placeholder="Search.." type="search" class="p-2 w-full bg-gray-800 outline-none text-white text-md" style="border:none; border-bottom: 0.8px solid white">
      </form>
    </div>
    <div class="nav-section flex justify-between items-center w-1/6">
      <div class="nav-item flex items-center">
        <button v-if="loginStatus" class="px-4 py-2 bg-yellow-400 mx-4" @click="addQuestion">Ask Question</button>
      </div>
      <div class="nav-item flex-items-center">
        <i v-if="loginStatus" class="fas fa-door-open text-2xl mx-4 hover:text-red-400 text-white cursor-pointer" @click="logout"></i>
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
      this.$router.push('/landing')
    },
    search () {
      this.$store.dispatch('fetchQuestions', { keyword: this.keyword })
      if(this.$route.name !== 'questions') {
        this.$router.push('/questions')
      }
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
#navbar {
  height: 8vh;
  position: sticky;
  top: -1;
  width: 100%;
}
</style>
