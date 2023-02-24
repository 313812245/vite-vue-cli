<template>
  <div>
    <el-button @click="alertFn">back</el-button>
    <svg-icon name="icon_sorting"></svg-icon>
    <el-table :data="list" border>
      <el-table-column
        label="序号"
        width="60"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column
        label="名称"
        align="center"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="数量"
        align="center"
        prop="number"
      ></el-table-column>
    </el-table>
  </div>
</template>
<style lang="scss" scoped>
#app {
  color: red;
}
</style>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({
  name: 'Home',
  components: {},
})
export default class Home extends Vue {
  test = '111111';
  val = 'ssfsf';
  list = [
    {
      name: '111',
      number: 1,
    },
    {
      name: '222',
      number: 1,
    },
  ];

  alertFn() {
    this.$router.push('/');
  }
}
</script>
