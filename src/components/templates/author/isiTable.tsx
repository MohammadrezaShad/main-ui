import {Observable} from '@legendapp/state';
import {css, cx} from '@styled/css';

import {IconEdit, IconTrash} from '@/assets';
import type {IsiType} from '@/graphql/generated/types';

const tableCellStyled = css({
  fontSize: '0.875rem',
  padding: '18px 0 18px 16px',
  color: '#333333',
  border: 'none !important',
  borderBottom: '1px solid #E3E3E3',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'left',
});

const tableHeadStyled = css({
  backgroundColor: '#F7F7F7',
  margin: '16px',
});

const tableCellHeadStyled = css({
  paddingTop: '12px',
  paddingBottom: '12px',
  borderBottom: 'none',
});

const tableCellRightAlignedStyled = css({
  paddingTop: '12px',
  paddingBottom: '12px',
  fontWeight: 600,
  borderBottom: 'none',
  paddingLeft: 0,
  paddingRight: '16px',
});

const iconButtonStyled = css({
  transition: 'all',
  '&:hover': {
    transform: 'scale(1.2)',
  },
  cursor: 'pointer',
});

type Column = {
  title: string;
  value: keyof IsiType;
  width?: string;
};

type ISITableProps = {
  columns: Array<Column>;
  data: Array<IsiType>;
  // onTitleClick: any;
  deleteEntity$?: Observable<{isOpen: boolean; entityId: string}>;
  // onRedirect?: any;
  // onToggleFilters?: any;
  // onToggleColumnsView?: any;
  onEdit: any;
};

const ISITable = ({
  columns,
  data,
  // onTitleClick,
  deleteEntity$,
  // onRedirect,
  // onToggleFilters,
  // onToggleColumnsView,
  onEdit,
}: ISITableProps) => {
  const tableDataContent = (column: Column, row: any) => {
    if (column.value === 'title') {
      return (
        <p
          className={css({
            color: '#333333',
            whiteSpace: 'break-spaces',
            textAlign: 'left',
            textTransform: 'none',
          })}
        >
          {row[column.value]}
        </p>
      );
    }
    if (column.value === 'author') return row.author?.displayName ?? 'Unknown Author';
    if (column.value === 'updatedAt' || column.value === 'createdAt') return row[column.value];

    return row[column.value];
  };

  return (
    <table className={css({w: 'full'})}>
      <thead className={tableHeadStyled}>
        <tr>
          {columns.map(column => (
            <th key={column.title} className={cx(tableCellStyled, tableCellHeadStyled)}>
              {column.title}
            </th>
          ))}
          <tr className={cx(tableCellStyled, tableCellRightAlignedStyled)} />
        </tr>
      </thead>
      <tbody>
        {data?.map(row => (
          <tr key={row._id}>
            {columns.map(column => (
              <td
                key={column.title}
                style={{
                  width: column.width,
                  maxWidth: column.width,
                }}
                className={tableCellStyled}
              >
                {tableDataContent(column, row)}
              </td>
            ))}
            <td className={cx(tableCellStyled, css({textAlign: 'right'}))}>
              <button
                type='button'
                onClick={e => {
                  e.stopPropagation();
                  onEdit(row);
                }}
                className={cx(iconButtonStyled, css({mr: '6'}))}
                color='primary'
                aria-label='Edit'
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
                className={iconButtonStyled}
                color='secondary'
                aria-label='Delete'
              >
                <IconTrash style={{fill: '#6E7072'}} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ISITable;
