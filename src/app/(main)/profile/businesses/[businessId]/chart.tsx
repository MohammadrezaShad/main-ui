'use client';

import React, {useMemo, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import {css} from '@styled/css';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip} from 'chart.js';

import {SearchCompanyVisitStatisticsOutput} from '@/graphql';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Props {
  visits: SearchCompanyVisitStatisticsOutput;
}

function Chart({visits}: Props) {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  const pastMonths = useMemo(() => {
    const months = [];
    const now = new Date();
    for (let i = 0; i < 12; i += 1) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      months.push({
        label: `${date.toLocaleString('default', {month: 'long'})} ${year}`,
        value: `${year}-${month}`,
      });
    }
    return months;
  }, []);

  const filteredVisits = useMemo(
    () =>
      visits.results?.filter(visit => {
        const visitDate = new Date(visit.createdAt);
        const visitMonth = `${visitDate.getFullYear()}-${String(visitDate.getMonth() + 1).padStart(2, '0')}`;
        return visitMonth === selectedMonth;
      }) || [],
    [visits, selectedMonth],
  );

  const chartData = useMemo(() => {
    const labels = filteredVisits.map(visit => new Date(visit.createdAt).getTime());
    const data = filteredVisits.map(visit => visit.count);

    return {
      labels,
      datasets: [
        {
          label: 'Visit Count',
          data,
          backgroundColor: '#4bb6e8',
        },
      ],
    };
  }, [filteredVisits]);

  return (
    <div
      className={css({
        borderWidth: '1px',
        borderColor: 'gray.200',
        rounded: '0',
        p: '6',
        mb: '6',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          mb: '6',
          gap: '4',
        })}
      >
        <h2 className={css({fontSize: '2xl', lineHeight: '2xl', fontWeight: 'medium'})}>
          Visit statistics
        </h2>
        <div className={css({pos: 'relative'})}>
          <select
            className={css({
              appearance: 'none',
              bgColor: 'white',
              pt: '2',
              pb: '2',
              pl: '4',
              pr: '10',
              color: 'gray.700',
            })}
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
          >
            {pastMonths.map(month => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
          <div
            className={css({
              pointerEvents: 'none',
              pos: 'absolute',
              top: '0',
              bottom: '0',
              right: '0',
              display: 'flex',
              alignItems: 'center',
              pl: '2',
              pr: '2',
              color: 'gray.700',
            })}
          >
            <svg
              className={css({fill: 'current', h: '4', w: '4'})}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </div>
        </div>
      </div>

      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {display: false},
          },
          scales: {
            x: {
              ticks: {
                callback(value) {
                  // eslint-disable-next-line react/no-this-in-sfc
                  const timestamp = this.getLabelForValue(value as number);
                  return new Date(timestamp).toLocaleDateString();
                },
              },
            },
          },
        }}
        style={{
          maxHeight: '300px',
          width: '100%',
        }}
      />
    </div>
  );
}

export default Chart;
