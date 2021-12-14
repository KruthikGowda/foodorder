import React from "react";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
  });
}

export default function Razorpay() {
  return <div></div>;
}
