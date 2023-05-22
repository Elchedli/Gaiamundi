import { useAuth } from 'hooks/useAuth';
import { useToast } from 'hooks/useToast';
import { User } from 'interfaces/user';
import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { strapi } from 'services/strapi';
import { uploadAvatar } from 'services/user';

const ProfilePhotoUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user: authUser, refetchUser } = useAuth();
  const { addToast } = useToast();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
  }, [authUser]); // cette partie semble inutile

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.size > 1 * 1024 * 1024) {
      setErrorMessage('La taille du fichier ne doit pas dépasser 1 Mo');
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

    if (!authUser) {
      addToast({
        title: 'Authentification requise.',
        description: '',
        type: 'error',
      });
      return;
    }

    setUploading(true);
    try {
      const uploadedFile = await uploadAvatar(selectedFile, authUser?.id);
      if (!uploadedFile) {
        throw new Error(
          "Les données de l'upload ne sont pas conformes aux attentes"
        );
      }

      if (user) {
        const updatedUser = Object.assign({}, user, {
          profileImage: uploadedFile.url,
        });
        // eslint-disable-next-line no-console
        console.log(updatedUser);
        await strapi.updateCurrentUser(user.id, updatedUser);

        addToast({
          title: 'Upload réussi',
          description: '',
          type: 'success',
        });
        await refetchUser();
      }
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

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-start">
      {user.Avatar ? (
        <img src={user.Avatar?.url} alt="profile" className="w-24 h-24 mb-3" />
      ) : (
        <Avatar name={user.username} size="50" round={false} className="mb-3" />
      )}

      <div className="flex flex-col items-start">
        <input type="file" onChange={handleInputChange} className="mb-4" />

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="px-8
 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {uploading ? 'Chargement...' : 'Upload'}
        </button>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;
