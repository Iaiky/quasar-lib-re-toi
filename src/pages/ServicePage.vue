<template>
  <q-page
    padding
    style="background: linear-gradient(to bottom right, #9adcea, #ac1282)"
  >
    <div class="row flex-center" flat>
      <q-card class="col-11 bg-grey-2">
        <q-toolbar class="bg-primary text-white text-center">
          <q-toolbar-title>Catégorie: {{ titre }} </q-toolbar-title>
        </q-toolbar>
        <q-card-section
          class="q-pa-md row items-start q-gutter-md justify-evenly"
        >
          <q-card
            class="my-card"
            flat
            bordered
            v-for="item in service"
            :key="item.idservice"
          >
            <q-card-section class="" horizontal>
              <q-img :src="item.image_source" class="col-3" />

              <q-card-section class="col-6">
                <div class="text-h6 text-center">{{ item.titre }}</div>
                <div>Description : {{ item.description }}</div>
                <div>Délai : {{ item.delai }}</div>
                <div>Prix : {{ item.prix }}</div>
              </q-card-section>

              <q-separator vertical />
              <q-card-section
                v-if="item.iduser != user.iduser"
                class="col-3 text-center"
              >
                Par
                <div class="text-bold">{{ item.prenom }}</div>
                <br />
                <q-btn
                  icon="read_more"
                  outline
                  color="primary"
                  label="Voir "
                  @click="visiter(item.iduser)"
                />
              </q-card-section>
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
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
  setup() {
    const service = ref(null);
    const route = useRoute();
    const router = useRouter();
    const user = ref(null);
    const $q = useQuasar();
    const titre = ref("");

    const fetchData = async (id) => {
      try {
        const response = await axios.get(
          "https://libere-toi.onrender.com/service/categorie/" + id
        );
        console.warn(response.data.data);
        service.value = response.data.data;
        titre.value = response.data.data[0].categorie;
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    const getUserInfo = () => {
      const users = $q.localStorage.getItem("user-info");
      if (users != null) {
        // fetchVendeurService(users.data[0].iduser);

        user.value = users.data[0];
        console.log(user.value);

        fetchData(route.params.id);
      } else {
        router.push("/Outer/Login");
      }
    };

    const visiter = (id) => {
      router.push("/Visite/" + id);
    };

    return {
      service,
      titre,
      user,
      fetchData,
      getUserInfo,
      visiter,
    };
  },
  created() {
    this.getUserInfo();
  },
  // name: 'PageName',
};
</script>
<style lang="sass" scoped>
.my-card
  height: 100%
  max-height: 300px
  width: 100%
</style>
