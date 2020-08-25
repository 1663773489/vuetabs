<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 97.3vh;
  width: 14rem;
}
.el-menu {
  padding-top: 2.7vh;
}
.el-submenu__title i,
.el-menu-item i {
  color: #909399;
  position: relative;
  right: 0.4rem;
  font-size: 12px;
}
.el-menu-item {
  min-width: auto !important;
}
.el-submenu /deep/ .el-submenu__title .el-submenu__icon-arrow {
  position: absolute;
  right: 2rem;
}
</style>
<template>
  <div class="height:100%">
      <!--
        :default-active="$route.name" 
        获取router路由的name 对应menu-item内的index
        为了对应 tabs 的跳转点击 做选中
      -->
      <el-menu
        :default-active="$route.name"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="white"
        active-text-color="#ffd04b"
      >
        <!-- 循环数据格式 -->
        <el-submenu :index="`${index}`" v-for="(menu,index) in menuList" :key="index">
          <template slot="title">
            <i :class="menu.icont"></i>
            <span>{{menu.name}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="item.routeName"
              v-for="item in menu.menuItem"
              :key="item.index"
              @click="handleOpen2(item)"
            >{{item.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "zgz-admin-index-aside",
  components: {},
  data() {
    return {
      // 将所需submenu,menu和tabs所需参数写成数据格式
      menuList: [
        {
          icont: "el-icon-s-tools",
          name: "子菜单",
          menuItem: [
            {
              title: "子菜单1",
              routeName: "Setting",
              name: "子菜单1",
            },
            {
              title: "子菜单2",
              routeName: "WxAd",
              name: "子菜单2",
            },
          ],
        },
        {
          icont: "el-icon-s-tools",
          name: "子菜单呀",
          menuItem: [
            {
              title: "子菜单呀1",
              routeName: "Setting",
              name: "子菜单呀1",
            },
            {
              title: "子菜单呀2",
              routeName: "WxAd",
              name: "子菜单呀2",
            },
          ],
        },
        {
          icont: "el-icon-s-order",
          name: "子菜单啊呀",
          menuItem: [
            {
              title: "子菜单啊呀1",
              routeName: "orderList",
              name: "子菜单啊呀1",
            },
            {
              title: "子菜单啊呀2",
              routeName: "orderList",
              name: "子菜单啊呀2",
            },
          ],
        },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 调用 注册vuex内注册的editableTabs方法
    ...mapActions({
      handleOpen2: "editableTabs",
    }),
  },
};
</script>
