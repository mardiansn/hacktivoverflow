<template>
  <div class="p-2 flex-column w-1/3 mx-auto my-2 shadow-lg ">
    <div class="tag-name flex justify-start items-center">
      <span class="p-2 bg-blue-300 cursor-pointer hover:bg-blue-400 m-2" @click="tagDetail(tag.name)">{{ tag.name }}</span> <span>{{tag.count}} questions</span>
    </div>
    <div class="flex w-full m-2">
      <small class="text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. aperiam voluptas illum, provident aliquam ab asperiores repellendus ad quam cum voluptates!</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tagCard',
  props: ['tag'],
  methods: {
    tagDetail(tag) {
      this.$router.push(`/tag/${tag}`)
    }
  }
}
</script>

<style>

</style>