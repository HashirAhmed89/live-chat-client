import { useFormik } from 'formik';
import { z } from 'zod';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
  rememberMe: z.boolean(),
});

const Login = () => (
  <LoginForm />
);

const LoginForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: (values) => {
      const result = loginSchema.safeParse(values);

      if (result.success) {
        return {};
      }

      return result.error.issues.reduce((errors, issue) => {
        const field = issue.path[0];
        if (typeof field === 'string' && !errors[field]) {
          errors[field] = issue.message;
        }
        return errors;
      }, {});
    },
    onSubmit: (_, { setSubmitting }) => {
      setSubmitting(false);
      navigate('/dashboard', { replace: true });
    },
  });

  return (
    <main className="auth-minimal-wrapper login-screen">
    <div className="auth-minimal-inner">
      <div className="minimal-card-wrapper">
        <div className="card mb-4 mt-5 mx-4 mx-sm-0 position-relative">
          {/* <div className="wd-50 bg-white p-2 rounded-circle shadow-lg position-absolute translate-middle top-0 start-50">
            <img src="assets/images/logo-abbr.png" alt="" className="img-fluid" />
          </div> */}
          <div className="card-body p-sm-5">
            <h2 className="fs-20 fw-bolder mb-4">Login</h2>
            <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>
            <p className="fs-12 fw-medium text-muted">
              Welcome back to <strong>Nelel</strong> web applications. Log in to continue.
            </p>
            <form onSubmit={formik.handleSubmit} noValidate className="w-100 mt-4 pt-2">
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  className={`form-control${formik.touched.email && formik.errors.email ? ' is-invalid' : ''}`}
                  placeholder="Email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(formik.touched.email && formik.errors.email)}
                  aria-describedby={formik.touched.email && formik.errors.email ? 'loginEmailError' : undefined}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback" id="loginEmailError">
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className={`form-control${formik.touched.password && formik.errors.password ? ' is-invalid' : ''}`}
                  placeholder="Password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(formik.touched.password && formik.errors.password)}
                  aria-describedby={formik.touched.password && formik.errors.password ? 'loginPasswordError' : undefined}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback" id="loginPasswordError">
                    {formik.errors.password}
                  </div>
                )}
              </div>
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
                    <label className="custom-control-label c-pointer" htmlFor="rememberMe">
                      Remember Me
                    </label>
                  </div>
                </div>
                <div>
                  <Link to="/forgetpassword" className="fs-11 text-primary">
                    Forgot password?
                  </Link>
                </div>
              </div>
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
