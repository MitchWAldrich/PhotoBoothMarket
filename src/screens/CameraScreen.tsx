import { SafeAreaView } from 'react-native';
import CameraComponent from '../components/Camera/Camera';
import { cameraScreenStyles } from './CameraScreen.styles';
import { PhotoFile } from 'react-native-vision-camera';
import { useState } from 'react';
import { PhotoFileWithID } from '../types/PhotoFileWithID';
import { useNavigation } from '@react-navigation/native';
import { CameraScreenNavigationProp } from '../types/RootStack';

const CameraScreen: React.FC = () => {
  const takeAPic: PhotoFile | (() => PhotoFile) = {
    path: '../assets/TakeAPicTemp.png',
    width: 1080,
    height: 1920,
    isRawPhoto: true,
    orientation: 'portrait',
    isMirrored: false,
  };

  const navigation = useNavigation<CameraScreenNavigationProp>();

  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);
  const [photo, setPhoto] = useState<PhotoFile>(takeAPic);
  const [photos, setPhotos] = useState<PhotoFileWithID[]>([]);

  const handlePassPhotos = (photograph: PhotoFile) => {
    setPhoto(photograph);

    const newPhotoWithID: PhotoFileWithID = {
      ...photograph,
      id: (photos.length + 1).toString(),
    };

    setPhotos(storedPhotos => [...storedPhotos, newPhotoWithID]);
    navigation.navigate('Album', {
      newPhoto: photo,
    });
  };

  return (
    <SafeAreaView style={cameraScreenStyles.container}>
      <CameraComponent passPhoto={handlePassPhotos} pressed={isButtonPressed} />
    </SafeAreaView>
  );
};

export default CameraScreen;
