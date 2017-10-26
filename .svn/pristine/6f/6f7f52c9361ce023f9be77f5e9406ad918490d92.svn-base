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
    /**
     * 系统日志信息
     */
    async indexAction(){
        return this.display();
    }
    /**
     * 加载日志
     */
    async loadlogAction(){
        let data =  await this.model("log").loadLogTable(this.post("limit"),this.post("offset"),this.post("ip"),this.post("address"),this.post("startTime"),this.post("endTime"));
        return this.json(data);
    }
}