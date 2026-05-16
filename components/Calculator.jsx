'use client';

const BORDER = '#e8e8e8';
const RED = '#CC0000';

const rows = [
  ['AC', '%', '÷', '×'],
  ['7',  '8', '9', '-'],
  ['4',  '5', '6', '+'],
  ['1',  '2', '3', ''],
  ['⌫',  '0', '.', '='],
];

export default function Calculator({ value = '', onChange }) {
  const press = (key) => {
    if (key === 'AC') { onChange(''); return; }
    if (key === '⌫') { onChange(value.slice(0, -1)); return; }
    if (key === '' || key === '=') return;
    if (key === '%' && value) { onChange(String(parseFloat(value) / 100)); return; }
    if (['+', '-', '×', '÷'].includes(key)) { onChange(value + key); return; }
    if (key === '.' && value.includes('.')) return;
    onChange(value + key);
  };

  return (
    <div style={{ background: '#f9f9f9', borderTop: `1px solid ${BORDER}` }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', borderBottom: ri < 4 ? `1px solid ${BORDER}` : 'none' }}>
          {row.map((k, ci) => {
            if (k === '') return <div key={ci} />;
            const isOp = ['AC', '%', '÷', '×'].includes(k);
            const isSpecial = k === '+' || k === '=';
            return (
              <button key={ci} onClick={() => press(k)}
                style={{
                  padding: '18px 0', fontSize: 20, fontFamily: 'inherit',
                  border: 'none', borderRight: ci < 3 ? `1px solid ${BORDER}` : 'none',
                  background: isSpecial ? '#fde8e8' : 'transparent',
                  color: isOp ? RED : '#1a1a1a',
                  fontWeight: isOp ? 700 : 400,
                  cursor: 'pointer',
                }}>
                {k}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
