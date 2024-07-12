import { useState } from "react";

export function FilterableProductTable({ products }) {
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filter, setFilter] = useState("");

  return (
    <>
      <SearchBar
        filterText={filter}
        onChangeFilterText={setFilter}
        inStock={inStockOnly}
        onChangeInStock={setInStockOnly}
      />
      <ProductTable
        products={products}
        inStockOnly={inStockOnly}
        filterText={filter}
      />
    </>
  );
}

export function SearchBar({
  filterText,
  onChangeFilterText,
  inStock,
  onChangeInStock,
}) {
  return (
    <>
      <input
        type="text"
        value={filterText}
        onChange={(e) => onChangeFilterText(e.target.value)}
        placeholder="Search..."
      />
      <label>
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => onChangeInStock(e.target.checked)}
          name="inStockOnly"
        />
        Only show products in stock
      </label>
    </>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span
      style={{
        color: "red",
      }}
    >
      {product.name}
    </span>
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, inStockOnly, filterText }) {
  const rows = products
    .filter((p) => p.name.toLowerCase().includes(filterText))
    .map((p) => {
      return inStockOnly ? (
        inStockOnly && p.stocked ? (
          <ProductRow product={p} />
        ) : (
          <></>
        )
      ) : (
        <ProductRow product={p} />
      );
    });
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function AppProd() {
  return <FilterableProductTable products={PRODUCTS} />;
}
