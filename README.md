# NewsScraper
NewsScraper is a web-based application that uses MongoDB, Node.JS, and Express to create a Reddit News Scraper. 

Node modules required include:
1. body-parser
2. cheerio
3. express
4. express-handlebars
5. mongoose
6. request 

These modules are included within the package.json and can be installed via npm init. 


## Main Page

On this page, users are allowed to scrape the News Subreddit for brand new articles. It may take a minute or two for the scrapped articles to load.
If users see an article that they like, they can save that article to the website's database for other visitors to see.

## Saved Articles Page

Saved articles are retained on this page. Users are able to remove the saved article or they can leave comments on the articles for other people to read. 
The comments are saved to the database and can be viewed by anyone.