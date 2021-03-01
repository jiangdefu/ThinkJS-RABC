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
     * 查找用户或者用户组权限
     * @param {*} rid 用户组或者用户ID
     * @param {*} gstatus 用户还是用户组
     */
    async getRabcByGid(rid,gstatus){
        let rabc = await this.model("rabc").where({rid:rid,gstatus:gstatus}).find();
        let menu = [];
        if(!think.isEmpty(rabc)&&!think.isEmpty(rabc.mid)){
            let u_rabc = rabc.mid.split(",");
            menu = await this.model("menu").findMenuByIdArr(u_rabc);
        }
        return menu;
    }
    /**
     * 查找用户权限（包含所在用户组）
     * @param {*} uid 
     */
    async getUserRabc(uid){
        let userGroup = await this.model("usergroup").getGroupByUserId(uid);
        let group_rabc_arr = [];
        if(!think.isEmpty(userGroup)){
            let group_rabc = await this.model("rabc").where({rid:userGroup.id,gstatus:1}).find();
            if(!think.isEmpty(group_rabc)&&!think.isEmpty(group_rabc.mid)){
                group_rabc_arr = group_rabc.mid.split(",");
            }
        }
        let user_rabc = await this.model("rabc").where({rid:uid,gstatus:0}).find();
        let user_rabc_arr = [];
        if(!think.isEmpty(user_rabc)&&!think.isEmpty(user_rabc.mid)){
            user_rabc_arr = user_rabc.mid.split(",");
        }
        let all_rabc = group_rabc_arr.concat(user_rabc_arr);
        removeEmptyArrayEle(all_rabc);  //数组去空
        arr_unique(all_rabc);           //数组去重复
        //查找对应菜单权限
        let menu = await this.model("menu").findMenuByIdArr(all_rabc);

        return menu;
    }
    /**
     * 权限分配
     * @param {*} rid   关联的用户或者用户组ID
     * @param {*} mid   菜单ID
     * @param {*} gstatus 用户还是用户组
     */
    async allocRabc(rid,mid,gstatus){
        let rabc = await this.model("rabc").where({rid:rid,gstatus:gstatus}).find();
        if(!think.isEmpty(rabc)){
            return await this.model("rabc").where({rid:rid,gstatus:gstatus}).update({mid:mid});
        }
        else{
            return await this.model("rabc").add({
                rid:rid,
                mid:mid,
                gstatus:gstatus
            })
        }
    }
    
    
}