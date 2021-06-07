<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 基础表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10">批量删除</el-button>
        <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
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

      <!-- 编辑弹出框 -->
      <el-dialog title="编辑" v-model="editVisible" width="30%">
        <el-form ref="form" :model="form" label-width="70px">
          <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button>取消</el-button>
            <el-button type="primary">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
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
      editVisible: false,
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
.handle-box {
  margin-bottom: 20px;
}
.handle-select {
  width: 120px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>