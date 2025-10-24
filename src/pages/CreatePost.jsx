import React, { useState, useContext } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { title, content }; // Backend gets author from JWT token
      const res = await api.post("/posts", payload);
      navigate(`/post/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create post.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Create New Post</h2>
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
            <input
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors text-lg"
              placeholder="Enter an engaging title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Content</label>
            <textarea
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 h-64 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              placeholder="Write your story... (HTML supported)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <p className="text-xs text-slate-500 mt-2">Tip: You can use HTML tags for formatting</p>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold disabled:opacity-50"
              disabled={saving}
            >
              {saving ? "Publishing..." : "Publish Post"}
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

export default CreatePost;
