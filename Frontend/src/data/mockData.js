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