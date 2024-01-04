<script setup>
import { defineComponent, ref } from "vue";
import CounterComponent from "src/components/CounterComponentInput.vue";
import OperatorComponent from "src/components/OperatorComponentInput.vue";
import ResultComponent from "src/components/ResultComponent.vue";
import AddComponent from "src/components/AddComponent.vue";
import { useOperandsStore } from "src/stores/operandesStore.js";

const store = useOperandsStore();

defineComponent({
  name: "IndexPage",
  components: {
    CounterComponent,
    OperatorComponent,
    ResultComponent,
    AddComponent,
  },
});
</script>

<template lang="pug">
q-page(padding)
  <div class="row justify-center">
    <AddComponent />
  </div>
  .row.justify-center
    div(v-for="(operand, index) in operands" :key="index")
        CounterComponent(:data-cy="'counterComponent-' + operand.name" :id="operand.name" v-model:counterValue="operand.value")
        OperatorComponent( v-if="index !== operands.length - 1" :data-cy="'operatorComponent-' + operand.name" v-model:operator="operand.operator")
  .row.justify-center
  <ResultComponent :operands="operands" v-if="operands.length > 0" data-cy="resultComponent" />
</template>

