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
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="handleDelete()"
        >批量删除</el-button>
        <el-select v-model="query.roleid" placeholder="角色" class="handle-select mr10">
          <el-option key="1" label="全部" value="0"></el-option>
          <el-option key="2" label="管理员" value="1"></el-option>
          <el-option key="3" label="普通用户" value="2"></el-option>
        </el-select>
        <el-input v-model="query.username" placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        @select="selectCall"
        @select-all="selectCall"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名" align="center"></el-table-column>
        <el-table-column prop="role" label="角色" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              :class="{'table-delete':!isdisablebutton}"
              :disabled="isdisablebutton"
              @click="handleSingleDelData(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="sizes,prev, pager, next,total"
          :current-page="query.offset"
          :page-size="query.limit"
          :page-sizes="[5,10]"
          :total="total"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getuserlist, deluserlist } from "../api/index";
export default {
  name: "basetable",
  data() {
    return {
      query: {
        username: "",
        offset: 1,
        limit: 5,
      },
      deleteparams: {
        userid: [],
        roleid: [],
      },
      tableData: [],
      total: 0,
    };
  },
  computed: {
    isdisablebutton() {
      let roleid = localStorage.getItem("roleid");
      return roleid == 1 ? false : true;
    },
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getuserlist(this.query).then((res) => {
        if (res.status != 200) {
          this.$message.error(res.error);
          return;
        }
        this.tableData = res.data.users;
        this.total = res.data.total;
        for (let v of this.tableData) {
          v["role"] = v["roleid"] == 1 ? "管理员" : "普通用户";
        }
      });
    },
    handleSearch() {
      this.getData();
    },
    // 分页导航
    handlePageChange(val) {
      this.query.offset = val;
      this.getData();
    },
    handleSizeChange(val) {
      this.query.limit = val;
      this.getData();
    },

    handleSingleDelData(row) {
      this.delparamsclear();
      this.deleteparams.userid.push(row.userid);
      this.deleteparams.roleid.push(row.roleid);
      this.handleDelete();
    },
    selectCall(rows) {
      this.delparamsclear();
      for (let row of rows) {
        this.deleteparams.userid.push(row.userid);
        this.deleteparams.roleid.push(row.roleid);
      }
    },
    delparamsclear() {
      this.deleteparams = {
        userid: [],
        roleid: [],
      };
    },
    handleDelete() {
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtomText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let userid = this.deleteparams.userid.join(",");
        let roleid = this.deleteparams.roleid.join(",");
        let params = { userid: userid, roleid: roleid };
        deluserlist(params).then((res) => {
          if (res.status != 200) {
            this.$message.error(res.error);
            return;
          }
          this.$message.success(res.msg);
          this.getData();
        });
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
.table-delete {
  color: red;
}
</style>