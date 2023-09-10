const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/AllFiles.vue") },
    { path: "view/:cid/:file", component: () => import("pages/PdfView.vue") },
    { path: "upload", component: () => import("pages/IndexPage.vue") }
  ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
