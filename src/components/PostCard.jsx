import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <article className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      <Link to={`/post/${post._id}`} className="block">
        <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
              {post.title}
            </h3>
          </div>
        </div>
        <div className="p-5">
          <p className="text-sm text-slate-600 line-clamp-3 mb-4">
            {post.excerpt || post.content?.replace(/<[^>]*>/g, '').substring(0, 150) + '...' || "Read more..."}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                {post.author?.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="text-xs text-slate-600 font-medium">{post.author?.name || "Anonymous"}</div>
            </div>
            <div className="text-xs text-slate-400">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
