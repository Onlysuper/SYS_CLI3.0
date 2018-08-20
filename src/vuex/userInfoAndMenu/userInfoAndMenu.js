import { MenuGet, UserGet } from "@src/apis"
import { Toast } from "mint-ui";
const userInfoAndMenu = {
    state: {
        userMessage: { // 管理员信息
            all: "",
            realname: "",
            username: "",
            userBussinessNo: "",
            userType: "",
        },
        isAdmin: false,

        isOperate: false,
        isBranchOffice: false,
        isOnlyAgent: false,
        isCustomer: false,
        isZf1500: false,
        menuList: [], // 菜单列表信息
        menuListApp: [], // 菜单列表信息-移动端用
        isCollapse: false,//菜单收起
    },
    getters: {
    },
    mutations: {
        SidebarHandle(state) { //菜单收起展开操作
            state.isCollapse = !state.isCollapse
        },
        modifyData(state, data) { // 接受后台接口数据并传给state
            var data = data.data;
            state.userMessage.realname = data.realname //管理员名称
            state.userMessage.username = data.username // 登录账号
            state.userMessage.bussinessNo = data.bussinessNo // 登录账号
            state.userMessage.resetPasswordStatus = data.resetPasswordStatus // 登录账号
            state.menuList = data.menuList
        },
        // 登陆用户信息
        userData(state, data) {
            var data = data.data;
            state.userMessage.all = data;
            // 是否为中付商户
            if (data.userRoles.find(item => /zfCustomer/ig.test(item))) {
                state.isCustomer = true
            } else {
                state.isCustomer = false
            }
            // 是否为中付商户zf1500
            if (data.userRoles.find(item => /zf1500/ig.test(item))) {
                state.isZf1500 = true
            } else {
                state.isZf1500 = false
            }
            //判断是不是运营
            if (data.userType == "admin" || data.userType == "root") {
                state.isAdmin = true;
            } else {
                state.isAdmin = false;
            }
            if (data.userType == "admin" || data.userType == "root" || data.userType == "operator") {
                state.isOperate = true
            } else {
                state.isOperate = false;
            }
            // 服务商
            if (data.userType == "agent" || data.userType == "secondAgent" || data.userType == "openPaltAgent") {
                state.isOnlyAgent = true
            } else {
                state.isOnlyAgent = false;
            }

            if (data.userType == "admin" || data.userType == "root" || data.userType == "branchOffice") {
                state.isBranchOffice = true;
            } else {
                state.isBranchOffice = false;
            }
        },
        clearMenuList(state) { // 清空左侧菜单
            state.menuList = []
        },
        //移动端使用的路由
        asyncNewRoutes(state, asyncNewRoutes) {
            state.menuListApp = asyncNewRoutes || [];
        },
        //移动端路由对应的菜单
        setMenuList(state, menuList) {
            state.menuList = menuList;
        }
    },
    actions: {
        UserMenulistFetch(context) { // 获取‘用户信息‘与‘菜单列表‘数据
            return new Promise((resolve, reject) => {
                MenuGet()({}).then(function (res) {
                    if (res.code === "00") {
                        context.commit('modifyData', res);
                        resolve(res.data);
                    } else {
                        reject({})
                    }
                })
            })
            // .catch(() => {
            //     console.log("UserMenulistFetch--UnhandledPromiseRejectionWarning")
            // });
        },
        UserGetFetch(context) { // 获取用户按钮权限数据信息
            return new Promise((resolve, reject) => {
                UserGet()({}).then((data) => {
                    if (data.code === "00") {
                        // 管理员信息
                        context.commit('userData', data);
                        resolve("success")
                    }
                    else {
                        reject("error");
                    }
                });
            })
            // .catch(() => {
            //     console.log("UserMenulistFetch--UnhandledPromiseRejectionWarning")
            // });
        }
    },
    modules: {
    }
};

export default userInfoAndMenu
