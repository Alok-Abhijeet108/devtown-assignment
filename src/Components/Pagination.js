import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import ProductsData from "../ProductItems.json"

let allProducts = [...ProductsData]

const flexStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = styled.footer`
  ${flexStyles}
  color: white;
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0px;
  gap: 8px
`;

const ChangePage = styled.button`
  ${flexStyles}
  background: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const PageNumber = styled.div`
  ${flexStyles}
  background: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: initial;
  border: none;
  color: black;
`;

export default function Pagination({ totalPages, setData, pageSize, filter, sort }) {
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
    if (sort === "asc") {
      ProductsData.sort((a, b) => (a.price > b.price) ? 1 : -1)
      if (filter) {
        setData([...ProductsData].filter(ele => ele.color === filter).splice(0, pageSize))
      } else {
        setData([...ProductsData].splice(0, pageSize))
      }
    }
    else if (sort === "desc") {
      ProductsData.sort((a, b) => (a.price < b.price) ? 1 : -1)
      if (filter) {
        setData([...ProductsData].filter(ele => ele.color === filter).splice(0, pageSize))
      } else {
        setData([...ProductsData].splice(0, pageSize))
      }
    }
    allProducts = [...ProductsData]
  }, [filter, sort])

  const handleChangePageFirst = () => {
    setPage(1)
    if (filter) {
      setData(allProducts.filter(ele => ele.color === filter).splice(0, pageSize))
    }
    else {
      setData(allProducts.splice(0, pageSize))
    }
    allProducts = [...ProductsData]
  }
  const handleChangePagePrevious = () => {
    if (page > 1 && filter) {
      setPage(page - 1)
      setData(allProducts.filter(ele => ele.color === filter).splice((page - 2) * pageSize, pageSize))
    }
    else if (page > 1) {
      setPage(page - 1)
      setData(allProducts.splice((page - 2) * pageSize, pageSize))
    }
    allProducts = [...ProductsData]
  }
  const handleChangePageNext = () => {
    if (page < totalPages && filter) {
      setPage(page + 1)
      setData(allProducts.filter(ele => ele.color === filter).splice((page) * pageSize, pageSize))
    }
    else if (page < totalPages) {
      setPage(page + 1)
      setData(allProducts.splice((page) * pageSize, pageSize))
    }
    allProducts = [...ProductsData]
  }
  const handleChangePageLast = () => {
    setPage(totalPages)
    if (filter) {
      setData(allProducts.filter(ele => ele.color === filter).splice((totalPages -1) * pageSize , pageSize))
    }
    else {
      setPage(totalPages)
      setData(allProducts.splice((totalPages -1) * pageSize , pageSize))
    }
    allProducts = [...ProductsData]
  }
  return (
    <Footer>
      <ChangePage onClick={handleChangePageFirst}>
        <img src="/images/chevrons-left.svg" alt="Go To First Page"/>
      </ChangePage>
      <ChangePage onClick={handleChangePagePrevious}>
        <img src="/images/chevron-left.svg" alt="Go To Previous Page"/>
      </ChangePage>
      <PageNumber>
        {page}
      </PageNumber>
      <ChangePage onClick={handleChangePageNext}>
        <img src="/images/chevron-right.svg" alt="Go To Next Page"/>
      </ChangePage>
      <ChangePage onClick={handleChangePageLast}>
        <img src="/images/chevrons-right.svg" alt="Go To Last Page"/>
      </ChangePage>
    </Footer>
  )
}