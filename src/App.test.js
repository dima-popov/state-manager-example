import { render, screen } from "@testing-library/react";
import App from "./App";

test("check count", () => {
  render(<App />);
  const linkElement = screen.getByText(/Child A/i);
  expect(linkElement).toBeInTheDocument();
});
