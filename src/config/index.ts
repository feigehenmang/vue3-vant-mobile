// export const config: Record<string, string> = import.meta.globEager(`./config.${process.env.NODE_ENV}.ts`)
export type TypeConfig = {
    baseApi: string, // ajax 前缀
    isEncrypt: boolean // 请求是否加密
}

export const config: TypeConfig = import.meta.globEager(`./config.*.ts`)[`./config.${process.env.NODE_ENV}.ts`].default
// console.log('resolve config', `./config.${process.env.NODE_ENV}`, config)