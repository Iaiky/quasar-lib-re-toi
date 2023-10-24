<template>
  <q-page
    padding
    style="background: linear-gradient(to bottom right, #9adcea, #ac1282)"
  >
    <div class="row flex-center" flat>
      <q-card class="col-8 bg-grey-2">
        <q-toolbar class="bg-primary text-white text-center">
          <q-toolbar-title>Catégorie des services</q-toolbar-title>
        </q-toolbar>
        <q-card-section
          class="q-pa-md row items-start q-gutter-xl justify-evenly"
        >
          <q-card
            class="my-card"
            flat
            bordered
            v-for="item in category"
            :key="item.categorie"
          >
            <q-img :src="baseImagePath + item.source" />

            <q-card-section>
              <div class="text-h6 text-center">{{ item.titre }}</div>
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

export default {
  setup() {
    const category = ref(null);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://libere-toi.onrender.com/categorie/listeCategorie"
        );
        console.warn(response);
        category.value = response.data.data;
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    return {
      slide: ref("style"),
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      baseImagePath: "src/assets/",
      fetchData,
      category,
    };
  },

  created() {
    this.fetchData();
  },
  // name: 'PageName',
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
