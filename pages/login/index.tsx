import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Input, Button, Text } from '@nextui-org/react';
import { axiosInstance } from '../../utils/axiosInstance';
import { getCSRFToken } from '../../utils/csrf';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axiosInstance.post('/login', { email, password });
      const token = res.data.data.token;
      const user = JSON.stringify(res.data.data)
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login gagal. Periksa kembali data Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f1f3f5',
        padding: '1rem',
      }}
    >
      <Card
        css={{
          p: '2rem',
          mw: '400px',
          w: '100%',
        }}
      >
        <Text h3 css={{ textAlign: 'center', mb: '1.5rem' }}>
          Login Admin
        </Text>

        {error && (
          <Text size="$sm" color="error" css={{ mb: '1rem', textAlign: 'center' }}>
            {error}
          </Text>
        )}

        <form onSubmit={handleLogin}>
          <Input
            fullWidth
            required
            type="email"
            label="Email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            css={{ mb: '1.2rem' }}
          />

          <Input
            fullWidth
            required
            type="password"
            label="Password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            css={{ mb: '1.5rem' }}
          />

          <Button
            type="submit"
            color="primary"
            disabled={loading}
            auto
            css={{ w: '100%' }}
          >
            {loading ? 'Memproses...' : 'Login'}
          </Button>
        </form>
      </Card>
    </div>
  );
}