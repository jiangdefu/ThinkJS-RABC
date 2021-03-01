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
     * 分配权限
     */
    async allocAction(){
        let response_data ={
            status:0,
            msg:think.config("message.empty_param")
        }
        if(!think.isEmpty(this.param("rid"))&&!think.isEmpty(this.param("gstatus"))){
            let result = await this.model("rabc").allocRabc(this.param("rid"),this.param("mid"),this.param("gstatus"));
            if(!think.isEmpty(result)){
                response_data.status=1,
                response_data.msg = think.config("message.success_msg");
            }
        }
        return this.json(response_data);
    }

}