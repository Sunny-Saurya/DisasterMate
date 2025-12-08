import { Shield, MapPin, Activity } from 'lucide-react';

export const USER_NAME = "Citizen Alex";

export const DASHBOARD_DATA = {
    weather: { temp: "72°F", condition: "Clear", wind: "5 mph NW" },
    alerts: [
        { id: 1, type: "Severe Weather", title: "Flash Flood Warning", location: "Low-lying areas", time: "Until 8:00 PM", level: "critical" },
        { id: 2, type: "Advisory", title: "Heat Advisory", location: "Metro Area", time: "12:00 PM - 6:00 PM", level: "moderate" },
    ],
    preparedness: [
        { id: 1, title: "Emergency Kit", status: "Needs Review", progress: 65, icon: Shield },
        { id: 2, title: "Evacuation Plan", status: "Ready", progress: 100, icon: MapPin },
        { id: 3, title: "First Aid Training", status: "Expired", progress: 0, icon: Activity },
    ],
    drills: [
        { id: 1, title: "Annual Fire Drill", date: "Oct 15, 2025", status: "Upcoming" },
        { id: 2, title: "Tornado Shelter Run", date: "Nov 01, 2025", status: "Scheduled" },
    ]
};

export const SAFETY_SESSIONS = [
    {
        id: 1,
        date: "Dec 12, 2025",
        time: "10:00 AM - 12:00 PM",
        instructor: "Dr. Sarah Johnson",
        type: "Fire Safety",
        location: "Central High School",
        available: true,
        spots: 15
    },
    {
        id: 2,
        date: "Dec 14, 2025",
        time: "2:00 PM - 4:00 PM",
        instructor: "Officer Mark Davis",
        type: "Earthquake Preparedness",
        location: "Community Center",
        available: true,
        spots: 20
    },
    {
        id: 3,
        date: "Dec 16, 2025",
        time: "9:00 AM - 11:00 AM",
        instructor: "EMT Rachel Green",
        type: "First Aid & CPR",
        location: "West Side School",
        available: true,
        spots: 12
    },
    {
        id: 4,
        date: "Dec 18, 2025",
        time: "3:00 PM - 5:00 PM",
        instructor: "Chief Tom Wilson",
        type: "Flood Safety",
        location: "Downtown Hall",
        available: true,
        spots: 18
    },
    {
        id: 5,
        date: "Dec 20, 2025",
        time: "11:00 AM - 1:00 PM",
        instructor: "Dr. Emily Chen",
        type: "Emergency Planning",
        location: "North Campus",
        available: false,
        spots: 0
    }
];