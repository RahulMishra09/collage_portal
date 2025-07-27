import {useState, useEffect} from 'react'
import {Button} from "@/components/ui/button.tsx"
import {Card} from "@/components/ui/card.tsx"
import {ScrollArea} from "@/components/ui/scroll-area.tsx"
import {cn} from "@/lib/utils.ts"
import {ChevronLeft, ChevronRight} from 'lucide-react'

interface TimetableEntry {
    id: number;
    enrollment_number: string;
    timetable: {
        mode: string;
        end_time: string;
        location: string;
        course_id: number;
        course_name?: string;
        start_time: string;
        day_of_week: string;
        professor_id: number;
        timetable_id: number;
    };
}

interface Event {
    id: string;
    title: string;
    date: Date;
    start: string;
    end: string;
    color: 'purple' | 'blue' | 'green';
    location: string;
    mode: string;
}

const HOURS = Array.from({length: 11}, (_, i) => i + 8) // 8 AM to 8 PM

function CurrentTimeIndicator({date}: { date: Date }) {
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 60000) // Update every minute
        return () => clearInterval(timer)
    }, [])

    const isToday = now.toDateString() === date.toDateString()

    if (!isToday) return null

    const top = getEventTop(
        `${now.getHours()}:${now.getMinutes()}`
    )

    return (
        <div
            className="absolute left-0 right-0 flex items-center pointer-events-none z-10"
            style={{top: `${top}px`}}
        >
            <div className="w-2 h-2 rounded-full bg-red-500 -ml-1"/>
            <div className="flex-1 h-px bg-red-500"/>
        </div>
    )
}

