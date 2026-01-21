import Card from "../components/Card"
import type { productInt } from "../constants/products"
import { useContext, useEffect, useState } from "react"
import useFetch from "../hooks/getProducts"
import { CartContext } from "../store/CartContext"

const Home = () => {

  const { addItem, removeItem, totalCount, cartItems} = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("")

  const { data: allProducts, loading: allProductsLoading, error: allProductsError } = useFetch<{ products: productInt[] }>("https://dummyjson.com/products");
  const { data: searchProducts, loading: searchProductsLoading, error: searchProductsError } = useFetch<{ products: productInt[] }>(searchTerm.trim() ? `https://dummyjson.com/products/search?q=${searchTerm}` : "");
  const { data: filterProducts, loading: filterProductsLoading, error: filterProductsError } = useFetch<{ products: productInt[] }>(filter.trim() ? `https://dummyjson.com/products/category/${filter}` : "");
  const { data: categories } = useFetch<string[]>("https://dummyjson.com/products/category-list"); 

  // console.log(`all: ${allProducts?.products}`);
  // console.log(`search: ${searchProducts?.products}`);
  // console.log(`filter: ${filterProducts?.products}`);

  function getDisplayData() {
    if(searchTerm.trim() !== "") {
      return { data: searchProducts, loading: searchProductsLoading, error: searchProductsError};
    } else if(filter.trim() !== "") {
      return { data: filterProducts, loading: filterProductsLoading, error: filterProductsError};
    } else {
      return { data: allProducts, loading: allProductsLoading, error: allProductsError};
    }
  }

  const {data: displayData, loading, error} = getDisplayData();

  // console.log(`display data: ${displayData}`);

  return (
    <div className="p-4 flex flex-col justify-center">
      <input
        value={searchTerm}
        placeholder="Search"
        type="text"
        className="p-2 rounded-2xl border"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex mt-2 mx-1">
        <label >
          Filter:
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mt-2 rounded-lg bg-white/80 p-1"
          >
            <option value="" >All</option>
            {categories && categories.map((category) => {
              return <option key={category} value={category}>{category}</option>
            })}
          </select>
        </label>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 p-5">
        {loading && <div><span className="animate-spin p-2"></span>Loading...</div>}

        {error && <div>{error.message}</div>}

        {!loading && displayData?.products && displayData.products.length > 0 ? (
          displayData.products.map((product) => (
            <Card key={product.id} {...product} addItem={addItem} removeItem={removeItem}/>
          ))
        ) : !loading ? (
          <p>No Data</p>
        ) : null}
      </div>

    </div>    
  )
}

export default Home