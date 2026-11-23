
import "./AuthLoader.css";

const AuthLoader = () => {
  return (
    <div className="auth-loader-screen">
      <div className="auth-loader-content">
        <div className="auth-loader-orbit">
          <div className="auth-loader-ring" />
          <div className="auth-loader-core">
            <span>✦</span>
          </div>
        </div>

        <h2>ExpenseFlow</h2>
        <p>Preparing your workspace</p>

        <div className="auth-loader-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

export default AuthLoader;
