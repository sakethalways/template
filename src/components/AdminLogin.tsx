import { useState } from 'react';
import { Lock } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
  onCancel: () => void;
}

export const AdminLogin = ({ onLogin, onCancel }: AdminLoginProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ADMIN_PASSWORD = 'template';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        setLoading(false);
        onLogin();
      } else {
        setError('Invalid password. Try again.');
        setPassword('');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <Lock size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold font-accent-changa text-center">Admin Access</h1>
          <p className="text-muted-foreground text-sm mt-2 text-center">
            Enter the password to access the dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter admin password"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                error
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-border focus:border-primary'
              }`}
              disabled={loading}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-3 border-2 border-border rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              disabled={loading || password.length === 0}
            >
              {loading ? 'Checking...' : 'Login'}
            </button>
          </div>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          For testing: Password is <span className="font-mono bg-gray-100 px-2 py-1 rounded">template</span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
