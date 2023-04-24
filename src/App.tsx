import { useState } from "react";
import PostsList1 from "./PostList1";
import PostsList2 from "./PostList2";

function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsList1 />)}>
        Posts List 1
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>
        Posts List 2
      </button>
      <br />
      {currentPage}
    </div>
  );
}

export default App;
