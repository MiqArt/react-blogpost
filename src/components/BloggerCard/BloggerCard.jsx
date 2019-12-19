import React from 'react'

const BloggerCard = ({ people }) => {
    return (
        <div>
            {people.map(blogger => {
                return(
                    <div className="card mb-3" key={blogger.id}>
                        <div className="card-body">
                        <h5 className="card-title">{blogger.lastname}</h5>
                        <p className="card-text">{blogger.username}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default BloggerCard
