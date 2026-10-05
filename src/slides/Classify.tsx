/* Tasnif: guruhlash belgilari, iqtisodiy elementlar va xarajatlar tarkibi diagrammasi */
import { useState } from 'react'
import { fmt } from '../lib/format'
import { Frame } from './Frame'
import s from './Slides.module.css'

/* ---------- guruhlash belgilari va iqtisodiy elementlar ---------- */
const GROUPINGS: { by: string; kinds: [string, string] }[] = [
  { by: 'Ishlab chiqarish jarayonidagi iqtisodiy o‘rniga qarab', kinds: ['Asosiy', 'Doimiy'] },
  { by: 'Tarkibiga qarab', kinds: ['Kompleks', 'Bir elementli'] },
  { by: 'Tannarxga o‘tkazish usuliga qarab', kinds: ['To‘g‘ri', 'Egri'] },
  { by: 'Ishlab chiqarish hajmiga qarab', kinds: ['O‘zgaruvchan', 'O‘zgarmas'] },
  { by: 'Yuzaga kelishiga qarab', kinds: ['Doimiy', 'Bir vaqtli'] },
  { by: 'Ishlab chiqarishda ishtirok etishiga qarab', kinds: ['Ishlab chiqarish', 'Tijorat'] },
  { by: 'Samaradorligiga qarab', kinds: ['Samarali', 'Samarasiz'] },
]

const ELEMENTS: { name: string; items: string[] }[] = [
  {
    name: 'Ishlab chiqarish moddiy xarajatlari',
    items: ['Xomashyo va materiallar', 'Yoqilg‘i', 'Elektr energiya', 'Ehtiyot qismlar', 'Idishlar va boshqalar'],
  },
  { name: 'Mehnat haqi xarajatlari', items: ['Asosiy', 'Qo‘shimcha', 'Ustamalar'] },
  { name: 'Ijtimoiy sug‘urta ajratmalari', items: ['Ijtimoiy ta’minot', 'Mehnat birjalari', 'Kasaba uyushmalari'] },
  {
    name: 'Asosiy vositalar va nomoddiy aktivlar eskirishi',
    items: ['Asosiy vositalar', 'Nomoddiy aktivlar', 'Ijaradagilar'],
  },
  { name: 'Boshqa ishlab chiqarish xarajatlari', items: ['Turli ish va xizmatlar', 'Soliqlar, yig‘imlar va boshqalar'] },
]

