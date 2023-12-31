import RootLayout from "<test>/components/RootLayout/RootLayout";
import Banner from "<test>/components/UI/Banner";
import FeaturedCategory from "<test>/components/UI/FeaturedCategory";
import FeaturedProduct from "<test>/components/UI/FeaturedProduct";
import { useSession } from "next-auth/react";
import Head from "next/head";

export const getStaticProps = async () => {
  const res = await fetch(
    "https://smart-pc-builder-server.vercel.app/products"
  );
  const products = await res.json();
  return { props: { products } };
};

export default function Home({ products }) {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Smart Pc Builder - Home</title>
      </Head>
      <Banner />
      <div className="px-4">
        <FeaturedCategory />
        <FeaturedProduct products={products.data.slice(0, 6)} />
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
