<template>
  <div>
    <div class="question-editor">
      <quill-editor v-model="content"
                ref="myQuillEditor">
      </quill-editor>
    </div>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      description: '',
      title: ''
    }
  },
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
