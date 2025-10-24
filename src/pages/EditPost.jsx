import React, { useEffect, useState } from "react";
import api from "../axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/posts/${id}`, { title: post.title, content: post.content });
      navigate(`/post/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update.");
    } finally {
      setSaving(false);
    }
  };

  if (!post)
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Edit Post</h2>
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
            <input
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors text-lg"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Content</label>
            <textarea
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 h-64 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              required
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold disabled:opacity-50"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Post"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditPost;
