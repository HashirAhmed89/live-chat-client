import { useFormik } from "formik";
import { z } from "zod";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./auth_Context";

// Zod validation schema
const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean(),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },

    // Zod validation
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

    // Submit
    onSubmit: (values, { setSubmitting }) => {
      console.log("Login Data:", values);

      // Save email in Auth Context
      login(values.email);

      // Stop submitting state
      setSubmitting(false);

      // Go to dashboard
      navigate("/dashboard", { replace: true });
    },
  });

  return (
    <main className="auth-minimal-wrapper login-screen">
      <div className="auth-minimal-inner">
        <div className="minimal-card-wrapper">
          <div className="card mb-4 mt-5 mx-4 mx-sm-0 position-relative">
            <div className="card-body p-sm-5">
              <h2 className="fs-20 fw-bolder mb-4">Login</h2>

              <h4 className="fs-13 fw-bold mb-2">
                Login to your account
              </h4>

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

                {/* Remember Me + Forgot Password */}
                <div className="d-flex align-items-center justify-content-between">
                  <div>
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
                  </div>

                  <div>
                    <Link
                      to="/forgetpassword"
                      className="fs-11 text-primary"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                {/* Login Button */}
                <div className="mt-5">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary w-100"
                    disabled={formik.isSubmitting}
                  >
                    Login
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