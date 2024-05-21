import Vue from 'vue';
const globalConfig = new Vue({
  data() {
    return {
      globalState: {},
    };
  },
  methods: {
    setState(state) {
      const newData = {};
      Object.keys(state).forEach(key => {
        newData[key] = state[key];
      });
      this.globalState = newData;
    },

    getState() {
      return this.globalState;
    },

    setValue(key, value) {
      this.$set(this.globalState, key, value);
    },
  },
});

export default globalConfig;
