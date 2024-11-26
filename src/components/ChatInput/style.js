import styled from "styled-components";

export const ChatInputWrapper = styled.form`
  height: 60px;
  display: flex;
  align-items: center;
  padding-right: 10px;
  gap: 3px;
  box-shadow: var(--shadow);
  border-radius: var(--primary-border-radius);
  background-color: var(--primary-background-color);

  @media screen and (max-width: 800px) {
    border-top: var(--primary-border);
    /* border-radius: 0px; */
    /* box-shadow: none; */
    border-radius: 50px;
    margin: 0px 10px 10px 10px;
  }
`;

export const ChatInputElement = styled.input`
  background-color: transparent;
  flex: 1;
  padding-left: 20px;
  height: 100%;
  outline: none;
  border: none;
  font-size: 14px;
  border-radius: var(--primary-border-radius);
  color: var(--primary-text-color);
`;

export const ButtonElement = styled.button`
  flex-shrink: 0;
  background-color: transparent;
  border: none;
  outline: none;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary-text-color);
  border-radius: var(--primary-border-radius);

  &:hover {
    background-color: var(--primary-light-color);
  }
`;

export const ChatSubmitButton = styled(ButtonElement)`
  background-color: var(--primary-color);
  color: #fff;

  &:hover {
    background-color: var(--primary-color);
  }
`;

export const MediaOptionsWrapper = styled.div`
  color: var(--primary-text-color);

  input[type="file"] {
    display: none;
  }

  display: flex;
  padding: 5px;
  align-items: center;
  gap: 10px;

  label {
    color: var(--text-primary);
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: var(--primary-border-radius);
    cursor: pointer;
  }

  label:hover {
    transition: all 0.4s;
    background-color: var(--primary-light);
  }
`;

export const PreviewFile = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: var(--primary-border-radius);
  display: flex;
  justify-content: center;
  align-items: center;
  border: var(--primary-border);

  .preview-image {
    border: var(--border);
    width: 30px;
    height: 30px;
    border-radius: 50px;
    object-fit: cover;
  }

  .preview-video {
    display: flex;
    justify-content: center;
    align-items: center;
    border: var(--border);
    width: 30px;
    height: 30px;
    border-radius: 50px;

    svg {
      color: var(--primary);
    }
  }
`;
