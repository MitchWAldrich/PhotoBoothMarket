import axios from 'axios';
import { Text, View } from 'react-native';
import { emailScreenStyles } from './EmailScreen.styles';
import { useState } from 'react';

const EmailScreen: React.FC = () => {
  const event = 'Opea Atelier Live on Market Street';
  const user = 'getUserFunction';
  const show = 'the Magic Flute';
  const discountCode = 'PhotoBooth25';
  const websiteLink = 'websiteToTickets.com';
  const filteredPhoto = 'photoString';

  const submitClientInfo = async () => {
    try {
      const response = await axios.post(
        'https://your-backend.onrender.com/client-info',
        {
          name: 'Jane Doe',
          email: 'jane@example.com',
          isPastAudience: true,
          event: { event },
          message: `Dear ${user},
          We loved having you at ${event}!
          We wanted to remind you that tickets are now on sale for ${show}!
          You can use ${discountCode} at ${websiteLink} to purchase tickets now.
          
          Purchase your tickets today, and be part of the magic just like in this custom filtered photo, our gift to you!
          ${filteredPhoto}
  
          See you at The Elgin Theatre!
  
          All our best,
  
          The OA Team`,
        },
      );

      console.log('Server response:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <View>
      <Text style={emailScreenStyles.input}>
        Dear {user}, We loved having you at {event}! We wanted to remind you
        that tickets are now on sale for {show}! You can use {discountCode} at{' '}
        {websiteLink} to purchase tickets now. Purchase your tickets today, and
        be part of the magic just like in this custom filtered photo, our gift
        to you!
        {filteredPhoto}
        See you at The Elgin Theatre! All our best, The OA Team
      </Text>
    </View>
  );
};

export default EmailScreen;
