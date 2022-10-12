
# CoffeeMate 
<img align="bottom" src="https://media3.giphy.com/media/ZBiPoqqfV9zyAJuWhY/200.webp?cid=ecf05e47vesunpyvsbiwrxody69kjm7dud7iil8h700qqko0&rid=200.webp&ct=s" width="100"/> 

[https://coffee-mate.onrender.com](https://coffee-mate.onrender.com)

## Inspiration
People often get distracted by social media as soon as they wake up. Getting notified about latest developments regarding subjects you care early in the morning, we believe, is a great way to start your day and CoffeeMate helps you with just that!

## What it does
CoffeeMate asks you for your email and lets you select from news categories that you care about or are interested in and sends you a news notification every morning containing five articles from categories you selected without overwhelming you with endless news articles/posts.

## How we built it
We used Node.js with Express.js to serve as the backend for our website. The frontend is written using HTML, Vanilla JS and CSS. When a user signs up for our service, we store their data in our Firebase database after performing client-side and server-side validations. We have set up a cron job to send an email out every morning to all users in our database based on the categories they've selected. The news is first fetched for each category for the user using a news API and then a curated list of five new articles are sent to the user using the Courier API. We used the Courier designer studio to make an email template which uses variables passed in through the Courier API to populate the template and send it using the Gmail channel.

## Challenges we ran into
Deployment was more challenging than we anticipated and we ended up trying a few hosting service providers before finalizing render.com.

## Accomplishments that we're proud of
- Completed the project in the decided time frame.
- Working with multiple APIs.

## What we learned
Using the Courier service to send out notifications.

## What's next for CoffeeMate
- Giving users the option to select the time and the timezone for which they want to receive news.
- Adding more categories.

