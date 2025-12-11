import {toast} from 'react-toastify';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import dayjs from 'dayjs';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {Button, TextField} from '@/components/atoms';
import type {IsiType, UpdateIsiInput} from '@/graphql/generated/types';
import {updateIsi} from '@/graphql/mutation';

const isiSchema = Yup.object().shape({
  title: Yup.string().required().min(3),
  doi: Yup.string().required().min(8),
  journal: Yup.string().required().min(3),
  year: Yup.mixed().required(),
});

interface Props {
  isi: IsiType;
  onClose: () => void;
  token: string;
  authorId: string;
}

function EditModal({isi, onClose, token, authorId}: Props) {
  const queryClient = useQueryClient();

  const updateIsiMutation = useMutation({
    mutationFn: (args: UpdateIsiInput) => updateIsi(args, token),
  });

  const d = new Date(isi.year ?? 2000, 1, 1);
  const date = dayjs(d);

  const isiFormik = useFormik({
    initialValues: {
      id: isi._id,
      title: isi.title ?? '',
      doi: isi.doi ?? '',
      journal: isi.journal ?? '',
      year: date,
    } as any,
    validationSchema: isiSchema,
    onSubmit: async () => {
      try {
        const response = await updateIsiMutation.mutateAsync({
          ...isiFormik.values,
          year: parseInt(isiFormik.values.year?.format('YYYY') || '0', 10),
        });

        if (response.success) {
          queryClient.invalidateQueries({queryKey: ['author', 'isi', authorId]});
          toast.success('ISI record updated successfully');
          onClose();
        } else {
          toast.error('An error occurred');
        }
      } catch (error: any) {
        toast.error(error?.message || 'Update failed');
      }
    },
  });

  return (
    <form
      onSubmit={isiFormik.handleSubmit}
      className={css({
        w: '[50vw]',
        mdDown: {w: '[90vw]'},
      })}
      style={{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
      }}
    >
      <Box width='100%' mt='16px'>
        <TextField
          label='Title'
          name='title'
          value={isiFormik.values.title}
          onChange={isiFormik.handleChange}
          required
        />
      </Box>

      <Box width='100%' mt='16px'>
        <TextField
          label='DOI'
          name='doi'
          value={isiFormik.values.doi}
          onChange={isiFormik.handleChange}
          required
        />
      </Box>

      <Box width='100%' mt='16px'>
        <TextField
          label='Journal'
          name='journal'
          value={isiFormik.values.journal}
          onChange={isiFormik.handleChange}
          required
        />
      </Box>

      <Box mt='16px'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='Year'
            sx={{width: '100%'}}
            name='year'
            onChange={(value: any) => {
              if (value?.isValid?.()) {
                isiFormik.setFieldValue('year', value, false);
              }
            }}
            value={isiFormik.values.year}
            openTo='year'
          />
        </LocalizationProvider>
      </Box>

      <Box display='flex' gap='12px' mt='24px'>
        <Button type='submit' disabled={updateIsiMutation.isPending}>
          {updateIsiMutation.isPending ? 'Saving...' : 'Save'}
        </Button>
        <Button visual='outlined' onClick={onClose} type='button'>
          Cancel
        </Button>
      </Box>
    </form>
  );
}

export default EditModal;
