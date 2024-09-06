"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "../Button/Button";
import { add } from "@/app/utils/Icons";

function CreateContent() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [qualification, setQualification] = useState("");
  const [deadline, setDeadline] = useState("");
  const [duration, setDuration] = useState(0);
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [source, setSource] = useState("");

  const { theme, allLowkers, closeModal } = useGlobalState();

  const handleChange = (name: string) => (e: any) => {
    const { value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "company":
        setCompany(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "qualification":
        setQualification(value);
        break;
      case "deadline":
        setDeadline(value);
        break;
      case "duration":
        setDuration(value);
        break;
      case "type":
        setType(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "salary":
        setSalary(value);
        break;
      case "experience":
        setExperience(value);
        break;
      case "source":
        setSource(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const lowker = {
      title,
      company,
      description,
      deadline,
      duration,
      type,
      location,
      salary,
      experience,
      source,
    };

    try {
      const res = await axios.post("/api/lowkers", lowker);
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success("Lowker created successfully.");
        allLowkers();
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
      <h1>Create a Lowker</h1>
      <div className="form-content grid grid-cols-4 gap-2 mb-4 overflow-y-auto">
        <div className="input-control col-span-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            name="title"
            onChange={handleChange("title")}
            placeholder="e.g., Data Analyst"
          />
        </div>
        <div className="input-control col-span-2">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            value={company}
            name="company"
            onChange={handleChange("company")}
            placeholder="e.g., Tokopedia"
          />
        </div>
        <div className="input-control col-span-2">
          <label htmlFor="description">Description</label>
          <textarea
            value={description}
            onChange={handleChange("description")}
            name="description"
            id="description"
            rows={3} /* Reduce height */
            placeholder="Job description"
          ></textarea>
        </div>
        <div className="input-control col-span-2">
          <label htmlFor="qualification">Qualification</label>
          <textarea
            value={qualification}
            onChange={handleChange("qualification")}
            name="qualification"
            id="qualification"
            rows={3} /* Reduce height */
            placeholder="Job qualification"
          ></textarea>
        </div>
        <div className="col-span-4 grid grid-cols-3 gap-2">
          <div className="input-control col-span-1">
            <label htmlFor="deadline">Deadline</label>
            <input
              value={deadline}
              onChange={handleChange("deadline")}
              type="date"
              name="deadline"
              id="deadline"
            />
          </div>
          <div className="input-control col-span-1">
            <label htmlFor="type">Type</label>
            <select
              name="type"
              id="type"
              value={type}
              onChange={handleChange("type")}
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div className="input-control col-span-1">
            <label htmlFor="duration">Duration</label>
            <div className="input-wrapper">
              <input
                type="number"
                id="duration"
                min={1}
                value={duration}
                name="duration"
                onChange={handleChange("duration")}
              />
              <span className="input-label mr-1">months</span>
            </div>
          </div>
        </div>
        <div className="input-control col-span-2">
          <label htmlFor="experience">Experience</label>
          <select
            name="experience"
            id="experience"
            value={experience}
            onChange={handleChange("experience")}
          >
            <option value={"Undergraduate"}>{"Undergraduate"}</option>
            <option value={"Freshgraduate"}>{"Freshgraduate"}</option>
            <option value={"min. 1 year"}>{"min. 1 year"}</option>
            <option value={"min. 2 years"}>{"min. 2 years"}</option>
            <option value={"min. 5 years"}>{"min. 5 years"}</option>
            <option value={"min. 10 years"}>{"min. 10 years"}</option>
          </select>
        </div>
        <div className="input-control col-span-2">
          <label htmlFor="salary">Salary</label>
          <select
            name="salary"
            id="salary"
            value={salary}
            onChange={handleChange("salary")}
          >
            <option value={"< Rp.1000.000"}>{"< Rp.1000.000"}</option>
            <option value={"Rp.1000.000 - Rp.3000.000"}>
              {"Rp.1000.000 - Rp.3000.000"}
            </option>
            <option value={"Rp.3000.000 - Rp.5000.000"}>
              {"Rp.3000.000 - Rp.5000.000"}
            </option>
            <option value={"Rp.5000.000 - Rp.10.000.000"}>
              {"Rp.5000.000 - Rp.10.000.000"}
            </option>
            <option value={"> Rp.10.000.000"}>{"> Rp.10.000.000"}</option>
          </select>
        </div>
        <div className="input-control col-span-2">
          <label htmlFor="source">Source</label>
          <textarea
            value={source}
            onChange={handleChange("source")}
            name="source"
            id="source"
            rows={2} /* Reduce height */
            placeholder="Job Source/Link"
          ></textarea>
        </div>
        <div className="input-control col-span-2">
          <label htmlFor="location">Location</label>
          <textarea
            value={location}
            onChange={handleChange("location")}
            name="location"
            id="location"
            rows={2} /* Reduce height */
            placeholder="Job Location"
          ></textarea>
        </div>
      </div>
      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name="Create Lowker"
          icon={add}
          padding="0.6rem 1.5rem"
          borderRad="0.6rem"
          fw="500"
          fs="1rem"
          background="#333"
        />
      </div>
    </CreateContentStyled>
  );
}

const CreateContentStyled = styled.form`
  > h1 {
    font-size: 1.2rem; /* Slightly smaller title */
    font-weight: 300;
    margin-bottom: 1rem;
    padding: 0 4px;
  }

  .form-content {
    max-height: 60vh;
    padding: 0 4px;
  }

  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  ::-webkit-scrollbar-track {
    background: #222;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.6rem;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem; /* Adjust gap between input and label as needed */
  }

  .input-wrapper input {
    flex: 1;
    padding: 0.5rem;
    border-radius: 0.25rem;
  }

  .input-label {
    font-size: 0.8rem;
    color: #999;
  }

  .input-control {
    font-weight: 200;

    label {
      font-size: 0.8rem; /* Reduce label size */
    }

    input,
    textarea,
    select {
      width: 100%;
      padding: 0.6rem; /* Reduce padding */
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen};
      color: ${(props) => props.theme.colorWhite};
    }
  }
`;

export default CreateContent;
