import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import ScrollReveal, { ScrollRevealGroup, ScrollRevealItem } from '@/components/urs79/ScrollReveal';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } }),
};

const ContactPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const preselectedType = searchParams.get('type') || 'general';

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', type: preselectedType, message: '' });
  const [loading, setLoading] = useState(false);

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
      <section className="relative pt-44 md:pt-52 pb-24 md:pb-28 px-6 md:px-10 grain-overlay">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <ScrollReveal direction="up" blur>
            <p className="section-label mb-5">Get In Touch</p>
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] tracking-[0.02em] leading-[0.85] mb-8">
              CONTACT <span className="text-gradient-gold">URS79</span>
            </h1>
            <div className="divider-gold" />
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-32 md:pb-44 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Info */}
          <ScrollRevealGroup stagger={0.12} className="lg:col-span-4 space-y-5">
            <ScrollRevealItem direction="left" blur>
              <div className="glass-card p-8 md:p-10 hover:-translate-y-1 transition-transform duration-400">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-5">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold mb-3 text-base">Email</h3>
                <a href="mailto:info@urs79.com" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300">info@urs79.com</a>
              </div>
            </ScrollRevealItem>
            <ScrollRevealItem direction="left" blur>
              <div className="glass-card p-8 md:p-10 hover:-translate-y-1 transition-transform duration-400">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-5">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold mb-3 text-base">Location</h3>
                <p className="text-muted-foreground text-sm">Los Angeles, CA</p>
              </div>
            </ScrollRevealItem>
            <ScrollRevealItem direction="left" blur>
              <div className="glass-card p-8 md:p-10 hover:-translate-y-1 transition-transform duration-400">
                <h3 className="font-bold mb-5 text-base">Inquiry Types</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" /> Business Inquiries</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" /> Artist Submissions</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" /> Production Bookings</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" /> Distribution Partnerships</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" /> Press & Media</li>
                </ul>
              </div>
            </ScrollRevealItem>
          </ScrollRevealGroup>

          {/* Form */}
          <ScrollReveal direction="right" delay={0.2} blur className="lg:col-span-8">
            <form id="inquiry-form" onSubmit={handleSubmit} className="glass-card p-8 md:p-14 space-y-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="section-label mb-3 block">Name</label>
                  <Input
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-secondary border-border text-foreground h-13"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="section-label mb-3 block">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-secondary border-border text-foreground h-13"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="section-label mb-3 block">Subject</label>
                  <Input
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="bg-secondary border-border text-foreground h-13"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label className="section-label mb-3 block">Inquiry Type</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full h-13 px-3 bg-secondary border border-border text-foreground text-sm rounded-md"
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
                <label className="section-label mb-3 block">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={7}
                  className="bg-secondary border-border text-foreground"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary inline-flex items-center gap-3">
                {loading ? 'Sending...' : 'Send Message'} <Send className="w-4 h-4" />
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
