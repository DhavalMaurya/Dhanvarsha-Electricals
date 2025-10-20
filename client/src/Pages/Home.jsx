// Home.jsx
import React, { lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Home/Hero";
import FeatureListSkeleton from "../loaders/FeatureListSkeleton";
import FeatureProductsSkeleton from "../loaders/FeatureProductsSkeleton";
import WhyUs from "../components/Home/WhyUs";

const FeatureProduct = lazy(() => import("../components/Home/FeatureProduct"));
const FeatureList = lazy(() => import("../components/Home/FeatureList"));
const TrustedBy = lazy(() => import("../components/Home/TrustedBy"));

const Home = () => {
  return (
    <div className="">
      <Hero />
        <FeatureProduct />
      <Suspense fallback={<FeatureListSkeleton />}>
      {/* <WhyUs /> */}
      </Suspense>
      <Suspense fallback={<FeatureProductsSkeleton />}>
        <TrustedBy />
      </Suspense>
      <Suspense fallback={<FeatureProductsSkeleton />}>
        <FeatureList />
      </Suspense>
    </div>
  );
};

export default Home;
