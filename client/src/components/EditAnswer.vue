<template>
  <div class="p-10 mx-auto">

    <div class="answer-editor">
      <quill-editor v-model="content"
                ref="myQuillEditor">
      </quill-editor>
    </div>
    <div class="my-4 mx-auto flex justify-center">
      <button class="px-4 py-2 bg-blue-400 hover:bg-blue-600" @click="addAnswer">{{ buttonName }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: '',
      buttonName: 'Add'
    }
  },
  props: ['answer'],
  methods: {
    addAnswer () {
      if (this.answer) {
        this.$store.dispatch('updateAnswer', { id: this.answer._id, content: this.content })
          .then(({ data }) => {
            this.$notify({ type: 'success', title: data.message })
            this.$emit('done-edit')
          })
          .catch(({ response }) => {
            this.$notify({ type: 'error', title: response.data.message })
          })
      } else {
        this.$store.dispatch('addAnswer', { id: this.$route.params.id, content: this.content })
          .then(({ data }) => {
            this.$notify({ type: 'success', title: data.message })
            this.$emit('change')
            console.log('DI EDIT ANSWER')
          })
          .catch(({ response }) => {
            this.$notify({ type: 'error', title: response.data.message })
          })
      }
    }
  },
  created () {
    if (this.answer) {
      this.content = this.answer.content
      this.buttonName = 'Update'
    }
  }
}
</script>

<style>
  .ql-editor {
    min-height: 200px !important;
  }
  .quill-editor {
    background-color: rgba(248, 246, 189, 0.578) !important;
  }
  .ql-toolbar {
    background-color: rgba(73, 77, 34, 0.585) !important;
}
</style>
