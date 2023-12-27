import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PatientList from "./PatientList";
import { PatientProvider } from "../../contexts/App/app-context";
import { renderWithProvider } from "../../utils/render-with-provider";

const mockedPatients = [
	{
		id: "1",
		name: "John Doe",
		avatar: "https://example.com/avatar.jpg",
		description: "Test description",
		website: "https://example.com",
	},
];

describe("PatientList", () => {
	it("renders without crashing", () => {
		renderWithProvider(<PatientList />);

		expect(screen.getByTestId("patient-list")).toBeInTheDocument();
	});

	it("renders patient cards properly", () => {
		render(
			<PatientProvider value={{ patients: mockedPatients }}>
				<PatientList />
			</PatientProvider>
		);

		expect(screen.getAllByTestId("patient-card")).toHaveLength(
			mockedPatients.length
		);
		expect(screen.getByText("John Doe")).toBeInTheDocument();
	});

	it("expands and collapses patient cards on click", () => {
		const { setExpandedId } = {
			patients: mockedPatients,
			expandedId: "",
			setExpandedId: jest.fn(),
		};

		render(
			<PatientProvider value={{ patients: mockedPatients, setExpandedId }}>
				<PatientList />
			</PatientProvider>
		);

		userEvent.click(screen.getByText("Show less"));
		expect(setExpandedId).toHaveBeenCalledTimes(1);

		userEvent.click(screen.getByText("Show more"));
		expect(setExpandedId).toHaveBeenCalledTimes(2);
	});
});
