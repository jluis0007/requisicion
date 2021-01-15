CREATE DATABASE requisiciones;

USE requisiciones;

-- TABLE CATALOGOS ********************
CREATE TABLE catalogos (
  id INT(11) NOT NULL,
  tipo VARCHAR(100) NOT NULL
);
ALTER TABLE catalogos
  ADD PRIMARY KEY (id);

ALTER TABLE catalogos
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

  INSERT INTO catalogos (id, tipo)
  VALUES (1, 'lápiz');
  INSERT INTO catalogos (id, tipo) 
  VALUES (2, 'pluma');
  INSERT INTO catalogos (id, tipo) 
  VALUES (3, 'Marca textos');
  INSERT INTO catalogos (id, tipo) 
  VALUES (4, 'cuaderno');

-- ARTICULOS TABLE **********************************
CREATE TABLE articulos (
  id INT(11) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  tipo VARCHAR(100) NOT NULL,
  foto VARCHAR(200) NOT NULL
);

ALTER TABLE articulos
  ADD PRIMARY KEY (id);

ALTER TABLE articulos
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

-- TABLE DEPARTAMENTOS *****************
CREATE TABLE departamentos (
  id INT(11) NOT NULL,
  depto VARCHAR(100) NOT NULL
);
ALTER TABLE departamentos
  ADD PRIMARY KEY (id);

ALTER TABLE departamentos
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

INSERT INTO departamentos (id, depto) 
  VALUES (1, 'sistemas');
  INSERT INTO departamentos (id, depto) 
  VALUES (2, 'fiscalización a municipios');
  INSERT INTO departamentos (id, depto) 
  VALUES (3, 'obra publica');
  INSERT INTO departamentos (id, depto) 
  VALUES (4, 'Auditorías especiales');
    INSERT INTO departamentos (id, depto) 
  VALUES (5, 'organismos descentralizados');
  INSERT INTO departamentos (id, depto) 
  VALUES (6, 'administración y finanzas');
  INSERT INTO departamentos (id, depto) 
  VALUES (7, 'oficina del auditor superior');
    INSERT INTO departamentos (id, depto) 
  VALUES (8, 'oficina del auditor general a');
  INSERT INTO departamentos (id, depto) 
  VALUES (9, 'oficina del auditor general b');
   INSERT INTO departamentos (id, depto) 
  VALUES (10, 'unidad jurídica');
  INSERT INTO departamentos (id, depto) 
  VALUES (11, 'auditoría al desempeño');
  INSERT INTO departamentos (id, depto) 
  VALUES (12, 'coordinación de capacitación');
    INSERT INTO departamentos (id, depto) 
  VALUES (13, 'contraloría interna');
      INSERT INTO departamentos (id, depto) 
  VALUES (14, 'declaraciones');

-- TABLE CARGOS *****************************
CREATE TABLE cargos (
  id INT(11) NOT NULL,
  cargo VARCHAR(100) NOT NULL
);
ALTER TABLE cargos
  ADD PRIMARY KEY (id);

ALTER TABLE cargos
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT;


INSERT INTO cargos (id, cargo)
  VALUES (1, 'director');
  INSERT INTO cargos (id, cargo)
  VALUES (2, 'supervisor');
  INSERT INTO cargos (id, cargo) 
  VALUES (3, 'operativo');

-- TABLE USER**********************************
-- all pasword wil be encrypted using SHA1
CREATE TABLE users (
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL,
  depto VARCHAR(100) NOT NULL,
  cargo VARCHAR(15) NOT NULL,
  rol VARCHAR(20) NOT NULL,
  id_sup INT(11)
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

INSERT INTO users (id, username, password, fullname, depto, cargo, rol, id_sup) 
  VALUES (1, 'magdacasas', '123', 'magda casas','administración y finanzas','operativo','admin',null);
INSERT INTO users (id, username, password, fullname, depto, cargo, rol, id_sup) 
  VALUES (2, 'jmanuel', '123', 'juan manuel aragón rodríguez','sistemas','supervisor','superuser',1);
INSERT INTO users (id, username, password, fullname, depto, cargo, rol, id_sup) 
  VALUES (3, 'menny', '123', 'tomas manuel ortega patiño','sistemas','operativo','user',2);
INSERT INTO users (id, username, password, fullname, depto, cargo, rol, id_sup) 
  VALUES (4, 'luiss', '123', 'luis ángel soto','sistemas','operativo','user',2);
INSERT INTO users (id, username, password, fullname, depto, cargo, rol, id_sup) 
  VALUES (5, 'luiss', '123', 'luis gabriel rodríguez lópez','sistemas','operativo','user',2);
INSERT INTO users (id, username, password, fullname, depto, cargo, rol, id_sup) 
  VALUES (6, 'gab', '123', 'luis gabriel rodríguez lópez','sistemas','operativo','user',2);

INSERT INTO users (id, username, password, fullname, depto, cargo, rol, id_sup) 
  VALUES (7, 'alecastro', '123', 'alejandra castro limones','fiscalización a municipios','supervisor','superuser',1);
  INSERT INTO users (id, username, password, fullname, depto, cargo, rol, id_sup) 
  VALUES (8, 'dianaguzman', '123', 'diana guzmán najera','fiscalización a municipios','operativo','user',7);

SELECT * FROM users;



-- PEDIDO TABLE **********************************
CREATE TABLE pedidos (
  id INT(11) NOT NULL,
  articulo_id INT(11) NOT NULL,
  user_id INT(11) NOT NULL,
  mes smallint NOT NULL,
  anio year NOT NULL,
  cantidad INT(11) NOT NULL DEFAULT '1',
  estatus smallint NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_art FOREIGN KEY(articulo_id) REFERENCES articulos(id),
  CONSTRAINT fk_ped FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE pedidos
  ADD PRIMARY KEY (id);

ALTER TABLE pedidos
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT;