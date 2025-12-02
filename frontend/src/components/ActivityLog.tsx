import { useState } from 'react';
import { Droplets, Leaf, Plus, CheckCircle } from 'lucide-react';

interface LogEntry {
  id: string;
  type: 'water' | 'fertilizer';
  field: string;
  amount: string;
  timestamp: string;
}

export function ActivityLog() {
  const [activeForm, setActiveForm] = useState<'water' | 'fertilizer' | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      type: 'water',
      field: 'Shimoliy dala',
      amount: '500L',
      timestamp: '2 soat oldin'
    },
    {
      id: '2',
      type: 'fertilizer',
      field: 'Sharqiy dala',
      amount: '2kg NPK 15-15-15',
      timestamp: '2 kun oldin'
    }
  ]);

  const [formData, setFormData] = useState({
    field: 'Shimoliy dala',
    amount: '',
    notes: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (type: 'water' | 'fertilizer') => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      type,
      field: formData.field,
      amount: formData.amount,
      timestamp: 'Hozir'
    };

    setLogs([newLog, ...logs]);
    setFormData({ field: 'Shimoliy dala', amount: '', notes: '' });
    setActiveForm(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg">Fermer faoliyatini qayd qilish</h2>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800">Faoliyat muvaffaqiyatli qayd qilindi!</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setActiveForm('water')}
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg flex flex-col items-center gap-2 active:bg-blue-600"
        >
          <Droplets className="w-8 h-8" />
          <span>Sug'orishni qayd qilish</span>
        </button>
        <button
          onClick={() => setActiveForm('fertilizer')}
          className="bg-green-500 text-white p-4 rounded-lg shadow-lg flex flex-col items-center gap-2 active:bg-green-600"
        >
          <Leaf className="w-8 h-8" />
          <span>O'g'itlashni qayd qilish</span>
        </button>
      </div>

      {/* Form */}
      {activeForm && (
        <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-green-300">
          <div className="flex items-center gap-2 mb-4">
            {activeForm === 'water' ? (
              <Droplets className="w-6 h-6 text-blue-600" />
            ) : (
              <Leaf className="w-6 h-6 text-green-600" />
            )}
            <h3 className="text-lg">
              {activeForm === 'water' ? 'Sug\'orishni qayd qilish' : 'O\'g\'itlashni qayd qilish'}
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Dalani tanlang</label>
              <select
                value={formData.field}
                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option>Shimoliy dala</option>
                <option>Janubiy dala</option>
                <option>Sharqiy dala</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                {activeForm === 'water' ? 'Suv miqdori (L)' : 'O\'g\'it turi va miqdori'}
              </label>
              <input
                type="text"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder={activeForm === 'water' ? 'masalan, 500' : 'masalan, 2kg NPK 15-15-15'}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Izohlar (ixtiyoriy)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Qo'shimcha izohlar qo'shing..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleSubmit(activeForm)}
                className="flex-1 bg-green-600 text-white p-3 rounded-lg active:bg-green-700"
              >
                Saqlash
              </button>
              <button
                onClick={() => setActiveForm(null)}
                className="flex-1 bg-gray-200 text-gray-800 p-3 rounded-lg active:bg-gray-300"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Logs */}
      <div className="space-y-3">
        <h3 className="text-lg">So'nggi faoliyatlar</h3>
        {logs.map((log) => (
          <div key={log.id} className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-start gap-3">
              {log.type === 'water' ? (
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Droplets className="w-5 h-5 text-blue-600" />
                </div>
              ) : (
                <div className="bg-green-100 p-2 rounded-lg">
                  <Leaf className="w-5 h-5 text-green-600" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">
                      {log.type === 'water' ? 'Sug\'orish' : 'O\'g\'itlash'}
                    </p>
                    <p className="text-sm text-gray-600">{log.field}</p>
                  </div>
                  <span className="text-xs text-gray-500">{log.timestamp}</span>
                </div>
                <p className="text-sm mt-1">{log.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
