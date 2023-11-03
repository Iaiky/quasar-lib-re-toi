<template>
  <q-layout view="hHr lpR fFf">
    <q-header reveal flat class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar rounded class="bg-white">
            <q-img src="~assets/Logo.png" />
          </q-avatar>
          Libère-toi
        </q-toolbar-title>
        <q-tabs v-model="tab" inline-label style="margin-right: 10px">
          <q-tab
            name="Accueil"
            icon="home"
            label="Accueil"
            @click="this.$router.push('/Home')"
          />
          <q-tab
            name="Category"
            icon="category"
            label="Catégorie"
            @click="this.$router.push('/Categorie')"
          />
          <q-tab name="Temoignage" icon="face_2" label="Témoignage" />
          <q-tab
            v-if="type === 1"
            name="Admin"
            icon="admin_panel_settings"
            label="Admin"
            @click="this.$router.push('/Admin')"
          />
        </q-tabs>

        <q-btn
          flat
          dense
          round
          icon="person"
          @click="toggleRightDrawer"
          class="bg-secondary"
        />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <div class="flex-center q-pa-xs">
        <q-card v-if="user === null" class="my-card bg-grey-1" flat bordered>
          <q-card-section>
            <q-card-section class="text-cyan text-center bg-grey-2">
              <q-avatar
                size="100px"
                font-size="52px"
                color="cyan"
                text-color="white"
                icon="person"
              />
            </q-card-section>

            <q-card-actions vertical align="center">
              <q-btn
                style="background: #9adcea; color: white"
                label="Se connecter"
                unelevated
                icon="login"
                @click="this.$router.push('/Outer/Login')"
              />
              <q-btn
                color="secondary"
                icon="how_to_reg"
                label="S'inscrire"
                outline
                @click="this.$router.push('/Outer/Inscription')"
              />
            </q-card-actions>
          </q-card-section>
        </q-card>
        <q-card v-else class="my-card bg-grey-1" flat bordered>
          <q-card-section>
            <q-card-section class="text-center bg-secondary">
              <q-avatar size="100px">
                <q-img :src="user.photoProfil" ratio="1" />
              </q-avatar>
              <q-card-section class="text-center">
                <div class="text-h6">{{ user.nom }}</div>
                <div class="text-h6">{{ user.prenom }}</div>
              </q-card-section>
            </q-card-section>

            <q-card-actions vertical align="center">
              <q-list>
                <q-item
                  clickable
                  v-ripple
                  @click="this.$router.push('/Profile')"
                >
                  <q-item-section avatar>
                    <q-icon color="secondary" name="person" />
                  </q-item-section>

                  <q-item-section>Profil</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple
                  @click="this.$router.push({ path: '/Message' })"
                >
                  <q-item-section avatar>
                    <q-icon color="secondary" name="message" />
                  </q-item-section>

                  <q-item-section>Message</q-item-section>
                </q-item>
                <q-item clickable v-ripple @click="logout">
                  <q-item-section avatar>
                    <q-avatar
                      rounded
                      color="secondary"
                      text-color="white"
                      icon="logout"
                    />
                  </q-item-section>

                  <q-item-section>Se déconnecter</q-item-section>
                </q-item>
              </q-list>
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <!-- <q-avatar @click="getUserInfo">
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar> -->
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default {
  setup() {
    const rightDrawerOpen = ref(false);
    const router = useRouter();
    const user = ref(null);
    const type = ref(null);
    const $q = useQuasar();

    const getUserInfo = () => {
      const users = $q.localStorage.getItem("user-info");
      if (users != null) {
        console.log(users.data[0]);
        user.value = users.data[0];
        type.value = user.value.type;
      } else {
        type.value = 2;
      }
    };

    const logout = () => {
      localStorage.clear();
      const promesseStockage = new Promise((resolve, reject) => {
        // Vous pouvez ajouter des vérifications de succès ici
        resolve();
      });

      // Une fois que la promesse est résolue (le stockage est terminé), effectuer la navigation
      promesseStockage.then(() => {
        router.push("/Outer/Login");
      });
    };

    return {
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      tab: ref(null),
      user,
      logout,
      getUserInfo,
      type,
    };
  },
  created() {
    this.getUserInfo();
  },
};
</script>
