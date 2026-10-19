import { useRef } from 'react'

export function useLatest(value) {
  const ref = useRef(value)
  if (value) ref.current = value
  return value ?? ref.current
}
