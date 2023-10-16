import React from "react";
import { Link } from "react-router-dom";

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
        "https://res.cloudinary.com/drleayhps/image/upload/v1696642793/tgwh3nvhcb5hb8bbvxmi.png",
      category: "Watches",
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
    {
      image:
        "https://res.cloudinary.com/drleayhps/image/upload/v1696643323/z48x1sot61bpvcfo1p2j.png",
      category: "Bikes",
    },
    {
      image:
        "https://res.cloudinary.com/drleayhps/image/upload/v1696643323/cywrjkvvsarvjhlvdihi.png",
      category: "Tools",
    },
    {
      image:
        "https://res.cloudinary.com/drleayhps/image/upload/v1696643323/evbxx2gpnpuouwycspcr.png",
      category: "Fans",
    },
    {
      image:
        "https://res.cloudinary.com/drleayhps/image/upload/v1696643589/pmgiuaaxcrqq3r92aavm.png",
      category: "Toys",
    },
    {
      image:
        "https://res.cloudinary.com/drleayhps/image/upload/v1696643589/yozci11yclhp6pbmjrzj.png",
      category: "School",
    },
    {
      image:
        "https://res.cloudinary.com/drleayhps/image/upload/v1697472766/fki6mtgs2cjk8j7fz3jv.png",
      category: "Makeup",
    },
    {
      image:
        "https://res.cloudinary.com/drleayhps/image/upload/v1697473008/p8ztz1nma9aqmjr121vu.png",
      category: "Home",
    },
  ];

  return (
    <div className="category-flex">
      {categoriess.map((category, index) => (
        <Link
          className="circle-link"
          to={`/category/?query=${category.category}`}
        >
          <div key={index} className="circle-container">
            <img
              className="circleStyle"
              src={category.image}
              alt={category.category}
            ></img>
            <div>{category.category}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
