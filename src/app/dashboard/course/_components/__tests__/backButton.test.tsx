import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BackButton from "../backButton";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
};

describe("BackButton Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o botão com o ícone", () => {
    render(<BackButton />);
    
    const button = screen.getByRole("button");
    const icon = button.querySelector("svg");

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it("deve ter as classes de estilo corretas", () => {
    render(<BackButton />);
    
    const button = screen.getByRole("button");
    
    expect(button).toHaveClass("cursor-pointer");
  });

  it("deve navegar para /dashboard ao clicar", async () => {
    render(<BackButton />);
    
    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
  });
});