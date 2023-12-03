import { useState, useEffect } from "react";
import axios from "axios";
import { tangoConfig } from "../../firebase-config";


const GetProductCatalog = () => {
  const [data, setData] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization:
        `Basic ${tangoConfig.tangoApiKey}`,
    }};
    useEffect( () => {
        const fetchData = async () =>{
            const response = await fetch(`${tangoConfig.tangoDatabaseURL}/catalogs?verbose=true&categoryIds=`,
            options
          )
            .then((response) => setData(response.data))
            .then((response) => console.log(response))
    }
        fetchData()
    });

    return (
      <div>
        <h1>Products</h1>
      </div>
    );
};

export default GetProductCatalog;
    
 