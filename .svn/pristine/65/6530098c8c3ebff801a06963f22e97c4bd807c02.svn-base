// +----------------------------------------------------------------------
// | ThinkJS-RABC [ 通用权限管理系统 ]
// +----------------------------------------------------------------------
// | Nanjing Digital Technology Co., Ltd.
// +----------------------------------------------------------------------
// | Copyright (c) 2017 http://www.51-health.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: Devlin <Devlinheart@qq.com>
// +----------------------------------------------------------------------
// | Create: 2017-06-20
// +----------------------------------------------------------------------

'use strict';
/**
 * model
 */
export default class extends think.model.base {
    /**
     * 通过用户名称和密码查找登陆用户
     * @param {*} username 
     * @param {*} password 
     */
    async findUser(username,password){
        return this.model("user").where({username:username,password:password,delstatus:1}).find();
    }

      /**
     * 加载字典组表格
     * @param {*} gid 
     * @param {*} offset 
     * @param {*} limit 
     * @param {*} order 
     * @param {*} param 
     */
    async loadUserTable(gid,offset,limit,order,param){
        let str_obj = {delstatus:1};
        if(!think.isEmpty(gid)&&gid!=0){
            str_obj.gid = gid;
        }
        if(!think.isEmpty(param)){
            str_obj.name = param;
        }
        let data = await this.model("user").where(str_obj).order( order+" desc").limit(offset,limit).select();
        let count = await this.model("user").where(str_obj).count();
        return {total:count,rows:data};
    }
}