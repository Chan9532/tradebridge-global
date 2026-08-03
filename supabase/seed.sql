insert into public.categories(name,slug,description,image_url) values
('Industrial Machinery','industrial-machinery','Production machinery and factory systems','/forklift-warehouse.jpg'),
('Forklifts','forklifts','Material handling and warehouse equipment','/forklift-warehouse.jpg'),
('Construction Equipment','construction-equipment','Earthmoving and job-site equipment','/port-logistics.jpg'),
('Auto Parts','auto-parts','Engines and replacement components','/forklift-warehouse.jpg'),
('Plastics and Chemicals','plastics-chemicals','Polymers, additives and industrial chemicals','/port-logistics.jpg'),
('Packaging Materials','packaging-materials','Bags, films, tarpaulins and fabrics','/port-logistics.jpg'),
('Agricultural Equipment','agricultural-equipment','Farm and processing machinery','/forklift-warehouse.jpg'),
('Electrical & Engineering','electrical-engineering','Pumps, motors and engineering products','/port-logistics.jpg') on conflict(slug) do nothing;
insert into public.articles(title,slug,category,excerpt,content,featured_image,published) values
('Used machinery export market: what buyers should verify','used-machinery-export-guide','Machinery Export','A practical checklist for export buyers.','Use a structured inspection and commercial comparison process.','/forklift-warehouse.jpg',true),
('India to Africa: six sourcing categories gaining momentum','india-africa-trade-opportunities','Africa Trade','Where manufacturing strengths align with demand.','Engineering, packaging and agricultural supply remain active categories.','/port-logistics.jpg',true),
('Polymer and flexible packaging trends for global buyers','polymer-packaging-market-trends','Market Trends','How recycled content and freight influence quotes.','Compare resin grade, test data, packaging and shipment terms.','/port-logistics.jpg',true) on conflict(slug) do nothing;
