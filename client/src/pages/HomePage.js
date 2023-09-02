import React from "react";
import ListProducts from "../components/ListProducts";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

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
