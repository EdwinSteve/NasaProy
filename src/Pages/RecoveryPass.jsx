export default function RecoveryPass() {
  return (
    <article className="container">
      <h3>Reset Password</h3>
      <p>Enter the 6-digit verification code and your new password. The code was sent to your associated email address.</p>

      <form>
        <label for="verify-code">Verification Code</label>
        <input type="verify-code" id="verify-code" name="verifyCode" placeholder="e.g. 123456" required />

        <label for="password">New Password</label>
        <input type="password" id="password" name="pass" required />

      </form>

      <button className='btn-form' type="submit">Reset Password</button>
    </article>
  );
}