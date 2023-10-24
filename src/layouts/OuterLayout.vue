<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <q-header elevated>
      <q-toolbar class="glossy">
        <q-avatar>
          <img src="~assets/Logo.png" />
        </q-avatar>

        <q-toolbar-title>Libère-toi</q-toolbar-title>

        <q-btn
          flat
          round
          dense
          icon="home"
          @click="this.$router.push('/Home')"
        />
      </q-toolbar>
    </q-header>

    <q-footer elevated>
      <q-toolbar class="glossy">
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  // name: 'LayoutName',

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
