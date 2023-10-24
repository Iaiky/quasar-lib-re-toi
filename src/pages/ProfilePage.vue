<template>
  <q-page
    padding
    style="background: linear-gradient(to bottom right, #9adcea, #ac1282)"
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
                <q-img :src="baseImagePath + user.photoProfil" />
              </q-card-section>
              <q-separator vertical />
              <q-card-section class="col text-center" style="min-width: 75%">
                <q-card-section
                  ><div class="text-h4 text-bold">{{ user.nom }}</div>
                  <div class="text-h4 text-bold">{{ user.prenom }}</div>
                  <br />
                  <div class="row justify-evenly">
                    <div class="text-h5">
                      <q-icon name="phone" /> {{ user.tel }}
                    </div>
                    <br />
                    <div class="text-h5">
                      <q-icon name="email" /> {{ user.email }}
                    </div>
                  </div>
                  <q-card-section>
                    <q-card flat bordered>
                      <q-card-section>{{ user.bio }} </q-card-section>
                    </q-card>
                  </q-card-section>
                  <br />
                  <q-card-section>
                    <!-- Passez commande modale -->
                    <q-btn
                      v-show="user.type === 2"
                      icon="shop_two"
                      outline
                      color="primary"
                      label="Passer commande"
                      @click="commander = true"
                    />
                    <q-dialog v-model="commander" persistent>
                      <q-card class="modal">
                        <q-card-section class="row items-center q-pb-none">
                          <div class="text-h6">Commande</div>
                          <q-space />
                          <q-btn icon="close" flat round dense v-close-popup />
                        </q-card-section>
                        <q-card-section class="row items-center">
                          <q-form
                            @submit="onSubmit"
                            @reset="onReset"
                            class="q-gutter-lg text-center"
                            style="min-width: 100%"
                          >
                            <q-select
                              outlined
                              v-model="selectedService"
                              :options="serviceOptions"
                              option-label="titre"
                              emit-value
                              map-options
                              dense
                              options-dense
                            >
                              <template v-slot:prepend>
                                <q-icon name="support_agent" />
                              </template>
                            </q-select>
                            <q-input
                              color="purple-12"
                              v-model="formCommande.description"
                              label="Motif de la commande"
                              type="text"
                              dense
                            >
                              <template v-slot:prepend>
                                <q-icon name="edit" />
                              </template>
                            </q-input>
                          </q-form>
                        </q-card-section>

                        <q-card-actions align="right">
                          <q-btn
                            flat
                            label="Annuler"
                            color="primary"
                            v-close-popup
                          />
                          <q-btn
                            flat
                            label="Commander"
                            color="primary"
                            @click="ajoutCommande"
                            v-close-popup
                          />
                        </q-card-actions>
                      </q-card>
                    </q-dialog>
                    <!-- fin modal passer commande -->
                  </q-card-section>
                </q-card-section>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row flex flex-center">
        <q-card bordered flat class="col-10">
          <q-toolbar class="bg-primary text-white">
            <q-btn flat round dense icon col="history" />
            <q-toolbar-title> Historique de commande </q-toolbar-title>
          </q-toolbar>
          <q-card-section>
            <q-card-section class="q-pa-md row items-start q-gutter-md">
              <q-card
                v-for="item in listCommandeHistorique"
                :key="item.idcommande"
                :class="item.validation == 1 ? payer : encours"
                class="historique"
                flat
                bordered
              >
                <q-card-section horizontal>
                  <q-img
                    :src="item.image_source"
                    class="col-4"
                    style="max-height: 150px"
                    ratio="1"
                  />
                  <q-separator vertical />
                  <q-card-section vertical class="">
                    <q-card-section class="no-padding">
                      <div>Date: {{ formatDate(item.dateCreation) }}</div>
                      <div class="">Description: {{ item.motif }}</div>
                      <div class="">Client: {{ item.motif }}</div>
                    </q-card-section>
                    <q-card-section class="no-padding">
                      <div v-if="item.validation == 0">En cours</div>
                      <div v-if="item.validation == 1">payé</div>
                    </q-card-section>
                    <q-card-actions v-if="item.validation === 0">
                      <q-btn
                        v-if="
                          user.type === 2 && item.validationPaiementClient === 0
                        "
                        flat
                        style="background: #ac1282"
                        color="white"
                        label="Payer"
                        @click="payerCommande(item.idcommande)"
                      />
                      <q-btn
                        v-if="user.type === 3 && item.validationVendeur === 0"
                        flat
                        style="background: #ac1282"
                        color="white"
                        label="Livrer"
                        @click="livrerCommande(item.idcommande)"
                      />
                      <q-btn
                        outline
                        style="color: #ac1282"
                        label="Annuler"
                        @click="supprimerCommande(item.idcommande)"
                      />
                    </q-card-actions>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>

      <div v-if="user.type === 3" class="">
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

            <!-- créer service Modal -->
            <q-dialog v-model="ajouterService" persistent>
              <q-card class="modal">
                <q-card-section class="row items-center q-pb-none">
                  <div class="text-h6">Ajout Service</div>
                  <q-space />
                  <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <q-card-section class="row items-center">
                  <q-form
                    class="q-gutter-lg text-center"
                    style="min-width: 100%"
                    enctype="multipart/form-data"
                  >
                    <q-input
                      color="purple-12"
                      v-model="formServiceData.titre"
                      label="Nom du service"
                      type="text"
                      dense
                    >
                      <template v-slot:prepend>
                        <q-icon name="edit" />
                      </template>
                    </q-input>

                    <q-input
                      color="purple-12"
                      v-model="formServiceData.prix"
                      label="Prix du service"
                      type="number"
                      dense
                    >
                      <template v-slot:prepend>
                        <q-icon name="edit" />
                      </template>
                    </q-input>

                    <q-input
                      color="purple-12"
                      v-model="formServiceData.delai"
                      label="Délai du service"
                      type="text"
                      dense
                    >
                      <template v-slot:prepend>
                        <q-icon name="edit" />
                      </template>
                    </q-input>

                    <q-select
                      outlined
                      :loading="fetchingTodos"
                      v-model="selectedCategorie"
                      :options="categorieOptions"
                      option-value="categorie"
                      option-label="titre"
                      emit-value
                      map-options
                      dense
                      options-dense
                    >
                      <template v-slot:prepend>
                        <q-icon name="category" />
                      </template>
                    </q-select>
                    <q-input
                      color="purple-12"
                      v-model="formServiceData.description"
                      label="Description"
                      type="textarea"
                      dense
                    >
                      <template v-slot:prepend>
                        <q-icon name="image" />
                      </template>
                    </q-input>

                    <q-input
                      color="purple-12"
                      v-model="formServiceData.consigne"
                      label="Consigne"
                      type="textarea"
                      dense
                    >
                      <template v-slot:prepend>
                        <q-icon name="image" />
                      </template>
                    </q-input>

                    <q-input
                      type="file"
                      @change="uploadFile"
                      filled
                      v-model="selectedFile"
                    />
                  </q-form>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Annuler" color="primary" v-close-popup />
                  <q-btn
                    flat
                    label="Ajouter"
                    color="primary"
                    v-close-popup
                    @click="ajoutService"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
            <!-- Fin créer service modal -->

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

        <!-- modal service -->
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

              <!-- <q-rating v-model="stars" :max="5" size="32px" /> -->
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
              <q-btn
                v-close-popup
                flat
                color="primary"
                :label="detail.prenom"
              />
              <q-btn
                flat
                color="primary"
                round
                icon="delete"
                @click="confirmDelete = true"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- Fin service modale show sns -->

        <!-- confirm delete modal service -->
        <q-dialog
          v-model="confirmDelete"
          persistent
          transition-show="scale"
          transition-hide="scale"
        >
          <q-card class="bg-teal text-white" style="width: 300px">
            <q-card-section>
              <div class="text-h6">Supprimer service</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Voulez-vous vraiment supprimer ce service?
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn flat label="ANNULER" v-close-popup />
              <q-btn
                flat
                label="OK"
                @click="supprimerService(detail.idservice)"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>

      <!-- <q-form enctype="multipart/form-data" class="bg-grey-2">
        <q-input type="file" v-model="selectedFile" @change="uploadFile" />
        <q-btn @click="uploadImage"> click</q-btn>
      </q-form> -->
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const test = [
  { id: 1, nom: "Option 1" },
  { id: 2, nom: "Option 2" },
  { id: 3, nom: "Option 3" },
  // ... d'autres éléments
];

