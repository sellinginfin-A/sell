'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { 
  User, 
  Calendar, 
  Settings, 
  Home, 
  FileText, 
  Download,
  CreditCard,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function DashboardSidebar({ 
  activeTab, 
  setActiveTab, 
  profile, 
  user,
  onSignOut,
  signingOut,
  isOpen,
  setIsOpen 
}) {
  const router = useRouter();
  const { updateProfile } = useAuth();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: Settings },
  ];

  const quickActions = [
    {
      label: 'Re-download PDF',
      icon: Download,
      action: () => router.push('/download'),
      description: 'Download your purchased PDFs again'
    },
    {
      label: 'Browse Products',
      icon: FileText,
      action: () => router.push('/'),
      description: 'Explore our products and services'
    },
    {
      label: 'Book New Session',
      icon: Calendar,
      action: () => router.push('/#services'),
      description: 'Schedule a new coaching session'
    }
  ];

  const userInitial = profile?.first_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U';
  const displayName = profile?.first_name || user?.email?.split('@')[0] || 'User';

  const onAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const onAvatarSelected = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        setUploading(true);
        const dataUrl = reader.result;
        await updateProfile({ avatar_url: dataUrl });
        // close/reopen sidebar to refresh? parent passes profile; assume context reload elsewhere
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Brand/Logo Section */}
      <div className="p-6 border-b border-white/20">
        <Link 
          href="/"
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          onClick={() => setIsOpen(false)}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-blue-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">SI</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Selling Infinity
            </h2>
            <p className="text-xs text-white/60">
              Dashboard
            </p>
          </div>
        </Link>
      </div>

      {/* User Profile Section */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onAvatarClick}
            title="Click to add/change your photo"
            className="relative group w-12 h-12 rounded-full overflow-hidden focus:outline-none border border-white/30"
          >
            {profile?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-yellow-400 flex items-center justify-center text-[#0f1729] text-lg font-medium">
                {userInitial}
              </div>
            )}
            <span className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 text-[10px] text-white flex items-center justify-center transition-opacity">
              {uploading ? 'Uploading...' : 'Change'}
            </span>
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onAvatarSelected} />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white truncate">
              {displayName}
            </h3>
            <p className="text-sm text-white/70 truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider">
            Dashboard
          </h4>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center px-3 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-yellow-400 text-[#0f1729]'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <Icon size={18} className="mr-3" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 space-y-2">
          <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider">
            Quick Actions
          </h4>
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => {
                  action.action();
                  setIsOpen(false);
                }}
                className="w-full flex items-start px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
              >
                <Icon size={18} className="mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium">{action.label}</div>
                  <div className="text-xs text-white/60">
                    {action.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Home Link */}
        <div className="mt-8 space-y-2">
          <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider">
            Navigation
          </h4>
          <Link
            href="/"
            className="w-full flex items-center px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Home size={18} className="mr-3" />
            Back to Website
          </Link>
        </div>
      </nav>

      {/* Sign Out Button */}
      <div className="p-4 border-t border-white/20">
        <button
          onClick={() => {
            onSignOut();
            setIsOpen(false);
          }}
          disabled={signingOut}
          className="w-full flex items-center px-3 py-2 rounded-lg text-red-400 hover:bg-red-900/20 transition-colors disabled:opacity-50"
        >
          <LogOut size={18} className="mr-3" />
          {signingOut ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#0f1729]/95 backdrop-blur-lg shadow-lg border border-white/20"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 h-screen bg-[#0f1729]/95 backdrop-blur-lg shadow-xl border-r border-white/20 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:w-80
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {sidebarContent}
      </div>
    </>
  );
}
