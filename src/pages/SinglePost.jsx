import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../axios";
import { AuthContext } from "../context/AuthContext";

const SinglePost = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      const res = await api.get(`/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await api.delete(`/posts/${id}`);
      navigate("/");
    } catch (err) {
      alert("Failed to delete");
    }
  };

  useEffect(() => {
    fetch();
  }, [id]);

  if (loading)
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  if (!post)
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-slate-500">
        Post not found.
      </div>
    );

  const isAuthor = user && post.author?._id === user._id;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Author & Date */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {post.author?.name?.[0]?.toUpperCase() || "A"}
          </div>
          <div>
            <div className="font-semibold text-slate-800">{post.author?.name || "Anonymous"}</div>
            <div className="text-sm text-slate-500">{new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none text-slate-700 mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Actions */}
        {isAuthor && (
          <div className="flex flex-wrap gap-3 pt-6 border-t">
            <Link
              to={`/edit/${post._id}`}
              className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Post
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        )}

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 mt-6 font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </article>
  );
};

export default SinglePost;
