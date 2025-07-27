import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getAttendanceStatusClass, getAttendanceStatusText, getBadgeVariant} from '../utils/attendanceUtils';
import type { DetailedSubject } from '../models';

interface SubjectCardProps {
  subject: DetailedSubject;
  expanded: boolean;
  onToggle: (serialNo: number) => void;
}

const SubjectCard = ({ subject, expanded, onToggle }: SubjectCardProps) => (
  <Card className="overflow-hidden">
    <div className={`h-1 w-full ${getAttendanceStatusClass(subject.percentage)}`}></div>
    <CardContent className="p-0">
      <div
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={() => onToggle(subject.serialNo)}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
            {subject.serialNo}
          </div>
          <div>
            <h3 className="font-medium">{subject.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{subject.code}</span>
              <span>•</span>
              <span>Section {subject.section}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={getBadgeVariant(subject.percentage)}>{subject.percentage}%</Badge>
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </div>
      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <span className="text-sm text-muted-foreground">Present</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {subject.presentNo}
              </span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
              <span className="text-sm text-muted-foreground">Absent</span>
              <span className="text-2xl font-bold text-red-600 dark:text-red-400">{subject.absentNo}</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {subject.totalClasses}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Status:</span>
              <span>{getAttendanceStatusText(subject.percentage)}</span>
            </div>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);

export default SubjectCard; 