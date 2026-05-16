'use client';
import { useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const RED = '#CC0000';

function OTPForm() {
  const router = useRouter();
  const params = useSearchParams();
  const phone = params.get('phone') || '';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleChange = (i, v) => {
    const n = [...otp];
    n[i] = v.slice(-1);
    setOtp(n);
    if (v && i < 5) refs[i + 1].current?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < 6) { setError('৬ সংখ্যার OTP দিন'); return; }
    setLoading(true);
    setError('');

    const { data, error: err } = await supabase.auth.verifyOtp({
      phone,
      token: code,
      type: 'sms',
    });

    if (err) {
      setLoading(false);
      setError('ভুল OTP। আবার চেষ্টা করুন।');
      return;
    }

    // Create business record
    const pending = JSON.parse(localStorage.getItem('pending_reg') || '{}');
    if (pending.biz && data.user) {
      await supabase.from('businesses').insert({
        user_id: data.user.id,
        name: pending.biz,
        owner_name: pending.name,
        phone: pending.phone,
      });
    }
    localStorage.removeItem('pending_reg');
    router.replace('/tali');
  };

  return (
    <div className="app-shell" style={{ padding: 24 }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24, padding: 4 }}>←</button>
      <h2 style={{ color: RED, marginBottom: 4, fontSize: 24, fontWeight: 800 }}>OTP যাচাই</h2>
      <p style={{ color: '#888', marginBottom: 28, fontSize: 14 }}>{phone} নম্বরে OTP পাঠানো হয়েছে</p>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
        {otp.map((v, i) => (
          <input key={i} ref={refs[i]} value={v} maxLength={1} type="number"
            onChange={e => handleChange(i, e.target.value)}
            style={{ width: 46, height: 52, textAlign: 'center', fontSize: 22, fontWeight: 700, border: `2px solid ${v ? RED : '#e8e8e8'}`, borderRadius: 10, outline: 'none', fontFamily: 'inherit' }} />
        ))}
      </div>

      {error && <p style={{ color: RED, fontSize: 13, textAlign: 'center', marginBottom: 12 }}>{error}</p>}

      <button className="btn-red" onClick={handleVerify} disabled={loading}>
        {loading ? 'যাচাই হচ্ছে...' : 'নিশ্চিত করুন'}
      </button>
    </div>
  );
}

export default function OTPPage() {
  return <Suspense><OTPForm /></Suspense>;
}
