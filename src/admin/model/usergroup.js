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
     * 通过用户查找所在用户组
     * @param {*} userId  //当前登陆用户 
     */
    async getGroupByUserId(userId){
        let user = await this.model("user").findUserById(userId);
        if(!think.isEmpty(user)){
            return await this.model("group").where({id:user.gid}).find();
        }
        else{
            return null;
        }
    }
        
     /**
     * 加载用户组Tree表格
     */
    async loadUserGroupTreeTable(){
        let result  = await this.model("group").where({delstatus:1,status:1}).select();
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
    async loadUserGroupTable(pid,offset,limit,order,param){
        let str_obj = {delstatus:1};
        if(!think.isEmpty(pid)){
            str_obj.pid = pid;
        }
        if(!think.isEmpty(param)){
            str_obj.name = param;
        }
        let data = await this.model("group").where(str_obj).order( order+" desc").limit(offset,limit).select();
        let count = await this.model("group").where(str_obj).count();
        return {total:count,rows:data};
    }
    /**
     * 更新用户组
     * @param {*} userGroup 
     */
    async updateuserGroup(userGroup){
         return await this.model("group").where({id:userGroup.id}).update(userGroup); 
    }
    /**
     * 添加用户组
     * @param {*} userGroup 
     */
    async addUserGroup(userGroup){
        let bret = {
            status:0
        }
        let result = await this.model("group").thenAdd(userGroup,{code:userGroup.code,delstatus:1});
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
     * 加载用户组树结构
     */
    async loaduserGroupTree(){
        let result = await this.model("group").where({delstatus:1,status:1}).select();
        let treeList = new Array();
        treeList.push({id:0,pid:-1,name:"用户组",code:"user_group",open:true});
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
        return await this.model("group").where({id:id}).update({status:status});
    }

     /**
     * 删除用户组
     * @param {*} id 
     */
    async delUserGroup(id){
        //逻辑删除
        return await this.model("group").where({id:id}).update({delstatus:0});
    }

}