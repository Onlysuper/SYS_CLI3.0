import { todayStr, yesterdayStr } from "@src/common/dateSerialize";
// 公用table页与search页功能
const mixinDataTable = {
    data() {
        return {
            postPage: 1,
            postLimit: 10,
        }
    },
    methods: {
        /**TABLE页交互 START ************************************************************ */
        showDialog(dialogName) {
            this[dialogName] = true;
        },
        // 重新获取数据
        reloadData(page, limit, search) {
            let page_ = page ? page : this.postPage;
            let limit_ = limit ? limit : this.postLimit;
            this.$refs.dataTable.postDataInit(page_, limit_, this.postSearch);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 普通搜索 具备隐藏
        seachstartHandle() {
            // 开始搜索
            this.reloadData();
        },
        // 重置某输入框
        visiblesomeHandle() {

        },
        callbackformHandle(cb, data1, data2) {
            // 表单双向绑定 得到输入的内容并返回到本页面
            cb(data1, data2);
        },
        resetSearchHandle() {
            // 重置查询表单
            this.searchOptions.searchList.forEach(element => {
                if (element.type == "dateGroup") {
                    element.options[0].value = element.options[0].defaultVlue;
                    element.options[1].value = element.options[1].defaultVlue;
                    this.searchCondition[element.options[0].corresattr] = element.options[0].defaultVlue;
                    this.searchCondition[element.options[1].corresattr] = element.options[1].defaultVlue;
                } else if (element.type == "dateMonth") {
                    element.value = element.defaultVlue;
                    this.searchCondition[element.corresattr] = element.defaultVlue
                } else if (element.type == "dateGroup2") {
                    element.value = [element.defaultVlue[0], element.defaultVlue[1]];
                    this.searchCondition[element.option1] = element.defaultVlue[0];
                    this.searchCondition[element.option2] = element.defaultVlue[1];
                } else if (element.type == "select") {
                    element.value = element.defaultVlue;
                    this.searchCondition[element.corresattr] = element.defaultVlue;
                } else {
                    element.value = element.defaultVlue;
                    this.searchCondition[element.corresattr] = element.defaultVlue;
                }
            });
        },
        resetSomeInputHandle(value) {
            this.searchOptions.searchList.forEach(element => {
                if (element.type == value) {
                    element.value = "";
                    this.searchCondition[element.corresattr] = "";
                }
            });
        },
        pagelimitHandle(value) {
            //每页条数改变
            this.postLimit = value;
        },
        pagecountHandle(value) {
            // 页数改变
            this.postPage = value;
        },
        operationHandle(data, cb) {
            // 操作按钮回调
            cb(data);
        }
        /**END ***********************************************/
    },
    computed: {
        oaIp() {
            // nginx配置的路由
            return this.$store.state.Base.oaIp;
        }
    },
    mounted() {
        // this.$store.commit("initSearchVisibleFn");
    }
}
export {
    mixinDataTable
}