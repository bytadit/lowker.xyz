"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import { edit, trash } from "@/app/utils/Icons";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import styled from "styled-components";
import formatDate from "@/app/utils/formatDate";
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWaveAlt, FaEye } from "react-icons/fa"; // Import icons
import { FaPerson, FaRegBookmark } from "react-icons/fa6"; // Import icons

interface Props {
  id: string;
  title: string;
  company: string;
  description: string;
  deadline: Date;
  datePosted: Date;
  duration: string;
  type: string;
  location: string;
  salary: string;
  source: string;
}

export default function LowkerItem({
  id,
  title,
  company,
  description,
  deadline,
  datePosted,
  duration,
  type,
  location,
  salary,
  source,
}: Props) {
  const { theme, deleteLowker, updateLowker, formatRupiah } = useGlobalState();
  const timeAgo = datePosted ? formatDistanceToNow(datePosted) : "Invalid date";
  return (
    <LowkerItemStyled theme={theme}>
      <div className="header">
        <div className="job-title flex flex-row justify-between gap-8">
          <h1 className="flex-grow truncate">{title}</h1>
          <div className="card-icon flex flex-row gap-2">
            <button className="view">
              <FaEye />
            </button>
            <button className="bookmark">
              <FaRegBookmark />
            </button>
          </div>
        </div>
        <p>{company}</p>
      </div>

      <div className="details">
        <p className="type">
          <FaPerson /> {type}
        </p>
        <p className="location">
          <FaMapMarkerAlt /> {location}
        </p>
        <p className="experience">
          <FaBriefcase /> Min. 1 years of experience
        </p>
        <p className="salary">
          <FaMoneyBillWaveAlt /> {formatRupiah(salary)}
        </p>
      </div>
      {/* <p className="recruiter-status">Rekruter aktif 12 menit lalu</p> */}

      <div className="lowker-footer">
        <p>Posted {timeAgo} ago</p>
      </div>
    </LowkerItemStyled>
  );
}

const LowkerItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  .header {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    h1 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0;
    }
    p {
      color: ${(props) => props.theme.colorGrey};
      font-size: 0.9rem;
    }
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.9rem;

    .location,
    .experience,
    .salary,
    .type {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.4rem;
    }

    .location svg,
    .experience svg,
    .salary svg,
    .type svg {
      color: ${(props) => props.theme.colorPrimary};
    }
  }

  .recruiter-status {
    background-color: #f8e3f7;
    color: #e6007a;
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
    border-radius: 5px;
    margin-top: auto;
    align-self: start;
  }

  .lowker-footer {
    display: flex;
    justify-content: flex-end; /* Aligns all content to the right */
    margin-top: auto;

    p {
      font-size: 0.8rem;
      margin-left: auto; /* Pushes the <p> to the right */
    }
  }
`;
