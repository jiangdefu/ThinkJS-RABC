// +----------------------------------------------------------------------
// | ThinkJS-RABC [ 通用权限管理系统 ]
// +----------------------------------------------------------------------
// | Nanjing Digital Technology Co., Ltd.
// +----------------------------------------------------------------------
// | Copyright (c) 2021 http://www.51-health.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: devlincms <devlincms@163.com>
// +----------------------------------------------------------------------
// | Create: 2021-02-25
// +----------------------------------------------------------------------

'use strict';
/**
 * model
 */
export default class extends think.model.base {
  async getParaDetailByCode(code){
    let source = await getRedisValue("db-env");
    let status = await this.model('para_detail',source).where({para_code:code,status:1}).select();
    return status
  }
}