import { useState } from 'react';
import { Sprout, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface RegisterProps {
  onRegister: (username: string, email: string, password: string) => void;
  onSwitchToLogin: () => void;
}

export function Register({ onRegister, onSwitchToLogin }: RegisterProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      username?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!formData.username) {
      newErrors.username = 'Foydalanuvchi nomi kiritish shart';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Foydalanuvchi nomi kamida 3 ta belgidan iborat bo\'lishi kerak';
    }

    if (!formData.email) {
      newErrors.email = 'Email kiritish shart';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email noto\'g\'ri';
    }

    if (!formData.password) {
      newErrors.password = 'Parol kiritish shart';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Parolni tasdiqlang';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Parollar mos kelmayapti';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onRegister(formData.username, formData.email, formData.password);
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
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <h2 className="text-xl mb-2">Hisob yaratish</h2>
          <p className="text-sm text-gray-600 mb-6">Sun'iy intellekt bilan ekinlaringizni kuzatishni boshlang</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
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

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  autoComplete="off"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sizning.email@example.com"
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
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
                  autoComplete="new-password"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Parol yarating (6+ belgi)"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Parolni tasdiqlash</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Parolni takrorlang"
                  className={`w-full pl-12 pr-12 py-3 border rounded-lg ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg active:bg-green-700"
            >
              Hisob yaratish
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Hisobingiz bormi?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-green-600 cursor-pointer"
              >
                Kirish
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
