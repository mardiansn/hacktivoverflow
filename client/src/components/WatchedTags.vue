<template>
  <div class="flex-column shadow p-2">
    <div class="p-2 text-lg bg-yellow-200">Watched Tags:</div>
    <div class="w-full p-2 border border-gray-200" v-for="(tag, index) in tags" :key="index">
      <span class="hover:text-blue-300 cursor-pointer" @click="gotoTag(tag)">{{tag}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'watchedTags',
  data () {
    return {
      tags: []
    }
  },
  methods: {
    fetchMyTags () {
      this.$store.dispatch('fetchWatchedTags')
        .then(({ data }) => {
          this.tags = data
        })
        .catch(({ response }) => {
          this.$notify({ type: 'error', title: response.data.message })
        })
    },
    gotoTag (tag) {
      this.$router.push(`/tag/${tag}`)
    }
  },
  created () {
    this.fetchMyTags()
  },
  watch: {
    '$route' () {
      this.fetchMyTags()
    }
  },
}
</script>

<style>

</style>