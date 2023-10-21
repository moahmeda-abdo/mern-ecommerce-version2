import React from "react";
import ListProducts from "../components/ListProducts";
import { Helmet } from "react-helmet-async";
import Swiperr from "../components/Swiperr";
import CategoryCircle from "../components/CategoryCircle";

export default function HomePage() {
  return (
    <div className="home">
      <Helmet>
        <title>E-commerce</title>
      </Helmet>
      <Swiperr />
      <CategoryCircle />
      <ListProducts />
    </div>
  );
}
