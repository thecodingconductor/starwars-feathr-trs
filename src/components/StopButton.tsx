import styled from "styled-components"

const StopButton = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  z-index: 10000;
  box-shadow: 0 0 10px rgba(255, 77, 79, 0.7);
  transition: background 0.2s;

  &:hover {
    background: #d9363e;
  }
`