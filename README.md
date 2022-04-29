# sxapi-telnet-client

This library is just a client for communication with siliXcon's socket server, such server can be created with our [SWTools](https://drive.google.com/drive/folders/1UyIg-EUufEwdt14pjJqswG2xqxYfuM_0?usp=sharing). If EMGui is running, then the server is active (make sure you have the latest version of SWTools).

Install with:

```bash
npm i sxapi-telnet-client
```

### Example

```typescript
import { Sxapi } from "sxapi-telnet-client";


const fun = async () => {
    const sxapi = new Sxapi();
    await sxapi.init();

    await sxapi.search();

    const node = await sxapi.node(1);

    console.log(node);

    const node_id = node.handle

    const iref = await sxapi.get(node_id, '/driver/iref');

    console.log(iref);
}

fun();
```

## Methods

### `async sxapi.search(): number`

This method searches for all connected controllers (only on the currently selected interface, right now you **cannot** change interfaces with this client), and returns the number of all connected controllers.

### `async sxapi.node(address: number): Promise<Node>`

This returns metadata of the selected connected. Address is a integer number from `0` to `6` (for more visit our [documentation](https://silixcon2.atlassian.net/servicedesk/customer/portal/3/article/295747)).

### `async sxapi.allNodes(): Promise<Node[]>`

Same as `sxapi.node`, but returns all connected controllers in an array.

### `async sxapi.get(nodeId: string, path: string): Promise<string>`

### `async sxapi.set(nodeId: string, path: string, val: string)`

### `async sxapi.exec(nodeId: string, commnand: string, args: nullableString = null)`
