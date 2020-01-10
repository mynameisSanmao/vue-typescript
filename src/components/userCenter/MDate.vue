<template>
  <div class='cai-calendar-wrapper' id='cai-calendar-wrapper'>
        <!-- 头部，即未展开的组件 -->
        <div class='cai-calendar-header'>
            <div class='cai-calendar-header-time'>{{currentTime.hour}}:{{formatDate(currentTime.minute)}}:{{formatDate(currentTime.second)}}</div>
            <div class='cai-calendar-header-date'>
                {{currentTime.year}}年{{currentTime.month + 1}}月{{currentTime.day}}日
            </div>
        </div>
        <!-- 日历容器  transition实现动画效果-->
        <transition name='calendar'>
            <div class='cai-calendar-container' v-if='showCalendar'>
                <!-- 容器头部，实现上下月切换，以及返回今天 -->
                <div class='container-header'>
                    <span class='container-header-date'>
                        {{choosenMonthDec}}
                    </span>
                    <i class='cai-icon-up' @click='handlePrevMonth'>上个月</i>
                    <i class='cai-icon-down' @click='handleNextMonth'>下个月</i>
                    <span class='container-header-today' @click='handleToday'>今天</span>
                </div>
                <!-- 列表头行，显示周一到周日 -->
                <div class="calendar-week">
                    <div v-for="(item, index) in calendarTitleArr" :key="index" class="week-item">{{item}}</div>
                </div>
                <!-- 列表 排列每一个日期 -->
                <div class="calendar-week">
                    <div v-for="(item, index) in calendarList" :key="index" class="week-item date-item" :class='[{today:isCurrentDay(item.date)}]' @click='chooseDate(item)'>
                        <span>{{item.day}}</span>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 自定义弹窗 transition实现动画效果 -->
        <transition name='calendar-dialog'>
            <div class='cai-calendar-dialog' v-if='showCalendarDialog'>
                <i class='cai-icon-close' @click='showCalendarDialog = false'>x</i>
                <!-- 具名插槽实现用户自定义内容 -->
                <slot name="content">
                </slot>
            </div>
        </transition>
  </div>
</template>

<script lang='ts'>
import * as utils from '@/utils/index.ts';
import { Component,Vue } from 'vue-property-decorator';
@Component
export default class MDate extends Vue {
  private currentTime:any = { year:'', month:'', day:'',hour:'',second:''};// 当前时间年月日，时分秒，用于头部显示实时时间
  private calendarTitleArr:any = ['MON','TUE','WED','THU','FRI','SAT','SUN'];// 星期英文拼写
  private calendarList:any = []; // 日历数组
  private choosenMonthDec:any = ''; // 日历容器头部的可选月份描述
  private choosenMonth:any = ''; // 日历容器头部的可选月份
  private interval:any = ''; // 存储定时器
  private showCalendar: boolean =false; // 是否显式完整日历
  private showCalendarDialog: boolean = false;// 是否显示自定义弹窗

  public mounted() {
    // 拖拽
    this.drag()
    // 第一次不延时
    this.handleNowDate()
    this.interval = setInterval( () => {
        this.handleNowDate()
    }, 1000)
  }

  public destroyed(){
      // 清除定时器
      clearInterval('interval')
  }

  // 拖拽
  public drag () {
    var that = this
    var drag:any = document.getElementById('cai-calendar-wrapper')
    // //点击某物体时，用drag对象即可，move和up是全局区域，
    // 也就是整个文档通用，应该使用document对象而不是drag对象(否则，采用drag对象时物体只能往右方或下方移动)
    drag.onmousedown = function(event){
        var event = event || window.event  //兼容IE浏览器
        // 鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
        var diffX = event.clientX - drag.offsetLeft
        var diffY = event.clientY - drag.offsetTop
        var startX = event.clientX
        var startY = event.clientY
        if(typeof drag.setCapture !== 'undefined'){
                drag.setCapture()
        }
        // 鼠标移动，修改定位
        document.onmousemove = function(event){
            var event = event || window.event
            var moveX = event.clientX - diffX
            var moveY = event.clientY - diffY
            if(moveX < 0){
                moveX = 0
            }else if(moveX > window.innerWidth - drag.offsetWidth){
                moveX = window.innerWidth - drag.offsetWidth
                console.log(moveX)
            }
            if(moveY < 0){
                moveY = 0
            }else if(moveY > window.innerHeight - drag.offsetHeight){
                moveY =  window.innerHeight - drag.offsetHeight
            }
            drag.style.left = moveX + 'px'
            drag.style.top = moveY + 'px'
        }
        document.onmouseup = function(event){
            var targetClass = event.target.className
            var event = event || window.event
            var endX = event.clientX
            var endY = event.clientY
            if(startX === endX && startY === endY){
                if(targetClass === 'cai-calendar-header' || targetClass === 'cai-calendar-header-time' || targetClass === 'cai-calendar-header-date')
                that.turnCalendar()
            }  // #document
            this.onmousemove = null
            this.onmouseup = null
            // 适配低版本 ie
            if(typeof drag.releaseCapture!='undefined'){
                drag.releaseCapture()
            }
        }
    }

  }

