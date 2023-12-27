import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PatientList from "./PatientList";
import { PatientProvider } from "../../contexts/App/app-context";

describe("PatientList Component", () => {
	const mockPatients = [
		{
			id: "1",
			name: "John Doe",
			avatar: "avatar-url-1",
			description: "Patient description 1",
			website: "https://example.com/1",
		},
		{
			id: "2",
			name: "Jane Smith",
			avatar: "avatar-url-2",
			description: "Patient description 2",
			website: "https://example.com/2",
		},
	];

	test("Empty Patient List Rendering", () => {
		render(
			<PatientProvider>
				<PatientList />
			</PatientProvider>
		);

		const emptyState = screen.getByTestId("empty-state");
		expect(emptyState).toBeInTheDocument();
	});

	test("Patient List with Data Rendering", () => {
		render(
			<PatientProvider>
				<PatientList />
			</PatientProvider>
		);

		const patientCards = screen.getAllByTestId("patient-card");
		expect(patientCards).toHaveLength(mockPatients.length);
	});

	test("Patient Card Expansion", () => {
		render(
			<PatientProvider>
				<PatientList />
			</PatientProvider>
		);

		const patientCard = screen.getByTestId("patient-card-1");
		expect(patientCard).toBeInTheDocument();

		fireEvent.click(patientCard);

		const expandedContent = screen.getByTestId("expanded-content-1");
		expect(expandedContent).toBeInTheDocument();
	});
});
