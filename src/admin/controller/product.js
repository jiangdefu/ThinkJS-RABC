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
  /**
   * 页面加载
   */
  async infoAction(){
    let offerStatus = await this.model('product').getOfferStatus();
    this.assign('offerstatus',offerStatus);
    return this.display();
  }

  async loadAction(){
    let result = await this.model("product").loadProductTable(this.param("offer_status"),this.param("offer_id"),this.param("product_id"),this.param("offset"),this.param("limit"),"OFFER_ID",this.param("param"));
    return this.json(result);
  }

  async statusAction(){
    let offerStatus = this.model('product').getOfferStatus();
    this.assign('status',this.param('status'));
    this.assign('offer_id',this.param('id'));
    this.assign('offerstatus',offerStatus);
    return this.display();
  }

  async updatestatusAction(){
    if(!think.isEmpty(this.param('offer_id'))&&!think.isEmpty(this.param('status'))){
      let result  = await this.model('product').updateStatus(this.param('offer_id'),this.param('status'));
      return this.json({status:1,msg:think.config("message.success_msg")});
    }
    return this.json({status:0,msg:think.config("message.empty_param")});
  }

  async chagroupAction(){
    let offer_id = this.param("offer_id");
    let status =await this.model('para').getParaDetailByCode('STATUS');
    // let offer = await this.model('product').getProductByOfferId(offer_id);
    // this.assign("offer",offer);
    this.assign("status",status);
    this.assign("offer_id",offer_id);
    this.display();
  }
  /**
   * 加载规格
   */
  async loadchaspacAction(){
    let result = await this.model("product").loadChaSpecTable(this.param("status"),this.param("offer_id"),this.param("cha_group_id"),this.param("offset"),this.param("limit"),"CHA_GROUP_ID",this.param("param"));
    return this.json(result);
  }

  async chagroupstatusAction(){
    if(!think.isEmpty(this.param('id'))&&!think.isEmpty(this.param('status'))){
      let result = await this.model("product").updateChaGroupStatus(this.param("id"),this.param("status"));
      return this.json({status:1,msg:think.config("message.success_msg")});
    }
    return this.json({status:0,msg:think.config("message.empty_param")});
  }

  async priceAction(){
    let paraStatus = await this.model('para').getParaDetailByCode("STATUS");
    this.assign('status',paraStatus);
    this.assign("offer_id",this.param("offer_id")||"");
    return this.display();
  }

  async loadpriceAction(){
    let result = await this.model('product').getAllPriceInfo(this.param("offer_id"),this.param("cha_group_id"),this.param("price_id"),this.param("offset"),this.param("limit"),"PRICE_ID",this.param("param"));
    return this.json(result);
  }

  async pricestatusAction(){
    if(!think.isEmpty(this.param('relation_id'))&&!think.isEmpty(this.param('status'))){
      let result  = await this.model('product').updatePriceStatus(this.param('relation_id'),this.param('status'));
      return this.json({status:1,msg:think.config("message.success_msg")});
    }
    return this.json({status:0,msg:think.config("message.empty_param")});
  }
}