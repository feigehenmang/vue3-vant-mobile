<template>
  <div class="auth-box">
    <van-nav-bar title="签署授权书" />
    <div class="pdf-box">
      <!-- <iframe :src="contract" frameborder="0"></iframe> -->
      <pdf v-if="contract" :src="contract" />
    </div>
    <div v-if="showSign" class="sign-box">
      <span>签名<i class="red">*</i></span>
      <div v-if="!signImage" class="sign-btn" @click="toSign">点击签名</div>
      <van-image
        :src="signImage"
        height="100"
        v-else
        @click="toSign"
      ></van-image>
    </div>
    <div v-if="showSign" class="btns">
      <van-button color="#004990" type="default" block @click="beforeSubmit"
        >同意协议并提交</van-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import useUserId from "@/utils/hooks/useUserId";
import useUserInfo from "@/utils/hooks/useUserInfo";
import useQueryParams from "@/utils/hooks/useQueryParams";
import pdf from '@/components/pdf.vue'
import { encode } from "js-base64";
import { Dialog } from "vant";
import { defineComponent, ref } from "vue-demi";
import { useRouter } from "vue-router";
import { getContract } from "@/api";
export default defineComponent({
  components: {
    pdf
  },
  setup() {
    const userId = useUserId();
    const router = useRouter();
    const query = useQueryParams();
    const userInfo: any = useUserInfo({ userId: userId.value }, () => {
      console.log(userInfo.value);
      if (userInfo.value.authStatus === "SUCCESS") {
        // 实名认证成功
        loadAuth();
      } else {
        // 未进行实名认证 跳转至授权页
        Dialog.alert({
          title: "提示",
          message: "还未实名认证，请前往实名认证！",
        })
          .then(() => {
            router.replace("/onlinesign?" + encode(userId.value as string));
          })
          .catch(() => {
            router.replace("/onlinesign?" + encode(userId.value as string));
          });
      }
    });
    function loadAuth() {
      getContract({
        userId: userId.value,
        ...query,
      }).then((result: any) => {
        console.log("result", result);
        if (result.data) {
          // console.log(pdf)
          contract.value = result.data.url
        }
      });
    }
    const contract = ref("");
    const showSign = ref(true);
    const signImage = ref("");
    const popupVisible = ref(false);
    const beforeSubmit = () => {
      popupVisible.value = true;
    };
    const toSign = () => {
      console.log('tosign')
      router.replace({
        path: '/sign',
        query
      })
    }
    return {
      contract,
      showSign,
      signImage,
      toSign,
      beforeSubmit,
    };
  },
});
</script>

<style lang="less" scoped>
.auth-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .pdf-box {
    // height: 500px;
    flex: 1;
    overflow: hidden;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
  .sign-box {
    margin: 20px 10px;
    .red {
      color: red;
    }
    .sign-btn {
      width: 100%;
      height: 60px;
      background-color: #e6e6e6;
      text-align: center;
      line-height: 60px;
      color: #999;
      font-size: 14px;
      margin-top: 10px;
    }
  }
  .btns {
    padding: 20px;
  }
}
.phone_dialog {
  padding: 0 15px;
}
.phone_input {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  font-size: 15px;
  justify-content: space-between;
  .lable {
    display: inline-block;
    width: 65px;
    color: #646566;
    font-size: 13px;
  }
}
.code_btn {
  width: 75px;
  padding: 3px 8px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  font-size: 13px;
  text-align: center;
}
.code_btn.disabled {
  color: #999;
}
/deep/.van-button--disabled {
  background-color: #e6e6e6 !important;
  border-color: #e6e6e6 !important;
}
</style>
