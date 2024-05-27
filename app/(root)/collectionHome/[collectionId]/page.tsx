import React from "react";
import Image from "next/image";
import ProductCard from "@/components/home/ProductCard";
import { getCollectionDetails } from "@/lib/actions/actions";

const CollectionDetails = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const collectionDetails = await getCollectionDetails(params.collectionId);

  console.log(collectionDetails); // Ensure this logs the expected data

  return (
    <div className="px-10 py-5 flex flex-col items-center gap-8">
      {collectionDetails.image ? (
        <Image
          src={collectionDetails.image}
          width={1500}
          height={1000}
          alt="collection"
          className="w-full h-[400px] object-cover rounded-xl"
        />
      ) : (
        <div className="w-full h-[400px] bg-gray-200 rounded-xl flex items-center justify-center">
          <span>No Image Available</span>
        </div>
      )}
      <p className="text-heading3-bold text-grey-2">
        {collectionDetails.title}
      </p>
      <p className="text-body-normal text-grey-2 text-center max-w-[900px]">
        {collectionDetails.description}
      </p>
      <div className="flex flex-wrap gap-16 justify-center">
        {collectionDetails.products.map(
          (product: ProductType, index: number) => (
            <ProductCard key={`${product._id}-${index}`} product={product} />
          )
        )}
      </div>
    </div>
  );
};

export default CollectionDetails;
