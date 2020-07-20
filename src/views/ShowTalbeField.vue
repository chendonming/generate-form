<template>
  <div class="ShowTalbeField">
    <base-form inline :model="form">
      <el-form-item prop="table" label="表名">
        <el-select
          clearable
          v-model="form.table"
          placeholder="请选择表名"
          filterable
        >
          <el-option
            v-for="(item, index) in data"
            :label="item"
            :value="item"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="generate">生成</el-button>
      </el-form-item>
    </base-form>
    <base-table :columns="columns" :data="tableData"></base-table>
    <base-popup :visible.sync="visible" title="新增" inline width="40%">
      <base-form :model="addForm" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="title" label="标题">
              <el-input v-model="addForm.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="name" label="名称">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="sex" label="性别">
              <el-input v-model="addForm.sex"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </base-form>
    </base-popup>
  </div>
</template>

<script type="text/jsx">
  import BaseForm from "@/baseComponents/BaseForm";
  import { generate, getColumnsByTable, getTables } from "@/api";
  import BaseTable from "@/baseComponents/BaseTable";
  import BasePopup from "@/baseComponents/BasePopup";

  const components = [
    {
      label: '输入框',
      name: 'el-input'
    },
    {
      label: '选择框',
      name: 'el-select'
    }
  ]

  export default {
    name: "ShowTalbeField",
    components: { BasePopup, BaseTable, BaseForm },
    data() {
      return {
        addForm: {
          title: '',
          name: '',
          sex: ''
        },
        visible: false,
        file: '',
        form: {
          table: ""
        },
        data: [],
        columns: [
          {
            label: "字段名称",
            prop: "column_name"
          },
          {
            label: "字段类型",
            prop: "data_type"
          },
          {
            label: "字段注释",
            prop: "column_comment"
          },
          {
            label: '编辑',
            render: (h, param) => {
              return <el-checkbox value={param.row.edit} onInput={e => {
                param.row.edit = e
              }}></el-checkbox>
            }
          },
          {
            label: '新增',
            render: (h, param) => {
              return <el-checkbox value={param.row.add} onInput={e => {
                param.row.add = e
              }}></el-checkbox>
            }
          },
          {
            label: '查询',
            render: (h, param) => {
              return <el-checkbox value={param.row.query} onInput={e => {
                param.row.query = e
              }}></el-checkbox>
            }
          },
          {
            label: '组件',
            render: (h, params) => {
              const option = components.map(v => {
                return <el-option label={v.label} value={v.name}>{v.label}</el-option>
              });

              return (
                <el-select value={params.row.component} onInput={e => {
                  params.row.component = e;
                }} size="small">
                  {option}
                </el-select>
              )
            }
          }
        ],
        tableData: []
      };
    },
    async created() {
      const data = await getTables();
      this.data = data.data;
    },
    methods: {
      async onSubmit() {
        const data = await getColumnsByTable({ name: this.form.table });
        this.tableData = data.data;
      },
      async generate() {
        // const data = await generate({
        //   list: this.tableData
        // })
        this.visible = true;
        // this.file = data.data;
      }
    }
  };
</script>

<style scoped>
  .el-form {
    text-align : left;
  }
</style>
