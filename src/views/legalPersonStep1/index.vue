<template>
  <div class="step-box">
    <van-nav-bar title="实名认证信息" />
    <van-form v-if="!authVisible" @submit="onSubmit">
      <van-field
        v-model="data.userName"
        required
        :disabled="btnDisabled"
        name="userName"
        label="姓名："
        placeholder="请输入"
        input-align="right"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
        input-align="right"
        name="personArea"
        disabled
        value="身份证"
        readonly
        label="证件类型："
        placeholder="身份证"
      />
      <van-field
        v-model="data.idNo"
        :disabled="btnDisabled"
        ref="idNo"
        required
        name="idNo"
        label="身份证号："
        placeholder="请输入"
        input-align="right"
        :rules="[
          { required: true, message: '请填写身份证号' },
          { pattern: idCardRule, message: '请输入正确身份证号' },
        ]"
      />
      <van-field
        v-model="data.mobile"
        ref="phone"
        :disabled="btnDisabled"
        required
        name="mobile"
        label="手机号："
        placeholder="请输入"
        input-align="right"
        :rules="[
          { required: true, message: '请填写手机号' },
          { pattern: phoneRule, message: '请输入正确手机号' },
        ]"
      />
      <div class="btn">
        <van-button color="#004990" type="default" block native-type="submit">{{
          btnText
        }}</van-button>
      </div>
    </van-form>
    <van-empty v-else description="未查询到用户信息"></van-empty>
  </div>
</template>

<script lang="ts">
import { getVerifyPageUrl } from "@/api";
import useUserId from "@/utils/hooks/useUserId"
import useUserInfo from "@/utils/hooks/useUserInfo"
import { computed, defineComponent, reactive, ref } from "vue-demi";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const userId = useUserId(true)
    const userInfo: any = useUserInfo({ userId: userId.value }, () => {
      data.userName = userInfo.value.name
      data.mobile = userInfo.value.mobile
      data.idNo = userInfo.value.idNo
      authData.auth = userInfo.value.authStatus === 'SUCCESS'
      authData.sign = ['SIGNED', 'SIGNIN'].includes(userInfo.value.signStatus)
    })
    const data = reactive({
      userName: "",
      idNo: "",
      mobile: "",
    });
    const authData = reactive({
      auth: false, // 是否实名认证
      sign: false, // 是否签署授权书
    });
    const idCardRule =
      /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; // 18位身份证号校验
    const phoneRule = /^1[0-9]{10}$/;
    const authVisible = ref(userId.value ? false : true);
    const btnText = computed(() => {
      return !authData.auth ? '去实名认证' : !authData.sign ? '签署授权书' : '查看授权书'
    });

    const btnDisabled = computed(() => {
      return authData.auth && authData.sign
    })

    const router = useRouter()
    function onSubmit() {
      console.log("submit", authData);
      if (!authData.auth) {
        // 未实名认证
        // this.authLink && (location.href = this.authLink)
        jumpESign()
      } else if (!authData.sign) {
        // 未签署授权书
        router.replace('/auth?userid=' + userId.value + '&source=3')
      } else if (authData.auth && authData.sign) {
        // 查看已授权授权书
        router.replace('/auth?userid=' + userId.value + '&source=3')
      }
    }
    function jumpESign() {
      // 跳转e签宝
      const params = {
        origin: 'APP',
        source: '3',
        userInfo: {
          userName: data.userName,
          personArea: 19,
          idNo: data.idNo,
          mobile: data.mobile,
          userId: userId.value,
          name: data.userName
        }
      }
      getVerifyPageUrl(params).then((result: any) => {
        // console.log('result', result)
        if (result.code == '200' && result.data) {
          result.data.shortLink && (location.href = result.data.shortLink)
        }
      })
    }
    return {
      data,
      authVisible,
      btnText,
      onSubmit,
      idCardRule,
      phoneRule,
      authData,
      btnDisabled
    };
  },
});
</script>

<style lang="less" scoped>
.btn {
  padding: 30px;
}
</style>
