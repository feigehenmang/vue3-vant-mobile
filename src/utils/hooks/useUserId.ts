import { decode } from 'js-base64';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
/**
 * 从url获取当前userId
 * @param isDecode 是否需要base64解密
 * @returns Ref对象
 */
export default function useUserId(isDecode = false) {
    if (isDecode) {
        // 解密 location.href === http://localhost:3000/#/onlinesign?MjMyNDY0Mg=%3D
        return ref(decode(decodeURIComponent(location.href.indexOf('?') >= 0 ? location.href.split('?')[1] : '')))
    }
    // 非解密 https://staging-service.winc.goodyear.com.cn:4448/signsms/#/auth?userid=2324642&source=3
    const route = useRoute()
    return ref(route.query.userid || '')
}