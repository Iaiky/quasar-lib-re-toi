<template>
  <q-page padding>
    <div class="column justify-evenly q-gutter-y-xl">
      <div class="col-2">
        <div class="row justify-evenly">
          <div class="col-3 self-center">
            <q-card flat bordered class="my-card" style="text-align: center">
              <q-card-section>
                <div class="text-h6">
                  <q-icon size="sm" name="receipt_long" /> Commande
                </div>
              </q-card-section>

              <q-separator inset />

              <q-card-section> {{ nombreCommande }} </q-card-section>
            </q-card>
          </div>
          <div class="col-3 self-center">
            <q-card flat bordered class="my-card" style="text-align: center">
              <q-card-section>
                <div class="text-h6">
                  <q-icon size="sm" name="checklist" /> Validations
                </div>
              </q-card-section>

              <q-separator inset />

              <q-card-section> {{ nombreCommandeAttente }}</q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="row justify-evenly">
          <div class="col-9 self-center">
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
      <div class="col-4">
        <div class="row justify-evenly">
          <div class="col-9 self-center">
            <q-card class="my-card" flat bordered>
              <q-card-section>
                <div class="text-h6">Liste des commandes en attentes</div>
              </q-card-section>

              <q-markup-table style="height: 335px">
                <thead>
                  <tr
                    style="
                      position: sticky;
                      top: 0;
                      z-index: 2;
                      background: #fff;
                    "
                  >
                    <th class="text-left">idCommande</th>
                    <th class="text-right">Date</th>
                    <th class="text-right">Client</th>
                    <th class="text-right">Vendeur</th>
                    <th class="text-right">Service</th>
                    <th class="text-right">Motif</th>
                    <th
                      class="text-center"
                      style="
                        position: sticky;
                        right: 0;
                        background: #fff;
                        z-index: 1;
                      "
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in commandeAttente" :key="item.id">
                    <td class="text-left">{{ item.idcommande }}</td>
                    <td class="text-right">{{ item.dateCreation }}</td>
                    <td class="text-right">{{ item.client }}</td>
                    <td class="text-right">{{ item.vendeur }}</td>
                    <td class="text-right">{{ item.service }}</td>
                    <td class="text-right">{{ item.motif }}</td>
                    <td
                      class="text-right"
                      style="
                        position: sticky;
                        right: 0;
                        background: #fff;
                        z-index: 1;
                      "
                    >
                      <q-btn
                        flat
                        square
                        color="green"
                        icon="done"
                        @click="validerCommande(item.idcommande)"
                      />
                      <q-btn
                        flat
                        square
                        color="red"
                        icon="clear"
                        @click="supprimerCommande(item.idcommande)"
                      />
                    </td>
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
    const commandes = ref(null);
    const nombreCommande = ref("");
    const commandeAttente = ref(null);
    const nombreCommandeAttente = ref("");

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

    const fetchDataCommandeAttente = async () => {
      try {
        const response = await axios.get(
          "https://libere-toi.onrender.com/commande/validation"
        );
        console.warn(response.data);
        commandeAttente.value = response.data;
        nombreCommandeAttente.value = commandeAttente.value.length;
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    const supprimerCommande = async (id) => {
      console.log(id);
      try {
        const response = await axios.delete(
          "https://libere-toi.onrender.com/commande/" + id
        );
        console.log(response);
        fetchDataCommande();
        fetchDataCommandeAttente();
      } catch (error) {
        // Traitement de l'exception
        console.log("Une erreur s'est produite : " + error);
      }
    };

    const validerCommande = async (id) => {
      console.log(id);
      try {
        const response = await axios.patch(
          "https://libere-toi.onrender.com/commande/admin/" + id
        );
        console.log(response);
        fetchDataCommande();
        fetchDataCommandeAttente();
      } catch (error) {
        // Traitement de l'exception
        console.log("Une erreur s'est produite : " + error);
      }
    };

    return {
      commandes,
      commandeAttente,
      fetchDataCommande,
      fetchDataCommandeAttente,
      supprimerCommande,
      validerCommande,
      nombreCommande,
      nombreCommandeAttente,
    };
  },
  created() {
    this.fetchDataCommande(), this.fetchDataCommandeAttente();
  },
};
</script>
