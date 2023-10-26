<template>
  <q-layout view="lHr LpR fff">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar> -->
          <q-avatar
            color="primary"
            font-size="36px"
            text-color="white"
            icon="dashboard"
          />
          Tableau de bord
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="q-pa-md bg-grey-9 text-white"
    >
      <!-- drawer content -->
      <q-list dark>
        <q-item v-ripple>
          <q-item-section thumbnail>
            <img src="~assets/Logo.png" />
          </q-item-section>
          <!-- <q-item-section>Libère-toi</q-item-section> -->
          <q-item-label header>
            <q-toolbar-title>Libère-toi</q-toolbar-title>
          </q-item-label>
        </q-item>

        <q-separator />

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-card flat bordered square>
        <q-img :src="source">
          <div class="absolute-bottom">
            <div class="text-h6">Administrateur</div>
            <div class="text-subtitle2">{{ user.nom }} {{ user.prenom }}</div>
          </div>
        </q-img>

        <q-card-actions vertical>
          <q-btn
            class="glossy"
            color="primary"
            icon-right="logout"
            label="Se déconnecter"
            @click="logout"
          />
        </q-card-actions>
      </q-card>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const linksList = [
  {
    title: "Tableau de bord",
    caption: "Dashboard",
    icon: "dashboard",
    link: "Admin",
  },
  {
    title: "Client",
    caption: "Ajout et suppression de clients",
    icon: "people",
    link: "Admin/Client",
  },
  {
    title: "Vendeur",
    caption: "Control des vendeurs",
    icon: "people_outline",
    link: "Admin/Vendeur",
  },
  {
    title: "Service",
    caption: "Editer les services",
    icon: "support_agent",
    link: "Admin/Service",
  },
  {
    title: "Validation",
    caption: "Vérification des commandes",
    icon: "checklist",
    link: "Admin/Commande",
  },
  {
    title: "Home",
    caption: "Retour dans la page accueil",
    icon: "home",
    link: "Home",
  },
];

export default defineComponent({
  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    const router = useRouter();
    const user = ref(null);
    const $q = useQuasar();
    const source = ref("");
    const baseImagePath = ref("src/assets/");

    const getUserInfo = () => {
      const users = $q.localStorage.getItem("user-info");
      if (users != null) {
        console.log(users.data[0]);
        user.value = users.data[0];

        source.value = baseImagePath.value + user.value.photoProfil;
      } else {
        router.push("/Outer/Login");
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
      essentialLinks: linksList,

      getUserInfo,
      user,
      source,
      baseImagePath,
      logout,

      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
  created() {
    this.getUserInfo();
  },
});
</script>
