import React, { useEffect, useState } from "react";

const ProductList = ({ category }: { category: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [product, setProduct] = useState<string[]>([]);

  useEffect(() => {
    console.log("Fetchtı product in" + category);
    setProduct(["Clothing", "HouseHold"]);
  }, [category]);

  return <div>ProductList</div>;
};

export default ProductList;
