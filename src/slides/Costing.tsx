/* Tannarx: shakllanish zanjiri (kalkulyator) va hisobga olish usullari */
import { useState } from 'react'
import { fmt } from '../lib/format'
import { Icon } from '../lib/icons'
import { Frame, Seg } from './Frame'
import s from './Slides.module.css'

/* ---------- tannarxning shakllanishi ---------- */
type Key = 'dm' | 'dl' | 'oh' | 'wipB' | 'wipE' | 'fgB' | 'fgE'

type Row =
  | { kind: 'input'; key: Key; sign: '' | '+' | '−'; label: string }
  | { kind: 'total'; id: 'cost' | 'made' | 'sold'; label: string }

const ROWS: Row[] = [
  { kind: 'input', key: 'dm', sign: '', label: 'To‘g‘ri moddiy xarajatlar' },
  { kind: 'input', key: 'dl', sign: '+', label: 'To‘g‘ri mehnat xarajatlari' },
  { kind: 'input', key: 'oh', sign: '+', label: 'Umumiy ishlab chiqarish xarajatlari' },
  { kind: 'total', id: 'cost', label: 'Mahsulotning ishlab chiqarish xarajatlari' },
  { kind: 'input', key: 'wipB', sign: '+', label: 'Tugallanmagan ishlab chiqarish qoldig‘i — davr boshida' },
  { kind: 'input', key: 'wipE', sign: '−', label: 'Tugallanmagan ishlab chiqarish qoldig‘i — davr oxirida' },
  { kind: 'total', id: 'made', label: 'Ishlab chiqarilgan mahsulot tannarxi' },
  { kind: 'input', key: 'fgB', sign: '+', label: 'Tayyor mahsulot qoldig‘i — davr boshida' },
  { kind: 'input', key: 'fgE', sign: '−', label: 'Tayyor mahsulot qoldig‘i — davr oxirida' },
  { kind: 'total', id: 'sold', label: 'Sotilgan (realizatsiya) mahsulot tannarxi' },
]

const DEFAULTS: Record<Key, number> = { dm: 500, dl: 300, oh: 200, wipB: 120, wipE: 80, fgB: 150, fgE: 110 }
const STEP = 10

export function CostFlow() {
  const [v, setV] = useState(DEFAULTS)
  const bump = (k: Key, d: number) => setV((p) => ({ ...p, [k]: Math.max(0, p[k] + d) }))

  const cost = v.dm + v.dl + v.oh
  const made = cost + v.wipB - v.wipE
  const sold = made + v.fgB - v.fgE
  const totals = { cost, made, sold }
  const max = Math.max(cost, made, sold, 1)

  const stages = [
    { id: 'cost', name: 'Ishlab chiqarish xarajatlari', value: cost },
    { id: 'made', name: 'Ishlab chiqarilgan mahsulot tannarxi', value: made },
    { id: 'sold', name: 'Sotilgan mahsulot tannarxi', value: sold },
  ]

  return (
    <Frame
      kicker="Qo‘shimcha · Tannarx kalkulyatori"
      title="Mahsulot tannarxi qanday shakllanadi?"
      lead="Qiymatlarni o‘zgartiring — zanjirning har bir bosqichi qayta hisoblanadi (shartli raqamlar, mln so‘m)."
    >
      <div className={s.colsFlow}>
        <ul className={s.statement}>
          {ROWS.map((r) =>
            r.kind === 'input' ? (
              <li key={r.key} className={s.stRow}>
                <span className={s.stSign}>{r.sign}</span>
                <span className={s.stLabel}>{r.label}</span>
                <span className={s.stepper}>
                  <button onClick={() => bump(r.key, -STEP)} aria-label={`${r.label}: kamaytirish`}>
                    <Icon id="minus" size={16} />
                  </button>
                  <output>{fmt(v[r.key])}</output>
                  <button onClick={() => bump(r.key, STEP)} aria-label={`${r.label}: oshirish`}>
                    <Icon id="plus" size={16} />
                  </button>
                </span>
              </li>
            ) : (
              <li key={r.id} className={`${s.stRow} ${s.stTotal}`}>
                <span className={s.stSign}>=</span>
                <span className={s.stLabel}>{r.label}</span>
                <output className={s.stValue}>{fmt(totals[r.id])}</output>
              </li>
            ),
          )}
        </ul>

        <ol className={s.stages}>
          {stages.map((st, i) => (
            <li key={st.id} className={s.stage}>
              <span className={s.stageNo}>{i + 1}</span>
              <span className={s.stageName}>{st.name}</span>
              <span className={s.stageValue}>
                {fmt(st.value)} <small>mln so‘m</small>
              </span>
              <span className={s.stageBar} aria-hidden="true">
                <i style={{ width: `${Math.max(0, (st.value / max) * 100)}%` }} />
              </span>
            </li>
          ))}
          <li className={s.stageReset}>
            <button className={s.ghostBtn} onClick={() => setV(DEFAULTS)}>
              Boshlang‘ich qiymatlar
            </button>
          </li>
        </ol>
      </div>
    </Frame>
  )
}

