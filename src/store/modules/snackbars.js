export const namespaced = true;

export const state = {
  snacks: [],
};

let nextId = 1;

export const mutations = {
  ADD_SNACK(state, snack) {
    snack.id = nextId++;
    snack.show = true;
    state.snacks.push(snack);
  },
  REMOVE_SNACK(state, snack) {
    state.snacks = state.snacks.filter(
      s => s.id !== snack.id
    );
  },
  SET_SNACKS(state, snacks) {
    state.snacks = snacks;
  },
};

export const actions = {
  add({commit}, snack) {
    commit('ADD_SNACK', snack);
    return snack;
  },
  remove({commit}, snack) {
    commit('REMOVE_SNACK', snack);
  },
  clear({commit}) {
    commit('SET_SNACKS', []);
  },
};
