
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";

export default {
  name: "online_merchants",
  path: "/",
  component: keepAlive,
  redirect: () => "mer_trading_orders",
  children: [
    {
      name: "mer_trading_orders",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "mer_trading_orders",
      redirect: "mer_trading_orders/index",
      component: App,
      children: [
        {
          path: 'index',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctTradingOrders")) }, "mct-trading-orders-app")
          },
          meta: {
            pageTitle: "交易订单",
            keepAlive: true,
            menuCode: "mer_trading_orders",
          }
        },
        {
          path: 'detail/:customerNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctTradingOrders/detail")) }, "mct-trading-orders-app")
          },
          meta: {
            pageTitle: "交易订单",
          }
        },
        {
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctTradingOrders/search")) }, "mct-trading-orders-app")
          },
          meta: {
            pageTitle: "交易订单",
          }
        }
      ]
    },
    {
      name: "mer_payfor_orders",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "mer_payfor_orders",
      redirect: "mer_payfor_orders/index",
      component: App,
      children: [
        {
          path: 'index',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctPayforOrders")) }, "mct-payfor-orders-app")
          },
          meta: {
            pageTitle: "代付订单",
            keepAlive: true,
            menuCode: "mer_payfor_orders",
          }
        },
        {
          path: 'detail/:customerNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctPayforOrders/detail")) }, "mct-payfor-orders-app")
          },
          meta: {
            pageTitle: "代付订单",
          }
        },
        {
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctPayforOrders/search")) }, "mct-payfor-orders-app")
          },
          meta: {
            pageTitle: "代付订单查询",
          }
        }
      ]
    },
    {
      name: "mer_manage_orders",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "mer_manage_orders",
      redirect: "mer_manage_orders/index",
      component: App,
      children: [
        {
          path: 'index',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctManageOrders")) }, "mct-manage-orders-app")
          },
          meta: {
            pageTitle: "线上商户",
            keepAlive: true,
            menuCode: "mer_manage_orders",
          }
        },
        {
          path: 'add',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctManageOrders/add")) }, "mct-manage-orders-app")
          },
          meta: {
            pageTitle: "新增",
          }
        },
        {
          path: 'detail/:customerNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctManageOrders/detail")) }, "mct-manage-orders-app")
          },
          meta: {
            pageTitle: "线上商户",
          }
        },
        {
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctManageOrders/search")) }, "mct-manage-orders-app")
          },
          meta: {
            pageTitle: "线上商户",
          }
        }
      ]
    },
    {
      name: "mer_balance_orders",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "mer_balance_orders",
      redirect: "mer_balance_orders/index",
      component: App,
      children: [
        {
          path: 'index',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctBalanceOrders")) }, "mer_balance_orders-app")
          },
          meta: {
            pageTitle: "线上商户",
            keepAlive: true,
            menuCode: "mer_balance_orders",
          }
        },
        {
          path: 'add',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctBalanceOrders/add")) }, "mer_balance_orders-app")
          },
          meta: {
            pageTitle: "新增",
          }
        },
        {
          path: 'detail/:customerNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctBalanceOrders/detail")) }, "mer_balance_orders-app")
          },
          meta: {
            pageTitle: "线上商户",
          }
        },
        {
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctBalanceOrders/search")) }, "mer_balance_orders-app")
          },
          meta: {
            pageTitle: "线上商户",
          }
        }
      ]
    },
    {
      name: "mer_pool_orders",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "mer_pool_orders",
      redirect: "mer_pool_orders/index",
      component: App,
      children: [
        {
          path: 'index',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctPoolOrders")) }, "mer_pool_orders-app")
          },
          meta: {
            pageTitle: "线上商户",
            keepAlive: true,
            menuCode: "mer_pool_orders",
          }
        },
        {
          path: 'add',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctPoolOrders/add")) }, "mer_pool_orders-app")
          },
          meta: {
            pageTitle: "新增",
          }
        },
        {
          path: 'batchupdate',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctPoolOrders/batchupdate")) }, "mer_pool_orders-app")
          },
          meta: {
            pageTitle: "批量修改",
          }
        },
        {
          path: 'edit/:customerNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctPoolOrders/add")) }, "mer_pool_orders-app")
          },
          meta: {
            pageTitle: "商户限额管理编辑",
          }
        },
        {
          path: 'detail/:customerNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctPoolOrders/detail")) }, "mer_pool_orders-app")
          },
          meta: {
            pageTitle: "线上商户",
          }
        },
        {
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctPoolOrders/search")) }, "mer_pool_orders-app")
          },
          meta: {
            pageTitle: "线上商户",
          }
        }
      ]
    },
    {
      name: "online_facilitator_orders",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "online_facilitator_orders",
      redirect: "online_facilitator_orders/index",
      component: App,
      children: [
        {
          path: 'index',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/onlineFacilitatorOrders")) }, "online-facilitator-orders-app")
          },
          meta: {
            pageTitle: "服务商",
            keepAlive: true,
            menuCode: "online_facilitator_orders",
          }
        },
        {
          path: 'edit/:agentNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/onlineFacilitatorOrders/edit")) }, "online-facilitator-orders-app")
          },
          meta: {
            pageTitle: "编辑",
          }
        },
        {
          path: 'add',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/onlineFacilitatorOrders/edit")) }, "online-facilitator-orders-app")
          },
          meta: {
            pageTitle: "新增",
          }
        },
        {
          path: 'detail/:agentNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/onlineFacilitatorOrders/detail")) }, "online-facilitator-orders-app")
          },
          meta: {
            pageTitle: "服务商",
          }
        },
        {
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/onlineFacilitatorOrders/search")) }, "online-facilitator-orders-app")
          },
          meta: {
            pageTitle: "服务商",
          }
        }
      ]
    },
    {
      name: "mct_quotas_orders",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "mct_quotas_orders",
      redirect: "mct_quotas_orders/index",
      component: App,
      children: [
        {
          path: 'index',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctQuotaOrders")) }, "mct_quotas_orders-app")
          },
          meta: {
            pageTitle: "商户限额管理",
            keepAlive: true,
            menuCode: "mct_quotas_orders",
          }
        },
        {
          path: 'detail/:customerNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctQuotaOrders/detail")) }, "mct_quotas_orders-app")
          },
          meta: {
            pageTitle: "商户限额管理详情",
          }
        },
        {
          path: 'edit/:customerNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctQuotaOrders/edit")) }, "mct_quotas_orders-app")
          },
          meta: {
            pageTitle: "商户限额管理编辑",
          }
        },
        {
          path: 'add',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctQuotaOrders/edit")) }, "mct_quotas_orders-app")
          },
          meta: {
            pageTitle: "商户限额管理新增",
          }
        },
        {
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/mctQuotaOrders/search")) }, "mct_quotas_orders-app")
          },
          meta: {
            pageTitle: "商户限额管理",
          }
        }
      ]
    },
    {
      name: "mer_extend_config",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "mer_extend_config",
      redirect: "mer_extend_config/index",
      component: App,
      children: [
        {
          path: 'index',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/merExtendConfig")) }, "mer_extend_config-app")
          },
          meta: {
            pageTitle: "商户扩展配置",
            keepAlive: true,
            menuCode: "mer_extend_config",
          }
        },
        {
          path: 'detail/:customerNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/merExtendConfig/detail")) }, "mer_extend_config-app")
          },
          meta: {
            pageTitle: "详情",
          }
        },
        {
          path: 'edit/:customerNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/merExtendConfig/edit")) }, "mer_extend_config-app")
          },
          meta: {
            pageTitle: "编辑",
          }
        },
        {
          path: 'add',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/merExtendConfig/edit")) }, "mer_extend_config-app")
          },
          meta: {
            pageTitle: "新增",
          }
        },
        {
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/merchants/merExtendConfig/search")) }, "mer_extend_config-app")
          },
          meta: {
            pageTitle: "搜索",
          }
        }
      ]
    }
  ]
}