export default function Calendar() {
    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const now = new Date()
        const monday = new Date(now)
        monday.setDate(now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1))
        return monday
    })

    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchTimetableData() {
            try {
                const user = JSON.parse(localStorage.getItem('user') || '{}')
                const url = new URL('http://localhost:3000/api/students/timetable')
                url.searchParams.append('enrollment_number', user.enrollmentNumber)
                const response = await fetch(url)
                const data: TimetableEntry[] = await response.json()

                // Map the timetable entries to events
                const processedEvents = data.map(entry => {
                    // Find the date in the current week that matches the day of the week
                    const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                        .findIndex(day => day === entry.timetable.day_of_week)

                    const eventDate = new Date(currentWeekStart)
                    if (dayIndex > 0) { // If not Sunday
                        eventDate.setDate(eventDate.getDate() + (dayIndex - 1))
                    } else { // If Sunday
                        eventDate.setDate(eventDate.getDate() + 6)
                    }

                    // Determine color based on course_id or other property
                    const colorMap: Record<number, 'purple' | 'blue' | 'green'> = {
                        101: 'blue',
                        102: 'purple',
                        103: 'green'
                    }

                    const color = colorMap[entry.timetable.course_id] || 'blue'

                    return {
                        id: entry.id.toString(),
                        title: entry.timetable.course_name || `Course ${entry.timetable.course_id}`,
                        date: eventDate,
                        start: entry.timetable.start_time.substring(0, 5),
                        end: entry.timetable.end_time.substring(0, 5),
                        color: color,
                        location: entry.timetable.location,
                        mode: entry.timetable.mode
                    }
                })

                setEvents(processedEvents)
            } catch (error) {
                // Sample fallback events
                setEvents([
                    {
                        id: '1',
                        title: 'Design & Analysis of Algorithms',
                        date: new Date(currentWeekStart),
                        start: '09:00',
                        end: '10:30',
                        color: 'blue',
                        location: 'Room 101',
                        mode: 'Offline',
                    },
                    {
                        id: '2',
                        title: 'IoT Architecture',
                        date: new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), currentWeekStart.getDate() + 1),
                        start: '11:00',
                        end: '12:30',
                        color: 'purple',
                        location: 'Room 102',
                        mode: 'Online',
                    },
                    {
                        id: '3',
                        title: 'AIML',
                        date: new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), currentWeekStart.getDate() + 2),
                        start: '14:00',
                        end: '15:30',
                        color: 'green',
                        location: 'Room 201',
                        mode: 'Offline',
                    },
                ])
            } finally {
                setLoading(false)
            }
        }

        fetchTimetableData()
    }, [currentWeekStart])

    const DAYS = Array.from({length: 6}, (_, i) => {
        const date = new Date(currentWeekStart)
        date.setDate(date.getDate() + i)
        return {
            name: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][i],
            date: date,
        }
    })

    const goToPreviousWeek = () => {
        setCurrentWeekStart(prevWeekStart => {
            const newWeekStart = new Date(prevWeekStart)
            newWeekStart.setDate(newWeekStart.getDate() - 7)
            return newWeekStart
        })
    }

    const goToNextWeek = () => {
        setCurrentWeekStart(prevWeekStart => {
            const newWeekStart = new Date(prevWeekStart)
            newWeekStart.setDate(newWeekStart.getDate() + 7)
            return newWeekStart
        })
    }

    const goToToday = () => {
        setCurrentWeekStart(() => {
            const now = new Date()
            const monday = new Date(now)
            monday.setDate(now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1))
            return monday
        })
    }

    const getEventsForDay = (date: Date) => {
        return events.filter(event =>
            event.date.getDate() === date.getDate() &&
            event.date.getMonth() === date.getMonth() &&
            event.date.getFullYear() === date.getFullYear()
        )
    }

    return (
        <div className="flex h-screen flex-col p-4">
            <header className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-semibold">
                        {currentWeekStart.toLocaleString('default', {month: 'long', year: 'numeric'})}
                    </h1>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
                            <ChevronLeft className="h-4 w-4"/>
                        </Button>
                        <Button variant="outline" size="sm" onClick={goToToday}>
                            Today
                        </Button>
                        <Button variant="outline" size="icon" onClick={goToNextWeek}>
                            <ChevronRight className="h-4 w-4"/>
                        </Button>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        Day
                    </Button>
                    <Button variant="outline" size="sm">
                        Week
                    </Button>
                    <Button variant="outline" size="sm">
                        Month
                    </Button>
                </div>
            </header>

            <Card className="flex flex-1 flex-col">
                <div className="flex border-b">
                    <div className="w-16 border-r"/>
                    {/* Time column spacer */}
                    {DAYS.map((day) => (
                        <div
                            key={day.name}
                            className="flex-1 px-2 py-3 text-center"
                        >
                            <div className="text-sm font-medium">{day.name} {day.date.getDate()}</div>
                        </div>
                    ))}
                </div>

                <ScrollArea className="flex-1">
                    <div className="relative flex flex-1">
                        <div className="w-16 flex-none border-r">
                            {HOURS.map((hour) => (
                                <div
                                    key={hour}
                                    className="relative h-20 border-b text-xs"
                                >
                      <span className="absolute -top-2.5 right-2 text-muted-foreground">
                        {hour}:00
                      </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-1">
                            {DAYS.map((day) => (
                                <div
                                    key={day.name}
                                    className="relative flex-1 border-r last:border-r-0"
                                >
                                    {HOURS.map((hour) => (
                                        <div
                                            key={hour}
                                            className="h-20 border-b last:border-b-0"
                                        />
                                    ))}

                                    {/* Current time indicator */}
                                    <CurrentTimeIndicator date={day.date}/>

                                    {/* Events */}
                                    {getEventsForDay(day.date).map((event) => (
                                        <div
                                            key={event.id}
                                            className={cn(
                                                "absolute left-1 right-1 rounded-md p-1 text-xs",
                                                event.color === 'purple' && "bg-purple-100 text-purple-700",
                                                event.color === 'blue' && "bg-blue-100 text-blue-700",
                                                event.color === 'green' && "bg-green-100 text-green-700"
                                            )}
                                            style={{
                                                top: `${getEventTop(event.start)}px`,
                                                height: `${getEventHeight(event.start, event.end)}px`,
                                            }}
                                        >
                                            <div className="font-medium">{event.title}</div>
                                            <div className="text-xs opacity-75">
                                                {event.start} - {event.end}
                                            </div>
                                            <div className="text-xs opacity-75">
                                                {event.location} ({event.mode})
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            </Card>
        </div>
    )
}

function getEventTop(time: string): number {
    const [hours, minutes] = time.split(':').map(Number)
    const startOfDay = 8 // 8 AM
    return ((hours - startOfDay) * 80) + (minutes / 60) * 80
}

function getEventHeight(start: string, end: string): number {
    const [startHours, startMinutes] = start.split(':').map(Number)
    const [endHours, endMinutes] = end.split(':').map(Number)

    const durationInHours = (endHours + endMinutes / 60) - (startHours + startMinutes / 60)
    return durationInHours * 80
}