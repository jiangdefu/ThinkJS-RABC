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
     * 记录操作日志
     * @param {*} ip  客户端IP
     * @param {*} url 操作URL
     * @param {*} param 传递参数
     * @param {*} user 当前登陆的用户
     */
    async recodeLog(ip,url,param,username,userid){
        let log ={
            ip:ip,
            url:url,
            param:param,
            username:username,
            userid:userid,
            create_time:Format(new Date(),"yyyy-MM-dd hh:mm:ss")
        }
        await this.model("log").add(log);
    }
    /**
     * 加载日志表格
     * @param {*} limit 
     * @param {*} offset 
     * @param {*} ip        客户端IP地址
     * @param {*} address   请求地址
     * @param {*} username  用户名
     * @param {*} startTime 开始时间
     * @param {*} endTime   结束时间
     */
    async loadLogTable(limit,offset,ip,address,username,startTime,endTime){
        let data = {
            total:0,
            rows:[]
        }
        let str_where ='1=1 ';
        if(!think.isEmpty(ip)){
            str_where = str_where+" and ip ='"+ip+"'";
        }
        if(!think.isEmpty(address)){
            str_where = str_where+" and url like '%"+address+"%'";
        }
        if(!think.isEmpty(username)){
            str_where = str_where+" and username = '"+username+"'";
        }
        if(!think.isEmpty(startTime)){
             str_where = str_where+" and create_time > ="+startTime+"";
        }
        if(!think.isEmpty(endTime)){
             str_where = str_where+" and create_time < ="+endTime+"";
        }
        let countSql = await this.model("log").where(str_where).count();
        if(countSql>0){
            data.total = countSql;
            let result = await this.model("log").where(str_where).order("create_time desc").limit(offset,limit).select();
            data.rows = result;
        }
        return data;
    }
    
}
