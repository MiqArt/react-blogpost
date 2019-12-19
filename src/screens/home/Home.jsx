import React, { useEffect, useState } from 'react';
import Api from '../../Api/Api';
import BloggerCard from '../../components/BloggerCard/BloggerCard';
import BlogCard from '../../components/BlogCard/BlogCard';

const Home = () => {
  const [people, setPeople] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Api.people.get().then(res => res.json()).then(data => setPeople(data));
    Api.posts.get().then(res => res.json()).then(data => setPosts(data));
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <BloggerCard people={people} />
        </div>
        <div className="col-9">
          <BlogCard updatePost={() => {}} removePost={() => {}} posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Home
