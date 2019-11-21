import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginStatus: false,
    questions: [],
    question: {},
    keyword: '',
    tags: [],
    tag: {}
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
    },
    SET_KEYWORD (state, payload) {
      state.keyword = payload
    },
    SET_TAGS (state, payload) {
      state.tags = payload
    },
    SET_TAG (state, payload) {
      state.tag = payload
    }
  },
  actions: {
    login ({ commit }, payload) {
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
      let page = 0
      if (payload.keyword) {
        keyword = payload.keyword
      }
      if(payload.page) page = payload.page
      axios({
        method: 'GET',
        url: `/questions?keyword=${keyword}&page=${page}`,
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
          description: payload.content,
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
          description: payload.content,
          title: payload.title,
          tags: payload.tags
        }
      })
    },
    deleteQuestion ({ commit }, payload) {
      return axios({
        method: 'DELETE',
        url: `/questions/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
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
    },
    addAnswer ({ commit }, payload) {
      return axios({
        method: 'POST',
        url: '/answers',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          content: payload.content,
          questionId: payload.id
        }
      })
    },
    upvoteAnswer ({ commit }, payload) {
      return axios({
        method: 'PATCH',
        url: '/answers/upvote',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          answerId: payload.id
        }
      })
    },
    downvoteAnswer ({ commit }, payload) {
      return axios({
        method: 'PATCH',
        url: '/answers/downvote',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          answerId: payload.id
        }
      })
    },
    updateAnswer ({ commit }, payload) {
      return axios({
        method: 'PATCH',
        url: `/answers/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          content: payload.content
        }
      })
    },
    getAnswer ({ commit }, payload) {

    },
    deleteAnswer ({ commit }, payload) {
      return axios({
        method: 'DELETE',
        url: `/answers/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    fetchTags ({ commit }, payload) {
      axios({
        method: 'GET',
        url: '/users/tags',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        commit('SET_TAGS', data)
      })
      .catch(({ response }) => {
        Vue.notify({ type: 'error', title: response.data.message })
      })
    },
    fetchTag ({ commit }, payload) {
      axios({
        method: 'GET',
        url: `/users/tags/${payload.tag}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        commit('SET_TAG', data)
      })
      .catch(({ response }) => {
        Vue.notify({ type: 'error', title: response.data.message })
      })
    },
    watchTag ({ commit }, payload) {
      return axios({
        method: 'PATCH',
        url: `/users/tags/${payload.tag}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    unwatchTag ({ commit }, payload) {
      return axios({
        method: 'DELETE',
        url: `/users/tags/${payload.tag}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    fetchWatchedTags ({ commit }, payload ) {
      return axios({
        method: 'GET',
        url: '/users/tags/my',
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  }
})
