export const categories = [
  { name: "Industrial Machinery", slug: "industrial-machinery", description: "CNC, moulding and production machinery sourced from qualified factories.", image: "/forklift-warehouse.jpg" },
  { name: "Forklifts", slug: "forklifts", description: "Used forklifts and warehouse handling equipment.", image: "/forklift-warehouse.jpg" },
  { name: "Construction Equipment", slug: "construction-equipment", description: "Excavators, loaders, cranes and dependable job-site equipment.", image: "/port-logistics.jpg" },
  { name: "Auto Parts", slug: "auto-parts", description: "Engines, drivetrains and replacement parts for global markets.", image: "/forklift-warehouse.jpg" },
  { name: "Plastics and Chemicals", slug: "plastics-chemicals", description: "Prime and recycled polymers, additives and industrial chemicals.", image: "/port-logistics.jpg" },
  { name: "Packaging Materials", slug: "packaging-materials", description: "PP woven bags, films, tarpaulins and industrial fabrics.", image: "/port-logistics.jpg" },
  { name: "Agricultural Equipment", slug: "agricultural-equipment", description: "Tractors, implements, processing and irrigation equipment.", image: "/forklift-warehouse.jpg" },
  { name: "Electrical & Engineering", slug: "electrical-engineering", description: "Pumps, motors, panels and precision engineering products.", image: "/port-logistics.jpg" },
];

export const products = [
  { name: "Toyota 8FG25 Forklift", slug: "toyota-8fg25-forklift", category: "Forklifts", origin: "International", condition: "Used", spec: "2.5 ton LPG, 4.3 m mast, solid tyres", moq: "1 unit", packaging: "RoRo or container", status: "Available", image: "/forklift-warehouse.jpg", description: "Export-ready Toyota forklift with operating video and condition report available on request.", application: "Warehousing, factories and container yards" },
  { name: "JSW Injection Moulding Machine", slug: "jsw-injection-moulding-machine", category: "Industrial Machinery", origin: "International", condition: "Used", spec: "180 ton electric, 2016, controller included", moq: "1 unit", packaging: "Export crating", status: "Inspection available", image: "/forklift-warehouse.jpg", description: "Energy-efficient all-electric moulding machine from a working industrial facility.", application: "Precision plastic component manufacturing" },
  { name: "Heavy-Duty PVC Tarpaulin Roll", slug: "pvc-tarpaulin-roll", category: "Packaging Materials", origin: "India", condition: "New", spec: "650 GSM, 1.83 m width, UV treated", moq: "5,000 m", packaging: "Rolls with kraft paper", status: "Made to order", image: "/port-logistics.jpg", description: "Waterproof PVC-coated polyester fabric in custom colours and weights.", application: "Truck covers, tents and industrial curtains" },
  { name: "Kirloskar Centrifugal Pump", slug: "kirloskar-centrifugal-pump", category: "Electrical & Engineering", origin: "India", condition: "New", spec: "50 m³/hr, 32 m head, cast iron body", moq: "10 units", packaging: "Wooden cases", status: "Available", image: "/port-logistics.jpg", description: "Industrial water pump supplied with test certificate and export documentation.", application: "Water transfer and industrial utilities" },
  { name: "Komatsu PC200 Excavator", slug: "komatsu-pc200-excavator", category: "Construction Equipment", origin: "International", condition: "Used", spec: "20 ton class, 2018, 5,800 hours", moq: "1 unit", packaging: "RoRo", status: "Under offer", image: "/port-logistics.jpg", description: "Well-maintained crawler excavator with inspection support and shipment coordination.", application: "Construction, mining and earthmoving" },
  { name: "PP Woven Export Sacks", slug: "pp-woven-export-sacks", category: "Packaging Materials", origin: "India", condition: "New", spec: "25–50 kg, laminated, custom print", moq: "50,000 bags", packaging: "Bales", status: "Made to order", image: "/port-logistics.jpg", description: "Food and industrial-grade woven sacks with flexographic printing options.", application: "Grain, fertilizer and industrial packaging" },
  { name: "Reconditioned Diesel Engine 1KD", slug: "reconditioned-diesel-engine-1kd", category: "Auto Parts", origin: "International", condition: "Used", spec: "Complete long block, compression tested", moq: "5 units", packaging: "Palletized crates", status: "Available", image: "/forklift-warehouse.jpg", description: "Tested engines sourced from licensed dismantlers.", application: "Automotive replacement and fleet maintenance" },
  { name: "Recycled HDPE Granules", slug: "recycled-hdpe-granules", category: "Plastics and Chemicals", origin: "India", condition: "New", spec: "Black, MFI 0.8–1.2, washed", moq: "25 MT", packaging: "25 kg bags", status: "Available", image: "/port-logistics.jpg", description: "Consistent post-consumer HDPE compound with batch test report.", application: "Pipes, pallets and non-food moulding" },
];

