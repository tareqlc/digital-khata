'use client';
import { useState, useEffect } from 'react';
import RedHeader from '@/components/RedHeader';
import TxEntry from '@/components/TxEntry';
import { supabase, addCashTransaction, getCashSummary } from '@/lib/supabase';

const RED = '#CC0000';
const GREEN = '#1a9e3f';
const BORDER = '#e8e8e8';
const GRAY = '#f5f5f5';

const cashItems = [
  { label: 'ক্যাশ বেচা',  key: 'cashSale',  color: GREEN, bg: '#e8f5e9', isIn: true },
  { label: 'ক্যাশ কেনা',  key: 'cashBuy',   color: RED,   bg: '#fce4ec', isIn: false },
  { label: 'খরচ',          key: 'expense',   color: RED,   bg: '#fce4ec', isIn: false },
  { label: 'মালিক দিল',   key: 'ownerIn',   color: GREEN, bg: '#e8f5e9', isIn: true },
  { label: 'মালিক নিল',   key: 'ownerOut',  color: RED,   bg: '#fce4ec', isIn: false },
];

const txConfig = {
  cashSale: { title: 'ক্যাশ বেচা', label: 'পেলাম' },
  cashBuy:  { title: 'ক্যাশ কেনা', label: 'দিলাম' },
  expense:  { title: 'খরচ',         label: 'দিলাম' },
  ownerIn:  { title: 'মালিক দিল',  label: 'পরিমাণ' },
  ownerOut: { title: 'মালিক নিল',  label: 'পরিমাণ' },
};

const today = new Date().toISOString().split('T')[0];

export default function CashboxPage() {
  const [screen, setScreen] = useState('home');
  const [bizName, setBizName] = useState('ব্যবসা');
  const [businessId, setBusinessId] = useState(null);
  const [summary, setSummary] = useState({ cashSale:0, cashBuy:0, expense:0, ownerIn:0, ownerOut:0, dueCollected:0, paymentGiven:0 });
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const loadSummary = async (bizId) => {
    const demo = localStorage.getItem('demo_user');
    if (demo) {
      const saved = JSON.parse(localStorage.getItem('demo_cash_' + today) || 'null');
      if (saved) setSummary(saved);
      return;
    }
    const { data } = await getCashSummary(bizId, today);
    if (data) setSummary(data);
  };

  useEffect(() => {
    const init = async () => {
      const demo = localStorage.getItem('demo_user');
      if (demo) {
        const d = JSON.parse(demo);
        setBizName(d.biz || d.name);
        await loadSummary(null);
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data: biz } = await supabase.from('businesses').select('*').eq('user_id', session.user.id).single();
      if (biz) { setBizName(biz.name); setBusinessId(biz.id); await loadSummary(biz.id); }
    };
    init();
  }, []);

  const handleSave = async (txType, amount, desc) => {
    const demo = localStorage.getItem('demo_user');
    if (demo) {
      const newSummary = { ...summary, [txType]: summary[txType] + amount };
      setSummary(newSummary);
      localStorage.setItem('demo_cash_' + today, JSON.stringify(newSummary));
      showToast('সংরক্ষিত হয়েছে ✓');
      setScreen('home');
      return;
    }
    if (businessId) {
      await addCashTransaction(businessId, { tx_type: txType, amount, description: desc, tx_date: today });
      await loadSummary(businessId);
      showToast('সংরক্ষিত হয়েছে ✓');
    }
    setScreen('home');
  };

  if (screen !== 'home' && txConfig[screen]) {
    const cfg = txConfig[screen];
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <TxEntry title={cfg.title} label={cfg.label} cashBalance={summary.cashSale - summary.cashBuy - summary.expense}
          onBack={() => setScreen('home')} onSave={(amt, desc) => handleSave(screen, amt, desc)} />
      </div>
    );
  }

  const todayIn = summary.cashSale + summary.dueCollected + summary.ownerIn;
  const todayOut = summary.cashBuy + summary.paymentGiven + summary.expense + summary.ownerOut;

  return (
    <div className="fade-up" style={{ paddingBottom: 60 }}>
      <RedHeader bizName={bizName} />

      {/* Summary */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ padding: 16, borderRight: `1px solid ${BORDER}`, textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 24 }}>{todayIn.toFixed(0)}</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>আজকের বেচা</div>
          </div>
          <div style={{ padding: 16, textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 24 }}>{(todayIn - todayOut).toFixed(0)}</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>বর্তমান ক্যাশ</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '10px 16px', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ fontSize: 13, color: GREEN }}>আজ পেলাম <strong>{todayIn.toFixed(0)}</strong></div>
          <div style={{ fontSize: 13, color: RED, textAlign: 'right' }}>আজ দিলাম <strong>{todayOut.toFixed(0)}</strong></div>
        </div>
        <div style={{ display: 'flex', gap: 10, padding: '10px 16px', alignItems: 'center' }}>
          <button style={{ background: '#fff8e1', border: 'none', borderRadius: 20, padding: '8px 16px', color: '#f57f17', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>📋 রিপোর্ট</button>
          <button style={{ background: GRAY, border: 'none', borderRadius: 20, padding: '8px 16px', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>⇄ ক্যাশবক্র মিলাই</button>
          <button style={{ marginLeft: 'auto', background: GRAY, border: 'none', borderRadius: 20, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>👁</button>
        </div>
        <div style={{ display: 'flex', padding: '0 16px 10px', gap: 16 }}>
          <span style={{ fontSize: 13, color: GREEN }}>বাকি আদায় ●</span>
          <span style={{ fontSize: 13, color: RED }}>পেমেন্ট দেয়া ●</span>
        </div>
      </div>

      {/* Cash items */}
      {cashItems.map((item, i) => (
        <div key={i} onClick={() => setScreen(item.key)}
          style={{ display: 'flex', alignItems: 'center', padding: 16, borderBottom: `1px solid ${BORDER}`, cursor: 'pointer', background: '#fff' }}>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 14, fontSize: 22 }}>
            {item.isIn ? '🤲' : '☝️'}
          </div>
          <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 15 }}>{item.label}</div></div>
          <span style={{ color: item.color, fontWeight: 700, fontSize: 16, marginRight: 8 }}>{summary[item.key].toFixed(2)}</span>
          <span style={{ color: '#888' }}>›</span>
        </div>
      ))}

      {toast && (
        <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: '#333', color: '#fff', padding: '10px 20px', borderRadius: 20, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', zIndex: 99 }}>
          {toast}
        </div>
      )}
    </div>
  );
}
