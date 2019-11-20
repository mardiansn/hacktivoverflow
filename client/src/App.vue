<template>
  <div id="app">
    <Navbar></Navbar>
    <notifications position="top left"/>
    <div class="w-full flex">
    <Sidebar style="width: 15%;"></Sidebar>
    <router-view style="height: 92vh; width: 85%; margin: 0 auto; padding: 10px;"/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
export default {
  components: {
    Navbar, Sidebar
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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
