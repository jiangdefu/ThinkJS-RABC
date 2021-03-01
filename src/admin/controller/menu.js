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
    async indexAction(){
        let pid = this.param("pid")||0;
        this.assign("pid",pid);
        return this.display();
    }
    /**
     * 加载数据
     */
    async loadmenuAction(){
        let  data = await this.model("menu").loadMenuTable(this.post("pid")||0,this.post("offset"),this.post("limit"),"sort",this.param("param"));
        return this.json(data);
    }
    /**
     * 新增菜单
     */
    async addAction(){
        let icon = await this.model("dict").getDictByGroupCode("sys_dict_group_icon");
        if(!think.isEmpty(icon)){
            this.assign("icon",icon);
        }
        return this.display();
    }
    async addmenuAction(){
        let menu = {};
        let response_data ={
            status:1,
            msg:think.config("message.success_msg")
        }
        if(!think.isEmpty(this.param("code"))){
            menu.code = this.param("code");
        }
        else{
            response_data.status = 0;
            response_data.msg = think.config("message.empty_param")
            return this.json(response_data);
        }
        if(!think.isEmpty(this.param("url"))){
            menu.url = this.param("url");
        }
        else{
            response_data.status = 0;
            response_data.msg = think.config("message.empty_param")
            return this.json(response_data);
        }
        if(!think.isEmpty(this.param("name"))){
            menu.name = this.param("name");
            menu.briefname = this.param("name");
        }
        else{
            response_data.status = 0;
            response_data.msg = think.config("message.empty_param")
            return this.json(response_data);
        }
        if(!think.isEmpty(this.param("ismenu"))){
            menu.ismenu = this.param("ismenu");
        }
        else{
            response_data.status = 0;
            response_data.msg = think.config("message.empty_param")
            return this.json(response_data);
        }
        if(!think.isEmpty(this.param("sort"))){
            menu.sort = this.param("sort");
        }
        else{
            response_data.status = 0;
            response_data.msg = think.config("message.empty_param")
            return this.json(response_data);
        }
        if(!think.isEmpty(this.param("icon"))){
            menu.icon = this.param("icon");
        }
        else{
            response_data.status = 0;
            response_data.msg = think.config("message.empty_param")
            return this.json(response_data);
        }
        if(!think.isEmpty(this.param("pid"))){
            menu.pid = this.param("pid");
        }
        else{
            response_data.status = 0;
            response_data.msg = think.config("message.empty_param")
            return this.json(response_data);
        }
        menu.status = 1;
        menu.create_time = times(new Date(),true);
        let res = await this.model("menu").addMenu(menu);
        if(!think.isEmpty(res)){
            if(res.type=='exist'){
                response_data.status = 0;
                response_data.msg = think.config("message.data_exist_msg")
            }
        }
        else{
            response_data.status = 0;
            response_data.msg = think.config("message.fail_msg")
        }
        return this.json(response_data);
    }
    /**
     * 编辑
     */
    async editAction(){
        if(!think.isEmpty(this.param("id"))){
            let menu = await this.model("menu").findMenuById(this.param("id"));
            if(menu.pid!=0){
                let pmenu = await this.model("menu").findMenuById(menu.pid);
                menu.pidName = pmenu.name;
            }
            this.assign("menu",menu);
        }
        let icon = await this.model("dict").getDictByGroupCode("sys_dict_group_icon");
        if(!think.isEmpty(icon)){
            this.assign("icon",icon);
        }
        return this.display();
    }
    /**
     * 编辑
     */
    async editmenuAction(){
        let response_data ={
            status:1,
            msg:think.config("message.success_msg")
        }
        if(!think.isEmpty(this.param("id"))){
            let menu = {
                id:this.param("id"),
            }
            if(!think.isEmpty(this.param("pid"))){
                menu.pid = this.param("pid");
            }
            if(!think.isEmpty(this.param("menu_name"))){
                menu.name = this.param("menu_name");
            }
            if(!think.isEmpty(this.param("code"))){
                menu.code = this.param("code");
            }
            if(!think.isEmpty(this.param("url"))){
                menu.url = this.param("url");
            }
            if(!think.isEmpty(this.param("icon"))){
                menu.icon = this.param("icon");
            }
            if(!think.isEmpty(this.param("sort"))){
                menu.sort = this.param("sort");
            }
            if(!think.isEmpty(this.param("ismenu"))){
                menu.ismenu = this.param("ismenu");
            }
            let bRet = await this.model("menu").updateMenuById(menu);
            if(bRet.result==-1){
                response_data.status = 0;
                response_data.msg = think.config("message.code_exist_msg")
            }
            else if(bRet.result==0){
                response_data.status = 0;
                response_data.msg = think.config("message.fail_msg")
            }
        }
        else{
            response_data.status = 0;
            response_data.msg = think.config("message.empty_param")
        }
        return this.json(response_data);
    }
    /**
     * 删除
     */
    async delAction(){
        let response_data ={
            status:0,
            msg:think.config("message.empty_param")
        }
        if(!think.isEmpty(this.param("id"))){
            let res = this.model("menu").delMenu(this.param("id"));
            if(!think.isEmpty(res)){
                response_data.status = 1;
                response_data.msg=think.config("message.del_success_msg");
            }
            else{
                response_data.status = 0;
                response_data.msg=think.config("message.del_fail_msg");
            }
        }
      
        return this.json(response_data);    
    }
    /**
     * 排序
     */
    async sortAction(){
        let response_data ={
            status:0,
            msg:think.config("message.empty_param")
        }
        if(!think.isEmpty(this.param("menu"))){
            let result = await this.model("menu").sortMenu(JSON.parse(this.param("menu")));
            if(!think.result){
                response_data.status = 1;
                response_data.msg = think.config("message.success_msg");
            }
            else{
                response_data.msg = think.config("message.fail_msg");
            }
        }
        return this.json(response_data);    
    }
    /**
     * 菜单树
     */
    async loadtreeAction(){
        let data = await this.model("menu").loadtree();
        return this.json(data);
    }
    /**
     * 加载操作权限菜单树（包含操作权限）
     */
    async loadrabctreeAction(){
        let data = await this.model("menu").loadrabctree();
        if(!think.isEmpty(this.param("type"))){    
            if(this.param("type")=="user"){     //加载用户权限关系
                if(!think.isEmpty(this.param("id"))){
                    let user_menu_data  = await this.model("rabc").getRabcByGid(this.param("id"),0)
                    data.forEach(element => {
                        user_menu_data.forEach(function(ele){
                            if(element.id==ele.id){
                                element.checked = true;
                            }
                        })
                    });
                }
            }
            else if(this.param("type")=="usergroup"){   //加载用户组权限关系
                if(!think.isEmpty(this.param("id"))){
                    let group_menu_data  = await this.model("rabc").getRabcByGid(this.param("id"),1);
                    data.forEach(element => {
                        group_menu_data.forEach(function(ele){
                            if(element.id==ele.id){
                                element.checked = true;
                            }
                        })
                    });
                }
            }
        }
        return this.json(data);
    }
}