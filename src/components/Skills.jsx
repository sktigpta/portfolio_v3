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
      { name: 'Python', logoId: 'fileCode' },
      { name: 'JavaScript', logoId: 'fileJson' },
      { name: 'C++', logoId: 'code' },
      { name: 'HTML/CSS', logoId: 'monitorSmartphone' },
      { name: 'SQL', logoId: 'database' }
    ],
    'Frameworks/Libraries': [
      { name: 'React', logoId: 'flame' },
      { name: 'Node.js', logoId: 'server' },
      { name: 'Express', logoId: 'network' },
      { name: 'Next.js', logoId: 'laptop' },
      { name: 'TensorFlow', logoId: 'brain' },
      { name: 'TailwindCSS', logoId: 'fileCode' }
    ],
    Databases: [
      { name: 'MongoDB', logoId: 'database' },
      { name: 'MySQL', logoId: 'database' },
      { name: 'Firebase', logoId: 'flame' }
    ],
    'Cloud/DevOps': [
      { name: 'Docker', logoId: 'cloud' },
      { name: 'GCP', logoId: 'cloud' },
      { name: 'Git', logoId: 'github' },
      { name: 'Postman', logoId: 'webhook' },
      { name: 'VS Code', logoId: 'fileCode' }
    ],
    Technologies: [
      { name: 'REST APIs', logoId: 'webhook' },
      { name: 'JWT', logoId: 'lock' },
      { name: 'Blockchain', logoId: 'bitcoin' },
      { name: 'Ethereum', logoId: 'bitcoin' },
      { name: 'Puppeteer', logoId: 'compass' },
      { name: 'OpenCV', logoId: 'eye' },
      { name: 'YOLOv5', logoId: 'eye' }
    ],
    'Soft Skills': [
      { name: 'Problem Solving', logoId: 'hammer' },
      { name: 'Collaboration', logoId: 'users' },
      { name: 'Communication', logoId: 'messageSquare' },
      { name: 'Adaptability', logoId: 'shuffle' }
    ]
  };

  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', ...Object.keys(skills)];

  const allSkillsWithCategories = Object.entries(skills).flatMap(([category, skillsList]) =>
    skillsList.map(skill => ({ ...skill, category }))
  );

  const filteredSkills = activeFilter === 'All'
    ? allSkillsWithCategories
    : allSkillsWithCategories.filter(item => item.category === activeFilter);

  const getLogoIcon = (logoId) => {
    const iconProps = { size: 24, className: "text-white" };
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
    checkScrollPosition();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScrollPosition);
    return () => el?.removeEventListener('scroll', checkScrollPosition);
  }, []);

  return (
    <section>
      <div className="title text-lg font-semibold text-neutral-200 mb-4">Skills</div>

      {/* Scrollable Filter Buttons with Arrows */}
      <div className="relative w-full mb-8">
        {showLeft && (
          <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-neutral-800 hover:bg-neutral-700 p-1.4">
            <ChevronLeft size={20} className="text-white" />
          </button>
        )}
        {showRight && (
          <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-neutral-800 hover:bg-neutral-700 p-1.4">
            <ChevronRight size={20} className="text-white" />
          </button>
        )}
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide"
        >
          <div className="inline-flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-1 rounded-md text-sm transition-all whitespace-nowrap ${activeFilter === filter
                    ? 'bg-neutral-700 text-neutral-200 font-semibold'
                    : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-5 md:grid-cols-7 gap-2">
        {filteredSkills.map(({ name, logoId }) => (
          <div
            key={name}
            className="w-full bg-neutral-800 p-3 flex flex-col items-center text-center hover:bg-neutral-700 transition-colors rounded"
          >
            <div className="mb-2 hidden lg:block">
              {getLogoIcon(logoId)}
            </div>
            <span className="text-neutral-200">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
