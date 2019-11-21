<template>
  <div class="flex-column mx-auto w-2/3 border border-gray-200 px-20 py-10">
    <div class="my-2 text-left" v-if="answers && answers.length !== 0">
      <p class="text-bold text-lg">Answers:</p>
    </div>
    <AnswerCard v-for="answer in answers" :key="answer._id" :answer="answer" @change="change"></AnswerCard>
  </div>
</template>

<script>
import AnswerCard from './AnswerCard'
export default {
  name: 'AnswerList',
  components: {
    AnswerCard
  },
  props: ['answers'],
  methods: {
    change () {
      this.$emit('change')
    }
  }
}
</script>

<style>

</style>
