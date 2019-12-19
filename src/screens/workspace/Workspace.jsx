import React, { useState, useEffect } from 'react';
import Api from '../../Api/Api';
import Storage from '../../services/storage';
import BlogCard from '../../components/BlogCard/BlogCard';
import Modal from '../../components/Modal/Modal';

const Workspace = () => {
  const [loggedUser, setLoggedUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);


  const onShow = () => {
    setShowModal(!showModal)
  }

  const removePost = (id) => {
    Api.posts.remove(id);
    setPosts(posts.filter(post => post.id !== id));
  }

  const updatePost = () => {
    alert("//...")
  }

  useEffect(() => {
    if (!loggedUser.id) {
      Api.people.getById(Storage.get("user")).then(data => setLoggedUser(data));
    }
    if (loggedUser.id) {
      Api.people.getUserPosts(loggedUser.id).then(res => res.json()).then(data => setPosts(data));
    }
  }, [loggedUser, showModal])

  return (
    <div className="">
      <div className="container">
        <br/>
        <div className="card p-3" style={{border: 'none'}}>
          <div className="card-header d-flex justify-content-between align-items-center mb-4 text-primary">
            Welcome {loggedUser.username}
            <button onClick={onShow} type="button" className="btn btn-primary"><i class="fa fa-plus-square"></i> Create Post</button>
          </div>
          <div className="row">
            <div className="col-12">
              <BlogCard inWorkspace={true} posts={posts} removePost={removePost} updatePost={updatePost}/>
            </div>
          </div>
        </div>
      </div>
      {showModal && <Modal author={loggedUser.username} onShow={onShow} />}
    </div>
  );
}

export default Workspace;
