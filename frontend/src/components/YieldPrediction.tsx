import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Plus, Trash2, CheckCircle, Calendar, Scale } from 'lucide-react';

interface Prediction {
  field: string;
  crop: string;
  currentYield: number;
  predictedYield: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
  factors: string[];
  recommendation: string;
}

interface ActualYield {
  id: string;
  field: string;
  crop: string;
  amount: number;
  date: string;
  predictedAmount?: number;
}

export function YieldPrediction() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    field: 'Shimoliy dala',
    crop: 'Pomidor',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [actualYields, setActualYields] = useState<ActualYield[]>([
    {
      id: '1',
      field: 'Shimoliy dala',
      crop: 'Pomidor',
      amount: 890,
      date: '2025-11-28',
      predictedAmount: 920
    },
    {
      id: '2',
      field: 'Sharqiy dala',
      crop: 'Salat',
      amount: 570,
      date: '2025-11-25',
      predictedAmount: 565
    }
  ]);

  const [predictions] = useState<Prediction[]>([
    {
      field: 'Shimoliy dala',
      crop: 'Pomidor',
      currentYield: 850,
      predictedYield: 920,
      trend: 'up',
      confidence: 87,
      factors: [
        'Optimal sug\'orish jadvali saqlanmoqda',
        'Ob-havo sharoiti qulay',
        'Yaqinda o\'g\'itlangan tuproq ozuqa moddalarini yaxshilayapti'
      ],
      recommendation: 'Joriy parvarish rejimini davom ettiring. 5 kundan keyin azotli o\'g\'itlarni ozgina oshirishni ko\'rib chiqing.'
    },
    {
      field: 'Janubiy dala',
      crop: 'Makkajo\'xori',
      currentYield: 720,
      predictedYield: 680,
      trend: 'down',
      confidence: 82,
      factors: [
        'So\'nggi kunlarda suv tanqisligi aniqlandi',
        'Harorat optimal darajadan yuqori',
        'O\'g\'itlash jadvali biroz kechiktirilgan'
      ],
      recommendation: 'SHOSHILINCH: Sug\'orish chastotasini kuniga ikki marta oshiring. 24 soat ichida kaliyga boy o\'g\'itlarni qo\'llang.'
    },
    {
      field: 'Sharqiy dala',
      crop: 'Salat',
      currentYield: 560,
      predictedYield: 565,
      trend: 'stable',
      confidence: 90,
      factors: [
        'A\'lo suv boshqaruvi',
        'Optimal harorat diapazoni',
        'Muvozanatli ozuqa moddalari darajasi'
      ],
      recommendation: 'Joriy amaliyotlarni davom ettiring. Dala mavsum uchun optimal ishlayapti.'
    }
  ]);

  const handleAddYield = () => {
    const newYield: ActualYield = {
      id: Date.now().toString(),
      field: formData.field,
      crop: formData.crop,
      amount: parseFloat(formData.amount),
      date: formData.date,
      predictedAmount: predictions.find(p => p.field === formData.field)?.predictedYield
    };

    setActualYields([newYield, ...actualYields]);
    setFormData({
      field: 'Shimoliy dala',
      crop: 'Pomidor',
      amount: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddForm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteYield = (id: string) => {
    setActualYields(actualYields.filter(y => y.id !== id));
  };

  const getAccuracyColor = (actual: number, predicted?: number) => {
    if (!predicted) return 'text-gray-600';
    const diff = Math.abs(actual - predicted);
    const percentage = (diff / predicted) * 100;
    if (percentage < 5) return 'text-green-600';
    if (percentage < 15) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyText = (actual: number, predicted?: number) => {
    if (!predicted) return 'N/A';
    const diff = actual - predicted;
    const percentage = ((actual - predicted) / predicted * 100).toFixed(1);
    return diff >= 0 ? `+${percentage}%` : `${percentage}%`;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-6 h-6 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="w-6 h-6 text-red-600" />;
    return <Minus className="w-6 h-6 text-gray-600" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  const getTrendBg = (trend: string) => {
    if (trend === 'up') return 'bg-green-50 border-green-200';
    if (trend === 'down') return 'bg-red-50 border-red-200';
    return 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg">Dalalar kuzatuvi</h2>
          <p className="text-sm text-gray-600">
            Dalalarni va AI bashoratlarini kuzatish
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 text-white p-3 rounded-full shadow-lg active:bg-green-700"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800">Hosil ma'lumoti muvaffaqiyatli qo'shildi!</p>
        </div>
      )}

      {/* Add Yield Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-green-300">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-6 h-6 text-green-600" />
            <h3 className="text-lg">Haqiqiy hosilni qayd qilish</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Dala</label>
              <select
                value={formData.field}
                onChange={(e) => {
                  const field = e.target.value;
                  const prediction = predictions.find(p => p.field === field);
                  setFormData({ 
                    ...formData, 
                    field,
                    crop: prediction?.crop || ''
                  });
                }}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option>Shimoliy dala</option>
                <option>Janubiy dala</option>
                <option>Sharqiy dala</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Ekin</label>
              <input
                type="text"
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                placeholder="masalan, Pomidor"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Haqiqiy hosil (kg/gektar)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="masalan, 850"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Yig'ib olingan sana</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddYield}
                className="flex-1 bg-green-600 text-white p-3 rounded-lg active:bg-green-700"
              >
                Saqlash
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-gray-200 text-gray-800 p-3 rounded-lg active:bg-gray-300"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Actual Yields History */}
      {actualYields.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg">Qayd qilingan hosillar</h3>
          {actualYields.map((yieldRecord) => (
            <div key={yieldRecord.id} className="bg-white rounded-lg p-4 shadow-lg border-2 border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{yieldRecord.field}</h4>
                      <p className="text-sm text-gray-600">{yieldRecord.crop}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteYield(yieldRecord.id)}
                      className="text-red-500 p-2 hover:bg-red-50 rounded-lg active:bg-red-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600">Haqiqiy hosil</p>
                      <p className="text-xl">{yieldRecord.amount}</p>
                      <p className="text-xs text-gray-500">kg/gektar</p>
                    </div>
                    {yieldRecord.predictedAmount && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600">AI bashorat</p>
                        <p className="text-xl text-gray-700">{yieldRecord.predictedAmount}</p>
                        <p className="text-xs text-gray-500">kg/gektar</p>
                      </div>
                    )}
                  </div>

                  {yieldRecord.predictedAmount && (
                    <div className="bg-green-50 rounded-lg p-2 mb-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-600">AI aniqligi:</p>
                        <p className={`text-sm ${getAccuracyColor(yieldRecord.amount, yieldRecord.predictedAmount)}`}>
                          {getAccuracyText(yieldRecord.amount, yieldRecord.predictedAmount)}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(yieldRecord.date).toLocaleDateString('uz-UZ', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Predictions Section */}
      <div>
        <h3 className="text-lg mb-3">AI bashoratlari</h3>
        <p className="text-sm text-gray-600 mb-3">
          Ob-havo, sug'orish va o'g'itlash ma'lumotlariga asoslangan joriy bashoratlar
        </p>
      </div>

      {predictions.map((prediction, index) => (
        <div key={index} className={`rounded-lg p-4 shadow-lg border-2 ${getTrendBg(prediction.trend)}`}>
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-medium">{prediction.field}</h3>
              <p className="text-sm text-gray-600">{prediction.crop}</p>
            </div>
            {getTrendIcon(prediction.trend)}
          </div>

          {/* Yield Comparison */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-600">Joriy baholash</p>
              <p className="text-2xl">{prediction.currentYield}</p>
              <p className="text-xs text-gray-500">kg/gektar</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-600">Bashorat</p>
              <p className={`text-2xl ${getTrendColor(prediction.trend)}`}>
                {prediction.predictedYield}
              </p>
              <p className="text-xs text-gray-500">kg/gektar</p>
            </div>
          </div>

          {/* Confidence */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm text-gray-600">AI ishonchi</p>
              <p className="text-sm">{prediction.confidence}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-blue-600"
                style={{ width: `${prediction.confidence}%` }}
              ></div>
            </div>
          </div>

          {/* Key Factors */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Asosiy omillar:</p>
            <ul className="space-y-1">
              {prediction.factors.map((factor, idx) => (
                <li key={idx} className="text-sm flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendation */}
          <div className={`rounded-lg p-3 ${
            prediction.trend === 'down' ? 'bg-red-100' : 'bg-blue-50'
          }`}>
            {prediction.trend === 'down' && (
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <p className="text-sm text-red-800">Harakat talab etiladi</p>
              </div>
            )}
            <p className="text-sm">{prediction.recommendation}</p>
          </div>
        </div>
      ))}

      {/* AI Model Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <span className="font-medium">Qanday ishlaydi:</span> Bizning AI sug'orish jurnallaringizni, 
          o'g'itlash jadvalingizni, joriy ob-havo naqshlarini va tarixiy ma'lumotlarni tahlil qilib, 
          qimmat sensorlarsiz hosil natijalarini bashorat qiladi.
        </p>
      </div>
    </div>
  );
}
