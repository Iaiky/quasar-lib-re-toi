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
        </div>
      </div>
      <div class="col-4">
        <div class="row justify-evenly">
          <div class="col-9 self-center">
            <q-card class="my-card" flat bordered>
              <q-card-section>
                <div class="text-h6">Liste des clients</div>
                <div v-for="item in cli" :key="item.id">{{ item.nom }}</div>
              </q-card-section>

              <q-markup-table style="height: 500px">
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
                    <th
                      class="text-right"
                      style="
                        position: sticky;
                        right: 0;
                        background: #fff;
                        z-index: 1;
                      "
                    >
                      Supprimer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in clients" :key="item.id">
                    <td class="text-left">{{ item.iduser }}</td>
                    <td class="text-right">{{ item.nom }}</td>
                    <td class="text-right">{{ item.prenom }}</td>
                    <td class="text-right">{{ item.email }}</td>
                    <td class="text-right">{{ item.tel }}</td>
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
                        color="primary"
                        icon="delete"
                        @click="supprimerClient(item.iduser)"
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
  // name: "PageName",

  setup() {
    const clients = ref(null);
    const nombreClients = ref("");

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

    const supprimerClient = async (id) => {
      console.log(id);
      try {
        const response = await axios.delete(
          "https://libere-toi.onrender.com/clients/" + id
        );
        console.log(response);
        fetchDataClient();
      } catch (error) {
        // Traitement de l'exception
        console.log("Une erreur s'est produite : " + error);
      }
    };

    return {
      clients,
      fetchDataClient,
      supprimerClient,
      nombreClients,
    };
  },
  created() {
    this.fetchDataClient();
  },
};
</script>
