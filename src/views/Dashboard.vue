<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img src="../assets/img/img.jpg" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{ name }}</div>
              <div>{{ role }}</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>2021.06.03</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>北京</span>
          </div>
        </el-card>
        <el-card shadow="hover" style="height:252px;">
          <template #header>
            <div class="clearfix">
              <span>语言详情</span>
            </div>
          </template>
          Vue
          <el-progress :percentage="71.3" color="#42b983"></el-progress>JavaScript
          <el-progress :percentage="24.1" color="#f1e05a"></el-progress>CSS
          <el-progress :percentage="13.7"></el-progress>HTML
          <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <template v-for="item in statistics" :key="item.name">
            <el-col :span="span">
              <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div :class="item.boxclass">
                  <i :class="item.icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num">{{item.num}}</div>
                    <div>{{item.name}}</div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </template>
        </el-row>
        <el-card shadow="hover" style="height:403px;">
          <template #header>
            <div class="clearfix">
              <span>待办事项</span>
              <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
            </div>
          </template>
          <el-table :show-header="false" :data="todoList" style="width:100%;">
            <el-table-column width="40">
              <template #default="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column>
              <template #default="scope">
                <div
                  class="todo-item"
                  :class="{'todo-item-del': scope.row.status,}"
                >{{ scope.row.title }}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="echart-content">
            <div id="bar1" :style="{ width: '100%', height: '100%' }"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="echart-content">
            <div id="bar2" :style="{ width: '100%', height: '100%' }"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="echart-content">
            <div id="bar3" :style="{ width: '100%', height: '100%' }"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="echart-content">
            <div id="bar4" :style="{ width: '100%', height: '100%' }"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
