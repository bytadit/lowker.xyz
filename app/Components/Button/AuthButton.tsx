"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colorPrimary};
  color: ${(props) => props.theme.colorGrey0};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.35s ease-in-out;
  @media screen and (max-width: 500px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }

  &:hover {
    background: ${(props) => props.theme.colorPrimaryGreen};
  }

  i {
    margin-right: 0.5rem;
  }
`;

interface Props {
  icon?: React.ReactNode;
  name?: string;
  click: string;
  type?: "submit" | "button" | "reset" | undefined;
}

export default function AuthButton({ icon, name, click, type }: Props) {
  const { theme } = useGlobalState();
  const router = useRouter();

  const handleClick = (link: string) => {
    router.push(link);
  };
  return (
    <ButtonStyled
      type={type}
      onClick={() => {
        handleClick(click);
      }}
      theme={theme}
    >
      {icon && icon}
      {name}
    </ButtonStyled>
  );
}
