import { render } from "@testing-library/react";
import {
	PatientProvider,
} from "../contexts/App/app-context";

export const renderWithProvider = (ui: JSX.Element) => {
	return render(<PatientProvider>{ui}</PatientProvider>);
};