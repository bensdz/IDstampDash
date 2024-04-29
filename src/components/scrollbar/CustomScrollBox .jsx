import styled from '@emotion/styled';
import { Box } from '@mui/material';

const CustomScrollBox = styled(Box)(({ theme }) => ({
  '&::-webkit-scrollbar': {
    width: 8, // Width of the scrollbar
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.grey[200], // Color of the track (area behind the scrollbar)
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grey[500], // Color of the scrollbar thumb
    borderRadius: 4, // Rounded corners of the scrollbar thumb
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.grey[600], // Color of the scrollbar thumb on hover
  },
}));

export default CustomScrollBox;
