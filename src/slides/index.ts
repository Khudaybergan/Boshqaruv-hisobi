/* Slaydlar reyestri: tartib, sarlavha va bo‘lim (mundarija va yuqori satr uchun).
   Asosiy oqim «PPT Boshqaruv hisobi» taqdimotining tartibini takrorlaydi;
   «Qo‘shimcha» bo‘limi — «Xarajat» taqdimotidan olingan zaxira slaydlar. */
import type { ComponentType } from 'react'
import type { SlideProps } from './Frame'
import { Concept, Cover, Types, WhatIs } from './Intro'
import { Behavior } from './Behavior'
import { MapSlide } from './MapSlide'
import { Labor, MaterialServices, TaxAssets, TransportTravel, UtilitiesRent } from './Categories'
import { Groups, Structure } from './Classify'
import { CostFlow, Methods } from './Costing'
import { Centers, Inventory } from './Manage'
import { Importance, Process, Summary, Thanks } from './Closing'

export interface SlideDef {
  id: string
  title: string
  section: string
  Component: ComponentType<SlideProps>
}

export const SLIDES: SlideDef[] = [
  { id: 'cover', title: '«Xarajatlar» toifalarining ta’rifi', section: 'Kirish', Component: Cover },
  { id: 'what', title: 'Xarajat nima?', section: 'Kirish', Component: WhatIs },
  { id: 'types', title: 'Xarajatlarning asosiy turlari', section: 'Kirish', Component: Types },
  { id: 'behavior', title: 'Hajm o‘zgarsa, xarajat qanday o‘zgaradi?', section: 'Kirish', Component: Behavior },
  { id: 'concept', title: 'Xarajatlar tushunchasi', section: 'Kirish', Component: Concept },
  { id: 'map', title: 'Xarajatlarni toifalarga ajratish', section: 'Toifalar', Component: MapSlide },
  { id: 'labor', title: 'Mehnatga haq to‘lash xarajatlari', section: 'Toifalar', Component: Labor },
  { id: 'material', title: 'Material va xizmatlar xarajatlari', section: 'Toifalar', Component: MaterialServices },
  { id: 'transport', title: 'Transport va xizmat safari xarajatlari', section: 'Toifalar', Component: TransportTravel },
  { id: 'utilities', title: 'Kommunal, aloqa va ijara xarajatlari', section: 'Toifalar', Component: UtilitiesRent },
  { id: 'tax', title: 'Soliq, majburiy to‘lovlar va asosiy vositalar', section: 'Toifalar', Component: TaxAssets },
  { id: 'structure', title: 'Amaliy misol: xarajatlar tarkibi', section: 'Amaliyot', Component: Structure },
  { id: 'process', title: 'Xarajatlarni boshqarish jarayoni', section: 'Boshqaruv', Component: Process },
  { id: 'importance', title: 'Xarajatlarni to‘g‘ri tasniflashning ahamiyati', section: 'Boshqaruv', Component: Importance },
  { id: 'summary', title: 'Xulosa', section: 'Yakun', Component: Summary },
  { id: 'thanks', title: 'E’tiboringiz uchun rahmat', section: 'Yakun', Component: Thanks },
  /* ---------- zaxira slaydlar: asosiy oqimga kirmaydi, faqat mundarijadan ochiladi ---------- */
  { id: 'x-groups', title: 'Ishlab chiqarish xarajatlarining guruhlanishi', section: 'Qo‘shimcha', Component: Groups },
  { id: 'x-flow', title: 'Mahsulot tannarxi qanday shakllanadi?', section: 'Qo‘shimcha', Component: CostFlow },
  { id: 'x-methods', title: 'Xarajatlarni hisobga olish usullari', section: 'Qo‘shimcha', Component: Methods },
  { id: 'x-centers', title: 'Xarajat uchun kim javob beradi?', section: 'Qo‘shimcha', Component: Centers },
  { id: 'x-inventory', title: 'FIFO, LIFO va o‘rtacha qiymat usullari', section: 'Qo‘shimcha', Component: Inventory },
]

/** Asosiy oqimdagi slaydlar soni («Rahmat» bilan tugaydi) */
export const MAIN_COUNT = SLIDES.findIndex((sl) => sl.section === 'Qo‘shimcha')
