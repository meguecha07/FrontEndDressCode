import styles from "./StarRating.module.css";
import React from "react";

function StarRating({ rating, setRating }) {
    return (
      <div className={styles.StarRating}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={styles.star}
            style={{
              cursor: "pointer",
              color: rating >= star ? "gold" : "gray",
              fontSize: "24px",
            }}
            onClick={() => {
                if (setRating) {
                  setRating(star);
                }
              }}              
          >
            ★
          </span>
        ))}
      </div>
    );
  }

export default StarRating;