/* ---------- hisobga olish usullari ---------- */
type Method = 'full' | 'var'

const METHODS: { id: Method; label: string }[] = [
  { id: 'full', label: 'To‘liq xarajatlar usuli' },
  { id: 'var', label: 'O‘zgaruvchan xarajatlar usuli' },
]

const METHOD_INFO: Record<Method, { name: string; body: string }> = {
  full: {
    name: 'To‘liq xarajatlarni hisoblash usuli',
    body: 'Mahsulot tannarxini hisoblashda barcha xarajatlar — ham o‘zgaruvchan, ham doimiy xarajatlar hisobga olinadi.',
  },
  var: {
    name: 'O‘zgaruvchan xarajatlarni hisobga olish usuli (marjinal foyda usuli)',
    body: 'Mahsulot tannarxini hisoblash hamda zaxirani baholashda faqat o‘zgaruvchan ishlab chiqarish xarajatlari hisobga olinadi.',
  },
}

const COMPONENTS = [
  { name: 'To‘g‘ri moddiy xarajatlar', fixed: false },
  { name: 'To‘g‘ri mehnat (ish) haqi xarajatlari', fixed: false },
  { name: 'O‘zgaruvchan umumishlab chiqarish xarajatlari', fixed: false },
  { name: 'Doimiy umumishlab chiqarish xarajatlari', fixed: true },
]

export function Methods() {
  const [m, setM] = useState<Method>('full')
  const inCost = COMPONENTS.filter((c) => m === 'full' || !c.fixed)
  const inPeriod = COMPONENTS.filter((c) => m === 'var' && c.fixed)
  return (
    <Frame
      kicker="Qo‘shimcha · Hisobga olish usullari"
      title="Xarajatlarni hisobga olish usullari"
      lead="To‘liq va o‘zgaruvchan xarajatlarni hisobga olish usullari moliyaviy natijaga turlicha ta’sir qiladi."
    >
      <div className={s.colsMethods}>
        <div className={s.stack}>
          <Seg label="Hisobga olish usuli" options={METHODS} value={m} onChange={setM} />
          <div key={m} className={s.quoteSm}>
            <h3>{METHOD_INFO[m].name}</h3>
            <p>{METHOD_INFO[m].body}</p>
          </div>
        </div>
        <div className={s.zones}>
          <section className={`${s.zone} ${s.zoneMain}`}>
            <h3 className={s.label}>Mahsulot tannarxiga kiradi</h3>
            <ul>
              {inCost.map((c) => (
                <li key={c.name} className={`${s.comp} ${c.fixed ? s.compFixed : ''}`}>
                  <Icon id="check" size={18} />
                  {c.name}
                </li>
              ))}
            </ul>
          </section>
          <section className={s.zone}>
            <h3 className={s.label}>Tannarxga kirmaydi — davr xarajati</h3>
            {inPeriod.length ? (
              <ul>
                {inPeriod.map((c) => (
                  <li key={c.name} className={`${s.comp} ${s.compOut}`}>
                    <Icon id="minus" size={18} />
                    {c.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={s.zoneEmpty}>Bu usulda barcha ishlab chiqarish xarajatlari tannarxga kiradi.</p>
            )}
          </section>
        </div>
      </div>
    </Frame>
  )
}
