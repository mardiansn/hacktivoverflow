import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginStatus: false,
    questions: [],
    question: {}
  },
  mutations: {
    SET_LOGIN_STATUS (state, payload) {
      state.loginStatus = payload
    },
    SET_QUESTIONS (state, payload) {
      state.questions = payload
    },
    SET_QUESTION (state, payload) {
      state.question = payload
    }
  },
  actions: {
    login ({ commit }, payload) {
      console.log(payload, 'STORE LINE 26');
      return axios({
        method: 'POST',
        url: '/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    register ({ commit }, payload) {
      return axios({
        method: 'POST',
        url: '/users/register',
        data: {
          email: payload.email,
          password: payload.password,
          username: payload.username
        }
      })
    },
    verify ({ commit }, payload) {
      return axios({
        method: 'GET',
        url: '/users/verify',
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    fetchQuestions ({ commit }, payload) {
      let keyword = ''
      if (payload.keyword) {
        keyword = payload.keyword
      }
      axios({
        method: 'GET',
        url: `/questions?keyword=${keyword}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_QUESTIONS', data)
        })
        .catch(({ response }) => {
          Vue.notify({ type: 'error', title: response.data.message })
        })
    },
    fetchAQuestion ({ commit }, payload) {
      axios({
        method: 'GET',
        url: `/questions/${payload.id}?mode=${payload.mode}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_QUESTION', data)
        })
        .catch(({ response }) => {
          Vue.notify({ type: 'error', title: response.data.message })
        })
    },
    createQuestion ({ commit }, payload) {
      return axios({
        method: 'POST',
        url: '/questions',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          content: payload.content,
          title: payload.title,
          tags: payload.tags
        }
      })
    },
    updateQuestion ({ commit }, payload) {
      return axios({
        method: 'PATCH',
        url: `/questions/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          content: payload.content,
          title: payload.title,
          tags: payload.tags
        }
      })
    },
    upVoteQuestion ({ commit }, payload) {
      return axios({
        method: 'PATCH',
        url: '/questions/upvote',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          questionId: payload.id
        }
      })
    },
    downVoteQuestion ({ commit }, payload) {
      return axios({
        method: 'PATCH',
        url: '/questions/downvote',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          questionId: payload.id
        }
      })
    }
  },
  modules: {
  }
})
