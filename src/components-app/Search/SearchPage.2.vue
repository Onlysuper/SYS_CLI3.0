<template>
  <full-page class="page">
    <mt-header slot="header" :title="title+'查询'" class="re-mint-header">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" size="small" type="danger" @click="queryResult">查询</mt-button>
    </mt-header>
    <div class="search-component">
      <view-radius>
        <input-wrapper>
          <component class="border-bottom-1px" ref="configDate" :is="item.type" :config="item" v-for="(item,index) in config" @openPicker="openPicker" @showDate="showDate" @showDateTime="showDateTime" :key="index"></component>
        </input-wrapper>
      </view-radius>
      <br>
      <!-- <mt-button class="okBtn" size="large" :disabled="false" @click="queryResult">查询</mt-button> -->
      <!-- <br> -->
    </div>
    <mt-datetime-picker type="date" v-model="currentDate" @confirm="setDate" ref="datePicker" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>
    <!-- <mt-datetime-picker v-model="currentDate" @confirm="setDate" ref="datePicker" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker> -->
    <mt-datetime-picker type="datetime" v-model="currentDate" @confirm="setDateTime" ref="dateTimePicker"></mt-datetime-picker>

  </full-page>
</template>

<script>
import Vue from "vue";
import utils from "@src/common/utils";
import Picker from "../SelectPicker/Picker";
import { Field } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';
import { Cell, Checklist, Radio } from 'mint-ui';
const MypDate = Vue.extend({
  name: "myp-date",
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      value: this.config.defaultValue
    };
  },
  watch: {
    value(val) {
      this.config.cb && this.config.cb(val);
    }
  },
  mounted() {
    // this.config.cb(this.config.defaultValue);
  },
  methods: {
    showDate($this) {
      this.$emit("showDate", this);
    },
    clear() {
      this.value = "";
    }
  },
  render: function (createElement) {
    return createElement('div',
      {

      }, 'hi'
    )
  },
  //   template: `<mt-cell-swipe
  //   is-link
  //               : title = "config.title"
  // @click.native="showDate(this)"
  //               : right = "[
  // {
  //   content: '清空',
  //     style: { background: '#eee', color: '#000' },
  //   handler: this.clear
  // }
  //               ]">
  //   < span style = "color: green" > {{ value }}</span >
  //               </mt - cell - swipe > `
});
const MypDateTime = Vue.extend({
  name: "myp-date-time",
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      value: this.config.defaultValue
    };
  },
  watch: {
    value(val) {
      this.config.cb && this.config.cb(val);
    }
  },
  mounted() {
    // this.config.cb(this.config.defaultValue);
  },
  methods: {
    showDateTime($this) {
      this.$emit("showDateTime", this);
    },
    clear() {
      this.value = "";
    }
  },
  render: function (createElement) {
    var self = this;
    return createElement(Swipe,
      {
        attrs: {
          title: self.config.title,
          right: `[
              {
                    content: '清空',
                    style: { background: '#eee', color: '#000' },
                    handler: this.clear
                  }
                ]`
        },
        on: {
          click: function () {
            showDateTime(self)
          }
        }
      }, createElement(
        'span',
        {
          attrs: {
            style: "color: green"
          }
        },
        value
      )
    )
  }
  //   template: `< mt - cell - swipe
  // is - link
  //               : title = "config.title"
  // @click.native="showDateTime(this)"
  //               : right = "[
  // {
  //   content: '清空',
  //     style: { background: '#eee', color: '#000' },
  //   handler: this.clear
  // }
  //               ]">
  //   < span style = "color: green" > {{ value }}</span >
  //               </mt - cell - swipe > `
});
const MypText = Vue.extend({
  name: "myp-text",
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      value: this.config.defaultValue
    };
  },
  watch: {
    value(val) {
      this.config.cb && this.config.cb(val);
    }
  },
  computed: {
    placeholdtext() {
      return this.config.placeholder ? this.config.placeholder : this.config.title
    }
  },
  render: function (createElement) {
    let self = this;
    return createElement(Field,
      {
        attrs: {
          label: self.config.title,
          placeholder: '请输入' + self.placeholdtext,
          ref: 'inputBox',
          value: self.value
        },
        on: {
          change: function (event) {
            self.value = event.target.value;
          }
        }
      }, ''
    )
  }
});
const MypChekList = Vue.extend({
  name: "myp-chek-list",
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      value: []
    };
  },
  watch: {
    value(val) {
      this.config.cb && this.config.cb(val);
    }
  },
  render: function (createElement) {
    return createElement(div, {},
      createElement(Cell,
        {
          attrs: {
            title: self.config.title,
            class: "border-1px",
          },
        }, createElement(
          Checklist,
          {
            attrs: {
              class: "myp-chek-list border-1px",
              options: self.config.options,
              value: self.value
            },
          }
        )
      ))
  }
  // template: `< div > <mt-cell : title="config.title" class="border-1px"></mt-cell> < mt - checklist class= "myp-chek-list border-1px" v-model="value": options = "config.options" ></mt-checklist ></div > `
});
const MypRadioList = Vue.extend({
  name: "myp-radio-list",
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      value: this.config.defaultValue
    };
  },
  mounted() {
    // this.config.cb(this.config.defaultValue);
  },
  watch: {
    value(val) {
      this.config.cb && this.config.cb(val);
    }
  },
  render: function (createElement) {
    return createElement('div',
      {

      }, createElement(
        Cell, {
          attrs: {
            title: self.config.title,
            class: "border-1px",
          },
        },
        createElement(Radio, {
          attrs: {
            options: self.config.options,
            class: "myp-radio border-1px",
          }
        }, )
      )
    )
  }
  // template: `< div > <mt-cell v-if="config.title" : title="config.title" class="border-1px"></mt-cell>
  // < mt - radio class= "myp-radio border-1px" v-model="value": options = "config.options" ></mt-radio ></div > `
});
const MypSelect = Vue.extend({
  components: { Picker },
  name: "myp-select",
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      value: this.config.values.find(item => item.code == this.config.defaultValue) || {}
    };
  },
  methods: {
    confirm(val) {
      this.value = val;
      this.config.cb && this.config.cb(val.code);
    },
    clickHandle(e) {
      // e.stopPropagation() // 阻止事件冒泡 等价于 click.stop
      console.log('点击组件的button，将会通过emit触发外部的自定义事件')
    }

  },
  render: function (createElement) {
    let self = this;
    //     createElement(Picker, {
    //   attrs: {
    //     ref: 'Picker',
    //     value: self.value,
    //     slotsActions: self.config.values
    //   },
    //   on: {
    //     confirm: function () {
    //       self.confirm
    //     }
    //   }
    // })
    return createElement(
      'div',
      {
        on: {
          click: () => {

            // self.$refs.Picker.open()
          }
        }
      },
      [
        createElement(
          Field,
          {
            attrs: {
              label: self.config.title,
              placeholder: '请选择' + self.config.title,
              value: self.value.name,
              disableClear: true,
              readonly: true,
            },
            nativeOn: {
              click: function () {
                console.log(self);
                // console.log(this);
                // console.log(this.$children)
                // self.$refs.Picker.open
              }
            }
          },
          ''
        ),
        createElement(
          "i", {
            attrs: {
              class: 'icon-arrow'
            }
          }
        ),
        createElement(Picker, {
          attrs: {
            ref: 'Picker',
            value: self.value,
            slotsActions: self.config.values
          },
          on: {
            confirm: function () {
              self.confirm
            }
          }
        }),

      ]
    )
  },
  // template: `
  // < div >
  // <mt-field @click.native="$refs.Picker.open" v - model="value.name" : label = "config.title" v - readonly - ios : disableClear = "true" : readonly = "true" : placeholder = "'请选择'+config.title" > <i class="icon-arrow"></i></mt - field >
  //   <picker v-model="value" ref="Picker" : slotsActions="config.values" @confirm="confirm" ></picker >
  //   </div > `
});

