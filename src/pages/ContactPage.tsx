import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, ArrowUpRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }),
};

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', type: 'general', message: '' });
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [location.hash]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('submissions').insert([{
        type: formData.type === 'general' ? 'contact' : formData.type,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }]);
      if (error) throw error;
      toast.success('Message sent! We\'ll be in touch soon.');
      setFormData({ name: '', email: '', subject: '', type: 'general', message: '' });
    } catch (err: any) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-10 grain-overlay">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4 font-semibold">Get In Touch</p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.02em] mb-6">
              CONTACT <span className="text-gradient-gold">URS79</span>
            </h1>
            <div className="divider-gold" />
          </motion.div>
        </div>
      </section>

      <section className="pb-28 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Info */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1} className="lg:col-span-4 space-y-4">
            <div className="glass-card p-8">
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mb-4">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-sm">Email</h3>
              <a href="mailto:info@urs79.com" className="text-muted-foreground text-sm hover:text-primary transition-colors">info@urs79.com</a>
            </div>
            <div className="glass-card p-8">
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mb-4">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-sm">Location</h3>
              <p className="text-muted-foreground text-sm">Los Angeles, CA</p>
            </div>
            <div className="glass-card p-8">
              <h3 className="font-semibold mb-4 text-sm">Inquiry Types</h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full" /> Business Inquiries</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full" /> Artist Submissions</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full" /> Production Bookings</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full" /> Distribution Partnerships</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full" /> Press & Media</li>
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2} className="lg:col-span-8">
            <form id="inquiry-form" onSubmit={handleSubmit} className="glass-card p-8 md:p-12 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block font-medium">Name</label>
                  <Input
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-secondary border-border text-foreground h-12"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block font-medium">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-secondary border-border text-foreground h-12"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block font-medium">Subject</label>
                  <Input
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="bg-secondary border-border text-foreground h-12"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block font-medium">Inquiry Type</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full h-12 px-3 bg-secondary border border-border text-foreground text-sm"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="artist">Artist Submission</option>
                    <option value="production">Production Booking</option>
                    <option value="distribution">Distribution</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block font-medium">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="bg-secondary border-border text-foreground"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary inline-flex items-center gap-3">
                {loading ? 'Sending...' : 'Send Message'} <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
