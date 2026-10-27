import { useFormik } from "formik";
import { z } from "zod";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./authcontext";
import { connectSocket, disconnectSocket } from "../sockets/socket";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

// Define the login validation schema
const loginSchema = z
  .object({
    email: z.string().trim().email("Enter a valid email address."),
    password: z.string().min(1, "Password is required."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
    rememberMe: z.boolean(),
  })
  .superRefine((values, context) => {
    if (values.confirmPassword && values.password !== values.confirmPassword) {
      context.addIssue({
        code: "custom",
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      });
    }
  });

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },

    // Validate form values using Zod
    validate: (values) => {
      const result = loginSchema.safeParse(values);

      if (result.success) {
        return {};
      }

      const errors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (field) {
          errors[field] = issue.message;
        }
      });

      return errors;
    },

    // Send login details to the backend
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email.trim(),
            password: values.password,
          }),
        });

        // Read the response from the backend
        const data = await response.json();

        if (!response.ok) {
          const message = data.message || "Invalid email or password.";
          console.error("Login API rejected the request.", {
            status: response.status,
            message,
          });
          setStatus(message);
          return;
        }

        if (!data.token || !data.user) {
          throw new Error("The login response did not include a user and token.");
        }

        try {
          const socket = connectSocket(data.token);
          if (!socket.connected) {
            await new Promise((resolve, reject) => {
              const handleConnect = () => {
                socket.off("connect_error", handleConnectError);
                resolve();
              };
              const handleConnectError = (error) => {
                socket.off("connect", handleConnect);
                reject(error);
              };

              socket.once("connect", handleConnect);
              socket.once("connect_error", handleConnectError);
            });
          }
        } catch (error) {
          disconnectSocket();
          console.error("Socket.IO connection failed after login succeeded:", error);
          setStatus(
            `Login succeeded, but the real-time connection failed: ${
              error.message || "Socket authentication failed."
            }`
          );
          return;
        }

        // Save the authenticated session only after the socket connects.
        login(data.user, data.token);

        // Redirect to the dashboard
        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error("Login API request failed:", error);
        setStatus(
          error instanceof TypeError
            ? "Unable to reach the login server. Check that the backend is running and allows this frontend origin."
            : error.message || "Login failed."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <main className="auth-minimal-wrapper login-screen">
      <div className="auth-minimal-inner">
        <div className="minimal-card-wrapper">
          <div className="card mb-4 mt-5 mx-4 mx-sm-0 position-relative">
            <div className="card-body p-sm-5">
              <h2 className="fs-20 fw-bolder mb-4">Login</h2>

              <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>

              <p className="fs-12 fw-medium text-muted">
                Welcome back to <strong>Nelel</strong> web applications. Log in
                to continue.
              </p>

              <form
                onSubmit={formik.handleSubmit}
                noValidate
                className="w-100 mt-4 pt-2"
              >
                {/* Email */}
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${
                      formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Password"
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <input
                    type="password"
                    name="confirmPassword"
                    className={`form-control ${
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {formik.errors.confirmPassword}
                      </div>
                    )}
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="d-flex align-items-center justify-content-between">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formik.values.rememberMe}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    <label
                      className="custom-control-label c-pointer"
                      htmlFor="rememberMe"
                    >
                      Remember Me
                    </label>
                  </div>

                  <Link to="/forgetpassword" className="fs-11 text-primary">
                    Forgot password?
                  </Link>
                </div>

                {/* Display API errors */}
                {formik.status && (
                  <div className="alert alert-danger mt-3">{formik.status}</div>
                )}

                {/* Login Button */}
                <div className="mt-5">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary w-100"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
