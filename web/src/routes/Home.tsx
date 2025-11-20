import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockMovies } from '../utils/mockData';
import {
  Home01Icon,
  Ticket01Icon,
  Wallet03Icon,
  UserIcon,
  Logout01Icon,
  Star01Icon,
  TicketIcon,
} from 'hugeicons-react';

export default function Home() {
  const { user, logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'now_showing' | 'upcoming'>('now_showing');

  const filteredMovies = mockMovies.filter((movie) => movie.status === selectedTab);

  return (
    <div className="min-h-full flex flex-col bg-white">
      {/* Header - Minimal */}
      <div className="bg-white border-b border-border px-4 py-3 flex-shrink-0">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-text-muted text-xs">Welcome,</p>
            <p className="text-black font-semibold text-base">{user?.name || 'Guest'}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-background-card border border-border px-3 py-2 rounded-xl flex items-center gap-2">
              <Wallet03Icon size={16} color="#000000" />
              <span className="text-black text-sm font-medium">₹{user?.wallet_balance || 0}</span>
            </div>
            <button
              onClick={logout}
              className="p-2 hover:bg-background-card rounded-xl smooth-transition"
            >
              <Logout01Icon size={20} color="#000000" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs - Minimal */}
      <div className="px-4 pt-4 pb-3 bg-white flex-shrink-0">
        <div className="flex gap-2 bg-background-card rounded-2xl p-1">
          <button
            onClick={() => setSelectedTab('now_showing')}
            className={`flex-1 py-2.5 rounded-xl font-medium text-sm smooth-transition ${
              selectedTab === 'now_showing'
                ? 'bg-black text-white'
                : 'bg-transparent text-text-secondary'
            }`}
          >
            Now Showing
          </button>
          <button
            onClick={() => setSelectedTab('upcoming')}
            className={`flex-1 py-2.5 rounded-xl font-medium text-sm smooth-transition ${
              selectedTab === 'upcoming'
                ? 'bg-black text-white'
                : 'bg-transparent text-text-secondary'
            }`}
          >
            Coming Soon
          </button>
        </div>
      </div>

      {/* Movies List - Cards */}
      <div className="flex-1 overflow-y-auto px-4 py-2 pb-20">
        <div className="space-y-3">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white border border-border rounded-2xl overflow-hidden hover:border-black active:scale-98 smooth-transition"
            >
              <div className="flex">
                <div className="relative w-28 h-40 flex-shrink-0 bg-background-card">
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="w-full h-full object-cover grayscale opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-black font-semibold text-base mb-1 line-clamp-1">
                      {movie.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {movie.genres.slice(0, 2).map((genre) => (
                        <span
                          key={genre}
                          className="text-text-muted text-xs px-2 py-0.5 bg-background-card rounded-full"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <Star01Icon size={14} color="#000000" />
                        <span className="text-black font-medium">{movie.rating}</span>
                      </div>
                      <span className="text-text-secondary">{movie.language}</span>
                    </div>
                  </div>
                  {selectedTab === 'now_showing' && (
                    <button className="mt-3 w-full bg-black hover:bg-primary-light active:scale-95 text-white text-sm font-medium py-2.5 rounded-xl smooth-transition flex items-center justify-center gap-2">
                      <TicketIcon size={16} color="#ffffff" />
                      Book Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation - Minimal */}
      <div className="bg-white border-t border-border px-6 py-3 flex-shrink-0">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center gap-1 smooth-transition">
            <Home01Icon size={24} color="#000000" strokeWidth={2} />
            <span className="text-black text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 smooth-transition">
            <Ticket01Icon size={24} color="#000000" strokeWidth={2} />
            <span className="text-black text-xs">Bookings</span>
          </button>
          <button className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 smooth-transition">
            <Wallet03Icon size={24} color="#000000" strokeWidth={2} />
            <span className="text-black text-xs">Wallet</span>
          </button>
          <button className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 smooth-transition">
            <UserIcon size={24} color="#000000" strokeWidth={2} />
            <span className="text-black text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
