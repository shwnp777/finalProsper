import React, { useState, useEffect } from "react";
import axios from "axios";
import tangoConfig from "../../firebase-config";


const getCatalog = () => {
  const [data, setData] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization:
        `Basic ${tangoConfig.tangoApiKey}`,
    }};
    useEffect( () => {
        const fetchData = async () =>{
            const data = await fetch(`${tangoConfig.tangoDatabaseURL}catalogs?verbose=true&categoryIds=`,
            options
          )
            .then((response) => setData(data))
            .then((response) => console.log(response))
    }

    });

    return (
      <div>
        <h1>Products</h1>
      </div>
    );
};

export default getCatalog;
    
 