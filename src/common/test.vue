<template>
  <div>
    <base-form label-width="100px" :model="form">
      <el-form-item label="" prop="">

      </el-form-item>
    </base-form>
  </div>
</template>

<script>
import BaseForm from "@/baseComponents/BaseForm";
export default {
  name: "test",
  components: { BaseForm },
  data() {
    return {
      form: {}
    };
  }
};
</script>

<style scoped></style>
