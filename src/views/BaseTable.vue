<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 基础表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="tableData" border class="table" ref="multipleTable">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="用户名" align="center"></el-table-column>
      <el-table-column prop="money" label="账户余额" align="center"></el-table-column>
      <el-table-column label="头像(查看大图)" align="center">
        <template #default="scope">
          <el-image
            class="table-td-thumb"
            :src="scope.row.thumb"
            :preview-src-list="[scope.row.thumb]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center"></el-table-column>
      <el-table-column label="状态" align="center">
        <template #default="scope">
          <el-tag
            :type="scope.row.state === '成功'? 'success': scope.row.state === '失败'? 'danger': ''"
          >{{ scope.row.state }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="注册时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default>
          <el-button type="text" icon="el-icon-edit">编辑</el-button>
          <el-button type="text" icon="el-icon-delete" style="color:red">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchData } from "../api/index";
export default {
  name: "basetable",
  data() {
    return {
      query: {
        address: "",
        name: "",
        pageIndex: 1,
        pageSize: 10,
      },
      tableData: [],
      pageTotal: 0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      fetchData(this.query).then((res) => {
        console.log(res);
        this.tableData = res.list;
        this.pageTotal = res.pageTotal || 50;
      });
    },
  },
};
</script>

<style scoped>
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>