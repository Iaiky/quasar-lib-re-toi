<template>
  <q-page padding class="flex flex-center">
    <q-card style="width: 500px">
      <q-card-section horizontal>
        <q-img src="~assets/Logo.png" class="col-5" />

        <q-card-section>
          <q-form class="q-gutter-lg text-center">
            <q-input
              color="purple-12"
              filled
              v-model="formData.email"
              label="Email"
              type="email"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
            <q-input
              v-model="formData.mdp"
              filled
              :type="isPwd ? 'password' : 'text'"
              label="Mot de passe"
            >
              <template v-slot:prepend>
                <q-icon name="password" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-btn
              color="primary"
              icon="login"
              label="Se connecter"
              @click="login"
            />
          </q-form>
        </q-card-section>
      </q-card-section>
      <q-card-section>
        <div class="text-center">
          pas de compte? Créer gratuitement
          <router-link to="Inscription">ici</router-link>.
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  // name: 'PageName',
  setup() {
    const $q = useQuasar();
    const formData = ref({
      email: "",
      mdp: "",
    });
    const router = useRouter();

    const login = async () => {
      try {
        console.log("begin");
        const response = await axios.post(
          "https://libere-toi.onrender.com/clients/auth",
          formData.value
        );
        console.log("Réponse du serveur :", response);
        if (response.status == 200) {
          try {
            $q.localStorage.set("user-info", response.data);
            const promesseStockage = new Promise((resolve, reject) => {
              // Vous pouvez ajouter des vérifications de succès ici
              resolve();
            });

            // Une fois que la promesse est résolue (le stockage est terminé), effectuer la navigation
            promesseStockage.then(() => {
              router.push("/Home");
            });
          } catch (e) {
            // data wasn't successfully saved due to
            // a Web Storage API error
          }
        }
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    return {
      formData,
      login,
      isPwd: ref(true),
    };
  },
};
</script>