export default {
  data() {
    return {
      name: localStorage.getItem("ms_username"),
      statistics: [
        {
          name: "用户访问量",
          num: 200,
          boxclass: "grid-content grid-con-1",
          icon: "el-icon-user-solid grid-con-icon",
        },
        {
          name: "系统消息",
          num: 200,
          boxclass: "grid-content grid-con-2",
          icon: "el-icon-message-solid grid-con-icon",
        },
        {
          name: "数量",
          num: 300,
          boxclass: "grid-content grid-con-3",
          icon: "el-icon-s-goods grid-con-icon",
        },
      ],
      todoList: [
        { title: "今天要修复100个bug", status: false },
        { title: "今天要修复100个bug", status: false },
        { title: "今天要写100行代码加几个bug吧", status: false },
        { title: "今天要修复100个bug", status: false },
        { title: "今天要修复100个bug", status: true },
        { title: "今天要写100行代码加几个bug吧", status: true },
      ],
    };
  },
  computed: {
    role() {
      return this.name == "admin" ? "超级管理员" : "普通用户";
    },
    span() {
      return Math.floor(24 / this.statistics.length);
    },
  },
  setup() {
    /// 声明定义一下echart
    let echart = echarts;
    onMounted(() => {
      initChart();
    });
    onUnmounted(() => {
      echart.dispose;
    });
    function initChart() {
      let chart1 = echart.init(document.getElementById("bar1"));
      let chart2 = echart.init(document.getElementById("bar2"));
      let chart3 = echart.init(document.getElementById("bar3"));
      let chart4 = echart.init(document.getElementById("bar4"));
      let option = {
        title: {
          text: "柱状图",
          left: "right",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "6%",
          right: "6%",
          bottom: "6%",
          containLabel: true,
        },
        legend: {
          data: ["家电", "百货", "食品"],
          left: "6%",
          top: "top",
          itemWidth: 15, //图例图标的宽
          itemHeight: 15, //图例图标的高
          textStyle: {
            color: "#3a6186",
            fontSize: 20,
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五"],
            splitLine: { show: false }, //去除网格分割线
            axisTick: { show: false }, //刻度
            axisLine: {
              //坐标线
              lineStyle: {
                type: "solid",
                color: "#e7e7e7", //轴线的颜色
                width: "2", //坐标线的宽度
              },
            },
            axisLabel: {
              textStyle: { color: "#3a6186" }, //坐标值的具体的颜色
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLine: { show: false }, //线
            splitLine: { lineStyle: { color: ["#e7e7e7"] } }, //分割线的颜色
            axisTick: { show: false }, //刻度
            axisLabel: {
              textStyle: { color: "#3a6186" }, //坐标值的具体的颜色
            },
          },
        ],
        series: [
          {
            name: "家电",
            type: "bar",
            barWidth: 20,
            data: [120, 132, 101, 134, 90, 230, 210],
            itemStyle: {
              normal: {
                label: {
                  show: true, //柱子上显示值
                  position: "top", //值在柱子上方显示
                },
              },
            },
          },
          {
            name: "百货",
            type: "bar",
            barWidth: 20,
            data: [220, 182, 191, 234, 290, 330, 310],
            itemStyle: {
              normal: {
                label: {
                  show: true, //柱子上显示值
                  position: "top", //值在柱子上方显示
                },
              },
            },
          },
          {
            name: "食品",
            type: "bar",
            barWidth: 20,
            data: [150, 232, 201, 154, 190, 330, 410],
            itemStyle: {
              normal: {
                label: {
                  show: true, //柱子上显示值
                  position: "top", //值在柱子上方显示
                },
              },
            },
          },
        ],
      };
      let option2 = {
        title: {
          text: "折线图",
          left: "right",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "6%",
          right: "6%",
          bottom: "6%",
          containLabel: true,
        },
        legend: {
          data: ["家电", "百货", "食品"],
          left: "6%",
          top: "top",
          itemWidth: 15, //图例图标的宽
          itemHeight: 15, //图例图标的高
          textStyle: {
            color: "#3a6186",
            fontSize: 20,
          },
        },
        calculable: true,
        xAxis: {
          type: "category",
          data: ["六月", "七月", "八月", "九月", "十月"],
          axisTick: { show: false }, //刻度
          axisLabel: {
            textStyle: { color: "#3a6186" }, //坐标值的具体的颜色
          },
        },
        yAxis: {
          type: "value",
          splitLine: { lineStyle: { color: ["#e7e7e7"] } }, //分割线的颜色
          axisTick: { show: false }, //刻度
          axisLabel: {
            textStyle: { color: "#3a6186" }, //坐标值的具体的颜色
          },
        },
        series: [
          {
            name: "家电",
            type: "line",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "百货",
            type: "line",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "食品",
            type: "line",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
        ],
      };
      let option3 = {
        title: {
          text: "饼状图",
          left: "right",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "6%",
          right: "6%",
          bottom: "6%",
          containLabel: true,
        },
        legend: {
          data: ["家电", "百货", "食品"],
          left: "6%",
          top: "top",
          itemWidth: 15, //图例图标的宽
          itemHeight: 15, //图例图标的高
          textStyle: {
            color: "#3a6186",
            fontSize: 20,
          },
        },
        calculable: true,
        series: {
          name: "demo",
          type: "pie",
          radius: "50%",
          data: [
            { name: "家电", value: "120" },
            { name: "百货", value: "220" },
            { name: "食品", value: "150" },
          ],
        },
      };
      let option4 = {
        title: {
          text: "曲线图",
          left: "right",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "6%",
          right: "6%",
          bottom: "6%",
          containLabel: true,
        },
        legend: {
          data: ["家电", "百货", "食品"],
          left: "6%",
          top: "top",
          itemWidth: 15, //图例图标的宽
          itemHeight: 15, //图例图标的高
          textStyle: {
            color: "#3a6186",
            fontSize: 20,
          },
        },
        calculable: true,
        xAxis: {
          type: "category",
          data: ["六月", "七月", "八月", "九月", "十月"],
          axisTick: { show: false }, //刻度
          axisLabel: {
            textStyle: { color: "#3a6186" }, //坐标值的具体的颜色
          },
        },
        yAxis: {
          type: "value",
          splitLine: { lineStyle: { color: ["#e7e7e7"] } }, //分割线的颜色
          axisTick: { show: false }, //刻度
          axisLabel: {
            textStyle: { color: "#3a6186" }, //坐标值的具体的颜色
          },
        },
        series: [
          {
            name: "家电",
            type: "line",
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true,
          },
          {
            name: "百货",
            type: "line",
            data: [220, 182, 191, 234, 290, 330, 310],
            smooth: true,
          },
          {
            name: "食品",
            type: "line",
            data: [150, 232, 201, 154, 190, 330, 410],
            smooth: true,
          },
        ],
      };
      //防止越界，重绘canvas
      window.onresize = function () {
        chart1.resize();
        chart2.resize();
        chart3.resize();
        chart4.resize();
      };
      chart1.setOption(option); //设置option
      chart2.setOption(option2); //设置option
      chart3.setOption(option3); //设置option
      chart4.setOption(option4); //设置option
    }
    return { initChart };
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.mgb20 {
  margin-bottom: 20px;
}
.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}
.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}
.grid-num {
  font-size: 30px;
  font-weight: bold;
}
.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}
.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}
.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
.echart-content {
  height: 500px;
  display: flex;
  justify-content: center;
}
.echart-content #bar1,
#bar2 {
  margin-top: 35px;
}
</style>