import Vue from 'vue'
import Vuex from 'vuex'
import { loadPrincipalAuditTaskData } from '../api'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auditTaskId: 1,
    asideMenu: [],
    auditFirmId: 1,
    companyId: null,
    step: 0
  },
  mutations: {
    setAuditTaskId(state, id) {
      state.auditTaskId = id
    },
    setAsideMenu(state, val) {
      state.asideMenu = val
    },
    setCompanyId(state, val){
      state.companyId = val
    },
    setStep(state, val){
      state.step = val
    }
  },
  actions: {
    getAsideMenu({commit}){
      loadPrincipalAuditTaskData({auditFirmId:1}).then(res => {
        if (res.code === 1) {
          const result = res.data
          commit('setAsideMenu', result)
        }
      })
    }
  },
  getters: getters
})