export default {
  components: {
    MypText,
    MypDate,
    MypDateTime,
    MypChekList,
    MypRadioList,
    MypSelect
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "搜索"
    },
    config: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      dateVisible: false,
      pickerVisible: false,
      keyVal: "",
      query: {},
      // 年月日日期选择器
      currentDate: new Date(),
      currentDateObject: null,
      // 带时分秒日期选择器
      currentDateTime: new Date(),
      currentDateTimeObject: null,
      slots: []
    };
  },
  watch: {
    title(val) {
      this.title = val;
    },
    dateVisible(val) {
      console.log("val", val);
    }
  },
  created() { },
  methods: {
    queryResult() {
      this.$emit("result", this.keyVal);
    },
    showDate($this) {
      this.currentDateObject = $this;
      if ($this.value) {
        this.currentDate = new Date($this.value);
      }
      this.$refs.datePicker.open();
    },
    showDateTime($this) {
      this.currentDateObject = $this;
      if ($this.value) {
        this.currentDate = new Date($this.value);
      }
      this.$refs.dateTimePicker.open();
    },
    setDate(date) {
      this.currentDateObject.value = utils.formatDate(date, "yyyy-MM-dd");
    },
    setDateTime(date) {
      console.log(date);
      this.currentDateObject.value = utils.formatDate(date, "yyyy-MM-dd hh:mm:ss");
      console.log(utils.formatDate(date, "yyyy-MM-dd hh:mm:ss"));
    },
    openPicker(slots, context) {
      this.pickerContext = context;
      this.pickerVisible = true;

      this.slots = slots;
    },
    pickerValuesChange(picker, values) {
      console.log(values[0]);
      this.pickerContext && (this.pickerContext.value = values[0]);
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/scss/base.scss";
.search-component {
  width: 100%;
  min-height: 100%;
  // margin-top: 20*$rem;
  padding: 30 * $rem 20 * $rem;
  box-sizing: border-box;
  background-color: #fff;
  .input-box {
    border: 1px solid #eee;
    .input-wrapper {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      i {
        padding-left: 10px;
      }
      .mint-field {
        width: 100%;
        background: none;
      }
    }
  }
  .mintui-search {
    color: #ccc;
  }
  //公共
  .item {
    margin-top: 30 * $rem;
  }
  .public-title {
    line-height: 100 * $rem;
  }
  .myp-radio,
  .myp-chek-list {
    display: flex;
    flex-wrap: wrap;
    padding: 1px;
    .mint-cell {
      background-image: none;
      background-color: #fcfcfc;
      width: 33.333%;
    }
    .mint-radiolist-label,
    .mint-checklist-label {
      padding: 0;
    }
    .mint-radiolist-title,
    .mint-checklist-title {
      margin: 0;
    }
    .mint-cell-wrapper {
      padding: 5px;
    }
  }
}
.picker-items {
  .picker-slot:first-of-type {
    flex-grow: 1.5 !important;
  }
}
</style>
