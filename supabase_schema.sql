-- Crea la tabella per le categorie
CREATE TABLE IF NOT EXISTS warehouse_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    sub TEXT[] DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Crea la tabella per gli articoli
CREATE TABLE IF NOT EXISTS warehouse_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT REFERENCES warehouse_categories(name),
    subcategory TEXT,
    format TEXT,
    quantity INTEGER DEFAULT 0,
    min_threshold INTEGER DEFAULT 10,
    price DECIMAL(10,2) DEFAULT 0.00,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Inserisci dati iniziali di esempio (Opzionale)
INSERT INTO warehouse_categories (name, sub) VALUES 
('Alimentari', ARRAY['Freschi', 'Secchi', 'Conserve']),
('Beverage', ARRAY['Acqua', 'Vini', 'Birre', 'Soft Drinks']),
('Pulizia', ARRAY['Cucina', 'Sale', 'Personale']),
('Attrezzatura', ARRAY['Cucina', 'Sala', 'Manutenzione'])
ON CONFLICT (name) DO NOTHING;
