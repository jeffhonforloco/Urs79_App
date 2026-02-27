import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

type Product = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  image_url: string | null;
  category: string | null;
  is_featured: boolean | null;
  is_published: boolean | null;
  stock_quantity: number;
};

const emptyProduct = { title: '', slug: '', description: '', price: 0, compare_at_price: null as number | null, image_url: '', category: 'merchandise', is_featured: false, is_published: false, stock_quantity: 0 };

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => { const { data } = await supabase.from('products').select('*').order('sort_order'); setProducts(data || []); setLoading(false); };
  useEffect(() => { fetchProducts(); }, []);

  const handleSave = async () => {
    if (!editing?.title || !editing?.slug) { toast.error('Title and slug required'); return; }
    try {
      if (editing.id) {
        const { error } = await supabase.from('products').update(editing).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert([editing as any]);
        if (error) throw error;
      }
      toast.success('Saved');
      setEditing(null);
      fetchProducts();
    } catch (err: any) { toast.error(err.message); }
  };

  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await supabase.from('products').delete().eq('id', id); toast.success('Deleted'); fetchProducts(); };

  if (editing) {
    return (
      <div className="p-8 max-w-3xl">
        <h2 className="font-display text-3xl mb-6">{editing.id ? 'EDIT' : 'NEW'} PRODUCT</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Title</label><Input value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value, slug: editing.slug || e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} className="bg-secondary border-border h-10" /></div>
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Slug</label><Input value={editing.slug || ''} onChange={e => setEditing({ ...editing, slug: e.target.value })} className="bg-secondary border-border h-10" /></div>
          </div>
          <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Description</label><Textarea value={editing.description || ''} onChange={e => setEditing({ ...editing, description: e.target.value })} className="bg-secondary border-border" rows={4} /></div>
          <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Image URL</label><Input value={editing.image_url || ''} onChange={e => setEditing({ ...editing, image_url: e.target.value })} className="bg-secondary border-border h-10" /></div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Price ($)</label><Input type="number" step="0.01" value={editing.price ?? 0} onChange={e => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })} className="bg-secondary border-border h-10" /></div>
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Compare Price ($)</label><Input type="number" step="0.01" value={editing.compare_at_price ?? ''} onChange={e => setEditing({ ...editing, compare_at_price: e.target.value ? parseFloat(e.target.value) : null })} className="bg-secondary border-border h-10" /></div>
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Stock Qty</label><Input type="number" value={editing.stock_quantity ?? 0} onChange={e => setEditing({ ...editing, stock_quantity: parseInt(e.target.value) || 0 })} className="bg-secondary border-border h-10" /></div>
          </div>
          <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Category</label><Input value={editing.category || ''} onChange={e => setEditing({ ...editing, category: e.target.value })} className="bg-secondary border-border h-10" /></div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={!!editing.is_featured} onChange={e => setEditing({ ...editing, is_featured: e.target.checked })} className="accent-primary" /> Featured</label>
            <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={!!editing.is_published} onChange={e => setEditing({ ...editing, is_published: e.target.checked })} className="accent-primary" /> Published</label>
          </div>
          <div className="flex gap-3 pt-4"><button onClick={handleSave} className="btn-primary">Save</button><button onClick={() => setEditing(null)} className="btn-secondary">Cancel</button></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-3xl">PRODUCTS</h2>
        <button onClick={() => setEditing(emptyProduct)} className="btn-primary inline-flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> Add Product</button>
      </div>
      {loading ? <p className="text-muted-foreground">Loading...</p> : products.length === 0 ? (
        <div className="glass-card p-12 text-center"><p className="text-muted-foreground mb-4">No products yet</p><button onClick={() => setEditing(emptyProduct)} className="btn-primary text-sm">Add First Product</button></div>
      ) : (
        <div className="space-y-2">{products.map(p => (
          <div key={p.id} className="glass-card p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {p.image_url && <img src={p.image_url} alt="" className="w-10 h-10 rounded object-cover bg-secondary" />}
              <div><h3 className="font-medium text-sm">{p.title}</h3><p className="text-xs text-muted-foreground">${Number(p.price).toFixed(2)} · {p.stock_quantity} in stock</p></div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={async () => { await supabase.from('products').update({ is_published: !p.is_published }).eq('id', p.id); fetchProducts(); }} className="p-2 hover:bg-secondary rounded">{p.is_published ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}</button>
              <button onClick={() => setEditing(p)} className="p-2 hover:bg-secondary rounded"><Edit2 className="w-4 h-4 text-muted-foreground" /></button>
              <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-secondary rounded"><Trash2 className="w-4 h-4 text-red-400" /></button>
            </div>
          </div>
        ))}</div>
      )}
    </div>
  );
};

export default AdminProducts;
