<template>
  <q-page padding>
    <div class="column justify-evenly q-gutter-y-xl">
      <div class="col-2">
        <div class="row justify-evenly">
          <div class="col-2 self-center">
            <q-card flat bordered class="my-card" style="text-align: center">
              <q-card-section>
                <div class="text-h6">
                  <q-icon name="support_agent" size="sm" /> Services
                </div>
              </q-card-section>

              <q-separator inset />

              <q-card-section> {{ nombreService }} </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="row justify-evenly">
          <div class="col self-center">
            <q-card class="my-card" flat bordered>
              <q-card-section>
                <div class="text-h6">Liste des services</div>
              </q-card-section>

              <q-markup-table>
                <thead>
                  <tr
                    style="
                      position: sticky;
                      top: 0;
                      z-index: 2;
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
                  <tr v-for="item in services" :key="item.id">
                    <td class="text-left">{{ item.idservice }}</td>
                    <td class="text-right">{{ item.titre }}</td>
                    <td class="text-right">{{ item.idcategorie }}</td>
                    <td class="text-right" col-auto>{{ item.description }}</td>
                    <td class="text-right">{{ item.prix }} Ar</td>
                    <td class="text-right">{{ item.consigne }}</td>
                    <td class="text-right">{{ item.delai }}</td>
                    <td
                      class="text-right"
                      style="
                        position: sticky;
                        right: 0;
                        background: #fff;
                        z-index: 1;
                      "
                    >
                      <!-- <q-btn flat square color="green" icon="done" /> -->
                      <q-btn
                        flat
                        square
                        color="red"
                        icon="clear"
                        @click="supprimerService(item.idservice)"
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
    const services = ref(null);
    const nombreService = ref("");

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

    const supprimerService = async (id) => {
      console.log(id);
      try {
        const response = await axios.delete(
          "https://libere-toi.onrender.com/service/" + id
        );
        console.log(response);
        fetchDataService();
      } catch (error) {
        // Traitement de l'exception
        console.log("Une erreur s'est produite : " + error);
      }
    };

    return {
      services,
      fetchDataService,
      supprimerService,
      nombreService,
    };
  },
  created() {
    this.fetchDataService();
  },
};
</script>
