<template>
  <div>
    <m-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px">
      <m-form-item
        prop="email"
        label="邮箱"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
        ]"
      >
        <m-input v-model="dynamicValidateForm.email" class="input-99"></m-input>
      </m-form-item>
      <div
        v-for="(item, index) in dynamicValidateForm.domains"
        :key="index"
        class="input-form"
      >
        <m-form-item
          :prop="'domains.' + index + '.value'"
          :label="'邮箱' + index"
          :rules="checkEmail"
          class="input-half"
        >
          <m-input v-model="item.value" placeholder="请输入邮箱">
            <m-button slot="append" @click.prevent="removeDomain(item)">删除</m-button>
          </m-input>
        </m-form-item>
        <m-form-item
          :prop="'domains.' + index + '.key'"
          :label="'邮箱' + index"
          :rules="checkEmail"
          class="input-half"
        >
          <m-input v-model="item.key">
            <m-button slot="append" @click.prevent="removeDomain(item)">删除</m-button>
          </m-input>
        </m-form-item>
      </div>
      <div class="input-form">
        <m-form-item class="input-form pull-left">
          <m-button type="primary" @click="submitForm('dynamicValidateForm')"
            >提交</m-button
          >
          <m-button @click="addDomain">新增邮箱</m-button>
          <m-button @click="resetForm('dynamicValidateForm')">重置</m-button>
        </m-form-item>
      </div>
    </m-form>
  </div>
</template>

<script>
export default {
  data() {
    var isEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱地址"));
      } else {
        if (value !== "") {
          const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!reg.test(value)) {
            callback(new Error("请输入有效的邮箱"));
          }
        }
        callback();
      }
    };
    return {
      visible: false,
      dynamicValidateForm: {
        domains: [
          {
            key: "",
            value: "",
          },
        ],
      },
      checkEmail: [
        {
          required: true,
          validator: isEmail,
          trigger: "blur",
        },
      ],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({ value: "", key: "" });
    },
  },
};
</script>

<style>
.input-99 {
  width: 99%;
  float: left;
  margin-right: 1%;
}
.input-half {
  width: 48%;
  float: left;
  margin-right: 0;
}
.input-form {
  width: 100%;
}
.pull-left {
  float: left;
}
</style>
