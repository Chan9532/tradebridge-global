import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { InsightLibrary } from "@/components/insights/insight-library";
export const metadata:Metadata={title:"Market Insights",description:"Practical international trade analysis across machinery, materials, logistics, customs, finance and global business opportunities."};
export default function MarketInsightsPage(){return <><PageHero eyebrow="Trade intelligence" title="Market insights for international business" description="Practical analysis for buyers, importers, exporters, manufacturers and trading companies making cross-border sourcing decisions."/><InsightLibrary/></>}
