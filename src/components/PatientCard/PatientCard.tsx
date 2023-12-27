import React, { useContext, useState, useEffect } from 'react';
import { Patient } from '../../types/Patient';
import { Card, CardContent, Typography, Box, IconButton, Collapse, Avatar, Divider, Tooltip } from '@mui/material';
import { Link } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import { PatientContext } from '../../contexts/App/app-context';

interface PatientCardProps {
  patient: Patient;
  expanded: boolean;
  onExpand: (id: string) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const {
    expandedId,
    setExpandedId,
    setEditModalOpen,
    setEditedPatient,
    isMobile
  } = useContext(PatientContext);
  const [isExpanded, setIsExpanded] = useState(expandedId === patient.id);

  const handleEdit = () => {
    setEditedPatient(patient);
    setEditModalOpen(true);
  };

  useEffect(() => {
    setIsExpanded(expandedId === patient.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedId]);

  const handleShowMore = () => {
    setExpandedId(isExpanded ? '' : patient.id);
    setIsExpanded(expandedId === patient.id);
  };

  const renderWebsiteLink = () => (
    <Tooltip title={patient.website} arrow>
      <span>
        <Link href={patient.website} target="_blank" rel="noopener noreferrer" underline="none">
          Visit Website
          <OpenInNewIcon sx={{ ml: 0.5, verticalAlign: 'middle', fontSize: '16px' }} />
        </Link>
      </span>
    </Tooltip>
  );

  const getShortenedName = (name: string, maxLength: number) => {
    return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
  };

  const renderFullName = () => {
    if (patient.name.length > 13) {
      return (
        <Tooltip title={patient.name} arrow placement="top">
          <Typography component="div" variant="h5" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {getShortenedName(patient.name, 11)}
          </Typography>
        </Tooltip>
      );
    }
    return (
      <Typography component="div" variant="h5" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {getShortenedName(patient.name, 13)}
      </Typography>
    );
  };

  return (
    <Card data-testid="patient-card" sx={{ display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', flexDirection: isMobile ? 'column' : 'row', }}>
        <Box sx={{ display: 'flex', flexDirection: isExpanded ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', my: isExpanded ? 2 : 0 }}>
          <Avatar alt={patient.name} src={patient.avatar} sx={{ width: 100, height: 100, borderRadius: 0 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: isExpanded ? 0 : 2, minWidth: '200px', alignItems: isExpanded ? 'center' : 'left' }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography component="div" variant="h5" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {renderFullName()}
              </Typography>
              <Tooltip title="Edit">
                <IconButton aria-label="edit" onClick={handleEdit}>
                  <EditIcon sx={{ verticalAlign: 'middle', fontSize: '16px' }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="body1" color="text.secondary" component="div">
              {renderWebsiteLink()}
            </Typography>
          </Box>
        </Box>
        {isExpanded && <Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem variant="middle" />}
        <Box sx={{ display: 'flex', ml: 2 }}>
          <Collapse orientation={isMobile ? 'vertical' : 'horizontal'} in={isExpanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body2" color="text.secondary" component="div">
                {patient.description}
              </Typography>
            </CardContent>
          </Collapse>
        </Box>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          <Tooltip title={isExpanded ? 'Show less' : 'Show more'}>
            <IconButton aria-label={isExpanded ? 'collapse' : 'expand'} onClick={handleShowMore}>
              {isExpanded ? (
                isMobile ? <KeyboardArrowUpIcon /> : <KeyboardArrowLeftIcon />
              ) : (
                isMobile ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  );
};

export default PatientCard;