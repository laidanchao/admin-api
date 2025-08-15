export enum UserStatus {
  'NORMAL' = 'NORMAL',
  'FROZEN' = 'FROZEN'
}

export enum MenuType {
  'CATALOG' = 'CATALOG', // 目录
  'MENU' = 'MENU', // 菜单
  'BUTTON' = 'BUTTON', // 按钮
  'LINK' = 'LINK', // 外链
}

/**
 * 客户分级
 */
export enum ClientStage {
  'DEFAULT' = 'DEFAULT',// 未开发的客户
  'NOT_INTERESTED' = 'NOT_INTERESTED',// 没有意向的客户
  'INTERESTING' = 'INTERESTING',// 有意向的客户
  'COOPERATING' = 'COOPERATING'// 合作中的客户
}

/**
 * 客户分级描述
 */
export enum ClientStageDesc {
  '未开发' = 'DEFAULT',
  '无意向' = 'NOT_INTERESTED',
  '有意向' = 'INTERESTING',
  '合作中' = 'COOPERATING'
}

export enum ClientType {
  'PERSONAL' = 'PERSONAL',
  'COMPANY' = 'COMPANY'
}

export enum ClientTypeDesc {
  '个人' = 'PERSONAL',
  '企业' = 'COMPANY'
}

export enum Gender {
  'MALE' = 'MALE',
  'FEMALE' = 'FEMALE'
}

export enum DictItemTagType {
  'info' = 'info',
  'primary' = 'primary',
  'warning' = 'warning',
  'danger' = 'danger',
  'success' = 'success',
  '' = ''
}

export enum OrderType {
  'SC' = 'SC',
  'PC' = 'PC'
}

export enum OrderStatus {
  'CREATED' = 'CREATED'
}

export enum OrderPayStatus {
  'NOT_PAID' = 'NOT_PAID',
  'PART_PAID' = 'PART_PAID',
  'PAID' = 'PAID',
}
