import axios from "axios";
import React, { useState, useEffect } from "react";

const ProductCard = () => {
  const [data, setData] = useState([]);

  // https://integration-api.tangocard.com/raas/v2/catalogs?verbose=false
  const headers = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Basic apYPfT6HNONpDRUj3CLGWYt7gvIHONpDRUYPfT6Hj`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization:
            "Basic UUFQbGF0Zm9ybTI6YXBZUGZUNkhOT05wRFJVajNDTEdXWXQ3Z3ZJSE9OcERSVVlQZlQ2SGo=",
        },
      };

      fetch(
        "https://integration-api.tangocard.com/raas/v2/catalogs?verbose=false",
        options
      )
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>ProductCard</h1>
    </div>
  );
};

export default ProductCard;
