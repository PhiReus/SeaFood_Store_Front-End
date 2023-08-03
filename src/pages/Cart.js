import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutMaster from "../layouts/LayoutMaster";
import { SET_CART } from "../redux/action";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import Swal from 'sweetalert2';

function Cart(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [cartTotal, setCartTotal] = useState(0);
  const [isRemoving, setIsRemoving] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    let total = 0;
    cart.forEach((cartItem) => {
      total += cartItem.product.price * cartItem.quantity;
    });
    setCartTotal(total);
  }, [cart]);

  const handleQuantityChange = (e) => {
    const id = e.target.id;
    const qty = e.target.value;
    const newCart = [...cart];
    if (newCart[id]) {
      newCart[id].quantity = qty;
      localStorage.setItem("cart", JSON.stringify(newCart));
      dispatch({
        type: SET_CART,
        payload: newCart,
      });
    }
  };
  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(newCart));
    dispatch({
      type: SET_CART,
      payload: newCart,
    });
    setIsRemoving(true);
  };

  return (
    <LayoutMaster>
      <>
        <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-12">
              <nav className="breadcrumb bg-light mb-30">
                <a className="breadcrumb-item text-dark" href="#">
                  Home
                </a>
                <a className="breadcrumb-item text-dark" href="#">
                  Shop
                </a>
                <span className="breadcrumb-item active">Shopping Cart</span>
              </nav>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
              <table className="table table-light table-borderless table-hover text-center mb-0">
                <thead className="thead-dark">
                  <tr>
                    <th>Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {cart.map((CartItem, index) => (
                    <tr key={index}>
                      <td className="align-middle">
                        <img
                          src={CartItem.product.image}
                          alt=""
                          style={{ width: 50 }}
                        />{" "}
                        {CartItem.product.name}
                      </td>
                      <td className="align-middle">
                        <NumericFormat
                          value={CartItem.product.price}
                          allowLeadingZeros
                          thousandSeparator="."
                          decimalSeparator=","
                          displayType="text"
                        />{" "}
                        VND
                      </td>
                      <td className="align-middle">
                        <div
                          className="input-group quantity mx-auto"
                          style={{ width: 100 }}
                        >
                          <input
                            min={1}
                            type="number"
                            id={index}
                            className="form-control form-control-sm bg-secondary border-0 text-center"
                            defaultValue={CartItem.quantity}
                            onChange={handleQuantityChange}
                          />
                        </div>
                      </td>
                      <td className="align-middle">
                        <NumericFormat
                          value={CartItem.product.price * CartItem.quantity}
                          allowLeadingZeros
                          thousandSeparator="."
                          decimalSeparator=","
                          displayType="text"
                        />{" "}
                        VND
                      </td>
                      <td className="align-middle">
                        <button
                          onClick={() => handleRemove(index)}
                          className="btn btn-sm btn-danger"
                        >
                          <i className="fa fa-times" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-lg-4">
              <form className="mb-30" action="">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-0 p-4"
                    placeholder="Coupon Code"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary">Apply Coupon</button>
                  </div>
                </div>
              </form>
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Cart Summary</span>
              </h5>
              <div className="bg-light p-30 mb-5">
                <div className="border-bottom pb-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Subtotal</h6>
                    <h6>5.000 VND</h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6 className="font-weight-medium">Shipping</h6>
                    <h6 className="font-weight-medium">15.000 VND</h6>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="d-flex justify-content-between mt-2">
                    <h5>Total</h5>
                    <h5>
                      <NumericFormat
                        value={cartTotal}
                        allowLeadingZeros
                        thousandSeparator="."
                        decimalSeparator=","
                        displayType="text"
                      />{" "}VND
                    </h5>
                  </div>
                  <Link to="/checkout" className="btn btn-block btn-primary font-weight-bold my-3 py-3">
                    Proceed To Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </LayoutMaster>
  );
}

export default Cart;