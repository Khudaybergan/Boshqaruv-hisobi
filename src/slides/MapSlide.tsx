/* Markaziy slayd: xarajat toifalarining interaktiv xaritasi.
   Rejimlar: asosiy — o‘nta toifa; qo‘shimcha — boshqa belgilar bo‘yicha tasnif. */
import { useCallback, useState } from 'react'
import { TASNIF_ROOT, TOIFA_ROOT, type CostNode, type PanelBlock } from '../data/tree'
import { OrbitMap } from '../map/OrbitMap'
import { Panel, type PanelData } from '../map/Panel'
import { Seg } from './Frame'
import s from './Slides.module.css'

/** Tugun uchun panel: tayyor bloklar yoki tarkibidan generatsiya */
function panelFromNode(node: CostNode, path: CostNode[]): PanelData {
  const blocks: PanelBlock[] = []
  if (node.panel) blocks.push(...node.panel)
  if (node.children?.length) {
    blocks.push({ kind: 'list', title: 'Tarkibi', items: node.children.map((c) => c.name) })
  }
  return {
    key: node.id,
    name: node.name,
    tagline: node.desc,
    indexLabel: path.map((n) => n.label ?? n.name).join(' / '),
    blocks,
  }
}

const MODES = [
  { id: 'toifa', label: '10 toifa', root: TOIFA_ROOT, hint: 'Toifani bosing — ta’rifi va misollari ochiladi' },
  {
    id: 'tasnif',
    label: 'Qo‘shimcha tasnif',
    root: TASNIF_ROOT,
    hint: 'Guruhni bosing — ichiga kiradi · turni bosing — ta’rifi ochiladi',
  },
] as const

export function MapSlide() {
  const [mode, setMode] = useState<(typeof MODES)[number]['id']>('toifa')
  const [panel, setPanel] = useState<PanelData | null>(null)
  const active = MODES.find((m) => m.id === mode)!
  const openNode = useCallback((node: CostNode, path: CostNode[]) => setPanel(panelFromNode(node, path)), [])
  const closePanel = useCallback(() => setPanel(null), [])

  return (
    <section className={s.mapSlide}>
      <header className={s.mapHead}>
        <div>
          <p className={s.kicker}>Toifalar · Interaktiv xarita</p>
          <h2 className={s.mapTitle}>Xarajatlarni toifalarga ajratish</h2>
        </div>
        <div className={s.mapTools}>
          <span className={s.mapHint}>{active.hint}</span>
          <Seg label="Xarita rejimi" options={MODES} value={mode} onChange={setMode} />
        </div>
      </header>
      <OrbitMap key={mode} root={active.root} onOpenNode={openNode} panelOpen={panel !== null} />
      <Panel data={panel} onClose={closePanel} />
    </section>
  )
}
