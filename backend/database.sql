CREATE TYPE IF NOT EXISTS user_type AS ENUM ('provider', 'employee', 'client');

CREATE TYPE IF NOT EXISTS address_type AS ENUM ('billing', 'shipping');

CREATE TYPE IF NOT EXISTS order_status AS ENUM ('preparing', 'in transit', 'delivered');

CREATE TABLE IF NOT EXISTS "user" (
  "username" VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) DEFAULT NULL,
  "email" VARCHAR(255) NOT NULL,
  "type" user_type NOT NULL,
  PRIMARY KEY ("username"),
  UNIQUE ("email")
);

CREATE TABLE IF NOT EXISTS "client" (
  "username" VARCHAR(255) NOT NULL,
  "first_name" VARCHAR(255) NOT NULL,
  "last_name" VARCHAR(255) NOT NULL,
  PRIMARY KEY ("username"),
  FOREIGN KEY ("username") REFERENCES "user" ("username")
);

CREATE TABLE IF NOT EXISTS "address" (
  "address_id" SERIAL NOT NULL,
  "client_username" VARCHAR(255) DEFAULT NULL,
  "street" VARCHAR(255) NOT NULL,
  "city" VARCHAR(255) NOT NULL,
  "state" VARCHAR(255) DEFAULT NULL,
  "country" VARCHAR(255) NOT NULL,
  "postal_code" VARCHAR(10) DEFAULT NULL,
  "address_type" address_type NOT NULL,
  PRIMARY KEY ("address_id"),
  FOREIGN KEY ("client_username") REFERENCES "client" ("username")
);

CREATE INDEX idx_address_client_username ON "address" ("client_username");

CREATE TABLE IF NOT EXISTS "employee" (
  "username" VARCHAR(255) NOT NULL,
  "employee_name" VARCHAR(255) NOT NULL,
  PRIMARY KEY ("username"),
  FOREIGN KEY ("username") REFERENCES "user" ("username")
);

CREATE TABLE IF NOT EXISTS "product" (
  "product_id" VARCHAR(255) NOT NULL,
  "price" DECIMAL(10,2) NOT NULL,
  "currency" VARCHAR(3) NOT NULL,
  "weight" TEXT NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "brand" VARCHAR(255) NOT NULL,
  "quantity" INT NOT NULL,
  "prices_availability" VARCHAR(255) DEFAULT NULL,
  "prices_merchant" VARCHAR(255) DEFAULT NULL,
  "categories" TEXT DEFAULT NULL,
  "dateAdded" VARCHAR(255) DEFAULT NULL,
  "dateUpdated" VARCHAR(255) DEFAULT NULL,
  "imageURLs" TEXT DEFAULT NULL,
  "rating" DECIMAL(3,1) DEFAULT NULL,
  "nr_rating" INT DEFAULT NULL,
  "description" TEXT DEFAULT NULL,
  "quality" DECIMAL(15,4) GENERATED ALWAYS AS (((("nr_rating" * 0.24) + ("rating" * 0.75)) + ("price" * 0.01))) STORED,
  "search_vector" tsvector GENERATED ALWAYS AS (
    to_tsvector('english', coalesce("name", '') || ' ' || coalesce("categories", ''))
  ) STORED,
  PRIMARY KEY ("product_id")
);

CREATE INDEX idx_product_search_vector ON "product" USING GIN ("search_vector");

CREATE TABLE IF NOT EXISTS "new_rating" (
  "client_username" VARCHAR(255) NOT NULL,
  "product_id" VARCHAR(255) NOT NULL,
  "rating" DECIMAL(3,1) NOT NULL,
  "review" TEXT DEFAULT NULL,
  "date_added" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "title" VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY ("client_username", "product_id"),
  FOREIGN KEY ("client_username") REFERENCES "client" ("username"),
  FOREIGN KEY ("product_id") REFERENCES "product" ("product_id")
);

CREATE INDEX idx_new_rating_product_id ON "new_rating" ("product_id");

CREATE TABLE IF NOT EXISTS "order" (
  "order_id" SERIAL NOT NULL,
  "client_username" VARCHAR(255) NOT NULL,
  "address_id" INT NOT NULL,
  "employee_username" VARCHAR(255) NOT NULL,
  "date_created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "employee_approved" BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY ("order_id"),
  FOREIGN KEY ("client_username") REFERENCES "client" ("username"),
  FOREIGN KEY ("employee_username") REFERENCES "employee" ("username"),
  FOREIGN KEY ("address_id") REFERENCES "address" ("address_id")
);

CREATE INDEX idx_order_client_username ON "order" ("client_username");
CREATE INDEX idx_order_employee_username ON "order" ("employee_username");
CREATE INDEX idx_order_address_id ON "order" ("address_id");

CREATE TABLE IF NOT EXISTS "provider" (
  "username" VARCHAR(255) NOT NULL,
  "company" VARCHAR(255) NOT NULL,
  PRIMARY KEY ("username"),
  FOREIGN KEY ("username") REFERENCES "user" ("username")
);

CREATE TABLE IF NOT EXISTS "orderdetails" (
  "order_detail_id" SERIAL NOT NULL,
  "order_id" INT NOT NULL,
  "product_id" VARCHAR(255) NOT NULL,
  "provider_username" VARCHAR(255) NOT NULL,
  "provider_approved" BOOLEAN NOT NULL DEFAULT FALSE,
  "quantity" INT NOT NULL,
  "arrival_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "status" order_status NOT NULL DEFAULT 'preparing',
  PRIMARY KEY ("order_detail_id"),
  FOREIGN KEY ("order_id") REFERENCES "order" ("order_id"),
  FOREIGN KEY ("product_id") REFERENCES "product" ("product_id"),
  FOREIGN KEY ("provider_username") REFERENCES "provider" ("username")
);

CREATE INDEX idx_orderdetails_order_id ON "orderdetails" ("order_id");
CREATE INDEX idx_orderdetails_product_id ON "orderdetails" ("product_id");
CREATE INDEX idx_orderdetails_provider_username ON "orderdetails" ("provider_username");

CREATE OR REPLACE FUNCTION set_arrival_time()
RETURNS TRIGGER AS $$
BEGIN
   NEW.arrival_time := NOW() + INTERVAL '2 hours';
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_orderdetails
BEFORE INSERT ON "orderdetails"
FOR EACH ROW
EXECUTE FUNCTION set_arrival_time();
