<template>
  <div class="px-20  flex-column w-full m-10">
    <div class="tag-name flex justify-center">
      <h1 class="text-bold text-4xl">#{{tag.name}}</h1>
    </div>
    <div class="flex justify-center">
      <button class="py-2 px-4 m-4" @click="subscribeTag" :class="buttonName === 'Watch'? 'bg-green-500':'bg-red-500'">{{buttonName}}</button>
    </div>
    <div class="users flex flex-wrap justify-start my-4">
      <p class="w-full text-left text-lg underline">Subscribers:</p>
      <p v-if="tag.users && tag.users.length === 0" class="text-red-800"> No Subscribers yet</p>
      <span v-for="user in tag.users" :key="user._id" class="mx-1">{{user.username + ','}}</span>
    </div>
    <div class="flex-column my-4">
      <p class="w-full text-left text-lg underline">Questions:</p>
      <div v-for="question in tag.questions" :key="question._id" class="p-4 shadow-lg m-2">
        <p class="hover:text-blue-400 cursor-pointer text-left" @click="toDetail(question._id)">{{question.title}}</p>
        <p class="text-sm text-right">{{question? new Date(question.createdAt).toDateString() : null}}</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tagDetail',
  created () {
    this.$store.dispatch('fetchTag', { tag: this.$route.params.tag })
  },
  methods: {
    fetchTag () {
      this.$store.dispatch('fetchTag', { tag: this.$route.params.tag })
    },
    toDetail (id) {
      this.$router.push(`/${id}`)
    },  
    subscribeTag () {
      if(this.buttonName === 'Watch') {
        this.$store.dispatch('watchTag', { tag: this.tag.name})
          .then(({ data }) => {
            this.$notify({ type: 'success', title: data.message })
            this.fetchTag()
          })
          .catch(({ response }) => {
            this.$notify({ type: 'error', title: response.data.message })
          })
      } else {
        this.$store.dispatch('unwatchTag', { tag: this.tag.name })
          .then(({ data }) => {
            this.$notify({ type: 'success', title: data.message })
            this.fetchTag()
          })
          .catch(({ response }) => {
            this.$notify({ type: 'error', title: response.data.message })
          })
      }
    }
  },
  computed: {
    tag () {
      return this.$store.state.tag
    },
    buttonName () {
      let button = 'Watch'
      if(this.tag.users) {
        this.tag.users.forEach(user => {
          if(user._id === localStorage.getItem('userId')){
            button = 'Unwatch'
          }
        })
      }
      return button
    }
  },
  watch: {
    '$route' () {
      this.fetchTag()
    }
  },
}
</script>

<style>

</style>