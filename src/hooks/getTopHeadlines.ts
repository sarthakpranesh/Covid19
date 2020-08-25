import { useState, useEffect } from 'react'
import NewsApi, { News } from '../API/NewsApi'

const getTopHeadlines = (): [Function, any, Boolean] => {
  const [results, setResults] = useState<News[]>([])
  const [isErr, setIsError] = useState(false)

  const fetchTopHeadlines = async () => {
    NewsApi()
      .then((arrayOfNews) => {
        setResults(arrayOfNews)
        setIsError(false)
      })
      .catch(() => {
        setIsError(true)
      })
  }

  useEffect(() => {
    fetchTopHeadlines()
  }, [])

  return [fetchTopHeadlines, results, isErr]
}

export default getTopHeadlines
