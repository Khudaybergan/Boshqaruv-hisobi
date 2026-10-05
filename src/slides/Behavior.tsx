/* Xarajatlarning ishlab chiqarish hajmiga bog‘liq o‘zgarishi — interaktiv model.
   Misol: poyabzal fabrikasi (manba taqdimotidagi raqamlar: ijara 15 000 sh.b.,
   yuk mashinasi 5 000 sh.b. / 50 000 juft). b = 0,2 sh.b./juft — shartli qiymat. */
import { useRef, useState } from 'react'
import { fmt } from '../lib/format'
import { Frame, Seg } from './Frame'
import s from './Slides.module.css'

const A = 15_000 // doimiy element, sh.b.
const B = 0.2 // birlikka o‘zgaruvchan xarajat, sh.b./juft
const TRUCK = 5_000 // bitta yuk mashinasi ijarasi, sh.b.
const CAP = 50 // bitta mashina sig‘imi, ming juft
const X_MAX = 200 // ming juft
const Y_MAX = 60_000

type Kind = 'var' | 'fixed' | 'mixed' | 'step'

const KINDS: { id: Kind; label: string }[] = [
  { id: 'var', label: 'O‘zgaruvchan' },
  { id: 'fixed', label: 'Doimiy' },
  { id: 'mixed', label: 'Yarim o‘zgaruvchan' },
  { id: 'step', label: 'Yarim doimiy' },
]

const INFO: Record<Kind, { formula: string; desc: string; example: string; f: (x: number) => number }> = {
  var: {
    formula: 'y = bx',
    desc: 'Hajmga mutanosib o‘zgaradi; mahsulot birligiga hisoblaganda doimiy miqdor bo‘ladi.',
    example: 'Har juft poyabzal bir xil xomashyoni talab qiladi.',
    f: (x) => B * x * 1000,
  },
  fixed: {
    formula: 'y = a',
    desc: 'Hajm o‘zgarganda ham o‘zgarmaydi; birlikka to‘g‘ri keladigan doimiy xarajat esa kamayadi.',
    example: 'Yer uchastkasi ijarasi — 15 000 sh.b.',
    f: () => A,
  },
  mixed: {
    formula: 'y = a + bx',
    desc: 'Bir vaqtning o‘zida doimiy va o‘zgaruvchan komponentlarga ega.',
    example: 'Telefon: oylik abonent to‘lovi + so‘zlashuvlar uchun to‘lov.',
    f: (x) => A + B * x * 1000,
  },
  step: {
    formula: 'bosqichli',
    desc: 'Hajmning ma’lum darajasigacha doimiy, so‘ng bosqichma-bosqich ko‘payadi.',
    example: 'Har 50 000 juftga yana bitta yuk mashinasi — 5 000 sh.b.',
    f: (x) => TRUCK * Math.max(1, Math.ceil(x / CAP)),
  },
}

const CH = { w: 820, h: 470, l: 86, r: 26, t: 22, b: 58 }
const PW = CH.w - CH.l - CH.r
const PH = CH.h - CH.t - CH.b
const px = (x: number) => CH.l + (x / X_MAX) * PW
const py = (y: number) => CH.t + PH - (y / Y_MAX) * PH

function linePath(kind: Kind): string {
  const f = INFO[kind].f
  if (kind !== 'step') return `M${px(0)},${py(f(0))} L${px(X_MAX)},${py(f(X_MAX))}`
  // bosqichli chiziq: har bir relevant diapazonda gorizontal kesma
  let d = ''
  for (let x0 = 0; x0 < X_MAX; x0 += CAP) {
    const y = py(f(x0 + 1))
    d += `${d ? ' L' : 'M'}${px(x0)},${y} L${px(x0 + CAP)},${y}`
  }
  return d
}

