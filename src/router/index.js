import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    meta: {
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/documentation',
    component: Layout,
    meta: {
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    meta: {
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/magic',
    component: Layout,
    redirect: '/magic/sell',
    alwaysShow: false, // will always show the root menu
    meta: {
      roles: ['admin', 'editor', 'magic'],
      title: '魔方',
      icon: 'list',
      noCache: false,
      breadcrumb: false,
      keepAlive: true
    },
    children: [
      {
        path: 'activity',
        component: () => import('@/views/magic/activity/summary'),
        name: '活动',
        redirect: '/magic/activity/summary',
        meta: {
          roles: ['admin', 'editor', 'magic'],
          title: '活动',
          icon: 'list',
          noCache: false,
          breadcrumb: false,
          keepAlive: true
        },
        children: [
          {
            path: '活动概览',
            component: () => import('@/views/magic/activity/summary'),
            name: '活动概览',
            meta: { title: '活动概览', noCache: false, roles: ['admin', 'editor', 'magic'] }
          }
        ]
      },
      {
        path: 'sale',
        component: () => import('@/views/magic/sale/index'), // Parent router-view
        name: '销量',
        redirect: '/magic/sale/categoryByMonth',
        meta: {
          roles: ['admin', 'editor', 'magic'],
          title: '销量',
          icon: 'list',
          noCache: false,
          breadcrumb: false,
          keepAlive: true
        },
        children: [
          {
            path: 'categoryByMonth',
            component: () => import('@/views/magic/sale/categoryByMonth'),
            name: '分类销售额',
            meta: { title: '分类销售额', noCache: false, roles: ['admin', 'editor', 'magic'] }
          },
          {
            path: 'categorySaleBySunburst',
            component: () => import('@/views/magic/sale/categorySaleBySunburst'),
            name: '饼图分类销售额',
            meta: { title: '饼图分类销售额', noCache: false, roles: ['admin', 'editor', 'magic'] }
          },
          {
            path: '指标概览',
            component: () => import('@/views/magic/sale/summary'),
            name: '指标概览',
            meta: { title: '指标概览', noCache: false, roles: ['admin', 'editor', 'magic'] }
          },
          {
            path: 'categoryByMonthDifference',
            component: () => import('@/views/magic/sale/categoryByMonthDifference'),
            name: '分类增长曲线',
            meta: { title: '分类增长曲线', noCache: false, roles: ['admin', 'editor', 'magic'] }
          },
          {
            path: 'userSale',
            component: () => import('@/views/magic/sale/userSale'),
            name: '用户销售额',
            meta: { title: '用户销售额', noCache: false, roles: ['admin', 'editor', 'magic'] }
          },
          {
            path: 'brandSale',
            component: () => import('@/views/magic/sale/brandSale'),
            name: '品牌排名',
            meta: { title: '品牌排名', noCache: false, roles: ['admin', 'editor', 'magic'] }
          },
          {
            path: 'brandProductSale',
            component: () => import('@/views/magic/sale/brandProductSale'),
            name: '品牌下销量排名',
            meta: { title: '品牌下销量排名', noCache: false, roles: ['admin', 'editor', 'magic'] }
          },
          {
            path: 'ProductCategorySaleStatics',
            component: () => import('@/views/magic/sale/ProductCategorySaleStatics'),
            name: '分类下销量排名',
            meta: { title: '分类下销量排名', noCache: false, roles: ['admin', 'editor', 'magic'] }
          },
          {
            path: 'ProductSaleStatics',
            component: () => import('@/views/magic/sale/ProductSaleStatics'),
            name: '产品销量排名',
            meta: { title: '产品销量排名', noCache: false, roles: ['admin', 'editor', 'magic'] }
          }
        ]
      },
      {
        path: 'sell',
        component: () => import('@/views/magic/sell'),
        name: '单日销售统计',
        meta: { title: '单日销售统计', noCache: false, roles: ['admin', 'editor', 'magic'] }
      },
      {
        path: 'sellByWeek',
        component: () => import('@/views/magic/sellByWeek'),
        name: '每周销售统计',
        meta: { title: '每周销售统计', noCache: false, roles: ['admin', 'editor', 'magic'] }
      },
      {
        path: 'purchase',
        component: () => import('@/views/magic/purchase'),
        name: '单日采购统计',
        meta: { title: '单日采购统计', icon: '', noCache: false, roles: ['admin', 'editor', 'magic'] }
      },
      {
        path: 'brand',
        component: () => import('@/views/magic/brand'),
        name: '分类品牌统计',
        meta: { title: '分类品牌统计', icon: '', noCache: false }
      },
      {
        path: 'productSell',
        component: () => import('@/views/magic/productSell'),
        name: '产品销量统计',
        meta: { title: '产品销量统计', icon: '', noCache: false }
      },
      {
        path: 'priceChange',
        component: () => import('@/views/magic/priceChange'),
        name: '价格变动',
        meta: { title: '价格变动', icon: '', noCache: true }
      },
      {
        path: 'priceRelated',
        component: () => import('@/views/magic/priceRelated'),
        name: '价格比对',
        meta: { title: '价格比对', icon: '', noCache: true }
      },
      {
        path: 'priceTrend',
        component: () => import('@/views/magic/priceTrend'),
        name: '销量历史趋势',
        meta: { title: '销量历史趋势', icon: '', noCache: true }
      },
      {
        path: 'soso',
        component: () => import('@/views/magic/soso'),
        name: '随性搜',
        meta: { title: '搜(实验室)', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/related',
    component: Layout,
    name: '数据关联品台',
    meta: {
      roles: ['admin', 'editor', 'magic'], // you can set roles in root nav
      title: '数据关联品台',
      icon: 'peoples'
    },
    children: [
      {
        path: 'brandRelate',
        component: () => import('@/views/relate/brandRelate'),
        name: '品牌关联',
        meta: { title: '品牌关联', icon: 'icon', noCache: true }
      },
      {
        path: 'productRelate',
        component: () => import('@/views/relate/productRelate'),
        name: '产品关联',
        meta: { title: '产品关联', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: false, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    meta: {
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/svg-icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      roles: ['admin', 'editor'], // you can set roles in root nav
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    name: 'tab',
    meta: {
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'mergeHeader' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: {
      title: 'zip', icon: 'zip',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    meta: {
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'pdf', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      roles: ['admin', 'editor', 'magic'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/i18n',
    component: Layout,
    meta: {
      roles: ['admin', 'editor', 'magic'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n-demo/index'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    meta: {
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
