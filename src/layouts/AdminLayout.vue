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
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-bottom">
            <div class="text-h6">Administrateur</div>
            <div class="text-subtitle2">Nom de l'admin</div>
          </div>
        </q-img>

        <q-card-actions vertical>
          <q-btn
            class="glossy"
            color="primary"
            icon-right="logout"
            label="Se déconnecter"
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

const linksList = [
  {
    title: "Tableau de bord",
    caption: "Dashboard",
    icon: "dashboard",
    link: "http://localhost:9000/Admin",
  },
  {
    title: "Client",
    caption: "Ajout et suppression de clients",
    icon: "people",
    link: "http://localhost:9000/Admin/Client",
  },
  {
    title: "Vendeur",
    caption: "Control des vendeurs",
    icon: "people_outline",
    link: "http://localhost:9000/Admin/Vendeur",
  },
  {
    title: "Service",
    caption: "Editer les services",
    icon: "support_agent",
    link: "http://localhost:9000/Admin/Service",
  },
  {
    title: "Validation",
    caption: "Vérification des commandes",
    icon: "checklist",
    link: "http://localhost:9000/Admin/Commande",
  },
  {
    title: "Home",
    caption: "Retour dans la page accueil",
    icon: "home",
    link: "http://localhost:9000",
  },
];

export default defineComponent({
  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,

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
});
</script>
