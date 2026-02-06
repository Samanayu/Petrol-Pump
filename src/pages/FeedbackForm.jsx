import React, { useMemo, useState } from "react";

const RATINGS = [1, 2, 3, 4, 5];

export default function FeedbackForm({ source = "qr" }) {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ratingLabel = useMemo(() => {
    if (!rating) return "Select a rating";
    return `You selected ${rating} / 5`;
  }, [rating]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!rating) {
      setError("Please select a rating before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        rating,
        comment: comment.trim(),
        source,
        submittedAt: new Date().toISOString(),
      };

      const stored = JSON.parse(localStorage.getItem("feedbackEntries") || "[]");
      localStorage.setItem(
        "feedbackEntries",
        JSON.stringify([...stored, payload]),
      );

      setSubmitted(true);
      setComment("");
      setRating(null);
    } catch (submitError) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="card">
      <header className="card__header">
        <p className="eyebrow">Petrol Pump Feedback</p>
        <h1>How’s the service?</h1>
        <p className="subtle">
          Your feedback helps us improve every visit. Ratings are required;
          comments are optional.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <fieldset className="rating" aria-describedby="rating-help">
          <legend className="form__label">Rate your experience</legend>
          <div className="rating__options">
            {RATINGS.map((value) => (
              <button
                key={value}
                type="button"
                className={`rating__button ${
                  rating === value ? "rating__button--active" : ""
                }`}
                onClick={() => setRating(value)}
                aria-pressed={rating === value}
              >
                {value}
              </button>
            ))}
          </div>
          <span id="rating-help" className="rating__help">
            {ratingLabel}
          </span>
        </fieldset>

        <label className="form__label" htmlFor="feedback-comment">
          Share more details (optional)
        </label>
        <textarea
          id="feedback-comment"
          name="feedback-comment"
          rows="4"
          placeholder="Tell us what stood out, or how we can improve."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />

        {error && <p className="form__error">{error}</p>}
        {submitted && !error && (
          <p className="form__success">
            Thanks! Your feedback has been submitted.
          </p>
        )}

        <button type="submit" className="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit feedback"}
        </button>
      </form>
    </section>
  );
}
