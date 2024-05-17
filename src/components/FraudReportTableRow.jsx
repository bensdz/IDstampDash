/* eslint-disable react/prop-types */
import { TableCell, TableRow, Typography } from '@mui/material';
import Label from './label';
import CircularProgressWithLabel from './CircularProgressWithLabel ';

function FraudReportTableRow({ properties }) {
  return (
    <TableRow hover>
      <TableCell>
        <Typography>{properties.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{properties.dob}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{properties.address}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{properties.country}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{properties.address}</Typography>
      </TableCell>
      <TableCell>
        {properties?.aliases?.map((alias) => (
          <Label sx={{ m: 0.2 }} key={alias}>
            {alias}
          </Label>
        ))}
      </TableCell>
      <TableCell>
        {properties?.topics?.map((top) => (
          <Label sx={{ m: 0.2 }} key={top}>
            {top}
          </Label>
        ))}
      </TableCell>
      <TableCell>
        {properties?.foundIn?.map((found) => (
          <Label sx={{ m: 0.2, color: 'white', bgcolor: '#FF5630' }} key={found}>
            {found}
          </Label>
        ))}
      </TableCell>
      <TableCell>
        <CircularProgressWithLabel
          value={properties?.matchScore}
          color={properties?.matchScore >= 60 ? 'error' : 'info'}
        />
      </TableCell>
    </TableRow>
  );
}

export default FraudReportTableRow;
