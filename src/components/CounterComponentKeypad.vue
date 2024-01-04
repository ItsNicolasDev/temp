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

const removeLastCharacter = () => {
  if (counterValue.value.toString().length > 1) {
    counterValue.value = parseFloat(counterValue.value.toString().slice(0, -1));
  }
  if (counterValue.value.toString().length === 1) {
    counterValue.value = 0;
  }
};

const appendOperand = (value) => {
  if (value === "-") {
    if (counterValue.value < 0) {
      counterValue.value = -counterValue.value;
    } else {
      counterValue.value = -counterValue.value;
    }
  } else if (value === ".") {
    // Ajoutez le point décimal seulement si la valeur n'en contient pas déjà un
    if (counterValue.value.toString().indexOf(".") === -1) {
      counterValue.value += ".";
    }
  } else if (counterValue.value === 0 || counterValue.value === "0") {
    counterValue.value = parseFloat(value);
  } else {
    counterValue.value = parseFloat(counterValue.value + value);
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
      @click="resetValue",
      data-cy="clearButton"
    )
      q-tooltip(anchor="bottom left").bg-teal Réinitialiser
      q-icon(name="refresh", size="md")
    q-input.col-8(
        data-cy="operandInput",
        :model-value="counterValue",
        @update:model-value="$emit('update:counterValue', parseFloat($event))",
        placeholder="Enter number",
        error-message = "Input must be a number",
        outlined,
        dense,
        readonly,
        rounded,
        input-class=" text-h5 text-center text-cyan",
        :rules="[val => (Number.isFinite(val)) || 'error']"
      )
        q-tooltip(anchor="bottom middle").bg-teal Enter number
    // span.text-h5.text-cyan.flex.flex-center.q-mx-md {{ counterValue }}
    q-btn.q-ma-md.col-1(
      rounded,
      color="cyan",
      @click="removeLastCharacter",
      data-cy="deleteCharButton"
    )
      q-tooltip(anchor="top right").bg-teal Supprimer caractère
      q-icon(name="arrow_back" size="md")

  // Ajoutez les boutons ci-dessous
  .row.justify-center.items-center.q-mb-md
    q-btn.col-3.q-mr-md(
      rounded
      color="cyan"
      @click="saveValue"
      data-cy="saveButton"
    )
      q-icon(name="save", size="md")
      q-tooltip(anchor="top left" bg="teal").bg-teal Sauvegarder

    q-btn.col-3.q-ml-md(
      rounded,
      color="cyan",
      @click="loadSavedValue",
      data-cy="restoreButton"
    )
      q-icon(:name="matHistory" size="md")
      q-tooltip(anchor="top right").bg-teal Recharger
  .row.justify-center.items-center
    .operandSection
      .keypad
        .keypad-row
        q-btn(data-cy="operandButton-1" color="primary" label="1" @click="appendOperand('1')")
        q-btn(data-cy="operandButton-2" color="primary" label="2" @click="appendOperand('2')")
        q-btn(data-cy="operandButton-3" color="primary" label="3" @click="appendOperand('3')")
        .keypad-row
        q-btn(data-cy="operandButton-4" color="primary" label="4" @click="appendOperand('4')")
        q-btn(data-cy="operandButton-5" color="primary" label="5" @click="appendOperand('5')")
        q-btn(data-cy="operandButton-6" color="primary" label="6" @click="appendOperand('6')")
        .keypad-row
        q-btn(data-cy="operandButton-7" color="primary" label="7" @click="appendOperand('7')")
        q-btn(data-cy="operandButton-8" color="primary" label="8" @click="appendOperand('8')")
        q-btn(data-cy="operandButton-9" color="primary" label="9" @click="appendOperand('9')")
        .keypad-row
        q-btn(data-cy="operandButton-minus" color="primary" label="-" @click="appendOperand('-')")
        q-btn(data-cy="operandButton-0" color="primary" label="0" @click="appendOperand('0')")
        q-btn(data-cy="operandButton-dot" color="primary" label="." @click="appendOperand('.')")

</template>
