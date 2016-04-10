# tcomb-client

A react webclient which can perform full CRUD operations against a [BarleyRS](https://github.com/scottysinclair/barleyrs) server. 
The HTML forms are generated on the fly using JSON SCHEMA and [tcomb-form](https://github.com/gcanti/tcomb-form).
  Tcomb-form also provides client side data validation based on the JSON schema definition.

The CRUD operations and listing operations are provided by BarleyRS.
The listing of entity typs and JSON schema data are generated on the fly from the [BarleyDB](https://github.com/scottysinclair/barleydb) configuration.

The BarleyRS server must be configured to point at a given DataSource and BarleyDB schema configuration file.
