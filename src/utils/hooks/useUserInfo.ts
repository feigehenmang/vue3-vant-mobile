import { getUserInfo } from '@/api';
import { onMounted, ref } from 'vue';
/**
 * 获取userInfo 
 * @param data getUserInfo参数
 * @param callback 执行完成回调函数
 * @returns Ref对象 userInfo的值
 */
export default function useUserInfo(data, callback?: () => void) {
    const userInfo = ref({})
    onMounted(() => {
        getUserInfo(data).then((result: any) => {
            if (result.code == 200) {
                userInfo.value = result.data
                callback()
            }
        })
    })
    return userInfo
}