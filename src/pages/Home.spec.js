import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "./Home";
import { PatientProvider } from "../contexts/App/app-context";

describe("Home", () => {
	it("renders without crashing", async () => {
		render(
			<PatientProvider>
				<Home />
			</PatientProvider>
		);

		expect(screen.getByTestId("loading")).toBeInTheDocument();

		await waitFor(
			() => {
				expect(screen.queryByText("patient-list")).not.toBeInTheDocument();
			},
			{
				timeout: 5000,
			}
		);
	});
});
