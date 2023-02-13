import { useQuery } from '@tanstack/react-query';

export const StudyListQueryKeys = {
  Studies: 'studies'
};
export const getStudyList = async () => {
  /*const res = await fetch(
    `${process.env.REACT_APP_DICOMWEB_URL}/studies?limit=10&offset=0&fuzzymatching=false&includefield=00081030%2C00080060`
  );

  if (!res.ok) {
    throw Error();
  }

  const items = await res.json();

  return items.map((item) => {
    const id = item['0020000D']?.Value?.at(0) || '';
    const patient = item['00100010']?.Value?.at(0)?.Alphabetic || '';
    const description = item['00081030']?.Value?.at(0) || '';
    const date = item['00080020']?.Value?.at(0) || '';
    const accession = item['00080050']?.Value?.at(0) || '';
    const modality = item['00080061']?.Value?.at(0) || '';

    const mrn = item['00100020']?.Value?.at(0) || '';
    const instances = item['00201208']?.Value?.at(0) || '';

    return {
      id,
      patient,
      description,
      modality,
      date,
      mrn,
      accession,
      instances
    };
  });*/

  return [
    {
      id: '1',
      patient: 'Rick James',
      description: 'CT Neck',
      modality: 'CT',
      date: '20220101',
      mrn: 'asdf',
      accession: 'asdgh',
      instances: 2
    }
  ];
};

export default function useStudyListQuery() {
  const useStudyList = () => useQuery({ queryKey: [StudyListQueryKeys.Studies], queryFn: getStudyList });

  return { useStudyList };
}
