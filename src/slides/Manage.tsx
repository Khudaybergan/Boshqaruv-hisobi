/* Boshqaruv: javobgarlik markazlari va materiallarni baholash usullari */
import { useState } from 'react'
import { fmt } from '../lib/format'
import { Frame, Seg } from './Frame'
import s from './Slides.module.css'

/* ---------- javobgarlik markazlari ---------- */
const SCOPE = ['Xarajatlar', 'Tushum', 'Foyda', 'Kapital qo‘yilmalar'] as const

const CENTERS = [
  {
    id: 'xarajat',
    name: 'Xarajatlar markazi',
    units: ['Ishlab chiqarish sexlari', 'Tetra-pak sexi', 'Texnologik laboratoriya', 'Bosh texnolog, energetik, mexanik xizmatlari'],
    scope: [true, false, false, false],
    body: 'Rahbar o‘z bo‘linmasining xarajatlari uchun javob beradi. Xarajatlar va ular bo‘yicha chetlanishlar bo‘linma zimmasiga yuklanadi.',
  },
  {
    id: 'sotish',
    name: 'Sotish markazi',
    units: ['Marketing bo‘limi', 'Ta’minot bo‘limi', 'Sotish bo‘limi', 'Materiallar va tayyor mahsulotlar ombori'],
    scope: [false, true, false, false],
    body: 'Rahbar faqat tushumga javob beradi. Asosiy nazorat qilinadigan ko‘rsatkichlar — sotish hajmi va baho.',
  },
  {
    id: 'foyda',
    name: 'Foyda markazi',
    units: ['Mahsulot hajmi, baho va xarajatlarga javobgar xodim'],
    scope: [true, true, true, false],
    body: 'Rahbar xarajatlar va foyda uchun javob beradi: sotish hajmi, baho va xarajatlarni nazorat qiladi. Moliyaviy natijalar to‘g‘risidagi hisobot va operatsion byudjet yordamida boshqariladi.',
  },
  {
    id: 'invest',
    name: 'Investitsiyalar markazi',
    units: ['Kapital qo‘yilmalar, qimmatli qog‘ozlar muomalalariga javobgar xodim'],
    scope: [true, true, true, true],
    body: 'Rahbar daromadlar va xarajatlardan tashqari kapital qo‘yilmalarga ajratilgan mablag‘larga ham javob beradi. Operatsion byudjet, pul oqimlari to‘g‘risidagi hisobot va buxgalteriya balansi yordamida boshqariladi.',
  },
] as const

