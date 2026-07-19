import type { Metadata } from "next";
import { ProductIndustries } from "@/components/products/product-industries";
export const metadata: Metadata = { title: "Products and Industries We Serve", description: "Explore machinery, equipment, materials, packaging, agricultural and energy products available through our international sourcing network." };
export default function ProductsPage(){return <ProductIndustries/>}
