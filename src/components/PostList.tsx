import React from 'react';
import { MessageCircle, Heart, Repeat2 } from 'lucide-react';
import { Button } from './ui/Button';

interface PostListProps {
  username?: string;
}

export default function PostList({ username }: PostListProps) {
  // Temporary mock data
  const posts = [
    {
      id: '1',
      content: '¡Sólo estoy configurando mi clon de Threads! 🚀',
      author: {
        name: 'Demo User',
        username: 'demo_user',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo_user'
      },
      likes: 42,
      comments: 7,
      reposts: 3,
      createdAt: new Date().toISOString()
    }
  ];

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article key={post.id} className="border-b pb-6">
          <div className="flex gap-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{post.author.name}</h3>
                <span className="text-gray-500">@{post.author.username}</span>
              </div>
              <p className="mt-2">{post.content}</p>
              <div className="mt-4 flex gap-4">
                <Button variant="ghost" size="sm">
                  <Heart className="w-5 h-5 mr-1" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-5 h-5 mr-1" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm">
                  <Repeat2 className="w-5 h-5 mr-1" />
                  {post.reposts}
                </Button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}