import axios from "axios";
import { url } from "../const";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

const BookList = () => {
  const [cookies] = useCookies();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBookList = async () => {
      try {
        const res = await axios.get(`${url}/books`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        setBooks(res.data);
      } catch (err) {
        console.error("本の取得に失敗しました", err);
      }
    };

    getBookList();
  }, [cookies.token]);

  return (
    <div>
      <h2>Book List</h2>
      {books.length > 0 ? (
        <ul>
          {books.map((book: any) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  );
};

export default BookList;
