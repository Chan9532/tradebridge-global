export type CatalogItem = { id: string; name: string; slug: string; shortDescription: string };
export type CatalogCategory = { id: string; name: string; slug: string; description: string; image: string; products: CatalogItem[] };

const slugify = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const descriptions: Record<string, string> = {
  "Injection moulding machines": "Hydraulic, hybrid and all-electric systems for precision plastics production.",
  "Electric forklifts": "Clean, efficient warehouse equipment for indoor material handling.",
  Excavators: "Crawler and wheeled excavators for construction, mining and infrastructure.",
  Engines: "Tested new, used and reconditioned automotive power units.",
  "PLC systems": "Industrial control platforms and compatible automation components.",
  PP: "Prime, off-grade and recycled polypropylene for manufacturing applications.",
  "PP woven bags": "Custom printed sacks for agriculture, chemicals and industrial packaging.",
  "Steel scrap": "Ferrous recycling grades for mills and industrial consumers.",
  "Industrial chemicals": "Production inputs sourced against specification and regulatory requirements.",
  Rice: "Export-grade varieties with packing and inspection options.",
  "Electric cables": "Power, control and industrial cable products for projects and distribution.",
};
const makeItems = (names: string[]): CatalogItem[] => names.map(name => ({ id: slugify(name), name, slug: slugify(name), shortDescription: descriptions[name] || `Sourcing options arranged to match specification, quantity, origin and destination requirements.` }));
const category = (name: string, description: string, image: string, names: string[]): CatalogCategory => ({ id: slugify(name), name, slug: slugify(name), description, image, products: makeItems(names) });

export const productCatalog: CatalogCategory[] = [
  category("Industrial Machinery", "Production, processing and plant equipment for manufacturers, converters and industrial projects.", "/forklift-warehouse.jpg", ["Injection moulding machines","Extrusion machines","Blow moulding machines","Packaging machines","Printing machines","CNC machines","Press machines","Food-processing machinery","Textile machinery","Air compressors","Industrial generators","Used production lines"]),
  category("Forklifts and Warehouse Equipment", "Material-handling equipment, replacement components and warehouse infrastructure.", "/forklift-warehouse.jpg", ["Electric forklifts","Diesel forklifts","LPG forklifts","Reach trucks","Hand pallet trucks","Forklift batteries","Forklift tyres","Forklift spare parts","Warehouse racks","Material-handling equipment"]),
  category("Construction Equipment", "Heavy and compact equipment for earthmoving, roads, construction and infrastructure.", "/port-logistics.jpg", ["Excavators","Mini excavators","Wheel loaders","Bulldozers","Cranes","Road rollers","Dump trucks","Concrete equipment","Construction machinery parts"]),
  category("Automotive and Auto Parts", "Vehicles, powertrain components and replacement parts for distributors, fleets and workshops.", "/forklift-warehouse.jpg", ["Used passenger vehicles","Commercial vehicles","Trucks","Buses","Engines","Gearboxes","Suspension parts","Brake parts","Hybrid batteries","Filters","Bearings","Body parts","Motorcycle parts"]),
  category("Factory Automation", "Controls, robotics and electrical components for factory upgrades and maintenance.", "/forklift-warehouse.jpg", ["PLC systems","Servo motors","Inverters","Industrial robots","Sensors","Control panels","Human-machine interfaces","Automation spare parts","Used factory equipment"]),
  category("Plastics and Polymers", "Prime, off-grade and recycled materials for moulding, extrusion, film and compounding.", "/port-logistics.jpg", ["PP","HDPE","LDPE","LLDPE","PET","PVC","PS","ABS","HIPS","Engineering plastics","Recycled granules","Regrind","Plastic flakes","Off-grade materials","Plastic additives","Masterbatch"]),
  category("Packaging Materials", "Flexible, rigid and industrial packaging formats for repeat international supply.", "/port-logistics.jpg", ["PP woven bags","FIBC jumbo bags","Flexible packaging","Plastic films","PET preforms","Bottles","Caps and closures","Corrugated boxes","Food packaging","Industrial packaging","PVC tarpaulin rolls"]),
  category("Metals and Scrap", "Ferrous and non-ferrous materials for recycling, fabrication and industrial consumption.", "/port-logistics.jpg", ["Steel scrap","Aluminium scrap","Copper scrap","Stainless-steel scrap","Brass scrap","Used machinery scrap","Industrial metal waste","Metal ingots","Metal coils","Metal sheets"]),
  category("Chemicals", "Industrial and specialty chemical products sourced with attention to specification and compliance.", "/port-logistics.jpg", ["Industrial chemicals","Plastic additives","Adhesives","Coatings","Printing inks","Cleaning chemicals","Water-treatment chemicals","Lubricants","Solvents","Specialty chemicals"]),
  category("Agricultural and Food Products", "Food commodities, ingredients and agricultural equipment for importers and projects.", "/forklift-warehouse.jpg", ["Rice","Pulses","Spices","Sugar","Tea","Coffee","Food ingredients","Agricultural machinery","Water pumps","Irrigation equipment","Food-processing equipment"]),
  category("Electrical and Energy Products", "Electrical distribution, renewable energy and industrial power equipment.", "/port-logistics.jpg", ["Electric cables","Transformers","Switchgear","Circuit breakers","LED lighting","Solar panels","Solar inverters","Batteries","Electric motors","Generators","Industrial pumps"]),
];

export const catalogItemCount = productCatalog.reduce((sum, category) => sum + category.products.length, 0);
export function findCatalogItem(id: string) { for (const category of productCatalog) { const item = category.products.find(product => product.id === id); if (item) return { ...item, category: category.name }; } return null; }
