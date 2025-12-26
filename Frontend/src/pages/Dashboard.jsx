import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Thermometer, Wind, AlertTriangle, ChevronRight, Activity, 
    MapPin, Bell, Shield, BookOpen, Clock, CheckCircle, Search,
    MoreVertical, Zap, Calendar, Users, GraduationCap, TrendingUp,
    BarChart3, AlertCircle, Target, Award, Radio, Droplets, Eye,
    Gauge, Cloud, Sun, CloudRain, CloudSnow
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { DASHBOARD_DATA } from '../data/mockData';
import { Spotlight } from '../components/ui/spotlight';

const Dashboard = ({ user }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [weatherData, setWeatherData] = useState(null);
    const [airQuality, setAirQuality] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState({ lat: 40.7128, lon: -74.0060 }); // Default: New York

    // Fetch Weather Data
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                // Get user's location
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const lat = position.coords.latitude;
                            const lon = position.coords.longitude;
                            setUserLocation({ lat, lon });
                            await fetchAPIs(lat, lon);
                        },
                        async () => {
                            // If denied, use default location
                            await fetchAPIs(userLocation.lat, userLocation.lon);
                        }
                    );
                } else {
                    await fetchAPIs(userLocation.lat, userLocation.lon);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    const fetchAPIs = async (lat, lon) => {
        try {
            // Using OpenWeatherMap API (you'll need to get a free API key from openweathermap.org)
            // For now, using a demo key - replace with your own
            const API_KEY = '895284fb2d2c50a520ea537456963d9c'; // Get your own at https://openweathermap.org/api
            
            // Fetch current weather
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );
            const weather = await weatherResponse.json();
            
            // Fetch air pollution
            const airResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
            );
            const air = await airResponse.json();
            
            setWeatherData(weather);
            setAirQuality(air);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching APIs:', error);
            setLoading(false);
        }
    };

    const getAQILevel = (aqi) => {
        const levels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
        const colors = ['text-green-600', 'text-lime-600', 'text-yellow-600', 'text-orange-600', 'text-red-600'];
        const bgColors = ['bg-green-50', 'bg-lime-50', 'bg-yellow-50', 'bg-orange-50', 'bg-red-50'];
        return { level: levels[aqi - 1] || 'Unknown', color: colors[aqi - 1] || 'text-gray-600', bg: bgColors[aqi - 1] || 'bg-gray-50' };
    };

    const getWeatherIcon = (main) => {
        const icons = {
            'Clear': Sun,
            'Clouds': Cloud,
            'Rain': CloudRain,
            'Snow': CloudSnow,
            'Drizzle': CloudRain,
        };
        return icons[main] || Cloud;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 pt-24 pb-12 relative overflow-hidden">
            <Spotlight className="-top-40 left-full md:left-[80%] md:-top-20" fill="blue" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
                
                {/* Header Section with Hero Image */}
                <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl shadow-2xl">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-blue-900/90 to-transparent"></div>
                    
                    <div className="relative z-10 p-8 md:p-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex items-start gap-6">
                                <div className="hidden md:block w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-xl">
                                    <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                                        <Shield className="w-10 h-10 text-blue-600" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-3xl md:text-4xl font-bold text-white">Welcome back, {user}</h1>
                                        <div className="px-3 py-1 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                            <span className="text-emerald-300 text-xs font-semibold">ACTIVE</span>
                                        </div>
                                    </div>
                                    <p className="text-blue-200 flex items-center gap-3 text-sm md:text-base">
                                        <Calendar className="w-4 h-4" />
                                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                    </p>
                                    <div className="flex items-center gap-4 mt-4">
                                    {loading ? (
                                        <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                                            <div className="animate-pulse flex items-center gap-2">
                                                <div className="w-16 h-6 bg-white/20 rounded"></div>
                                            </div>
                                        </div>
                                    ) : weatherData ? (
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                                                {React.createElement(getWeatherIcon(weatherData.weather[0].main), { className: "w-5 h-5 text-yellow-300 mr-2" })}
                                                <span className="font-semibold text-white mr-3">{Math.round(weatherData.main.temp)}°C</span>
                                                <span className="text-blue-200 text-sm capitalize">{weatherData.weather[0].description}</span>
                                            </div>
                                            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                                                <Wind className="w-5 h-5 text-blue-300 mr-2" />
                                                <span className="text-blue-200 text-sm">{Math.round(weatherData.wind.speed * 3.6)} km/h</span>
                                            </div>
                                            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                                                <Droplets className="w-5 h-5 text-blue-300 mr-2" />
                                                <span className="text-blue-200 text-sm">{weatherData.main.humidity}%</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                                            <Thermometer className="w-5 h-5 text-blue-400 mr-2" />
                                            <span className="text-blue-200 text-sm">Unable to load weather</span>
                                        </div>
                                    )}
                                    </div>
                                </div>
                            </div>
                           <Button
                               variant="danger"
                                className="shadow-2xl shadow-red-500/30 h-12 px-6"
                                       onClick={() => navigate('/emergency')}>
                          <Zap className="w-5 h-5 mr-2" />
                          Emergency SOS
                           </Button>

                        </div>
                    </div>
                </div>

                {/* Quick Stats Row - Enhanced */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {[
                         { label: "Safety Score", value: "92%", change: "+5%", color: "text-emerald-600", bg: "bg-emerald-50", gradient: "from-emerald-500 to-teal-600", icon: Shield, trend: TrendingUp },
                         { label: "Active Alerts", value: "2", change: "Critical", color: "text-red-600", bg: "bg-red-50", gradient: "from-red-500 to-pink-600", icon: AlertCircle, trend: Radio },
                         { label: "Drills Pending", value: "1", change: "This Week", color: "text-amber-600", bg: "bg-amber-50", gradient: "from-amber-500 to-orange-600", icon: Target, trend: Clock },
                         { label: "Modules Done", value: "4/12", change: "33%", color: "text-blue-600", bg: "bg-blue-50", gradient: "from-blue-500 to-indigo-600", icon: Award, trend: BarChart3 },
                     ].map((stat, i) => (
                         <div key={i} className="group relative overflow-hidden bg-white rounded-2xl shadow-lg border border-slate-200 transition-all hover:shadow-xl hover:-translate-y-2 duration-300">
                             <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                             <div className="relative p-6">
                                 <div className="flex items-start justify-between mb-4">
                                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                         <stat.icon className="w-7 h-7" />
                                     </div>
                                     <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${stat.bg} ${stat.color}`}>
                                         <stat.trend className="w-3 h-3" />
                                         {stat.change}
                                     </div>
                                 </div>
                                 <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                                 <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
                             </div>
                         </div>
                     ))}
                </div>

                {/* Weather & Air Quality Widget */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Current Weather */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-3xl shadow-2xl overflow-hidden relative">
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }}></div>
                        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        
                        <div className="relative z-10 p-8">
                            {loading ? (
                                <div className="animate-pulse space-y-4">
                                    <div className="h-8 bg-white/20 rounded w-1/3"></div>
                                    <div className="h-20 bg-white/20 rounded w-1/2"></div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-16 bg-white/20 rounded"></div>
                                        <div className="h-16 bg-white/20 rounded"></div>
                                        <div className="h-16 bg-white/20 rounded"></div>
                                    </div>
                                </div>
                            ) : weatherData ? (
                                <>
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <div className="flex items-center gap-2 text-blue-100 mb-2">
                                                <MapPin className="w-4 h-4" />
                                                <span className="text-sm font-medium">{weatherData.name}, {weatherData.sys.country}</span>
                                            </div>
                                            <h3 className="text-white text-3xl font-bold mb-1">Current Weather</h3>
                                            <p className="text-blue-200 capitalize">{weatherData.weather[0].description}</p>
                                        </div>
                                        <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                                            {React.createElement(getWeatherIcon(weatherData.weather[0].main), { className: "w-12 h-12 text-white" })}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-baseline gap-2 mb-8">
                                        <span className="text-7xl font-bold text-white">{Math.round(weatherData.main.temp)}</span>
                                        <span className="text-4xl text-blue-200">°C</span>
                                        <span className="ml-4 text-lg text-blue-200">Feels like {Math.round(weatherData.main.feels_like)}°C</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                                            <div className="flex items-center gap-2 text-blue-200 mb-2">
                                                <Wind className="w-4 h-4" />
                                                <span className="text-xs font-medium uppercase">Wind</span>
                                            </div>
                                            <div className="text-2xl font-bold text-white">{Math.round(weatherData.wind.speed * 3.6)}</div>
                                            <div className="text-xs text-blue-200">km/h</div>
                                        </div>
                                        
                                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                                            <div className="flex items-center gap-2 text-blue-200 mb-2">
                                                <Droplets className="w-4 h-4" />
                                                <span className="text-xs font-medium uppercase">Humidity</span>
                                            </div>
                                            <div className="text-2xl font-bold text-white">{weatherData.main.humidity}</div>
                                            <div className="text-xs text-blue-200">%</div>
                                        </div>
                                        
                                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                                            <div className="flex items-center gap-2 text-blue-200 mb-2">
                                                <Eye className="w-4 h-4" />
                                                <span className="text-xs font-medium uppercase">Visibility</span>
                                            </div>
                                            <div className="text-2xl font-bold text-white">{(weatherData.visibility / 1000).toFixed(1)}</div>
                                            <div className="text-xs text-blue-200">km</div>
                                        </div>
                                        
                                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                                            <div className="flex items-center gap-2 text-blue-200 mb-2">
                                                <Gauge className="w-4 h-4" />
                                                <span className="text-xs font-medium uppercase">Pressure</span>
                                            </div>
                                            <div className="text-2xl font-bold text-white">{weatherData.main.pressure}</div>
                                            <div className="text-xs text-blue-200">hPa</div>
                                        </div>
                                        
                                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                                            <div className="flex items-center gap-2 text-blue-200 mb-2">
                                                <Thermometer className="w-4 h-4" />
                                                <span className="text-xs font-medium uppercase">Min</span>
                                            </div>
                                            <div className="text-2xl font-bold text-white">{Math.round(weatherData.main.temp_min)}</div>
                                            <div className="text-xs text-blue-200">°C</div>
                                        </div>
                                        
                                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                                            <div className="flex items-center gap-2 text-blue-200 mb-2">
                                                <Thermometer className="w-4 h-4" />
                                                <span className="text-xs font-medium uppercase">Max</span>
                                            </div>
                                            <div className="text-2xl font-bold text-white">{Math.round(weatherData.main.temp_max)}</div>
                                            <div className="text-xs text-blue-200">°C</div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center text-white py-12">
                                    <Cloud className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p>Unable to load weather data</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Air Quality Index */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center">
                                    <Wind className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Air Quality</h3>
                            </div>
                            <p className="text-emerald-100 text-sm">Real-time monitoring</p>
                        </div>

                        <div className="p-6">
                            {loading ? (
                                <div className="animate-pulse space-y-4">
                                    <div className="h-24 bg-slate-200 rounded-2xl"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-slate-200 rounded"></div>
                                        <div className="h-4 bg-slate-200 rounded"></div>
                                        <div className="h-4 bg-slate-200 rounded"></div>
                                    </div>
                                </div>
                            ) : airQuality && airQuality.list && airQuality.list[0] ? (
                                <>
                                    {(() => {
                                        const aqi = airQuality.list[0].main.aqi;
                                        const { level, color, bg } = getAQILevel(aqi);
                                        return (
                                            <>
                                                <div className={`${bg} rounded-2xl p-6 mb-6 border-2 ${color} border-opacity-20`}>
                                                    <div className="text-center">
                                                        <div className={`text-6xl font-bold ${color} mb-2`}>{aqi}</div>
                                                        <div className={`text-lg font-semibold ${color} uppercase tracking-wide`}>{level}</div>
                                                        <div className="text-slate-600 text-sm mt-2">Air Quality Index</div>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                                        <span className="text-sm font-medium text-slate-600">PM2.5</span>
                                                        <span className="font-bold text-slate-900">{airQuality.list[0].components.pm2_5?.toFixed(1)} µg/m³</span>
                                                    </div>
                                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                                        <span className="text-sm font-medium text-slate-600">PM10</span>
                                                        <span className="font-bold text-slate-900">{airQuality.list[0].components.pm10?.toFixed(1)} µg/m³</span>
                                                    </div>
                                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                                        <span className="text-sm font-medium text-slate-600">NO₂</span>
                                                        <span className="font-bold text-slate-900">{airQuality.list[0].components.no2?.toFixed(1)} µg/m³</span>
                                                    </div>
                                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                                        <span className="text-sm font-medium text-slate-600">O₃</span>
                                                        <span className="font-bold text-slate-900">{airQuality.list[0].components.o3?.toFixed(1)} µg/m³</span>
                                                    </div>
                                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                                        <span className="text-sm font-medium text-slate-600">CO</span>
                                                        <span className="font-bold text-slate-900">{airQuality.list[0].components.co?.toFixed(0)} µg/m³</span>
                                                    </div>
                                                </div>

                                                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                                                    <div className="flex items-start gap-3">
                                                        <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                                        <div className="text-xs text-blue-900">
                                                            <p className="font-semibold mb-1">Health Advisory</p>
                                                            <p className="text-blue-700">
                                                                {aqi <= 2 ? 'Air quality is satisfactory. Ideal conditions for outdoor activities.' :
                                                                 aqi === 3 ? 'Moderate air quality. Sensitive individuals should limit prolonged outdoor exertion.' :
                                                                 'Poor air quality. Consider limiting outdoor activities.'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </>
                            ) : (
                                <div className="text-center text-slate-500 py-12">
                                    <Wind className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p>Unable to load air quality data</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column (Alerts & Modules) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Alerts Section - Enhanced */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                                        <AlertTriangle className="w-5 h-5 text-red-600" />
                                    </div>
                                    Priority Alerts
                                </h2>
                                <button className="text-sm text-slate-500 hover:text-blue-600 font-semibold flex items-center gap-2 group">
                                    View History
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                            
                            {DASHBOARD_DATA.alerts.map((alert, idx) => (
                                <div key={alert.id} className="group relative overflow-hidden bg-white rounded-2xl shadow-lg border-l-4 border-l-red-500 hover:shadow-2xl transition-all duration-300">
                                    {/* Background Image */}
                                    <div className="absolute inset-0 opacity-5" style={{
                                        backgroundImage: `url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-red-50/30"></div>
                                    
                                    <div className="relative p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-start gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                                                    <AlertTriangle className="w-7 h-7 text-white" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-xl font-bold text-slate-900">{alert.title}</h3>
                                                        <Badge level={alert.level}>CRITICAL</Badge>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-sm text-slate-600 mb-3">
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="w-4 h-4" />
                                                            {alert.location}
                                                        </div>
                                                        <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                                                        <div className="flex items-center gap-1 text-red-600 font-semibold">
                                                            <Clock className="w-4 h-4" />
                                                            Valid until {alert.time}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button onClick={() => navigate("/contact")} className="flex items-center gap-2 text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl transition-all hover:shadow-md">
                                                <MapPin className="w-4 h-4" />
                                                View Map
                                            </button>
                                            <button onClick={() => navigate("/emergency")}className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-4 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl">
                                                <Shield className="w-4 h-4" />
                                                Emergency Protocols
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Learning Progress - Enhanced */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 text-blue-600" />
                                    </div>
                                    Learning Path
                                </h2>
                                <button className="text-sm text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 group">
                                    View All Modules
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                            
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                <div className="relative h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: `url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        opacity: 0.2
                                    }}></div>
                                    <div className="relative z-10 p-6 flex items-center justify-between text-white">
                                        <div>
                                            <div className="text-3xl font-bold mb-1">33%</div>
                                            <div className="text-blue-100">Course Progress</div>
                                        </div>
                                        <GraduationCap className="w-16 h-16 opacity-40" />
                                    </div>
                                </div>
                                
                                <div className="divide-y divide-slate-100">
                                    {DASHBOARD_DATA.preparedness.map((item, i) => (
                                        <div key={item.id} className="p-5 hover:bg-slate-50 transition-all duration-200 flex items-center gap-4 group cursor-pointer">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                                                item.progress === 100 
                                                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg' 
                                                    : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                                            }`}>
                                                {item.progress === 100 ? <CheckCircle className="w-6 h-6" /> : <item.icon className="w-6 h-6" />}
                                            </div>
                                            <div className="grow">
                                                <div className="flex justify-between mb-2">
                                                    <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</span>
                                                    <span className="text-sm font-bold text-slate-600">{item.progress}%</span>
                                                </div>
                                                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full transition-all duration-1000 shadow-sm ${
                                                            item.progress === 100 ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                                                        }`} 
                                                        style={{ width: `${item.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-5 bg-gradient-to-r from-slate-50 to-blue-50 text-center border-t border-slate-100">
                                    <button  onClick={() => navigate("/resources")} className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-2 mx-auto">
                                        <Award className="w-4 h-4" />
                                        + Start New Certification
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Drills & Resources) */}
                    <div className="space-y-8">
                        
                        {/* Upcoming Drills Widget - Enhanced */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white rounded-3xl p-6 shadow-2xl">
                            <div className="absolute inset-0 opacity-10" style={{
                                backgroundImage: `url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}></div>
                            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20 -ml-20 -mb-20"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 backdrop-blur-sm flex items-center justify-center">
                                            <Calendar className="w-5 h-5 text-blue-400" />
                                        </div>
                                        Drill Schedule
                                    </h2>
                                    <span className="text-xs bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full text-blue-200 font-semibold">2025</span>
                                </div>
                                
                                <div className="space-y-3">
                                    {DASHBOARD_DATA.drills.map((drill, i) => (
                                        <div key={drill.id} className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="font-bold text-white group-hover:text-blue-300 transition-colors text-sm">{drill.title}</div>
                                                {i === 0 && (
                                                    <span className="flex items-center gap-1.5 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 px-2 py-1 rounded-full">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                                                        <span className="text-xs text-amber-300 font-semibold">NEXT</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-blue-200 mb-4">
                                                <Clock className="w-4 h-4" />
                                                {drill.date}
                                            </div>
                                            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                                <Bell className="w-4 h-4" />
                                                Set Reminder
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Resources - Enhanced */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-indigo-600" />
                                </div>
                                Quick Access
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { name: "Shelters", icon: MapPin, color: "from-blue-500 to-cyan-600", bg: "bg-blue-50" },
                                    { name: "Contacts", icon: Activity, color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50" },
                                    { name: "Maps", icon: MapPin, color: "from-purple-500 to-pink-600", bg: "bg-purple-50" },
                                    { name: "Community", icon: Users, color: "from-amber-500 to-orange-600", bg: "bg-amber-50" },
                                ].map((r, i) => (
                                    <button key={i} className="group relative overflow-hidden flex flex-col items-center justify-center p-5 bg-white border-2 border-slate-200 rounded-2xl hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300 text-center">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${r.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                                        <div className={`relative w-12 h-12 rounded-xl ${r.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                            <r.icon className="w-6 h-6 text-slate-600" />
                                        </div>
                                        <span className="relative text-sm font-bold text-slate-700 group-hover:text-slate-900">{r.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Banner - Enhanced */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 text-white text-center shadow-2xl">
                            <div className="absolute inset-0 opacity-20" style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                backgroundSize: '30px 30px'
                            }}></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">Invite Your Team</h3>
                                <p className="text-indigo-100 text-sm mb-5">Ensure your entire household is prepared together.</p>
                                <button  onClick={() => navigate("/contact")} className="bg-white hover:bg-indigo-50 text-indigo-600 text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl w-full flex items-center justify-center gap-2">
                                    <Users className="w-4 h-4" />
                                    Send Invite Link
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Safety Sessions CTA Banner */}
                <div className="mt-8 relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-white text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                <GraduationCap className="w-8 h-8" />
                                <h2 className="text-3xl font-bold">Safety Training Sessions</h2>
                            </div>
                            <p className="text-indigo-100 text-lg mb-4 max-w-2xl">
                                Join expert-led safety workshops and get certified in life-saving techniques. 
                                Book your spot in interactive sessions near you.
                            </p>
                            <div className="flex items-center gap-6 justify-center md:justify-start text-sm">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-300" />
                                    <span>Expert Instructors</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-300" />
                                    <span>Get Certified</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-300" />
                                    <span>Small Groups</span>
                                </div>
                            </div>
                        </div>
                        <Button 
                            variant="outline" 
                            className="bg-white text-indigo-600 hover:bg-indigo-50 border-0 h-14 px-8 text-lg font-semibold shadow-2xl shrink-0"
                            onClick={() => navigate('/safetysessions')}
                        >
                            <Calendar className="w-5 h-5 mr-2" />
                            Browse Sessions
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;