import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'
import type { ReactNode } from 'react'

const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(20, 20, 30, 0.92);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
`

const Panel = styled(Dialog.Content)`
  margin: 2rem 0;
  background: linear-gradient(180deg, #2b2236 0%, #18141f 100%);
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.5);
  padding: 2rem 1.5rem;
  max-width: 400px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  outline: none;
`

const Close = styled(Dialog.Close)`
  background: none;
  border: none;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  letter-spacing: 2px;
  align-self: flex-end;
  margin-bottom: 1rem;
  cursor: pointer;
`

interface EntityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export const EntityModal = ({ open, onOpenChange, children }: EntityModalProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Overlay>
        <Panel>
          <Close aria-label="Close">× CLOSE</Close>
          {children}
        </Panel>
      </Overlay>
    </Dialog.Portal>
  </Dialog.Root>
)
