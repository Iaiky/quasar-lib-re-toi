<template>
  <q-page
    padding
    style="background: linear-gradient(to bottom right, #9adcea, #ac1282)"
  >
    <div class="column justify-evenly q-gutter-y-xl">
      <div class="flex-center row">
        <div class="col-9">
          <q-card
            bordered
            style="
              /* background-color: linear-gradient(to right, #ffffff, #ecccecf5); */
              background: linear-gradient(to top right, #ffffff, #ecccecf5);
            "
            flat
          >
            <q-card-section horizontal>
              <q-img class="col-4" src="~assets/body.png" />
              <q-card-section class="column justify-evenly">
                <q-card-section class="text-primary text-center">
                  <div class="text-h3 text-bold">
                    Libère-toi financièrement!
                  </div>
                  <br />
                  <div class="text-h5">Et profite pleinement de la vie.</div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                  <q-card
                    class="text-right text-italic text-bold bg-cyan"
                    bordered
                    flat
                  >
                    <q-card-section class="justify-between" horizontal>
                      <q-card-section class="flex flex-center">
                        <q-btn
                          color="primary"
                          icon-right="start"
                          label="Commencer"
                        />
                      </q-card-section>
                      <q-card-section>
                        <p>* Atteindre la liberté financière</p>
                        <p>* Devenir totalement indépendant(e)</p>
                        <p>* Profiter pleinement de la vie.</p>
                      </q-card-section>
                    </q-card-section>
                  </q-card>
                </q-card-section>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div>
        <div class="row flex-center">
          <q-card class="col-8 bg-grey-3">
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
                @click="dirigerService(item.categorie)"
              >
                <q-img :src="item.source" />

                <q-card-section>
                  <div class="text-h6 text-center">{{ item.titre }}</div>
                </q-card-section>
              </q-card>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div>
        <div class="row flex-center">
          <q-card class="col-6">
            <q-toolbar class="bg-primary text-white text-center">
              <q-toolbar-title>Témoignage</q-toolbar-title>
            </q-toolbar>
            <q-carousel
              v-model="slide"
              swipeable
              animated
              control-type="outline"
              control-color="purple"
              navigation
              padding
              arrows
              height="300px"
              class="text-purple rounded-borders bg-grey-3"
            >
              <q-carousel-slide name="style" class="column no-wrap flex-center">
                <q-avatar size="100px">
                  <img src="https://cdn.quasar.dev/img/avatar.png" />
                </q-avatar>
                <div class="q-mt-md text-center">{{ lorem }}{{ lorem }}</div>
              </q-carousel-slide>
              <q-carousel-slide name="tv" class="column no-wrap flex-center">
                <q-avatar size="100px">
                  <img src="https://cdn.quasar.dev/img/avatar.png" />
                </q-avatar>
                <div class="q-mt-md text-center">
                  {{ lorem }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide
                name="layers"
                class="column no-wrap flex-center"
              >
                <q-icon name="layers" size="56px" />
                <div class="q-mt-md text-center">
                  {{ lorem }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="map" class="column no-wrap flex-center">
                <q-icon name="terrain" size="56px" />
                <div class="q-mt-md text-center">
                  {{ lorem }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="ex" class="column no-wrap flex-center">
                <q-icon name="terrain" size="56px" />
                <div class="q-mt-md text-center">
                  {{ lorem }}
                </div>
              </q-carousel-slide>
            </q-carousel>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const category = ref(null);
    const router = useRouter();

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

    const dirigerService = (id) => {
      router.push("/Service/" + id);
    };

    return {
      slide: ref("style"),
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category,
      fetchData,
      dirigerService,
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
  cursor: pointer
  transition: background-color 0.3s

.my-card:hover
  background-color: #f0f0f0
</style>
