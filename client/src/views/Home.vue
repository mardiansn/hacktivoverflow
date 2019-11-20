<template>
  <div class="home flex-column items-center">
    <div class="flex justify-center">
      <QuestionList></QuestionList>
    </div>
  </div>
</template>

<script>
import QuestionList from './QuestionList'
export default {
  name: 'home',
  components: {
    QuestionList
  }
}
</script>
