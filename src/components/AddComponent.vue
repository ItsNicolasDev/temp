<script setup>
import { ref, defineComponent } from "vue";
import { useOperandsStore } from "src/stores/operandesStore.js";

const store = useOperandsStore();

defineComponent({ name: "PopupComponent" });

const popup = ref(false);
const nameInput = ref("");

function addOperand() {
  store.addOperand({ value: 0, operator: "+", name: nameInput.value });
  nameInput.value = "";
}
</script>

<template>
  <q-btn
    data-cy="popupbutton"
    label="Add new operand"
    color="primary"
    @click="popup = true"
  />
  <q-dialog data-cy="popup" v-model="popup" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Operand name</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          data-cy="inputPopup"
          dense
          v-model="nameInput"
          autofocus
          @keyup.enter="popup = false"
        />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn data-cy="cancelButton" flat label="Cancel" v-close-popup />
        <q-btn
          data-cy="addOperandButton"
          flat
          label="Add operand"
          @click="addOperand"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
