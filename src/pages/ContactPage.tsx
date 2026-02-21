import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7 } }),
};

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', type: 'general', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll be in touch soon.');
    setFormData({ name: '', email: '', subject: '', type: 'general', message: '' });
  };

  return (
    <div className="pt-28">
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-medium">Get In Touch</p>
            <h1 className="text-5xl md:text-7xl font-black mb-8">
              Contact <span className="text-gradient-gold">URS79</span>
            </h1>
            <div className="divider-gold mb-8" />
          </motion.div>
        </div>
      </section>

      <section className="pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1} className="space-y-8">
            <div className="glass-card rounded-lg p-8">
              <Mail className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <a href="mailto:info@urs79.com" className="text-muted-foreground hover:text-primary transition-colors">info@urs79.com</a>
            </div>
            <div className="glass-card rounded-lg p-8">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-muted-foreground">Los Angeles, CA</p>
            </div>
            <div className="glass-card rounded-lg p-8">
              <h3 className="font-semibold mb-4">Inquiry Types</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Business Inquiries</li>
                <li>• Artist Submissions</li>
                <li>• Production Bookings</li>
                <li>• Distribution Partnerships</li>
                <li>• Press & Media</li>
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2} className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass-card rounded-lg p-8 md:p-12 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">Name</label>
                  <Input
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-secondary border-border text-foreground"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-secondary border-border text-foreground"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">Subject</label>
                  <Input
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="bg-secondary border-border text-foreground"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">Inquiry Type</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground text-sm"
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
                <label className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="bg-secondary border-border text-foreground"
                  placeholder="Tell us about your project..."
                />
              </div>
              <Button type="submit" className="btn-primary w-full md:w-auto">
                Send Message <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
