import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { ProductFilters } from "@/components/products/product-filters";
export const metadata: Metadata = { title: "Products", description: "Browse approved machinery, industrial products, materials and engineering goods sourced from Japan and India." };
export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) { const q=await searchParams; return <><PageHero eyebrow="Approved sourcing options" title="Products from trusted supply markets" description="Browse representative products or send us a custom requirement. Supplier contact information remains confidential throughout the matching process."/><ProductFilters initialCategory={q.category || ""}/></>; }