export default {
  // name: 'PageName',
  setup() {
    const categorieOptions = ref([]);
    const router = useRouter();
    const user = ref(null);
    const $q = useQuasar();
    const listVendeurService = ref(null);
    const listCommandeHistorique = ref(null);
    const formServiceData = ref({
      description: "",
      idcategorie: "",
      titre: "",
      prix: "",
      delai: "",
      consigne: "",
      idvendeur: "",
      image_source: "",
    });
    const selectedFile = ref("");

    const fetchVendeurService = async (id) => {
      try {
        console.log(id);
        const response = await axios.get(
          "https://libere-toi.onrender.com/service/" + id
        );
        console.warn(response.data);
        listVendeurService.value = response.data;
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    const fetchCommandeHistorique = async (id, idtype) => {
      try {
        console.log(idtype);
        if (idtype === 2) {
          const response = await axios.get(
            "https://libere-toi.onrender.com/commande/commandeClient/" + id
          );
          // console.warn(response.data);
          listCommandeHistorique.value = response.data;
        } else if (idtype === 3) {
          const response = await axios.get(
            "https://libere-toi.onrender.com/commande/commandeVendeur/" + id
          );
          // console.warn(response.data);
          listCommandeHistorique.value = response.data;
        }
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    const payerCommande = async (idcommande) => {
      console.log("payer");
      try {
        const response = await axios.patch(
          "https://libere-toi.onrender.com/commande/client/" + idcommande
        );
        console.log(response);
      } catch (error) {
        // Traitement de l'exception
        console.log("Une erreur s'est produite : " + error);
      }
    };

    const livrerCommande = async (idcommande) => {
      console.log("payer");
      try {
        const response = await axios.patch(
          "https://libere-toi.onrender.com/commande/vendeur/" + idcommande
        );
        console.log(response);
      } catch (error) {
        // Traitement de l'exception
        console.log("Une erreur s'est produite : " + error);
      }
    };

    const supprimerCommande = async (idcommande) => {
      console.log("supprimer commande");
      try {
        const response = await axios.delete(
          "https://libere-toi.onrender.com/commande/" + idcommande
        );
        console.log(response);
      } catch (error) {
        // Traitement de l'exception
        console.log("Une erreur s'est produite : " + error);
      }
    };

    const supprimerService = async (idservice) => {
      console.log("supprimer service");
      console.log(idservice);
      try {
        const response = await axios.delete(
          "https://libere-toi.onrender.com/service/" + idservice
        );
        console.log(response);
      } catch (error) {
        // Traitement de l'exception
        console.log("Une erreur s'est produite : " + error);
      }
    };

    const getUserInfo = () => {
      const users = $q.localStorage.getItem("user-info");
      if (users != null) {
        console.log(users.data[0]);

        fetchVendeurService(users.data[0].iduser);

        fetchCommandeHistorique(users.data[0].iduser, users.data[0].type);

        formServiceData.value.idvendeur = users.data[0].iduser;
        formCommande.value.client = users.data[0].iduser;

        user.value = users.data[0];
      } else {
        router.push("/Outer/Login");
      }
    };

    const fetchingTodos = ref(false);
    const selectedCategorie = ref();
    const fetchCategory = async () => {
      const temp = ref(null);
      fetchingTodos.value = true;
      try {
        const response = await axios.get(
          "https://libere-toi.onrender.com/categorie/listeCategorie"
        );
        // console.warn(response.data.data);
        fetchingTodos.value = false;
        temp.value = response.data.data;

        categorieOptions.value = temp.value.map((item) => ({
          categorie: item.categorie,
          titre: item.titre,
        }));

        selectedCategorie.value = categorieOptions.value[0];
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    const serviceOptions = ref(null);
    const selectedService = ref();
    const fetchService = async () => {
      const temp = ref(null);
      try {
        const response = await axios.get(
          "https://libere-toi.onrender.com/service/listeNom"
        );
        console.warn(response.data.data);
        temp.value = response.data.data;

        serviceOptions.value = temp.value.map((item) => ({
          idservice: item.idservice,
          titre: item.titre,
          idvendeur: item.idvendeur,
        }));
        selectedService.value = serviceOptions.value[0];
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${day}-${month}-${year}`;
    };

    const icon = ref(false);
    const detail = ref(null);
    const detailService = (idservice) => {
      detail.value = idservice;
      icon.value = true;
    };

    const uploadImage = async () => {
      if (selectedFile.value) {
        const formData = new FormData();
        formData.append("file", selectedFile.value[0]);
        try {
          console.log(selectedFile.value[0]);
          const response = await axios.post(
            "https://libere-toi.onrender.com/upload/single",
            formData
          );
          console.warn(response.data.file);
          formServiceData.value.image_source = response.data.file.filename;
          console.log(formServiceData.value.image_source);
          //                 this.message = "File has been uploaded";
          //                 this.image = "";
          //                 this.error = false;
        } catch (error) {
          console.error("Erreur lors du téléchargement du fichier", error);
        }
      }
    };

    const ajoutService = async () => {
      try {
        await uploadImage();
        console.log("begins");
        formServiceData.value.idcategorie = selectedCategorie.value;
        // console.log(formServiceData.value.titre);
        // console.log(formServiceData.value.prix);
        // console.log(formServiceData.value.consigne);
        // console.log(formServiceData.value.idcategorie);
        // console.log(formServiceData.value.idvendeur);
        // console.log(formServiceData.value.description);
        // console.log(formServiceData.value.delai);
        // console.log(formServiceData.value.image_source);
        const response = await axios.post(
          "https://libere-toi.onrender.com/service/",
          formServiceData.value
        );
        console.log("vita?");
        console.log("Réponse du serveur :", response);

        if (response.status == 200) {
          try {
            // router.push("/Profil");
          } catch (e) {
            // data wasn't successfully saved due to
            // a Web Storage API error
          }
        }
      } catch (e) {
        // this.message = "Something went wrong";
        // this.error = true;
      }
    };

    const formCommande = ref({
      description: "",
      client: "",
      idvendeur: "",
      idservice: "",
    });
    const ajoutCommande = async () => {
      try {
        console.log("begin commande");
        formCommande.value.idservice = selectedService.value.idservice;
        formCommande.value.idvendeur = selectedService.value.idvendeur;
        // console.log(formCommande.value.idservice);
        // console.log(formCommande.value.idvendeur);
        const response = await axios.post(
          "https://libere-toi.onrender.com/commande/",
          formCommande.value
        );
        console.log("Réponse du serveur :", response);

        if (response.status == 200) {
          try {
            // router.push("/Profil");
          } catch (e) {
            // data wasn't successfully saved due to
            // a Web Storage API error
          }
        }
      } catch (error) {}
    };

    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

      model: ref(null),
      formatDate,

      // modal dialogue
      icon,
      ajouterService: ref(false),
      commander: ref(false),
      confirmDelete: ref(false),

      // commander
      fetchCategory,
      serviceOptions,
      fetchService,
      selectedService,
      ajoutCommande,
      formCommande,
      payerCommande,
      livrerCommande,
      supprimerCommande,

      motif: ref(null),
      service: ref(null),

      // ajout de service

      detailService,
      uploadImage,
      selectedFile,
      ajoutService,
      formServiceData,
      selectedCategorie,
      detail,
      categorieOptions,
      file: ref(null),
      nomService: ref(null),
      prixService: ref(null),
      categorieService: ref(null),
      descriptionService: ref(null),
      supprimerService,

      // utilisateur
      user,
      getUserInfo,
      fetchVendeurService,
      fetchCommandeHistorique,
      listVendeurService,
      listCommandeHistorique,
      baseImagePath: "src/assets/",

      // Historique style
      payer: ref("bg-green-1"),
      encours: ref("bg-red-1"),
    };
  },

  created() {
    this.fetchCategory();
    this.fetchService();
    this.getUserInfo();
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

.commande
  // width: 550px
  height: 335px

.modal
  width: 100%
  max-width: 350px

.historique
  width: 40%
  // max-width: 350px
  height: 100%
  max-height: 200px
</style>
