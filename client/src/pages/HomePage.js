import React from "react";
import ListProducts from "../components/ListProducts";
import { Helmet } from "react-helmet-async";
import Swiperr from "../components/Swiperr";
import CategoryCircle from "../components/CategoryCircle";

export default function HomePage() {
  return (
    <div className="home">
      <Helmet>
        <title>Amazona</title>
      </Helmet>
      <h1>Featured Products</h1>
      <Swiperr />
      <CategoryCircle />
      <ListProducts />
    </div>
  );
}
