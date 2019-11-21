<template>
  <div class="flex flex-wrap m-10 p-10">
    <h1 class="w-full text-2xl">Tags: </h1>
    <TagCard v-for="(tag, index) in tags" :tag="tag" :key="index"></TagCard>
  </div>
</template>

<script>
import TagCard from '../components/TagCard'
export default {
  name: 'TagPage',
  components: {
    TagCard
  },
  created() {
    this.$store.dispatch('fetchTags')
  },
  computed: {
    tags () {
      return this.$store.state.tags
    } 
  }
}
</script>

<style>

</style>
