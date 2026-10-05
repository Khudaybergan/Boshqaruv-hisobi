/* Kirish: muqova, «Xarajat nima?», xarajatlarning ahamiyati va hisob vazifalari */
import { useState } from 'react'
import { TOIFA_ROOT } from '../data/tree'
import { Icon } from '../lib/icons'
import { Frame, Seg, type SlideProps } from './Frame'
import s from './Slides.module.css'

/* ---------- muqova bezagi: xaritaning kichik nusxasi ---------- */
function OrbitArt() {
  const kids = TOIFA_ROOT.children ?? []
  const C = 310
  const R = 222
  return (
    <svg className={s.orbitArt} viewBox="0 0 620 620" aria-hidden="true">
      <circle className={s.artOrbit} cx={C} cy={C} r={R} />
      <circle className={s.artOrbit} cx={C} cy={C} r={R + 62} />
      {kids.map((n, i) => {
        const a = ((-90 + (360 / kids.length) * i) * Math.PI) / 180
        const x = C + R * Math.cos(a)
        const y = C + R * Math.sin(a)
        const d = `M${x.toFixed(1)},${y.toFixed(1)} L${C},${C}`
        return (
          <g key={n.id}>
            <path id={`art-${n.id}`} className={s.artEdge} d={d} />
            <circle className={s.artPulse} r="3">
              <animateMotion dur={`${2.6 + (i % 3) * 0.5}s`} begin={`${-i * 0.4}s`} repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1">
                <mpath href={`#art-${n.id}`} />
              </animateMotion>
            </circle>
            <circle className={s.artNode} cx={x} cy={y} r="29" />
            <g transform={`translate(${x - 14}, ${y - 14})`} className={s.artIcon}>
              <Icon id={n.icon ?? 'grid'} size={28} />
            </g>
          </g>
        )
      })}
      <circle className={s.artCoreDash} cx={C} cy={C} r="92" />
      <circle className={s.artCore} cx={C} cy={C} r="80" />
      <g transform={`translate(${C - 22}, ${C - 50})`} className={s.artCoreIcon}>
        <Icon id="coins" size={44} />
      </g>
      <text className={s.artCoreText} x={C} y={C + 26} textAnchor="middle">
        Xarajatlar
      </text>
    </svg>
  )
}

export function Cover({ next }: SlideProps) {
  return (
    <section className={s.cover}>
      <div className={s.coverText}>
        <p className={s.kicker}>Boshqaruv hisobi · Taqdimot</p>
        <h1 className={s.coverTitle}>«Xarajatlar» toifalarining ta’rifi</h1>
        <p className={s.coverLead}>
          Xarajat tushunchasi, asosiy turlari, o‘nta toifasi va xarajatlarni boshqarish jarayoni.
        </p>
        <dl className={s.coverMeta}>
          <div>
            <dt>Tayyorladi</dt>
            <dd>Murodullayev Mubasher Holiqul o‘g‘li</dd>
          </div>
          <div>
            <dt>Talaba ID</dt>
            <dd>471261200257</dd>
          </div>
        </dl>
        <div className={s.coverActions}>
          <button className={s.cta} onClick={next}>
            Taqdimotni boshlash
            <Icon id="right" size={20} />
          </button>
          <span className={s.hint}>← → slaydlar · F to‘liq ekran · M mundarija</span>
        </div>
      </div>
      <OrbitArt />
    </section>
  )
}

/* ---------- Xarajat nima? ---------- */
const DEFS = [
  {
    id: 'xarajat',
    label: 'Xarajat',
    body: 'Xarajat — biror-bir ehtiyojni qondirish, mahsulot ishlab chiqarish, xizmat ko‘rsatish yoki daromad topish maqsadida qilinadigan pul yoki moddiy sarf-chiqimdir.',
  },
  {
    id: 'xarajatlar',
    label: 'Xarajatlar',
    body: 'Xarajatlar — mahsulotlarni ishlab chiqarish, tovarlar sotish, ishlar bajarish va xizmatlar ko‘rsatish bilan bog‘liq bo‘lgan sarflarning puldagi ifodasidir.',
  },
  {
    id: 'ich',
    label: 'Ishlab chiqarish xarajatlari',
    body: 'Ishlab chiqarish xarajatlari — bevosita mahsulot (ish, xizmat)larni ishlab chiqarishga ketgan, shuningdek, ularning tannarxini tashkil etuvchi xarajatlardir.',
  },
] as const

const SPHERES = [
  { icon: 'box', name: 'Mahsulot ishlab chiqarish' },
  { icon: 'cart', name: 'Tovar sotish va xizmat ko‘rsatish' },
  { icon: 'gear', name: 'Boshqaruv jarayonlari' },
  { icon: 'coins', name: 'Moliyalashtirish' },
]

