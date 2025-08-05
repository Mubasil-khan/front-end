import React from "react";
import CategoryDetail from "../../Components/CategoryDetail/CategoryDetail";

const page = ({ params }) => {
  console.log("log;log;log;log;log;log;", params);

  return (
    <div>
      <CategoryDetail />
    </div>
  );
};

export default page;
