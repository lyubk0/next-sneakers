ALTER TABLE size 
  ALTER COLUMN eur_size TYPE varchar(10) 
  USING trim(trailing '0' from trim(trailing '.' from eur_size::text));

ALTER TABLE size 
  ALTER COLUMN cm_size TYPE varchar(10) 
  USING trim(trailing '0' from trim(trailing '.' from cm_size::text));