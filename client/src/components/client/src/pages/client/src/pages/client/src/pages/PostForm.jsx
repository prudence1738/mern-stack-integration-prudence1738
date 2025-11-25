import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/apiService';
import useApi from '../api/useApi';
import { useApp } from '../context/AppContext';

export default function PostForm({ edit }){
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useApp();
  const { loading, error, call } = useApi();

  const [form, setForm] = useState({ title: '', body: '', categories: [] });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (edit && id) {
      (async ()=> {
        const data = await call(()=>API.get(`/posts/${id}`));
        setForm({ title: data.title, body: data.body, categories: data.categories.map(c=>c._id) });
      })();
    }
  }, [edit, id]);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('body', form.body);
    form.categories.forEach(c => fd.append('categories[]', c));
    if (image) fd.append('featuredImage', image);

    try {
      const res = edit ? await call(()=>API.put(`/posts/${id}`, fd)) : await call(()=>API.post('/posts', fd));
      // optimistic navigation
      navigate(`/posts/${res._id}`);
    } catch (err) {}
  };

  if (!user) return <p>Please log in to create posts.</p>;

  return (
    <div>
      <h1>{edit ? 'Edit' : 'Create'} Post</h1>
      <form onSubmit={submit}>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
        <textarea placeholder="Body" value={form.body} onChange={e=>setForm({...form, body:e.target.value})} />
        <div>
          <label>Featured image</label>
          <input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])} />
        </div>
        <button type="submit">Save</button>
      </form>
      {loading && <p>Saving...</p>}
      {error && <pre>{JSON.stringify(error)}</pre>}
    </div>
  );
        }
