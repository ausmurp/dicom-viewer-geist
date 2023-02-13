import { useQuery } from '@tanstack/react-query';
import { StudyListQueryKeys } from './study-list.query';

export const SeriesListQueryKeys = {
  Series: 'series'
};

export const getSeriesList = async (studyId) => {
  /*const res = await fetch(`${process.env.REACT_APP_DICOMWEB_URL}/studies/${studyId}/series`);

  if (!res.ok) {
    throw Error();
  }

  const items = await res.json();

  return items.map((item) => {
    const id = item['0020000E']?.Value?.at(0) || '';
    const studyId = item['0020000D']?.Value?.at(0) || '';
    const description = item['0008103E']?.Value?.at(0) || '';
    const series = item['00200011']?.Value?.at(0) || '';
    const instances = item['00201209']?.Value?.at(0) || '';
    return {
      id,
      studyId,
      description,
      series,
      instances
    };
  });*/

  return [
    { id: '1', studyId, description: 'Image 1', series: 1, instances: 1 },
    { id: '2', studyId, description: 'Image 2', series: 1, instances: 1 }
  ];
};

export default function useStudyQuery() {
  const useSeriesList = (studyId) =>
    useQuery({
      queryKey: [StudyListQueryKeys.Studies, studyId, SeriesListQueryKeys.Series],
      queryFn: async () => getSeriesList(studyId)
    });

  return { useSeriesList };
}
