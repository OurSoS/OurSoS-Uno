import * as React from 'react';
import { Button, Share } from 'react-native';
import * as Linking from 'expo-linking';

import { getDeviceId } from './chat';

export default function AddFriend() {
      const [userId, setUserId] = React.useState<string>();

      const handleShareButtonPress = async () => {
            const url = `exp://10.0.0.17:8081/addfriend/${userId}`;
            await Share.share({
                  message: url,
            });
      };

      const handleIncomingURL = async (event) => {
            const friendId = event.url.replace('exp://10.0.0.17:8081/addfriend/', '');

            // Make a POST request to your API endpoint here to add the current user and friendId as friends
            fetch('https://oursos-backend-production.up.railway.app/addfriend/' + userId + '/' + friendId, {
                  method: 'POST',
            })
                  .then((response) => response.json())
                  .then((json) => console.log(json))
                  .catch((error) => console.error(error));
      };

      React.useEffect(() => {

            const deviceId = getDeviceId();

            fetch(`https://oursos-backend-production.up.railway.app/users/${deviceId}`)
                  .then((response) => response.json())
                  .then((json) => setUserId(json.id))
                  .catch((error) => console.error(error));

            Linking.addEventListener('url', handleIncomingURL);

            return () => {
                  Linking.removeEventListener('url', handleIncomingURL);
            };
      }, []);

      return <Button title="Add Friend" onPress={handleShareButtonPress} />;
}
