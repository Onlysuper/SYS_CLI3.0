import loading from "@src/router/loading"
/**
 * 授权码审核
 */
export default [
  // "交易订单查询"
  {
    name: 'mer_trading_orders',
    path: '/mer_trading_orders',
    meta: {
      title: '线上交易订单查询',
      keepAlive: true,
      requiresAuth: true,
      parent: "",
      parentname: "线上管理",
      role: ['root', 'admin']
    },
    component: r => {
      return require.ensure([], () => { return r(require("@src/views/merchants/mctTradingOrders")) }, "mct-trading-orders")
    }
  },
  {
    name: 'mer_pool_orders',
    path: '/mer_pool_orders',
    meta: {
      title: '商户池',
      keepAlive: true,
      requiresAuth: true,
      parent: "",
      parentname: "线上管理",
      role: ['root']
    },
    component: r => {
      return require.ensure([], () => { return r(require("@src/views/merchants/mctPoolOrders")) }, "mer_pool_orders")
    }
  },
  {
    name: 'mer_payfor_orders',
    path: '/mer_payfor_orders',
    meta: {
      title: '线上代付订单查询',
      keepAlive: true,
      requiresAuth: true,
      parent: "",
      parentname: "线上管理",
      role: ['root', 'admin']
    },
    component: r => {
      return require.ensure([], () => { return r(require("@src/views/merchants/mctPayforOrders")) }, "mct-payfor-orders")

    }
  },
  {
    name: 'mer_manage_orders',
    path: '/mer_manage_orders',
    meta: {
      title: '线上商户查询',
      keepAlive: true,
      requiresAuth: true,
      parent: "",
      parentname: "线上管理",
      role: ['root', 'admin']
    },
    component: r => {
      return require.ensure([], () => { return r(require("@src/views/merchants/mctManageOrders/index")) }, "mer_manage_orders")
    }
  },
  {
    name: 'online_facilitator_orders',
    path: '/online_facilitator_orders',
    meta: {
      title: '线上服务商查询',
      keepAlive: true,
      requiresAuth: true,
      parent: "",
      parentname: "线上管理",
      role: ['root', 'admin']
    },
    component: r => {
      return require.ensure([], () => { return r(require("@src/views/merchants/onlineFacilitatorOrders")) }, "online_facilitator_orders")
    }
  },
  {
    name: 'mct_quotas_orders',
    path: '/mct_quotas_orders',
    meta: {
      title: '商户限额管理',
      keepAlive: true,
      requiresAuth: true,
      parent: "",
      parentname: "线上管理",
      role: ['root']
    },
    component: r => {
      return require.ensure([], () => { return r(require("@src/views/merchants/mctQuotaOrders")) }, "mct_quotas_orders")
    }
  },
  {
    name: 'mer_extend_config',
    path: '/mer_extend_config',
    meta: {
      title: '商户扩展配置',
      keepAlive: true,
      requiresAuth: true,
      parent: "",
      parentname: "线上管理",
      role: ['root']
    },
    component: r => {
      return require.ensure([], () => { return r(require("@src/views/merchants/merExtendConfig")) }, "mer_extend_config")
    }
  },
  {
    name: 'mer_balance_orders',
    path: '/mer_balance_orders',
    meta: {
      title: '账户余额查询',
      keepAlive: true,
      requiresAuth: true,
      parent: "",
      parentname: "线上管理",
      role: ['root']
    },
    component: r => {
      return require.ensure([], () => { return r(require("@src/views/merchants/mctBalanceOrders")) }, "mer_balance_orders")
    }
  }
]