import React, { useState, useEffect } from 'react';
import Api from '../../Api/Api';
import Storage from '../../services/storage';
import BlogCard from '../../components/BlogCard/BlogCard';
import Modal from '../../components/Modal/Modal';

const Workspace = () => {
  const [loggedUser, setLoggedUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState({show: false, event: "CREATE"});
  const [updating, setUpdating] = useState({id: 0, title: "", descritption: ""});

  const onShow = (event = "CREATE") => {
    setShowModal({show: !showModal.show, event: event})
  }

  const updatePost = (data) => {
    setUpdating(data);
    onShow("UPDATE");
  }

  const removePost = (id) => {
    Api.posts.remove(id);
    setPosts(posts.filter(post => post.id !== id));
  }

  useEffect(() => {
    if (!loggedUser.id) {
      Api.people.getById(Storage.get("user")).then(data => setLoggedUser(data));
    }
    if (loggedUser.id) {
      Api.people.getUserPosts(loggedUser.id).then(res => res.json()).then(data => setPosts(data));
    }
  }, [loggedUser, showModal, showModal.event])

  return (
    <div className="">
      <div className="container">
        <br/>
        <div className="card p-3" style={{border: 'none'}}>
          <div className="card-header d-flex justify-content-between align-items-center mb-4 text-primary">
            Welcome {loggedUser.username}
            <button onClick={onShow} type="button" className="btn btn-primary"><i className="fa fa-plus-square"></i> Create Post</button>
          </div>
          <div className="row">
            <div className="col-12">
              <BlogCard inWorkspace={true} posts={posts} removePost={removePost} updatePost={updatePost}/>
            </div>
          </div>
        </div>
      </div>
      {showModal.show && <Modal event={showModal.event} author={loggedUser.username} updating={updating} onShow={onShow} />}
    </div>
  );
}

export default Workspace;
