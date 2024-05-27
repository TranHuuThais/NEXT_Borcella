import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  console.log('Rendering ProductCard with product ID:', product._id);
  
  return (
    <Link
      href={`/productHome/${product._id}`} // Corrected the href to include product ID
      className="w-[220px] flex flex-col gap-2"
    >
      {product.media && product.media.length > 0 ? (
        <Image
          src={product.media[0]}
          alt="product"
          width={250}
          height={300}
          className="h-[250px] rounded-lg object-cover"
        />
      ) : (
        <div className="h-[250px] w-[250px] bg-gray-200 rounded-lg flex items-center justify-center">
          <span>No Image Available</span>
        </div>
      )}
      <div>
        <p className="text-base-bold">{product.title}</p>
        <p className="text-small-medium text-grey-2">{product.category}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-body-bold">${product.price}</p>
        <HeartFavorite product={product} updateSignedInUser={updateSignedInUser} />
      </div>
    </Link>
  );
};

export default ProductCard;
