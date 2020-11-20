import { Button, Grid, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Book } from '../../api/books/models/Book';
import { Publisher } from '../../api/publisher/models/Publisher';
import { getAllPublishers } from '../../api/publisher/index';
import { useSelector } from "react-redux";
import CombinedStore from "../../store/CombinedStore";
import {
  KeyboardDatePicker
} from '@material-ui/pickers';
import { createBook } from "../../api/books";
import { useHistory } from "react-router-dom";


const AddBook = () => {
  const { control, handleSubmit, errors } = useForm<Book>();
  const [publishers, setPublishers] = useState<Publisher[]>([] as Publisher[]);
  const authToken = useSelector<CombinedStore, string>(
    (s) => s.auth.token ?? ''
  );
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const publishers = await getAllPublishers({
          headers: {
            'Authorization': 'Bearer ' + authToken
          }
        });
        setPublishers(publishers);
      } catch (error) {
        console.error(error);
      }
    })()
  }, [authToken]);

  const onSubmit = (form: Book) => {
    (async () => {
      try {
        form.price = +form.price;
        await createBook(form, {
          headers: {
            'Authorization': 'Bearer ' + authToken
          }
        });
        history.push('/books');
      } catch (error) {
        console.error(error);
      }
    })()
  };

  return <>
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="title"
            defaultValue={''}
            rules={{
              required: true,
            }}
            errors={errors}
            render={({ ref, value, onChange, onBlur }) => (
              <TextField
                inputRef={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
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
            errors={errors}
            render={({ ref, value, onChange, onBlur }) => (
              <Select
                inputRef={ref}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
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
              errors={errors}
              render={({ ref, value, onChange, onBlur }) => (
                <KeyboardDatePicker
                  disableToolbar
                  inputRef={ref}
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  label="Date picker inline"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
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
            errors={errors}
            render={({ ref, value, onChange, onBlur }) => (
              <TextField
                inputRef={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
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
            errors={errors}
            render={({ ref, value, onChange, onBlur }) => (
              <TextField
                inputRef={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
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
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  </>
}

export default AddBook;