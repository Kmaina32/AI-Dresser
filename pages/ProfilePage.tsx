
import React from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { LogoutIcon } from '../components/icons/LogoutIcon.tsx';
import { UserIcon } from '../components/icons/UserIcon.tsx';
import { GALLERY_ITEMS } from '../data/galleryData.ts';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();

  if (!user) {
    onNavigate('login');
    return null;
  }

  const handleLogout = () => {
    logout();
    onNavigate('landing');
  };

  // Mock saved items
  const savedItems = GALLERY_ITEMS.slice(0, 3);

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <main className="container mx-auto px-4 py-12 pt-20 md:pt-24">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-200 dark:border-white/10 animate-fade-in">
            <div className="w-32 h-32 rounded-full bg-amber-500/20 p-1 border-2 border-amber-500/50 overflow-hidden flex-shrink-0">
               <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="flex-grow text-center md:text-left space-y-2">
                <div className="inline-block px-3 py-1 bg-amber-500/10 rounded-full text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest border border-amber-500/20">
                    Pro Member
                </div>
                <h1 className="text-4xl font-bold font-playfair text-zinc-900 dark:text-white">{user.name}</h1>
                <p className="text-zinc-500 dark:text-zinc-400">{user.email}</p>
                <div className="pt-4">
                    <button 
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-red-500 hover:text-white border border-red-500/30 hover:bg-red-500 hover:border-red-500 rounded-md transition-all"
                    >
                        <LogoutIcon className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </div>
            
            {/* Stats */}
            <div className="flex gap-6 text-center">
                <div className="p-4 bg-zinc-100 dark:bg-zinc-950/50 rounded-lg border border-zinc-200 dark:border-white/5">
                    <p className="text-2xl font-bold text-zinc-900 dark:text-white">24</p>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">Designs</p>
                </div>
                <div className="p-4 bg-zinc-100 dark:bg-zinc-950/50 rounded-lg border border-zinc-200 dark:border-white/5">
                    <p className="text-2xl font-bold text-zinc-900 dark:text-white">8</p>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">Videos</p>
                </div>
            </div>
          </div>

          {/* Saved Creations */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-4">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white font-playfair">Recent Creations</h2>
                <button onClick={() => onNavigate('gallery')} className="text-xs text-amber-500 hover:text-amber-600 font-bold uppercase tracking-wider">View All</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedItems.map((item, idx) => (
                    <div key={idx} className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-zinc-200 dark:border-white/5 shadow-lg">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <h3 className="text-white font-bold font-playfair text-lg">{item.title}</h3>
                            <p className="text-zinc-300 text-xs mt-1 line-clamp-1">{item.description}</p>
                        </div>
                    </div>
                ))}
                <button 
                    onClick={() => onNavigate('home')}
                    className="aspect-[3/4] rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center gap-4 text-zinc-400 hover:text-amber-500 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group"
                >
                    <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-2xl">+</span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Create New</span>
                </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
