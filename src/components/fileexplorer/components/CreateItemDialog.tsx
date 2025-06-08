
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CreateItemDialogProps {
  show: boolean;
  type: 'file' | 'folder';
  name: string;
  onTypeChange: (type: 'file' | 'folder') => void;
  onNameChange: (name: string) => void;
  onCreate: () => void;
  onCancel: () => void;
}

const CreateItemDialog: React.FC<CreateItemDialogProps> = ({
  show,
  type,
  name,
  onTypeChange,
  onNameChange,
  onCreate,
  onCancel,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">
          Create New {type === 'folder' ? 'Folder' : 'File'}
        </h3>
        
        <div className="flex space-x-2 mb-4">
          <Button
            variant={type === 'folder' ? 'default' : 'outline'}
            onClick={() => onTypeChange('folder')}
          >
            Folder
          </Button>
          <Button
            variant={type === 'file' ? 'default' : 'outline'}
            onClick={() => onTypeChange('file')}
          >
            File
          </Button>
        </div>
        
        <Input
          placeholder={`${type === 'folder' ? 'Folder' : 'File'} name`}
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onCreate()}
          className="mb-4"
        />
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onCreate}>
            Create
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CreateItemDialog;
