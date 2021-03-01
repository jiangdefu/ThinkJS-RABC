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

import Base from './base.js';

export default class extends Base {

    init(http){
        this.http = http;
    }

    indexAction(){
        this.model("dict").getDictByGroupCode(null);
        return this.display();
    }
    /**
     * 加载字典数据
     */

    async loaddictAction(){
        let result = await this.model("dict").loadDictTable(this.param("gid")||0,this.param("offset"),this.param("limit"),"id",this.param("param"));
        return this.json(result);
    }
    /**
     * 更新状态
     */
    async statusAction(){
         let rsp = {
            status:-1,
            msg:think.config("message.fail_msg")
        }
        if(!think.isEmpty(this.param("id"))&&!think.isEmpty(this.param("status"))){
            let result = await this.model("dict").updateStatus(this.param("id"),this.param("status"));
            if(!think.isEmpty(result)){
                rsp.status = 1;
                rsp.msg = think.config("message.success_msg");
            }
        }   
        else{
            rsp.msg = think.config("message.empty_param");
        }
        return this.json(rsp);
    }
    /**
     * 添加字典
     */
    async addAction(){
        return this.display();
    }
    /**
     * 编辑字典
     */
    async editAction(){
        if(!think.isEmpty(this.param("id"))){
            let result = await this.model("dict").findDict(this.param("id"));
            this.assign("dict",result);
        }
        return this.display();
    }
    async editdictAction(){
        let rsp = {
            status:0,
            msg:think.config("message.empty_param")
        }
        let dict = {};
      
        if(!think.isEmpty(this.param("code"))){
            dict.code = this.param("code");
        }
        if(!think.isEmpty(this.param("name"))){
            dict.name = this.param("name");
        }
        if(!think.isEmpty(this.param("value"))){
            dict.value = this.param("value");
        }
        if(!think.isEmpty(this.param("status"))){
            dict.status = this.param("status");
        }
        if(!think.isEmpty(this.param("id"))){
            dict.id = this.param("id");
            let result  = await this.model("dict").updateDict(dict);
            if(result.status==-2){
                rsp.status = 0;
                rsp.msg = think.config("message.data_exist_msg");
            }
            else if(result.status==-1){
                rsp.status = 0;
                rsp.msg = think.config("message.fail_msg");
            }
            else{
                rsp.status = result.status;
                rsp.msg = think.config("message.success_msg");
            }
        }
        return this.json(rsp);
    }
    /**
     * 添加字典值
     */
    async adddictAction(){
        let rsp = {
            status:-1,
            msg:think.config("message.empty_param")
        }
        let dict = {
            status:1,
            delstatus:1
        };
        if(!think.isEmpty(this.param("code"))){
            dict.code = this.param("code");
        }
        if(!think.isEmpty(this.param("gid"))){
            dict.gid = this.param("gid");
        }
        if(!think.isEmpty(this.param("name"))){
            dict.name = this.param("name");
        }
        if(!think.isEmpty(this.param("value"))){
            dict.value = this.param("value");
        }
        let result = await this.model("dict").addDict(dict);
        if(!think.isEmpty(result)){
            if(result.status==1){
                rsp.status = result.status;
                rsp.msg = think.config("message.success_msg");
            }
            else if(result.status==2){
                rsp.status = 0;
                rsp.msg = think.config("message.data_exist_msg");
            }
            else{
                rsp.status = 0;
                rsp.msg = think.config("message.fail_msg");
            }
        }
        return this.json(rsp);
    }
    /**
     * 删除
     */
    async delAction(){
        let rsp = {
            status:0,
            msg:think.config("message.empty_param")
        }
        if(!think.isEmpty(this.param("id"))){
            let result = await this.model("dict").delDict(this.param("id"));
            if(!think.isEmpty(result)){
                rsp.status = 1
                rsp.msg = think.config("message.del_success_msg");
            }
            else{
                 rsp.msg = think.config("message.del_fail_msg");
            }
        }
        return this.json(rsp);
    }
    /**
     * 获取所有图标
     */
    async geticonAction(){
        return await this.model("dict").getDictByGroupCode("sys_dict_group_icon");
    }
}