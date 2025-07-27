import type { FC } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ResourceCardProps {
  resource: any;
}

const ResourceCard: FC<ResourceCardProps> = ({ resource }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
    className="relative p-6 rounded-xl bg-white dark:bg-gradient-to-br from-neutral-900 to-zinc-950 text-card-foreground shadow hover:shadow-2xl transition-shadow duration-300 border-l-4 border-yellow-500"
  >
    <div className="flex items-start mb-4">
      <div className="p-2 bg-yellow-500 rounded-lg text-white">
        {resource.icon}
      </div>
      <span className="ml-auto text-xs font-medium text-yellow-500 dark:text-yellow-500">
        {resource.category}
      </span>
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
      {resource.title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
      {resource.description}
    </p>
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-yellow-500 dark:text-yellow-500 font-semibold hover:text-yellow-600 dark:hover:text-yellow-400"
    >
      Learn More
      <ChevronRight className="ml-1 w-4 h-4" />
    </a>
  </motion.div>
);

export default ResourceCard; 