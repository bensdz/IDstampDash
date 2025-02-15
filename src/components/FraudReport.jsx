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
  const sanctionsCheck = verif?.sanctionsCheck ? JSON.parse(verif?.sanctionsCheck) : null;
  const facesHaveAccountBefore = verif?.facesHaveAccountBefore
    ? JSON.parse(verif?.facesHaveAccountBefore)
    : null;
  // console.log(sanctionsCheck?.results);

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
    height: `${collapseOpen && sanctionsCheck?.results?.length > 0 ? '98%' : '90%'}`,
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

        {/* <Alert severity={verif?.compareInfo ? 'info' : 'error'} sx={{ my: 2 }}>
          {verif?.compareInfo
            ? `Given Information and document Information Matches`
            : `Given Information and document Information don't match`}
        </Alert> */}

        <Alert severity={verif?.compareFaces <= 0.7 ? 'error' : 'success'} sx={{ my: 2 }}>
          Face match:
          {verif?.compareFaces <= 0.7
            ? ` Failed ${verif?.compareFaces === -1 ? '0' : Math.round(verif?.compareFaces * 10000) / 100}% Expected 70%+`
            : ` Passed (${Math.round(verif?.compareFaces * 10000) / 100}%)`}
        </Alert>

        <Alert severity={verif?.nbrFacesRejected > 0 ? 'error' : 'success'} sx={{ my: 2 }}>
          {verif?.nbrFacesRejected > 0
            ? `Face Rejected ${verif?.nbrFacesRejected} Times By Other Companies`
            : `Face Not Rejected By Other Companies`}
        </Alert>

        <Alert severity={facesHaveAccountBefore?.length > 0 ? 'error' : 'success'} sx={{ my: 2 }}>
          {facesHaveAccountBefore?.length > 0 ? (
            <>
              Face Detected in {facesHaveAccountBefore?.length} Previous Accounts In Your Company,
              User IDs:
              {facesHaveAccountBefore?.map((id) => (
                <b>
                  <a key={id} href={`/users/${id}`}>
                    {id},
                  </a>
                </b>
              ))}
            </>
          ) : (
            `Face Not Detected in Previous Accounts In Your Company`
          )}
        </Alert>

        <Alert severity={verif?.mRZValid ? 'success' : 'error'} sx={{ my: 2 }}>
          {verif?.mRZValid ? `Valid MRZ Code` : `Invalid MRZ code`}
        </Alert>

        <Alert severity={verif?.compareMRZ <= 70 ? 'error' : 'success'} sx={{ my: 2 }}>
          MRZ Information Match:
          {verif?.compareMRZ <= 70
            ? ` Doesn't Match (${Math.round(verif?.compareMRZ * 100) / 100}%)`
            : ` Matches (${Math.round(verif?.compareMRZ * 100) / 100}%)`}
        </Alert>

        <Alert severity={verif?.compareAge <= 0.7 ? 'error' : 'success'} sx={{ my: 2 }}>
          Age Match:
          {verif?.compareAge <= 0.7
            ? ` Failed (${Math.round(verif?.compareAge * 10000) / 100}% Expected 70%+) \n Age Guessed: ${Math.round(verif?.guessedAge * 10) / 10}`
            : ` Passed (${Math.round(verif?.compareAge * 10000) / 100}%)`}
        </Alert>

        <Alert
          // icon={verif?.compareGender !== false}
          severity={verif?.compareGender === false ? 'error' : 'success'}
          sx={{ my: 2 }}
        >
          {verif?.compareGender
            ? `Gender Matches`
            : `Gender Guessed Doesn't Match With Document Gender`}
        </Alert>

        <ListItem button onClick={() => setCollapseOpen(!collapseOpen)} sx={{ p: 0 }}>
          <Alert
            severity={sanctionsCheck?.results?.length > 0 ? 'error' : 'success'}
            sx={{ my: 2, width: '100%', cursor: 'pointer', m: 0 }}
          >
            Sanctions Check: {sanctionsCheck?.results?.length} Possible Matches Found (Click to
            Expand)
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
                    { id: 'matchScore', label: 'Match Score' },
                    { id: 'name', label: 'Name' },
                    { id: 'birthdate', label: 'Date of Birth' },
                    { id: 'pob', label: 'Place of Birth' },
                    { id: 'country', label: 'Country' },
                    { id: 'address', label: 'Address' },
                    { id: 'aliases', label: 'Name Aliases' },
                    { id: 'topics', label: 'Topics' },
                    { id: 'references', label: 'References' },
                  ]}
                  onRequestSort={() => {}}
                />
                {sanctionsCheck?.results?.length > 0 ? (
                  <TableBody>
                    {sanctionsCheck?.results?.map((result) => (
                      <FraudReportTableRow
                        key={result.caption}
                        properties={{
                          name: result?.caption || '',
                          dob: result?.properties?.birthDate || '',
                          pob: result?.properties?.birthPlace || ['N/A'],
                          country: result?.properties?.country || 'N/A',
                          address: result.properties?.address || 'N/A',
                          aliases: result?.properties?.alias || [],
                          topics: result?.properties?.topics || [],
                          foundIn: result.referents || [],
                          matchScore: result?.score * 100,
                        }}
                      />
                    ))}
                    {/* <FraudReportTableRow
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
                        /> */}
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
