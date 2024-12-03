import styled from "styled-components";

export const ChatItem = styled.li`
  display: flex;
  align-items: ${(props) => (props.$sender ? "flex-end" : "flex-start")};
  flex-direction: column;
  gap: 3px;
  justify-content: center;
  color: var(--secondary-text-color);

  .image-media {
    border-radius: var(--primary-border-radius);
    width: 200px !important;
    height: 200px !important;
    object-fit: cover;
    object-position: center;
  }

  .video-media {
    width: 300px;
    height: 250px;
    background-color: red;
  }
`;

export const ChatItemFlex = styled.div`
  display: flex;
  width: fit-content;
  max-width: 75%;
  transition: all 40s ease-in;
  gap: 3px;

  .send-progress {
    align-self: flex-end;
  }
`;

export const ChatMessageItem = styled.div`
  background-color: ${(props) =>
    props.$sender
      ? "var(--primary-color)"
      : "var(--secondary-background-color)"};
  padding: 10px;
  border-radius: var(--primary-border-radius);
  color: ${(props) => (props.$sender ? "#fff" : "var(--primary-text-color)")};
  line-break: anywhere;

  p {
    font-size: 12px;
  }

  border-bottom-left-radius: ${(props) => (props.$sender ? "none" : "0px")};
  border-bottom-right-radius: ${(props) => (props.$sender ? "0px" : "none")};
`;

export const ChatTime = styled.p`
  display: block;
  font-size: 10px;
`;
