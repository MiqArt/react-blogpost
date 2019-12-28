import React from 'react';

function BlogCard({ posts, inWorkspace, removePost, updatePost }) {
  return (
    <div className={inWorkspace ? "d-flex flex-column-reverse" : ""}>
      {posts.length === 0 ? 
        <div className="alert alert-secondary bg-warning" role="alert">0 Posts found</div> :
        posts.map(blog => {
          return (
            <div className="card mb-3" key={blog.id}>
              <div className="card-body">
                {inWorkspace && 
                <div>
                  <button onClick={removePost.bind(null, blog.id)} type="button" className="close">
                    <i className="fa fa-trash"></i>
                  </button>
                  <button onClick={updatePost.bind(null, blog)} type="button" className="close mr-2">
                    <i className="fa fa-pencil"></i>
                  </button>
                </div>
                }
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.description}</p>
              </div>
            </div>
          )
        })
    }
    </div>
  )
}

export default BlogCard
