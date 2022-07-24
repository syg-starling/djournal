import { Button, CardHeader, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '~/src/hooks'
import { createJournal, setModalForm } from '~/src/reducers/journalSlice'
import FileUploadIcon from '@mui/icons-material/FileUpload';

const CreateJournalForm = () => {
    const dispatch = useAppDispatch()
    const { account } = useAppSelector((state: RootState) => state.user)

    const { control, handleSubmit: handleFormSubmit, register, watch, getValues, reset } = useForm({ defaultValues: { journalName: null, yearPublished: null, file: null, authorId: null } })

    const handleSubmit = (values: any) => {
        values.file = values.file[0]
        values.authorId = account
        try {
            dispatch(createJournal(values))
            reset({})
            dispatch(setModalForm(false))
        } catch (err) {
            console.log({ err })
        }

    }
    return (<>
        <CardHeader
            title="New Journal"
        />
        <form
            encType="multipart/form-data"
            method='POST'
            onSubmit={handleFormSubmit(handleSubmit)}
        >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Controller
                    name='journalName'
                    control={control}
                    render={({
                        field: { onChange, onBlur, value, name, ref },
                    }) => (
                        <TextField
                            sx={{ margin: '5px' }}
                            label='Journal Name'
                            onBlur={onBlur} // notify when input is touched
                            onChange={onChange} // send value to hook form
                            inputRef={ref}
                        />
                    )}
                />
                <Controller
                    name='yearPublished'
                    control={control}
                    render={({
                        field: { onChange, onBlur, ref },
                    }) => (
                        <TextField
                            sx={{ margin: '5px' }}
                            label='Year Published'
                            onBlur={onBlur} // notify when input is touched
                            onChange={onChange} // send value to hook form
                            inputRef={ref}
                        />
                    )}
                />
                <Controller
                    name='file'
                    control={control}
                    render={({
                        field: { onChange, onBlur, value, name, ref },
                    }) => (<>
                        <input
                            accept="*"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            {...register('file')}
                        />
                        <label style={{ marginLeft: '5px' }} htmlFor="raised-button-file">
                            <Button variant="outlined" component="span" >
                                <FileUploadIcon />
                            </Button>
                            {watch('file') && (
                                <span style={{ marginLeft: '5px' }}>{getValues('file')[0].name}</span>
                            )
                            }
                        </label>

                    </>
                    )}
                />
            </div>
            <div style={{ margin: '5px', display: 'flex', justifyContent: 'end' }}>
                <Button variant='contained' type='submit'>Submit</Button>
            </div>
        </form>
    </>)
}

export default CreateJournalForm