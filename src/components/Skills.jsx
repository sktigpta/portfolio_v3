import { useRef, useState, useEffect } from 'react';
import {
  Code,
  Database,
  Cloud,
  Laptop,
  Users,
  Briefcase,
  FileCode,
  FileJson,
  MonitorSmartphone,
  Github,
  Server,
  BarChart3,
  Flame,
  Lock,
  Webhook,
  Compass,
  Eye,
  Network,
  Brain,
  Hammer,
  UserPlus,
  MessageSquare,
  Shuffle,
  Bitcoin,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Skills = () => {
  const skills = {
    Languages: [
      { name: 'Python', logoId: 'fileCode', color: 'from-cyan-400/20 to-blue-500/20' },
      { name: 'JavaScript', logoId: 'fileJson', color: 'from-yellow-400/20 to-orange-500/20' },
      { name: 'C++', logoId: 'code', color: 'from-blue-400/20 to-indigo-500/20' },
      { name: 'HTML/CSS', logoId: 'monitorSmartphone', color: 'from-orange-400/20 to-red-500/20' },
      { name: 'SQL', logoId: 'database', color: 'from-green-400/20 to-emerald-500/20' }
    ],
    'Frameworks/Libraries': [
      { name: 'React', logoId: 'flame', color: 'from-cyan-400/20 to-blue-500/20' },
      { name: 'Node.js', logoId: 'server', color: 'from-green-400/20 to-green-600/20' },
      { name: 'Express', logoId: 'network', color: 'from-gray-400/20 to-slate-500/20' },
      { name: 'Next.js', logoId: 'laptop', color: 'from-slate-400/20 to-gray-500/20' },
      { name: 'TensorFlow', logoId: 'brain', color: 'from-orange-400/20 to-red-500/20' },
      { name: 'TailwindCSS', logoId: 'fileCode', color: 'from-teal-400/20 to-cyan-500/20' }
    ],
    Databases: [
      { name: 'MongoDB', logoId: 'database', color: 'from-green-400/20 to-emerald-500/20' },
      { name: 'MySQL', logoId: 'database', color: 'from-blue-400/20 to-cyan-500/20' },
      { name: 'Firebase', logoId: 'flame', color: 'from-yellow-400/20 to-orange-500/20' }
    ],
    'Cloud/DevOps': [
      { name: 'Docker', logoId: 'cloud', color: 'from-blue-400/20 to-indigo-500/20' },
      { name: 'GCP', logoId: 'cloud', color: 'from-red-400/20 to-pink-500/20' },
      { name: 'Git', logoId: 'github', color: 'from-gray-400/20 to-slate-500/20' },
      { name: 'Postman', logoId: 'webhook', color: 'from-orange-400/20 to-red-500/20' },
      { name: 'VS Code', logoId: 'fileCode', color: 'from-blue-400/20 to-cyan-500/20' }
    ],
    Technologies: [
      { name: 'REST APIs', logoId: 'webhook', color: 'from-purple-400/20 to-pink-500/20' },
      { name: 'JWT', logoId: 'lock', color: 'from-green-400/20 to-emerald-500/20' },
      { name: 'Blockchain', logoId: 'bitcoin', color: 'from-yellow-400/20 to-orange-500/20' },
      { name: 'Ethereum', logoId: 'bitcoin', color: 'from-indigo-400/20 to-purple-500/20' },
      { name: 'Puppeteer', logoId: 'compass', color: 'from-teal-400/20 to-cyan-500/20' },
      { name: 'OpenCV', logoId: 'eye', color: 'from-red-400/20 to-pink-500/20' },
      { name: 'YOLOv5', logoId: 'eye', color: 'from-violet-400/20 to-purple-500/20' }
    ],
    'Soft Skills': [
      { name: 'Problem Solving', logoId: 'hammer', color: 'from-amber-400/20 to-yellow-500/20' },
      { name: 'Collaboration', logoId: 'users', color: 'from-blue-400/20 to-indigo-500/20' },
      { name: 'Communication', logoId: 'messageSquare', color: 'from-green-400/20 to-teal-500/20' },
      { name: 'Adaptability', logoId: 'shuffle', color: 'from-purple-400/20 to-pink-500/20' }
    ]
  };

  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoaded, setIsLoaded] = useState(false);
  const filters = ['All', ...Object.keys(skills)];

  const allSkillsWithCategories = Object.entries(skills).flatMap(([category, skillsList]) =>
    skillsList.map(skill => ({ ...skill, category }))
  );

  const filteredSkills = activeFilter === 'All'
    ? allSkillsWithCategories
    : allSkillsWithCategories.filter(item => item.category === activeFilter);

  const getLogoIcon = (logoId) => {
    const iconProps = { size: 20, className: "text-white" };
    switch (logoId) {
      case 'code': return <Code {...iconProps} />;
      case 'fileCode': return <FileCode {...iconProps} />;
      case 'fileJson': return <FileJson {...iconProps} />;
      case 'database': return <Database {...iconProps} />;
      case 'cloud': return <Cloud {...iconProps} />;
      case 'laptop': return <Laptop {...iconProps} />;
      case 'users': return <Users {...iconProps} />;
      case 'briefcase': return <Briefcase {...iconProps} />;
      case 'github': return <Github {...iconProps} />;
      case 'server': return <Server {...iconProps} />;
      case 'barChart': return <BarChart3 {...iconProps} />;
      case 'flame': return <Flame {...iconProps} />;
      case 'lock': return <Lock {...iconProps} />;
      case 'webhook': return <Webhook {...iconProps} />;
      case 'compass': return <Compass {...iconProps} />;
      case 'eye': return <Eye {...iconProps} />;
      case 'network': return <Network {...iconProps} />;
      case 'brain': return <Brain {...iconProps} />;
      case 'hammer': return <Hammer {...iconProps} />;
      case 'messageSquare': return <MessageSquare {...iconProps} />;
      case 'shuffle': return <Shuffle {...iconProps} />;
      case 'monitorSmartphone': return <MonitorSmartphone {...iconProps} />;
      case 'bitcoin': return <Bitcoin {...iconProps} />;
      case 'userPlus': return <UserPlus {...iconProps} />;
      default: return <Briefcase {...iconProps} />;
    }
  };

  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScrollPosition = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
  };

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    checkScrollPosition();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScrollPosition);
    return () => el?.removeEventListener('scroll', checkScrollPosition);
  }, []);

  return (
    <section className="relative">
      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes floatBadge {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(2px, -3px) rotate(0.5deg); }
          50% { transform: translate(-2px, 2px) rotate(-0.5deg); }
          75% { transform: translate(1px, 3px) rotate(0.3deg); }
        }
        
        .skill-card {
          animation: floatBadge 8s infinite ease-in-out;
        }
        
        .skill-card:nth-child(odd) {
          animation-delay: 0.5s;
        }
        
        .skill-card:nth-child(3n) {
          animation-delay: 1s;
        }
        
        .skill-card:nth-child(4n) {
          animation-delay: 1.5s;
        }
      `}</style>

      <div className="title text-lg font-semibold text-neutral-200 mb-4">Skills</div>

      {/* Scrollable Filter Buttons with Arrows */}
      <div className="relative w-full mb-8">
        {showLeft && (
          <button 
            onClick={scrollLeft} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 p-1.5 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Scroll filters left"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
        )}
        {showRight && (
          <button 
            onClick={scrollRight} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 p-1.5 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Scroll filters right"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        )}
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide"
          role="tablist"
          aria-label="Skill category filters"
        >
          <div className="inline-flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-xl text-sm transition-all whitespace-nowrap border backdrop-blur-sm hover:scale-105 ${
                  activeFilter === filter
                    ? 'bg-white/20 border-white/40 text-white font-semibold shadow-lg'
                    : 'bg-white/10 border-white/20 text-neutral-200 hover:bg-white/15 hover:border-white/30'
                }`}
                role="tab"
                aria-selected={activeFilter === filter}
                aria-label={`Filter by ${filter} skills`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div 
        className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        role="grid"
        aria-label={`${activeFilter} skills`}
      >
        {filteredSkills.map(({ name, logoId, color }, index) => (
          <div
            key={name}
            className={`skill-card w-full p-4 rounded-xl border border-white/20 bg-gradient-to-r ${color} flex flex-col items-center text-center cursor-pointer transform ${
              isLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"
            } transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/40 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black`}
            style={{
              transitionDelay: `${index * 0.05}s`,
              backdropFilter: "blur(12px)",
              animationDelay: `${index * 0.1}s`,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
            role="gridcell"
            tabIndex={0}
            aria-label={`${name} skill`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Add any click functionality here if needed
              }
            }}
          >
            <div className="mb-2 flex items-center justify-center">
              {getLogoIcon(logoId)}
            </div>
            <span className="text-white text-xs sm:text-sm font-semibold leading-tight">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;