export function Groups() {
  const [open, setOpen] = useState(0)
  return (
    <Frame
      kicker="Qo‘shimcha · Guruhlash"
      title="Ishlab chiqarish xarajatlarining guruhlanishi"
      lead="Bitta xarajat turli belgilar bo‘yicha turlicha tasniflanadi."
    >
      <div className={s.colsGroups}>
        <div>
          <h3 className={s.label}>Guruhlash belgisi → xarajat turlari</h3>
          <ul className={s.pairList}>
            {GROUPINGS.map((g) => (
              <li key={g.by} className={s.pairRow}>
                <span className={s.pairBy}>{g.by}</span>
                <span className={s.pairKinds}>
                  <b>{g.kinds[0]}</b>
                  <i>va</i>
                  <b>{g.kinds[1]}</b>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className={s.label}>Iqtisodiy elementlar → kalkulyatsiya moddalari</h3>
          <ul className={s.accordion}>
            {ELEMENTS.map((el, i) => (
              <li key={el.name} className={`${s.accItem} ${open === i ? s.accOpen : ''}`}>
                <button className={s.accBtn} aria-expanded={open === i} onClick={() => setOpen(i)}>
                  <span className={s.accNo}>{i + 1}</span>
                  {el.name}
                </button>
                {open === i && (
                  <ul className={s.chips}>
                    {el.items.map((it) => (
                      <li key={it} className={s.chip}>
                        {it}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Frame>
  )
}

/* ---------- amaliy misol: xarajatlar tarkibi ---------- */
const STRUCTURE = [
  { name: 'Mehnat', value: 50 },
  { name: 'Material', value: 15 },
  { name: 'Xizmatlar', value: 10 },
  { name: 'Ijara', value: 8 },
  { name: 'Kommunal', value: 5 },
  { name: 'Transport', value: 4 },
  { name: 'Boshqa', value: 8 },
]
const TOTAL = STRUCTURE.reduce((sum, d) => sum + d.value, 0)

const CH = { w: 880, h: 500, l: 64, r: 16, t: 34, b: 56, max: 50 }
const PLOT_W = CH.w - CH.l - CH.r
const PLOT_H = CH.h - CH.t - CH.b
const BAND = PLOT_W / STRUCTURE.length
const BAR_W = 62
const yOf = (v: number) => CH.t + PLOT_H - (v / CH.max) * PLOT_H

/** Ustun: tepasi 4px yumaloqlangan, asosi o‘qqa tayanadi */
function barPath(x: number, v: number): string {
  const y = yOf(v)
  const y0 = CH.t + PLOT_H
  const r = Math.min(4, y0 - y)
  return `M${x},${y0} V${y + r} Q${x},${y} ${x + r},${y} H${x + BAR_W - r} Q${x + BAR_W},${y} ${x + BAR_W},${y + r} V${y0} Z`
}

export function Structure() {
  const [active, setActive] = useState<number | null>(null)
  const cur = active === null ? null : STRUCTURE[active]
  return (
    <Frame
      kicker="Amaliyot · Amaliy misol"
      title="Amaliy misol: xarajatlar tarkibi"
      lead="Shartli tashkilotning toifalar bo‘yicha xarajatlari, mln so‘m."
    >
      <div className={s.colsChart}>
        <svg
          className={s.chart}
          viewBox={`0 0 ${CH.w} ${CH.h}`}
          role="img"
          aria-label={`Xarajatlar tarkibi, mln so‘m: ${STRUCTURE.map((d) => `${d.name} ${d.value}`).join(', ')}`}
          onMouseLeave={() => setActive(null)}
        >
          {[0, 10, 20, 30, 40, 50].map((t) => (
            <g key={t}>
              <line className={t === 0 ? s.axis : s.gridLine} x1={CH.l} x2={CH.w - CH.r} y1={yOf(t)} y2={yOf(t)} />
              <text className={s.tickText} x={CH.l - 12} y={yOf(t) + 5} textAnchor="end">
                {t}
              </text>
            </g>
          ))}
          <text className={s.axisTitle} x={0} y={14}>
            mln so‘m
          </text>
          {STRUCTURE.map((d, i) => {
            const x = CH.l + BAND * i + (BAND - BAR_W) / 2
            const dim = active !== null && active !== i
            return (
              <g key={d.name} className={dim ? s.barDim : ''}>
                <path className={`${s.bar} ${active === i ? s.barHot : ''}`} d={barPath(x, d.value)} />
                <text className={s.barValue} x={x + BAR_W / 2} y={yOf(d.value) - 10} textAnchor="middle">
                  {d.value}
                </text>
                <text className={s.catText} x={x + BAR_W / 2} y={CH.h - CH.b + 28} textAnchor="middle">
                  {d.name}
                </text>
                {/* bosish/hover maydoni ustundan kattaroq */}
                <rect
                  className={s.hit}
                  x={CH.l + BAND * i}
                  y={CH.t}
                  width={BAND}
                  height={PLOT_H + CH.b}
                  tabIndex={0}
                  role="button"
                  aria-label={`${d.name}: ${d.value} mln so‘m, ${Math.round((d.value / TOTAL) * 100)} foiz`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                />
              </g>
            )
          })}
        </svg>

        <aside className={s.readout}>
          <p className={s.label}>{cur ? 'Tanlangan toifa' : 'Jami xarajatlar'}</p>
          <p className={s.readoutName}>{cur ? cur.name : 'Barcha toifalar'}</p>
          <p className={s.bigNum}>
            {fmt(cur ? cur.value : TOTAL)} <small>mln so‘m</small>
          </p>
          <div className={s.share} aria-hidden="true">
            <i style={{ width: `${((cur ? cur.value : TOTAL) / TOTAL) * 100}%` }} />
          </div>
          <p className={s.readoutNote}>
            {cur
              ? `Jami xarajatlarning ${Math.round((cur.value / TOTAL) * 100)} foizi.`
              : 'Ustun ustiga olib boring — toifaning ulushi ko‘rsatiladi.'}
          </p>
          <p className={s.insight}>
            <b>Xulosa</b>
            Eng katta ulush — mehnatga haq to‘lash: jami xarajatlarning yarmi.
          </p>
        </aside>
      </div>
    </Frame>
  )
}
