import React from 'react';
import "../../components/Conversations/conversationProduct.css";

const Conversation = ({ productID }) => {
    return (
      <div>
        <img
          className="ProductImage"
          src={`http://localhost:5000/uploads/${productID.img}`}
          width="300"
          height="350"
        />
        <div className="ProductName">{productID.productName}</div>
        <div className="ProductPriceWrapper">
          <span className="ProductPriceHeader">Price: </span>
          <span className="ProductPrice">$ {productID.price}</span>
        </div>
        <div className="ProductDescriptionWrapper">
          <span className="ProductDescriptionHeader">Description: </span>
          <span className="ProductDescription">{productID.productDesc}</span>
        </div>
        <div className="ProductDescriptionWrapper">
          <span className="ProductDescriptionHeader">Status: </span>
          <span className="ProductDescription">{productID.status}</span>
        </div>
      </div>
    );
  };

export default Conversation;