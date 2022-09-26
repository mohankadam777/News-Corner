import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
      

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        

        props.setProgress(100);
    }

    const fetchMoreData = async () => {
        props.setProgress(10);
      
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
       
        setPage(page+1);
        props.setProgress(50);
        let data = await fetch(url);
        props.setProgress(70);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))//
        setLoading(false)
        setTotalResults(parsedData.totalResults)
        props.setProgress(100);
    }



    useEffect(() => {
        document.title=`News Corner-${capitalizeFirstLetter(props.category)}`  
        updateNews();
    }, [])
   

 return (
      
        <div className='container my-3'>
            <h1 className="text-center" style={{ margin: " 35px 0px",marginTop:"90px" }}>Top Headlines - {capitalizeFirstLetter(props.category)}</h1>
           
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>

                <div className='container'>
                    <div className="row" >
                        {!loading && articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage}
                                    newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

        </div>
    )
    // }
}
News.defaultProps = {
    pageSize: 6,
    country: "in",
    category: "general"
}
News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
}
export default News
