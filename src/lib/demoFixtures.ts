import type {
  IlluminateResult,
  ResurrectResult,
  TargetLanguage,
} from '../providers/types'

export interface IlluminateDemoSample {
  id: string
  title: string
  input: string
  inputLocale: 'en' | 'zh'
  targetLanguage: TargetLanguage
  result: IlluminateResult
}

export interface ResurrectDemoSample {
  id: string
  title: string
  /** substring / regex source to match pasted text */
  match: RegExp
  result: ResurrectResult
}

function ill(
  archaicText: string,
  targetLanguage: TargetLanguage,
  summary: string,
  examples: string[],
): IlluminateResult {
  return {
    mode: 'illuminate',
    archaicText,
    targetLanguage,
    honesty: { summary, examples },
    disclaimer: 'ai-reconstruction',
    source: 'demo',
  }
}

export const ILLUMINATE_DEMOS: IlluminateDemoSample[] = [
  {
    id: 'en-mercy-latin',
    title: 'English → Latin (town in winter)',
    input:
      'Kind lord, please look with mercy on this poor town that waits in winter darkness for the light of spring.',
    inputLocale: 'en',
    targetLanguage: 'latin',
    result: ill(
      'Clementissime Domine, quaeso ut misericorditer respicias hanc pauperem civitatem, quae in tenebris hiemis lumen veris exspectat.',
      'latin',
      'Demo fixture in readable ecclesiastical Latin; classical and medieval usages are blended for clarity.',
      ['quaeso', 'respicias', 'exspectat'],
    ),
  },
  {
    id: 'en-mercy-old-czech',
    title: 'English → Old Czech (town in winter)',
    input:
      'Kind lord, please look with mercy on this poor town that waits in winter darkness for the light of spring.',
    inputLocale: 'en',
    targetLanguage: 'old-czech',
    result: ill(
      'Milostivý pane, prosím tě, abyťs milosrdně shlédl na tuto ubohou obec, ježto v temnostech zimy očekává světla jara.',
      'old-czech',
      'Demo fixture approximating late-medieval Czech flavor in modern Latin orthography; not a philological reconstruction.',
      ['milostivý', 'abyťs', 'ježto'],
    ),
  },
  {
    id: 'en-mercy-me',
    title: 'English → Middle English (town in winter)',
    input:
      'Kind lord, please look with mercy on this poor town that waits in winter darkness for the light of spring.',
    inputLocale: 'en',
    targetLanguage: 'middle-english',
    result: ill(
      'O gentil lord, I prey thee that thou looke with merci upon this pore citee, which in the derknesse of wynter abideth the light of springe.',
      'middle-english',
      'Demo fixture with Chaucer-adjacent morphology (-eth, pore, derknesse); spelling lightly normalized.',
      ['prey', 'derknesse', 'abideth'],
    ),
  },
  {
    id: 'zh-spring-old-czech',
    title: 'Chinese → Old Czech (spring mercy)',
    input: '春天来了，请怀着慈悲照看这座贫苦的小镇，它在冬夜的黑暗里等候春光。',
    inputLocale: 'zh',
    targetLanguage: 'old-czech',
    result: ill(
      'Jaro jest přišlo; milostí měj k této chudé osadě, kteráž v temnotách zimní noci světla jarního očekává.',
      'old-czech',
      'Demo fixture from modern Chinese sense into Old-Czech-flavored prose; morphology is illustrative, not attested from a single manuscript.',
      ['jest přišlo', 'kteráž', 'jarního'],
    ),
  },
  {
    id: 'zh-spring-me',
    title: 'Chinese → Middle English (spring mercy)',
    input: '春天来了，请怀着慈悲照看这座贫苦的小镇，它在冬夜的黑暗里等候春光。',
    inputLocale: 'zh',
    targetLanguage: 'middle-english',
    result: ill(
      'Springe is comen; bere thou merci to this pore litel toun, that in the derke wynter nyght abideth the light of springe.',
      'middle-english',
      'Demo fixture rendering Chinese meaning into Middle English tone; -eth verbs and pore/derke spelling are pedagogical.',
      ['comen', 'pore', 'abideth'],
    ),
  },
  {
    id: 'zh-spring-latin',
    title: 'Chinese → Latin (spring mercy)',
    input: '春天来了，请怀着慈悲照看这座贫苦的小镇，它在冬夜的黑暗里等候春光。',
    inputLocale: 'zh',
    targetLanguage: 'latin',
    result: ill(
      'Ver advenit; quaeso ut misericordia foveas hanc pauperem villam, quae in nocte hiemali lumen veris exspectat.',
      'latin',
      'Demo fixture from modern Chinese into compact Latin; word order leans medieval sermon style.',
      ['advenit', 'foveas', 'villam'],
    ),
  },
]

