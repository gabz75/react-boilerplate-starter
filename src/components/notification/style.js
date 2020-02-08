import styled from 'styled-components';

export const LEVEL_INFO = 'LEVEL_INFO';
export const LEVEL_WARNING = 'LEVEL_WARNING';
export const LEVEL_ERROR = 'LEVEL_ERROR';

export const Wrapper = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 999;
`;

export const NotificationPopup = styled.div`
  border: 1px solid black;
  position: relative;
  background: white;
  border-radius: 2px;
  color: black;
  padding: 1rem;
  padding-right: 2.5rem;
  margin-bottom: 0.25rem;
  z-index: 999;

  ${(props) => props.level === LEVEL_ERROR && `
    border: 1px solid red;
    color: red;
  `}

  ${(props) => props.level === LEVEL_WARNING && `
    border: 1px solid #fed141;
    color: #fed141;
  `}
`;

export const DismissOverlay = styled.button`
  position: absolute;
  padding: 0;
  right: 1rem;
  top: 1rem;
  width: 1rem;
  height: 1rem;
  color: inherit;
`;
