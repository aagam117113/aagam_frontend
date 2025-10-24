import React, { useEffect, useState } from "react";
import api from "../axios";
import PostCard from "../components/PostCard";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filtered = posts.filter(p => 
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.content?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Welcome to MERN Blog
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-4 rounded-full border-2 border-slate-200 focus:border-indigo-500 focus:outline-none shadow-lg transition-all duration-200"
          />
          <svg
            className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Latest Articles</h2>
        <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" />
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
          <p className="mt-4 text-slate-500">Loading articles...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-slate-500">No articles found. Be the first to write one!</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;
