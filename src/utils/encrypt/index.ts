import { config } from "@/config"

const { encryptData, decryptData } = Encryption
export const isEncrypt = config.isEncrypt
// 解决加密后特殊符号问题
export const URLencode = str => {
    return escape(str)
        .replace(/\+/g, '%2B')
        .replace(/\"/g, '%22')
        .replace(/\'/g, '%27')
        .replace(/\//g, '%2F')
}

export const requestSecret = config => {
    // 参数加密 - 开始
    console.log('参数加密前', config.data)
    if (config.method === 'post') {
        // post 请求，加密不需要转unicode
        config.data = isEncrypt ? encryptData(config.data) : config.data
    } else {
        // get请求参数config.params.info(%会转字符,加密需要本地加密)
        const info = URLencode(encryptData(config.data))
        config.data = {}
        config.url = config.url.indexOf('?') >= 0 ? config.url + '&info=' + info : config.url + '?info=' + info
    }
    return config
}

// // 响应参数解密
export const responseDecryption = response => {
    const responseData = isEncrypt ? decryptData(response.data, response.config.method !== 'post') : response.data
    console.log('响应解密后', responseData)
    return responseData
}
// export function modifyPasswordResult(flag) {
//     console.log(window['android_native'])
//     window['android_native']['modifyPasswordResult'](flag)
// }
