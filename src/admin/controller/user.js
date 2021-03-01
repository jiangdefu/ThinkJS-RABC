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
        return this.display();
    }
    /**
     * 用户登陆
     */
    async loginAction(){
        if(this.isAjax()){
            if(think.isEmpty(this.post("username"))){
                return this.fail(think.config("msg.login_username_empty"));
            }
            if(think.isEmpty(this.post("password"))){
                return this.fail(think.config("msg.login_password_empty"));
            }
            if(think.config("superlogin")==this.post("username")){
                if(this.post("username")==think.config("superuser")&&think.md5(this.post("password")).toUpperCase()==think.config("superpassword").toUpperCase()){
                    let user  = await this.model("user").findUser(this.post("username"),think.md5(this.post("password")).toUpperCase());
                    if(!think.isEmpty(user)){
                        user.menu = await this.model("user").getUserMenu(user);
                        this.model("user").getUserMenu(user);
                        return this.success({url:"/admin/main/index"},'登陆成功');
                    }
                    else{
                        return this.fail(-1,think.config("msg.login_password_incorrect")); 
                    }
                }
                else{
                    return this.fail(-1,think.config("msg.login_password_incorrect"));
                }
            }
            else{
                let user  = await this.model("user").findUser(this.post("username"),think.md5(this.post("password")).toUpperCase());
                if(!think.isEmpty(user)){
                    user.menu = await this.model("user").getUserMenu(user);
                    await this.session("userinfo",user);
                    return this.success({url:"/admin/main/index"},'登陆成功');
                }
                else{
                    return this.fail(-1,think.config("msg.login_password_incorrect")); 
                }
            }
        }
        else{
            return this.display();
        }       
    }
    /**
     * 锁屏
     */
    async lockAction(){
        let user = await this.session("userinfo");
        if(this.isAjax()){
            if(!think.isEmpty(user)){
                if(user.locked){
                    if(user.password.toUpperCase()==think.md5(this.param("password")).toUpperCase()){
                        user.locked = false;
                        await this.session("userinfo",user);
                        let url = "/admin/main/index";
                        if(!think.isEmpty(user.curr_url)&&user.curr_url!=think.config("lock_add")&&!in_array(user.curr_url,think.config("login_pass_add"))){
                            url = user.curr_url;
                        }
                        return this.success({url:url},"登陆成功");
                    }
                    else{
                        return this.fail(-1,"登陆失败");
                    } 
                }
            }
            else{
                return this.redirect("/admin/user/login");
            }
        }
        else{
            if(!think.isEmpty(user)){
                user.locked = true;
                await this.session("userinfo",user);
                this.assign("userinfo",user);
                return this.display();
            }
            else{
                return this.redirect("/admin/user/login");
            }
        }
    }
    /**
     * 退出登陆
     */
    async logoutAction(){
        await this.session("userinfo",null);
        return this.redirect("/admin/user/login");
    }
    /**
     * 个人信息
     */
    async profileAction(){
        return this.display();
    }
    /**
     * 加载表格用户
     */
    async loaduserAction(){
        let result = await this.model("user").loadUserTable(this.param("gid")||0,this.param("offset"),this.param("limit"),"id",this.param("param"));
        return this.json(result);
    }
    
    /**
     * 新增用户
     */
    async addAction(){
        return this.display();
    }
    /**
     * 编辑用户
     */
    async editAction(){
        if (!think.isEmpty(this.param("id"))){
            let user = await this.model("user").findUserById(this.param("id"));
            if(!think.isEmpty(user)){
                this.assign("user",user);
                return this.display();
            }
        }
        else{
            return this.fail(think.config("message.empty_param"));
        }
    }
    /**
     * 添加用户
     */
    async adduserAction(){
        if(!think.isEmpty(this.param())){
            let rsp = {
                status:-1,
                msg:think.config("message.empty_param")
            }
            let param = {
                code:this.param("code"),
                username:this.param("name"),
                phone:this.param("phone"),
                email:this.param("email"),
                sex:this.param("sex"),
                gid:this.param("gid"),
                status:this.param("status"),
                create_time:times(new Date(),true),
                password:think.md5("123456").toUpperCase(),
                delstatus:1,
            }
            let result = await this.model("user").addUser(param);
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
        else{
            return this.json( {
                status:-1,
                msg:think.config("message.empty_param")
            })
        }
    }
    /**
     * 编辑用户保存
     */
    async edituserAction(){
        if(!think.isEmpty(this.param("id"))){
            let user = {
                id:this.param("id"),
                username:this.param("name"),
                code:this.param("code"),
                phone:this.param("phone"),
                email:this.param("email"),
                sex:this.param("sex"),
                status:this.param("status"),
                gid:this.param("gid")
            }
            let bRet = await this.model("user").updateUserById(user);
            if(bRet.exist==1){
                return this.fail(think.config("message.code_exist_msg"));
            }
            else if(bRet.exist==-1){
                return this.fail(think.config("message.fail_msg"));
            }
            else{
                return this.json({status:1,msg:think.config("message.success_msg")});
            }
        }
        else{
            return this.fail(think.config("message.empty_param"));
        }
    }

    /**
     * 切换数据库
     */
    async changeAction(){
        if(!think.isEmpty(this.param("env"))){
           let result =  await setRedisValue("db-env",this.param("env"),3000000);
        }
        return this.json({status:1,msg:think.config("message.success_msg")});
    }
}