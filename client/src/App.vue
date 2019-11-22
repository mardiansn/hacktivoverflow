<template>
  <div id="app">
    <Navbar style="width: 100%;"></Navbar>
    <notifications position="top left"/>
    <div class="w-full">
    <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import { CronJob } from 'cron'
export default {
  name: 'App',
  components: {
    Navbar
  },
  created () {
    this.timeReminder()
    this.$store.dispatch('verify')
      .then(({ data }) => {
        this.$notify({ type: 'success', title: data.message })
        this.$store.commit('SET_LOGIN_STATUS', true)
      })
      .catch(({ response }) => {
        this.$notify({ type: 'error', title: response.data.message })
        localStorage.clear()
      })
  },
  methods: {
    timeReminder () {
      new CronJob(
      '0 */30 * * * *',
        () => {
        this.$notify({ type: 'info', title: 'You have been here 30 minutes. You may need a break.'})
        }, null, true, 'Asia/Jakarta'
      ) 
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Yantramanav&display=swap');
#app {
  font-family: 'Yantramanav', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  margin: 0;
}

</style>
