<template>
  <q-page padding>
    <div class="column justify-evenly q-gutter-y-xl">
      <div class="col-2">
        <div class="row justify-evenly">
          <div class="col-2 self-center">
            <q-card flat bordered class="my-card" style="text-align: center">
              <q-card-section>
                <div class="text-h6"><q-icon name="people" /> Clients</div>
              </q-card-section>

              <q-separator inset />

              <q-card-section> {{ nombreClients }} </q-card-section>
            </q-card>
          </div>
          <div class="col-2 self-center">
            <q-card flat bordered class="my-card" style="text-align: center">
              <q-card-section>
                <div class="text-h6">
                  <q-icon name="people_outline" /> Vendeurs
                </div>
              </q-card-section>

              <q-separator inset />

              <q-card-section> {{ nombreVendeurs }} </q-card-section>
            </q-card>
          </div>
          <div class="col-2 self-center">
            <q-card flat bordered class="my-card" style="text-align: center">
              <q-card-section>
                <div class="text-h6">
                  <q-icon name="support_agent" /> Services
                </div>
              </q-card-section>

              <q-separator inset />

              <q-card-section> {{ nombreService }} </q-card-section>
            </q-card>
          </div>
          <div class="col-3 self-center">
            <q-card flat bordered class="my-card" style="text-align: center">
              <q-card-section>
                <div class="text-h6">
                  <q-icon name="checklist" /> Validations
                </div>
              </q-card-section>

              <q-separator inset />

              <q-card-section> {{ nombreCommande }} </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="row justify-evenly">
          <div class="col-5 self-center">
            <q-card class="my-card" flat bordered>
              <q-card-section>
                <div class="text-h6">Liste des clients</div>
              </q-card-section>

              <q-markup-table style="height: 335px">
                <thead>
                  <tr
                    style="
                      position: sticky;
                      top: 0;
                      z-index: 1;
                      background: #fff;
                    "
                  >
                    <th class="text-left">idClient</th>
                    <th class="text-right">Nom</th>
                    <th class="text-right">Prénom</th>
                    <th class="text-right">email</th>
                    <th class="text-right">N° tel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in clients" :key="item.id">
                    <td class="text-left">{{ item.iduser }}</td>
                    <td class="text-right">{{ item.nom }}</td>
                    <td class="text-right">{{ item.prenom }}</td>
                    <td class="text-right">{{ item.email }}</td>
                    <td class="text-right">{{ item.tel }}</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-card>
          </div>
          <div class="col-5 self-center">
            <q-card class="my-card" flat bordered>
              <q-card-section>
                <div class="text-h6">Liste des vendeurs</div>
              </q-card-section>

              <q-markup-table style="height: 335px">
                <thead>
                  <tr
                    style="
                      position: sticky;
                      top: 0;
                      z-index: 1;
                      background: #fff;
                    "
                  >
                    <th class="text-left">idVendeur</th>
                    <th class="text-right">Nom</th>
                    <th class="text-center">Prénom</th>
                    <th class="text-center">email</th>
                    <th class="text-right">N° tel</th>
                    <th class="text-right">N° CIN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in vendeurs" :key="item.id">
                    <td class="text-left">{{ item.iduser }}</td>
                    <td class="text-right">{{ item.nom }}</td>
                    <td class="text-right">{{ item.prenom }}</td>
                    <td class="text-right">{{ item.email }}</td>
                    <td class="text-right">{{ item.tel }}</td>
                    <td class="text-right">{{ item.CIN_Passeport }}</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="row justify-evenly">
          <div class="col-5 self-center">
            <q-card class="my-card" flat bordered>
              <q-card-section>
                <div class="text-h6">Liste des services</div>
              </q-card-section>

              <q-markup-table style="height: 335px">
                <thead>
                  <tr
                    style="
                      position: sticky;
                      top: 0;
                      z-index: 1;
                      background: #fff;
                    "
                  >
                    <th class="text-left">idService</th>
                    <th class="text-right">Titre</th>
                    <th class="text-right">Catégorie</th>
                    <th class="text-right">Description</th>
                    <th class="text-right">Prix</th>
                    <th class="text-right">Consigne</th>
                    <th class="text-right">Délai</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in services" :key="item.id">
                    <td class="text-left">{{ item.idservice }}</td>
                    <td class="text-right">{{ item.titre }}</td>
                    <td class="text-right">{{ item.idcategorie }}</td>
                    <td class="text-right" col-auto>{{ item.description }}</td>
                    <td class="text-right">{{ item.prix }} Ar</td>
                    <td class="text-right">{{ item.consigne }}</td>
                    <td class="text-right">{{ item.delai }}</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-card>
          </div>
          <div class="col-5 self-center">
            <q-card class="my-card" flat bordered>
              <q-card-section>
                <div class="text-h6">Liste des commandes</div>
              </q-card-section>

              <q-markup-table style="height: 335px">
                <thead>
                  <tr
                    style="
                      position: sticky;
                      top: 0;
                      z-index: 1;
                      background: #fff;
                    "
                  >
                    <th class="text-left">idCommande</th>
                    <th class="text-right">Date</th>
                    <th class="text-right">Client</th>
                    <th class="text-right">Vendeur</th>
                    <th class="text-right">Service</th>
                    <th class="text-right">Motif</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in commandes" :key="item.id">
                    <td class="text-left">{{ item.idcommande }}</td>
                    <td class="text-right">{{ item.dateCreation }}</td>
                    <td class="text-right">{{ item.client }}</td>
                    <td class="text-right">{{ item.vendeur }}</td>
                    <td class="text-right">{{ item.service }}</td>
                    <td class="text-right">{{ item.motif }}</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const clients = ref(null);
    const nombreClients = ref("");
    const vendeurs = ref(null);
    const nombreVendeurs = ref("");
    const services = ref(null);
    const nombreService = ref("");
    const commandes = ref(null);
    const nombreCommande = ref("");

    const fetchDataClient = async () => {
      try {
        const response = await axios.get(
          "https://libere-toi.onrender.com/clients/"
        );
        console.warn(response.data);
        clients.value = response.data;
        nombreClients.value = clients.value.length;
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    const fetchDataVendeur = async () => {
      try {
        const response = await axios.get(
          "https://libere-toi.onrender.com/vendeur/"
        );
        console.warn(response.data);
        vendeurs.value = response.data;
        nombreVendeurs.value = vendeurs.value.length;
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    const fetchDataService = async () => {
      try {
        const response = await axios.get(
          "https://libere-toi.onrender.com/service/"
        );
        console.warn(response.data);
        services.value = response.data;
        nombreService.value = services.value.length;
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    const fetchDataCommande = async () => {
      try {
        const response = await axios.get(
          "https://libere-toi.onrender.com/commande/"
        );
        console.warn(response.data);
        commandes.value = response.data;
        nombreCommande.value = commandes.value.length;
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    return {
      clients,
      nombreClients,
      fetchDataClient,
      vendeurs,
      nombreVendeurs,
      fetchDataVendeur,
      services,
      nombreService,
      fetchDataService,
      commandes,
      nombreCommande,
      fetchDataCommande,
    };
  },
  created() {
    this.fetchDataClient();
    this.fetchDataVendeur();
    this.fetchDataService();
    this.fetchDataCommande();
  },
};
</script>
