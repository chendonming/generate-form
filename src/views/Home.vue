<template>
  <div class="home">
    <request-ajax @ajax="requestAjax" />
    <h2>字段列表</h2>
    <div style="text-align: left;padding-bottom: 10px;">
      <el-select v-model="col" size="mini">
        <el-option value="1" label="一列" />
        <el-option value="2" label="两列" />
      </el-select>
    </div>
    <div
      class="home-body"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      v-loading="loading"
    >
      <el-collapse>
        <el-collapse-item v-for="(item, index) in entity" :key="index">
          <template #title>
            <el-checkbox v-model="item.enable"
              >{{ item.field }}------{{ item.desc }}</el-checkbox
            >
          </template>
          <template #default>
            <el-form inline>
              <el-form-item label="label">
                <el-input v-model="item.desc" size="small" clearable />
              </el-form-item>
              <el-form-item label="类型">
                <el-select v-model="item.type" size="small">
                  <el-option label="input" value="input"></el-option>
                  <el-option label="textarea" value="textarea"></el-option>
                  <el-option label="select" value="select"></el-option>
                  <el-option label="select字典" value="selectdic"></el-option>
                  <el-option
                    label="弹出窗表格固定数据选择器"
                    value="popup-table-fix"
                  ></el-option>
                  <el-option
                    label="弹出窗表格接口分页选择器"
                    value="popup-table-interface"
                  ></el-option>
                  <el-option label="弹出窗树选择器" value="tree"></el-option>
                  <el-option label="空" value="null"></el-option>
                </el-select>
              </el-form-item>
              <!--    弹窗选择器 select          -->
              <template
                v-if="
                  item.type === 'popup-table-interface' ||
                    item.type === 'select'
                "
              >
                <el-form-item label="接口地址">
                  <el-input
                    v-model="item.interface"
                    placeholder="输入代理地址"
                  ></el-input>
                </el-form-item>
                <el-form-item label="主键">
                  <el-input
                    v-model="item.primaryKey"
                    placeholder="输入唯一key"
                  ></el-input>
                </el-form-item>
              </template>
              <!-- 字典 -->
              <template v-if="item.type === 'selectdic'">
                <el-form-item label="字典名称">
                  <el-input
                    v-model="item.dictionaryName"
                    placeholder="输入字典名称"
                  ></el-input>
                </el-form-item>
              </template>
            </el-form>
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="home-btn">
      <el-button type="primary" @click="visible = true">生成</el-button>
    </div>

    <base-popup
      title="预览"
      :visible.sync="visible"
      draggable
      @open="handleOpen"
    >
      <div class="ace-editor" ref="ace"></div>
    </base-popup>
  </div>
</template>

<script>
import RequestAjax from "../components/RequestAjax";
import { post } from "@/api/axios";
import BasePopup from "@/baseComponents/BasePopup";
import ace from "ace-builds";
import "ace-builds/webpack-resolver"; // 在 webpack 环境中使用必须要导入
import "ace-builds/src-noconflict/theme-monokai"; // 默认设置的主题
import "ace-builds/src-noconflict/mode-html";
import { translateTemplate } from "@/common/str-template";

export default {
  name: "Home",
  components: { BasePopup, RequestAjax },
  data() {
    return {
      aceEditor: null,
      entity: [],
      visible: false,
      editorInit: false,
      themePath: "ace/theme/monokai",
      modePath: "ace/mode/html",
      col: "1",
      loading: false
    };
  },
  mounted() {
    const entityStr = sessionStorage.getItem("entity");
    if (entityStr) {
      this.entity = JSON.parse(entityStr);
    }
  },
  methods: {
    handleOpen() {
      if (!this.editorInit) {
        this.editorInit = true;
        this.$nextTick(() => {
          this.aceEditor = ace.edit(this.$refs.ace, {
            maxLines: 100, // 最大行数，超过会自动出现滚动条
            minLines: 30, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
            fontSize: 14, // 编辑器内字体大小
            tabSize: 4, // 制表符设置为 4 个空格大小
            theme: this.themePath, // 默认设置的主题
            mode: this.modePath // 默认设置的语言模式
          });
        });
      }
      this.gennerate();
    },
    gennerate() {
      this.$nextTick(() => {
        const str = translateTemplate(this.entity.filter(v => v.enable));
        this.aceEditor.setValue(str);
      });
    },
    async requestAjax(obj) {
      this.loading = true;
      const data = await post("/", {
        url: obj.requestName
      }).finally(() => {
        this.loading = false;
      });
      if (data.data?.[0]) {
        this.entity = data.data.map(v => {
          return {
            ...v,
            type: "input",
            enable: false,
            interface: "",
            dictionaryName: "",
            primaryKey: ""
          };
        });
        sessionStorage.setItem("entity", JSON.stringify(this.entity));
      }
    }
  }
};
</script>

<style scoped>
.home-btn {
  position: fixed;
  top: 5px;
  left: 10px;
}

.home {
  width: 1140px;
  margin: 0 auto;
}

.ace-editor {
  margin: 10px 0;
}

.home-body {
  height: calc(100vh - 150px);
  overflow: auto;
}
</style>
