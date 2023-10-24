<template>
  <q-page padding class="flex flex-center">
    <q-card style="width: 750px">
      <q-card-section horizontal class="row justify-evenly">
        <q-card-section verticale class="col-5" style="align-self: center">
          <q-img src="~assets/Logo.png" />
        </q-card-section>
        <q-card-section class="col-6">
          <q-form class="q-gutter-lg text-center">
            <q-input
              color="purple-12"
              filled
              v-model="formData.nom"
              label="Nom"
              dense
            >
              <template v-slot:prepend>
                <q-icon name="create" />
              </template>
            </q-input>
            <q-input
              color="purple-12"
              filled
              v-model="formData.prenom"
              label="Prénom"
              dense
            >
              <template v-slot:prepend>
                <q-icon name="drive_file_rename_outline" />
              </template>
            </q-input>
            <q-input
              color="purple-12"
              filled
              v-model="formData.email"
              type="email"
              label="Email"
              dense
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
            <q-input
              color="purple-12"
              filled
              v-model="formData.tel"
              type="tel"
              label="Numéro de téléphone"
              dense
            >
              <template v-slot:prepend>
                <q-icon name="phone_iphone" />
              </template>
            </q-input>
            <q-input
              v-model="formData.mdp"
              filled
              :type="isPwd ? 'password' : 'text'"
              label="Mot de passe"
              dense
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
            <q-separator />
            <q-card-section>
              <div class="text-center">
                Veuillez choisir une catégorie, vous avez le choix entre vendeur
                et client selon vos besoins:
              </div>
              <q-option-group
                v-model="formData.type"
                :options="options"
                color="primary"
                inline
                dense
              />
            </q-card-section>
            <div v-show="formData.type === '2'">
              <div>
                En tant que client, vous pouvez commander sur les services
                proposés.
              </div>
            </div>
            <div v-show="formData.type === '3'">
              <div>
                En tant que vendeur , vous pouvez suggérer vos services.
              </div>
              <q-input
                color="purple-12"
                filled
                v-model="formData.CIN_Passeport"
                label="N° CIN"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="branding_watermark" />
                </template> </q-input
              ><br />
              <!-- <q-file v-model="file" label="Photo de votre CIN" filled dense>
                <template v-slot:prepend>
                  <q-icon name="add_a_photo" />
                </template>
              </q-file> -->
            </div>
            <q-separator />
            <q-btn
              color="primary"
              icon="login"
              label="S'inscrire"
              @click="inscrire"
            />
          </q-form>
        </q-card-section>
      </q-card-section>
      <q-card-section>
        <div class="text-center">
          Pas de compte.Veuillez vous inscrire
          <router-link to="Login">ici</router-link>.
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
    const formData = ref({
      nom: "",
      prenom: "",
      email: "",
      tel: "",
      mdp: "",
      CIN_Passeport: "",
      type: "2",
    });
    const router = useRouter();

    const inscrire = async () => {
      try {
        console.log("begin");
        const response = await axios.post(
          "https://libere-toi.onrender.com/clients/",
          formData.value
        );
        console.log("Réponse du serveur :", response);
        if (response.status == 200) {
          try {
            router.push("/Outer/Login");
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
      isPwd: ref(true),
      file: ref(null),
      formData,
      inscrire,

      options: [
        {
          label: "Client",
          value: "2",
        },
        {
          label: "Vendeur",
          value: "3",
        },
      ],
    };
  },
};
</script>
