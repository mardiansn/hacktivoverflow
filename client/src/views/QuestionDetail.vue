<template>
  <div class="flex-column w-full items-center p-2">
    <div class="flex p-2 justify-between shadow-lg w-2/3 mx-auto">
    <div class="question-votes w-1/4 flex-column justify-start">
      <div class="w-full flex justify-center items-center p-2"><i class="fas fa-caret-up text-4xl cursor-pointer" :class="upvoted" @click="upvote"></i></div>
      <div class="w-full flex justify-center items-center p-2"><span class="text-xl">{{ question.upVotes ? votes : null }}</span></div>
      <div class="w-full flex justify-center items-center p-2"><i class="fas fa-caret-down text-4xl cursor-pointer" :class="downvoted" @click="downvote"></i></div>
    </div>
    <div class="question-content w-3/4 flex-column justify-start p-2">
      <div class="w-full flex justify-start"><p class="text-lg font-bold cursor-pointer" >{{ question? question.title : null  }}</p></div>
      <div class="w-full text-left" v-html="question ? question.description : null"></div>
      <div class="w-full flex justify-end"><small class="text-md">{{ question? new Date(question.createdAt).toDateString() : null }}</small></div>
      <div class="w-full flex justify-end"><small class="text-md">{{ question.owner ? question.owner.username : null }}</small></div>
       <div v-if="mine" class="w-full mt-2 flex justify-end"><small class="cursor-pointer hover:text-blue-300 text-blue-400" @click="editQuestion">edit</small></div>
      <div v-if="mine" class="w-full flex justify-end"><small class="cursor-pointer hover:text-red-300 text-red-400" @click="deleteQuestion">delete</small></div>
      <div class="w-full flex justify-start">
        <span class="mx-1 bg-green-300 cursor-pointer p-1 text-sm" v-for="tag in question.tags" :key="tag" @click="searchTag(tag)">{{tag}}</span>
      </div>
    </div>
  </div>
  <div class="flex-column">
    <AnswerList :answers="question.answers" @change="changing"></AnswerList>
  </div>
  <div class="flex-column justify-center items-center w-2/3 mx-auto border border-gray-200 px-20 py-10">
    <h1 class="text-left w-full text-lg">Add your answer</h1>
    <EditAnswer @change="changing"></EditAnswer>
  </div>
  </div>
</template>

<script>
import AnswerList from '../components/AnswerList'
import EditAnswer from '../components/EditAnswer'
export default {
  name: 'QuestionDetail',
  components: {
    AnswerList, EditAnswer
  },
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
      let votes = ''
      if (this.question) {
        votes = this.question.upVotes.length - this.question.downVotes.length
      }
      return votes
    },
    mine () {
      let value = false
      if (this.question.owner && localStorage.getItem('userId') === this.question.owner._id.toString()) {
        value = true
      }
      return value
    }
  },
  methods: {
    deleteQuestion () {
      this.$store.dispatch('deleteQuestion', {id: this.$route.params.id})
    },
    editQuestion () {
      this.$router.push(`/editquestion/${this.$route.params.id}`)
    },
    searchTag (tag) {
      this.$store.commit('SET_KEYWORD', tag)
      this.$router.push('/questions')
    },
    changing () {
      this.fetchQuestion()
    },
    upvote () {
      this.$store.dispatch('upVoteQuestion', { id: this.$route.params.id })
        .then(({ data }) => {
          this.$notify({ type: 'success', title: data.message })
          this.fetchQuestion()
        })
        .catch(({ response }) => {
          this.$notify({ type: 'error', title: response.data.message })
        })
    },
    downvote () {
      this.$store.dispatch('downVoteQuestion', { id: this.$route.params.id })
        .then(({ data }) => {
          this.$notify({ type: 'success', title: data.message })
          this.fetchQuestion()
        })
        .catch(({ response }) => {
          this.$notify({ type: 'error', title: response.data.message })
        })
    },
    fetchQuestion () {
      this.$store.dispatch('fetchAQuestion', { id: this.$route.params.id, mode: 'read' })
    }
  },
  created () {
    this.fetchQuestion()
  },
  watch: {
    'question.upVotes' () {
      if (this.question.upVotes.includes(localStorage.getItem('userId'))) {
        this.upvoted = 'text-green-400'
        this.downvoted = ''
      }
    },
    'question.downVotes' () {
      if (this.question.downVotes.includes(localStorage.getItem('userId'))) {
        this.downvoted = 'text-red-400'
        this.upvoted = ''
      }
    }
  }
}
</script>

<style>

</style>
