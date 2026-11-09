import { useMemo, useState } from 'react'
import { ErrorToast } from './components/ErrorToast'
import { GlossList } from './components/GlossList'
import { IlluminateForm } from './components/IlluminateForm'
import { ManuscriptPage } from './components/ManuscriptPage'
import { ModeTabs } from './components/ModeTabs'
import { ResurrectForm } from './components/ResurrectForm'
import { SettingsPanel } from './components/SettingsPanel'
import { getSample } from './lib/samples'
import { createProvider, resolveRuntimeMode } from './providers/factory'
import { ScribeHttpError } from './providers/xaiBrowser'
import type {
  IlluminateResult,
  Mode,
  ResurrectResult,
  TargetLanguage,
} from './providers/types'
import { validateClientInput } from './lib/validate'
import './styles/app.css'

const DEFAULT_ILLUMINATE =
  'Kind lord, please look with mercy on this poor town that waits in winter darkness for the light of spring.'

export default function App() {
  const [mode, setMode] = useState<Mode>('illuminate')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [forceDemo, setForceDemo] = useState(false)
  const [keyEpoch, setKeyEpoch] = useState(0)
  const [illuminateText, setIlluminateText] = useState(DEFAULT_ILLUMINATE)
  const [resurrectText, setResurrectText] = useState('')
  const [targetLanguage, setTargetLanguage] =
    useState<TargetLanguage>('latin')
  const [formError, setFormError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [illuminateResult, setIlluminateResult] =
    useState<IlluminateResult | null>(null)
  const [resurrectResult, setResurrectResult] =
    useState<ResurrectResult | null>(null)

  const runtime = useMemo(
    () => resolveRuntimeMode({ forceDemo }),
    [forceDemo, keyEpoch],
  )

  const golem = /emet/i.test(illuminateText) || /emet/i.test(resurrectText)
  const ossuary =
    /kutna|kutná|ossuary/i.test(illuminateText) ||
    /kutna|kutná|ossuary/i.test(resurrectText)
  const candle =
    new URLSearchParams(window.location.search).get('candle') === '1' ||
    new Date().getHours() < 5

  async function run() {
    setFormError(null)
    setToast(null)
    const input =
      mode === 'illuminate'
        ? { mode, text: illuminateText, targetLanguage }
        : { mode, text: resurrectText }
    const validated = validateClientInput(input)
    if (!validated.ok) {
      setFormError(validated.error)
      return
    }
    setBusy(true)
    try {
      const provider = createProvider({ forceDemo })
      const result = await provider.complete(validated.request)
      if (result.mode === 'illuminate') {
        setIlluminateResult(result)
      } else {
        setResurrectResult(result)
      }
    } catch (err) {
      if (err instanceof ScribeHttpError) {
        setToast(err.message)
      } else {
        setToast(err instanceof Error ? err.message : 'Something went wrong.')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={`app ${candle ? 'candle-root' : ''}`}>
      <header className="top">
        <div>
          <p className="eyebrow">Kiroween 2026 · Resurrection</p>
          <h1>Bohemian Scriptorium</h1>
          <p className="tagline">
            Illuminate modern words as medieval parchment — or resurrect old
            texts into plain speech.
          </p>
        </div>
        <div className="top-actions">
          <span
            className={`badge ${runtime === 'demo' ? 'demo' : 'live'}`}
            aria-label={`Runtime ${runtime}`}
          >
            {runtime === 'demo' ? 'Demo Mode' : 'Live (BYOK)'}
          </span>
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            aria-label="Open settings"
          >
            Settings
          </button>
        </div>
      </header>

      <p className="banner" role="note">
        Outputs are <strong>AI reconstructions</strong>, not scholarly
        translations. Demo Mode needs no key. Optional Live Mode uses your own
        xAI key in this browser only.
      </p>

      {golem ? (
        <p className="egg" role="status">
          A clay servant stirs while the word <em>emet</em> remains. Wipe a
          letter and it sleeps again. (Prague golem nod.)
        </p>
      ) : null}

      <ModeTabs mode={mode} onChange={setMode} />

      {mode === 'illuminate' ? (
        <IlluminateForm
          text={illuminateText}
          targetLanguage={targetLanguage}
          busy={busy}
          error={formError}
          onTextChange={setIlluminateText}
          onLanguageChange={setTargetLanguage}
          onSubmit={() => void run()}
        />
      ) : (
        <ResurrectForm
          text={resurrectText}
          busy={busy}
          error={formError}
          onTextChange={setResurrectText}
          onPickSample={(id) => {
            const sample = getSample(id)
            if (sample) setResurrectText(sample.text)
          }}
          onSubmit={() => void run()}
        />
      )}

      {mode === 'illuminate' && illuminateResult ? (
        <ManuscriptPage
          result={illuminateResult}
          candle={candle}
          ossuary={ossuary}
        />
      ) : null}
      {mode === 'resurrect' && resurrectResult ? (
        <GlossList result={resurrectResult} />
      ) : null}

      <footer className="foot">
        <p>
          Static site · GitHub Pages · No Kingdom Come: Deliverance assets · MIT
        </p>
      </footer>

      <SettingsPanel
        open={settingsOpen}
        forceDemo={forceDemo}
        onForceDemoChange={setForceDemo}
        onClose={() => setSettingsOpen(false)}
        onKeyChange={() => setKeyEpoch((n) => n + 1)}
      />
      <ErrorToast
        message={toast}
        onDismiss={() => setToast(null)}
        onUseDemo={() => {
          setForceDemo(true)
          setToast(null)
        }}
      />
    </div>
  )
}
