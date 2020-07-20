<template>
  <el-input
    placeholder="请输入swagger文档链接"
    v-model="requestName"
    class="input-with-select"
  >
    <el-button slot="append" icon="el-icon-search" @click="request"></el-button>
  </el-input>
</template>

<script>
export default {
  name: "RequestAjax",
  data() {
    return {
      requestName: "",
    };
  },
  methods: {
    request() {
      this.$emit("ajax", {
        requestName: this.requestName
      });
    }
  }
};
</script>

<style scoped>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
