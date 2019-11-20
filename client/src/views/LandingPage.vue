<template>
  <div id="landingPage">
    <div class="page-container">
      <LoginForm v-if="mode === 'login'" @to-register="changeMode"></LoginForm>
      <RegisterForm v-if="mode === 'register'" @to-login="changeMode"></RegisterForm>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
export default {
  components: {
    LoginForm,
    RegisterForm
  },
  data () {
    return {
      mode: 'login'
    }
  },
  methods: {
    changeMode (val) {
      this.mode = val
    }
  }
}
</script>

<style scoped>
#landingPage {
  min-height: 92vh;
  width: 100%;
  margin: 0;
  padding: 0;
}
.page-container {
  margin: 0 auto;
  padding: 100px;
}
</style>
