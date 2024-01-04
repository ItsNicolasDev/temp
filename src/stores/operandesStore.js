import { defineStore } from "pinia";

export const useOperandsStore = defineStore("operands-store", {
  state: () => ({
    operands: [],
  }),
  getters: {},
  actions: {
    addOperand(operand) {
      this.operands.push(operand);
    },
  },
});
