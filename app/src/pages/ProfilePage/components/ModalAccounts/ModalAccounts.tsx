import { ListItemButton, ListItemAvatar, Avatar, ListItem } from '@mui/material'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import AddIcon from '@mui/icons-material/Add'
import { getProfileImage, getProfileName } from '@/utils/helpers/prepare-data'
import { checkIsCurrentUser } from '@/utils/helpers/general'
import {
  StyledItemButton,
  StyledItemIconAvatar,
  StyledItemText,
  StyledList,
  StyledListItem,
  StyledViewModal
} from './styled'
import { IModalAccounts } from './types'
// import { useAddKey } from '@/hooks/workspaces'
import { MODAL_PARAMS_KEYS } from '@/types/modal'
import { useOpenModalSearchParams } from '@/hooks/modal'
import { useOpenApp } from '@/hooks/open-entity'

export const ModalAccounts = ({ handleClose, changeAccount, open, accounts, currentPubKey }: IModalAccounts) => {
  const { onImportKey } = useOpenApp()
  const { handleOpen } = useOpenModalSearchParams()

  return (
    <StyledViewModal onClose={handleClose} open={open} fullWidth maxWidth="lg">
      <StyledList>
        {accounts.map((account, i) => (
          <StyledListItem
            key={i}
            secondaryAction={
              checkIsCurrentUser(currentPubKey, account) ? <CheckCircleOutlinedIcon htmlColor="#48ff91" /> : ''
            }
            disablePadding
          >
            <ListItemButton onClick={() => changeAccount(account.pubkey)}>
              <ListItemAvatar>
                <Avatar src={getProfileImage(account)}></Avatar>
              </ListItemAvatar>
              <StyledItemText primary={getProfileName(account)} />
            </ListItemButton>
          </StyledListItem>
        ))}

        <ListItem disablePadding>
          <StyledItemButton alignItems="center" onClick={() => handleOpen(MODAL_PARAMS_KEYS.KEY_IMPORT)}>
            <ListItemAvatar>
              <StyledItemIconAvatar>
                <AddIcon />
              </StyledItemIconAvatar>
            </ListItemAvatar>
            <StyledItemText primary="Add read-only key" />
          </StyledItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledItemButton alignItems="center" onClick={() => onImportKey()}>
            <ListItemAvatar>
              <StyledItemIconAvatar>
                <AddIcon />
              </StyledItemIconAvatar>
            </ListItemAvatar>
            <StyledItemText primary="Add private key" />
          </StyledItemButton>
        </ListItem>
      </StyledList>
    </StyledViewModal>
  )
}