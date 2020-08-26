<style  scoped>
.main {
  background-color: transparent;
}
.ip_name {
  position: relative;
  top: 1.5rem;
  left: 1rem;
}
.item {
  font-size: 1rem;
  font-family: "PingFang";
  color: rgba(35, 35, 35, 1);
  margin-bottom: 1rem;
}
.ip_button {
  position: relative;
}
.el-form-item {
  font-family: "PingFang";
  font-size: 1rem;
}
.footer {
  text-align: center;
  margin: 4rem 0 3rem 0;
}
</style>
<template>
  <div class="main">
    <div class="ip_name">
      <div class="item">
        <span>IP区间：</span>
        <span class="ip_button">
          <el-button round size="mini" @click="addIprangeList">添加IP区间</el-button>
        </span>
      </div>
      <el-form ref="idRangeForm" :model="org_params" :inline="true" label-width="90px">
        <el-form-item
          v-for="(item, index) in org_params.ipRangeList"
          :key="index"
          label-width="90px"
          :prop="'ipRangeList.' + index + '.ipRange'"
          :rules="{require: true, validator: checkIpRange, trigger: 'blur'}"
        >
          <el-input v-model="item.ipRange" style="width:23rem;">
            <i slot="suffix" class="el-icon-close" @click="deleteIPrangeList(item, index)" />
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button type="primary" round @click="savaIp">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      org_params: {
        ipRangeList: [],
      },
    };
  },
  methods: {
    checkIp(rule, value, callback) {
      let reg = /^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-4][0-9])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/;
      let re = new RegExp(reg);
      if (re.test(value)) {
        callback();
      } else {
        callback(new Error("请填写正确的IP地址！"));
      }
    },
    checkIpRange(rule, value, callback) {
      let reg = /^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-4][0-9])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/;
      let re = new RegExp(reg);
      if (!value) {
        callback(new Error("请填写IP区间内容！"));
        return;
      }
      let arr = value.split("-");
      if (!re.test(arr[0])) {
        callback(new Error("请填写正确的IP起始地址！"));
        return;
      }
      if (!re.test(arr[1])) {
        callback(new Error("请填写正确的IP结束地址！"));
        return;
      }
      if (arr.length !== 2 || !this.compareIp(arr[0], arr[1])) {
        callback(new Error("请填写正确的IP区间范围！"));
        return;
      }
      callback();
    },
    compareIp(start, end) {
      let status = false;
      let startArr = start.split(".");
      let endArr = end.split(".");
      for (let i = 0; i < startArr.length; i++) {
        const startItem = startArr[i];
        const endItem = endArr[i];
        if (parseInt(endItem) > parseInt(startItem)) {
          status = true;
          break;
        } else if (parseInt(endItem) < parseInt(startItem)) {
          status = false;
          break;
        }
      }
      return status;
    },
    savaIp() {
      this.$refs["idRangeForm"].validate((valid1) => {
        if (valid1) {
          this.$message({
            type: "success",
            message: "修改组织信息成功",
          });
        }
      });
    },
    addIprangeList() {
      this.org_params.ipRangeList.push({
        ipRange: undefined,
      });
    },
    deleteIPrangeList(item, index) {
      this.org_params.ipRangeList.splice(index, 1);
    },
  },
};
</script>
