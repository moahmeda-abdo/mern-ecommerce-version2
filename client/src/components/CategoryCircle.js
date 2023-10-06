import React from "react";

export default function CategoryCircle() {
  const categoriess = [
    {
      image:
        "https://res.cloudinary.com/drleayhps/image/upload/v1696550997/qshqtbf2zl4qwldmzbvx.png",
      category: "Phones",
    },
    {
      image:
        "https://res.cloudinary.com/drleayhps/image/upload/v1696551309/dzoxuabvxsg9r6ww9wpo.png",
      category: "Accessories ",
    },
    {
      image:
        "https://res.cloudinary.com/drleayhps/image/upload/v1696550997/vyztsdgzqouen4wwtjtc.png",
      category: "Laptops",
    },
    {
      image:
        "https://res.cloudinary.com/drleayhps/image/upload/v1696550615/ouacnbbyy0oezrrek9qu.png",
      category: "Cameras",
    },
    {
      image:
        "https://res.cloudinary.com/drleayhps/image/upload/v1696550997/r8wplbnt11hm5gnllpoh.png",
      category: "Clothes",
    },
    {
      image:
        "https://res.cloudinary.com/drleayhps/image/upload/v1696550997/alvmzmydmie2x82tmqgk.png",
      category: "Perfumes",
    },
  ];

  return (
    <div className="category-flex">
      {categoriess.map((category, index) => (
        <div key={index} className="circle-container">
          <img
            className="circleStyle"
            src={category.image}
            alt={category.category}
          ></img>
          <div>{category.category}</div>
        </div>
      ))}
    </div>
  );
}
