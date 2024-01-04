import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      showNotification : true,
    }
  },
  mutations: {
    updateNotification(state, newValue){
      state.showNotification = newValue
    }

  }
})

export default store
