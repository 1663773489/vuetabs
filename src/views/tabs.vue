<template>
    <div class=''>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="tabClick($event)">
            <el-tab-pane
                :key="item.name"
                v-for="item in editableTabs"
                :label="item.title"
                :name="item.name"
            >
            </el-tab-pane>
        </el-tabs>
        <router-view/> <!-- 放入router-view -->
    </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
        
    };
  },
 mounted() {
    //刷新加载sessionStorage存着地址
    if (sessionStorage.getItem("tabsPage")) {
      this.$store.state.tabsPage = JSON.parse(
        sessionStorage.getItem("tabsPage")
      );
      var TabsValue = sessionStorage.getItem("TabsValue");
      this.$store.state.TabsValue = TabsValue;
      this.$router.push({ name: TabsValue });
    }
  },
  computed: {
    // 监听vuex保存的数据  
    editableTabs:{
       get(){
          return this.$store.state.tabsPage;
       },
       set(val){
          this.$store.state.tabsPage = val;
       }
    },
    editableTabsValue:{
       get(){
          return this.$store.state.TabsValue;
       },
       set(val){
          this.$store.state.TabsValue = val;
       }
    }
  },
  methods: {
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              console.log(nextTab);
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        console.log(window.sessionStorage.tabsPage)
        console.log(JSON.stringify(this.editableTabs))
        window.sessionStorage.tabsPage =JSON.stringify(this.editableTabs)
         console.log(window.sessionStorage.tabsPage)
        //解决刷新消失
        // window.sessionStorage.setItem("tabsPage", JSON.stringify(newTabs));
        window.sessionStorage.setItem("TabsValue", activeName);
        // 删除时跳转不在停留被删除页
        this.$router.push({ name: activeName });
      }, 
      tabClick(event) {
        //写一个点击tabs跳转
        this.$router.push({ name: event.name });
      },
    }    
};
</script>
