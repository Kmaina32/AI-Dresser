
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { LogoutIcon } from '../components/icons/LogoutIcon.tsx';
import { UserIcon } from '../components/icons/UserIcon.tsx';
import { CheckIcon } from '../components/icons/CheckIcon.tsx';
import { CloseIcon } from '../components/icons/CloseIcon.tsx';
import { GALLERY_ITEMS } from '../data/galleryData.ts';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock Preferences State
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);

  if (!user) {
    onNavigate('login');
    return null;
  }

  const handleLogout = () => {
    logout();
    onNavigate('landing');
  };

  const handleSaveProfile = async () => {
      setIsSaving(true);
      await updateProfile({ name: editName });
      setIsSaving(false);
      setIsEditing(false);
  };

  // Mock saved items
  const savedItems = GALLERY_ITEMS.slice(0, 3);

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <main className="container mx-auto px-4 py-12 pt-20 md:pt-24">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-200 dark:border-white/10 animate-fade-in shadow-xl">
            <div className="w-32 h-32 rounded-full bg-amber-500/20 p-1 border-2 border-amber-500/50 overflow-hidden flex-shrink-0 relative group">
               <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
               {isEditing && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-xs text-white uppercase tracking-wider font-bold">Change</div>}
            </div>
            <div className="flex-grow text-center md:text-left space-y-3 w-full">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 justify-between w-full">
                    <div className="space-y-2 w-full">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <div className="inline-block px-3 py-1 bg-amber-500/10 rounded-full text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest border border-amber-500/20">
                                Pro Member
                            </div>
                        </div>
                        
                        {isEditing ? (
                            <div className="flex items-center gap-2 max-w-xs mx-auto md:mx-0">
                                <input 
                                    type="text" 
                                    value={editName} 
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="w-full px-3 py-2 text-2xl font-bold font-playfair bg-white/50 dark:bg-black/50 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:border-amber-500 text-zinc-900 dark:text-white"
                                    autoFocus
                                />
                            </div>
                        ) : (
                            <h1 className="text-4xl font-bold font-playfair text-zinc-900 dark:text-white">{user.name}</h1>
                        )}
                        
                        <p className="text-zinc-500 dark:text-zinc-400 font-mono text-sm">{user.email}</p>
                    </div>

                    <div className="flex gap-2 pt-4 md:pt-0">
                        {isEditing ? (
                            <>
                                <button 
                                    onClick={handleSaveProfile}
                                    disabled={isSaving}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-green-600 hover:bg-green-500 rounded-md transition-all shadow-md"
                                >
                                    <CheckIcon className="w-4 h-4" />
                                    {isSaving ? 'Saving...' : 'Save'}
                                </button>
                                <button 
                                    onClick={() => { setIsEditing(false); setEditName(user.name); }}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-md transition-all"
                                >
                                    <CloseIcon className="w-4 h-4" />
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-white/20 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-md transition-all"
                                >
                                    Edit Profile
                                </button>
                                <button 
                                    onClick={handleLogout}
                                    className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-red-500 hover:text-white border border-red-500/30 hover:bg-red-500 hover:border-red-500 rounded-md transition-all"
                                >
                                    <LogoutIcon className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Stats Column */}
              <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-xl border border-zinc-200 dark:border-white/5 p-6">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Statistics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-zinc-100 dark:bg-zinc-950/50 rounded-lg border border-zinc-200 dark:border-white/5 text-center">
                            <p className="text-2xl font-bold text-zinc-900 dark:text-white">24</p>
                            <p className="text-[10px] uppercase tracking-wider text-zinc-500 mt-1">Designs</p>
                        </div>
                        <div className="p-4 bg-zinc-100 dark:bg-zinc-950/50 rounded-lg border border-zinc-200 dark:border-white/5 text-center">
                            <p className="text-2xl font-bold text-zinc-900 dark:text-white">8</p>
                            <p className="text-[10px] uppercase tracking-wider text-zinc-500 mt-1">Videos</p>
                        </div>
                      </div>
                  </div>

                  <div className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-xl border border-zinc-200 dark:border-white/5 p-6">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Preferences</h3>
                      <div className="space-y-4">
                          <div className="flex items-center justify-between">
                              <span className="text-sm text-zinc-700 dark:text-zinc-300">Email Notifications</span>
                              <button 
                                onClick={() => setEmailNotifs(!emailNotifs)}
                                className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${emailNotifs ? 'bg-amber-500' : 'bg-zinc-600'}`}
                              >
                                  <span className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform duration-300 ${emailNotifs ? 'translate-x-5' : 'translate-x-0'}`}></span>
                              </button>
                          </div>
                          <div className="flex items-center justify-between">
                              <span className="text-sm text-zinc-700 dark:text-zinc-300">Public Profile</span>
                              <button 
                                onClick={() => setPublicProfile(!publicProfile)}
                                className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${publicProfile ? 'bg-amber-500' : 'bg-zinc-600'}`}
                              >
                                  <span className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform duration-300 ${publicProfile ? 'translate-x-5' : 'translate-x-0'}`}></span>
                              </button>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Saved Creations Column */}
              <div className="lg:col-span-2 space-y-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-4">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white font-playfair">Recent Creations</h2>
                    <button onClick={() => onNavigate('gallery')} className="text-xs text-amber-500 hover:text-amber-600 font-bold uppercase tracking-wider">View All</button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {savedItems.map((item, idx) => (
                        <div key={idx} className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-200 dark:border-white/5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <h3 className="text-white font-bold font-playfair text-lg">{item.title}</h3>
                                <p className="text-zinc-300 text-xs mt-1 line-clamp-1">{item.description}</p>
                            </div>
                        </div>
                    ))}
                    <button 
                        onClick={() => onNavigate('home')}
                        className="aspect-[4/3] rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center gap-4 text-zinc-400 hover:text-amber-500 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group bg-white/50 dark:bg-zinc-900/30"
                    >
                        <div className="w-14 h-14 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform border border-zinc-300 dark:border-zinc-700 group-hover:border-amber-500/30">
                            <span className="text-2xl font-light">+</span>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest">Create New</span>
                    </button>
                </div>
              </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
