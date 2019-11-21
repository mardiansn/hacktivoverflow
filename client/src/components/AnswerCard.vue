<template>
  <div>
    <div class="flex p-2 justify-between bg-yellow-200 shadow-lg my-4 ">
      <div class="answer-votes w-1/4 flex-column justify-start">
        <div class="w-full flex justify-center items-center p-2"><i class="fas fa-caret-up text-2xl cursor-pointer" :class="upvoted" @click="upvote"></i></div>
        <div class="w-full flex justify-center items-center p-2"><span class="text-xl">{{ votes }}</span></div>
        <div class="w-full flex justify-center items-center p-2"><i class="fas fa-caret-down text-2xl cursor-pointer" :class="downvoted" @click="downvote"></i></div>
      </div>
      <div class="answer-content w-3/4 flex-column justify-start p-2" v-if="mode === 'read'">
        <div class="w-full flex justify-end"><small>{{ answer? answer.owner.username : null }}</small></div>
        <div class="w-full flex justify-end"><small>{{ answer? new Date(answer.createdAt).toDateString() : null }}</small></div>
        <div class="w-full text-left" v-html="answer.content"></div>
        <div v-if="mine" class="w-full flex justify-end"><small class="cursor-pointer hover:text-blue-300" @click="toEdit">edit</small></div>
        <div v-if="mine" class="w-full flex justify-end"><small class="cursor-pointer hover:text-red-300" @click="deleteAnswer">delete</small></div>
      </div>
      <div class="flex justify-center" v-if="mode === 'edit'">
        <EditAnswer :answer="answer" @done-edit="doneEdit"></EditAnswer>
      </div>
    </div>
  </div>
</template>

<script>
import EditAnswer from './EditAnswer'
export default {
  name: 'answerCard',
  components: {
    EditAnswer
  },
  data () {
    return {
      upvoted: '',
      downvoted: '',
      mode: 'read'
    }
  },
  props: ['answer'],
  computed: {
    votes () {
      let votes = ''
      if (this.answer) {
        votes = this.answer.upVotes.length - this.answer.downVotes.length
      }
      return votes
    },
    mine () {
      let value = false
      if (this.answer && localStorage.getItem('userId') === this.answer.owner._id.toString()) {
        value = true
      }
      return value
    }
  },
  methods: {
    deleteAnswer () {
      this.$store.dispatch('deleteAnswer', { id: this.answer._id })
        .then(({ data }) => {
          this.$notify({ type: 'success', title: data.message })
          this.$emit('change')
        })
        .catch(({ response }) => {
          this.$notify({ type: 'error', title: response.data.message })
        })
    },
    toEdit () {
      this.mode = 'edit'
    },
    doneEdit () {
      this.mode = 'read',
      this.$emit('change')
    },
    upvote () {
      this.$store.dispatch('upvoteAnswer', { id: this.answer._id })
        .then(({ data }) => {
          this.$notify({ type: 'success', title: data.message })
          this.$emit('change')
        })
        .catch(({ response }) => {
          this.$notify({ type: 'error', title: response.data.message })
        })
    },
    downvote () {
      this.$store.dispatch('downvoteAnswer', { id: this.answer._id })
        .then(({ data }) => {
          this.$notify({ type: 'success', title: data.message })
          this.$emit('change')
        })
        .catch(({ response }) => {
          this.$notify({ type: 'error', title: response.data.message })
        })
    }
  },
  watch: {
    'answer.upVotes' () {
      if (this.answer.upVotes.includes(localStorage.getItem('userId'))) {
        this.upvoted = 'text-green-400'
        this.downvoted = ''
      }
    },
    'answer.downVotes' () {
      if (this.answer.downVotes.includes(localStorage.getItem('userId'))) {
        this.downvoted = 'text-red-400'
        this.upvoted = ''
      }
    }
  },
  created () {
    if (this.answer.upVotes.includes(localStorage.getItem('userId'))) {
      this.upvoted = 'text-green-400'
      this.downvoted = ''
    } else if (this.answer.downVotes.includes(localStorage.getItem('userId'))) {
      this.downvoted = 'text-red-400'
      this.upvoted = ''
    }
  }
}
</script>

<style>

</style>
