import { Grid } from '@geist-ui/core';
import Viewer from '../../components/dicom/viewer.component';

import { useParams } from 'react-router-dom';
import useStudyQuery from '../../queries/dicom/study.query';

const ViewerPage = () => {
  // Get study id from params.
  const { id: studyId } = useParams();

  const { useSeriesList } = useStudyQuery();

  const { data: seriesList, seriesError, status: seriesStatus } = useSeriesList(studyId);

  if (seriesStatus === 'loading') {
    return 'loading...';
  }

  if (seriesError) {
    return `Error: ${seriesError}`;
  }

  return (
    <>
      <Grid.Container>
        <Grid xs>
          <Viewer series={seriesList} />
        </Grid>
      </Grid.Container>
    </>
  );
};

export default ViewerPage;
