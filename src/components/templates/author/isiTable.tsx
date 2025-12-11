import {Observable} from '@legendapp/state';
import {css, cx} from '@styled/css';

import {IconEdit, IconTrash} from '@/assets';
import type {IsiType} from '@/graphql/generated/types';

const tableWrap = css({
  w: 'full',
  overflowX: 'auto',
});

const table = css({
  w: 'full',
  borderCollapse: 'separate',
  borderSpacing: '0',
  backgroundColor: 'white',
  border: '1px solid token(colors.gray3)',
  borderRadius: '14px',
  overflow: 'hidden',
});

const thead = css({
  backgroundColor: '#F8F9FB',
});

const thBase = css({
  fontSize: '0.875rem',
  padding: '14px 16px',
  color: '#1F2937',
  textAlign: 'left',
  fontWeight: 700,
  borderBottom: '1px solid #E5E7EB',
  whiteSpace: 'nowrap',
});

const tdBase = css({
  fontSize: '0.875rem',
  padding: '14px 16px',
  color: '#111827',
  borderBottom: '1px solid #EEF0F3',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'left',
  verticalAlign: 'middle',
});

const rowHover = css({
  transition: 'background-color .15s ease',
  '&:hover': {
    backgroundColor: '#FAFAFB',
  },
});

const actionsCell = css({
  textAlign: 'right',
  whiteSpace: 'nowrap',
});

const iconButton = css({
  transition: 'transform .15s ease, opacity .15s ease',
  '&:hover': {transform: 'scale(1.08)', opacity: 0.9},
  cursor: 'pointer',
  background: 'transparent',
  border: 'none',
  padding: 0,
});

type Column = {
  title: string;
  value: keyof IsiType;
  width?: string;
};

type ISITableProps = {
  columns: Column[];
  data: IsiType[];
  deleteEntity$?: Observable<{isOpen: boolean; entityId: string}>;
  onEdit: (isi: IsiType) => void;
};

const ISITable = ({columns, data, deleteEntity$, onEdit}: ISITableProps) => {
  const renderCell = (column: Column, row: IsiType) => {
    if (column.value === 'title') {
      return (
        <p
          className={css({
            color: '#111827',
            whiteSpace: 'break-spaces',
            textAlign: 'left',
            fontWeight: 500,
          })}
        >
          {row[column.value] as any}
        </p>
      );
    }

    if (column.value === 'author') return row.author?.displayName ?? 'Unknown Author';
    if (column.value === 'updatedAt' || column.value === 'createdAt')
      return row[column.value] as any;

    return row[column.value] as any;
  };

  if (!data?.length) {
    return (
      <div
        className={css({
          border: '1px dashed #E3E3E3',
          borderRadius: '12px',
          p: '6',
          textAlign: 'center',
          color: 'gray4',
          backgroundColor: 'white',
        })}
      >
        No ISI records found.
      </div>
    );
  }

  return (
    <div className={tableWrap}>
      <table className={table}>
        <thead className={thead}>
          <tr>
            {columns.map(column => (
              <th
                key={column.title}
                className={thBase}
                style={{width: column.width, maxWidth: column.width}}
              >
                {column.title}
              </th>
            ))}
            <th className={cx(thBase, actionsCell)}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map(row => (
            <tr key={row._id} className={rowHover}>
              {columns.map(column => (
                <td
                  key={column.title}
                  className={tdBase}
                  style={{width: column.width, maxWidth: column.width}}
                >
                  {renderCell(column, row)}
                </td>
              ))}

              <td className={cx(tdBase, actionsCell)}>
                <button
                  type='button'
                  onClick={e => {
                    e.stopPropagation();
                    onEdit(row);
                  }}
                  className={cx(iconButton, css({mr: '4'}))}
                  aria-label='Edit'
                  title='Edit'
                >
                  <IconEdit />
                </button>

                <button
                  type='button'
                  onClick={e => {
                    e.stopPropagation();
                    deleteEntity$?.isOpen.set(true);
                    deleteEntity$?.entityId.set(row._id);
                  }}
                  className={iconButton}
                  aria-label='Delete'
                  title='Delete'
                >
                  <IconTrash style={{fill: '#6E7072'}} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ISITable;
