import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./singleProductDetail.css";
import SingleProductLoader from "../loader/singleProductLoader/SingleProductLoader";

const SingleProductDetail = () => {
  let initialValue = {
    index: 0,
    currentLink: "",
  };

  let [productDetail, setProductDetail] = useState([]);
  let [loading, setLoading] = useState(true);
  let [currentImgLink, setCurrentLink] = useState(initialValue);

  let { productid } = useParams();

  let getProduct = async () => {
    setLoading(true);
    try {
      let fetchData = await fetch("/api/products");
      let response = await fetchData.json();
      let findProduct = response.products.find(
        (item) => item.id === Number(productid)
      );
      setProductDetail(findProduct);
      setLoading(false);
      setCurrentLink({ index: 0, currentLink: "" });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProduct();
  }, [productid]);

  if (loading) return <SingleProductLoader />;

  let { title, category, img, description, extraImg, price } = productDetail;

  return (
    <div className="single-product-container">
      <div className="single-product-images">
        <img
          src={
            currentImgLink.currentLink === "" ? img : currentImgLink.currentLink
          }
          alt="product-image"
        />
        <div className="product-extra-images">
          {extraImg.map((imgLink, idx) => {
            return (
              <img
                src={imgLink}
                alt="product-image"
                key={idx}
                className={currentImgLink.index === idx ? "active" : ""}
                onMouseEnter={() =>
                  setCurrentLink({ index: idx, currentLink: imgLink })
                }
              />
            );
          })}
        </div>
      </div>

      <div className="single-product-details">
        <h2 className="product-detail-title"> {title}</h2>
        <span className="product-detail-category"> Category: {category} </span>
        <p className="product-detail-description"> {description} </p>
        <span className="product-detail-price"> Rs.{price} </span>

        <div className="product-quantity">
          <h2> Quantity: </h2>

          <form>
            <button> + </button>
            <input type="number" />
            <button> - </button>
          </form>
        </div>

        <div className="product-btn-group">
          <button className="secondary-btn"> Add to cart </button>
          <button className="secondary-btn outlined"> Add to Wishlist </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetail;
