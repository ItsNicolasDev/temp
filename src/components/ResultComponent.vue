<script setup>
import { defineComponent, computed } from "vue";
defineComponent({
  name: "ResultComponent",
});
const props = defineProps({
  operands: {
    type: Number,
    required: true,
  },
});

const total = computed(() => {
  let result = 0;
  if (props.operands.length > 0) {
    result = props.operands[0].value;
    for (let i = 1; i < props.operands.length; i++) {
      const operand = props.operands[i];
      const previousOperand = props.operands[i - 1];
      switch (previousOperand.operator) {
        case "+":
          result += operand.value;
          break;
        case "-":
          result -= operand.value;
          break;
        case "*":
          result *= operand.value;
          break;
        case "/":
          result /= operand.value;
          break;
      }
    }
  }
  return result;
});
</script>

<template lang="pug">
.column.flex.flex-center
  p.q-ma-md.text-h5.text-purple-9 Total
  p.q-my-md.q-mx-xl.text-h5.text-cyan(data-cy="total") {{ total }}
</template>
