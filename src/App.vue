<template>
  <div id="app">
    <el-container>
      <el-aside width="300px">
        <Home></Home>
        <!-- 我是侧边栏 -->
      </el-aside>
      <el-container>
        <el-main>
          <tabs></tabs>
          <!-- 我是tabs组件 -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Home from '../src/views/Home'
import tabs from '../src/views/tabs'
export default {
  components:{
    Home,
    tabs
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
