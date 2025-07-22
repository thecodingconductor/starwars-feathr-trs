import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import styled from "styled-components";
import type { ReactNode } from "react";

const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(20, 20, 30, 0.92);
  z-index: 1000;
  overflow-y: auto;
  padding: 0;
`;

const Panel = styled(Dialog.Content)`
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 1.5rem;
  background: linear-gradient(180deg, #2b2236 0%, #18141f 100%);
  border-radius: 0;
  box-shadow: none;

  display: flex;
  flex-direction: column;
  align-items: center;

  outline: none;
`;

const Close = styled(Dialog.Close)`
  align-self: flex-end;
  margin-bottom: 1rem;
  background: none;
  border: none;
  color: #fff;
  font-family: "Orbitron", sans-serif;
  font-size: 1.1rem;
  letter-spacing: 2px;
  cursor: pointer;
`;

interface EntityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export const EntityModal = ({
  open,
  onOpenChange,
  children,
}: EntityModalProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Overlay>
        <Panel>
          <Close aria-label="Close">× CLOSE</Close>
          <VisuallyHidden>
            <Dialog.Title>Entity Modal</Dialog.Title>
          </VisuallyHidden>
          {children}
        </Panel>
      </Overlay>
    </Dialog.Portal>
  </Dialog.Root>
);
