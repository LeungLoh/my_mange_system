<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">后台管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
            <i class="el-icon-bell"></i>
            <!-- <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>-->
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../assets/img/img.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown style="margin-left: 10px;" trigger="click">
          <span class="el-dropdown-link">
            {{username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <a href="https://github.com/LeungLoh" target="_blank">
                <el-dropdown-item>项目仓库</el-dropdown-item>
              </a>
              <el-dropdown-item divided @click="updatePassword()">修改密码</el-dropdown-item>
              <el-dropdown-item divided @click="logOut()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- 编辑弹出框 -->
    <el-dialog title="修改密码" v-model="editVisible" width="40%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="旧密码">
          <el-input v-model="oldpassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="newpassowrd1" type="password"></el-input>
        </el-form-item>
        <el-form-item label="再输入一次">
          <el-input v-model="newpassword2" type="password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel()">取消</el-button>
          <el-button type="primary" @click="handleDetermine()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>


<script>
import { logout, changepassword } from "../api/index";
export default {
  data() {
    return {
      name: "admin",
      message: 2,
      editVisible: false,
      oldpassword: "",
      newpassowrd1: "",
      newpassword2: "",
    };
  },
  computed: {
    username() {
      let username = localStorage.getItem("ms_username");
      return username ? username : this.name;
    },
    userid() {
      let userid = localStorage.getItem("userid");
      return userid ? userid : 0;
    },
    collapse() {
      return this.$store.state.collapse;
    },
  },
  methods: {
    collapseChage() {
      this.$store.commit("hadndleCollapse", !this.collapse);
    },
    logOut() {
      localStorage.clear();
      this.clearCookie("gin-session");
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
      logout().then((res) => {
        console.log(res);
      });
    },
    clearCookie(name) {
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    },
    updatePassword() {
      this.editVisible = true;
    },
    handleCancel() {
      this.editVisible = false;
    },
    handleDetermine() {
      if (this.newpassowrd1 != this.newpassword2) {
        this.$message.error("2次密码输入不一致");
        return;
      }
      let params = {
        userid: this.userid,
        oldpassword: this.oldpassword,
        newpassword: this.newpassowrd1,
      };
      changepassword(params).then((res) => {
        if (res.status != 200) {
          this.$message.error(res.error);
          return;
        }
        this.$message.success(res.msg);
        this.editVisible = false;
      });
    },
  },
};
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-bell {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
</style>