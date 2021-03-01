'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
    type: 'mysql',
    adapter: {
        mysql: {
            host: '118.31.70.131',
            //host:'127.0.0.1',
            port: '3306',
            database: 'rabc',
            user: 'root',
            password: '1qaz@WSX',
            prefix: 'rabc_',
            encoding: 'utf8'
        },
        mysqlDev: {
            type: 'mysql',
            host: '10.139.13.128',
            //host:'127.0.0.1',
            port: '3306',
            database: 'upc',
            user: 'ucr_upc',
            password: 'ucr_u1_pc7',
            prefix: 'pm_',
            encoding: 'utf8'
        },
        mysql1: {
            type: 'mysql',
            host: '10.253.51.23',
            //host:'127.0.0.1',
            port: '3306',
            database: 'upc',
            user: 'ucr_upc',
            password: 'ucr_u1_pc7',
            prefix: 'pm_',
            encoding: 'utf8'
        },
        mysql2: {
            type: 'mysql',
            host: '10.253.91.125',
            //host:'127.0.0.1',
            port: '3306',
            database: 'upc',
            user: 'ucr_upc',
            password: 'ucr_upc_0830_18',
            prefix: 'pm_',
            encoding: 'utf8'
        },
        mongo: {

        }
    }
};