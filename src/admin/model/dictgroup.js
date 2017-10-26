// +----------------------------------------------------------------------
// | ThinkJS-RABC [ 通用权限管理系统 ] 
// +----------------------------------------------------------------------
// | Nanjing Digital Technology Co., Ltd.
// +----------------------------------------------------------------------
// | Copyright (c) 2017 http://www.51-health.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: Devlin <Devlinheart@qq.com>[ 南京数遥科技有限公司 ]
// +----------------------------------------------------------------------
// | Create: 2017-06-20
// +----------------------------------------------------------------------

'use strict';
/**
 * model
 */
export default class extends think.model.base {

    /**
     * 加载字典组Tree表格
     */
    async loadDictGroupTreeTable(){
        let result  = await this.model("setup_group").where({delstatus:1,status:1}).select();
        let data = null;
        if(!think.isEmpty(result)){
            
        }
        return data;
    }

    /**
     * 加载字典组表格
     * @param {*} pid 
     * @param {*} offset 
     * @param {*} limit 
     * @param {*} order 
     * @param {*} param 
     */
    async loadDictGroupTable(pid,offset,limit,order,param){
        let str_obj = {delstatus:1};
        if(!think.isEmpty(pid)){
            str_obj.pid = pid;
        }
        if(!think.isEmpty(param)){
            str_obj.name = param;
        }
        let data = await this.model("setup_group").where(str_obj).order( order+" desc").limit(offset,limit).select();
        let count = await this.model("setup_group").where(str_obj).count();
        return {total:count,rows:data};
    }
    /**
     * 更新字典组
     * @param {*} dictGroup 
     */
    async updateDictGroup(dictGroup){
         return await this.model("setup_group").where({id:dictGroup.id}).update(dictGroup); 
    }
    /**
     * 添加字典组
     * @param {*} dictGroup 
     */
    async addDictGroup(dictGroup){
        return await this.model("setup_group").thenAdd(dictGroup,{code:dictGroup.code,delstatus:1}); 
    }
    /**
     * 加载字典树
     */
    async loadDictGroupTree(){
        let result = await this.model("setup_group").where({delstatus:1,status:1}).select();
        let treeList = new Array();
        treeList.push({id:0,pid:-1,name:"字典组",code:"dict_group",open:true});
        result.forEach(function(element) {
             treeList.push({id:element.id,pid:0,name:element.name,code:element.code});
        }, this);
        return treeList;
    }
    /**
     * 更新状态
     * @param {*} id 
     * @param {*} status 
     */
    async updateStatus(id,status){
        return await this.model("setup_group").where({id:id}).update({status:status});
    }
}