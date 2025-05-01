import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const skills = [
  { name: 'React', level: 90 },
  { name: 'JavaScript', level: 85 },
  { name: 'CSS/SCSS', level: 80 },
  { name: 'Node.js', level: 75 },
  { name: 'UI/UX Design', level: 85 },
  { name: 'Responsive Design', level: 90 },
];

const About = () => {
  return (
    <div className="about-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="section-header"
      >
        <h2>About Me</h2>
        <p>Get to know my background and skills</p>
      </motion.div>
      
      <div className="about-content">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="about-image"
        >
          <div className="profile-image">
            <div className="image-shape"></div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="about-text"
        >
          <h3>Who I Am</h3>
          <p>
            I'm a passionate frontend developer and UI/UX designer with over 5 years of experience 
            creating digital experiences that users love. My approach combines clean code with 
            intuitive design, focusing on the details that make products stand out.
          </p>
          <p>
            I specialize in building responsive web applications and mobile interfaces that are both 
            visually appealing and highly functional. My background in design allows me to bridge the 
            gap between aesthetics and technical implementation.
          </p>
          
          <div className="skills-container">
            <h3>Skills & Expertise</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  className="skill-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div 
                      className="skill-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 * index }}
                      viewport={{ once: true }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="about-cta">
            <a href="/resume.pdf" className="secondary-button" download>
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;