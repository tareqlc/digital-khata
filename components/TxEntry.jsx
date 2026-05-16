'use client';
import { useState } from 'react';
import Calculator from './Calculator';

const RED = '#CC0000';
const BORDER = '#e8e8e8';
const GRAY = '#f5f5f5';

const months = ['জানু','ফেব্রু','মার্চ','এপ্রি','মে','জুন','জুলা','আগস্','সেপ্টে','অক্টো','নভে','ডিসে'];

export default function TxEntry({ title, label, cashBalance = 0, onBack, onSave }) {
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const today = new Date();
  const dateStr = `${today.getDate()} ${months[today.getMonth()]}, ${String(today.getFullYear()).slice(-2)}`;

  const handleSave = () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) return;
    onSave(val, desc);
    setAmount('');
    setDesc('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ background: '#fff', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}>←</button>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17 }}>{title}</div>
            <div style={{ fontSize: 12, color: '#888' }}>বর্তমান ক্যাশ {cashBalance.toFixed(2)}</div>
          </div>
        </div>
        <button style={{ background: '#fff0f0', border: 'none', borderRadius: 20, padding: '6px 14px', color: RED, fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
          📋 রিপোর্ট
        </button>
      </div>

      {/* Fields */}
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ border: `1.5px solid ${BORDER}`, borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontWeight: 700, fontSize: 18 }}>৳</span>
          <input value={amount} readOnly placeholder={label}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 18, fontFamily: 'inherit', background: 'transparent', color: amount ? '#1a1a1a' : '#888' }} />
        </div>
        <div style={{ border: `1.5px solid ${BORDER}`, borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18, color: '#888' }}>📝</span>
          <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="বিবরণ"
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 15, fontFamily: 'inherit', background: 'transparent' }} />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ background: GRAY, border: 'none', borderRadius: 20, padding: '8px 16px', fontSize: 13, fontFamily: 'inherit', cursor: 'pointer' }}>
            📅 {dateStr}
          </button>
          <button style={{ marginLeft: 'auto', background: GRAY, border: 'none', borderRadius: 20, padding: '8px 16px', fontSize: 13, fontFamily: 'inherit', cursor: 'pointer' }}>
            📷 ছবি
          </button>
        </div>
      </div>

      {/* Confirm */}
      <button onClick={handleSave}
        style={{ margin: '0 16px 12px', background: amount ? RED : '#f8d0d0', color: '#fff', border: 'none', borderRadius: 30, padding: '16px', fontSize: 17, fontWeight: 700, fontFamily: 'inherit', cursor: amount ? 'pointer' : 'default' }}>
        নিশ্চিত
      </button>

      <Calculator value={amount} onChange={setAmount} />
    </div>
  );
}
