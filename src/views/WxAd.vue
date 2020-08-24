<template>
  <div>
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
      :rules="rules"
    >
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :label="'域名' + index"
        :key="domain.key"
        prop="ip"
      >
        <el-input v-model="domain.value"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="addDomain">新增域名</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var checkIp = (rule, value, callback) => {
      var reg = /^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-4][0-9])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/;
      var re = new RegExp(reg);
      console.log(value)
        for (var i = 0; i < this.dynamicValidateForm.domains.length; i++) {
            console.log(this.dynamicValidateForm.domains[i].value)
          if (
            this.dynamicValidateForm.domains.length > 0 &&
            re.test(this.dynamicValidateForm.domains[i].value) === false
          ) {
            console.log(122);
            callback(new Error("请填写有效的目标地址！"));
            return false;
          } else {
            console.log(133);
            callback();
          }
        }
    };
    return {
      rules: {
        ip: [
          {
            required: true,
            validator: checkIp,
            trigger: "blur",
          },
        ],
      },
      dynamicValidateForm: {
        domains: [
          {
            value: "1",
          },
          {
            value: "1",
          },
          {
            value: "1",
          },
          {
            value: "1",
          },
        ],
      },
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
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now(),
      });
    },
  },
};
</script>