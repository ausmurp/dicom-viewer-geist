import { Card, Grid } from '@geist-ui/core';
import { useNavigate } from 'react-router-dom';

import Table from '../components/table/table.component';
import useStudyListQuery from '../queries/dicom/study-list.query';

const HomePage = () => {
  const navigate = useNavigate();

  const onViewImage = (item) => {
    navigate(`/viewer/${item.id}`);
  };

  const { useStudyList } = useStudyListQuery();

  const { data: studyList, error, isLoading } = useStudyList();

  if (isLoading) {
    return 'loading...';
  }

  if (error) {
    return `Error: ${error}`;
  }

  return (
    <div style={{ width: '100%' }}>
      <Grid.Container gap={1}>
        <Grid xs={24}>
          <Card width="100%">page header</Card>
        </Grid>
        <Grid xs={24}>
          <Grid.Container gap={1}>
            {/** left panel of image reel */}
            <Grid xs={0} md={4}>
              <Card width="100%">options</Card>
            </Grid>
            {/** grid of images */}
            <Grid xs md={20}>
              <div
                style={{
                  width: '100%',
                  minHeight: '400px',
                  overflow: 'auto',
                  maxHeight: '60vh'
                }}
              >
                <Table
                  cols={[
                    { key: 'patient', label: 'Patient' },
                    { key: 'description', label: 'Desc' },
                    { key: 'modality', label: 'Modality' },
                    { key: 'date', label: 'Date' },
                    { key: 'mrn', label: 'MRN' },
                    { key: 'accession', label: 'Accession' },
                    { key: 'instances', label: 'Instances' }
                  ]}
                  rows={studyList}
                  onRowClick={onViewImage}
                />
              </div>
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default HomePage;
