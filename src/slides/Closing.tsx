/* Yakun: boshqarish jarayoni, xulosa va minnatdorchilik */
import { useEffect, useState } from 'react'
import { Icon } from '../lib/icons'
import { Frame } from './Frame'
import s from './Slides.module.css'

/* ---------- xarajatlarni boshqarish jarayoni ---------- */
const STEPS = ['Rejalashtirish', 'Byudjetlashtirish', 'Sarflash', 'Nazorat', 'Tahlil']

const BENEFITS = [
  'Moliyaviy resurslardan samarali foydalanish',
  'Byudjetni aniq rejalashtirish',
  'Xarajatlar ustidan nazoratni kuchaytirish',
  'Moliyaviy hisobotlarning aniqligini oshirish',
  'Xarajatlar samaradorligini tahlil qilish va boshqaruv qarorlarini yaxshilash',
]

export function Process() {
  const [step, setStep] = useState(0)
  const [auto, setAuto] = useState(true)

  // bosqichlar navbat bilan yonadi; foydalanuvchi bosgach — to‘xtaydi
  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setStep((p) => (p + 1) % STEPS.length), 1700)
    return () => window.clearInterval(t)
  }, [auto])

  return (
    <Frame
      kicker="Boshqaruv · Jarayon"
      title="Xarajatlarni boshqarish jarayoni"
      lead="Xarajatlarni boshqarish — uzluksiz takrorlanadigan besh bosqichli jarayon."
    >
      <div className={s.process}>
        <ol className={s.steps}>
          {STEPS.map((name, i) => (
            <li key={name} className={s.stepItem}>
              <button
                className={`${s.step} ${i === step ? s.stepOn : ''} ${i < step ? s.stepDone : ''}`}
                aria-current={i === step ? 'step' : undefined}
                onClick={() => {
                  setAuto(false)
                  setStep(i)
                }}
              >
                <span className={s.stepNo}>{i + 1}</span>
                <span className={s.stepName}>{name}</span>
              </button>
              {i < STEPS.length - 1 && <Icon id="right" size={22} className={s.stepArrow} />}
            </li>
          ))}
        </ol>
        <p className={s.keyLine}>
          Maqsad — mablag‘lardan oqilona foydalanish, ortiqcha xarajatlarni aniqlash va moliyaviy intizomni ta’minlash.
        </p>
      </div>
    </Frame>
  )
}

export function Importance() {
  return (
    <Frame
      kicker="Boshqaruv · Ahamiyati"
      title="Xarajatlarni to‘g‘ri tasniflashning ahamiyati"
      lead="To‘g‘ri tasnif — rejalashtirish, nazorat va boshqaruv qarorlarining asosi."
    >
      <ul className={s.benefits}>
        {BENEFITS.map((b, i) => (
          <li key={b} style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
            <span className={s.benefitNo}>{i + 1}</span>
            {b}
          </li>
        ))}
      </ul>
    </Frame>
  )
}

/* ---------- xulosa ---------- */
const CONCLUSIONS = [
  'Xarajatlar — tashkilot faoliyatini ta’minlash uchun sarflanadigan moliyaviy va iqtisodiy resurslardir.',
  'Xarajatlarni toifalarga ajratish ularni rejalashtirish, hisobga olish va nazorat qilishni osonlashtiradi.',
  'Samarali xarajatlarni boshqarish tashkilotning moliyaviy barqarorligi va resurslardan oqilona foydalanishiga xizmat qiladi.',
]

const PRINCIPLE = ['Rejalashtirish', 'Xarajat', 'Nazorat', 'Tahlil', 'Samaradorlik']

export function Summary() {
  return (
    <Frame kicker="Yakun" title="Xulosa">
      <div className={s.summary}>
        <ol className={s.conclusions}>
          {CONCLUSIONS.map((c, i) => (
            <li key={i} style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
              <span className={s.conNo}>{i + 1}</span>
              <p>{c}</p>
            </li>
          ))}
        </ol>
        <div className={s.principle}>
          <h3 className={s.label}>Asosiy tamoyil</h3>
          <ol className={s.chain}>
            {PRINCIPLE.map((p, i) => (
              <li key={p}>
                <span>{p}</span>
                {i < PRINCIPLE.length - 1 && <Icon id="right" size={20} className={s.stepArrow} />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Frame>
  )
}

export function Thanks() {
  return (
    <section className={s.thanks}>
      <p className={s.kicker}>Boshqaruv hisobi</p>
      <h2 className={s.thanksTitle}>E’tiboringiz uchun rahmat</h2>
      <p className={s.thanksQuote}>Xarajatni bilish — biznesni bilish demak.</p>
      <p className={s.thanksMeta}>Murodullayev Mubasher Holiqul o‘g‘li · Talaba ID: 471261200257</p>
    </section>
  )
}
