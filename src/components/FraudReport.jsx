import { useState } from 'react';
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
import {
  Alert,
  Box,
  Collapse,
  ListItem,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import Iconify from './iconify';
import FraudReportTableHead from './FraudReportTableHead';
import FraudReportTableRow from './FraudReportTableRow';

function FraudReport({ open, onClose, verif }) {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const sanctionsCheck = JSON.parse(verif.sanctionsCheck);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 720,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    overflowY: 'scroll',
    height: `${collapseOpen && sanctionsCheck?.results?.length > 0 ? '98%' : '82%'}`,
    display: 'block',
  };

  return (
    <Modal
      open={open}
      onClose={() => onClose(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box sx={style}>
        <Iconify
          icon="mingcute:close-fill"
          width={20}
          height={20}
          sx={{ aligncontent: 'flex-end', cursor: 'pointer', float: 'right', mb: 2 }}
          onClick={() => onClose(false)}
        />
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
          Fraud Report:
        </Typography>

        <Alert severity="info" sx={{ my: 2 }}>
          Given Information and document Information match
        </Alert>

        <Alert severity={verif?.compareFaces <= 0.7 ? 'error' : 'info'} sx={{ my: 2 }}>
          Face match:
          {verif?.compareFaces === 0
            ? ' No face detected'
            : verif?.compareFaces <= 0.7
              ? ` Failed - ${Math.round(verif?.compareFaces * 10000) / 100}% Expected 70%+`
              : ` Passed (${Math.round(verif?.compareFaces * 100) / 100}%)`}
        </Alert>

        <Alert severity={verif?.mRZValid ? 'info' : 'error'} sx={{ my: 2 }}>
          {verif?.mRZValid ? `Valid MRZ Code` : `Invalid MRZ code`}
        </Alert>

        <Alert severity={verif?.compareMRZ <= 70 ? 'error' : 'info'} sx={{ my: 2 }}>
          MRZ Information Match:
          {verif?.compareMRZ <= 70
            ? ` Doesn't Match (${Math.round(verif?.compareMRZ * 100) / 100}%)`
            : ` Matches (${Math.round(verif?.compareMRZ * 100) / 100}%)`}
        </Alert>

        <Alert severity={verif?.compareAge <= 70 ? 'error' : 'info'} sx={{ my: 2 }}>
          Age Match:
          {verif?.compareAge <= 70
            ? ` Failed (${Math.round(verif?.compareAge * 10) / 10}% Expected 70%+) \n Age Guessed: ${Math.round(verif?.guessedAge * 10) / 10}`
            : ` Passed (${Math.round(verif?.compareAge * 100) / 100}%)`}
        </Alert>

        <Alert
          // icon={verif?.compareGender !== false}
          severity={verif?.compareGender === false ? 'error' : 'info'}
          sx={{ my: 2 }}
        >
          {verif?.compareGender
            ? `Gender Matches`
            : `Gender Guessed Doesn't Match With Document Gender`}
        </Alert>
        {sanctionsCheck?.results && (
          <>
            <ListItem button onClick={() => setCollapseOpen(!collapseOpen)} sx={{ p: 0 }}>
              <Alert
                severity={sanctionsCheck?.results?.length > 0 ? 'error' : 'info'}
                sx={{ my: 2, width: '100%', cursor: 'pointer', m: 0 }}
              >
                Sanctions Check: {sanctionsCheck?.results?.length} Matches Found
                <Iconify
                  icon={collapseOpen ? 'bi:chevron-up' : 'bi:chevron-down'}
                  width={20}
                  height={20}
                  sx={{ ml: 1, aligncontent: 'end', float: 'right', cursor: 'pointer' }}
                />
              </Alert>
            </ListItem>

            <Collapse in={collapseOpen} timeout="auto" unmountOnExit sx={{}}>
              <Box sx={{ p: 1 }} component="div" overflow="auto">
                <TableContainer sx={{ overflow: 'unset' }}>
                  <Table>
                    <FraudReportTableHead
                      order="asc"
                      orderBy="name"
                      headLabel={[
                        { id: 'name', label: 'Name' },
                        { id: 'birthdate', label: 'Date of Birth' },
                        { id: 'pob', label: 'Place of Birth' },
                        { id: 'country', label: 'Country' },
                        { id: 'address', label: 'Address' },
                        { id: 'aliases', label: 'Name Aliases' },
                        { id: 'topics', label: 'Topics' },
                        { id: 'foundIn', label: 'Found In' },
                        { id: 'matchScore', label: 'Match Score' },
                      ]}
                      onRequestSort={() => {}}
                    />
                    {sanctionsCheck?.results?.length > 0 ? (
                      <TableBody>
                        {/* {sanctionsCheck?.results?.map((result) => (
                          <FraudReportTableRow
                            key={result.name}
                            properties={{
                              name: result?.proprietes?.caption || "",
                              dob: result?.properties?.birthDate|| "",
                              pob: result?.properties?.birthPlace|| "",
                              country: result?.properties?.country || "",
                              address: result.address || "",
                              aliases: result?.properties?.alias || [],
                              topics: result?.properties?.topics || [],
                              foundIn: result.foundIn || [] ,
                              matchScore: result?.score,
                            }}
                          />
                        ))} */}
                        <FraudReportTableRow
                          properties={{
                            name: 'John',
                            dob: '12/12/2002',
                            aliases: ['James', 'Jim', 'JW'],
                            topics: ['pep', 'terrorism', 'fraud'],
                            country: 'USA',
                            address: '1234, Test address',
                            matchScore: 70,
                            foundIn: ['OFAC', 'EU', 'UN'],
                          }}
                        />
                        <FraudReportTableRow
                          properties={{
                            name: 'John Wick',
                            dob: '12/12/2002',
                            topics: ['pep', 'terrorism', 'fraud'],
                            aliases: ['Johan', 'Wick', 'JW'],
                            country: 'USA',
                            address: '1234, Test Street 1556',
                            matchScore: 60,
                            foundIn: ['OFAC', 'EU'],
                          }}
                        />
                      </TableBody>
                    ) : (
                      <TableCell
                        variant="body2"
                        style={{ textAlign: 'center', marginTop: '2rem' }}
                        colSpan={8}
                      >
                        No Matches Found
                      </TableCell>
                    )}
                  </Table>
                </TableContainer>
              </Box>
            </Collapse>
          </>
        )}
      </Box>
    </Modal>
  );
}

FraudReport.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  verif: PropTypes.object,
};

export default FraudReport;
