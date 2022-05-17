import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("Initial conditions", () => {
	render(<SummaryForm />);

	// check that the button starts out disabled
	const confirmButton = screen.getByRole("button", {
		name: /confirm order/i,
	});
	expect(confirmButton).toBeDisabled();

	// check that the checkbox starts out unchecked
	const checkbox = screen.getByRole("checkbox", {
		name: /terms and conditions/i,
	});
	expect(checkbox).not.toBeChecked();
});

test("Checkbox enables button on first click and disables on second click", () => {
	render(<SummaryForm />);
	const confirmButton = screen.getByRole("button", {
		name: /confirm order/i,
	});
	const checkbox = screen.getByRole("checkbox", {
		name: /terms and conditions/i,
	});

	fireEvent.click(checkbox);
	expect(confirmButton).toBeEnabled();

	fireEvent.click(checkbox);
	expect(confirmButton).toBeDisabled();
});
