<script setup>
import { computed, defineComponent } from "vue";
import { mdiReload } from "@quasar/extras/mdi-v7";
import { matHistory } from "@quasar/extras/material-icons";

defineComponent({ name: "CounterComponent" });
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  counterValue: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["update:counterValue"]);
const counterValue = computed({
  get: () => props.counterValue,
  set: (val) => emit("update:counterValue", val),
});

const saveValue = () => {
  localStorage.setItem(`counter_${props.id}`, counterValue.value);
};

const resetValue = () => {
  counterValue.value = 0;
};

const loadSavedValue = () => {
  const savedValue = localStorage.getItem(`counter_${props.id}`);
  if (savedValue !== null) {
    counterValue.value = parseFloat(savedValue);
  }
};
</script>

<template lang="pug">
.column.justify-evenly(:id="'counter_' + props.id")
      .row.justify-center.items-center
        p.q-ma-md.text-h5.text-purple-9.self-center(data-cy="counterLabel") Counter {{ props.id }}
      .row.justify-center.items-end
        q-btn.q-ma-md.col-1(
          rounded,
          color="cyan",
          @click="counterValue++",
          data-cy="incrementButton"
        )
          q-tooltip(anchor="top left").bg-teal increment
          q-icon(name="arrow_drop_up", size="md")
        q-input.col-8(
          data-cy="operandInput",
          :model-value="counterValue",
          @update:model-value="$emit('update:counterValue', parseInt($event))",
          placeholder="Enter number",
          error-message = "Input must be a number",
          outlined,
          dense,
          rounded,
          input-class=" text-h5 text-center text-cyan",
          :rules="[val => (Number.isFinite(val)) || 'error']"
        )
          q-tooltip(anchor="bottom middle").bg-teal Enter number
        // span.text-h5.text-cyan.flex.flex-center.q-mx-md {{ counterValue }}
        q-btn.q-ma-md.col-1(
          rounded,
          color="cyan",
          @click="counterValue--",
          data-cy="decrementButton"
        )
          q-tooltip(anchor="top right").bg-teal decrement
          q-icon(name="arrow_drop_down", size="md")

      .row.justify-center.items-center
        q-btn.col-3(
          rounded
          color="cyan"
          @click="saveValue"
          data-cy="saveButton"
        )
          q-icon(name="save", size="md")
          q-tooltip(anchor="top left" bg="teal").bg-teal Sauvegarder


        q-btn.q-ma-md.col-3(
          rounded,
          color="cyan",
          @click="resetValue",
          data-cy="clearButton"
        )
          q-icon(:name="mdiReload" size="md")
          q-tooltip(anchor="top middle").bg-teal Réinitialiser

        q-btn.col-3(
          rounded,
          color="cyan",
          @click="loadSavedValue",
          data-cy="restoreButton"
        )
          q-icon(:name="matHistory" size="md")
          q-tooltip(anchor="top right").bg-teal Recharger
</template>
