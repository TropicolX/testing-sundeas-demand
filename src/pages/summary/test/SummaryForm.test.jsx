import {
	render,
	screen,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

	userEvent.click(checkbox);
	expect(confirmButton).toBeEnabled();

	userEvent.click(checkbox);
	expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
	render(<SummaryForm />);

	// popover starts out hidden
	const nullPopover = screen.queryByText(
		/no ice cream will actually be delivered/i
	);
	expect(nullPopover).not.toBeInTheDocument();

	// popover appears upon mouseover of checkbox label
	const termsAndConditions = screen.getByText(/terms and conditions/i);
	userEvent.hover(termsAndConditions);

	const popover = screen.getByText(
		/no ice cream will actually be delivered/i
	);
	expect(popover).toBeInTheDocument();

	// popover disappears when we mouse out
	userEvent.unhover(termsAndConditions);
	await waitForElementToBeRemoved(() =>
		screen.queryByText(/no ice cream will actually be delivered/i)
	);
});