export function WhatIs() {
  const [def, setDef] = useState<(typeof DEFS)[number]['id']>('xarajat')
  const cur = DEFS.find((d) => d.id === def)!
  return (
    <Frame
      kicker="Kirish · Tushuncha"
      title="Xarajat nima?"
      lead="Korxonaning barcha jarayonlarida sarflanadigan pul mablag‘lari, resurslar va moddiy boyliklar yig‘indisi."
    >
      <div className={s.cols2}>
        <div className={s.stack}>
          <Seg label="Ta’rif" options={DEFS} value={def} onChange={setDef} />
          <blockquote key={def} className={s.quote}>
            {cur.body}
          </blockquote>
        </div>
        <div className={s.stack}>
          <h3 className={s.label}>Xarajatlar yuzaga keladigan jarayonlar</h3>
          <ul className={s.grid2}>
            {SPHERES.map((sp) => (
              <li key={sp.name} className={s.tile}>
                <span className={s.tileIcon}>
                  <Icon id={sp.icon} size={28} />
                </span>
                <span className={s.tileName}>{sp.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Frame>
  )
}

/* ---------- Xarajatlarning asosiy turlari ---------- */
const TYPES = [
  {
    id: 'doimiy',
    name: 'Doimiy xarajatlar',
    body: 'Ishlab chiqarish yoki savdo hajmiga bog‘liq bo‘lmagan sarflar.',
    example: 'Ijara haqi',
    line: 'M8,34 L212,34',
  },
  {
    id: 'ozgaruvchan',
    name: 'O‘zgaruvchan xarajatlar',
    body: 'Mahsulot miqdoriga qarab o‘zgaradigan chiqimlar.',
    example: 'Xomashyo va materiallar',
    line: 'M8,72 L212,12',
  },
  {
    id: 'shaxsiy',
    name: 'Shaxsiy xarajatlar',
    body: 'Kundalik hayotda qilinadigan sarflar.',
    example: 'Oziq-ovqat, kiyim-kechak, kommunal to‘lovlar',
    line: null,
  },
]

export function Types() {
  return (
    <Frame
      kicker="Kirish · Asosiy turlar"
      title="Xarajatlarning asosiy turlari"
      lead="Xarajat ishlab chiqarish hajmiga bog‘liqligi va maqsadiga ko‘ra uch asosiy turga bo‘linadi."
    >
      <ul className={s.cols3}>
        {TYPES.map((t, i) => (
          <li key={t.id} className={s.typeCard} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
            <div className={s.typeArt} aria-hidden="true">
              {t.line ? (
                <svg viewBox="0 0 220 84">
                  <path className={s.miniAxis} d="M8,6 V78 H214" />
                  <path className={s.miniLine} d={t.line} />
                </svg>
              ) : (
                <Icon id="basket" size={56} />
              )}
              {t.line && <span>xarajat / hajm</span>}
            </div>
            <h3 className={s.typeName}>{t.name}</h3>
            <p className={s.typeBody}>{t.body}</p>
            <p className={s.insight}>
              <b>Masalan</b>
              {t.example}
            </p>
          </li>
        ))}
      </ul>
    </Frame>
  )
}

/* ---------- Xarajatlar tushunchasi ---------- */
const LINKED = [
  { icon: 'box', name: 'Mahsulot ishlab chiqarish' },
  { icon: 'gear', name: 'Ishlarni bajarish' },
  { icon: 'cart', name: 'Xizmatlar ko‘rsatish' },
  { icon: 'shield', name: 'Faoliyatni ta’minlash' },
]

const DETERMINES = [
  { name: 'Tannarx', sub: 'mahsulot narxining asosi' },
  { name: 'Foyda', sub: 'daromad va xarajat farqi' },
  { name: 'Raqobatbardoshlik', sub: 'bozordagi mavqe' },
  { name: 'Moliyaviy barqarorlik', sub: 'uzoq muddatli rivojlanish' },
]

export function Concept() {
  return (
    <Frame
      kicker="Kirish · Tushuncha"
      title="Xarajatlar tushunchasi"
      lead="Xarajatlar — tashkilot faoliyatini amalga oshirish jarayonida sarflanadigan pul mablag‘lari va iqtisodiy resurslardir."
    >
      <div className={s.cols2}>
        <div className={s.stack}>
          <h3 className={s.label}>Xarajatlar nima bilan bog‘liq bo‘lishi mumkin</h3>
          <ul className={s.grid2}>
            {LINKED.map((d) => (
              <li key={d.name} className={s.tile}>
                <span className={s.tileIcon}>
                  <Icon id={d.icon} size={28} />
                </span>
                <span className={s.tileName}>{d.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.stack}>
          <p className={s.keyLine}>Xarajatlarni to‘g‘ri hisobga olish — moliyaviy boshqaruvning muhim qismi.</p>
          <h3 className={s.label}>Xarajatlar nimani belgilaydi</h3>
          <ol className={s.checkList}>
            {DETERMINES.map((t, i) => (
              <li key={t.name} style={{ animationDelay: `${0.15 + i * 0.09}s` }}>
                <span className={s.checkMark}>
                  <Icon id="check" size={18} />
                </span>
                <span>
                  <b>{t.name}</b> — {t.sub}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Frame>
  )
}
