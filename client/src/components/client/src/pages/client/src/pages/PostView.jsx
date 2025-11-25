import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/apiService';
import useApi from '../api/useApi';

export default function PostView(){
  const { id } = useParams();
  const { loading, error, call } = useApi();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({ authorName: '', content: '' });

  useEffect(() => {
    (async () => {
      const data = await call(()=>API.get(`/posts/${id}`));
      setPost(data);
      const cm = await call(()=>API.get(`/posts/${id}/comments`));
      setComments(cm);
    })();
  }, [id]);

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const saved = await call(()=>API.post('/comments', { ...commentForm, post: id }));
      setComments(c => [saved, ...c]);
      setCommentForm({ authorName: '', content: '' });
    } catch (err) {}
  };

  if (loading && !post) return <p>Loading...</p>;
  if (error && !post) return <pre>{JSON.stringify(error)}</pre>;

  return post ? (
    <div>
      <h2>{post.title}</h2>
      {post.featuredImage && <img src={post.featuredImage} alt="featured" style={{ maxWidth: '100%' }} />}
      <p>{post.body}</p>
      <section>
        <h3>Comments</h3>
        <form onSubmit={submitComment}>
          <input placeholder="Name" value={commentForm.authorName} onChange={e=>setCommentForm({...commentForm, authorName:e.target.value})} />
          <textarea placeholder="Comment" value={commentForm.content} onChange={e=>setCommentForm({...commentForm, content:e.target.value})} />
          <button type="submit">Post</button>
        </form>
        <ul>
          {comments.map(c => <li key={c._id}><b>{c.authorName}</b>: {c.content}</li>)}
        </ul>
      </section>
    </div>
  ) : null;
}
