import { renderHook, waitFor } from '@testing-library/react';
import useStudyListQuery from '../../../queries/dicom/study-list.query';
import { QueriesProvider } from '../queries.provider';

describe('study list query hook', () => {
  test('successful query hook', async () => {
    const { useStudyList } = useStudyListQuery();

    const { result } = renderHook(() => useStudyList(), { wrapper: QueriesProvider });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    expect(result.current.data[0].description).toBe('CT Neck');
  });
});
