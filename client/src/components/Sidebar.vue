<template>
  <aside class="bg-gray-100 flex-column justify-start py-10" style="height: 92vh;">
    <div @click="goHome" class="cursor-pointer side-menu w-full hover:bg-yellow-400 h-10 flex items-center justify-center">
      <a class="px-2 color-gray-800">Public</a>
    </div>
    <div @click="goTags" class="cursor-pointer side-menu w-full hover:bg-yellow-400 h-10 flex items-center justify-center">
      <a class="px-2 py-auto color-gray-800">Tags</a>
    </div>
    <div  @click="goUsers" class="cursor-pointer side-menu w-full hover:bg-yellow-400 h-10 flex items-center justify-center">
      <a class="px-2 color-gray-800">Users</a>
    </div>
    <!-- <div class="side-menu w-full hover:bg-yellow-400">
      <a class="px-2 text-lg color-gray-800" @click.prevent="goJobs">Jobs</a>
    </div> -->
  </aside>
</template>

<script>
export default {
  methods: {
    goHome () {
      this.$router.push('/questions')
    },
    goTags () {
      this.$router.push('/tag')
    },
    goUsers () {
      this.$router.push('/users')
    }
  }
}
</script>

<style>

</style>