export function Behavior() {
  const [kind, setKind] = useState<Kind>('var')
  const [x, setX] = useState(100)
  const svgRef = useRef<SVGSVGElement>(null)

  const info = INFO[kind]
  const y = info.f(x)
  const perUnit = x > 0 ? y / (x * 1000) : null

  // diagramma ustida sichqoncha — hajmni to‘g‘ridan-to‘g‘ri tanlash
  const onPointer = (e: React.PointerEvent) => {
    const box = svgRef.current?.getBoundingClientRect()
    if (!box) return
    const vx = ((e.clientX - box.left) / box.width) * CH.w
    const raw = ((vx - CH.l) / PW) * X_MAX
    setX(Math.max(0, Math.min(X_MAX, Math.round(raw / 5) * 5)))
  }

  return (
    <Frame
      kicker="Asosiy turlar · Interaktiv model"
      title="Hajm o‘zgarsa, xarajat qanday o‘zgaradi?"
      lead="Poyabzal fabrikasi misolida: hajmni o‘zgartiring va jami hamda birlikka xarajatni kuzating."
    >
      <div className={s.colsSim}>
        <svg
          ref={svgRef}
          className={`${s.chart} ${s.chartLive}`}
          viewBox={`0 0 ${CH.w} ${CH.h}`}
          role="img"
          aria-label={`${KINDS.find((k) => k.id === kind)!.label} xarajatlar grafigi: hajm ${fmt(x * 1000)} juft bo‘lganda jami xarajat ${fmt(y)} sh.b.`}
          onPointerMove={onPointer}
          onPointerDown={onPointer}
        >
          {[0, 15_000, 30_000, 45_000, 60_000].map((t) => (
            <g key={t}>
              <line className={t === 0 ? s.axis : s.gridLine} x1={CH.l} x2={CH.w - CH.r} y1={py(t)} y2={py(t)} />
              <text className={s.tickText} x={CH.l - 12} y={py(t) + 5} textAnchor="end">
                {fmt(t)}
              </text>
            </g>
          ))}
          {[0, 50, 100, 150, 200].map((t) => (
            <text key={t} className={s.tickText} x={px(t)} y={CH.h - CH.b + 26} textAnchor="middle">
              {t}
            </text>
          ))}
          <text className={s.axisTitle} x={CH.l} y={12}>
            Jami xarajat, sh.b.
          </text>
          <text className={s.axisTitle} x={CH.w - CH.r} y={CH.h - 8} textAnchor="end">
            Ishlab chiqarish hajmi, ming juft
          </text>

          {/* aralash xarajatda doimiy element alohida ko‘rsatiladi */}
          {kind === 'mixed' && (
            <>
              <line className={s.guide} x1={px(0)} x2={px(X_MAX)} y1={py(A)} y2={py(A)} />
              <text className={s.guideText} x={px(X_MAX) - 6} y={py(A) + 20} textAnchor="end">
                Doimiy element: a = {fmt(A)}
              </text>
              <text className={s.guideText} x={px(150)} y={py(A + B * 150_000) - 14} textAnchor="end">
                O‘zgaruvchan element: bx
              </text>
            </>
          )}
          {kind === 'step' &&
            [50, 100, 150].map((t) => (
              <line key={t} className={s.guide} x1={px(t)} x2={px(t)} y1={py(info.f(t))} y2={py(info.f(t + 1))} />
            ))}

          <path key={kind} className={s.series} d={linePath(kind)} />

          {/* joriy nuqta: o‘qlarga proyeksiya + qiymat */}
          <line className={s.cross} x1={px(x)} x2={px(x)} y1={py(y)} y2={py(0)} />
          <line className={s.cross} x1={px(0)} x2={px(x)} y1={py(y)} y2={py(y)} />
          <circle className={s.marker} cx={px(x)} cy={py(y)} r="7" />
        </svg>

        <aside className={s.simSide}>
          <Seg label="Xarajat turi" options={KINDS} value={kind} onChange={setKind} />
          <div className={s.formulaRow}>
            <strong>{info.formula}</strong>
            <span>{info.desc}</span>
          </div>
          <label className={s.sliderRow}>
            <span className={s.label}>Ishlab chiqarish hajmi</span>
            <input
              type="range"
              min={0}
              max={X_MAX}
              step={5}
              value={x}
              onChange={(e) => setX(Number(e.target.value))}
              aria-valuetext={`${fmt(x * 1000)} juft`}
            />
          </label>
          <dl className={s.kpis}>
            <div>
              <dt>Hajm</dt>
              <dd>
                {fmt(x * 1000)} <small>juft</small>
              </dd>
            </div>
            <div>
              <dt>Jami xarajat</dt>
              <dd>
                {fmt(y)} <small>sh.b.</small>
              </dd>
            </div>
            <div>
              <dt>Birlikka xarajat</dt>
              <dd>
                {perUnit === null ? '—' : fmt(perUnit, 3)} <small>sh.b./juft</small>
              </dd>
            </div>
          </dl>
          <p className={s.insight}>
            <b>Misol</b>
            {info.example}
          </p>
        </aside>
      </div>
    </Frame>
  )
}
