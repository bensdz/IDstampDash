/* eslint-disable react/prop-types */
import { TableCell, TableRow, Typography } from '@mui/material';
import Label from './label';
import CircularProgressWithLabel from './CircularProgressWithLabel ';

function FraudReportTableRow({ properties }) {
  // console.log(properties.dob);
  return (
    <TableRow hover>
      <TableCell>
        <CircularProgressWithLabel
          value={properties?.matchScore}
          color={properties?.matchScore >= 80 ? 'error' : 'info'}
        />
      </TableCell>

      <TableCell>
        <Typography variant="body3" sx={{ fontWeight: 'bold' }}>
          {properties.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body3">{properties.dob ? properties.dob[0] : 'N/A'}</Typography>
      </TableCell>
      <TableCell>
        {properties?.pob?.slice(0, 5).map((place, index) => (
          <Label sx={{ m: 0.2, fontSize: '10.5px' }} key={index}>
            {place}
          </Label>
        ))}
        {properties?.pob?.length > 5 && <Label sx={{ m: 0.2, fontSize: '10.5px' }}>...</Label>}
      </TableCell>
      <TableCell>
        <Typography variant="body3">{properties.country}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body3">{properties.address}</Typography>
      </TableCell>
      <TableCell>
        {properties?.aliases?.slice(0, 5).map((alias) => (
          <Label sx={{ m: 0.2, fontSize: '10.5px' }} key={alias}>
            {alias}
          </Label>
        ))}
        {properties?.aliases?.length > 5 && <Label sx={{ m: 0.2, fontSize: '10.5px' }}>...</Label>}
      </TableCell>
      <TableCell>
        {properties?.topics?.slice(0, 5).map((top) => (
          <Label sx={{ m: 0.2, fontSize: '10.5px' }} key={top}>
            {top}
          </Label>
        ))}
        {properties?.topics?.length > 5 && <Label sx={{ m: 0.2, fontSize: '10.5px' }}>...</Label>}
      </TableCell>
      <TableCell>
        {properties?.foundIn?.slice(0, 3).map((found) => (
          <Label
            sx={{ m: 0.2, color: 'white', bgcolor: '#FF8500', fontSize: '10.5px' }}
            key={found}
          >
            {found.length > 0 &&
              `${found.substring(0, 2).toUpperCase()}
                ${found.substring(3).split('-').length > 1 ? found.substring(3).split('-')[0].toUpperCase() : ''}`}
          </Label>
        ))}
        {properties?.foundIn?.length > 3 && (
          <Label sx={{ m: 0.2, color: 'white', bgcolor: '#FF8500', fontSize: '10.5px' }}>...</Label>
        )}
      </TableCell>
    </TableRow>
  );
}

export default FraudReportTableRow;
