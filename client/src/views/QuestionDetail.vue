<template>
  <div class="flex-column">
    <div class="flex p-2 justify-between shadow-lg">
    <div class="question-votes w-1/4 flex-column justify-start">
      <div class="w-full flex justify-center items-center p-2"><i class="fas fa-caret-up text-lg cursor-pointer" :class="upvoted"></i></div>
      <div class="w-full flex justify-center items-center p-2"><span class="text-xl">{{ votes }}</span></div>
      <div class="w-full flex justify-center items-center p-2"><i class="fas fa-caret-down text-lg cursor-pointer" :class="downvoted"></i></div>
    </div>
    <div class="question-content w-3/4 flex-column justify-start p-2">
      <div class="w-full flex justify-start"><p class="text-md">{{ question.createdAt }}</p></div>
      <div class="w-full flex justify-start"><p class="text-lg font-bold cursor-pointer" >{{ question.title }}</p></div>
      <div class="w-full text-left" v-html="question.description"></div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionDetail',
  data () {
    return {
      downvoted: '',
      upvoted: ''
    }
  },
  computed: {
    question () {
      return this.$store.state.question
    },
    votes () {
      return this.question.upVotes.length - this.question.downVotes.length
    }
  },
  created () {
    this.$store.dispatch('fetchAQuestion')
  },
  watch: {
    'question.upVotes' () {
      if (this.question.upVotes.includes(localStorage.getItem('userId'))) {
        this.upvoted = 'text-green-400'
      }
    },
    'question.downVotes' () {
      if (this.question.downVotes.includes(localStorage.getItem('userId'))) {
        this.downvoted = 'text-red-400'
      }
    }
  }
}
</script>

<style>

</style>
