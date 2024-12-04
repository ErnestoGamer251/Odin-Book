import React from 'react';
import { useParams } from 'react-router-dom';
import { User } from 'lucide-react';
import PostList from '../components/PostList';
import { Button } from '../components/ui/Button';

export default function Profile() {
  const { username } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="w-10 h-10 text-gray-500" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{username}</h1>
          <p className="text-gray-600">Bio goes here</p>
          <div className="mt-4 flex gap-4">
            <Button variant="primary">Follow</Button>
            <Button variant="secondary">Edit Profile</Button>
          </div>
        </div>
      </div>
      <div className="border-t pt-6">
        <PostList username={username} />
      </div>
    </div>
  );
}