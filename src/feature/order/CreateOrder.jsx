import { useState } from "react";
import { Form, redirect, useNavigation, useActionData } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  // console.log(errorAddress);
  const isLoadingAddress = addressStatus === "loading";
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priority = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priority;

  const formError = useActionData();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-3 py-4">
      <h2 className="mb-7 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>

          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formError?.phone && (
              <p className="ml-1 mt-2 inline-block rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formError?.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              disabled={isLoadingAddress}
              className="input w-full"
              type="text"
              name="address"
              defaultValue={address}
              required
            />
            {!position.latitude && !position.longtitude && (
              <span className="absolute right-1 top-[2.2rem] z-50 sm:right-1 sm:top-[0.2rem] md:right-2 md:top-2.5">
                <Button
                  type="small"
                  disabled={isLoadingAddress}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Get Position
                </Button>
              </span>
            )}
            {errorAddress && (
              <p className="ml-1 mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />

          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing Order...."
              : ` Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please enter a valid phone number";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;