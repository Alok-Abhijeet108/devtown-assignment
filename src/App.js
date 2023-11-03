import styled from "styled-components";
import Navbar from "./Navbar";
import ProductsData from "./ProductItems.json"
import Pagination from './Components/Pagination';
import { useState } from "react";

let pageSize = 10

const GridWrapper = styled.section`
  display: grid;
  max-width: 100%;
  padding: 8px;
  margin-bottom: 120px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
  grid-template-columns: repeat(4, 1fr);
`
const Grid = ({children}) => {
  return (
    <GridWrapper style={{gap:"8px"}}>
      {children}
    </GridWrapper>
  ) 
}
const ProductCard = styled.div`
  display: flex;
  border-radius: 10px;
  position: relative;
  top: 78px;
  background: ${props => props.background || "black"};
  flex-direction: column;
  justify-content: flex-start;
  img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    // height: 300px;
    width: 100%;
    object-fit: contain; 
  }
  h4 {
    margin: 8px;
  }
  h5 {
    margin: 8px;
  }
  h6 {
    margin: 8px;
  }
`
const Wrapper = styled.div`
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "auto"};
  max-width: 100%;
`;

const Select = styled.div`
  display: flex;
  position: relative;
  top: 78px;
  margin-left: 8px;
  gap: 8px;
`;

export default function App() {
  const [data, setData] = useState([...ProductsData].splice(0, pageSize))
  const [filter, setFilter] = useState(null)
  const [sort, setSort] = useState(null)
  const [totalPages, setTotalpages] = useState(Math.ceil(ProductsData.length / pageSize))

  const handleSort = (key) => {
    if (key === "asc") {
      setSort(key)
      const sortedProducts = [...ProductsData].sort((a, b) => (a.price > b.price) ? 1 : -1)
      setData(sortedProducts.splice(0, pageSize))
    }
    else if (key === "desc") {
      setSort(key)
      const sortedProducts = [...ProductsData].sort((a, b) => (a.price < b.price) ? 1 : -1)
      setData(sortedProducts.splice(0, pageSize))
    }
  }

  return (
    <Wrapper
      color="rgba(255, 255, 255, .89)"
    >
      <Navbar setFilter={setFilter} data={data} setData={setData} pageSize={pageSize} setTotalpages={setTotalpages} />
      <Select onChange={(e)=>{handleSort(e.target.value)}}>
        <label for="sort">Sort by price:</label>
        <select name="sort" id="sort">
          <option value="">-----</option>
          <option value="asc">low to high</option>
          <option value="desc">high to low</option>
        </select>
      </Select>
      <Grid>
        {data.map((item, index) => {
          return (
            <ProductCard key={index} background={item.color}>
              <img src={item.image} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <h5>Price: {item.price} $</h5>
                <h5>Color: {item.color}</h5>
                <h5>Description:</h5>
                <h6>{item.desc}</h6>
              </div>
            </ProductCard>
          )
        })}
      </Grid>
      <Pagination totalPages={totalPages} setData={setData} pageSize={pageSize} filter={filter} sort={sort} />
    </Wrapper>
  );
}
