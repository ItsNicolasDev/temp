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
</script>

<template lang="pug">
.column.items-end.self-end
  .q-py-lg
    q-btn-dropdown(color="primary" :label="operator" split size="lg" data-cy="select").fixed-width
      q-item(
        v-for="op in ['+', '-', '*', '/']"
        :key="op"
        :label="op"
        clickable
        @click="operator = op"
        v-close-popup
        )
        q-item-section(side)
          span.text-h5.text-weight-bold {{ op }}
</template>
