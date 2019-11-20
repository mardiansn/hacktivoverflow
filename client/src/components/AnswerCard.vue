<template>
  <div class="flex p-2 justify-between">
    <div class="answer-votes w-1/4 flex-column justify-start">
      <div class="w-full flex justify-center items-center p-2"><i class="fas fa-caret-up text-lg" :class="upvoted"></i></div>
      <div class="w-full flex justify-center items-center p-2"><span class="text-xl">{{ votes }}</span></div>
      <div class="w-full flex justify-center items-center p-2"><i class="fas fa-caret-down text-lg" :class="downvoted"></i></div>
    </div>
    <div class="answer-content w-3/4 flex-column justify-start p-2">
      <div class="w-full flex justify-start"><p class="text-md">{{ answer.owner.name }}</p></div>
      <div class="w-full" v-html="answer.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'answerCard',
  data () {
    return {
      upvoted: '',
      downvoted: ''
    }
  },
  props: ['answer'],
  computed: {
    votes () {
      return this.answer.upVotes.length - this.answer.downVotes.length
    }
  },
  watch: {
    'answer.upVotes' () {
      if (this.answer.upVotes.includes(localStorage.getItem('userId'))) {
        this.upvoted = 'text-green-400'
      }
    },
    'answer.downVotes' () {
      if (this.answer.downVotes.includes(localStorage.getItem('userId'))) {
        this.downvoted = 'text-red-400'
      }
    }
  }
}
</script>

<style>

</style>
