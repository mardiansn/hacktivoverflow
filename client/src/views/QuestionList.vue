<template>
  <div class="flex-column">
    <QuestionCard v-for="question in questions" :key="question._id" :question="question" />
  </div>
</template>

<script>
import QuestionCard from '../components/QuestionCard'
export default {
  name: 'QuestionList',
  components: {
    QuestionCard
  },
  created () {
    this.$store.dispatch('fetchQuestions', {})
    console.log(this.questions)
  },
  mounted() {
    console.log(this.questions)
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
