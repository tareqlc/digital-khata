'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RedHeader from '@/components/RedHeader';
import AddContact from '@/components/AddContact';
import { supabase, getContacts, addContact } from '@/lib/supabase';

const RED = '#CC0000';
const GREEN = '#1a9e3f';
const BORDER = '#e8e8e8';
const GRAY = '#f5f5f5';

const features = [
  { icon: '📚', label: 'মাল্টি ব্যবসা', bg: '#e8f5e9' },
  { icon: '📦', label: 'স্টক হিসাব',   bg: '#fbe9e7' },
  { icon: '📋', label: 'ব্যবসার নোট',  bg: '#fff8e1' },
  { icon: '🔔', label: 'গ্রুপ তাগাদা', bg: '#e8f5e9' },
  { icon: '⬛', label: 'QR কোড',        bg: '#fce4ec', path: '/qr' },
  { icon: '☁️', label: 'ডাটা ব্যাকআপ', bg: '#e8f5e9' },
  { icon: '💬', label: 'টালি-মেসেজ',  bg: '#fbe9e7' },
  { icon: '💰', label: 'ক্যাশবক্র',    bg: '#fff3e0', path: '/cashbox' },
];

export default function TaliPage() {
  const router = useRouter();
  const [bizName, setBizName] = useState('ব্যবসা');
  const [plan, setPlan] = useState('স্ট্যান্ডার্ড');
  const [contacts, setContacts] = useState([]);
  const [screen, setScreen] = useState('home'); // home | addContact
  const [businessId, setBusinessId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  useEffect(() => {
    const loadData = async () => {
      // Demo mode
      const demo = localStorage.getItem('demo_user');
      if (demo) {
        const d = JSON.parse(demo);
        setBizName(d.biz || d.name);
        setPlan(d.plan || 'স্ট্যান্ডার্ড');
        const saved = JSON.parse(localStorage.getItem('demo_contacts') || '[]');
        setContacts(saved);
        return;
      }
      // Supabase mode
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data: biz } = await supabase.from('businesses').select('*').eq('user_id', session.user.id).single();
      if (biz) { setBizName(biz.name); setBusinessId(biz.id); setPlan(biz.plan === 'gold' ? 'গোল্ড' : 'স্ট্যান্ডার্ড'); }
      if (biz) {
        const { data } = await getContacts(biz.id);
        setContacts(data || []);
      }
    };
    loadData();
  }, []);

  const handleSaveContact = async (c) => {
    const demo = localStorage.getItem('demo_user');
    if (demo) {
      const newC = { ...c, id: Date.now(), due: 0, paid: 0, created_at: new Date().toISOString() };
      const updated = [...contacts, newC];
      setContacts(updated);
      localStorage.setItem('demo_contacts', JSON.stringify(updated));
      showToast(`${c.type === 'customer' ? 'কাস্টমার' : 'সাপ্লায়ার'} যোগ হয়েছে ✓`);
      return;
    }
    if (businessId) {
      const { data } = await addContact(businessId, c);
      if (data) setContacts(p => [data, ...p]);
      showToast(`${c.type === 'customer' ? 'কাস্টমার' : 'সাপ্লায়ার'} যোগ হয়েছে ✓`);
    }
  };

  if (screen === 'addContact') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <AddContact onBack={() => setScreen('home')} onSave={handleSaveContact} />
      </div>
    );
  }

  const customers = contacts.filter(c => c.type === 'customer');
  const suppliers = contacts.filter(c => c.type === 'supplier');

  return (
    <div className="fade-up" style={{ position: 'relative' }}>
      <RedHeader bizName={bizName} plan={plan} />

      {/* Feature Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: BORDER, borderBottom: `1px solid ${BORDER}` }}>
        {features.map((f, i) => (
          <div key={i} onClick={() => f.path && router.push(f.path)}
            style={{ background: '#fff', padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: f.path ? 'pointer' : 'default' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{f.icon}</div>
            <span style={{ fontSize: 11, fontWeight: 500, textAlign: 'center', lineHeight: 1.3 }}>{f.label}</span>
          </div>
        ))}
      </div>

      {/* Contact count */}
      <div style={{ padding: '12px 16px', background: GRAY, borderBottom: `1px solid ${BORDER}` }}>
        <span style={{ fontSize: 14, color: '#888' }}>কাস্টমার {customers.length} / সাপ্লায়ার {suppliers.length}</span>
      </div>

      {/* Contact list or empty */}
      {contacts.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 80, marginBottom: 16 }}>👨‍💼</div>
          <p style={{ fontSize: 15, color: '#888' }}>ব্যবহার শুরু করতে কাস্টমার/সাপ্লায়ার যোগ করুন।</p>
        </div>
      ) : (
        <div style={{ paddingBottom: 80 }}>
          {contacts.map(c => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: `1px solid ${BORDER}`, cursor: 'pointer' }}>
              <div style={{ width: 42, height: 42, borderRadius: 21, background: c.type === 'customer' ? '#e8f5e9' : '#fce4ec', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 14, fontWeight: 700, fontSize: 18, color: c.type === 'customer' ? GREEN : RED }}>
                {c.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{c.phone}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: RED, fontWeight: 700 }}>৳{(c.due || 0).toFixed(2)}</div>
                <div style={{ fontSize: 11, color: '#888' }}>বাকি</div>
              </div>
              <span style={{ marginLeft: 8, color: '#888' }}>›</span>
            </div>
          ))}
        </div>
      )}

      {/* FAB */}
      <button onClick={() => setScreen('addContact')}
        style={{ position: 'fixed', bottom: 72, right: '50%', transform: 'translateX(50%)', maxWidth: 380, width: 'calc(100% - 32px)', background: RED, color: '#fff', border: 'none', borderRadius: 30, padding: '14px 20px', fontSize: 14, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 4px 20px rgba(204,0,0,0.4)', zIndex: 40 }}>
        👤➕ নতুন কাস্টমার/সাপ্লায়ার
      </button>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: '#333', color: '#fff', padding: '10px 20px', borderRadius: 20, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', zIndex: 99 }}>
          {toast}
        </div>
      )}
    </div>
  );
}
