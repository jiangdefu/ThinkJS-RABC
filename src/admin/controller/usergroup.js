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

import Base from './base.js';

export default class extends Base {

    init(http){
        this.http = http;
    }
    indexAction(){
        return this.display();
    }
    /**
     * 加载表格
     */
    async loadusergroupAction(){
        let result = await this.model("usergroup").loadUserGroupTable(this.param("pid"),this.param("offset"),this.param("limit"),"id",this.param("param"));
        return this.json(result);
    }
    /**
     * 加载用户组树节点
     */
    async loadtreeAction(){
        let result =  await this.model("usergroup").loaduserGroupTree();
        return this.json(result);
    }
    /**
     * 新增用户组
     */
    addAction(){
        return this.display();
    }
    async addusergroupAction(){
        let rsp = {
            status:-1,
            msg:think.config("message.empty_param")
        }
        let userGroup = {
            status:1,
            delstatus:1
        };
        if(!think.isEmpty(this.param("code"))){
            userGroup.code = this.param("code");
        }
        if(!think.isEmpty(this.param("status"))&&this.param("status")=='on'){
            userGroup.status = 1;
        }
        else{
            userGroup.status = 0;
        }
        userGroup.pid = this.param("pid")||0;
        if(!think.isEmpty(this.param("name"))){
            userGroup.name = this.param("name");
            userGroup.briefname = this.param("name");            
        }
        let result = await this.model("usergroup").addUserGroup(userGroup);
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
            let result = await this.model("usergroup").delUserGroup(this.param("id"));
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
}