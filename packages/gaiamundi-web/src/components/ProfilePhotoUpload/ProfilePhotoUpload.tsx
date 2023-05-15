import { useAuth } from 'hooks/useAuth';
import { useToast } from 'hooks/useToast';
import React, { useState } from 'react';

const ProfilePhotoUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user, refetchUser } = useAuth();
  const { addToast } = useToast();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.size > 1 * 1024 * 1024) {
      setErrorMessage('La taille du fichier ne doit pas dépasser 1MB');
    } else if (file && !file.type.startsWith('image/')) {
      setErrorMessage('Le fichier doit être une image');
    } else {
      setSelectedFile(file);
      setErrorMessage('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      addToast({
        title: "Veuillez sélectionner un fichier avant de lancer l'upload.",
        description: '',
        type: 'error',
      });
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('files', selectedFile);

    try {
      const uploadResponse = await fetch('http://localhost:1337/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      const userId = user?.id;
      const userToken = localStorage.getItem('token');

      const userResponse = await fetch(
        `http://localhost:1337/users/${userId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            profileImage: uploadData[0].id,
          }),
        }
      );

      await userResponse.json();
      addToast({
        title: 'Upload réussi',
        description: '',
        type: 'success',
      });
      await refetchUser();
    } catch (error) {
      setErrorMessage("Une erreur s'est produite lors de l'upload.");
      addToast({
        title: "Une erreur s'est produite lors de l'upload.",
        description: '',
        type: 'error',
      });
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {user?.profileImage && (
        <img
          src={`http://localhost:1337${user.profileImage.url}`}
          alt="profile"
          className="w-24 h-24 rounded-full mb-4"
        />
      )}
      <input type="file" onChange={handleInputChange} className="mb-4" />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {uploading ? 'Chargement...' : 'Upload'}
      </button>
    </div>
  );
};

export default ProfilePhotoUpload;
