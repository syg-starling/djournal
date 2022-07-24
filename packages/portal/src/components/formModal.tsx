import { Card, Modal } from "@mui/material"

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  padding: '10px'
}

const ModalForm = (props: any) => {
  return (
    <Modal
      open={props?.modalForm}
      onClose={props?.onClose}
    >
      <Card style={style}>
        {props?.children}
      </Card>
    </Modal>
  )
}

export default ModalForm