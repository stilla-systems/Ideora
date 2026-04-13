'use client';

import { useState } from 'react';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast.success('Message sent!', {
        description: 'We\'ll get back to you within 24 hours.',
      });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      toast.error('Failed to send', { description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="mb-12">
          <Link href="/" className="text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors">
            ← Back to home
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl">
            Have a question or feedback? We&apos;d love to hear from you. Send us a message and
            we&apos;ll respond within 24 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              {
                icon: Mail,
                title: 'Email',
                value: 'hello@ideora.com',
                color: 'text-indigo-400',
                bg: 'bg-indigo-600/10',
              },
              {
                icon: MapPin,
                title: 'Headquarters',
                value: 'San Francisco, CA',
                color: 'text-violet-400',
                bg: 'bg-violet-600/10',
              },
            ].map(({ icon: Icon, title, value, color, bg }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-card p-6"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${bg} ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{title}</h3>
                    <p className="text-foreground/60 text-sm">{value}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <h3 className="font-semibold mb-2">Response Time</h3>
              <p className="text-foreground/60 text-sm">
                We typically respond within 24 hours on business days.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400">Support is online</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-card p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <CheckCircle2 className="h-12 w-12 text-green-400" />
                  <h3 className="text-xl font-semibold">Message sent!</h3>
                  <p className="text-foreground/60 max-w-sm">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        minLength={2}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more…"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      minLength={10}
                      rows={6}
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium"
                  >
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
