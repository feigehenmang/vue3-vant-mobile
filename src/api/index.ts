import request from '@/utils/request'
import { AxiosRequestConfig } from 'axios'
import api from './api'

export async function queryProse(): Promise<any> {
  return request('/project/prose')
}

export function getUserInfo(data) {
  return request({
    url: api.GetUserInfo,
    method: 'post',
    data,
  } as AxiosRequestConfig)
}

export function getVerifyPageUrl(data) {
  return request({
    url: api.RealName,
    method: 'post',
    data
  })
}

export function getContract(data) {
  return request({
    url: api.Contract,
    method: 'post',
    data
  })
}