
-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS ReadmeDb;
USE RegistroLibros;

-- Tabla Usuario
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(100) NOT NULL
);

-- Tabla Libro
CREATE TABLE Libro (
    id_libro INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255),
    genero VARCHAR(100),
    isbn VARCHAR(20),
    fecha_inicio DATE,
    fecha_fin DATE,
    lugar_fin VARCHAR(100),
    paginas INT,
    puntaje INT CHECK (puntaje BETWEEN 1 AND 5),
    comentario TEXT,
    imagen_url VARCHAR(255),
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id_usuario)
);

-- Tabla Anotacion
CREATE TABLE Anotacion (
    id_anotacion INT AUTO_INCREMENT PRIMARY KEY,
    pagina INT NOT NULL,
    texto TEXT,
    fecha DATE,
    libro_id INT NOT NULL,
    FOREIGN KEY (libro_id) REFERENCES Libro(id_libro)
);
