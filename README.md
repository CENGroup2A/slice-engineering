### Order

User orders consist of Order number and status. These properties can be modified by the user via Post and Delete requests.

| HTTP VERB | URI                               | Description                       |
| ---       | ---                               | ---                               |
| GET       | `/api/orders`                     | Get order number and status       |
| POST      | `/api/orders`                     | Post order number and status      |
| GET       | `/api/orders/:id`                 | Get order ID number               |
| PUT       | `/api/orders/:id`                 | Update order ID number            |
| DELETE    | `/api/orders/:id`                 | Delete ID number for an order     |


