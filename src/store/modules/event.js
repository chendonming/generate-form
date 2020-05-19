const state = () => ({
  test: "Hello World Vuex!"
});

const getters = {
  getTest: state => state.test
};

const actions = {};

const mutations = {
  setTest(state, t) {
    state.test = t;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
