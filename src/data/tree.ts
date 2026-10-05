/* ============================================================
   Xarajatlar xaritasi (drill-down daraxti).
   Manba: «PPT Boshqaruv hisobi» va «Xarajat» taqdimotlari.
   ============================================================ */

export type PanelBlock =
  | { kind: 'text'; body: string }
  | { kind: 'list'; title: string; items: string[] }
  | { kind: 'example'; body: string }
  | { kind: 'formula'; body: string; note?: string }

export interface CostNode {
  id: string
  /** To‘liq nom */
  name: string
  /** Xaritadagi qisqa yozuv (bo‘lmasa — name) */
  label?: string
  /** Ikonka kaliti (lib/icons) */
  icon?: string
  /** Hover-kartochka va panel uchun 1–2 gap */
  desc: string
  /** Ildiz markazidagi mono-satr */
  coreMeta?: string
  /** Tayyor panel bloklari */
  panel?: PanelBlock[]
  children?: CostNode[]
}

/** Faqat ro‘yxatdan iborat barg (panelda «Tarkibi») */
const leafList = (id: string, name: string, desc: string, items: string[], title = 'Tarkibi'): CostNode => ({
  id,
  name,
  desc,
  panel: [{ kind: 'list', title, items }],
})

export const COST_ROOT: CostNode = {
  id: 'root',
  name: 'Xarajatlar',
  icon: 'coins',
  coreMeta: 'Boshqaruv hisobi',
  desc: 'Xarajatlar — tashkilot faoliyatini amalga oshirish jarayonida sarflanadigan pul mablag‘lari va iqtisodiy resurslardir.',
  children: [
    {
      id: 'toifa',
      name: 'Xarajat toifalari',
      label: 'Toifalar',
      icon: 'grid',
      desc: 'Xarajatlarni toifalarga ajratish ularni rejalashtirish, hisobga olish va nazorat qilishni osonlashtiradi.',
      children: [
        {
          id: 't-mehnat',
          name: 'Mehnatga haq to‘lash xarajatlari',
          label: 'Mehnat',
          desc: 'Xodimlarning mehnat faoliyati uchun amalga oshiriladigan to‘lovlar.',
          panel: [
            {
              kind: 'text',
              body: 'Asosiy ish haqi va qonunchilikda yoki ichki hujjatlarda nazarda tutilgan qo‘shimcha to‘lovlar.',
            },
            {
              kind: 'list',
              title: 'Misollar',
              items: ['Ish haqi', 'Ustamalar', 'Mukofotlar', 'Mehnatga haq to‘lash bilan bog‘liq boshqa to‘lovlar'],
            },
          ],
        },
        leafList(
          't-material',
          'Material xarajatlari',
          'Xomashyo, kanselyariya buyumlari, ehtiyot qismlar va boshqa moddiy resurslar.',
          ['Xomashyo', 'Kanselyariya buyumlari', 'Ehtiyot qismlar', 'Boshqa moddiy resurslar'],
        ),
        {
          ...leafList(
            't-xizmat',
            'Xizmatlar xarajatlari',
            'Tashqi tashkilotlar yoki mutaxassislardan olinadigan xizmatlar uchun to‘lovlar.',
            ['IT xizmatlari', 'Konsalting', 'Auditorlik', 'Ta’mirlash', 'Boshqa professional xizmatlar'],
            'Misollar',
          ),
          label: 'Xizmatlar',
        },
        {
          ...leafList(
            't-transport',
            'Transport xarajatlari',
            'Yoqilg‘i, tashish, transport xizmatlari va transport vositalaridan foydalanish bilan bog‘liq xarajatlar.',
            ['Yoqilg‘i', 'Tashish', 'Transport xizmatlari', 'Transport vositalaridan foydalanish'],
          ),
          label: 'Transport',
        },
        {
          id: 't-safar',
          name: 'Xizmat safari xarajatlari',
          label: 'Xizmat safari',
          desc: 'Xodimlarni xizmat safariga yuborish bilan bog‘liq yo‘l, yashash, kunlik va boshqa xarajatlar.',
          panel: [
            { kind: 'list', title: 'Tarkibi', items: ['Yo‘l xarajatlari', 'Yashash xarajatlari', 'Kunlik xarajatlar', 'Boshqa xarajatlar'] },
            { kind: 'text', body: 'Xarajatlar belgilangan tartib va tasdiqlovchi hujjatlar asosida hisobga olinadi.' },
          ],
        },
        {
          id: 't-kommunal',
          name: 'Kommunal va aloqa xarajatlari',
          label: 'Kommunal va aloqa',
          desc: 'Elektr energiyasi, gaz, suv va issiqlik hamda internet, telefon va boshqa aloqa xizmatlari uchun to‘lovlar.',
          panel: [
            { kind: 'list', title: 'Kommunal', items: ['Elektr energiyasi', 'Gaz', 'Suv', 'Issiqlik'] },
            { kind: 'list', title: 'Aloqa', items: ['Internet', 'Telefon', 'Boshqa aloqa xizmatlari'] },
          ],
        },
        {
          ...leafList(
            't-ijara',
            'Ijara xarajatlari',
            'Bino, xona, transport, uskuna va boshqa mol-mulkni ijaraga olish xarajatlari.',
            ['Bino va xonalar', 'Transport', 'Uskunalar', 'Boshqa mol-mulk'],
            'Ijara obyektlari',
          ),
          label: 'Ijara',
        },
        {
          ...leafList(
            't-soliq',
            'Soliq va majburiy to‘lovlar',
            'Qonunchilikka muvofiq amalga oshiriladigan soliqlar, yig‘imlar va boshqa majburiy to‘lovlar.',
            ['Soliqlar', 'Yig‘imlar', 'Boshqa majburiy to‘lovlar'],
          ),
          label: 'Soliq va majburiy',
        },
        {
          id: 't-av',
          name: 'Asosiy vositalar xarajatlari',
          label: 'Asosiy vositalar',
          desc: 'Bino, uskuna, texnika va boshqa uzoq muddat foydalaniladigan aktivlarni sotib olish yoki yaratish bilan bog‘liq xarajatlar.',
          panel: [
            { kind: 'list', title: 'Aktivlar', items: ['Binolar', 'Uskunalar', 'Texnika', 'Uzoq muddat foydalaniladigan boshqa aktivlar'] },
            { kind: 'text', body: 'Ushbu xarajatlarni alohida hisobga olish moliyaviy nazoratni yaxshilaydi.' },
          ],
        },
        {
          id: 't-boshqa',
          name: 'Boshqa xarajatlar',
          label: 'Boshqa',
          desc: 'Yuqoridagi toifalarga kirmaydigan boshqa xarajatlar.',
        },
      ],
    },
    {
      id: 'ich',
      name: 'Ishlab chiqarish xarajatlari',
      label: 'Ishlab chiqarish',
      icon: 'factory',
      desc: 'Bevosita mahsulot (ish, xizmat)larni ishlab chiqarishga ketgan, shuningdek, ularning tannarxini tashkil etuvchi xarajatlar.',
      children: [
        leafList('i-xom', 'Xomashyo va materiallar', 'Mahsulot tayyorlanadigan moddiy asos.', [
          'Asosiy xomashyo',
          'Yordamchi materiallar',
          'Yarim tayyor mahsulotlar',
        ]),
        leafList('i-ishchi', 'Ishchi kuchi', 'Ishlab chiqarish xususiyatiga ega bo‘lgan mehnatga haq to‘lash xarajatlari.', [
          'Ish haqi',
          'Qo‘shimcha haqlar',
          'Ijtimoiy to‘lovlar',
        ]),
        leafList('i-energiya', 'Energiya va yoqilg‘i', 'Ishlab chiqarish jarayonida sarflanadigan energiya resurslari.', [
          'Elektr energiyasi',
          'Tabiiy gaz',
          'Yoqilg‘i materiallari',
        ]),
        leafList(
          'i-amort',
          'Amortizatsiya',
          'Asosiy fondlar va ishlab chiqarish ahamiyatiga ega bo‘lgan nomoddiy aktivlar amortizatsiyasi.',
          ['Bino-inshootlar', 'Uskunalar', 'Ofis texnikasi'],
        ),
        {
          id: 'i-umum',
          name: 'Umumishlab chiqarish xarajatlari',
          label: 'Umumishlab chiqarish',
          desc: 'Asosiy va yordamchi ishlab chiqarish sexlarini boshqarish va tashkil etishga taalluqli hamda ularga xizmat ko‘rsatuvchi bo‘linmalarning xarajatlari (egri ishlab chiqarish xarajatlari).',
          panel: [
            {
              kind: 'text',
              body: 'Ta’minot, yong‘inga qarshi kurashish, isitish, qo‘riqlash bo‘limlari asosiy va yordamchi sexlarga xizmat ko‘rsatadi. Ularning xarajatlari alohida hisobga olinadi va oy oxirida hisob siyosatida belgilangan tartibda taqsimlanadi.',
            },
            {
              kind: 'list',
              title: 'Tarkibi',
              items: [
                'Mashina va uskunalarni asrash va ishlatish xarajatlari',
                'Asosiy vositalar va nomoddiy aktivlarning amortizatsiya ajratmalari',
                'Asosiy vositalarni ta’mirlash xarajatlari',
                'Ishlab chiqarishdagi mulklarni sug‘urtalash',
                'Isitish, yoritish va ishlab chiqarish binolarini asrash',
                'Bino, mashina va uskunalarning ijara to‘lovlari',
                'Xizmat ko‘rsatishda band bo‘lgan xodimlarning ish haqi',
                'Ishlab chiqarish tusidagi boshqa xarajatlar',
              ],
            },
          ],
        },
        {
          id: 'i-yordamchi',
          name: 'Yordamchi ishlab chiqarish xarajatlari',
          label: 'Yordamchi ishlab chiqarish',
          desc: 'Asosiy ishlab chiqarish sexlari uchun yordamchi va xizmat ko‘rsatuvchi bo‘linmalarning xarajatlari.',
          panel: [
            {
              kind: 'text',
              body: 'Yordamchi sexlar — ta’mirlash sexi, mexanika sexi, bug‘ berish sexi va boshqalar. Ularning xarajatlari alohida hisobga olinadi va har oyning oxirida asosiy ishlab chiqarish xarajatlari tarkibiga kiritiladi.',
            },
            {
              kind: 'list',
              title: 'Yordamchi ishlab chiqarishlar',
              items: [
                'Energiya, elektr energiyasi, gaz bilan ta’minlash',
                'Transport xizmatini ko‘rsatish',
                'Asosiy vositalarni ta’mirlash',
                'Instrumentlar va qurilish detallarini tayyorlash',
                'Yog‘och tayyorlash va arralash',
                'Qishloq xo‘jaligi mahsulotlarini tuzlash va konservalash',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'noich',
      name: 'Noishlab chiqarish xarajatlari',
      label: 'Noishlab chiqarish',
      icon: 'office',
      desc: 'Mahsulot ishlab chiqarish bilan bevosita bog‘liq bo‘lmagan ma’muriy, marketing va boshqa xarajatlar.',
      children: [
        leafList('n-mamuriy', 'Ma’muriy xarajatlar', 'Korxonani boshqarish bilan bog‘liq xarajatlar.', [
          'Ma’muriyat ish haqi',
          'Ijara to‘lovlari',
          'Kanselyariya',
          'Kommunal xizmatlar',
        ]),
        leafList('n-marketing', 'Marketing xarajatlari', 'Mahsulotni bozorga olib chiqish va sotish bilan bog‘liq xarajatlar.', [
          'Reklama',
          'PR va brending',
          'Transportirovka',
          'Qadoqlash',
        ]),
        leafList('n-boshqa', 'Boshqa xarajatlar', 'Ma’muriy va marketing xarajatlariga kirmaydigan xarajatlar.', [
          'Bank komissiyalari',
          'Yuridik xarajatlar',
          'Xizmat safari',
        ]),
      ],
    },
    {
      id: 'togri',
      name: 'To‘g‘ri va egri xarajatlar',
      label: 'To‘g‘ri va egri',
      icon: 'split',
      desc: 'Tannarxga o‘tkazish usuliga qarab: mahsulotga bevosita tegishli yoki taqsimlash yo‘li bilan qo‘shiladigan xarajatlar.',
      children: [
        {
          id: 'te-togri',
          name: 'To‘g‘ri (bevosita) xarajatlar',
          label: 'To‘g‘ri xarajatlar',
          desc: 'Mahsulotga to‘g‘ridan-to‘g‘ri tegishli va oson hisoblanadigan xarajatlar.',
          panel: [
            {
              kind: 'text',
              body: 'Mahsulotning ayrim turlari tannarxiga to‘g‘ridan-to‘g‘ri, ya’ni bevosita o‘tkaziladigan xarajatlardir.',
            },
            { kind: 'list', title: 'Misollar', items: ['Xomashyo', 'Asosiy ishchilar ish haqi', 'Maxsus energiya'] },
          ],
        },
        {
          id: 'te-egri',
          name: 'Egri (bilvosita) xarajatlar',
          label: 'Egri xarajatlar',
          desc: 'Bir mahsulotga aniq bog‘lab bo‘lmaydigan, taqsimlash kerak bo‘lgan xarajatlar.',
          panel: [
            {
              kind: 'text',
              body: 'Hisobot oyi davomida yig‘ib-taqsimlovchi schyotlarda hisobga olinadi va tannarxni kalkulyatsiya qilishda mahsulotning ayrim turlari tannarxiga biron-bir ko‘rsatkichga mutanosib ravishda taqsimlash yo‘li bilan qo‘shiladi.',
            },
            { kind: 'list', title: 'Misollar', items: ['Idora energiyasi', 'Sex boshqaruvi', 'Umumiy ta’mirlash'] },
          ],
        },
      ],
    },
    {
      id: 'doimiy',
      name: 'Doimiy va o‘zgaruvchan xarajatlar',
      label: 'Doimiy va o‘zgaruvchan',
      icon: 'trend',
      desc: 'Ishlab chiqarish hajmiga qarab: hajm o‘zgarganda xarajat qanday o‘zgarishi bo‘yicha tasnif.',
      children: [
        {
          id: 'd-ozg',
          name: 'O‘zgaruvchan xarajatlar',
          label: 'O‘zgaruvchan',
          desc: 'Ishlab chiqarish hajmining o‘zgarishiga mutanosib o‘zgaradi; mahsulot birligiga hisoblaganda doimiy miqdor bo‘ladi.',
          panel: [
            { kind: 'formula', body: 'y = bx', note: 'b — mahsulot birligiga o‘zgaruvchan xarajat, x — faollik darajasi' },
            { kind: 'list', title: 'Misollar', items: ['Xomashyo', 'Energiya', 'Soatbay to‘lov', 'Qadoqlash materiallari'] },
            {
              kind: 'example',
              body: 'Kompaniya charm poyabzal ishlab chiqaradi, har juft poyabzal bir xil xomashyoni talab qiladi, shu sababli xarajatlarning bu turi ishlab chiqarilgan miqdorga mutanosib o‘zgaradi.',
            },
          ],
        },
        {
          id: 'd-doimiy',
          name: 'Doimiy xarajatlar',
          label: 'Doimiy',
          desc: 'Faollik darajasi o‘zgarganda ham o‘zgarmaydi; mahsulot birligiga hisoblangan doimiy xarajat esa o‘zgaradi.',
          panel: [
            { kind: 'formula', body: 'y = a', note: 'a — hajmga bog‘liq bo‘lmagan doimiy element' },
            { kind: 'list', title: 'Misollar', items: ['Ijara', 'Amortizatsiya', 'Ma’muriy ish haqi', 'Litsenziyalar'] },
            {
              kind: 'example',
              body: 'Kompaniya poyabzal fabrikasi uchun yer uchastkasini ijaraga oldi va 15 000 sh.b. ijara haqi to‘laydi. Ushbu xarajat ishlab chiqarish hajmiga bog‘liq emas.',
            },
          ],
        },
        {
          id: 'd-yarimozg',
          name: 'Yarim o‘zgaruvchan (aralash) xarajatlar',
          label: 'Yarim o‘zgaruvchan',
          desc: 'Bir vaqtning o‘zida o‘zgaruvchan va doimiy komponentlarga ega xarajatlar.',
          panel: [
            { kind: 'formula', body: 'y = a + bx', note: 'a — doimiy element, bx — o‘zgaruvchan element' },
            {
              kind: 'text',
              body: 'Xarajatlarning bir qismi ishlab chiqarish hajmi o‘zgarganda o‘zgaradi, bir qismi esa davr davomida o‘zgarmay qoladi.',
            },
            {
              kind: 'example',
              body: 'Telefon uchun oylik abonent to‘lovi — doimiy qism; shaharlararo va xalqaro so‘zlashuvlar soni va vaqtiga bog‘liq to‘lov — o‘zgaruvchan qism.',
            },
          ],
        },
        {
          id: 'd-yarimdoimiy',
          name: 'Yarim doimiy xarajatlar',
          label: 'Yarim doimiy',
          desc: 'Hajmning ma’lum darajasigacha doimiy bo‘ladi, so‘ng bosqichma-bosqich ko‘payadi.',
          panel: [
            {
              kind: 'text',
              body: 'Ishlab chiqarish hajmiga bog‘liq, lekin unga mutanosib ravishda o‘zgarmaydi: ma’lum darajagacha doimiy turadi, hajm oshganda ko‘payadi va yana ma’lum darajagacha o‘zgarmay turadi.',
            },
            {
              kind: 'example',
              body: 'Har bir yuk mashinasi 5 000 sh.b.ga ijaraga olinadi va oyiga 50 000 juft poyabzal tashiydi. Hajm 50 000 juftdan oshganda yana bir mashina ijaraga olinadi va ijara to‘lovi ko‘payadi.',
            },
          ],
        },
      ],
    },
    {
      id: 'moliya',
      name: 'Moliyaviy xarajatlar',
      label: 'Moliyaviy',
      icon: 'bank',
      desc: 'Moliyalashtirish faoliyati bilan bog‘liq xarajatlar.',
      children: [
        { id: 'm-kredit', name: 'Kredit foizlari', desc: 'Bank qarzlari uchun to‘lovlar.' },
        { id: 'm-valyuta', name: 'Valyuta yo‘qotishlari', desc: 'Kurs farqidan ko‘rilgan zarar.' },
        { id: 'm-qq', name: 'Qimmatli qog‘ozlar', desc: 'Aksiyalar va obligatsiyalar bilan bog‘liq xarajatlar.' },
        { id: 'm-jarima', name: 'Moliyaviy jarimalar', desc: 'Kechikish penyasi.' },
      ],
    },
    {
      id: 'soliq',
      name: 'Soliq va majburiy to‘lovlar',
      label: 'Soliqlar',
      icon: 'percent',
      desc: 'Qonunchilikka muvofiq amalga oshiriladigan soliqlar, yig‘imlar va boshqa majburiy to‘lovlar.',
      children: [
        { id: 's-qqs', name: 'QQS', desc: 'Qo‘shilgan qiymat solig‘i.' },
        { id: 's-fond', name: 'Ijtimoiy fondlar', desc: 'Ishchilar uchun to‘lovlar.' },
        { id: 's-foyda', name: 'Foyda solig‘i', desc: 'Daromad solig‘i.' },
        { id: 's-yigim', name: 'Yig‘imlar', desc: 'Litsenziya va ruxsatnomalar uchun to‘lovlar.' },
      ],
    },
    {
      id: 'qaror',
      name: 'Qaror qabul qilish uchun xarajatlar',
      label: 'Qaror uchun',
      icon: 'scale',
      desc: 'Boshqaruv qarorlarini qabul qilishda hisobga olinadigan yoki olinmaydigan xarajatlar.',
      children: [
        {
          id: 'q-muqobil',
          name: 'Muqobil xarajatlar',
          label: 'Muqobil',
          desc: 'Foydalanilmagan imkoniyatlar: bir harakatni tanlash boshqasini istisno qilgandagi boy berilgan foyda.',
          panel: [
            {
              kind: 'text',
              body: 'Harakatni tanlash chog‘ida boshqa variantlardan voz kechish natijasida yo‘qotilgan yoki qurbon qilingan potensial naf sifatida aniqlanadi.',
            },
            {
              kind: 'example',
              body: 'Sport sumkalari ishlab chiqaradigan korxona chemodan tayyorlashga buyurtma oldi. Buyurtma qabul qilinsa, odatdagi miqdorda sport sumkalari ishlab chiqarishga quvvat yetmaydi. Shu sababli boy berilgan foyda — buyurtmaning muqobil xarajati.',
            },
            {
              kind: 'example',
              body: 'Kompaniya pulni qimmatli qog‘ozlarga investitsiyalash yoki asbob-uskunalar sotib olishdan birini tanlashi kerak. Tanlanmagan variantdan olinishi mumkin bo‘lgan daromad muqobil xarajat bo‘ladi.',
            },
          ],
        },
        {
          id: 'q-qaytmas',
          name: 'Qaytmaydigan xarajatlar',
          label: 'Qaytmaydigan',
          desc: 'Muqaddam qilingan xarajatlar: hozirgi yoki keyingi hech qanday harakat ularni o‘zgartirmaydi.',
          panel: [
            {
              kind: 'text',
              body: 'Ular kelgusidagi xarajatlarga ta’sir qilmaydi, shu sababli kelgusida qaror qabul qilish chog‘ida hisobga olinmaydi. Masalan, uskunalarning boshlang‘ich qiymati va moddiy zaxiralarni hosil qilishga sarflangan xarajatlar.',
            },
            {
              kind: 'example',
              body: 'Kompaniya maxsus maqsadga mo‘ljallangan uskuna uchun 10 000 sh.b. to‘ladi. Xarajat sarflab bo‘lindi, shuning uchun uskunaga sarflangan investitsiya qaytmaydigan xarajatdir.',
            },
          ],
        },
        {
          id: 'q-relevant',
          name: 'Relevant xarajatlar',
          label: 'Relevant',
          desc: 'Qaror qabul qilinishi natijasida o‘zgaradigan kelgusi xarajatlar va tushumlar.',
          panel: [
            {
              kind: 'example',
              body: 'O‘z avtomobili yoki jamoat transportida sayohat qilishni tanlashda benzin xarajatlari relevant, chunki ular qanday qaror qabul qilinishiga bog‘liq.',
            },
          ],
        },
        {
          id: 'q-norelevant',
          name: 'Norelevant xarajatlar',
          label: 'Norelevant',
          desc: 'Qabul qilinayotgan qaror ta’sir qilmaydigan (ahamiyatsiz) xarajatlar va tushumlar.',
          panel: [
            {
              kind: 'example',
              body: 'Avtomobil solig‘i va sug‘urtasi qaror qabul qilish chog‘ida hisobga olinmaydi, chunki bu xarajatlar qanday qaror qabul qilinsa ham o‘zgarmaydi.',
            },
          ],
        },
        {
          id: 'q-bartaraf',
          name: 'Bartaraf etiladigan xarajatlar',
          label: 'Bartaraf etiladigan',
          desc: 'Sarf qilmasa ham bo‘ladigan, biror muqobil variant qabul qilinsa tejalishi mumkin bo‘lgan xarajatlar.',
          panel: [
            { kind: 'text', body: 'Qaror qabul qilish uchun faqat bartaraf etilishi mumkin bo‘lgan xarajatlar muhimdir.' },
          ],
        },
        {
          id: 'q-bartarafemas',
          name: 'Bartaraf etilmaydigan xarajatlar',
          label: 'Bartaraf etilmaydigan',
          desc: 'Har qanday holatda ham sarf qilinadigan xarajatlar.',
        },
      ],
    },
  ],
}

/* ---------- xarita rejimlari ----------
   Asosiy taqdimot — o‘nta toifa; qolgan guruhlar — qo‘shimcha tasnif. */
const TOIFA_ICONS: Record<string, string> = {
  't-mehnat': 'users',
  't-material': 'box',
  't-xizmat': 'gear',
  't-transport': 'truck',
  't-safar': 'briefcase',
  't-kommunal': 'bolt',
  't-ijara': 'key',
  't-soliq': 'percent',
  't-av': 'factory',
  't-boshqa': 'dots',
}
const [TOIFA_GROUP, ...OTHER_GROUPS] = COST_ROOT.children ?? []

/** Asosiy xarita: markazda «Xarajatlar», atrofida o‘nta toifa */
export const TOIFA_ROOT: CostNode = {
  ...COST_ROOT,
  coreMeta: '10 toifa',
  children: (TOIFA_GROUP.children ?? []).map((n) => ({
    ...n,
    label: n.id === 't-material' ? 'Material' : n.label,
    icon: TOIFA_ICONS[n.id],
  })),
}

/** Qo‘shimcha xarita: boshqa belgilar bo‘yicha tasnif guruhlari */
export const TASNIF_ROOT: CostNode = {
  ...COST_ROOT,
  id: 'root-tasnif',
  coreMeta: 'Qo‘shimcha tasnif',
  children: OTHER_GROUPS,
}