  // 切换完整日历
  public turnCalendar(){
      this.visibleCalendar(this.currentTime.year,this.currentTime.month)
      this.showCalendar = !this.showCalendar
      this.showCalendarDialog = false
  }
  // 是否是今天
  public isCurrentDay (date:any) {
      let {year: currentYear, month: currentMonth, day: currentDay} = utils.getNewDate(new Date())
      let {year, month, day} = utils.getNewDate(date)
      return currentYear == year && currentMonth == month && currentDay == day
  }
  // 点击上一个月
  public handlePrevMonth () {
      let prevMonth = utils.getDate(this.choosenMonth.year,this.choosenMonth.month,1)
      prevMonth.setMonth(prevMonth.getMonth() - 1)
      this.choosenMonth.year = utils.getNewDate(prevMonth).year
      this.choosenMonth.month = utils.getNewDate(prevMonth).month
      this.visibleCalendar(this.choosenMonth.year,this.choosenMonth.month)
    //  this.$emit('handlePrevMonth',this.choosenMonth.year,this.choosenMonth.month) // 传给父组件，上个年和月份作为传递数据
  }
  // 点击下一个月
  public handleNextMonth () {
      let nextMonth = utils.getDate(this.choosenMonth.year,this.choosenMonth.month,1)
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      this.choosenMonth.year = utils.getNewDate(nextMonth).year
      this.choosenMonth.month = utils.getNewDate(nextMonth).month
      this.visibleCalendar(this.choosenMonth.year,this.choosenMonth.month)
    //  this.$emit('handleNextMonth',this.choosenMonth.year,this.choosenMonth.month) // 传给父组件，上个年和月份作为传递数据
  }
  // 点击回到今天
  public handleToday () {
      this.choosenMonth.year = utils.getNewDate(new Date()).year
      this.choosenMonth.month = utils.getNewDate(new Date()).month
      this.visibleCalendar(this.choosenMonth.year,this.choosenMonth.month)
    //  this.$emit('handleToday',this.choosenMonth.year,this.choosenMonth.month) // 传给父组件，上个年和月份作为传递数据
  }
  // 点击日期
  public chooseDate(item:any){
      this.showCalendarDialog = true
    //  this.$emit('handleClickDay', item);
  }
  // 加载日历
  public visibleCalendar(YEAR:any,MONTH:any){
      let calendatArr = []

      // 获取指定时间年月日
      let {year, month, day} = utils.getNewDate(utils.getDate(YEAR, MONTH, 1))

      // 获取指定月第一天星期几
      let currentFirstDay = utils.getDate(year, month, 1)
      let weekDay = currentFirstDay.getDay()

      // 计算开始时间
      let startTime = currentFirstDay - (weekDay - 1) * 24 * 60 * 60 * 1000

      // 获取当前月份中日历显示几天 （ 第一天是周5或周6，则显示6行，否则显示5行）
      let monthDayNum
      if (weekDay == 5 || weekDay == 6){
          monthDayNum = 42
      }else {
          monthDayNum = 35
      }

      // 从第一天开始计算，每进行一次循环，日期加一天
      for (let i = 0; i < monthDayNum; i++) {
          calendatArr.push({
              date: new Date(startTime + i * 24 * 60 * 60 * 1000),
              year: year,
              month: month + 1,
              day: new Date(startTime + i * 24 * 60 * 60 * 1000).getDate(),
              clickDay: false,
          })
      }

      // 赋值日历列表
      this.calendarList = calendatArr
      this.choosenMonth = {
          year:year,
          month:month
      }
      this.choosenMonthDec = `${utils.englishMonth(month)} ${year}`  // 日历容器头部的可选月份
  }
  // 获取当前时间，并赋值currentTime
  public handleNowDate(){
      let {year, month, day, hour, minute, second} = utils.getNewDate(new Date())
      this.currentTime = {year, month, day, hour, minute, second}
  }
  // 格式化日期 个人数日期以 0X 的格式显示
  public formatDate(date:any){
      date = Number(date)
      return date < 10 ? `0${date}` : date
  }

}
</script>

