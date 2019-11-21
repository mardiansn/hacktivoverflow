<template>
  <aside id="sidebar" class="bg-gray-200 flex-column justify-start py-10">
    <div @click="goHome" class="cursor-pointer side-menu w-full hover:bg-yellow-400 h-10 flex items-center justify-center">
      <a class="px-2 color-gray-800">Public</a>
    </div>
    <div @click="goTags" class="cursor-pointer side-menu w-full hover:bg-yellow-400 h-10 flex items-center justify-center">
      <a class="px-2 py-auto color-gray-800">Tags</a>
    </div>
    <div class="w-full mt-10">
      <WatchedTags></WatchedTags>
    </div>
  </aside>
</template>

<script>
import WatchedTags from './WatchedTags'
export default {
  name: 'sidebar',
  components: {
    WatchedTags
  },
  methods: {
    goHome () {
      this.$router.push('/questions')
    },
    goTags () {
      this.$router.push('/tag')
    }
  }
}
</script>

<style>
#sidebar {
  min-height: 92vh;
}
</style>
