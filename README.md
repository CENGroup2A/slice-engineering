### Order

User emails are unique (see User Schema below) so User endpoints utilize the email field to identify the correct record to manipulate.

| HTTP VERB | URI                               | Description                       |
| ---       | ---                               | ---                               |
| GET       | `/api/orders`                     | Get order number and status       |
| POST      | `/api/orders`                     | Post order number and status      |
| GET       | `/api/orders/:id`                 | Get order ID number               |
| PUT       | `/api/orders/:id`                 | Update order ID number            |
| DELETE    | `/api/orders/:id`                 | Delete ID number for order        |