export const opportunities = [
  ["Used Toyota forklifts", "International", "East Africa", "2 units", "Open"],
  ["PVC tarpaulin rolls", "India", "West Africa", "20,000 m", "Quoting"],
  ["Injection moulding machines", "International", "Middle East", "1 line", "Inspection ready"],
  ["PP woven bags", "India", "Southern Africa", "100,000 bags", "Open"],
  ["Used excavators", "International", "Southeast Asia", "3 units", "Limited"],
  ["Industrial water pumps", "India", "East Africa", "25 units", "Open"],
];

export const rfqs = [
  { product: "Used 3-ton diesel forklifts", destination: "Kenya", quantity: "4 units", specification: "Toyota or Komatsu, max 8,000 hours, 4.5 m mast", purchaseDate: "September 2026", status: "Open", posted: "2026-07-16", category: "Forklifts" },
  { product: "PVC tarpaulin 550 GSM", destination: "Ghana", quantity: "1 × 40 ft container", specification: "Blue, 2 m width, UV stabilized, eyelet-ready", purchaseDate: "August 2026", status: "Offers received", posted: "2026-07-13", category: "Packaging Materials" },
  { product: "Recycled PP granules", destination: "UAE", quantity: "50 MT", specification: "Black injection grade, MFI 10–15", purchaseDate: "October 2026", status: "Open", posted: "2026-07-10", category: "Plastics and Chemicals" },
  { product: "Water-cooled diesel engines", destination: "Tanzania", quantity: "20 units", specification: "18–25 HP for agricultural pumps, spares included", purchaseDate: "November 2026", status: "Open", posted: "2026-07-08", category: "Electrical & Engineering" },
  { product: "Used Komatsu excavators", destination: "Bangladesh", quantity: "2 units", specification: "PC200 class, 2017 or newer, inspection required", purchaseDate: "September 2026", status: "Matching", posted: "2026-07-05", category: "Construction Equipment" },
];

export const suppliers = [
  { name: "Global Industrial Equipment Co.", country: "International", categories: ["Forklifts", "Industrial Machinery"], markets: "Africa, Southeast Asia, Middle East", description: "Licensed exporter of inspected used material-handling and factory equipment.", verified: true },
  { name: "Bharat Technical Textiles Pvt. Ltd.", country: "India", categories: ["Packaging Materials"], markets: "East Africa, GCC, Europe", description: "Manufacturer of PVC-coated fabrics, tarpaulins and custom industrial covers.", verified: true },
  { name: "Western Flow Engineering", country: "India", categories: ["Electrical & Engineering"], markets: "Africa, South Asia", description: "ISO-certified manufacturer of centrifugal pumps and engineered fluid systems.", verified: true },
  { name: "Global Auto Recyclers", country: "International", categories: ["Auto Parts"], markets: "UAE, Africa, Caribbean", description: "Traceable used engines and automotive components from licensed recycling yards.", verified: true },
];

export const articles = [
  { title: "Used machinery export market: what buyers should verify", slug: "used-machinery-export-guide", category: "Machinery Export", date: "2026-07-11", excerpt: "A practical checklist for inspection records, operating hours, dismantling and export documentation.", image: "/forklift-warehouse.jpg" },
  { title: "India to Africa: six sourcing categories gaining momentum", slug: "india-africa-trade-opportunities", category: "Africa Trade", date: "2026-07-04", excerpt: "Where Indian manufacturing strengths align with African infrastructure and industrial demand.", image: "/port-logistics.jpg" },
  { title: "Polymer and flexible packaging trends for global buyers", slug: "polymer-packaging-market-trends", category: "Market Trends", date: "2026-06-28", excerpt: "How recycled content, freight and regional capacity are influencing quotes and lead times.", image: "/port-logistics.jpg" },
];
