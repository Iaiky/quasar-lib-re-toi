const routes = [
  {
    path: "/Admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/AdminPages/TableauDeBord.vue"),
      },
      {
        path: "Client",
        component: () => import("pages/AdminPages/ClientBoardPage.vue"),
      },
      {
        path: "Vendeur",
        component: () => import("pages/AdminPages/VendeurBoardPage.vue"),
      },
      {
        path: "Service",
        component: () => import("pages/AdminPages/ServiceBoardPage.vue"),
      },
      {
        path: "Commande",
        component: () => import("pages/AdminPages/CommandeBoardPage.vue"),
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "Home", component: () => import("pages/HomePage.vue") },
      { path: "Categorie", component: () => import("pages/CategoriePage.vue") },
      { path: "Profile", component: () => import("pages/ProfilePage.vue") },
      { path: "Message", component: () => import("pages/MessagePage.vue") },
      { path: "Visite/:id", component: () => import("pages/VisitePage.vue") },
      { path: "Service/:id", component: () => import("pages/ServicePage.vue") },
    ],
  },

  {
    path: "/Outer",
    component: () => import("layouts/OuterLayout.vue"),
    children: [
      { path: "Login", component: () => import("pages/LoginPage.vue") },
      {
        path: "Inscription",
        component: () => import("pages/InscriptionPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
