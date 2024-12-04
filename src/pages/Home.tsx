import React from 'react';
import { useAuthStore } from '../lib/store';
import PostList from '../components/PostList';

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Home</h1>
      <PostList />
    </div>
  );
}