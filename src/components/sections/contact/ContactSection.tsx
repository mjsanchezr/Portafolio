/**
 * ContactSection — Contact form (React Hook Form) + contact info + social links.
 */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { ContactFormData } from '../../../core/types';

const CONTACT_INFO = [
    {
        icon: '📧',
        label: 'Email',
        value: 'mario101104s@gmail.com',
        href: 'mailto:mario101104s@gmail.com',
    },
    {
        icon: '📱',
        label: 'Phone',
        value: '+58 412 922 9895',
        href: 'tel:+584129229895',
    },
    {
        icon: '💼',
        label: 'Fiverr',
        value: 'fiverr.com/mariosanchezr',
        href: 'https://www.fiverr.com/mariosanchezr',
    },
];

const SOCIAL_LINKS = [
    { name: 'GitHub', url: 'https://github.com/mjsanchezr' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mario-sanchez-ab2030370' },
];

export function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>();

    const onSubmit = async (data: ContactFormData) => {
        // Show loading state for a better feel
        await new Promise(res => setTimeout(res, 800));

        // Construct WhatsApp message
        const message = `*New Portfolio Contact*\n\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Subject:* ${data.subject}\n\n*Message:*\n${data.message}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/584129229895?text=${encodedMessage}`;

        // Attempt to open WhatsApp
        window.open(whatsappUrl, '_blank');

        setSubmitted(true);
        reset();
        // Keep success message visible longer so they can use the fallback if needed
        setTimeout(() => setSubmitted(false), 8000);
    };

    const inputClass = 'input-field w-full';

    return (
        <section id="contact" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-600/3 to-transparent pointer-events-none" />

            <div ref={ref} className="section-container">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="section-title">
                        Get in <span className="gradient-text">Touch</span>
                    </h2>
                    <p className="section-subtitle">Let's build something great together</p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-10">
                    {/* Left — Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-3 glass-card p-8"
                    >
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center h-full py-10 text-center gap-4"
                            >
                                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h4 className="text-xl font-bold text-white mb-1">Message Ready!</h4>
                                    <p className="text-gray-400 max-w-xs mx-auto">
                                        WhatsApp should have opened in a new tab. If not, click the button below:
                                    </p>
                                    <a
                                        href={`https://wa.me/584129229895?text=${encodeURIComponent(`*New Portfolio Contact*\n\n(Follow up manual send)`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary text-sm py-2 px-6 mt-2 self-center"
                                    >
                                        Open WhatsApp Manually
                                    </a>
                                </div>
                            </motion.div>
                        ) : (
                            <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        placeholder="Your name"
                                        className={`${inputClass} ${errors.name ? 'border-red-500/50 focus:ring-red-500/30' : ''}`}
                                        {...register('name', { required: 'Name is required' })}
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        placeholder="your@email.com"
                                        className={`${inputClass} ${errors.email ? 'border-red-500/50 focus:ring-red-500/30' : ''}`}
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Please enter a valid email' },
                                        })}
                                    />
                                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Subject</label>
                                    <input
                                        id="contact-subject"
                                        type="text"
                                        placeholder="Project idea, freelance, etc."
                                        className={`${inputClass} ${errors.subject ? 'border-red-500/50 focus:ring-red-500/30' : ''}`}
                                        {...register('subject', { required: 'Subject is required' })}
                                    />
                                    {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>}
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
                                    <textarea
                                        id="contact-message"
                                        rows={5}
                                        placeholder="Tell me about your project..."
                                        className={`${inputClass} resize-none ${errors.message ? 'border-red-500/50 focus:ring-red-500/30' : ''}`}
                                        {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message must be at least 10 characters' } })}
                                    />
                                    {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
                                </div>

                                <button
                                    id="contact-submit"
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            Send Message
                                        </span>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>

                    {/* Right — Contact info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 flex flex-col gap-6"
                    >
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">Let's connect</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                I'm open to freelance projects, collaborations, and job opportunities.
                                Feel free to reach out through any of the channels below.
                            </p>
                        </div>

                        {/* Contact info items */}
                        <div className="flex flex-col gap-3">
                            {CONTACT_INFO.map(item => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target={item.href.startsWith('http') ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    className="glass-card p-4 flex items-center gap-3 hover:border-indigo-500/30 transition-colors group"
                                >
                                    <span className="text-2xl">{item.icon}</span>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
                                        <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{item.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Social links */}
                        <div className="pt-2">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Also find me on</p>
                            <div className="flex gap-3">
                                {SOCIAL_LINKS.map(link => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-outline text-sm py-2 px-4"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Availability indicator */}
                        <div className="glass-card p-4 flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-white">Available for work</p>
                                <p className="text-xs text-gray-500">Responding within 24 hours</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
