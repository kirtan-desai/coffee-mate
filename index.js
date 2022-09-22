const {fetchNews, sendNews} = require('./app');

(async () => {
    sendNews(await fetchNews())
})()


