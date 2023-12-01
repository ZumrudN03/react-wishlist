import React, { useEffect, useState } from "react";
import "./index.scss";

const Wishlist = () => {
  const [product, setProduct] = useState([]);
  const [wishlist, setWishlist] = useState(
    localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : []
  );
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  });

  useEffect(() => {
    getPruduct();
  }, []);

  async function getPruduct() {
    const data = await fetch("https://fakestoreapi.com/products");
    const res = await data.json();
    setProduct(res);
  }

  function AddWishlist(item) {
    const elementIndex = wishlist.findIndex((x) => x.id === item.id);
    if (elementIndex !== -1) {
      RemoveWishlist(item.id);
    } else {
      setWishlist([...wishlist, { ...item }]);
    }
  }

  function RemoveWishlist(id) {
    setWishlist(wishlist.filter((x) => x.id !== id));
  }

  //  const [darkTheme,setDarkTheme] = useState(false)
  function Theme() {
    document.body.classList.toggle("darkMode")
  }

  return (
    <div className="container">
      <button className="theme" onClick={Theme}>theme</button>
      <div className="wishlist">
        {wishlist.map((item) => (
          <ul className="cardList" key={item.id}>
            <div className="cardList-img">
              <img src={item.image} alt="" className="wishlist-img" />
            </div>
            <div className="card-list">
              <li className="wishlist-title">Title: {item.title}</li>
              <li className="wishlist-price">Price: {item.price}</li>
              <li className="wishlist-desc">
                Description: {item.description.slice(0, 40)}
              </li>
              <li className="wishlist-category">Category: {item.category}</li>
              <button onClick={() => RemoveWishlist(item.id)}>
                Remove From Wishlist
              </button>
              <i className="fa-solid fa-heart" onClick={() => RemoveWishlist(item.id)}></i>
            </div>
          </ul>
        ))}
      </div>
      <div className="store">
        <div className="storeCard">
          {product.map((x) => (
            <ul className="cardList" key={x.id}>
              <img src={x.image} alt="" />
              <i
                className="fa-regular fa-heart"
                onClick={() => AddWishlist(x)}
              ></i>
              <li className="title">Title: {x.title}</li>
              <li className="price">Price: {x.price}</li>
              <li className="desc">
                Description: {x.description.slice(0, 40)}
              </li>
              <li className="category">{x.category}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
