import React from "react";
import GetProductCatalog from "../TangoAPI/GetProductCatalog";
import { products } from "../../data";

const ProductGrid = () => {
  const product = products();

  console.log(product.brands[0]);
 
  return (
    <div>
      <h1>ProductGrid</h1>
      {/* { products.map((p) => (
        <p>{ p.displayName }</p>
      )) } */}

      </div>
  );
};

export default ProductGrid;
