import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditPatientModal from "./EditPatientModal";
import { renderWithProvider } from "../../utils/render-with-provider";

jest.mock("react", () => ({
	...jest.requireActual("react"),
	useContext: jest.fn(),
}));

const mockedPatient = {
	id: "1",
	name: "John Doe",
	avatar: "https://example.com/avatar.jpg",
	description: "Test description",
	website: "https://example.com",
};

describe("EditPatientModal", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders modal and form elements properly", () => {
		const contextValues = {
			editModalOpen: true,
			setEditModalOpen: jest.fn(),
			editedPatient: mockedPatient,
			setEditedPatient: jest.fn(),
			patients: [],
			setPatients: jest.fn(),
			isMobile: false,
		};

		React.useContext.mockReturnValue(contextValues);

		renderWithProvider(<EditPatientModal />);

		expect(screen.getByText("Edit Patient")).toBeInTheDocument();
		expect(screen.getByLabelText("Name")).toBeInTheDocument();
		expect(screen.getByLabelText("Avatar URL")).toBeInTheDocument();
		expect(screen.getByLabelText("Description")).toBeInTheDocument();
		expect(screen.getByLabelText("Website")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
	});

	it("calls handleClose function when cancel button is clicked", () => {
		const handleClose = jest.fn();

		const contextValues = {
			editModalOpen: true,
			setEditModalOpen: jest.fn(),
			editedPatient: mockedPatient,
			setEditedPatient: jest.fn(),
			patients: [],
			setPatients: jest.fn(),
			isMobile: false,
		};

		React.useContext.mockReturnValue({ ...contextValues, handleClose });

		renderWithProvider(<EditPatientModal />);

		userEvent.click(screen.getByRole("button", { name: "Cancel" }));
		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	it("calls handleSubmit function when form is submitted", () => {
		const handleSubmit = jest.fn();

		const contextValues = {
			editModalOpen: true,
			setEditModalOpen: jest.fn(),
			editedPatient: mockedPatient,
			setEditedPatient: jest.fn(),
			patients: [],
			setPatients: jest.fn(),
			isMobile: false,
		};

		React.useContext.mockReturnValue({ ...contextValues, handleSubmit });

		renderWithProvider(<EditPatientModal />);

		fireEvent.submit(screen.getByRole("button", { name: "Save" }));
		expect(handleSubmit).toHaveBeenCalledTimes(1);
	});
});
