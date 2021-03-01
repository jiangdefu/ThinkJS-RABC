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
/**
 * model
 */
export default class extends  think.model.base  {
    /**
     * 获取Offer
     * @param {*} offer_id 
     */
    async getProductByOfferId(offer_id){
      if(!think.isEmpty(offer_id)){
        let source = await getRedisValue("db-env"); 
        let offer = await this.model('offer',source).where({OFFER_ID:offer_id}).find();
        return offer;
      }
      return null;
    }
    async getOfferStatus(){
      let source = await getRedisValue("db-env");
      let offerStatus = await this.model('para_detail',source).where({para_code:'OFFER_DETAIL_STATUS',status:1}).select();
      return offerStatus;
    }
    /**
     * 加载产商品表格
     * @param {*} status 
     * @param {*} offset 
     * @param {*} limit 
     * @param {*} order 
     * @param {*} param 
     */
    async loadProductTable(status,offer_id,product_id,offset,limit,order,param){
      let str_obj = "1=1 ";
      if(!think.isEmpty(status)&&status!="-1"){
          str_obj=str_obj+" AND a.STATUS="+status;
      }
      if(!think.isEmpty(param)){
          str_obj=str_obj+" AND a.OFFER_NAME LIKE "+"%"+param+"%";
      }
      if(!think.isEmpty(offer_id)){
        str_obj=str_obj+" AND a.OFFER_ID = "+offer_id;;
      }
      if(!think.isEmpty(product_id)){
        str_obj=str_obj+" AND c.REF_OFFER_ID = "+product_id;;
      }
      let source = await getRedisValue("db-env");
      let data = await this.model("offer",source).alias('a')
      .field('a.OFFER_ID,a.OFFER_TYPE,a.OFFER_NAME,a.STATUS,c.REF_OFFER_ID')
      .join({
        table: 'offer_mapper', 
        join: 'left', //join 方式，有 left, right, inner 3 种方式
        as: 'c', // 表别名
        on: ['a.offer_id', 'c.offer_id'] //ON 条件
      })
      .where(str_obj).order( order+" desc").limit(offset,limit).select();
      let count = await this.model("offer",source).alias('a').join({
        table: 'offer_mapper', 
        join: 'left', //join 方式，有 left, right, inner 3 种方式
        as: 'c', // 表别名
        on: ['a.offer_id', 'c.offer_id'] //ON 条件
      })
      .where(str_obj).count('a.offer_id');
      let offerStatus = await this.model('para_detail',source).where({para_code:'OFFER_DETAIL_STATUS',status:1}).select();
      if(data&&data.length>0){
        data.forEach(temp=>{
          offerStatus.forEach(p=>{
            if(p.PARA_VALUE==temp.STATUS){
              temp['STATUS_TEXT'] = p.PARA_NAME+"("+temp.STATUS+")";
            }
          })
          temp["OFFER_TYPE_TEXT"] = think.config("constant.offerType")[temp.OFFER_TYPE]+"("+temp.OFFER_TYPE+")";
        })
      }
      return {total:count,rows:data};
    }
    /**
     * 更新产品状态
     * @param {*} offer_id 
     * @param {*} status 
     */
    async updateStatus(offer_id,status){
      let source = await getRedisValue("db-env");
      return await this.model("offer",source).where({OFFER_ID: offer_id}).update({STATUS: status});
    }

    /**
     * 加载规格列表
     * @param {*} status 
     * @param {*} offer_id 
     * @param {*} name 
     * @param {*} offset 
     * @param {*} limit 
     * @param {*} order 
     * @param {*} param 
     */
    async loadChaSpecTable(status,offer_id,name,offset,limit,order,param){
      let source = await getRedisValue("db-env");
      let sql = "select a.CHA_GROUP_ID,a.CHA_GROUP_NAME,b.RELATION_ID,b.STATUS,c.OFFER_NAME,c.OFFER_ID,d.POOL_NAME,d.POOL_ID "
        +"from "+this.model("offer",source).tablePrefix+"cha_group a,"
        +""+this.model("offer",source).tablePrefix+"offer_cha_group_rel b,"
        +""+this.model("offer",source).tablePrefix+"offer c, "
        +""+this.model("offer",source).tablePrefix+"pool d "
        +" where a.CHA_GROUP_ID = b.CHA_GROUP_ID and b.OFFER_ID=c.OFFER_ID and d.POOL_ID=b.POOL_ID";
      let sqlCount = "select count(1) as count from "+this.model("offer",source).tablePrefix+"cha_group a, "+this.model("offer",source).tablePrefix+"offer_cha_group_rel b,"+this.model("offer",source).tablePrefix+"offer c where a.CHA_GROUP_ID = b.CHA_GROUP_ID and b.OFFER_ID=c.OFFER_ID";
      if(!think.isEmpty(status)&&status!="-1"){
        sql=sql+" AND b.STATUS="+status;
        sqlCount=sqlCount+" AND b.STATUS="+status;
      }
      if(!think.isEmpty(param)){
        sql=sql+" AND a.CHA_GROUP_NAME LIKE "+"%"+param+"%";
        sqlCount=sqlCount+" AND a.CHA_GROUP_NAME LIKE "+"%"+param+"%";
      }
      if(!think.isEmpty(offer_id)){
        sql=sql+" AND b.OFFER_ID = '"+offer_id+"'";
        sqlCount=sqlCount+" AND b.OFFER_ID = '"+offer_id+"'";
      }
      if(!think.isEmpty(name)){
        sql=sql+" AND a.CHA_GROUP_ID = "+name;
        sqlCount=sqlCount+" AND a.CHA_GROUP_ID = "+name;
      }
      let count = await this.model("cha_group",source).query(sqlCount);
      sql=sql+" order by  b."+order+" desc limit "+offset+","+limit;
      let data = await this.model("cha_group",source).query(sql);
      let paraStatus = await this.model('para').getParaDetailByCode("STATUS");
      if(data&&data.length>0&&paraStatus&&paraStatus.length>0){
        data.forEach(ele=>{
          paraStatus.forEach(e=>{
            if(ele.STATUS==e.PARA_VALUE){
              ele['STATUS_TEXT'] = e.PARA_NAME;
            }
          })
        })
      }
      return {total:count[0].count,rows:data};
    }

