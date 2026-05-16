'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/tali');
      else router.replace('/login');
    });
  }, [router]);

  return (
    <div className="app-shell" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, background: '#CC0000', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 36 }}>📒</div>
        <div style={{ fontWeight: 900, fontSize: 24, color: '#CC0000' }}>ডিজিটাল খাতা</div>
        <div style={{ color: '#888', marginTop: 6, fontSize: 14 }}>লোড হচ্ছে...</div>
      </div>
    </div>
  );
}
