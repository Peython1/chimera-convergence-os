
import { supabase } from '@/integrations/supabase/client';

export interface FileSystemItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  parent_path: string;
  full_path: string;
  content?: string;
  size?: number;
  mime_type?: string;
  created_at: string;
  updated_at: string;
}

class FileSystemService {
  async getItems(parentPath: string = '/'): Promise<FileSystemItem[]> {
    const { data, error } = await supabase
      .from('file_system')
      .select('*')
      .eq('parent_path', parentPath)
      .order('type', { ascending: false }) // folders first
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching file system items:', error);
      return [];
    }

    return data || [];
  }

  async createFolder(name: string, parentPath: string): Promise<FileSystemItem | null> {
    const fullPath = parentPath === '/' ? `/${name}` : `${parentPath}/${name}`;
    
    const { data, error } = await supabase
      .from('file_system')
      .insert({
        name,
        type: 'folder',
        parent_path: parentPath,
        full_path: fullPath
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating folder:', error);
      throw error;
    }

    return data;
  }

  async createFile(name: string, parentPath: string, content: string = ''): Promise<FileSystemItem | null> {
    const fullPath = parentPath === '/' ? `/${name}` : `${parentPath}/${name}`;
    
    const { data, error } = await supabase
      .from('file_system')
      .insert({
        name,
        type: 'file',
        parent_path: parentPath,
        full_path: fullPath,
        content,
        size: content.length,
        mime_type: this.getMimeType(name)
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating file:', error);
      throw error;
    }

    return data;
  }

  async updateFile(id: string, content: string): Promise<void> {
    const { error } = await supabase
      .from('file_system')
      .update({
        content,
        size: content.length,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating file:', error);
      throw error;
    }
  }

  async deleteItem(id: string): Promise<void> {
    const { error } = await supabase
      .from('file_system')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  }

  async getFileContent(id: string): Promise<string | null> {
    const { data, error } = await supabase
      .from('file_system')
      .select('content')
      .eq('id', id)
      .eq('type', 'file')
      .single();

    if (error) {
      console.error('Error fetching file content:', error);
      return null;
    }

    return data?.content || '';
  }

  private getMimeType(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();
    const mimeTypes: { [key: string]: string } = {
      'txt': 'text/plain',
      'md': 'text/markdown',
      'json': 'application/json',
      'js': 'text/javascript',
      'ts': 'text/typescript',
      'html': 'text/html',
      'css': 'text/css',
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'gif': 'image/gif',
      'pdf': 'application/pdf'
    };

    return mimeTypes[extension || ''] || 'application/octet-stream';
  }
}

export const fileSystemService = new FileSystemService();
