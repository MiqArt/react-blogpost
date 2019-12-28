import React, { useState } from 'react';
import Api from '../../Api/Api';
import Storage from '../../services/storage';

const Modal = ({ onShow, author, updating, event }) => {
  const [post, setPost] = useState({ title: (event!=="UPDATE" ? "" : updating.title), description: (event!=="UPDATE" ? "" : updating.description) });

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value })
  }

  const closeModal = (e) => {
    e.stopPropagation()
    if (e.target.className === "myModalBack") {
      onShow();
    }
  }

  const createPost = (post) => {
    const newPost = {
      author: author,
      description: post.description,
      personId: Storage.get("user"),
      title: post.title
    }

    if (post.title && post.description) {
      onShow("CREATE");
      Api.posts.set(newPost)
        .then(res => {
          if (!res.ok) {
            throw new Error();
          }
          return res.json()
        })
        .catch(() => {
          alert("Invalid data");
        })
    }
    else {
      alert("Please fill in the required fields:");
    }
  }

  const updatePost = (id, post) => {
    const newPost = {
      author: author,
      description: post.description,
      personId: Storage.get("user"),
      title: post.title
    }

    if (post.title && post.description) {
      onShow();
      Api.posts.update(id, newPost)
        .then(res => {
          if (!res.ok) {
            throw new Error();
          }
          return res.json()
        })
        .catch(() => {
          alert("Invalid data");
        })
    }
    else {
      alert("Please fill in the required fields:");
    }
  }

  return (
    <div className="myModalBack" onClick={closeModal}>
      <div className="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button onClick={onShow} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="control-label">Title:</label>
                  <input onChange={onHandleChange} name="title" value={post.title} type="text" className="form-control" id="recipient-name" />
                </div>
                <div className="form-group">
                  <label htmlFor="message-text" className="control-label">Description:</label>
                  <textarea onChange={onHandleChange} name="description" value={post.description} className="form-control" id="message-text"></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              {event === "UPDATE" 
                ? <button onClick={updatePost.bind(null, updating.id, post)} type="button" className="btn btn-primary">Update</button>
                : <button onClick={createPost.bind(null, post)} type="button" className="btn btn-primary">Add</button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