    async updateChaGroupStatus(id,status){
      let source = await getRedisValue("db-env");
      return await this.model('offer_cha_group_rel',source).where({RELATION_ID:id}).update({STATUS:status});
    }
    /**
     * 获取各个状态产品数量
     */
    async getAllProductCount(){
      let source = await getRedisValue("db-env");
      //配置数据
      let config = await this.model('offer',source).where({status:1}).count();
      //内侧数据
      let innerTest = await this.model('offer',source).where({status:3}).count();
      //公测数据
      let publicTest = await this.model('offer',source).where({status:4}).count();
      //上架商品
      let business = await this.model('offer',source).where({status:8}).count();

      return {
        config:config,
        innerTest:innerTest,
        publicTest:publicTest,
        business:business,
      }
    }
    /**
     * 加载资费
     * @param {*} offer_id 
     * @param {*} cha_group_id 
     * @param {*} price_id 
     * @param {*} offset 
     * @param {*} limit 
     * @param {*} order 
     * @param {*} param 
     */
    async getAllPriceInfo(offer_id,cha_group_id,price_id,offset,limit,order,param){
      let source = await getRedisValue("db-env");
      let sql = "select a.CHA_GROUP_ID,a.CHA_GROUP_NAME,c.OFFER_NAME,c.OFFER_ID,d.PRICE_ID,d.PRICE_NAME,e.RELATION_ID,e.STATUS "
        +"from "+this.model("offer",source).tablePrefix+"cha_group a,"
        +""+this.model("offer",source).tablePrefix+"offer c, "
        +""+this.model("offer",source).tablePrefix+"price d, "
        +""+this.model("offer",source).tablePrefix+"offer_price_rel e "
        +"where d.PRICE_ID = e.PRICE_ID and e.OFFER_ID=c.OFFER_ID and e.REL_ID=a.CHA_GROUP_ID and e.REL_TYPE=1";
      let sqlCount = "select count(1) as count "
        +"from "+this.model("offer",source).tablePrefix+"cha_group a,"
        +""+this.model("offer",source).tablePrefix+"offer c, "
        +""+this.model("offer",source).tablePrefix+"price d, "
        +""+this.model("offer",source).tablePrefix+"offer_price_rel e "
        +"where d.PRICE_ID = e.PRICE_ID and e.OFFER_ID=c.OFFER_ID and e.REL_ID=a.CHA_GROUP_ID and e.REL_TYPE=1";
      if(!think.isEmpty(cha_group_id)){
        sql=sql+" AND a.CHA_GROUP_ID="+cha_group_id;
        sqlCount=sqlCount+" AND a.CHA_GROUP_ID="+cha_group_id;
      }
      if(!think.isEmpty(param)){
        sql=sql+" AND d.PRICE_NAME LIKE "+"%"+param+"%";
        sqlCount=sqlCount+" AND d.PRICE_NAME LIKE "+"%"+param+"%";
      }
      if(!think.isEmpty(offer_id)){
        sql=sql+" AND e.OFFER_ID = '"+offer_id+"'";
        sqlCount=sqlCount+" AND e.OFFER_ID = '"+offer_id+"'";
      }
      if(!think.isEmpty(price_id)){
        sql=sql+" AND d.PRICE_ID = "+price_id;
        sqlCount=sqlCount+" AND d.PRICE_ID = "+price_id;
      }
      let count = await this.model("offer",source).query(sqlCount);
      sql=sql+" order by  d."+order+" desc limit "+offset+","+limit;
      let data = await this.model("offer",source).query(sql);
      let paraStatus = await this.model('para').getParaDetailByCode("STATUS");
      if(data&&data.length>0&&paraStatus&&paraStatus.length>0){
        data.forEach(ele=>{
          paraStatus.forEach(e=>{
            if(ele.STATUS==e.PARA_VALUE){
              ele['STATUS_TEXT'] = e.PARA_NAME;
            }
          })
        })
      }
      return {total:count[0].count,rows:data};
    }
    /**
     * 更新资费状态
     * @param {*} relationId 
     * @param {*} status 
     */
    async updatePriceStatus(relationId,status){
      let source = await getRedisValue("db-env");
      return await this.model('offer_price_rel',source).where({RELATION_ID:relationId}).update({STATUS:status});
    }
}