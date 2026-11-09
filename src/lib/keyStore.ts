const STORAGE_KEY = 'bohemian-scriptorium.xaiKey'

export function getKey(): string | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (!value || value.trim().length === 0) return null
    return value
  } catch {
    return null
  }
}

export function setKey(key: string): void {
  const trimmed = key.trim()
  if (!trimmed) {
    clearKey()
    return
  }
  localStorage.setItem(STORAGE_KEY, trimmed)
}

export function clearKey(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function hasKey(): boolean {
  return getKey() !== null
}
