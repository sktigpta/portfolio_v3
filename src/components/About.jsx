import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import './About.css';

const testimonials = [
  {
    id: 1,
    name: 'Sameer Saikh',
    text: 'Shaktidhar is an exceptional developer who consistently delivers high-quality work. His attention to detail and ability to translate complex requirements into elegant solutions is outstanding.',
    rating: 3.4,
    avatar: null
  },
  {
    id: 2,
    name: 'Robbin',
    role: 'Marketing Associate',
    company: 'Marketing Company',
    text: 'Working with Shaktidhar was a pleasure. His technical skills are top-notch, and he has a great eye for design. He always goes above and beyond to ensure the best user experience.',
    rating: 5,
    avatar: null
  },
  {
    id: 3,
    name: 'Praduman Gupta',
    role: 'UX Designer',
    company: 'Creative Studio',
    text: 'Shaktidhar\'s ability to bridge the gap between design and development is remarkable. He understands user needs and creates intuitive interfaces that users love.',
    rating: 5,
    avatar: null
  }
];

const About = () => {
  return (
    <div className="bg-black" style={{
      marginTop: '55px',
      minHeight: 'calc(100vh - 50px)',
      padding: '2rem 1rem'
    }}>
      <section style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8 w-full"
        >
          <h2 className="title text-3xl font-bold text-white mb-4">About Me</h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-0 md:gap-50 mb-12 w-full items-center md:items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="w-[50px] h-[50px] md:w-64 md:h-64 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xl md:text-4xl font-bold">
              SG
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center text-center md:text-left mt-4 md:mt-0"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">Who I Am</h3>
            <p className="text-neutral-300 mb-4 leading-relaxed">
              I’m a passionate frontend developer and UI/UX enthusiast, currently pursuing my B.Tech at
              Rungta College of Engineering and Technology. I enjoy turning ideas into interactive, visually
              appealing digital experiences, with a focus on clean code and user-friendly design.
            </p>
            <p className="text-neutral-300 leading-relaxed">
              I specialize in creating responsive web applications and interfaces that blend creativity with
              functionality. As I progress in my academic journey, I’m constantly exploring new tools and
              techniques to bridge the gap between design and development.
            </p>

          </motion.div>
        </div>


        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-12 w-full"
        >
          <div className="mb-8">
            <h3 className="title text-2xl font-bold text-white">What Others Say About Me</h3>
            <p className="text-neutral-300">Feedback from colleagues and clients</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  <Quote size={24} className="text-blue-400 mb-2" />
                  <p className="text-neutral-300 italic leading-relaxed">{testimonial.text}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-neutral-400 text-sm">{testimonial.role}</p>
                    <p className="text-neutral-500 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;