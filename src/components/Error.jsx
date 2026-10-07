import { Link } from "react-router-dom";

const ErrorPage = ({ code = "500", title = "Something went wrong", message = "We couldn't load this page.", steps = ["Check your connection.", "Try again in a moment."], inline = false, onRetry }) => {
  const Wrapper = inline ? "section" : "main";
  return (
  <Wrapper className={`error-page${inline ? " error-page-inline" : ""}`} role="alert">
    <div className="error-card">
      <span className="error-eyebrow">POPFLIX · ERROR</span>
      <p className="error-code">{code}</p>
      <h1>{title}</h1>
      <p className="error-message">{message}</p>
      <ol className="error-steps">
        {steps.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}
      </ol>
      {onRetry && <button className="error-home-button" type="button" onClick={onRetry}>Try again</button>}
      {!inline && <Link className="error-home-button" to="/">Back to home</Link>}
    </div>
  </Wrapper>
  );
};

export default ErrorPage;
