-- ============================================
-- CRIAR TABELA DE CUPONS NO SUPABASE
-- ============================================
-- Copia e cola este script no SQL Editor do Supabase
-- e clica em "Run"

-- 1. Criar a tabela de cupons
CREATE TABLE IF NOT EXISTS public.cupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE,
  desconto INTEGER NOT NULL DEFAULT 15,
  descricao TEXT DEFAULT 'Desconto promocional',
  usado BOOLEAN DEFAULT false,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  expira_em DATE DEFAULT '2026-07-19'
);

-- 2. Ativar segurança (RLS)
ALTER TABLE public.cupons ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de acesso público
CREATE POLICY "Permitir leitura de cupons" ON public.cupons 
  FOR SELECT TO anon USING (true);

CREATE POLICY "Permitir inserção de cupons" ON public.cupons 
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Permitir atualização de cupons" ON public.cupons 
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- 4. Inserir alguns cupons de exemplo
INSERT INTO public.cupons (codigo, desconto, descricao, expira_em) VALUES
  ('COPA2026', 15, '15% OFF — FIFA World Cup 2026', '2026-07-19'),
  ('VERAO2026', 10, '10% OFF — Promoção Verão', '2026-08-31'),
  ('GG10', 10, '10% OFF — Cliente Fiel', '2026-12-31'),
  ('ANIVERSARIO', 20, '20% OFF — Mês de Aniversário', '2026-12-31')
ON CONFLICT (codigo) DO NOTHING;
