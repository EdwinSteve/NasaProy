import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../Services/recovery";

export default function RecoveryPass() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    resetPassword(email, data.password, data.verifyCode);
    navigate('/login');
  };

  return (
    <article className="container">
      <h3>Reset Password</h3>
      <p>Enter the 6-digit verification code and your new password. The code was sent to your associated email address.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="verifyCode">Verification Code</label>
        <input 
          id="verify-code" 
          placeholder="e.g. 123456"
          {...register("verifyCode", {
            required: "Verification code is required",
            pattern: {
              value: /^\d{6}$/,
              message: "Code must be exactly 6 digits",
            },
          })}
        />
        {errors.verifyCode && (<span className="error">{errors.verifyCode.message}</span>)}

        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}

        <button className='btn-form' type="submit">Reset Password</button>
      </form>
    </article>
  );
}