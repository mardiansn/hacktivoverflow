<template>
  <div class="p-10 mx-auto">
    <div class="text-center">Title</div>
    <div class="title-editor flex justify-center">
      <input type="text" class="px-4 py-2 my-4 outline-none" v-model="title" style="border-bottom: 0.8px solid gray;">
    </div>
    <div class="question-editor px-20">
      <quill-editor v-model="content"
                ref="myQuillEditor">
      </quill-editor>
    </div>
    <div class="my-4 flex justify-start px-20">
      <form @submit.prevent="addTag">
          <input
            type="text"
            placeholder="tag"
            v-model="tag"
            class="border border-gray-200 focus:border-blue-400 p-2 rounded"
          />
          <button
            class="bg-blue-400 p-1 m-2 rounded hover:bg-blue-200 text-white hover:text-blue-400"
          >Add</button>
      </form>
    </div>
    <div class="my-4 mx-auto flex justify-start px-20">
      <div v-for="(item, index) in tags" :key="index">
        <span class="p-2 flex items-center justify-between bg-green-200 rounded mx-2">
          {{ item }}
          <i class="fas fa-times cursor-pointer px-1" @click.prevent="removeTag(index)"></i>
        </span>
      </div>
    </div>
    <div class="my-4 mx-auto flex justify-center px-20">
      <button class="px-4 py-2 bg-blue-400 hover:bg-blue-600" @click="submitQuestion">{{ button }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: '',
      title: '',
      tag: '',
      tags: []
    }
  },
  methods: {
    submitQuestion (button) {
      if (this.$route.name === 'editQuestion') {
        this.$store.dispatch('updateQuestion', { id: this.$route.params.id, content: this.content, title: this.title, tags: this.tags })
          .then(({ data }) => {
            this.$notify({ type: 'success', title: data.message })
            this.$router.push('/questions')
          })
          .catch(({ response }) => {
            this.$notify({ type: 'error', title: response.data.message })
          })
      } else {
        this.$store.dispatch('createQuestion', { content: this.content, title: this.title, tags: this.tags })
          .then(({ data }) => {
            this.$notify({ type: 'success', title: data.message })
            this.$router.push('/questions')
          })
          .catch(({ response }) => {
            this.$notify({ type: 'error', title: response.data.message, text: response.data.errors.join(', ') })
          })
      }
    },
    addTag () {
      let tags = this.tag.split(' ').map(el => {
        return el
      })
      tags.forEach(tag => {
        this.tags.push(tag)
      })
      this.tag = ''
    },
    removeTag (index) {
      this.tags.splice(index, 1)
    }
  },
  created () {
    if (this.$route.name === 'editQuestion') {
      this.$store.dispatch('fetchAQuestion', { id: this.$route.params.id })
      this.content = this.question.description
      this.title = this.question.title
      this.tags = this.question.tags
    }
  },
  computed: {
    button () {
      if (this.$route.name === 'editQuestion') {
        return 'Update Question'
      } else {
        return 'Add Question'
      }
    },
    question () {
      return this.$store.state.question
    }
  }
}
</script>

<style>
  .ql-editor {
    min-height: 300px !important;
  }
  .quill-editor {
    background-color: rgba(177, 211, 190, 0.578) !important;
  }
  .ql-toolbar {
    background-color: rgba(34, 77, 60, 0.585) !important;
}
</style>
