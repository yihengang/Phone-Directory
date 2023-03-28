import React from "react";

const SuccessNotification = ({ successMessage }) => {
  if (successMessage === null) {
    return null;
  }
  return <div className="successNotification">{successMessage}</div>;
};

export default SuccessNotification;
