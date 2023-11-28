import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(2);
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    setProducts(data?.products);
    console.log(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleSelectedPage = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };
  return (
    <div>
      {products?.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10)?.map((product) => {
            return (
              <div className="products__single" key={product?.id}>
                <img src={product?.thumbnail} alt={product?.title} />
                <span>{product?.title}</span>
              </div>
            );
          })}
        </div>
      )}
      {products?.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disabled"}
            onClick={() => handleSelectedPage(page - 1)}
          >
            ⬅️
          </span>
          {[...Array(products.length / 10)].map((_, index) => {
            return (
              <span
                className={page === index + 1 ? "pagination__selected" : ""}
                key={index}
                onClick={() => handleSelectedPage(index + 1)}
              >
                {index + 1}
              </span>
            );
          })}
          <span
            className={
              page < products.length / 10 ? "" : "pagination__disabled"
            }
            onClick={() => handleSelectedPage(page + 1)}
          >
            ➡️
          </span>
        </div>
      )}
    </div>
  );
};
export default App;
