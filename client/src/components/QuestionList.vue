<template>
   <div class="flex-column">
    <QuestionCard v-for="question in questions" :key="question._id" :question="question"></QuestionCard>
  </div>
</template>

<script>
import QuestionCard from './QuestionCard'
export default {
  name: 'CardList',
  components: {
    QuestionCard
  },
  created () {
    this.$store.dispatch('fetchQuestions')
  },
  computed: {
    questions () {
      return this.$store.state.questions
    }
  }
}
</script>

<style>

</style>
