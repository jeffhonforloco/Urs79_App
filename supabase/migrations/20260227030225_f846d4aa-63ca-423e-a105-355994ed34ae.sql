
-- Create products table for merchandise
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  compare_at_price DECIMAL(10,2),
  image_url TEXT,
  category TEXT DEFAULT 'merchandise',
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  stock_quantity INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public can view published products
CREATE POLICY "Anyone can view published products"
ON public.products FOR SELECT
USING (is_published = true);

-- Admins can do everything
CREATE POLICY "Admins can manage products"
ON public.products FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Trigger for updated_at
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
