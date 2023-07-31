import PreviousBtn from "<test>/components/Reuseable/PreviousBtn";
import SelectProduct from "<test>/components/Reuseable/SelectProduct";
import RootLayout from "<test>/components/RootLayout/RootLayout";
import Head from "next/head";
import React from "react";

export default function CategoryComponent({ products }) {
  console.log(products, "from Selected component");
  return (
    <>
      <Head>
        <title>Select Component - {products[0].category}</title>
      </Head>
      <div className="py-5 px-2 mb-6">
        <h2 className="text-center text-3xl font-semibold mt-6">
          Category - {products[0].category}
        </h2>
        <div className="flex flex-wrap gap-5 justify-center mt-8">
          {products.map((product) => (
            <SelectProduct key={product._id} product={product} />
          ))}
        </div>
        <PreviousBtn />
      </div>
    </>
  );
}

CategoryComponent.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export async function getServerSideProps(context) {
  const { params } = context;
  const res = await fetch(
    `https://smart-pc-builder-server.vercel.app/productsByCategory/${params?.category}`
  );
  const data = await res.json();

  return { props: { products: data.data } };
}
