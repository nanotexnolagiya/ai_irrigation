import { useState } from 'react';
import { Sprout, ThumbsUp, Calendar, DollarSign, TrendingUp } from 'lucide-react';

interface CropRecommendation {
  name: string;
  score: number;
  season: string;
  estimatedYield: string;
  marketPrice: string;
  roi: string;
  growthTime: string;
  difficulty: 'Oson' | 'O\'rtacha' | 'Qiyin';
  reasons: string[];
  waterNeeds: 'Kam' | 'O\'rtacha' | 'Ko\'p';
}

export function CropRecommendation() {
  const [selectedField, setSelectedField] = useState('Shimoliy dala');
  const [recommendations] = useState<CropRecommendation[]>([
    {
      name: 'Qalampir',
      score: 95,
      season: 'Bahor/Yoz',
      estimatedYield: '800-1000 kg/gektar',
      marketPrice: '45,000 so\'m/kg',
      roi: 'Yuqori',
      growthTime: '60-90 kun',
      difficulty: 'O\'rtacha',
      waterNeeds: 'O\'rtacha',
      reasons: [
        'Joriy ob-havo sharoitlari o\'sish uchun optimal',
        'Mintaqangizda yuqori bozor talabi',
        'Tuproq ozuqa moddalaridagi oldingi ekindan keyin mos',
        'Suv mavjudligi talablarga mos keladi'
      ]
    },
    {
      name: 'Salat',
      score: 88,
      season: 'Yil davomida',
      estimatedYield: '500-700 kg/gektar',
      marketPrice: '32,000 so\'m/kg',
      roi: 'O\'rtacha',
      growthTime: '45-60 kun',
      difficulty: 'Oson',
      waterNeeds: 'Ko\'p',
      reasons: [
        'Tezkor hosil olish sikli tezroq aylanma uchun',
        'Joriy tajriba uchun mos past qiyinchilik',
        'Barqaror bozor talabi',
        'Oldingi hosildan keyin ekin almashish uchun yaxshi'
      ]
    },
    {
      name: 'Olcha pomidori',
      score: 82,
      season: 'Bahor/Yoz',
      estimatedYield: '900-1200 kg/gektar',
      marketPrice: '38,000 so\'m/kg',
      roi: 'Yuqori',
      growthTime: '70-85 kun',
      difficulty: 'O\'rtacha',
      waterNeeds: 'O\'rtacha',
      reasons: [
        'Shunga o\'xshash dalalarda isbotlangan muvaffaqiyat',
        'Bozorda yaxshi narx barqarorligi',
        'Keyingi mavsum uchun qulay ob-havo naqshlari',
        'Mavjud sug\'orish tizimi bilan mos keladi'
      ]
    }
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    return 'text-yellow-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-600';
    if (score >= 75) return 'bg-blue-600';
    return 'bg-yellow-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'Oson') return 'bg-green-100 text-green-800';
    if (difficulty === 'O\'rtacha') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getWaterColor = (needs: string) => {
    if (needs === 'Kam') return 'text-blue-400';
    if (needs === 'O\'rtacha') return 'text-blue-500';
    return 'text-blue-600';
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-lg">Keyingi nimani ekish kerak</h2>
        <p className="text-sm text-gray-600">
          Sharoitlaringizga asoslangan AI ekin tavsiялari
        </p>
      </div>

      {/* Field Selector */}
      <div className="bg-white rounded-lg p-4 shadow">
        <label className="block text-sm text-gray-600 mb-2">Dalani tanlang</label>
        <select
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option>Shimoliy dala</option>
          <option>Janubiy dala</option>
          <option>Sharqiy dala</option>
        </select>
      </div>

      {/* Recommendations */}
      {recommendations.map((crop, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-lg border-2 border-gray-200">
          {/* Header with Score */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Sprout className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">{crop.name}</h3>
                <p className="text-sm text-gray-600">{crop.season}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-3xl ${getScoreColor(crop.score)}`}>
                {crop.score}
              </p>
              <p className="text-xs text-gray-500">AI ball</p>
            </div>
          </div>

          {/* Score Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className={`h-2 rounded-full ${getScoreBg(crop.score)}`}
              style={{ width: `${crop.score}%` }}
            ></div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-gray-600" />
                <p className="text-xs text-gray-600">Taxminiy hosil</p>
              </div>
              <p className="text-sm">{crop.estimatedYield}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-gray-600" />
                <p className="text-xs text-gray-600">Bozor narxi</p>
              </div>
              <p className="text-sm">{crop.marketPrice}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-gray-600" />
                <p className="text-xs text-gray-600">O'sish vaqti</p>
              </div>
              <p className="text-sm">{crop.growthTime}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <ThumbsUp className="w-4 h-4 text-gray-600" />
                <p className="text-xs text-gray-600">ROI</p>
              </div>
              <p className="text-sm">{crop.roi}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs ${getDifficultyColor(crop.difficulty)}`}>
              {crop.difficulty}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs bg-blue-50 ${getWaterColor(crop.waterNeeds)}`}>
              {crop.waterNeeds} suv
            </span>
          </div>

          {/* Why This Crop */}
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-sm text-green-800 mb-2">Nima uchun bu ekin?</p>
            <ul className="space-y-1">
              {crop.reasons.map((reason, idx) => (
                <li key={idx} className="text-sm text-green-700 flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* Info Footer */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <p className="text-sm text-purple-900">
          <span className="font-medium">Siz uchun moslashtirilgan:</span> Tavsiyalar mintaqangizning ob-havo 
          naqshlarini, so'nggi ekinlardan tuproq holatini, suv mavjudligini, bozor tendentsiyalarini 
          va fermerchilik tarixingizni hisobga oladi.
        </p>
      </div>
    </div>
  );
}
