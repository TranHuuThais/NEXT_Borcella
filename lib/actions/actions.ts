import Customer from "../models/Customer";
import Order from "../models/Order";
import { connectToDB } from "../mongoDB"

export const getCollections = async () => {
  const collections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collectionHome`)
  return await collections.json()
}

export const getCollectionDetails = async (collectionId: string) => {
  const collection = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collectionHome/${collectionId}`);
  const data = await collection.json();
  return data;  // Ensure this data includes the 'image' property
};


export const getProducts = async () => {
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productHome`)
  return await products.json()
}
    
export const getProductDetails = async (productId: string) => {
  const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productHome/${productId}`)
  return await product.json()
}




export const getSearchedProducts = async (query: string) => {
  const searchedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`)
  return await searchedProducts.json()
}

export const getOrders = async (customerId: string) => {
  try {
    const ordersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orderHome/customers/${customerId}`);

    if (!ordersResponse.ok) {
      throw new Error(`Failed to fetch orders: ${ordersResponse.status} ${ordersResponse.statusText}`);
    }

    const ordersData = await ordersResponse.json(); 
    return ordersData;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error; // Rethrow the error to propagate it to the caller
  }
};



export const getRelatedProducts = async (productId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productHome/${productId}/related`);
    
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Error fetching related products: ${response.status} ${response.statusText}`);
    }

    // Attempt to parse the response as JSON
    const relatedProducts = await response.json();
    return relatedProducts;
  } catch (error) {
    // Log the error to the console (or handle it in an appropriate way)
    console.error('Failed to fetch related products:', error);
    return null; // or handle the error appropriately
  }
};






export const getTotalSales = async () => {
  await connectToDB();
  const orders = await Order.find()
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0)
  return { totalOrders, totalRevenue }
}

export const getTotalCustomers = async () => {
  await connectToDB();
  const customers = await Customer.find()
  const totalCustomers = customers.length
  return totalCustomers
}

export const getSalesPerMonth = async () => {
  await connectToDB()
  const orders = await Order.find()

  const salesPerMonth = orders.reduce((acc, order) => {
    const monthIndex = new Date(order.createdAt).getMonth(); // 0 for Janruary --> 11 for December
    acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
    // For June
    // acc[5] = (acc[5] || 0) + order.totalAmount (orders have monthIndex 5)
    return acc
  }, {})

  const graphData = Array.from({ length: 12}, (_, i) => {
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, i))
    // if i === 5 => month = "Jun"
    return { name: month, sales: salesPerMonth[i] || 0 }
  })

  return graphData
}