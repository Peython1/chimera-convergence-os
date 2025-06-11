
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useSupabaseData<T>(
  table: string,
  options?: {
    select?: string;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
  }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [table]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from(table).select(options?.select || '*');

      if (options?.orderBy) {
        query = query.order(options.orderBy.column, { 
          ascending: options.orderBy.ascending ?? true 
        });
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data: result, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setData(result || []);
    } catch (err: any) {
      setError(err.message);
      console.error(`Error fetching ${table}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const insert = async (values: Partial<T>) => {
    try {
      const { data: result, error: insertError } = await supabase
        .from(table)
        .insert(values)
        .select();

      if (insertError) throw insertError;

      if (result) {
        setData(prev => [...prev, ...result]);
      }
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const update = async (id: string, values: Partial<T>) => {
    try {
      const { data: result, error: updateError } = await supabase
        .from(table)
        .update(values)
        .eq('id', id)
        .select();

      if (updateError) throw updateError;

      if (result) {
        setData(prev => prev.map(item => 
          (item as any).id === id ? result[0] : item
        ));
      }
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const remove = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      setData(prev => prev.filter(item => (item as any).id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    insert,
    update,
    remove
  };
}
