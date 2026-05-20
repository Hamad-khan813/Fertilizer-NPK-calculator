-- Create the table
CREATE TABLE public.npk_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) NOT NULL,
    application_date timestamp with time zone DEFAULT now() NOT NULL,
    use_case varchar(50) NOT NULL,
    fertilizer_id varchar(100) NOT NULL,
    amount_g numeric NOT NULL,
    volume_l numeric NOT NULL,
    target_n numeric NOT NULL,
    target_p numeric NOT NULL,
    target_k numeric NOT NULL,
    notes text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.npk_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own logs."
    ON public.npk_logs
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own logs."
    ON public.npk_logs
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own logs."
    ON public.npk_logs
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own logs."
    ON public.npk_logs
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create an index on user_id for faster queries
CREATE INDEX idx_npk_logs_user_id ON public.npk_logs(user_id);