/** @deprecated kept for P5-style language-keyed lookups */
export const DEMO_ILLUMINATE: Record<TargetLanguage, IlluminateResult> = {
  latin: ILLUMINATE_DEMOS.find((d) => d.id === 'en-mercy-latin')!.result,
  'old-czech': ILLUMINATE_DEMOS.find((d) => d.id === 'en-mercy-old-czech')!
    .result,
  'middle-english': ILLUMINATE_DEMOS.find((d) => d.id === 'en-mercy-me')!
    .result,
}

export const RESURRECT_DEMOS: ResurrectDemoSample[] = [
  {
    id: 'ave-maria-latin',
    title: 'Ave Maria',
    match: /ave\s+maria/i,
    result: {
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
    },
  },
  {
    id: 'chaucer-opening',
    title: 'Chaucer April',
    match: /aprille|shoures soote/i,
    result: {
      mode: 'resurrect',
      modernSummary:
        'Chaucer’s opening says that when April’s sweet showers pierce March’s drought to the root and bathe every vein in that liquor whose power brings forth the flower, the world awakens toward pilgrimage season.',
      modernSummaryZh:
        '乔叟开篇写：当四月的甘霖穿透三月的干旱直到根部，用能催生花朵的汁液浸润每一条脉络时，大地苏醒，朝圣的时节将近。',
      glosses: [
        {
          original: 'Whan that Aprille with his shoures soote',
          gloss: 'When April with its sweet showers',
        },
        {
          original: 'The droghte of March hath perced to the roote,',
          gloss: 'Has pierced the drought of March to the root,',
        },
        {
          original: 'And bathed every veyne in swich licour',
          gloss: 'And bathed every vein in such liquid',
        },
        {
          original: 'Of which vertu engendred is the flour.',
          gloss: 'By whose power the flower is brought forth.',
        },
      ],
      honesty: {
        summary:
          'Demo gloss of a public-domain Chaucer excerpt; modern English is interpretive.',
      },
      disclaimer: 'ai-reconstruction',
      attribution: 'Geoffrey Chaucer, Canterbury Tales; public domain.',
      source: 'demo',
      demoNotice: 'Matched the Chaucer demo fixture.',
    },
  },
  {
    id: 'czech-hospodine',
    title: 'Hospodine hymn',
    match: /hospodine|pomiluj/i,
    result: {
      mode: 'resurrect',
      modernSummary:
        'A medieval Bohemian hymn calling on the Lord and Jesus Christ to have mercy, save the world, and hear the people’s plea.',
      modernSummaryZh:
        '这首中世纪波西米亚赞美诗恳求上主与耶稣基督怜悯世人、拯救世界并垂听呼求。',
      glosses: [
        {
          original: 'Hospodine, pomiluj ny!',
          gloss: 'Lord, have mercy on us!',
        },
        {
          original: 'Jesu Kriste, pomiluj ny!',
          gloss: 'Jesus Christ, have mercy on us!',
        },
        {
          original: 'Ty, spase vseho mira,',
          gloss: 'You, savior of all the world,',
        },
        {
          original: 'spasiž ny i uslyšiž.',
          gloss: 'save us and hear us.',
        },
      ],
      honesty: {
        summary:
          'Demo fixture for a public-domain Bohemian hymn; spellings vary across witnesses.',
      },
      disclaimer: 'ai-reconstruction',
      attribution: 'Hospodine, pomiluj ny; public domain tradition.',
      source: 'demo',
      demoNotice: 'Matched the Hospodine demo fixture.',
    },
  },
  {
    id: 'pater-noster',
    title: 'Pater Noster excerpt',
    match: /pater\s+noster|sanctificetur/i,
    result: {
      mode: 'resurrect',
      modernSummary:
        'The opening of the Latin Lord’s Prayer addresses the Father in heaven and asks that his name be kept holy.',
      modernSummaryZh: '这段拉丁文天主经开篇称呼在天的父，并求他的名为圣。',
      glosses: [
        {
          original: 'Pater noster, qui es in caelis,',
          gloss: 'Our Father, who art in heaven,',
        },
        {
          original: 'sanctificetur nomen tuum.',
          gloss: 'hallowed be thy name.',
        },
      ],
      honesty: {
        summary: 'Public-domain liturgical Latin; glosses are teaching aids.',
      },
      disclaimer: 'ai-reconstruction',
      attribution: 'Pater Noster; public domain.',
      source: 'demo',
      demoNotice: 'Matched the Pater Noster demo fixture.',
    },
  },
  {
    id: 'beowulf-hwat',
    title: 'Beowulf opening (modernized OE sample)',
    match: /hwæt|spear-danes|gar-dena/i,
    result: {
      mode: 'resurrect',
      modernSummary:
        'The famous opening call — “Listen!” — introduces the glory of the Spear-Danes’ kings in days of old.',
      modernSummaryZh:
        '著名的开篇呼唤“听啊！”引出古时矛丹人诸王的荣耀事迹。',
      glosses: [
        {
          original: 'Hwæt! We Gardena in geardagum,',
          gloss: 'Listen! We of the Spear-Danes in days of yore,',
        },
        {
          original: 'þeodcyninga þrym gefrunon,',
          gloss: 'have heard of the glory of the people’s kings,',
        },
      ],
      honesty: {
        summary:
          'Demo uses a widely printed Old English opening; glosses are simplified for the demo.',
      },
      disclaimer: 'ai-reconstruction',
      attribution: 'Beowulf opening; public domain.',
      source: 'demo',
      demoNotice: 'Matched the Beowulf demo fixture.',
    },
  },
]

