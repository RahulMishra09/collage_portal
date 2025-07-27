import type { JSX } from 'react';
import { useState, useEffect } from 'react';
import { RESOURCES_DATA } from '../constants/resourcesData';

export function useResources(iconMap: Record<string, JSX.Element>) {
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    setResources(RESOURCES_DATA.map((r: any) => ({ ...r, icon: iconMap[r.title] })));
  }, [iconMap]);

  return {
    resources,
    isLoading: false,
    error: null,
  };
} 