export type SampleLicense = 'public-domain' | 'cc0'

export interface SampleDoc {
  id: string
  title: string
  languageLabel: string
  text: string
  attribution: string
  license: SampleLicense
}

export const SAMPLES: SampleDoc[] = [
  {
    id: 'ave-maria-latin',
    title: 'Ave Maria (Latin prayer)',
    languageLabel: 'Latin',
    text: 'Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus.',
    attribution:
      'Traditional Latin prayer; text in the public domain.',
    license: 'public-domain',
  },
  {
    id: 'chaucer-opening',
    title: 'Chaucer — General Prologue (excerpt)',
    languageLabel: 'Middle English',
    text: 'Whan that Aprille with his shoures soote / The droghte of March hath perced to the roote, / And bathed every veyne in swich licour / Of which vertu engendred is the flour.',
    attribution:
      'Geoffrey Chaucer, The Canterbury Tales (late 14th c.); public domain.',
    license: 'public-domain',
  },
  {
    id: 'czech-hospodine',
    title: 'Hospodine, pomiluj ny (opening)',
    languageLabel: 'Old Czech / Church Slavonic tradition',
    text: 'Hospodine, pomiluj ny! / Jesu Kriste, pomiluj ny! / Ty, spase vseho mira, / spasiž ny i uslyšiž.',
    attribution:
      'Medieval Bohemian hymn tradition (Hospodine, pomiluj ny); public domain text.',
    license: 'public-domain',
  },
]

export function getSample(id: string): SampleDoc | undefined {
  return SAMPLES.find((s) => s.id === id)
}

export function allSamplesLicensed(): boolean {
  return SAMPLES.every(
    (s) =>
      (s.license === 'public-domain' || s.license === 'cc0') &&
      s.attribution.trim().length > 0,
  )
}
