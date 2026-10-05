/* Toifalar bo‘yicha slaydlar (asosiy taqdimotning 3–7-bo‘limlari).
   Ulushlar — «Amaliy misol: xarajatlar tarkibi» slaydidagi qiymatlar (jami 100 mln so‘m). */
import { Icon } from '../lib/icons'
import { Frame } from './Frame'
import s from './Slides.module.css'

interface Cat {
  icon: string
  name: string
  desc: string
  itemsTitle: string
  items: string[]
  /** Amaliy misoldagi qiymat, mln so‘m (= jami xarajatlardagi foiz) */
  share?: number
}

interface CatSlideProps {
  kicker: string
  title: string
  lead?: string
  cats: Cat[]
  note?: string
}

function CatSlide({ kicker, title, lead, cats, note }: CatSlideProps) {
  return (
    <Frame kicker={kicker} title={title} lead={lead}>
      <div className={s.catWrap}>
        <ul className={`${s.catGrid} ${cats.length === 1 ? s.catSolo : ''}`} style={{ gridTemplateColumns: `repeat(${cats.length}, 1fr)` }}>
          {cats.map((c, i) => (
            <li key={c.name} className={s.catCard} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
              <div className={s.catHead}>
                <span className={s.tileIcon}>
                  <Icon id={c.icon} size={28} />
                </span>
                <h3 className={s.catName}>{c.name}</h3>
              </div>
              <p className={s.catDesc}>{c.desc}</p>
              <div>
                <h4 className={s.label}>{c.itemsTitle}</h4>
                <ul className={s.catItems}>
                  {c.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
              {c.share !== undefined && (
                <p className={s.catShare}>
                  <span>Amaliy misolda</span>
                  <b>{c.share} mln so‘m</b>
                  <i aria-hidden="true">
                    <u style={{ width: `${c.share * 2}%` }} />
                  </i>
                  <em>{c.share} %</em>
                </p>
              )}
            </li>
          ))}
        </ul>
        {note && <p className={s.keyLine}>{note}</p>}
      </div>
    </Frame>
  )
}

export function Labor() {
  return (
    <CatSlide
      kicker="Toifalar · 1"
      title="Mehnatga haq to‘lash xarajatlari"
      lead="Xodimlarning mehnat faoliyati uchun amalga oshiriladigan to‘lovlar."
      cats={[
        {
          icon: 'users',
          name: 'Mehnat',
          desc: 'Asosiy ish haqi va qonunchilikda yoki ichki hujjatlarda nazarda tutilgan qo‘shimcha to‘lovlar.',
          itemsTitle: 'Misollar',
          items: ['Ish haqi', 'Ustamalar', 'Mukofotlar', 'Mehnatga haq to‘lash bilan bog‘liq boshqa to‘lovlar'],
          share: 50,
        },
      ]}
    />
  )
}

export function MaterialServices() {
  return (
    <CatSlide
      kicker="Toifalar · 2–3"
      title="Material va xizmatlar xarajatlari"
      cats={[
        {
          icon: 'box',
          name: 'Material xarajatlari',
          desc: 'Faoliyat uchun sarflanadigan moddiy resurslar.',
          itemsTitle: 'Tarkibi',
          items: ['Xomashyo', 'Kanselyariya buyumlari', 'Ehtiyot qismlar', 'Boshqa moddiy resurslar'],
          share: 15,
        },
        {
          icon: 'gear',
          name: 'Xizmatlar xarajatlari',
          desc: 'Tashqi tashkilotlar yoki mutaxassislardan olinadigan xizmatlar uchun to‘lovlar.',
          itemsTitle: 'Misollar',
          items: ['IT', 'Konsalting', 'Auditorlik', 'Ta’mirlash', 'Boshqa professional xizmatlar'],
          share: 10,
        },
      ]}
    />
  )
}

export function TransportTravel() {
  return (
    <CatSlide
      kicker="Toifalar · 4–5"
      title="Transport va xizmat safari xarajatlari"
      cats={[
        {
          icon: 'truck',
          name: 'Transport',
          desc: 'Transport vositalaridan foydalanish bilan bog‘liq xarajatlar.',
          itemsTitle: 'Tarkibi',
          items: ['Yoqilg‘i', 'Tashish', 'Transport xizmatlari'],
          share: 4,
        },
        {
          icon: 'briefcase',
          name: 'Xizmat safari',
          desc: 'Xodimlarni xizmat safariga yuborish bilan bog‘liq xarajatlar.',
          itemsTitle: 'Tarkibi',
          items: ['Yo‘l', 'Yashash', 'Kunlik', 'Boshqa xarajatlar'],
        },
      ]}
      note="Xarajatlar belgilangan tartib va tasdiqlovchi hujjatlar asosida hisobga olinadi."
    />
  )
}

export function UtilitiesRent() {
  return (
    <CatSlide
      kicker="Toifalar · 6–7"
      title="Kommunal, aloqa va ijara xarajatlari"
      cats={[
        {
          icon: 'bolt',
          name: 'Kommunal',
          desc: 'Kommunal xizmatlar uchun to‘lovlar.',
          itemsTitle: 'Tarkibi',
          items: ['Elektr energiyasi', 'Gaz', 'Suv', 'Issiqlik'],
          share: 5,
        },
        {
          icon: 'phone',
          name: 'Aloqa',
          desc: 'Aloqa xizmatlari uchun to‘lovlar.',
          itemsTitle: 'Tarkibi',
          items: ['Internet', 'Telefon', 'Boshqa aloqa xizmatlari'],
        },
        {
          icon: 'key',
          name: 'Ijara',
          desc: 'Mol-mulkni ijaraga olish xarajatlari.',
          itemsTitle: 'Ijara obyektlari',
          items: ['Bino va xona', 'Transport', 'Uskuna', 'Boshqa mol-mulk'],
          share: 8,
        },
      ]}
    />
  )
}

export function TaxAssets() {
  return (
    <CatSlide
      kicker="Toifalar · 8–9"
      title="Soliq, majburiy to‘lovlar va asosiy vositalar"
      cats={[
        {
          icon: 'percent',
          name: 'Soliq va majburiy to‘lovlar',
          desc: 'Qonunchilikka muvofiq amalga oshiriladigan to‘lovlar.',
          itemsTitle: 'Tarkibi',
          items: ['Soliqlar', 'Yig‘imlar', 'Boshqa majburiy to‘lovlar'],
        },
        {
          icon: 'factory',
          name: 'Asosiy vositalar xarajatlari',
          desc: 'Uzoq muddat foydalaniladigan aktivlarni sotib olish yoki yaratish bilan bog‘liq xarajatlar.',
          itemsTitle: 'Aktivlar',
          items: ['Bino', 'Uskuna', 'Texnika', 'Boshqa aktivlar'],
        },
      ]}
      note="Ushbu xarajatlarni alohida hisobga olish moliyaviy nazoratni yaxshilaydi."
    />
  )
}
