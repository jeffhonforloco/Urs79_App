import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import { LayoutDashboard, Film, Users, Music, Newspaper, Mail, LogOut, ChevronRight, ShoppingBag, Settings, Shield } from 'lucide-react';

const sidebarLinks = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/projects', label: 'Portfolio', icon: Film },
  { path: '/admin/artists', label: 'Artists', icon: Users },
  { path: '/admin/releases', label: 'Releases', icon: Music },
  { path: '/admin/news', label: 'News', icon: Newspaper },
  { path: '/admin/submissions', label: 'Submissions', icon: Mail },
  { path: '/admin/products', label: 'Products', icon: ShoppingBag },
  { path: '/admin/roles', label: 'Staff Roles', icon: Shield },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState({ projects: 0, artists: 0, releases: 0, news: 0, submissions: 0, unread: 0, products: 0 });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('artists').select('id', { count: 'exact', head: true }),
        supabase.from('releases').select('id', { count: 'exact', head: true }),
        supabase.from('news').select('id', { count: 'exact', head: true }),
        supabase.from('submissions').select('id', { count: 'exact', head: true }),
        supabase.from('submissions').select('id', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('products').select('id', { count: 'exact', head: true }),
      ]).then(([p, a, r, n, s, u, pr]) => {
        setStats({
          projects: p.count ?? 0,
          artists: a.count ?? 0,
          releases: r.count ?? 0,
          news: n.count ?? 0,
          submissions: s.count ?? 0,
          unread: u.count ?? 0,
          products: pr.count ?? 0,
        });
      });
    }
  }, [isAdmin, location]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="text-muted-foreground">Loading...</div></div>;
  if (!isAdmin) return null;

  const isExactAdmin = location.pathname === '/admin';

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/">
            <img src="/images/urs79-logo-color.webp" alt="URS79" className="h-10" />
          </Link>
          <p className="text-[9px] tracking-[0.3em] uppercase text-primary mt-2 font-semibold">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map(l => {
            const Icon = l.icon;
            const active = l.exact ? location.pathname === l.path : location.pathname.startsWith(l.path);
            return (
              <Link
                key={l.path}
                to={l.path}
                className={`flex items-center gap-3 px-4 py-3 rounded text-sm transition-all ${
                  active ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <Icon className="w-4 h-4" />
                {l.label}
                {l.label === 'Submissions' && stats.unread > 0 && (
                  <span className="ml-auto bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">{stats.unread}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button onClick={signOut} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground w-full px-4 py-3">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {isExactAdmin ? (
          <div className="p-8">
            <h1 className="font-display text-4xl tracking-wide mb-8">DASHBOARD</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Portfolio Projects', count: stats.projects, link: '/admin/projects', icon: Film },
                { label: 'Artists', count: stats.artists, link: '/admin/artists', icon: Users },
                { label: 'Music Releases', count: stats.releases, link: '/admin/releases', icon: Music },
                { label: 'News Posts', count: stats.news, link: '/admin/news', icon: Newspaper },
                { label: 'Total Submissions', count: stats.submissions, link: '/admin/submissions', icon: Mail },
                { label: 'Unread Messages', count: stats.unread, link: '/admin/submissions', icon: Mail },
                { label: 'Products', count: stats.products, link: '/admin/products', icon: ShoppingBag },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <Link key={i} to={s.link} className="glass-card p-6 group hover:border-primary/30 transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">{s.label}</p>
                        <p className="text-3xl font-display">{s.count}</p>
                      </div>
                      <Icon className="w-5 h-5 text-muted-foreground/30" />
                    </div>
                    <div className="flex items-center gap-1 mt-4 text-[10px] tracking-[0.2em] uppercase text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Manage <ChevronRight className="w-3 h-3" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
