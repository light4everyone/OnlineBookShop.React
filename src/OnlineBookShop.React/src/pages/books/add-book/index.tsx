import { Grid, TextField, Select, MenuItem, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from '@mui/lab/DatePicker';
import { BookForUpdateDto } from '../../../shared/api';
import { publishModel } from '../../../entities/publish';
import { createGate, useGate } from 'effector-react';
import { forward } from 'effector';
import { bookModel } from '../../../entities/book';


const pageGate = createGate();

forward({
  from: pageGate.open,
  to: publishModel.events.getPublishers
});


const AddBook = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<BookForUpdateDto>();

  const publishers = publishModel.selectors.usePublishers();

  useGate(pageGate);

  const onSubmit = (form: BookForUpdateDto) => {
    form.price = +form.price;

    bookModel.events.addBook(form);
  };

  return <>
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{
        '& .MuiTextField-root': { width: '25ch' },
        '& .MuiSelect-root': { width: '25ch' },
        '.MuiFormControl-root': { margin: 0 }
      }}>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="title"
            defaultValue={''}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.title !== undefined}
                variant="outlined"
                margin="normal"
                required
                type="text"
                label="Title"
                autoFocus
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name="publisherId"
            defaultValue={-1}
            rules={{
              required: true,
              min: 0
            }}
            render={({ field }) => (
              <Select
                {...field}
                error={errors.publisherId !== undefined}
              >
                <MenuItem value={-1} disabled>Select Publisher</MenuItem>
                {
                  publishers.map(p => (
                    <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                  ))
                }
              </Select>
            )}
          />
        </Grid>

        <Grid item xs={12}>

          <Controller
            control={control}
            name="publishedOn"
            defaultValue={new Date()}
            rules={{
              required: true,
              min: 0
            }}
            render={({ field }) => (
              <DatePicker
                {...field}
                renderInput={(params: any) => <TextField {...params} />}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name="price"
            defaultValue={0}
            rules={{
              required: true,
              min: 0
            }}
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.price !== undefined}
                variant="outlined"
                margin="normal"
                required
                type="number"
                label="Price"
                autoFocus
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name="description"
            defaultValue={''}
            rules={{
              required: true,
              minLength: 5
            }}
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.description !== undefined}
                variant="outlined"
                margin="normal"
                required
                type="text"
                label="Description"
                autoFocus
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>

          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  </>
}

export default AddBook;