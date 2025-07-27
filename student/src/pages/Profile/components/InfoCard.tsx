import type { InfoCardProps } from '../models';

export default function InfoCard({label, value, icon}: InfoCardProps) {
    return (
        <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
            <div className="bg-background rounded-full p-2 text-black dark:text-white">{icon}</div>
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-lg font-semibold">{value}</p>
            </div>
        </div>
    );
} 