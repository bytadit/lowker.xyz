"use client";

import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const GlobalStyles = styled.div`
    padding: 1.5rem;
    height: 100%;
    display: flex;
    gap: 1.5rem;
`;

export default function GlobalStyleProvider({ children }: Props) {
  return <GlobalStyles>{children}</GlobalStyles>;
}
