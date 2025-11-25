import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import PostList from './pages/PostList';
import PostView from './pages/PostView';
import PostForm from './pages/PostForm';
import { AppProvider } from './context/AppContext';

export default function App(){
  return (
    <AppProvider>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/new" element={<PostForm />} />
          <Route path="/posts/:id/edit" element={<PostForm edit />} />
          <Route path="/posts/:id" element={<PostView />} />
        </Routes>
      </div>
    </AppProvider>
  );
}
