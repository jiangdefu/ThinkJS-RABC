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
     /**
     * 加载字典组表格
     * @param {*} pid 
     * @param {*} offset 
     * @param {*} limit 
     * @param {*} order 
     * @param {*} param 
     */
    async loadDictTable(gid,offset,limit,order,param){
        let str_obj = {delstatus:1};
        if(!think.isEmpty(gid)&&gid!=0){
            str_obj.gid = gid;
        }
        if(!think.isEmpty(param)){
            str_obj.name = param;
        }
        let data = await this.model("setup").where(str_obj).order( order+" desc").limit(offset,limit).select();
        let count = await this.model("setup").where(str_obj).count();
        return {total:count,rows:data};
    }
    /**
     * 更新状态
     * @param {*} id 
     * @param {*} status 
     */
    async updateStatus(id,status){
        return await this.model("setup").where({id:id}).update({status:status});
    }
    /**
     * 添加字典
     * @param {*} dict 
     */
    async addDict(dict){
        let bret = {
            status:0
        }
        let result = await this.model("setup").thenAdd(dict,{code:dict.code,delstatus:1});
        if(!think.isEmpty(result)){
            if(result.type=='exist'){
                bret.status = 2;
            }
            else{
                bret.status = 1;
            }
        }
        return bret;
    }
    /**
     * 删除字典
     * @param {*} id 
     */
    async delDict(id){
        //逻辑删除
        return await this.model("setup").where({id:id}).update({delstatus:0});
    }
    /**
     * 查找字典
     * @param {*} id 字典主键
     */
    async findDict(id){
        return await this.model("setup").where({id:id}).find();
    }
    /**
     * 更新字典
     * @param {*} dict 
     */
    async updateDict(dict){
        let result = await this.model("setup").where({code:dict.code,delstatus:1}).find();
        let bret ={status:1};
        if(think.isEmpty(result)){
            bret.status = -2;
        }
        else{
            let upBret = await this.model("setup").where({id:dict.id}).update(dict);
            if(think.isEmpty(upBret)){
                bret.status = -1;
            }
        }
        return bret;
    }
    /**
     * 根据组编号获取字典值
     * @param {*} groupCode 
     */
    async getDictByGroupCode(groupCode){
        let sql = "select * from "+this.tablePrefix+"setup where gid=( select id from "+this.tablePrefix+"setup_group where code='"+groupCode+"') and status = 1 and delStatus=1";
        return await this.model("setup").query(sql);
    }

    /**
     * 通过code查找字典值
     * @param {*} code 
     */
    async findByCode(code){
        return await this.model("setup").where({status:1,delstatus:1,code:code}).find();
    }
}