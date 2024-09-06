"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import React from "react";
import styled from "styled-components";
import CreateContent from "@/app/Components/Modals/CreateContent";
import LowkerItem from "@/app/Components/LowkerItem/LowkerItem";
import { add, plus } from "@/app/utils/Icons";
import Modal from "@/app/Components/Modals/Modal";

interface Props {
  title: string;
  lowkers: any[];
  isLogin: boolean;
}

export default function Lowkers({ title, lowkers, isLogin }: Props) {
  const { theme, isLoading, openModal, modal } = useGlobalState();
  React.useState(() => {
    console.log(lowkers);
  })
  return (
    <LowkerStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <h1>{title}</h1>
      {isLogin && (
        <button className="btn-rounded" onClick={openModal}>
          {plus}
        </button>
      )}

      <div className="lowkers grid xl:grid-cols-2 grid-cols-1 gap-4 w-full">
        {/* {isLogin && (
          <button className="create-lowker" onClick={openModal}>
            {add}
            Add New Lowker
          </button>
        )} */}
        {lowkers.map((lowker) => (
          <LowkerItem
            datePosted={lowker.datePosted}
            key={lowker.id}
            id={lowker.id}
            title={lowker.title}
            company={lowker.company}
            description={lowker.description}
            deadline={lowker.deadline}
            duration={lowker.duration}
            type={lowker.type}
            location={lowker.location}
            salary={lowker.salary}
            source={lowker.source}
          />
        ))}
      </div>
    </LowkerStyled>
  );
}

const LowkerStyled = styled.main`
  position: relative;
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  max-height: calc(100vh - 3rem);

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .btn-rounded {
    position: fixed;
    top: 3.5rem;
    right: 0.8rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;

    background-color: ${(props) => props.theme.colorBg};
    border: 2px solid ${(props) => props.theme.borderColor2};
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
    color: ${(props) => props.theme.colorGrey2};
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
      top: 3.5rem;
      right: 0.8rem;
    }
  }

  .lowkers {
    margin: 2rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-lowker {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;
