'use client';
import { useState } from 'react';

const RED = '#CC0000';
const BORDER = '#e8e8e8';
const GRAY = '#f5f5f5';

export default function AddContact({ onBack, onSave }) {
  const [type, setType] = useState('customer');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSave = () => {
    if (!name) return;
    onSave({ name, phone, type });
    onBack();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${BORDER}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}>←</button>
        <div style={{ fontWeight: 700, fontSize: 17 }}>নতুন কাস্টমার/সাপ্লায়ার</div>
      </div>

      <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 60, height: 60, borderRadius: 30, background: GRAY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>👤</div>
          <div style={{ display: 'flex', gap: 10, flex: 1 }}>
            {[['customer', 'কাস্টমার'], ['supplier', 'সাপ্লায়ার']].map(([k, l]) => (
              <button key={k} onClick={() => setType(k)}
                style={{ flex: 1, padding: '10px', border: `2px solid ${type === k ? RED : BORDER}`, borderRadius: 10, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: type === k ? RED : '#1a1a1a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <div style={{ width: 16, height: 16, borderRadius: 8, border: `2px solid ${type === k ? RED : BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {type === k && <div style={{ width: 8, height: 8, borderRadius: 4, background: RED }} />}
                </div>
                {l}
              </button>
            ))}
          </div>
        </div>

        <button style={{ background: GRAY, border: 'none', borderRadius: 12, padding: '14px', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          👥 ফোনবুক থেকে যোগ করি
        </button>

        <div style={{ border: `1.5px solid ${BORDER}`, borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 18 }}>👤</span>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="নাম"
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 15, fontFamily: 'inherit' }} />
        </div>

        <div style={{ border: `1.5px solid ${BORDER}`, borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 18 }}>📞</span>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="মোবাইল নম্বর" type="tel"
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 15, fontFamily: 'inherit' }} />
        </div>
      </div>

      <button onClick={handleSave}
        style={{ margin: '0 20px 20px', background: name ? RED : '#f8d0d0', color: '#fff', border: 'none', borderRadius: 30, padding: 16, fontSize: 16, fontWeight: 700, fontFamily: 'inherit', cursor: name ? 'pointer' : 'default' }}>
        নিশ্চিত
      </button>
    </div>
  );
}
