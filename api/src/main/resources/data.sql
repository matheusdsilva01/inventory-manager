INSERT INTO public.raw_materials (quantity, id, code, name) VALUES (250, '440d1ce0-56dd-4621-93db-aa4efe5b17b1', 'wood-0001', 'wood') ON CONFLICT DO NOTHING;
INSERT INTO public.raw_materials (quantity, id, code, name) VALUES (150, '5efe2628-a065-4ab8-9dce-bb8cb4e12da4', 'platic-0001', 'plastic') ON CONFLICT DO NOTHING;
INSERT INTO public.raw_materials (quantity, id, code, name) VALUES (50, 'eca26014-ee19-44b5-80e8-2f0a616a6236', 'metal-0001', 'metal') ON CONFLICT DO NOTHING;
INSERT INTO public.raw_materials (quantity, id, code, name) VALUES (25, '10dff191-9cc9-488b-a49c-7282cbb275c0', 'paper-0001', 'paper') ON CONFLICT DO NOTHING;
INSERT INTO public.raw_materials (quantity, id, code, name) VALUES (10, '48b3064f-f202-44cf-8fc3-04965ac07755', 'iron-lingot-0001', 'iron lingot') ON CONFLICT DO NOTHING;


INSERT INTO public.products (price, id, code, name) VALUES (50, '1b29c23a-4233-4ff8-b150-1c4fc1dd9a5e', 'chair-001', 'cadeira de madeira') ON CONFLICT DO NOTHING;
INSERT INTO public.products (price, id, code, name) VALUES (25, 'cbaf2274-156a-4d2a-8ce8-31f3e43217a9', 'plastic-chair-0001', 'cadeira de plastico') ON CONFLICT DO NOTHING;

INSERT INTO public.recipes (id, product_id) VALUES ('1d1b6d3c-b43d-4b98-bff1-0ec43c6ce45b', '1b29c23a-4233-4ff8-b150-1c4fc1dd9a5e') ON CONFLICT DO NOTHING;
INSERT INTO public.recipes (id, product_id) VALUES ('fbb4d551-ee30-4506-9f61-c19be49803a0', 'cbaf2274-156a-4d2a-8ce8-31f3e43217a9') ON CONFLICT DO NOTHING;

INSERT INTO public.recipe_items (quantity, raw_material_id, recipe_id) VALUES (10, '440d1ce0-56dd-4621-93db-aa4efe5b17b1', '1d1b6d3c-b43d-4b98-bff1-0ec43c6ce45b') ON CONFLICT DO NOTHING;
INSERT INTO public.recipe_items (quantity, raw_material_id, recipe_id) VALUES (25, '5efe2628-a065-4ab8-9dce-bb8cb4e12da4', 'fbb4d551-ee30-4506-9f61-c19be49803a0') ON CONFLICT DO NOTHING;
