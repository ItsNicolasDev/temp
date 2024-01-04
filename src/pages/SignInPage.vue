<template>
  <q-page class="flex flex-center">
    <q-card style="width: 350px;">
      <q-card-section>
        <div class="text-h6">Connexion</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="email" label="E-mail" type="email"/>
        <q-input v-model="password" label="Mot de passe" type="password"/>
      </q-card-section>

      <q-card-section>
        <q-btn label="Connexion" color="primary" @click="login"/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import supabase from 'src/supabase/init';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password
      });

      if (error) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: error.message
        });
      } else {
        this.$router.push('/');
      }
    }
  }
};
</script>
