<template>
    <div class="middle-box text-center loginscreen animated fadeInDown">
        <div class="form-signin">
            <div id="stage">
                <div id="inner">
                    <div id="cover">
                        <div id="text">
                            <span style="color: cyan;">H</span><span style="color: white;">+</span>
                        </div>
                        <div id="detail"></div>
                        <div id="handle"></div>
                    </div>
                    <canvas class="mb-4" id="live2d" width="800" height="800"></canvas>
                </div>
                <a id="info"  @click="info"><i class="fa fa-lg fa-info"></i></a>
                <a id="refresh" @click="refresh"><i class="fa fa-lg fa-refresh"></i></a>
            </div>
            <h3>欢迎注册</h3>
            <p>创建一个新账户</p>
            <form class="m-t" id="zc" role="form" method="post" action="/H/registerUser">
                <div class="form-group">
                    <input name="username" type="text" class="form-control" placeholder="请自定义输入账号" required="">
                </div>
                <div class="form-group">
                    <input id="pwd" name="password" type="password" class="form-control" placeholder="请输入密码" required="">
                </div>
                <div class="form-group">
                    <input id="confirm" name="confirm" type="password" class="form-control" placeholder="请再次输入密码" required="">
                </div>
                
                <button type="submit" class="btn btn-primary block full-width m-b" onclick="return mm();">注 册</button>

                <p class="text-muted text-center"><small>已经有账户了？</small><router-link to="/login">点此登录</router-link>
                </p>
                <img src="static/picture/1.gif" style="width: 100%;">
            </form>
        </div>
    </div>
</template>

<script setup>
import { onMounted,ref } from 'vue'
const live2dLoaded = ref(false)
onMounted(() => {
      // 禁用右键
      document.oncontextmenu = () => false

      // 动态加载 JS 文件
      const scripts = [
        '/static/js/jquery-2.1.1.min.js',
        '/static/js/bootstrap.min-3.4.0.js',
        '/static/js/live2d.min.js',
        '/static/js/index.js'
      ]

      scripts.forEach(src => {
        const script = document.createElement('script')
        script.src = src
        script.async = false // 保证加载顺序
        document.body.appendChild(script)
      })
      live2dLoaded.value = true
      if (!window.refresh && typeof refresh === 'function') window.refresh = refresh
      if (!window.info && typeof info === 'function') window.info = info
    })
function refresh() {
  if (live2dLoaded.value) {
    if (typeof window.refresh === 'function') {
      window.refresh()  // 调用原来的 Live2D refresh
    } else {
      console.warn('Live2D refresh 函数未挂载')
    }
  } else {
    console.warn('Live2D 脚本尚未加载完成')
  }
}

function info() {
  if (live2dLoaded.value) {
    if (typeof window.info === 'function') {
      window.info()  // 调用原来的 Live2D info
    } else {
      console.warn('Live2D info 函数未挂载')
    }
  } else {
    console.warn('Live2D 脚本尚未加载完成')
  }
}
</script>