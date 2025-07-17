// components/Starfield.tsx
import styled, { keyframes } from 'styled-components'

const twinkle = keyframes`
  0%, 100% { opacity: 0.3 }
  50% { opacity: 1 }
`

const Star = styled.div<{ delay: number }>`
  position: absolute;
  width: 1.5px;
  height: 1.5px;
  background: white;
  border-radius: 50%;
  opacity: 0.7;
  animation: ${twinkle} 2s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay}s;
`

const Wrapper = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
`

const Starfield = () => {
  const stars = Array.from({ length: 120 }, (_, i) => {
    const top = `${Math.random() * 100}%`
    const left = `${Math.random() * 100}%`
    const delay = Math.random() * 5
    return <Star key={i} delay={delay} style={{ top, left }} />
  })

  return <Wrapper>{stars}</Wrapper>
}

export default Starfield
