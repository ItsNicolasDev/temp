<script setup>
import { defineComponent, computed } from "vue";

defineComponent({
  name: "OperatorComponent",
});
const props = defineProps({
  operator: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:operator"]);
const operator = computed({
  get: () => props.operator,
  set: (val) => emit("update:operator", val),
});

const selectOperator = (selectedOperator) => {
  if (operator.value !== selectedOperator) {
    operator.value = selectedOperator;
    emit("update:operator", selectedOperator);
  }
};
</script>

<template lang="pug">
.column.items-end.self-end
    .q-py-lg
      .row
        .col
          q-btn(
            :color="operator === '+' ? 'purple' : 'primary'"
            label="+"
            size="md"
            data-cy="select_+"
            @click="selectOperator('+')"
          )
        .col
          q-btn(
            :color="operator === '-' ? 'purple' : 'primary'"
            label="-"
            size="md"
            data-cy="select_-"
            @click="selectOperator('-')"
          )
      .row
        .col
          q-btn(
            :color="operator === '*' ? 'purple' : 'primary'"
            label="*"
            size="md"
            data-cy="select_*"
            @click="selectOperator('*')"
          )
        .col
          q-btn(
            :color="operator === '/' ? 'purple' : 'primary'"
            label="/"
            size="md"
            data-cy="select_/"
            @click="selectOperator('/')"
          )
</template>
