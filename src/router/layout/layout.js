import loading from "../loading";
import companyFn from "@src/common/company.js";
/**
 * 登录模块
 */
export default {
  name: "layout",
  path: "/layout",
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/layout/layout")) }, "layout")
  },
  meta: {
    pageTitle: companyFn.companyGet().name
  }
}

