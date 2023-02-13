import { Table as GeistTable } from '@geist-ui/core';

const Table = ({ rows, cols, onRowClick, renderActions }) => {
  const handleRenderActions = (value, item, index) => renderActions(item, index);

  return (
    <GeistTable data={rows} hover={false} onRow={onRowClick}>
      {cols.map((col) => (
        <GeistTable.Column key={col.key} prop={col.key} label={col.label} width={col.width} />
      ))}
      {renderActions && <GeistTable.Column prop="actions" label="" width={100} render={handleRenderActions} />}
    </GeistTable>
  );
};

export default Table;
