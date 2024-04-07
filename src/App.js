import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, CircularProgress, Box } from '@mui/material';

function App() {
  const [url, setUrl] = useState('');
  const [paymentStrings, setPaymentStrings] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get(`https://pokernow-ledger-api.onrender.com/get_payment_strings?url=${url}`);
      setPaymentStrings(response.data.payment_strings.join('\n'));
    } catch (error) {
      setError('Error fetching payment strings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Payment Strings App
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <TextField
          label="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          variant="outlined"
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          style={{ marginBottom: '10px' }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Get Payment Strings'}
        </Button>
      </form>
      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <TextField
        label="Payment Strings"
        value={paymentStrings}
        variant="outlined"
        fullWidth
        multiline
        rows={6}
        readOnly
      />
    </Box>
  );
}

export default App;