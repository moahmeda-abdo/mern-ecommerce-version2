import React from "react";
import ListProducts from "../components/ListProducts";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
  return (
    <div className="home">
          <Helmet>
        <title>Amazona</title>
      </Helmet>
      <ListProducts />
    </div>
  );
}