export function Centers() {
  const [id, setId] = useState<(typeof CENTERS)[number]['id']>('xarajat')
  const cur = CENTERS.find((c) => c.id === id)!
  return (
    <Frame
      kicker="Qo‘shimcha · Javobgarlik markazlari"
      title="Xarajat uchun kim javob beradi?"
      lead="Vakolatlar va javobgarlik hajmiga ko‘ra korxona to‘rt turdagi javobgarlik markaziga bo‘linadi."
    >
      <div className={s.centers}>
        <ul className={s.centerRow} role="tablist" aria-label="Javobgarlik markazlari">
          {CENTERS.map((c, i) => (
            <li key={c.id}>
              <button
                role="tab"
                aria-selected={id === c.id}
                className={`${s.center} ${id === c.id ? s.centerOn : ''}`}
                onClick={() => setId(c.id)}
              >
                <span className={s.centerNo}>{i + 1}</span>
                <span className={s.centerName}>{c.name}</span>
                <span className={s.centerUnits}>{c.units.join(' · ')}</span>
              </button>
            </li>
          ))}
        </ul>
        <div key={id} className={s.centerDetail}>
          <div>
            <h3 className={s.label}>Rahbarning javobgarlik doirasi</h3>
            <ul className={s.scope}>
              {SCOPE.map((name, i) => (
                <li key={name} className={cur.scope[i] ? s.scopeOn : ''}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <p className={s.centerBody}>{cur.body}</p>
        </div>
      </div>
    </Frame>
  )
}

/* ---------- materiallarni baholash: FIFO / LIFO / AVECO ---------- */
const BATCHES = [
  { q: 100, p: 10 },
  { q: 100, p: 12 },
  { q: 100, p: 15 },
]
const TOTAL_Q = BATCHES.reduce((a, b) => a + b.q, 0)
const TOTAL_COST = BATCHES.reduce((a, b) => a + b.q * b.p, 0)

type Method = 'fifo' | 'lifo' | 'aveco'

const METHODS: { id: Method; label: string }[] = [
  { id: 'fifo', label: 'FIFO' },
  { id: 'lifo', label: 'LIFO' },
  { id: 'aveco', label: 'AVECO' },
]

const METHOD_TEXT: Record<Method, string> = {
  fifo: 'Zaxiralar qanday tartibda sotib olingan bo‘lsa, shunday tartibda sarflanadi: avval dastlabki partiya. Davr oxiridagi zaxira so‘nggi xarid qiymati bo‘yicha baholanadi. Pul qadrsizlanadigan davrda eng yuqori foydani ko‘rsatadi.',
  lifo: 'Zaxiralardan eng so‘nggi xarid qilinganidan boshlab foydalaniladi. Davr oxiridagi zaxira birinchi xarid tannarxidan kelib chiqib baholanadi. Pul qadrsizlanishi davrida eng kam foyda beradi.',
  aveco: 'Sarflangan materiallar va oxirgi zaxira o‘rtacha qiymat bo‘yicha baholanadi: materiallarning to‘la qiymati ularning birliklari miqdoriga taqsimlanadi.',
}

/** Har bir partiyadan sarflangan miqdor */
function issued(method: Method, qty: number): number[] {
  if (method === 'aveco') return BATCHES.map((b) => (qty * b.q) / TOTAL_Q)
  const order = method === 'fifo' ? [0, 1, 2] : [2, 1, 0]
  const out = [0, 0, 0]
  let left = qty
  for (const i of order) {
    out[i] = Math.min(BATCHES[i].q, left)
    left -= out[i]
  }
  return out
}

function costOf(method: Method, qty: number): number {
  if (method === 'aveco') return (qty * TOTAL_COST) / TOTAL_Q
  return issued(method, qty).reduce((sum, q, i) => sum + q * BATCHES[i].p, 0)
}

export function Inventory() {
  const [method, setMethod] = useState<Method>('fifo')
  const [qty, setQty] = useState(150)
  const used = issued(method, qty)

  return (
    <Frame
      kicker="Qo‘shimcha · Materiallarni baholash"
      title="FIFO, LIFO va o‘rtacha qiymat usullari"
      lead="Uchta partiya turli narxda xarid qilingan. Sarflangan materiallar qiymati usulga qarab o‘zgaradi (shartli misol)."
    >
      <div className={s.colsInv}>
        <div className={s.stack}>
          <Seg label="Baholash usuli" options={METHODS} value={method} onChange={setMethod} />
          <ul className={s.batches}>
            {BATCHES.map((b, i) => (
              <li key={i} className={s.batch}>
                <span className={s.batchName}>
                  {i + 1}-partiya
                  <small>
                    {b.q} dona × {b.p} sh.b.
                  </small>
                </span>
                <span className={s.batchBar} aria-hidden="true">
                  <i
                    className={method === 'lifo' ? s.fromRight : ''}
                    style={{ width: `${(used[i] / b.q) * 100}%` }}
                  />
                </span>
                <span className={s.batchUsed}>
                  {fmt(used[i])} <small>sarflandi</small>
                </span>
              </li>
            ))}
          </ul>
          <label className={s.sliderRow}>
            <span className={s.label}>
              Ishlab chiqarishga berildi: <b>{qty} dona</b>
            </span>
            <input
              type="range"
              min={0}
              max={TOTAL_Q}
              step={10}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              aria-valuetext={`${qty} dona`}
            />
          </label>
          <p className={s.methodText}>{METHOD_TEXT[method]}</p>
        </div>

        <div className={s.stack}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Usul</th>
                <th>Sarflangan materiallar</th>
                <th>Davr oxiridagi zaxira</th>
              </tr>
            </thead>
            <tbody>
              {METHODS.map((m) => {
                const c = costOf(m.id, qty)
                return (
                  <tr key={m.id} className={m.id === method ? s.rowOn : ''} onClick={() => setMethod(m.id)}>
                    <th scope="row">{m.label}</th>
                    <td>{fmt(c)}</td>
                    <td>{fmt(TOTAL_COST - c)}</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>sh.b. · jami zaxira: {TOTAL_Q} dona, {fmt(TOTAL_COST)} sh.b.</td>
              </tr>
            </tfoot>
          </table>
          <p className={s.insight}>
            <b>Boshqa usullar</b>
            Yalpi identifikatsiyalash · NIFO (next-in, first-out) · me’yoriy qiymat usuli.
          </p>
        </div>
      </div>
    </Frame>
  )
}
