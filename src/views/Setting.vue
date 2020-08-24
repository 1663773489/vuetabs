<template>
  <div class="custom-tree-container">
    <div class="block" style="width:300px">
      <p>使用 scoped slot</p>
      <el-tree :props="defaultProps" node-key="id" :load="loadNode" lazy>
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <i v-if="node.level ===1" class="el-icon-info"></i>
          <i v-if="node.level ===2" class="el-icon-question"></i>

          <!-- 如果是编辑状态 -->
          <template v-if="data.isEdit==1">
            <el-input
              ref="input"
              @blur="() => submitEdit(node,data)"
              v-model="newlabel"
              style="height:20px line-height:20px"
            ></el-input>
          </template>
          <!-- 如果不是编辑状态 -->
          <span v-else v-text="data.name"></span>
          <span>
            <el-button v-if="data.id!=1" type="text" size="mini" @click.stop="() => edit(node,data)">E</el-button>
            <el-button type="text" size="mini" @click.stop="() => append(node,data)">+</el-button>
            <el-button v-if="data.id!=1" type="text" size="mini" @click.stop="() => remove(node, data)">D</el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: "appiumTree1",
  data() {
    return {
      newlabel: "",
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "region" }]);
      }
      if (node.level > 1) return resolve([]);

      setTimeout(() => {
        const data = [
          {
            name: "leaf",
            leaf: true
          },
          {
            name: "zone"
          }
        ];

        resolve(data);
      }, 500);
    },
    append(node, data) {
      console.log(data)
      var timestamp = new Date().getTime();
      const newChild = {
        id: timestamp,
        isEdit: 0,
        name: "T" + timestamp,
        children: []
      };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    edit(node, data) {
      console.log(
        "before:",
        data.id,
        // data.parentApiGroupId,
        data.name,
        data.isEdit
      );
      this.$set(data, "isEdit", 1);
      this.newlabel = data.name;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
      console.log("after:", data.id, data.name, data.isEdit);
    },
    submitEdit(node, data) {
      // console.log('点击了保存按钮')
      if (data.name == this.newlabel) {
        console.log("没有修改");
        this.newlabel = "";
        this.$set(data, "isEdit", 0);
      } else {
        this.$set(data, "name", this.newlabel);
        this.newlabel = "";
        this.$set(data, "isEdit", 0);
        // console.log('after:', data.id, data.label)
        // console.log(this.data)
        this.updateApiGroup(this.data);
      }
    }
  }
};
</script>
