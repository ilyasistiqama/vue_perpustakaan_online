import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import DashboardView from '../views/Dashboard/Index.vue';
import LoginView from '../views/Authentication/Login.vue';
import RegisterView from '../views/Authentication/Register.vue';
import LoggedInLayout from '../layouts/LoggedInLayout.vue';
import AuthenticationLayout from '../layouts/AuthenticationLayout.vue';
import PageNotFound from '../components/PageNotFound.vue';
import KategoriBukuView from '../views/KategoriBuku/Index.vue';
import KategoriBukuCreateView from '../views/KategoriBuku/Create.vue';
import KategoriBukuEditView from '../views/KategoriBuku/Edit.vue';
import MemberView from '../views/Member/Index.vue';
import BukuView from '../views/Buku/Index.vue';
import BukuCreateView from '../views/Buku/Create.vue';
import BukuEditView from '../views/Buku/Edit.vue';
import BukuDetailView from '../views/Buku/Detail.vue';
import BukuImportView from '../views/Buku/Import.vue';
import PeminjamanView from '../views/Peminjaman/Index.vue';
import PeminjamanDetailView from '../views/Peminjaman/Detail.vue';
import Unauthorized from '../components/Unauthorized.vue';


const routes = [
  {
    path: '/login',
    component: AuthenticationLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: LoginView,
      },
    ]
  },
  {
    path: '/register',
    component: AuthenticationLayout,
    children: [
      {
        path: '/register',
        name: 'register',
        component: RegisterView,
      },
    ]
  },
  {
    path: '/',
    component: LoggedInLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashboardView,
      },
      {
        path: '/kategori-buku',
        name: 'kategori-buku',
        component: KategoriBukuView,
      },
      {
        path: '/kategori-buku/create',
        name: 'kategori-buku-create',
        component: KategoriBukuCreateView,
      },
      {
        path: '/kategori-buku/edit/:id',
        name: 'kategori-buku-edit',
        component: KategoriBukuEditView,
      },
      {
        path: '/member',
        name: 'member',
        component: MemberView,
      },
      {
        path: '/buku',
        name: 'buku',
        component: BukuView,
      },
      {
        path: '/buku/create',
        name: 'buku-create',
        component: BukuCreateView,
      },
      {
        path: '/buku/edit/:id',
        name: 'buku-edit',
        component: BukuEditView,
      },
      {
        path: '/buku/detail/:id',
        name: 'buku-detail',
        component: BukuDetailView,
      },
      {
        path: '/buku/import',
        name: 'buku-import',
        component: BukuImportView,
      },
      {
        path: '/peminjaman',
        name: 'peminjaman',
        component: PeminjamanView,
      },
      {
        path: '/peminjaman/detail/:id',
        name: 'peminjaman-detail',
        component: PeminjamanDetailView,
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFound
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: Unauthorized
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('_token');
  const role = localStorage.getItem('_role');

  const adminPath = ['kategori-buku', 'kategori-buku-create', 'kategori-buku-edit', 'buku-create', 'buku-edit', 'buku-import', 'member'];

  if (to.name != 'login' && to.name != 'register' && !token) {
    return next('/login');
  } else if (token && (to.name == 'login' || to.name == 'register')) {
    return next(from);
  } else if(adminPath.includes(to.name) && role != 'admin'){
    return next('/unauthorized');
  }else {
    return next();
  }
})

export default router;