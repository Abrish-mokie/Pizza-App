import { useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  console.log(`fetcher is ${JSON.stringify(fetcher)}`);

  return (
    <fetcher.Form className="text-right" method="PATCH">
      <input type="hidden" name="test" value="ls" />
      <Button type="primary" disabled={fetcher.state === "submitting"}>
        Make Priority
      </Button>
    </fetcher.Form>
  );
}

export async function action({ params, request }) {
  const id = params.orderId;
  const change = { priority: true };

  await updateOrder(id, change);
  return null;
}

export default UpdateOrder;
