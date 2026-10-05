# Boshqaruv-hisobi

«Xarajatlar» toifalarining ta’rifi — Boshqaruv hisobi fani bo‘yicha interaktiv taqdimot
(Vite · React · TypeScript).

## Ishga tushirish

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # dist/index.html — yagona fayl, internetsiz ochiladi
```

## Boshqaruv

- `←` `→` yoki probel — slaydlar
- `F` — to‘liq ekran
- `M` — mundarija
- `Esc` — panelni yopish / xaritada yuqori darajaga

## Tuzilishi

- `src/deck/` — taqdimot qobig‘i (sahna, navigatsiya, mundarija)
- `src/slides/` — slaydlar; tartibi `src/slides/index.ts` da
- `src/map/` — interaktiv xarita va ma’lumot paneli
- `src/data/tree.ts` — xarita mazmuni
