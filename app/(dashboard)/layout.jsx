'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import BottomNav from '@/components/BottomNav';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check auth - Supabase session OR demo mode
    const demo = localStorage.getItem('demo_user');
    if (demo) { setReady(true); return; }

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace('/login');
      else setReady(true);
    });
  }, [router]);

  if (!ready) return (
    <div className="app-shell" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: 36, marginBottom: 12 }}>📒</div>
      <div style={{ color: '#888' }}>লোড হচ্ছে...</div>
    </div>
  );

  return (
    <div className="app-shell">
      <div style={{ flex: 1, overflowY: 'auto' }}>{children}</div>
      <BottomNav />
    </div>
  );
}
