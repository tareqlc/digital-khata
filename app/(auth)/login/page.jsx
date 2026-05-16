'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithPhone } from '@/lib/supabase';

const RED = '#CC0000';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!phone || !pin) { setError('ফোন নম্বর ও পিন দিন'); return; }
    setLoading(true);
    setError('');

    // Format phone to E.164 (+880XXXXXXXXXX)
    let formatted = phone.replace(/^0/, '+880');
    if (!formatted.startsWith('+')) formatted = '+880' + formatted;

    const { error: err } = await signInWithPhone(formatted, pin);
    setLoading(false);

    if (err) {
      setError('ফোন বা পিন ভুল। আবার চেষ্টা করুন।');
    } else {
      router.replace('/tali');
    }
  };

  // Demo login - bypass Supabase for testing
  const demoLogin = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('demo_user', JSON.stringify({
        name: 'TG TAREQ', biz: 'TG TAREQ', phone: '01700000000', plan: 'স্ট্যান্ডার্ড', demo: true
      }));
      router.replace('/tali');
    }
  };

  return (
    <div className="app-shell" style={{ padding: 24 }}>
      {/* Back */}
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24, padding: 4 }}>
        ← 
      </button>

      <h2 style={{ color: RED, marginBottom: 4, fontSize: 24, fontWeight: 800 }}>লগ-ইন</h2>
      <p style={{ color: '#888', marginBottom: 28, fontSize: 14 }}>আপনার ফোন ও পিন দিন</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input
          className="input-field"
          placeholder="মোবাইল নম্বর (01XXXXXXXXX)"
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="৪ সংখ্যার পিন"
          type="password"
          maxLength={4}
          value={pin}
          onChange={e => setPin(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />

        {error && <p style={{ color: RED, fontSize: 13, margin: 0 }}>{error}</p>}

        <button className="btn-red" onClick={handleLogin} disabled={loading}>
          {loading ? 'লগ-ইন হচ্ছে...' : 'লগ-ইন করুন'}
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#e8e8e8' }} />
          <span style={{ color: '#888', fontSize: 13 }}>অথবা</span>
          <div style={{ flex: 1, height: 1, background: '#e8e8e8' }} />
        </div>

        {/* Demo button */}
        <button className="btn-red" onClick={demoLogin} style={{ background: '#1a9e3f' }}>
          ⚡ ডেমো দিয়ে সরাসরি ঢুকুন
        </button>

        <p style={{ textAlign: 'center', fontSize: 14, color: '#888', marginTop: 8 }}>
          নতুন?{' '}
          <Link href="/register" style={{ color: RED, fontWeight: 700 }}>অ্যাকাউন্ট খুলুন</Link>
        </p>
      </div>
    </div>
  );
}