<style lang="less" scoped>
.cai-calendar-wrapper{
    width:540px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    user-select:none;
    .cai-calendar-header{
        width:100%;
        display: flex;
        flex-direction: column;
        justify-content:center;
        padding:20px;
        background:rgba(9,9,9,0.8);
        position:relative;
        &:before{
            content:'';
            position: absolute;
            top:0px;
            left:0px;
            height:100%;
            width:5px;
            background: #0097e6;
        }
        .cai-calendar-header-time{
            text-align: left;
            font-size:30px;
            font-weight: 500;
            color: #74b9ff;
            margin-left:20px;
            margin-bottom:10px;
        }
        .cai-calendar-header-date{
            text-align: left;
            font-size:15px;
            color: #fff;
            margin-left:30px;
        }
    }
    .cai-calendar-container{
        width:100%;
        margin-top:5px;
        opacity: 1;
        padding:20px;
        background:rgba(9,9,9,0.8);
        transform-origin:top;
        transform:rotateX(0deg);
        display:flex;
        flex-direction: column;
        .container-header{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            color:#fff;
            margin-bottom:10px;
            .container-header-date{
                margin-right:10px;
            }
            .container-header-today{
                margin:0px 10px;
                padding:5px 10px;
                color: #74b9ff;
                font-size:12px;
                border:1px solid #74b9ff;
                border-radius:5px;
                cursor:pointer;
                transition: all .2s linear;
            }
            .container-header-today:hover{
                color:#0984e3;
                border-color:#0984e3;
            }
            .cai-icon-up {
                margin-right:10px;
                cursor:pointer;
                transition:all .2s linear;
            }
            .cai-icon-down {
                cursor:pointer;
                transition:all .2s linear;
            }
            .cai-icon-up:hover {
                color:#0984e3;
            }
            .cai-icon-down:hover {
                color:#0984e3;
            }
        }
        .calendar-week{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            border-right: none;
            list-style: none;
            margin: 0;
            padding: 0;
            .week-item{
                width: 57px;
                text-align: center;
                font-size: 16px;
                color: #fff;
                font-weight: 600;
                padding:0px;
                margin:10px;
            }
            .date-item{
                cursor:pointer;
                transition:all .2s linear;
                position: relative;
            }
            .date-item:hover{
                color:#0984e3;
            }
            .today{
                color:#74b9ff;
            }
        }
    }
    .cai-calendar-dialog{
        position: absolute;
        top:0px;
        bottom:0px;
        left:-330px;
        width:300px;
        background:rgba(9,9,9,0.8);
        color:#fff;
        overflow: auto;
        .cai-icon-close{
            position: absolute;
            top:5px;
            right:5px;
            color:#fff;
            cursor: pointer;
            transition: all .2s linear;
        }
        .cai-icon-close:hover{
            color:#0097e6;
        }
    }

    // 关于弹窗的滚动条样式覆盖
    .cai-calendar-dialog::-webkit-scrollbar {
        width: 5px;
        margin:2px;
        height: 5px;
    }
    .cai-calendar-dialog::-webkit-scrollbar-button {
        display: none;
    }
    .cai-calendar-dialog::-webkit-scrollbar-track {
        background-color: transparent;
    }
    .cai-calendar-dialog::-webkit-scrollbar-thumb {
        width: 3px;
        background-color: #0097e6;
        -webkit-border-radius: 3em;
        -moz-border-radius: 3em;
        border-radius: 3em;
    }

    // 日历 - 进入/离开 动画
    .calendar-enter-active, .calendar-leave-active {
        transition: all 1s
    }
    .calendar-enter, .calendar-leave-active {
        transform:rotateX(-90deg);
        opacity:0;
    }
    // 日历弹窗 - 进入/离开 动画
    .calendar-dialog-enter-active, .calendar-dialog-leave-active {
        transition: all 1s
    }
    .calendar-dialog-enter, .calendar-dialog-leave-active {
        transform:translateX(30px);
        opacity:0;
    }
}

</style>
