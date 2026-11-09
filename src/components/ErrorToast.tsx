interface Props {
  message: string | null
  onDismiss: () => void
  onUseDemo?: () => void
}

export function ErrorToast({ message, onDismiss, onUseDemo }: Props) {
  if (!message) return null
  return (
    <div className="toast" role="alert">
      <p>{message}</p>
      <div className="row">
        {onUseDemo ? (
          <button type="button" onClick={onUseDemo}>
            Switch to Demo Mode
          </button>
        ) : null}
        <button type="button" className="ghost" onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  )
}