export const DEMO_RESURRECT = RESURRECT_DEMOS[0]!.result

function normalize(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

export function demoIlluminate(
  lang: TargetLanguage,
  text?: string,
): IlluminateResult {
  const needle = text ? normalize(text) : ''
  if (needle) {
    const exact = ILLUMINATE_DEMOS.find(
      (d) =>
        d.targetLanguage === lang && normalize(d.input) === needle,
    )
    if (exact) return structuredClone(exact.result)

    const zh = /[\u4e00-\u9fff]/.test(needle)
    if (zh) {
      const byZh = ILLUMINATE_DEMOS.find(
        (d) => d.inputLocale === 'zh' && d.targetLanguage === lang,
      )
      if (byZh) return structuredClone(byZh.result)
    }
  }
  return structuredClone(DEMO_ILLUMINATE[lang])
}

export function demoResurrect(text: string): ResurrectResult {
  for (const sample of RESURRECT_DEMOS) {
    if (sample.match.test(text)) {
      return structuredClone(sample.result)
    }
  }
  const fallback = structuredClone(DEMO_RESURRECT)
  fallback.demoNotice =
    'Demo Mode cannot call the model. Showing the Ave Maria sample; pick a listed sample or add your xAI key for Live Mode.'
  return fallback
}

export function illuminateDemoCount(): number {
  return ILLUMINATE_DEMOS.length
}

export function resurrectDemoCount(): number {
  return RESURRECT_DEMOS.length
}
