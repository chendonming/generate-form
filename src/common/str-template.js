// 渲染 form-item
function renderItem(arr) {
  const ar = [];
  arr.forEach(v => {
    ar.push(...[
      '      <el-form-item label="'+v.desc+'" prop="'+v.field+'">',
      renderComponent(v) +
      "      </el-form-item>"
    ]);
  })
  return ar.join("\r\n");
}

// 渲染组件
function renderComponent(val) {
  let html = '';
  switch (val.type) {
    case 'input':
      html = `\t\t<el-input v-model="form.${val.field}"></el-input>\r\n`;
      break;
    case 'textarea':
      html = `\t\t<el-input type="textarea" v-model="form.${val.field}"></el-input>\r\n`;
      break;
    default:
      break;
  }
  return html;
}

// 主方法
export const translateTemplate = function(data) {
  const form = {};
  data.forEach( v=>[
    form[v.field] = ""
  ])
  const temstr = [
    "<template>",
    "  <div>",
    '    <base-form label-width="100px" :model="form">',
    renderItem(data) + "\r\n" +
    "    </base-form>",
    "  </div>",
    "</template>",
    "<script>",
    'import BaseForm from "@/baseComponents/BaseForm";',
    "",
    "export default {",
    '  name: "test",',
    "  components: { BaseForm },",
    "  data() {",
    "    return {",
    "      form: " + JSON.stringify(form),
    "    };",
    "  }",
    "};",
    "</script>",
    "<style scoped></style>"
  ].join("\r\n");

  return temstr;
};
