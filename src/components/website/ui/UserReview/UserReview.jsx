import React from "react";
import StarRating from "../StarRating/StarRating";
import styles from "./UserReview.module.css";

function UserReview({ userName, date, rating, review }) {
    return (
      <div>
        <div>
          <i className="fa-solid fa-user"></i> {userName}
        </div>
        <div className={styles.Rating}>
          <StarRating rating={rating} setRating={null} readOnly />
        </div>
        <p>{review}</p>
      </div>
    );
  }

export default UserReview;