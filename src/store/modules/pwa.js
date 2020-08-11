export const namespaced = true;

export const state = {
  installPrompt: null,
  installed: false,
};

export const mutations = {
  SET_INSTALL_PROMPT(state, installPrompt) {
    state.installPrompt = installPrompt;
  },
  SET_INSTALLED(state, installed) {
    state.installed = installed;
  },
};

export const actions = {
  setInstallPrompt({commit}, installPrompt) {
    commit('SET_INSTALL_PROMPT', installPrompt);
  },
  setInstalled({commit}) {
    commit('SET_INSTALLED', true);
  },
};
