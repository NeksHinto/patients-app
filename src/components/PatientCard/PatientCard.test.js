import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PatientCard from "./PatientCard";
import { PatientContext } from "../../contexts/App/app-context";

describe("PatientCard Component", () => {
	const mockPatient = {
		id: "1",
		name: "John Doe",
		avatar: "avatar-url",
		description: "Patient description",
		website: "https://example.com",
	};

	test("Render Patient Card", () => {
		render(
			<PatientContext.Provider
				value={{
					expandedId: "",
					setExpandedId: jest.fn(),
					setEditModalOpen: jest.fn(),
					setEditedPatient: jest.fn(),
				}}>
				<PatientCard
					patient={mockPatient}
					expanded={false}
					onExpand={jest.fn()}
				/>
			</PatientContext.Provider>
		);
		const patientName = screen.getByText("John Doe");
		expect(patientName).toBeInTheDocument();
	});

	test("Collapsed State Test", () => {
		render(
			<PatientContext.Provider
				value={{
					expandedId: "",
					setExpandedId: jest.fn(),
					setEditModalOpen: jest.fn(),
					setEditedPatient: jest.fn(),
				}}>
				<PatientCard
					patient={mockPatient}
					expanded={false}
					onExpand={jest.fn()}
				/>
			</PatientContext.Provider>
		);
		const expandedContent = screen.queryByText("Patient description");
		expect(expandedContent).not.toBeInTheDocument();
	});

	test("Expanded State Test", () => {
		render(
			<PatientContext.Provider
				value={{
					expandedId: "1",
					setExpandedId: jest.fn(),
					setEditModalOpen: jest.fn(),
					setEditedPatient: jest.fn(),
				}}>
				<PatientCard
					patient={mockPatient}
					expanded={true}
					onExpand={jest.fn()}
				/>
			</PatientContext.Provider>
		);
		const expandedContent = screen.getByText("Patient description");
		expect(expandedContent).toBeInTheDocument();
	});

	test("Edit Button Test", () => {
		const setEditModalOpen = jest.fn();
		const setEditedPatient = jest.fn();
		render(
			<PatientContext.Provider
				value={{
					expandedId: "",
					setExpandedId: jest.fn(),
					setEditModalOpen,
					setEditedPatient,
				}}>
				<PatientCard
					patient={mockPatient}
					expanded={false}
					onExpand={jest.fn()}
				/>
			</PatientContext.Provider>
		);

		const editButton = screen.getByLabelText("edit");
		fireEvent.click(editButton);

		expect(setEditedPatient).toHaveBeenCalledWith(mockPatient);
		expect(setEditModalOpen).toHaveBeenCalledWith(true);
	});

	test("Website Link Test", () => {
		render(
			<PatientCard
				patient={mockPatient}
				expanded={false}
				onExpand={jest.fn()}
			/>
		);

		const websiteLink = screen.getByText("Visit Website");
		fireEvent.click(websiteLink);

		expect(window.open).toHaveBeenCalledWith(mockPatient.website, "_blank");
	});

	test("Handling Long Name Test", () => {
		const longNamePatient = {
			...mockPatient,
			name: "John Doe with an Extremely Long Name",
		};

		render(
			<PatientContext.Provider
				value={{
					expandedId: "",
					setExpandedId: jest.fn(),
					setEditModalOpen: jest.fn(),
					setEditedPatient: jest.fn(),
				}}>
				<PatientCard
					patient={longNamePatient}
					expanded={false}
					onExpand={jest.fn()}
				/>
			</PatientContext.Provider>
		);

		const shortenedName = screen.getByText("John Doe with...");
		expect(shortenedName).toBeInTheDocument();
	});
});
