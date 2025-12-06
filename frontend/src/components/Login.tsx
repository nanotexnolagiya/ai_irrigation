import { useState } from 'react';
import { Sprout, User, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  onSwitchToRegister: () => void;
}

export function Login({ onLogin, onSwitchToRegister }: LoginProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};

    if (!formData.username) {
      newErrors.username = 'Foydalanuvchi nomi kiritish shart';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Foydalanuvchi nomi kamida 3 ta belgidan iborat bo\'lishi kerak';
    }

    if (!formData.password) {
      newErrors.password = 'Parol kiritish shart';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onLogin(formData.username, formData.password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white p-6 text-center">
        <div className="flex justify-center mb-3">
          <div className="bg-white/20 p-4 rounded-full">
            <Sprout className="w-12 h-12" />
          </div>
        </div>
        <h1 className="text-2xl">AgriTrack AI</h1>
        <p className="text-sm text-green-100 mt-1">Aqlli fermer yordamchisi</p>
      </div>

      {/* Form */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <h2 className="text-xl mb-2">Xush kelibsiz</h2>
          <p className="text-sm text-gray-600 mb-6">Ekinlaringizni kuzatishni davom ettirish uchun kiring</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Foydalanuvchi nomi</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  autoComplete="off"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Foydalanuvchi nomini tanlang"
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Parol</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Parolingizni kiriting"
                  className={`w-full pl-12 pr-12 py-3 border rounded-lg ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button type="button" className="text-sm text-green-600">
                Parolni unutdingizmi?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg active:bg-green-700"
            >
              Kirish
            </button>
          </form>

          {/* Switch to Register */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Hisobingiz yo'qmi?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-green-600 cursor-pointer"
              >
                Ro'yxatdan o'tish
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
