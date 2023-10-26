<template>
  <q-page
    padding
    style="background: linear-gradient(to bottom right, #9adcea, #ac1282)"
    class="q-gutter-y-lg"
  >
    <div class="column justify-evenly q-gutter-y-lg">
      <div class="flex-center row">
        <div class="my-card content-center column col-11">
          <q-card class="bg-grey-1 col" style="min-width: 100%" flat bordered>
            <q-toolbar class="bg-primary text-white">
              <q-btn flat round dense icon="assignment_ind" />
              <q-toolbar-title> Profile </q-toolbar-title>
            </q-toolbar>
            <q-card-section horizontal>
              <q-card-section class="col-3">
                <q-img :src="baseImagePath + profil.photoProfil" />
              </q-card-section>
              <q-separator vertical />
              <q-card-section class="col text-center" style="min-width: 75%">
                <q-card-section
                  ><div class="text-h4 text-bold">{{ profil.nom }}</div>
                  <div class="text-h4 text-bold">{{ profil.prenom }}</div>
                  <br />
                  <div class="row justify-evenly">
                    <div class="text-h5">
                      <q-icon name="phone" /> {{ profil.tel }}
                    </div>
                    <br />
                    <div class="text-h5">
                      <q-icon name="email" /> {{ profil.email }}
                    </div>
                  </div>
                  <q-card-section>
                    <q-card flat bordered>
                      <q-card-section>{{ profil.bio }} </q-card-section>
                    </q-card>
                  </q-card-section>
                  <br />
                  <q-card-section>
                    <q-btn
                      icon="message"
                      outline
                      color="primary"
                      label="Contacter"
                      @click="contacter"
                    />
                  </q-card-section>
                </q-card-section>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div v-if="profil.type === 3" class="">
      <div class="row flex-center" flat>
        <q-card class="col-9 bg-grey-2">
          <q-toolbar class="bg-primary text-white">
            <q-btn flat round dense icon="support_agent" />
            <q-toolbar-title> Services </q-toolbar-title>
            <q-btn
              flat
              round
              dense
              icon="add_circle"
              @click="ajouterService = true"
            />
          </q-toolbar>

          <q-card-section
            class="q-pa-md row items-start q-gutter-md justify-evenly"
          >
            <q-card
              v-for="item in listVendeurService"
              :key="item.idservice"
              v-ripple
              class="service q-hoverable cursor-pointer"
              flat
              bordered
              @click="detailService(item)"
            >
              <span class="q-focus-helper"></span>
              <q-card-section horizontal>
                <q-img :src="item.image_source" />

                <q-card-section>
                  <div class="text-h5 q-mt-sm q-mb-xs">{{ item.titre }}</div>
                  <div class="text-caption text-grey">
                    {{ item.description }}
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
          </q-card-section>
        </q-card>
      </div>

      <q-dialog v-model="icon">
        <q-card class="modal">
          <q-img :src="detail.image_source" />

          <q-card-section>
            <q-btn
              fab
              color="primary"
              icon="category"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%)"
            />
            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">Titre</div>
              <div
                class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
              >
                <q-icon name="category" />
                {{ detail.categorie }}
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">{{ detail.prix }}</div>
            <div class="text-subtitle1">Description</div>
            <div class="text-caption text-grey">
              {{ detail.description }}
            </div>
            <div class="text-subtitle1">Consigne</div>
            <div class="text-caption text-grey">
              {{ detail.consigne }}
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn v-close-popup flat color="primary" :label="detail.prenom" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default {
  // name: 'PageName',

  setup() {
    const route = useRoute();
    const router = useRouter();
    const user = ref(null);
    const $q = useQuasar();
    const profil = ref(null);
    const listVendeurService = ref("");

    const getUserInfo = () => {
      const users = $q.localStorage.getItem("user-info");
      if (users != null) {
        // fetchVendeurService(users.data[0].iduser);

        user.value = users.data[0];
        console.log(user.value);
        formData.value.idreceveur = user.value.iduser;
      } else {
        route.push("/Outer/Login");
      }
    };

    const getProfilInfo = async () => {
      try {
        profil.value = route.params.id;
        // console.log(profil.value);
        const response = await axios.get(
          "https://libere-toi.onrender.com/clients/" + profil.value
        );
        // console.log(response.data[0]);
        profil.value = response.data[0];

        formData.value.idenvoyeur = response.data[0].iduser;

        fetchVendeurService(profil.value.iduser);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchVendeurService = async (id) => {
      try {
        // console.log(id);
        const response = await axios.get(
          "https://libere-toi.onrender.com/service/" + id
        );
        console.warn(response.data);
        listVendeurService.value = response.data;
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    const icon = ref(false);
    const detail = ref(null);
    const detailService = (idservice) => {
      detail.value = idservice;
      icon.value = true;
    };

    const formData = ref({
      idenvoyeur: "",
      idreceveur: "",
      message: "Que puis-je faire pour vous?",
    });
    const contacter = async () => {
      try {
        console.log(formData.value);
        const response = await axios.post(
          "https://libere-toi.onrender.com/message/",
          formData.value
        );
        console.log("Réponse du serveur :", response);
        router.push("/Message");
      } catch (error) {
        console.log(error);
      }
    };

    return {
      user,
      profil,
      route,
      listVendeurService,
      icon,
      detail,
      getUserInfo,
      getProfilInfo,
      baseImagePath: "src/assets/",
      fetchVendeurService,
      detailService,
      contacter,
      formData,
    };
  },

  created() {
    this.getUserInfo();
    this.getProfilInfo();
  },
};
</script>
<style lang="sass" scoped>
.my-card
  height: 100%
  min-height: 250px

.service
  width: 100%
  max-width: 350px


.modal
  width: 100%
  max-width: 350px
</style>
