// components/StarWarsIntro.tsx
import styled, { keyframes } from 'styled-components'
import { useEffect, useState } from 'react'
import Starfield from './Starfield'

const fadeOut = keyframes`
  0% { opacity: 1; }
  95% { opacity: 1; }
  100% { opacity: 0; visibility: hidden; }
`
const scroll = keyframes`
  0% {
    transform: rotateX(60deg) translateZ(0) translateY(40vh);
  }
  100% {
    transform: rotateX(60deg) translateZ(-1200px) translateY(-300vh);
  }
`

const Wrapper = styled.div`
  background: black;
  color: #ffe81f;
  font-family: 'Pathway Gothic One', sans-serif;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  perspective: 2000px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  animation: ${fadeOut} 5s linear forwards;
  transform-style: preserve-3d;
`

const StarWarsIntro = styled.section`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: block; 
`

const Crawl = styled.div`
  font-size: 3vw;
  text-align: justify;
  line-height: 150%;
  transform-origin: 50% 100%;
  animation: ${scroll} 5s linear forwards;
  width: 100%;
  transform-style: preserve-3d;
`

const Title = styled.h1`
  font-size: 90%;
  text-align: center;
  text-transform: uppercase;
`

export default function OpeningCrawl({ onFinish }: { onFinish: () => void }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false)
      onFinish()
    }, 20000)

    return () => clearTimeout(timeout)
  }, [onFinish])

  if (!show) return null

  return (
    <Wrapper>
      <Starfield />
      <StarWarsIntro>
        <Crawl>
          <Title>Episode X</Title>
          <Title>A New Portfolio</Title>
          <p>
            It is a period of frontend innovation. Tristan, building with React, TypeScript, and Framer Motion, is creating the ultimate Star Wars Explorer.
          </p>
          <p>
            With precision, creativity, and semantic HTML, he seeks to bring balance to the interface, demonstrating the power of modern frontend architecture.
          </p>
        </Crawl>
      </StarWarsIntro>
    </Wrapper>
  )
}
