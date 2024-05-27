"use client";
import ProductCard from "@/components/home/ProductCard";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const Wishlist = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
      // Fetch the wishlist of the signed-in user
      const fetchWishlist = async () => {
        try {
          const res = await fetch("/api/users");
          const data = await res.json();
          if (data && data.wishlist) {
            setWishlist(data.wishlist);
          }
          setLoading(false);
        } catch (err) {
          console.error("Error fetching wishlist:", err);
          setLoading(false);
        }
      };
      fetchWishlist();
    }
  }, [user]);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Your Wishlist</p>
      {wishlist.length === 0 && <p>No items in your wishlist</p>}

      <div className="flex flex-wrap justify-center gap-16">
        {wishlist.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
