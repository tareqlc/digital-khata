'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signUpWithPhone } from '@/lib/supabase';

const RED = '#CC0000';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', biz: '', phone: '', pin: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleRegister = async () => {
    if (!form.name || !form.biz || !form.phone || !form.pin) {
      setError('সব তথ্য পূরণ করুন'); return;
    }
    if (form.pin.length !== 4) {
      setError('পিন ৪ সংখ্যার হতে হবে'); return;
    }
    setLoading(true);
    setError('');

    let formatted = form.phone.replace(/^0/, '+880');
    if (!formatted.startsWith('+')) formatted = '+880' + formatted;

    const { error: err } = await signUpWithPhone(formatted, form.pin, {
      owner_name: form.name,
      biz_name: form.biz,
    });

    setLoading(false);
    if (err) {
      if (err.message.includes('already')) setError('এই নম্বরে আগেই অ্যাকাউন্ট আছে');
      else setError(err.message);
    } else {
      // Store pending data for after OTP
      localStorage.setItem('pending_reg', JSON.stringify(form));
      router.push('/otp?phone=' + encodeURIComponent(formatted));
    }
  };

  return (
    <div className="app-shell" style={{ padding: 24 }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24, padding: 4 }}>
        ←
      </button>

      <h2 style={{ color: RED, marginBottom: 4, fontSize: 24, fontWeight: 800 }}>নতুন অ্যাকাউন্ট</h2>
      <p style={{ color: '#888', marginBottom: 28, fontSize: 14 }}>আপনার ব্যবসার তথ্য দিন</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input className="input-field" placeholder="আপনার নাম" value={form.name} onChange={e => set('name', e.target.value)} />
        <input className="input-field" placeholder="ব্যবসার নাম" value={form.biz} onChange={e => set('biz', e.target.value)} />
        <input className="input-field" placeholder="মোবাইল নম্বর (01XXXXXXXXX)" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} />
        <input className="input-field" placeholder="৪ সংখ্যার পিন" type="password" maxLength={4} value={form.pin} onChange={e => set('pin', e.target.value)} />

        {error && <p style={{ color: RED, fontSize: 13 }}>{error}</p>}

        <button className="btn-red" onClick={handleRegister} disabled={loading}>
          {loading ? 'অপেক্ষা করুন...' : 'OTP পাঠান'}
        </button>

        <p style={{ textAlign: 'center', fontSize: 14, color: '#888' }}>
          আগে অ্যাকাউন্ট আছে?{' '}
          <Link href="/login" style={{ color: RED, fontWeight: 700 }}>লগ-ইন করুন</Link>
        </p>
      </div>
    </div>
  );
}
