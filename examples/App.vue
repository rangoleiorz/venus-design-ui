<template>
  <div style="padding: 20px">
    <a-modal-container />
    <h1>1111</h1>
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="Password" prop="pass">
        <a-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Confirm" prop="checkPass">
        <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Age" prop="age">
        <a-input v-model.number="ruleForm.age" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('ruleForm')">
          Submit
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
          Reset
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-drawer :visible="visible">
      <template #title>
        我在测试1111
      </template>
      <h1>啊哈哈哈</h1>
      <h1>啊哈哈哈</h1>
      <h1>啊哈哈哈</h1>
      <h1>啊哈哈哈</h1>
      <h1>啊哈哈哈</h1>
      <h1>啊哈哈哈</h1>
      <h1>啊哈哈哈</h1>
      <h1>啊哈哈哈</h1>
      <h1>啊哈哈哈</h1>
      <h1>啊哈哈哈</h1>
      <h1>啊哈哈哈</h1>
      <h1>啊哈哈哈</h1>
      <h1>啊哈哈哈</h1>
      <h1>啊哈哈哈</h1>
      <h1>啊哈哈哈</h1>
      <h1>啊哈哈哈</h1>
      <h1>啊哈哈哈</h1>
      <h1>啊哈哈哈</h1>
      <h1>啊哈哈哈</h1>
      <template #footer>
        <a-button>确认</a-button><a-button>取消</a-button>
      </template>
    </a-drawer>

    <a-button @click="visible = true">
      open dialog
    </a-button>
    <!-- <a-card
      title="测试"
      :tab-props="{ size: 'small' }"
      :tab-list="[
        { key: 'tab1', tab: 'tab1' },
        { key: 'tab2', tab: 'tab2' },
      ]"
    />
    <a-card
      title="测试"
      :tab-props="{ size: 'large' }"
      :tab-list="[
        { key: 'tab1', tab: 'tab1' },
        { key: 'tab2', tab: 'tab2' },
      ]"
    />
    <a-card
      title="测试"
      :tab-props="{}"
      :tab-list="[
        { key: 'tab1', tab: 'tab1' },
        { key: 'tab2', tab: 'tab2' },
      ]"
    />
    <a-card
      title="测试"
      :tab-props="{ size: 'default' }"
      :tab-list="[
        { key: 'tab1', tab: 'tab1' },
        { key: 'tab2', tab: 'tab2' },
      ]"
    /> -->
    <a-table row-key="id" :columns="columns" :data-source="dataSource" />
  </div>
</template>
<script>
import { Modal } from 'ant-design-vue';

const modalKey = Modal.getKey();
// console.log('Modal', modalKey);
export default {
  data() {
    let checkPending;
    let checkAge = (rule, value, callback) => {
      clearTimeout(checkPending);
      if (!value) {
        return callback(new Error('Please input the age'));
      }
      checkPending = setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please input digits'));
        } else {
          if (value < 18) {
            callback(new Error('Age must be greater than 18'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      dataSource: [
        {
          id: 1,
          name: '0',
          name1: '1',
          name2: '2',
          name3: '3',
        },
        {
          id: 2,
          name: '20',
          name1: '21',
          name2: '22',
          name3: '23',
        },
      ],
      ruleForm: {
        pass: '',
        checkPass: '',
        age: '',
      },
      rules: {
        pass: [{ validator: validatePass }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        age: [{ validator: checkAge, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  computed: {
    columns() {
      return [
        {
          dataIndex: 'name',
          title: '姓名',
        },
        {
          dataIndex: 'name1',
          title: '姓名1',
        },
        {
          dataIndex: 'name2',
          title: '姓名2',
        },
        {
          dataIndex: 'name3',
          title: '姓名3',
        },
      ];
    },
  },
  methods: {
    submitForm() {
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     alert('submit!');
      //   } else {
      //     // eslint-disable-next-line no-console
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });

      const modal = Modal.open({
        key: modalKey,
        drawer: false,
        // closable: true,
        maskClosable: true,
        title: '提示',
        okText: '保存',
        children(h) {
          return h('div', {}, '1234');
        },
        footer: null,
        // footer(h, { okBtn }) {
        //   return [okBtn, h('a-button', {props: { loading: true }}, '审批')];
        // },
        onOk: () => {
          // modal.update({
          //   footer(h, { okBtn }) {
          //     return [okBtn, h('a-button', {props: { loading: false }}, '审批')];
          //   },
          // });
          return new Promise((r) => {
            setTimeout(() => {
              // eslint-disable-next-line no-console
              // console.log('ok wait');
              r(true);
            }, 10000);
          });
        },
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
