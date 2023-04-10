import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCar } from "../context/ShoppingCarContext";
import { formatCurrency } from "../utilities/formatCurrency";
import CartItems from "./CartItem";
import storeItems from "../data/items.json";

type ShoppingCartProps = {
  isOpen: boolean;
};
const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCar();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItems key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{""}
            {formatCurrency(
              cartItems.reduce((total, cartItems) => {
                const item = storeItems.find((i) => i.id === cartItems.id);
                return total + (item?.price || 0) * cartItems.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
