import { products } from "../constants/products"
import Card from "../components/Card"
import type { productInt } from "../constants/products"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

const Home = () => {

  const [productsList, setProductsList] = useState<productInt[]>(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : products;
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(productsList));
  }, [productsList]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("")
  const [addProductDialogOpen, setAddProductDialog] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setProductsList(products);
      return;
    }
    const term = searchTerm.toLowerCase();
    setProductsList(
      products.filter((p) =>
        (p.title && p.title.toLowerCase().includes(term)) ||
        (p.description && p.description.toLowerCase().includes(term))
      )
    );
  }, [searchTerm])

  useEffect(() => {
    if (!filter.trim()) {
      setProductsList(products);
      return;
    }
    setProductsList(products.filter((p) => p.category === filter));
  }, [filter]);

  type addProductFormValues = {
    id: number,
    title: string,
    price: number,
    description: string,
    image: string,
    stock: number,
    category: string
  }

  const {register, handleSubmit, reset, formState: { errors }} = useForm<addProductFormValues>({
    defaultValues: {
      id: 0,
      title: "",
      price: 0,
      description: "",
      image: "",
      stock: 0,
      category: ""
    }
  })

  function handleDelete(id: number) {
    if(!id) {
      return;
    }
    setProductsList(products.filter((p) => p.id !== id));
  }

  return (
    <div className="p-4 flex flex-col justify-center">
      <input
        value={searchTerm}
        placeholder="Search"
        type="text"
        className="p-2 rounded-2xl border"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex justify-between mt-2 mx-1">
        <label >
          Filter:
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mt-2 rounded-lg bg-white/80 p-1"
          >
            <option value="" >All</option>
            <option value="men's clothing">Men's clothing</option>
            <option value="electronics">Electronics</option>
            <option value="women's clothing">Women's clothing</option>
            <option value="jwellery">Jwellery</option>
          </select>
        </label>

        <button 
          onClick={() => setAddProductDialog(!addProductDialogOpen)}
          className="bg-white p-1 rounded-lg px-4"  
        >
          Add Product
        </button>
      </div>
      
      { addProductDialogOpen && (
        <form 
          onSubmit={handleSubmit((data) => {
            setProductsList([...productsList, data]);
            setAddProductDialog(false);
            reset(); 
          })} 
          className="grid md:grid-cols-2 gap-4 rounded-md bg-white p-4 mt-4"
        >
          <label htmlFor="id">Id: </label>
          <input
            id="id"
            type="number"
            placeholder="eg. 12"
            {...register("id", {required: "ID is required"})}
            className="border rounded p-2"
          />
          {errors.id && <p className="text-red-500">{errors.id.message}</p>}
          
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            placeholder="Product title"
            {...register("title", {required: "Title is required"})}
            className="border rounded p-2"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          
          <label htmlFor="price">Price: </label>
          <input
            id="price"
            type="number"
            placeholder="Price"
            {...register("price", {required: "Price is required"})}
            className="border rounded p-2"
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          
          <label htmlFor="description">Description: </label>
          <input
            id="description"
            type="text"
            placeholder="Description"
            {...register("description", {required: "Description is required"})}
            className="border rounded p-2"
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          
          <label htmlFor="image">Image Url: </label>
          <input
            id="image"
            type="text"
            placeholder="Image URL"
            {...register("image", {required: "Image URL is required"})}
            className="border rounded p-2"
          />
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}
          
          <label htmlFor="stock">Stock: </label>
          <input
            id="stock"
            type="number"
            placeholder="Stock"
            {...register("stock", {required: "Stock is required"})}
            className="border rounded p-2"
          />
          {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
          
          <label htmlFor="category">Category: </label>
          <input
          id="category"
            type="text"
            placeholder="Category"
            {...register("category", {required: "Category is required"})}
            className="border rounded p-2"
          />
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}
          
          <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded">Add Product</button>
        </form>
      )}

      <div className="grid sm:grid-cols-3 gap-4 p-5">
        {productsList.map((product) => {
          return (
            <Card key={product.id} {...product} onDelete={handleDelete}/>
          )
        })}
      </div>

    </div>    
  )
}

export default Home