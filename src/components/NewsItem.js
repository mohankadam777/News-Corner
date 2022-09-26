import React from 'react'

const NewsItem =(props)=> {
  
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div>

        <div className="card" >
        <div style={{display:"flex", justifyContent:"flex-end", position:"absolute", right:0}}><span className="badge rounded-pill bg-danger">
            {source}
          </span></div>
          
          <img src={imageUrl ? imageUrl : "https://static.toiimg.com/thumb/msid-94273882,width-800,resizemode-4,imgsize-24862/share.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="blank" className="btn btn-sm btn-dark">Read More</a>
            
          </div>
        </div>
      </div>
    )
  
}

export default NewsItem