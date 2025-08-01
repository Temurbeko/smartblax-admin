import AnalysisView from '@/views/AnalysisView.vue';
import SalaryView from '@/views/SalaryView.vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import CompaniesList from '@/views/companies/List.vue';
import DashboardView from '@/views/DashboardView.vue';
import SettingsView from '@/views/SettingsView.vue';
import CompanyCreate from '@/views/companies/Create.vue';
import CompanyList from '@/views/companies/List.vue';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    meta: { title: 'Главная' },
    children: [
      {
        path: 'analysis',
        name: 'Analysis',
        component: AnalysisView,
        meta: { title: 'Analysis' },
        children: [
          {
            path: 'salary',
            name: 'Salary',
            component: SalaryView,
            meta: { title: 'Salary' }
          }
        ]
      }
    ]
  },
  {
    path: '/companies',
    name: 'companies',
    redirect: { name: "companies-list" },
    meta: { breadcrumb: 'Компании' },
    children: [
      {
        path: 'list',
        name: 'companies-list',
        component: CompanyList,
        meta: { breadcrumb: 'Список' }
      },
      {
        path: 'create',
        name: 'companies-create',
        component: CompanyCreate,
        meta: { breadcrumb: 'Создать' }
      },
      {
        path: 'edit',
        name: 'companies-edit',
        component: CompaniesList,
        meta: { breadcrumb: 'Редактировать' }
      },
    ]
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
    meta: { title: 'Настройки' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;