import { useState } from 'react';
import { Send, Mail, User, MessageSquare, Loader2, Code, MapPin, Phone, Globe, MessageCircle } from 'lucide-react';
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus(null);

      try {
        // Real API call to your backend
        const response = await fetch('https://portfolio-v2-backend.vercel.app/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        // Reset form on success
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitStatus('success');
      } catch (error) {
        console.error('Contact form error:', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section>
      <h1 className="title">Contact</h1>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* Left side - Contact Information */}
        <div className="hidden lg:block w-full lg:w-1/3">
          <div className="bg-neutral-800 p-6 rounded h-full">
            <h2 className="text-xl font-semibold mb-6 text-neutral-200">Contact Information</h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin size={20} className="mr-3 text-neutral-400 mt-1" />
                <div>
                  <h3 className="text-neutral-300 font-medium">Location</h3>
                  <p className="text-neutral-400">Bhilai, CG, India (490023)</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail size={20} className="mr-3 text-neutral-400 mt-1" />
                <div>
                  <h3 className="text-neutral-300 font-medium">Email</h3>
                  <a href="mailto:sktigpta@gmail.com" className="text-neutral-400 hover:text-neutral-200 transition-colors">
                    sktigpta@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone size={20} className="mr-3 text-neutral-400 mt-1" />
                <div>
                  <h3 className="text-neutral-300 font-medium">Phone</h3>
                  <p className="text-neutral-400">+91 9123130372</p>
                </div>
              </div>

              <div className="flex items-start">
                <Globe size={20} className="mr-3 text-neutral-400 mt-1" />
                <div>
                  <h3 className="text-neutral-300 font-medium">Website</h3>
                  <a href="https://me.pigoo.in" className="text-neutral-400 hover:text-neutral-200 transition-colors">
                    https://me.pigoo.in
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-neutral-300 font-medium mb-4">Connect with me</h3>
              <div className="flex space-x-4">
                <a href="https://linkedin.com/in/example" className="p-2 bg-neutral-700 hover:bg-neutral-600 transition-colors rounded-full" title="LinkedIn">
                  <FaLinkedinIn size={20} className="text-neutral-300" />
                </a>
                <a href="https://github.com/example" className="p-2 bg-neutral-700 hover:bg-neutral-600 transition-colors rounded-full" title="GitHub">
                  <FaGithub size={20} className="text-neutral-300" />
                </a>
                <a href="https://leetcode.com/example" className="p-2 bg-neutral-700 hover:bg-neutral-600 transition-colors rounded-full" title="LeetCode">
                  <Code size={20} className="text-neutral-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Contact Form */}
        <div className="w-full md:w-2/3">
          {submitStatus === 'success' ? (
            <div className="bg-neutral-800 p-6 rounded w-full">
              <div className="text-green-400 mb-4 flex items-center">
                <Send size={20} className="mr-2" />
                <span>Message sent successfully!</span>
              </div>
              <p className="text-neutral-300">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              <button
                onClick={() => setSubmitStatus(null)}
                className="mt-4 px-5 py-2 bg-neutral-700 hover:bg-neutral-600 transition-colors rounded text-neutral-200"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="bg-neutral-800 p-6 rounded">
              <div className="mb-4">
                <label htmlFor="name" className="block text-neutral-300 mb-2 flex items-center">
                  <User size={18} className="mr-2 text-neutral-400" />
                  <span>Name</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 bg-neutral-700 text-neutral-200 rounded focus:outline-none focus:ring-1 focus:ring-neutral-500 ${errors.name ? 'border border-red-500' : 'border border-neutral-600'}`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-neutral-300 mb-2 flex items-center">
                  <Mail size={18} className="mr-2 text-neutral-400" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 bg-neutral-700 text-neutral-200 rounded focus:outline-none focus:ring-1 focus:ring-neutral-500 ${errors.email ? 'border border-red-500' : 'border border-neutral-600'}`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-neutral-300 mb-2 flex items-center">
                  <MessageCircle size={18} className="mr-2 text-neutral-400" />
                  <span>Subject</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full p-3 bg-neutral-700 text-neutral-200 rounded focus:outline-none focus:ring-1 focus:ring-neutral-500 ${errors.subject ? 'border border-red-500' : 'border border-neutral-600'}`}
                  placeholder="Subject of your message"
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-neutral-300 mb-2 flex items-center">
                  <MessageSquare size={18} className="mr-2 text-neutral-400" />
                  <span>Message</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className={`w-full p-3 bg-neutral-700 text-neutral-200 rounded focus:outline-none focus:ring-1 focus:ring-neutral-500 ${errors.message ? 'border border-red-500' : 'border border-neutral-600'}`}
                  placeholder="Your message here..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full px-5 py-3 bg-neutral-700 hover:bg-neutral-600 transition-colors rounded text-neutral-200 font-medium flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {submitStatus === 'error' && (
                <p className="text-red-500 mt-4 text-center">
                  Something went wrong. Please try again later.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactPage;