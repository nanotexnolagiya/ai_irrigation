import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Thermometer, Droplets, Wind, AlertCircle, Clock } from 'lucide-react';

interface HourlyWeather {
  time: string;
  temp: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: string;
}

interface FieldData {
  id: string;
  name: string;
  crop: string;
  health: number;
  lastWatered: string;
  lastFertilized: string;
}

export function Dashboard() {
  const [location, setLocation] = useState('Yuklanmoqda...');
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather[]>([
    {
      time: '09:00',
      temp: 22,
      humidity: 68,
      rainfall: 0,
      windSpeed: 10,
      condition: 'Qisman bulutli'
    },
    {
      time: '12:00',
      temp: 26,
      humidity: 62,
      rainfall: 0,
      windSpeed: 12,
      condition: 'Quyoshli'
    },
    {
      time: '15:00',
      temp: 28,
      humidity: 58,
      rainfall: 0,
      windSpeed: 15,
      condition: 'Quyoshli'
    },
    {
      time: '18:00',
      temp: 24,
      humidity: 65,
      rainfall: 0,
      windSpeed: 11,
      condition: 'Qisman bulutli'
    },
    {
      time: '21:00',
      temp: 20,
      humidity: 72,
      rainfall: 2,
      windSpeed: 8,
      condition: 'Yengil yomg\'ir'
    },
    {
      time: '00:00',
      temp: 18,
      humidity: 78,
      rainfall: 0,
      windSpeed: 7,
      condition: 'Bulutli'
    }
  ]);

  const [fields, setFields] = useState<FieldData[]>([
    {
      id: '1',
      name: 'Shimoliy dala',
      crop: 'Pomidor',
      health: 85,
      lastWatered: '2 soat oldin',
      lastFertilized: '3 kun oldin'
    },
    {
      id: '2',
      name: 'Janubiy dala',
      crop: 'Makkajo\'xori',
      health: 72,
      lastWatered: '1 kun oldin',
      lastFertilized: '5 kun oldin'
    },
    {
      id: '3',
      name: 'Sharqiy dala',
      crop: 'Salat',
      health: 90,
      lastWatered: '4 soat oldin',
      lastFertilized: '2 kun oldin'
    }
  ]);

  useEffect(() => {
    // Simulate getting location
    setLocation('Toshkent, O\'zbekiston');
  }, []);

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-600';
    if (health >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBg = (health: number) => {
    if (health >= 80) return 'bg-green-600';
    if (health >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="p-4 space-y-4">
      {/* Location */}
      <div className="bg-white rounded-lg p-4 shadow">
        <p className="text-gray-600 text-sm">Joriy joylashuv</p>
        <p className="text-lg">{location}</p>
      </div>

      {/* Hourly Weather Forecast */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 shadow-lg text-white">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-6 h-6" />
          <h3 className="text-lg">Soatlik ob-havo ma'lumoti</h3>
        </div>
        
        <div className="overflow-x-auto -mx-4 px-4">
          <div className="flex gap-3 pb-2">
            {hourlyWeather.map((hour, index) => (
              <div key={index} className="bg-white/20 backdrop-blur rounded-lg p-3 min-w-[140px] flex-shrink-0">
                <p className="text-center mb-2 opacity-90">{hour.time}</p>
                <p className="text-center text-sm mb-2 opacity-80">{hour.condition}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4" />
                    <div>
                      <p className="text-xs opacity-70">Harorat</p>
                      <p className="text-sm">{hour.temp}°C</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4" />
                    <div>
                      <p className="text-xs opacity-70">Namlik</p>
                      <p className="text-sm">{hour.humidity}%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4" />
                    <div>
                      <p className="text-xs opacity-70">Yog'ingarchilik</p>
                      <p className="text-sm">{hour.rainfall}mm</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4" />
                    <div>
                      <p className="text-xs opacity-70">Shamol</p>
                      <p className="text-sm">{hour.windSpeed} km/soat</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 shadow">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-900">
              <span className="font-medium">Sug'orish ogohlantirishi:</span> Janubiy daladagi makkajo'xori suv tanqisligini ko'rsatmoqda. 
              Joriy ob-havo sharoitlariga asoslangan holda 6 soat ichida sug'orish tavsiya etiladi.
            </p>
          </div>
        </div>
      </div>

      {/* Fields Overview */}
      <div className="space-y-3">
        <h2 className="text-lg">Sizning dalalaringiz</h2>
        {fields.map((field) => (
          <div key={field.id} className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium">{field.name}</h3>
                <p className="text-sm text-gray-600">{field.crop}</p>
              </div>
              <div className={`text-right ${getHealthColor(field.health)}`}>
                <p className="text-2xl">{field.health}%</p>
                <p className="text-xs">Salomatlik</p>
              </div>
            </div>
            
            {/* Health Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div 
                className={`h-2 rounded-full ${getHealthBg(field.health)}`}
                style={{ width: `${field.health}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-600">Oxirgi sug'orish</p>
                <p>{field.lastWatered}</p>
              </div>
              <div>
                <p className="text-gray-600">Oxirgi o'g'itlash</p>
                <p>{field.lastFertilized}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
