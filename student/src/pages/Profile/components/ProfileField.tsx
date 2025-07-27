import type { ProfileFieldProps } from '../models';

export default function ProfileField({icon, label, value}: ProfileFieldProps) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5">{icon}</div>
            <div>
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <p className="font-medium">{value}</p>
            </div>
        </div>
    );
} 