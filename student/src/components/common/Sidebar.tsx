import {memo, useState, useEffect} from 'react';
import type { SidebarSection, SidebarProps} from '@/models/sidebar';
import logo from '@/assets/dark/img/manipal_logo.png';
import Profile from '../screens/profile/Profile.tsx';
import {Link, useLocation} from 'react-router-dom';
import {
    ChevronDown,
    ChevronRight,
    LayoutDashboard,
    Clock,
    MessageSquare,
    ClipboardList,
    Book,
    DollarSign,
    Library,
    FolderOpen,
    FilePlus // Add this import for the assignment icon
} from 'lucide-react';

// Default sidebar items with Lucide icons
const defaultSidebarItems: SidebarSection[] = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        link: '/'
    },
    {
        label: 'Time Table',
        icon: Clock,
        link: '/timetable'
    },
    {
        label: 'Attendance',
        icon: Clock,
        link: '/attendance'
    },
    {
        label: 'Give Feedback',
        icon: MessageSquare,
        link: '/feedback'
    },
    {
        label: 'Mentor Mentee Form',
        icon: MessageSquare,
        link: '/mentor-mentee'
    },
    {
      label: 'Request NOC',
      icon: MessageSquare,
      link: '/noc'
    },
    {
        label: 'Registration',
        icon: ClipboardList,
        link: '#',
        subsections: [
            {
                label: 'Make-Up',
                icon: ClipboardList,
                link: '/make-up'
            },
            {
                label: 'Re-Registration',
                icon: ClipboardList,
                link: '/rereg'
            },
            {
                label: 'Semester Courses',
                icon: ClipboardList,
                link: '/sem-reg'
            },
            {
                label: 'Bridge Courses',
                icon: ClipboardList,
                link: '/bridgecourses'
            },
            {
                label: 'Open Elective',
                icon: ClipboardList,
                link: '/openelective'
            }
        ]
    },
    {
        label: 'Examinations',
        icon: Book,
        link: '/examinations'
    },
    {
        label: 'Finance',
        icon: DollarSign,
        link: '/finance'
    },
    {
        label: 'Resources',
        icon: Library,
        link: '/resources'
    },
    {
        label: 'Grade',
        icon: FolderOpen,
        link: '/grade'
    },
    {
        label: 'Assignment Submission',
        icon: FilePlus, // Use any icon you prefer
        link: '/assignment-submission'
    },

];

// Memoized Logo Component
const Logo = memo(() => (
    <div className="px-4 py-6">
        <div className="bg-white dark:accent-black rounded-lg shadow-sm overflow-hidden">
            <img src={logo} alt="Manipal Logo" className="w-full h-auto object-contain"/>
        </div>
    </div>
));

// Memoized Profile Section
const ProfileSection = memo(() => (
    <div className="mt-auto px-3 pb-4">
        <Profile/>
    </div>
));

// Memoized Navigation Section Component
const NavigationSection = memo(({
    section,
    currentPath,
    isExpanded,
    onToggleExpand,
    onLinkClick
  }: {
    section: SidebarSection;
    currentPath: string;
    isExpanded: boolean;
    onToggleExpand: () => void;
    onLinkClick?: () => void;
  }) => {
    const hasSubsections = section.subsections && section.subsections.length > 0;
  
    return (
      <div className="mb-1">
        <Link
          to={hasSubsections ? '#' : section.link}
          onClick={(e) => {
            if (hasSubsections) {
              e.preventDefault();
              onToggleExpand();
            } else {
              onLinkClick?.();
            }
          }}
          className={`flex items-center justify-between px-4 py-3 rounded-lg w-full ${
            currentPath === section.link ? 'bg-orange-500 text-white dark:text-black font-medium shadow-sm' : 'hover:bg-gray-100 dark:hover:bg-stone-700'
          }`}
        >
          <div className="flex items-center">
            <section.icon className="w-5 h-5 mr-3" />
            <span>{section.label}</span>
          </div>
          {hasSubsections && (
            isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
          )}
        </Link>
  
        {hasSubsections && isExpanded && (
          <div className="ml-5 mt-1 space-y-1 pl-2 border-l-2 border-gray-200 dark:border-stone-700">
            {(section.subsections ?? []).map(sub => (
              <Link
                key={sub.label}
                to={sub.link}
                onClick={onLinkClick}
                className={`flex items-center px-4 py-2 rounded-lg w-full ${
                  currentPath === sub.link ? 'bg-orange-500 text-white dark:text-black font-medium' : 'hover:bg-gray-100 dark:hover:bg-stone-700'
                }`}
              >
                <sub.icon className="w-4 h-4 mr-2" />
                <span className="text-sm">{sub.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  });
  

// Memoized Navigation Menu Component
const NavigationMenu = memo(({
    sections,
    currentPath,
    onLinkClick
  }: {
    sections: SidebarSection[];
    currentPath: string;
    onLinkClick?: () => void;
  }) => {
    const [expandedSectionIds, setExpandedSectionIds] = useState<string[]>([]);
  
    useEffect(() => {
      const activeSectionId = sections.find(section =>
        section.subsections?.some(sub => sub.link === currentPath)
      )?.label;
      if (activeSectionId) {
        setExpandedSectionIds([activeSectionId]);
      }
    }, [currentPath, sections]);
  
    const handleSectionToggle = (sectionLabel: string) => {
      setExpandedSectionIds(prev =>
        prev.includes(sectionLabel) ? [] : [sectionLabel]
      );
    };
  
    return (
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="px-3 pt-2 pb-4">
          <div className="text-xl font-bold mb-4 px-4">Student Portal</div>
        </div>
        <div className="flex-1 px-3 space-y-1 overflow-y-auto pr-1">
          {sections.map(section => (
            <NavigationSection
              key={section.label}
              section={section}
              currentPath={currentPath}
              isExpanded={expandedSectionIds.includes(section.label)}
              onToggleExpand={() => handleSectionToggle(section.label)}
              onLinkClick={onLinkClick}
            />
          ))}
        </div>
      </div>
    );
  });
  
// Main Sidebar Component
const Sidebar = ({ items = defaultSidebarItems, onLinkClick }: SidebarProps) => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className="flex flex-col h-full shadow-lg bg-gradient-to-r from-neutral-100 to-zinc-100 dark:bg-gradient-to-b dark:from-neutral-900 dark:to-zinc-950 border-r dark:border-stone-600">
            <Logo/>
            <NavigationMenu 
                sections={items} 
                currentPath={currentPath}
                onLinkClick={onLinkClick}  // Pass the handler here
            />
            <ProfileSection/>
        </div>
    );
};

export default Sidebar;