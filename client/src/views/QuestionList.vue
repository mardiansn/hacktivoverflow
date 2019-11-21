<template>
  <div class="flex-column justify-around w-full p-10">
    <div class="flex justify-center">
      <button :class="page === 0 ? 'cursor-not-allowed bg-gray-300': 'bg-green-300 hover:bg-green-400'" class="p-2 mx-1" @click="page >0 ? page-- : null">prev</button>
      <button :class="questions.length >= 5 ? 'bg-green-300 hover:bg-green-400' : 'cursor-not-allowed bg-gray-300'" class="p-2 mx-1" @click="questions.length >=5 ? page++ : null">next</button>
    </div>
    <div class="flex-column items-center w-full">
      <QuestionCard v-for="question in questions" :key="question._id" :question="question" />
    </div>
  </div>
</template>

<script>
import QuestionCard from '../components/QuestionCard'
export default {
  name: 'QuestionList',
  components: {
    QuestionCard
  },
  data () {
    return {
      page: 0
    }
  },
  created () {
    this.$store.dispatch('fetchQuestions', { keyword: this.keyword })
    this.$store.commit('SET_KEYWORD', '')
  },
  computed: {
    questions () {
      return this.$store.state.questions
    },
    keyword () {
      return this.$store.state.keyword
    }
  },
  watch: {
    page () {
      this.$store.dispatch('fetchQuestions', { keyword: this.keyword, page: this.page })
    }
  },
}
</script>

<style>

</style>
