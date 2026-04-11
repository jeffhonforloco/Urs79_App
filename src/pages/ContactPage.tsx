import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import ScrollReveal, { ScrollRevealGroup, ScrollRevealItem } from '@/components/urs79/ScrollReveal';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().trim().email('Please enter a valid email').max(255),
  subject: z.string().trim().min(1, 'Subject is required').max(200, 'Subject too long'),
  type: z.string(),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message too long'),
});

const ContactPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const preselectedType = searchParams.get('type') || 'general';

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', type: preselectedType, message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(i => { fieldErrors[i.path[0] as string] = i.message; });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const submissionId = crypto.randomUUID();
      const { error } = await supabase.from('submissions').insert([{
        id: submissionId,
        type: formData.type === 'general' ? 'contact' : formData.type,
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      }]);
      if (error) throw error;

      // Send confirmation email (fire-and-forget)
      supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'contact-confirmation',
          recipientEmail: formData.email.trim(),
          idempotencyKey: `contact-confirm-${submissionId}`,
          templateData: { name: formData.name.trim(), subject: formData.subject.trim() },
        },
      }).catch(() => {});

      setSubmitted(true);
      toast.success("Message sent! We'll be in touch soon.");
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
      <section className="relative pt-36 sm:pt-44 md:pt-52 pb-20 sm:pb-24 md:pb-28 px-4 sm:px-6 md:px-10 grain-overlay">
        <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <ScrollReveal direction="up" blur>
            <p className="section-label mb-4 sm:mb-5">Get In Touch</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-[0.02em] leading-[0.85] mb-6 sm:mb-8">
              CONTACT <span className="text-gradient-gold">URS79</span>
            </h1>
            <div className="divider-gold" />
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24 sm:pb-32 md:pb-44 px-4 sm:px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          {/* Info */}
          <ScrollRevealGroup stagger={0.12} className="lg:col-span-4 space-y-4 sm:space-y-5">
            <ScrollRevealItem direction="left" blur>
              <div className="glass-card p-6 sm:p-8 md:p-10 hover:-translate-y-1 transition-transform duration-400">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-4 sm:mb-5">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold mb-2 sm:mb-3 text-base">Email</h3>
                <a href="mailto:info@urs79.com" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300">info@urs79.com</a>
              </div>
            </ScrollRevealItem>
            <ScrollRevealItem direction="left" blur>
              <div className="glass-card p-6 sm:p-8 md:p-10 hover:-translate-y-1 transition-transform duration-400">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-4 sm:mb-5">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold mb-2 sm:mb-3 text-base">Location</h3>
                <p className="text-muted-foreground text-sm">Los Angeles, CA</p>
              </div>
            </ScrollRevealItem>
            <ScrollRevealItem direction="left" blur>
              <div className="glass-card p-6 sm:p-8 md:p-10 hover:-translate-y-1 transition-transform duration-400">
                <h3 className="font-bold mb-4 sm:mb-5 text-base">Inquiry Types</h3>
                <ul className="space-y-2.5 sm:space-y-3 text-sm text-muted-foreground">
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
            {submitted ? (
              <div className="glass-card p-10 sm:p-14 text-center">
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="font-display text-2xl sm:text-3xl mb-3">MESSAGE SENT</h2>
                <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
                  Thank you for reaching out! Our team will review your message and get back to you within 24-48 hours.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form id="inquiry-form" onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 md:p-14 space-y-5 sm:space-y-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="section-label mb-2 sm:mb-3 block">Name</label>
                    <Input
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="bg-secondary border-border text-foreground h-11 sm:h-13"
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="section-label mb-2 sm:mb-3 block">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="bg-secondary border-border text-foreground h-11 sm:h-13"
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="section-label mb-2 sm:mb-3 block">Subject</label>
                    <Input
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-secondary border-border text-foreground h-11 sm:h-13"
                      placeholder="Subject"
                    />
                    {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
                  </div>
                  <div>
                    <label className="section-label mb-2 sm:mb-3 block">Inquiry Type</label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value })}
                      className="w-full h-11 sm:h-13 px-3 bg-secondary border border-border text-foreground text-sm rounded-md"
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
                  <label className="section-label mb-2 sm:mb-3 block">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="bg-secondary border-border text-foreground"
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                  <p className="text-[10px] text-muted-foreground/50 mt-1 text-right">{formData.message.length}/2000</p>
                </div>
                <Button type="submit" disabled={loading} className="btn-primary h-11 sm:h-12 gap-2">
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Send Message <Send className="w-4 h-4" /></>
                  )}
                </Button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
