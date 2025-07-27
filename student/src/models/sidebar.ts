import type {LucideIcon} from 'lucide-react';

export interface SidebarItem {
    label: string;
    icon: LucideIcon;
    link: string;
    subsections?: SidebarItem[];
    // hasChevron: boolean;
}

export interface SidebarSection extends SidebarItem {
    subsections?: SidebarItem[];
}

export interface SidebarProps {
    items?: SidebarSection[];
    onLinkClick?: () => void;
}