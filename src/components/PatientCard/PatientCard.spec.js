import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PatientCard from "./PatientCard";
import { PatientProvider } from "../../contexts/App/app-context";

const mockedPatient = {
	id: "1",
	name: "John Doe",
	avatar: "https://example.com/avatar.jpg",
	description: "Test description",
	website: "https://example.com",
};

describe("PatientCard", () => {
	it("renders correctly with collapsed view", () => {
		const contextValues = {
			expandedId: "",
			setExpandedId: jest.fn(),
			setEditModalOpen: jest.fn(),
			setEditedPatient: jest.fn(),
		};

		render(
			<PatientProvider>
				<PatientCard
					patient={mockedPatient}
					expanded={false}
					onExpand={jest.fn()}
				/>
			</PatientProvider>
		);

		// Assert that elements are rendered properly in collapsed view
		expect(screen.getByAltText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("Visit Website")).toBeInTheDocument();
		expect(screen.getByLabelText("collapse")).toBeInTheDocument();
	});

	it("renders expanded view and shows full description when clicked", () => {
		const contextValues = {
			expandedId: "1",
			setExpandedId: jest.fn(),
			setEditModalOpen: jest.fn(),
			setEditedPatient: jest.fn(),
		};

		render(
			<PatientProvider>
				<PatientCard
					patient={mockedPatient}
					expanded={true}
					onExpand={jest.fn()}
				/>
			</PatientProvider>
		);

		// Assert that elements are rendered properly in expanded view
		expect(screen.getByAltText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("Visit Website")).toBeInTheDocument();
		expect(screen.getByLabelText("edit")).toBeInTheDocument();
		expect(screen.getByText("Show less")).toBeInTheDocument();
		expect(screen.getByText("Test description")).toBeInTheDocument();
	});

	it("calls onExpand function when clicked to expand/collapse", () => {
		const handleExpand = jest.fn();

		render(
			<PatientProvider>
				<PatientCard
					patient={mockedPatient}
					expanded={false}
					onExpand={handleExpand}
				/>
			</PatientProvider>
		);

		userEvent.click(screen.getByLabelText("expand"));
		expect(handleExpand).toHaveBeenCalledTimes(1);

		userEvent.click(screen.getByLabelText("collapse"));
		expect(handleExpand).toHaveBeenCalledTimes(2);
	});

	it("calls handleEdit function when Edit button is clicked", () => {
		const handleEdit = jest.fn();

		render(
			<PatientProvider>
				<PatientCard
					patient={mockedPatient}
					expanded={true}
					onExpand={jest.fn()}
				/>
			</PatientProvider>
		);

		// Click Edit button
		userEvent.click(screen.getByLabelText("edit"));
		expect(handleEdit).toHaveBeenCalledTimes(1);
	});

	// Add more tests for different scenarios, edge cases, and interactions
});
