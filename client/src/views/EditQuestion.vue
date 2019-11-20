<template>
  <div class="p-10 mx-auto">
    <div class="title-editor flex justify-center">
      <input type="text" class="px-4 py-2 outline-none" v-model="title">
    </div>
    <div class="question-editor">
      <quill-editor v-model="content"
                ref="myQuillEditor">
      </quill-editor>
    </div>
    <div class="my-4 mx-auto flex justify-center">
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
    <div class="my-4 mx-auto flex justify-center">
      <div v-for="(item, index) in tags" :key="index">
        <span class="p-2 flex items-center justify-between bg-green-200 rounded mx-2">
          {{ item }}
          <i class="fas fa-times cursor-pointer px-1" @click.prevent="deleteTag(index)"></i>
        </span>
      </div>
    </div>
    <div class="my-4 mx-auto flex justify-center">
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
      if (this.$route.path.includes('editquestion')) {
        this.$store.dispatch('updateQuestion', { id: this.$route.params.id, content: this.content, title: this.title, tags: this.tags })
          .then(({ data }) => {
            this.$notify({ type: 'success', title: data.message })
          })
          .catch(({ response }) => {
            this.$notify({ type: 'error', title: response.data.message })
          })
      } else {
        this.$store.dispatch('createQuestion', { content: this.content, title: this.title, tags: this.tags })
          .then(({ data }) => {
            this.$notify({ type: 'success', title: data.message })
          })
          .catch(({ response }) => {
            this.$notify({ type: 'error', title: response.data.message })
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
    if (this.$route.path.includes('editquestion')) {
      this.$store.dispatch('fetchQuestion', { id: this.$route.params.id })
        .then(({ data }) => {
          this.content = data.content
          this.title = data.title
          this.tags = data.tags
        })
        .catch(({ response }) => {
          this.$notify({ type: 'error', title: response.data.message })
        })
    }
  },
  computed: {
    button () {
      if (this.$route.path.includes('editquestion')) {
        return 'Update Question'
      } else {
        return 'Add Question'
      }
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
