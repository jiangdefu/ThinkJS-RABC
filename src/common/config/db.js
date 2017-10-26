'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: '139.224.132.74',
      //host:'127.0.0.1',
      port: '3306',
      database: 'rabc',
      user: 'root',
      password: 'NJDIG@2017shuyao.com',
      prefix: 'rabc_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};