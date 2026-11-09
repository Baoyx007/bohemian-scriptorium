import type {
  IlluminateResult,
  ResurrectResult,
  TargetLanguage,
} from '../providers/types'

export const DEMO_ILLUMINATE: Record<TargetLanguage, IlluminateResult> = {
  'old-czech': {
    mode: 'illuminate',
    archaicText:
      'Milostivý pane, prosím tě, abyťs milosrdně shlédl na tuto ubohou obec, ježto v temnostech zimy očekává světla jara.',
    targetLanguage: 'old-czech',
    honesty: {
      summary:
        'Demo fixture approximating late-medieval Czech flavor in modern Latin orthography; not a philological reconstruction.',
      examples: ['milostivý', 'abyťs', 'ježto'],
    },
    disclaimer: 'ai-reconstruction',
    source: 'demo',
  },
  latin: {
    mode: 'illuminate',
    archaicText:
      'Clementissime Domine, quaeso ut misericorditer respicias hanc pauperem civitatem, quae in tenebris hiemis lumen veris exspectat.',
    targetLanguage: 'latin',
    honesty: {
      summary:
        'Demo fixture in readable ecclesiastical Latin; classical vs medieval usages are blended for clarity.',
      examples: ['quaeso', 'respicias', 'exspectat'],
    },
    disclaimer: 'ai-reconstruction',
    source: 'demo',
  },
  'middle-english': {
    mode: 'illuminate',
    archaicText:
      'O gentil lord, I prey thee that thou looke with merci upon this pore citee, which in the derknesse of wynter abideth the light of springe.',
    targetLanguage: 'middle-english',
    honesty: {
      summary:
        'Demo fixture with Chaucer-adjacent morphology (-eth, pore, derknesse); spelling lightly normalized.',
      examples: ['preye/prey', 'derknesse', 'abideth'],
    },
    disclaimer: 'ai-reconstruction',
    source: 'demo',
  },
}

export const DEMO_RESURRECT: ResurrectResult = {
  mode: 'resurrect',
  modernSummary:
    'This Latin Ave Maria greets Mary as full of grace, notes the Lord is with her, and blesses her among women and the fruit of her womb, Jesus.',
  modernSummaryZh:
    '这段拉丁文《圣母颂》向玛利亚问安，称她满被圣宠，上主与她同在，并称她在妇女中是有福的，她腹中的果实耶稣也是有福的。',
  glosses: [
    {
      original: 'Ave Maria, gratia plena, Dominus tecum.',
      gloss: 'Hail Mary, full of grace, the Lord is with you.',
    },
    {
      original: 'Benedicta tu in mulieribus,',
      gloss: 'Blessed are you among women,',
    },
    {
      original: 'et benedictus fructus ventris tui, Iesus.',
      gloss: 'and blessed is the fruit of your womb, Jesus.',
    },
  ],
  honesty: {
    summary:
      'Demo fixture glosses a well-known public-domain prayer; wording is pedagogical, not a critical edition.',
  },
  disclaimer: 'ai-reconstruction',
  attribution: 'Traditional Ave Maria; public domain.',
  source: 'demo',
  demoNotice:
    'Demo Mode shows a precomputed sample. Paste your own xAI key in Settings for live reconstructions.',
}

export function demoIlluminate(lang: TargetLanguage): IlluminateResult {
  return structuredClone(DEMO_ILLUMINATE[lang])
}

export function demoResurrect(matchedSample: boolean): ResurrectResult {
  const result = structuredClone(DEMO_RESURRECT)
  if (!matchedSample) {
    result.demoNotice =
      'Demo Mode cannot call the model. Showing the built-in resurrected sample regardless of your paste.'
  }
  return result
}
