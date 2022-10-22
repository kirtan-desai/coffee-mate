const fetch = require('node-fetch')
require('dotenv').config()

const fetchSingleCategoryNews = async (category, num) => {
    const news_api = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`

    const res = await fetch(news_api)

    if (!res.ok) throw new Error("News API is not working")

    const json = await res.json()
    return json.articles.slice(0, Math.min(json.articles.length, num))
}

const fetchNews = async (categories = ['general']) => {
    let news = []
    let newsToSend = 5

    try {
        newsSent = 0
        for (let i = 0; i < categories.length; i++) {
            newsSent = Math.floor(newsToSend / (categories.length - i))
            newsToSend = newsToSend - newsSent
            news = news.concat(await fetchSingleCategoryNews(categories[i], newsSent))
        }
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }

    let news_obj = {}
    for (i in news) {
        news_obj[i] = {}
        news_obj[i]["title"] = news[i]["title"]
        news_obj[i]["description"] = news[i]["description"]
        news_obj[i]["link"] = news[i]["url"]
    }

    return news_obj
}

const sendNews = async (news_obj, email = process.env.TEST_EMAIL, name = "John") => {
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
                    email,
                    "data": { ...news_obj, email, name }
                },
                "template": "BNN4HNWFKCMVVPK8NNW6NAQ9F7EF"
            }
        })
    }

    const res = await fetch('https://api.courier.com/send', options)

    if (!res.ok) throw new Error("Courier API is not working")
}

const fetchNewsAndSendEmail = async (email, name, categories) => {
    categories = [...new Set(categories)]
    let news_obj
    for (let i = 0; i < 5; i++) {
        try {
            news_obj = await fetchNews(categories)
            sendNews(news_obj, email, name.split(" ")[0])
            break
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = fetchNewsAndSendEmail 