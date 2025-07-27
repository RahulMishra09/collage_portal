import type { JSX } from 'react';
import { motion } from 'framer-motion';
import { Book, FileText, Users, Activity, Briefcase } from 'lucide-react';
import { CardTitle } from '@/components/ui/card';
import ResourceCard from './ResourceCard';
import { useResources } from '../hooks/useResources';

const iconMap: Record<string, JSX.Element> = {
  'Library': <Book className="w-6 h-6" />,
  'Course Materials': <FileText className="w-6 h-6" />,
  'Student Services': <Users className="w-6 h-6" />,
  'Extracurricular Activities': <Activity className="w-6 h-6" />,
  'Career Center': <Briefcase className="w-6 h-6" />,
};

const ResourcesPage = () => {
  const { resources, isLoading, error } = useResources(iconMap);

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <CardTitle className='mb-4'>Resources {'>>'}</CardTitle>
        </motion.div>
        {/* Resources Grid */}
        <motion.div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </motion.div>
        {isLoading && <div className="text-center">Loading...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default ResourcesPage; 