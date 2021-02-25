import fetch from 'node-fetch'

export interface News {
  author: string;
  title: string;
  description: string;
  source: any;
  url: string;
  urlToImage: string;
}

const fetchData: () => Promise<News[]> = () => {
  return new Promise((resolve, reject) => {
    fetch('https://some-news-api.herokuapp.com/articles')
      .then((resp) => resp.json())
      .then((respData) => {
        if (respData !== undefined) {
          const arrayOfNews: News[] = respData.map((news: any) => {
            const result = {
              author: news.author,
              title: news.title,
              description: news.description,
              name: news.source.name,
              url: news.url,
              urlToImage: news.urlToImage
            }
            return result
          })
          return resolve(arrayOfNews)
        }
        reject('New API returned no Data!')
      })
      .catch((err) => {
        console.log('News API error: ', err.message)
        reject(err.message)
      })
  })
}

export default fetchData
