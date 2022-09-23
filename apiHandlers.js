const fetch = require('node-fetch')
require('dotenv').config()

const fetchNews = async (category = 'general') => {
    const news_api = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`

    const res = await fetch(news_api)

    if (!res.ok) throw new Error("News API is not working")
    
    const json = await res.json()
    news = json.articles.slice(0, Math.min(json.articles.length, 5))

    let news_obj = {}
    for (i in news) {
        news_obj[i] = {}
        news_obj[i]["title"] = news[i]["title"]
        news_obj[i]["description"] = news[i]["description"]
        news_obj[i]["link"] = news[i]["url"]
    }

    return news_obj
}

const sendNews = async (news_obj, email = process.env.TEST_EMAIL) => {
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
                    "email": email,
                    "data": news_obj
                },
                "template": "BNN4HNWFKCMVVPK8NNW6NAQ9F7EF"
            }
        })
    }

    const res = await fetch('https://api.courier.com/send', options)

    if (!res.ok) throw new Error("Courier API is not working")
}

module.exports = { fetchNews, sendNews }