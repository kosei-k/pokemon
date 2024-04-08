import { Box, CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <CircularProgress />
    </Box>
  );
}