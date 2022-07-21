<template>
  <div class="container">
    <div id="canvasBox" :style="getHorizontalStyle">
      <canvas id="signCanvas"></canvas>
      <div class="greet">
        <div class="tips">请在上方空白处签名</div>
        <div class="canvas_btn">
          <van-button class="btns" color="#ccc" @touchstart="clear" @mousedown="clear">重签</van-button>
          <van-button class="btns" type="primary" @click="savePNG">确认</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { savePersonSeal } from '@/api/signature'
import { Toast } from 'vant'
import Draw from '@/utils/drawTest'
export default {
  name: 'LegalPersonSign',
  data() {
    return {
      signImage: null,
      degree: 90,
      queryParams: {},
      canvasBox: null,
    }
  },
  beforeCreate() {
    document.title = '手写签名'
  },
  mounted() {
    this.queryParams = this.$route.query
    this.canvasBox = document.getElementById('canvasBox')
    this.initCanvas()
  },
  computed: {
    getHorizontalStyle() {
      const d = document
      const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth
      const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight
      let length = (h - w) / 2
      let width = w
      let height = h
      switch (this.degree) {
        case -90:
          length = -length
          break
        case 90:
          width = h
          height = w
          break
        default:
          length = 0
      }
      // if (this.canvasBox) {
      //   this.canvasBox.removeChild(document.querySelector('canvas'))
      //   this.canvasBox.appendChild(document.createElement('canvas'))
      //   // eslint-disable-next-line vue/no-async-in-computed-properties
      //   this.$nextTick(() => {
      //     this.initCanvas()
      //   })
      //   // setTimeout(() => {
      //   // }, 200)
      // }
      return {
        transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`,
        width: `${width}px`,
        height: `${height}px`,
        transformOrigin: 'center center'
      }
    }
  },
  methods: {
    initCanvas() {
      const canvas = document.querySelector('canvas')
      this.draw = new Draw(canvas, -this.degree)
    },
    clear() {
      // 清除画布
      this.draw.clear()
    },

    savePNG() {
      this.signImage = this.draw.getPNGImage()
      if (!this.signImage) return
      console.log('signImage', this.signImage)
      this.confirmSign(this.signImage).then((res) => {
        if (res.code == 200) {
          localStorage.setItem('signImage', this.signImage)
          this.$router.replace({
            path: '/auth',
            query: this.queryParams
          })
          // this.$router.back()
          // const userInfo = JSON.parse(localStorage.getItem('userInfo'))
          // this.$router.push(`/agreement?userid=${userInfo.userId}`)
        }
      })
    },
    confirmSign(data) {
      // 确认签名
      const index = 'data:image/png;base64,'.length
      const base64Sign = this.signImage.substring(index)
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      // return savePersonSeal({ accountId: userInfo.accountId, sealData: base64Sign, ...this.queryParams })
    }
  },
  created() {
    Toast('请横屏签字！')
  }
}
</script>

<style scoped>
#canvasBox {
  display: flex;
  flex-direction: column;
}
.greet {
  font-size: 14px;
  user-select: none;
}
.tips {
  font-size: 15px;
  color: #999;
  padding: 10px;
}
.canvas_btn {
  margin: 8px;
  display: flex;
  justify-content: center;
}
.btns {
  width: 150px;
  height: 36px;
  border-radius: 6px;
  margin-right: 30px;
}
input {
  font-size: 20px;
}
.greet select {
  font-size: 18px;
}
canvas {
  flex: 1;
  cursor: crosshair;
  border: 1px dashed lightgray;
}
.image-box {
  width: 100%;
  height: 100%;
}
.image-box header {
  font-size: 18px;
}
.image-box img {
  max-width: 80%;
  max-height: 80%;
  margin-top: 50px;
  border: 1px solid gray;
}
.app-container {
  overflow: hidden;
}
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
