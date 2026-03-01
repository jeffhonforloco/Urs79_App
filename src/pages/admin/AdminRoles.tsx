import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Users, Plus, Trash2, Shield, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type RoleEntry = {
  id: string;
  user_id: string;
  role: 'admin' | 'editor' | 'viewer';
  email?: string;
};

const roleDescriptions: Record<string, string> = {
  admin: 'Full access — manage everything including roles and settings',
  editor: 'Can create, edit, and delete content (artists, news, releases, products)',
  viewer: 'Read-only access — can view admin dashboard and submissions',
};

const AdminRoles = () => {
  const [roles, setRoles] = useState<RoleEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'editor' | 'viewer'>('editor');
  const [adding, setAdding] = useState(false);

  const fetchRoles = async () => {
    const { data, error } = await supabase.from('user_roles').select('*');
    if (error) {
      toast.error('Failed to load roles');
      return;
    }

    // Get emails for each user from profiles
    const userIds = data.map((r: any) => r.user_id);
    const { data: profiles } = await supabase
      .from('profiles')
      .select('user_id, display_name')
      .in('user_id', userIds);

    const profileMap = new Map(profiles?.map((p: any) => [p.user_id, p.display_name]) || []);

    setRoles(data.map((r: any) => ({
      ...r,
      email: profileMap.get(r.user_id) || r.user_id,
    })));
    setLoading(false);
  };

  useEffect(() => { fetchRoles(); }, []);

  const handleAddRole = async () => {
    if (!newEmail.trim()) {
      toast.error('Please enter an email');
      return;
    }
    setAdding(true);
    try {
      // Look up user by email in profiles (display_name stores email by default)
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, display_name')
        .eq('display_name', newEmail.trim());

      if (!profiles || profiles.length === 0) {
        toast.error('User not found. They must create an account first.');
        setAdding(false);
        return;
      }

      const userId = profiles[0].user_id;

      // Check if role already exists
      const { data: existing } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', userId)
        .eq('role', newRole);

      if (existing && existing.length > 0) {
        toast.error('User already has this role');
        setAdding(false);
        return;
      }

      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: newRole });

      if (error) throw error;

      toast.success(`${newRole} role assigned to ${newEmail}`);
      setNewEmail('');
      fetchRoles();
    } catch (err: any) {
      toast.error(err.message || 'Failed to assign role');
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveRole = async (roleId: string) => {
    const { error } = await supabase.from('user_roles').delete().eq('id', roleId);
    if (error) {
      toast.error('Failed to remove role');
      return;
    }
    toast.success('Role removed');
    fetchRoles();
  };

  if (loading) return <div className="p-8 text-muted-foreground">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="font-display text-4xl tracking-wide mb-2">STAFF ROLES</h1>
      <p className="text-muted-foreground text-sm mb-8">Assign roles to team members to control access levels.</p>

      {/* Role descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {Object.entries(roleDescriptions).map(([role, desc]) => (
          <div key={role} className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className={`w-4 h-4 ${role === 'admin' ? 'text-red-400' : role === 'editor' ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">{role}</span>
            </div>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      {/* Add role form */}
      <div className="glass-card p-6 mb-8">
        <h2 className="font-display text-lg mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" /> ASSIGN ROLE
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
            placeholder="user@example.com"
            className="bg-secondary border-border flex-1"
          />
          <Select value={newRole} onValueChange={(v: any) => setNewRole(v)}>
            <SelectTrigger className="w-40 bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
          <button onClick={handleAddRole} disabled={adding} className="btn-primary inline-flex items-center gap-2 text-sm">
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Assign
          </button>
        </div>
      </div>

      {/* Current roles */}
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-[10px] tracking-[0.2em] uppercase text-muted-foreground p-4">User</th>
              <th className="text-left text-[10px] tracking-[0.2em] uppercase text-muted-foreground p-4">Role</th>
              <th className="text-right text-[10px] tracking-[0.2em] uppercase text-muted-foreground p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map(r => (
              <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30">
                <td className="p-4 text-sm">{r.email}</td>
                <td className="p-4">
                  <span className={`text-[10px] tracking-[0.2em] uppercase font-semibold px-2 py-1 rounded ${
                    r.role === 'admin' ? 'bg-red-400/10 text-red-400' :
                    r.role === 'editor' ? 'bg-primary/10 text-primary' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {r.role}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleRemoveRole(r.id)}
                    className="text-muted-foreground hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {roles.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-muted-foreground text-sm">No roles assigned yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRoles;
