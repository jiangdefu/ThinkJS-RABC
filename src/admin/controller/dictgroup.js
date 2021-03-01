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
    /**
     * 加载页面
     */
    async indexAction(){
        return this.display();
    }
    /**
     * 加载字典组列表
     */
    async loaddictgroupAction(){
        let  data = await this.model("dictgroup").loadDictGroupTable(this.post("pid")||0,this.post("offset"),this.post("limit"),"id",this.param("param"));
        think.log(data);
        return this.json(data);
    }
    /**
     * 编辑
     */
    async editAction(){
        return this.display();
    }
    async editdictgroupAction(){
        
    }
    /**
     * 添加
     */
    async addAction(){
        return this.display();
    }
    async adddictgroupAction(){

    }   
    /**
     * 加载字典组树
     */
    async loadtreeAction(){
        let result =  await this.model("dictgroup").loadDictGroupTree();
        return this.json(result);
    }
    /**
     *设置状态 
     */
    async statusAction(){
        let rsp = {
            status:-1,
            msg:think.config("message.fail_msg")
        }
        if(!think.isEmpty(this.param("id"))&&!think.isEmpty(this.param("status"))){
            let result = await this.model("dictgroup").updateStatus(this.param("id"),this.param("status"));
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
}