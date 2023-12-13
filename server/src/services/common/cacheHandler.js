const redis = require('redis');
let cluster;
const redisPort = process.env.REDIS_PORT;
const redisHost = process.env.REDIS_HOST;
exports.initializeRedis = async () => {
    const LOCAL_REDIS = process.env.NODE_ENV == 'production' ? false : true;
    cluster = redis.createClient(redisPort, redisHost);
    cluster.on('error', (err) => console.log('Redis Cluster Error', err));
    console.log('connected to cluster...');
    await cluster.connect();
    cluster.set("test-value", "test");
    cluster.get("test-value").then(r => {
        console.log(r); // <- you should see "test"
    });
}

exports.setCache = (key, value) => {
    const prefix = process.env.NODE_ENV == 'production' ? '-prod-' : '-dev-';
    const finalKey = prefix + '-' + key;
    cluster.set(finalKey, value, 'ex', 525948766);
}

exports.setDefaultCache = (key, value) => {
    const prefix = process.env.NODE_ENV == 'production' ? '-prod-' : '-dev-';
    const finalKey = prefix + '-' + key;
    cluster.set(finalKey, value, 'ex', 3600);
}

exports.setHashCache = (hashKey, key, value) => {
    cluster.hset(hashKey, key, value)
}
exports.getHashCache = (hashKey, key) => {
    return cluster.hget(hashKey, key);
}

exports.getCache = (key) => {
    const prefix = process.env.NODE_ENV == 'production' ? '-prod-' : '-dev-';
    const finalKey = prefix + '-' + key;
    return cluster.get(finalKey);
}
exports.deleteKey = (key) => {
    return cluster.del(key)
}

exports.getHashKeys = (hashKey) => {
    return cluster.hkeys(hashKey);
}