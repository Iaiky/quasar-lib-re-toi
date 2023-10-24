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
                    <th class="text-right">Supprimer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in clients" :key="item.id">
                    <td class="text-left">{{ item.id }}</td>
                    <td class="text-right">{{ item.nom }}</td>
                    <td class="text-right">{{ item.prenom }}</td>
                    <td class="text-right">{{ item.email }}</td>
                    <td class="text-right">{{ item.tel }}</td>
                    <td class="text-right">
                      <q-btn flat square color="primary" icon="delete" />
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
  // name: "PageName",
  data() {
    return {
      clients: cli,
    };
  },
};
</script>
