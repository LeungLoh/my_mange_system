<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <template #prepend>
              <el-button icon="el-icon-user"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="param.password" placeholder="password" @keyup.enter="submitForm()">
            <template #prepend>
              <el-button icon="el-icon-lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <div class="login-btn">
          <el-button type="primary" @click="Registered()">注册</el-button>
        </div>
      </el-form>
    </div>
    <!-- 编辑弹出框 -->
    <el-dialog title="注册" v-model="editVisible" width="40%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="registeredparam.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="registeredparam.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel()">取消</el-button>
          <el-button type="primary" @click="handleSure()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>


<script>
import { login, registered } from "../api/index";
export default {
  data() {
    return {
      param: {
        username: "",
        password: "",
        city: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loginvalid: -1,
      editVisible: false,
      registeredparam: {
        username: "",
        password: "",
      },
    };
  },
  created() {
    this.$store.commit("clearTags");
  },
  mounted() {
    this.localstation();
  },
  methods: {
    submitForm() {
      login(this.param).then((res) => {
        if (res.status == 200) {
          this.$message.success("登录成功");
          localStorage.setItem("ms_username", res.data.username);
          localStorage.setItem("token", res.token);
          localStorage.setItem("userid", res.data.userid);
          localStorage.setItem("roleid", res.data.roleid);
          this.$router.push("/");
        } else {
          this.$message.error(res.error);
        }
      });
    },
    localstation() {
      let clientip = returnCitySN["cip"];
      let city = returnCitySN["cname"];
      this.param.city = city;
      localStorage.setItem("clientip", clientip);
      localStorage.setItem("city", city);
    },
    Registered() {
      this.editVisible = true;
    },
    handleCancel() {
      this.editVisible = false;
    },
    handleSure() {
      registered(this.registeredparam).then((res) => {
        if (res.status == 200) {
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.error);
        }
        this.editVisible = false;
      });
    },
  },
};
</script>

<style>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login-bg.jpg);
  background-size: 100%;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>