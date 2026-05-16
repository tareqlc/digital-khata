'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from '@/lib/supabase';

const RED = '#CC0000';
const BORDER = '#e8e8e8';

export default function MenuPage() {
  const router = useRouter();
  const [user, setUser] = useState({ name: 'ব্যবহারকারী', phone: '', biz: 'ব্যবসা' });

  useEffect(() => {
    const demo = localStorage.getItem('demo_user');
    if (demo) { setUser(JSON.parse(demo)); return; }
  }, []);

  const handleLogout = async () => {
    const demo = localStorage.getItem('demo_user');
    if (demo) {
      localStorage.removeItem('demo_user');
      localStorage.removeItem('demo_contacts');
      router.replace('/login');
      return;
    }
    await signOut();
    router.replace('/login');
  };

  const menuItems = [
    { section: 'টালিপে ওয়ালেট', tag: 'পার্সোনাল', items: [['🏦','একাউন্ট সমূহ'],['📄','লেনদেন বিবরণী'],['📈','লেনদেনের লিমিট']] },
    { section: 'ডিজিটাল খাতা', items: [['🏷️','বেচা কেনা হিসাব'],['💸','খরচ'],['📒','বাকি হিসাব'],['💰','ক্যাশ হিসাব'],['📊','মালিকের রিপোর্ট']] },
    { section: 'অন্যান্য', items: [['⚙️','সেটিংস'],['🔗','গোল্ড রেফার করুন']] },
  ];

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '20px 16px', borderBottom: `1px solid ${BORDER}`, cursor: 'pointer' }}>
        <div style={{ width: 48, height: 48, borderRadius: 24, background: '#f57f17', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 18 }}>
          {(user.biz || user.name || 'U').substring(0, 2).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{(user.biz || user.name || '').toUpperCase()}</div>
          <div style={{ fontSize: 13, color: '#888' }}>+88{user.phone}</div>
        </div>
        <span style={{ color: '#888' }}>›</span>
      </div>

      {/* Gold Banner */}
      <div style={{ background: 'linear-gradient(135deg,#fff8e1,#ffe082)', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>👑</span>
          <span style={{ fontWeight: 700, fontSize: 15 }}>ডিজিটাল খাতা গোল্ড কিনুন</span>
        </div>
        <span style={{ color: '#f57f17' }}>›</span>
      </div>

      {menuItems.map((group, gi) => (
        <div key={gi}>
          <div style={{ padding: '10px 16px 6px', marginTop: gi > 0 ? 4 : 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: RED, fontWeight: 700, fontSize: 13 }}>{group.section}</span>
            {group.tag && <span style={{ background: '#ffc107', borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{group.tag}</span>}
          </div>
          {group.items.map(([ic, label], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', borderBottom: `1px solid ${BORDER}`, cursor: 'pointer' }}>
              <span style={{ fontSize: 20 }}>{ic}</span>
              <span style={{ fontSize: 14 }}>{label}</span>
              <span style={{ marginLeft: 'auto', color: '#888' }}>›</span>
            </div>
          ))}
        </div>
      ))}

      <div onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', borderBottom: `1px solid ${BORDER}`, cursor: 'pointer' }}>
        <span style={{ fontSize: 20 }}>🚪</span>
        <span style={{ fontSize: 14, color: RED }}>লগ-আউট</span>
      </div>

      <div style={{ padding: 16, textAlign: 'center' }}>
        <span style={{ color: RED, fontWeight: 900, fontSize: 18 }}>ডিজিটাল খাতা</span>
        <span style={{ color: '#888', fontSize: 12, marginLeft: 10 }}>ভার্সন - ১.০.০</span>
      </div>
    </div>
  );
}
