import SignUpForm from "@/components/form/signupform";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// Assuming you have imported the toast library in your component
import toast from "react-hot-toast";

// Mocking the toast library
jest.mock("react-hot-toast", () => ({
  ...jest.requireActual("react-hot-toast"),
  success: jest.fn(),
  error: jest.fn(),
}));

describe("SignUpForm", () => {
  test("renders SignUpForm component", () => {
    render(<SignUpForm />);
    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phonenum/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("validates and submits the form", async () => {
    render(<SignUpForm />);

    // Assuming your API calls will be mocked, you can use jest.mock for that

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phonenum/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    // Mocking the API call
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ message: "Registration successful" }),
    });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    // Trigger form submission
    fireEvent.click(submitButton);

    // Wait for the API call to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: "testuser",
          UserEmail: "test@example.com",
          UserPhone: "1234567890",
          UserPassword: "password123",
        }),
      });
    });

    // Assuming your toast library has been mocked, you can assert that success or error toast functions were called
    expect(toast.success).toHaveBeenCalledWith("Registration successful");
  });
});
