<template>
  <div class="flex p-8 justify-between shadow-lg w-3/5 mx-auto my-2 border border-gray-100">
    <div class="question-votes w-1/4 flex justify-around">
      <div class="w-full flex-column justify-center items-center p-2">
        <span class="text-xl w-full" style="display:block;">Answers</span>
        <span class="text-xl w-full" style="display:block;">{{ question.answers.length }}</span>
        </div>
      <div class="w-full flex-column justify-center items-center p-2">
        <span class="text-xl w-full" style="display:block;">Votes</span>
        <span class="text-xl w-full" style="display:block;">{{ votes }}</span>
        </div>
    </div>
    <div class="question-content w-2/4 flex-column justify-between p-2">
      <div class="w-full flex justify-start items-start p-2">
        <p class="font-bold cursor-pointer hover:text-blue-500"
        @click="questionDetail">{{ question.title }}</p>
        </div>
      <div class="w-full flex justify-start">
        <span class="bg-green-300 text-sm mx-1 px-2 py-1 hover:bg-green-200 cursor-pointer"
        v-for="tag in question.tags" :key="tag" @click="searchTag(tag)">{{tag}}</span>
      </div>
    </div>
    <div class="question-data flex-column justify-center w-1/4 p-2">
      <div class="w-full flex justify-start">
        <span style="display:block" class="w-full">{{ new Date(question.createdAt).toDateString()}}</span>
        <span style="display:block" class="w-full">{{ question.owner ? question.owner.username : null }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionCard',
  data () {
    return {
      upvoted: '',
      downvoted: ''
    }
  },
  props: ['question'],
  methods: {
    questionDetail () {
      this.$router.push(`/${this.question._id}`)
    },
    searchTag (tag) {
      this.$store.commit('SET_KEYWORD', tag)
      this.$store.dispatch('fetchQuestions', { keyword: tag })
      this.$store.commit('SET_KEYWORD', '')
    }
  },
  computed: {
    votes () {
      let vote 
      if(this.question){
        vote = this.question.upVotes.length - this.question.downVotes.length 
      }
      return vote
      
    }
  }
}
</script>

<style scoped>

</style>
