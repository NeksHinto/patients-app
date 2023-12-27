import React from "react";
import { render } from "@testing-library/react";
import { PatientProvider } from "./app-context";

jest.mock("@mui/material", () => ({
	...jest.requireActual("@mui/material"),
	useMediaQuery: jest.fn(() => false),
}));

test("renders PatientProvider component without crashing", () => {
	render(
		<PatientProvider>
			<div></div>
		</PatientProvider>
	);
});
