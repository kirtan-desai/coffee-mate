const fetch = require('node-fetch')
require('dotenv').config()

const news_api = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey="

const fetchNews = async () => {
    const res = await fetch(news_api + process.env.NEWS_API_KEY)
    const json = await res.json()
    news = json.articles.slice(0, 5)

    let news_obj = {}
    for (i in news) {
        news_obj[i] = {}
        news_obj[i]["title"] = news[i]["title"]
        news_obj[i]["description"] = news[i]["description"]
        news_obj[i]["link"] = news[i]["url"]
    }

    return news_obj
}

const sendNews = async (news_obj) => {
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.COURIER_API_KEY
        },
        body: JSON.stringify({
            "message": {
                "to": {
                    "email": process.env.TEST_EMAIL,
                    "data": news_obj
                },
                "template": "BNN4HNWFKCMVVPK8NNW6NAQ9F7EF"
            }
        })
    };

    console.log(options)

    const res = await fetch('https://api.courier.com/send', options)

}

module.exports = { fetchNews, sendNews }