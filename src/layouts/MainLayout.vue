<script setup>
import { defineComponent } from "vue";
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import supabase from "src/supabase/init";

defineComponent({ name: "MainLayout" });
const user = ref(null);
const router = useRouter();

onMounted(() => {
  user.value = supabase.auth.getUser();
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session ? session.user : null;
  });
});

const logout = async () => {
  await supabase.auth.signOut();
  user.value = null;
  router.push('/signin');
};

</script>

<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-header.bg-purple-9(elevated)
    q-toolbar.q-pa-lg.text-h4.items-center.justify-center
      q-space
      TechStackLinks.q-pr-lg
      span.text-h6.text-weight-medium.flex.flex-center
        span.text-yellow-2 The mono-user single page 2 operand calculator
        span.q-mx-sm.row
          .huggyBearFont.text-italic.text-h4.text-blue-3 QUASAR
          //.huggyBearFont.text-italic.text-h4.text-teal-2 BASE
        span.text-yellow-2 pure frontend app
      q-space
      q-tabs(shrink dense no-caps align="right")
        q-route-tab(data-cy="keypadPage" to="/", exact, label="Keypad Operand")
        q-route-tab(data-cy="inputPage" to="/input", exact, label="Input Operand")
        q-route-tab(to="/about", exact, label="About")
        q-route-tab(v-if="!user" data-cy="signInPage", to="/signin", exact, label="Sign In")
        q-route-tab(v-else @click="logout" label="Sign Out")
        q-route-tab(to="/config", exact, icon="settings")
  q-page-container
    router-view
</template>
