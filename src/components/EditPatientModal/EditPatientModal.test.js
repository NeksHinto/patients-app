import { screen, fireEvent } from "@testing-library/react";
import EditPatientModal from "./EditPatientModal";
import { PatientContext } from "../../contexts/App/app-context";
import { renderWithProvider } from "../../utils/render-with-provider";

describe("EditPatientModal Component", () => {
	test("renders with initial values", () => {
		renderWithProvider(<EditPatientModal />);
		const saveButton = screen.getByLabelText("Save");

		expect(saveButton).toBeInTheDocument();
	});

	test("Modal Open/Close", () => {
		renderWithProvider(<EditPatientModal />);

		const modal = screen.getByTestId("edit-patient-modal");
		expect(modal).not.toBeVisible();

		const saveButton = screen.getByText("Save");
		fireEvent.click(saveButton);
		expect(modal).toBeVisible();

		const cancelButton = screen.getByText("Cancel");
		fireEvent.click(cancelButton);
		expect(modal).not.toBeVisible();
	});

	test("Form Validation", async () => {
		renderWithProvider(<EditPatientModal />);

		const saveButton = screen.getByText("Save");
		fireEvent.click(saveButton);

		const nameInput = screen.getByLabelText("Name");
		const descriptionInput = screen.getByLabelText("Description");
		const websiteInput = screen.getByLabelText("Website");

		expect(nameInput).toHaveAttribute("aria-invalid", "true");
		expect(descriptionInput).toHaveAttribute("aria-invalid", "true");
		expect(websiteInput).toHaveAttribute("aria-invalid", "true");

		fireEvent.change(nameInput, { target: { value: "John Doe" } });
		fireEvent.change(descriptionInput, {
			target: { value: "Description Text" },
		});
		fireEvent.change(websiteInput, {
			target: { value: "https://example.com" },
		});

		expect(screen.queryByTestId("error-name")).toBeNull();
		expect(screen.queryByTestId("error-description")).toBeNull();
		expect(screen.queryByTestId("error-website")).toBeNull();
	});

	test("Form Submission", () => {
		const mockedSetPatients = jest.fn();
		PatientContext.mockReturnValue({
			setPatients: mockedSetPatients,
		});

		renderWithProvider(<EditPatientModal />);

		const saveButton = screen.getByText("Save");

		const nameInput = screen.getByLabelText("Name");
		const descriptionInput = screen.getByLabelText("Description");
		const websiteInput = screen.getByLabelText("Website");

		fireEvent.change(nameInput, { target: { value: "John Doe" } });
		fireEvent.change(descriptionInput, {
			target: { value: "Sample description" },
		});
		fireEvent.change(websiteInput, {
			target: { value: "https://example.com" },
		});

		fireEvent.click(saveButton);

		expect(mockedSetPatients).toHaveBeenCalledWith(
			expect.objectContaining({
				id: expect.any(String),
				name: "John Doe",
				avatar: expect.any(String),
				description: "Sample description",
				website: "https://example.com",
				avatarFile: null,
			})
		);
	});

	test("HTML/SQL Injection", async () => {
		renderWithProvider(<EditPatientModal />);

		const nameInput = screen.getByLabelText("Name");
		const descriptionInput = screen.getByLabelText("Description");
		const websiteInput = screen.getByLabelText("Website");

		// HTML Injection
		fireEvent.change(nameInput, {
			target: { value: "<script>alert('Injected!')</script>" },
		});
		expect(nameInput).toHaveValue("");

		// SQL Injection
		fireEvent.change(descriptionInput, {
			target: { value: "'; DROP TABLE users; --" },
		});
		expect(descriptionInput).toHaveValue("'; DROP TABLE users; --");

		// URL with HTML/SQL Injection
		fireEvent.change(websiteInput, {
			target: {
				value: "https://example.com/<script>alert('Injected!')</script>",
			},
		});
		expect(websiteInput).toHaveValue("https://example.com/");
	});
});
