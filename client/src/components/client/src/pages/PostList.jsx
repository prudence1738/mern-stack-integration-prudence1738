import React, { useEffect, useState } from 'react';
import API from '../api/apiService';
import { Link } from 'react-router-dom';
import useApi from '../api/useApi';

export default function PostList(){
  const { loading, error, call } = useApi();
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');

  const fetch = async () => {
    const res = await call(() => API.get('/posts', { params: { page, limit: 6, q } }));
    setItems(res.items);
    setMeta(res.meta);
  };

  useEffect(() => { fetch(); }, [page]); // search triggered by button to avoid too many calls

  return (
    <div>
      <h1>Posts</h1>
      <div style={{ marginBottom:10 }}>
        <input placeholder="Search" value={q} onChange={e=>setQ(e.target.value)} />
        <button onClick={()=>{ setPage(1); fetch(); }}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error)}</pre>}
      <ul>
        {items.map(p => (
          <li key={p._id}>
            <Link to={`/posts/${p._id}`}>{p.title}</Link> — <small>{p.author?.username}</small>
          </li>
        ))}
      </ul>

      <div>
        <button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
        <span> Page {meta.page || 1} / {meta.totalPages || 1} </span>
        <button disabled={meta.page>=meta.totalPages} onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </div>
  );
}
