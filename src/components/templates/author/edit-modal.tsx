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
  journal: Yup.string().required().min(8),
  year: Yup.string().required().min(3).max(30),
});
interface Props {
  isi: IsiType;
  onClose: any;
  token: string;
}

function EditModal({isi, onClose, token}: Props) {
  const queryClient = useQueryClient();

  const updateIsiMutation = useMutation({
    mutationFn: (args: UpdateIsiInput) => updateIsi(args, token),
  });

  const d = new Date(isi.year!, 1, 1);
  const date = dayjs(d);
  const isiFormik = useFormik({
    initialValues: {
      id: isi._id,
      title: isi.title,
      doi: isi.doi,
      journal: isi.journal,
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
          queryClient.clear();
          toast.success('ISI record created successfully');
          setTimeout(() => {
            onClose();
            isiFormik.resetForm();
          }, 1000);
        } else {
          toast.error('An error occured');
        }
      } catch (error: Error | any) {
        toast.error(error.message);
      }
    },
  });
  return (
    <form
      onSubmit={isiFormik.handleSubmit}
      className={css({
        w: '[50vw]',
        mdDown: {
          w: '[90vw]',
        },
      })}
      style={{
        marginBottom: '32px',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
      }}
    >
      <Box width='100%' mt='25px'>
        <TextField
          label='Title'
          type='title'
          name='title'
          value={isiFormik.values.title}
          onChange={isiFormik.handleChange}
          id='title'
          required
        />
      </Box>
      <Box width='100%' mt='25px'>
        <TextField
          label='DOI'
          type='doi'
          name='doi'
          value={isiFormik.values.doi}
          onChange={isiFormik.handleChange}
          id='doi'
          required
        />
      </Box>

      <Box width='100%' mt='25px'>
        <TextField
          label='Journal'
          type='journal'
          name='journal'
          value={isiFormik.values.journal}
          onChange={isiFormik.handleChange}
          id='journal'
          required
        />
      </Box>
      <Box mt='25px'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='Year'
            sx={{width: '100%'}}
            name='year'
            onChange={(value: any) => {
              if (value.isValid()) {
                isiFormik.setFieldValue('year', value, false);
              } else {
                console.log('error');
              }
            }}
            value={isiFormik.values.year}
            openTo='year'
          />
        </LocalizationProvider>
        {isiFormik.touched.journal && isiFormik.errors.journal && <span>Error</span>}
      </Box>
      <Button className={css({mt: '24px'})} type='submit'>
        Save
      </Button>
      <Button
        visual='outlined'
        onClick={onClose}
        className={css({mt: '24px', ml: '24px'})}
        type='button'
      >
        Cancel
      </Button>
    </form>
  );
}

export default EditModal;
