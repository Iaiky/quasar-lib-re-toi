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

              <q-card-section> 152 </q-card-section>
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

              <q-card-section> 152 </q-card-section>
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
                  <tr v-for="item in clients" :key="item.id">
                    <td class="text-left">{{ item.id }}</td>
                    <td class="text-right">{{ item.nom }}</td>
                    <td class="text-right">{{ item.prenom }}</td>
                    <td class="text-right">{{ item.email }}</td>
                    <td class="text-right">{{ item.tel }}</td>
                    <td class="text-right">{{ item.cin }}</td>
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
                  <tr v-for="item in clients" :key="item.id">
                    <td class="text-left">{{ item.id }}</td>
                    <td class="text-right">{{ item.date }}</td>
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
                      <q-btn flat square color="green" icon="done" />
                      <q-btn flat square color="red" icon="clear" />
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
const cli = [
  {
    id: "1",
    nom: "Iaiky",
    prenom: "N NaeJ G",
    email: "Iaiky@gmail.com",
    tel: "+261340877972",
    cin: "55555555555",
    date: "26-02-2023",
  },
  {
    id: "2",
    nom: "Iaiky",
    prenom: "N NaeJ G",
    email: "Iaiky@gmail.com",
    tel: "+261340877972",
    cin: "55555555555",
    date: "26-02-2023",
  },
  {
    id: "3",
    nom: "Iaiky",
    prenom: "N NaeJ G",
    email: "Iaiky@gmail.com",
    tel: "+261340877972",
    cin: "55555555555",
    date: "26-02-2023",
  },
  {
    id: "4",
    nom: "Iaiky",
    prenom: "N NaeJ G",
    email: "Iaiky@gmail.com",
    tel: "+261340877972",
    cin: "55555555555",
    date: "26-02-2023",
  },
  {
    id: "5",
    nom: "Iaiky",
    prenom: "N NaeJ G",
    email: "Iaiky@gmail.com",
    tel: "+261340877972",
    cin: "55555555555",
    date: "26-02-2023",
  },
  {
    id: "6",
    nom: "Iaiky",
    prenom: "N NaeJ G",
    email: "Iaiky@gmail.com",
    tel: "+261340877972",
    cin: "55555555555",
    date: "26-02-2023",
  },
  {
    id: "7",
    nom: "Iaiky",
    prenom: "N NaeJ G",
    email: "Iaiky@gmail.com",
    tel: "+261340877972",
    cin: "55555555555",
    date: "26-02-2023",
  },
  {
    id: "8",
    nom: "Iaiky",
    prenom: "N NaeJ G",
    email: "Iaiky@gmail.com",
    tel: "+261340877972",
    cin: "55555555555",
    date: "26-02-2023",
  },
  {
    id: "9",
    nom: "Iaiky",
    prenom: "N NaeJ G",
    email: "Iaiky@gmail.com",
    tel: "+261340877972",
    cin: "55555555555",
    date: "26-02-2023",
  },
  {
    id: "10",
    nom: "Iaiky",
    prenom: "N NaeJ G",
    email: "Iaiky@gmail.com",
    tel: "+261340877972",
    cin: "55555555555",
    date: "26-02-2023",
  },
];

export default {
  name: "PageName",
  data() {
    return {
      clients: cli,
    };
  },
};
</script>
