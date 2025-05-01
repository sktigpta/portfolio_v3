import { useState } from 'react';
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
  Bitcoin
} from 'lucide-react';

const Skills = () => {
  // Skills data with logo IDs
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

  // Get all skills as a flat array with their categories
  const allSkillsWithCategories = Object.entries(skills).flatMap(([category, skillsList]) =>
    skillsList.map(skill => ({ ...skill, category }))
  );

  // Filter skills based on active filter
  const filteredSkills = activeFilter === 'All'
    ? allSkillsWithCategories
    : allSkillsWithCategories.filter(item => item.category === activeFilter);

  // Get icon based on logoId
  const getLogoIcon = (logoId) => {
    const iconProps = { size: 24, className: "text-white" };
    
    switch(logoId) {
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

  // Get category icon
  const getCategoryIcon = (category) => {
    const iconProps = { color: "white", size: 24 };
    
    switch(category) {
      case 'Languages':
        return <Code {...iconProps} />;
      case 'Frameworks/Libraries':
        return <Laptop {...iconProps} />;
      case 'Databases':
        return <Database {...iconProps} />;
      case 'Cloud/DevOps':
        return <Cloud {...iconProps} />;
      case 'Technologies':
        return <FileCode {...iconProps} />;
      case 'Soft Skills':
        return <Users {...iconProps} />;
      default:
        return <Briefcase {...iconProps} />;
    }
  };

  return (
    <section>
      <div className="title text-lg font-semibold text-neutral-200 mb-4">Skills</div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-1 rounded-md text-sm transition-all ${
              activeFilter === filter
                ? 'bg-neutral-700 text-neutral-200 font-weight-400'
                : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-5 md:grid-cols-7 gap-2">
        {filteredSkills.map(({ name, logoId, category }) => (
          <div
            key={name}
            className="w-full bg-neutral-800 p-3 flex flex-col items-center text-center hover:bg-neutral-700 transition-colors rounded"
          >
            <div className="mb-2">
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