var Redis = require('ioredis');
global.io_redis = function() {
    return new Redis({
        port: think.config("redis.port"), // Redis port
        host: think.config("redis.host"), // Redis host
        family: 4, // 4 (IPv4) or 6 (IPv6)
        password: think.config("redis.password"),
        connectTimeout: think.config("redis.timeout"),
        showFriendlyErrorStack: true
    })
}
global.setRedisValue = function(key, value, timeout) {
    let redis = io_redis();
    redis.set(key, value, 'EX', timeout);
    think.log('set redis key:[' + key + '] value:[' + value + '] timeout:[' + timeout + ']', 'Redis');
}
global.getRedisValue = function(key) {
    let redis = io_redis();
    let promise = new Promise(function(resolve, reject) {
        redis.get(key, function(err, result) {
            if (!think.isEmpty(err)) {
                think.log("获取Redis数据失败[" + key + "],失败原因:" + err, "Redis");
                resolve(null);
                think.reject(err);
            } else {
                think.log("获取Redis数据成功[" + key + "],数据为:" + result, "Redis");
                resolve(result);
            }
        });
    });
    return promise;
}