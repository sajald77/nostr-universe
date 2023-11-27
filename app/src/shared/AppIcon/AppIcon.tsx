import { memo, useEffect, useState } from 'react'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import { StyledAppIcon, StyledAppImg } from './styled'
import { IAppIcon } from './types'

export const AppIcon = memo(function AppIcon({
  picture = '',
  size,
  isActive,
  isPreviewTab,
  isLight,
  isRounded,
  isOutline,
  isSmall,
  alt,
  onClick,
  ...rest
}: IAppIcon) {
  const [isFailed, setIsFailed] = useState(false)

  useEffect(() => {
    setIsFailed(false)

    const img = new Image()
    img.src = picture
    img.onerror = () => {
      setIsFailed(true)
    }
  }, [picture])

  return (
    <StyledAppIcon
      isRounded={isRounded}
      isNotLoaded={isFailed}
      isOutline={isOutline}
      size={size}
      isActive={isActive}
      isPreviewTab={isPreviewTab}
      onClick={onClick}
      {...rest}
    >
      {alt ? (
        <StyledAppImg
          isLight={isLight}
          isPreviewTab={isPreviewTab}
          size={size}
          alt={alt}
          isSmall={isSmall}
          src={isFailed ? '/' : picture}
        />
      ) : (
        <StyledAppImg
          isLight={isLight}
          isPreviewTab={isPreviewTab}
          size={size}
          alt={alt}
          isSmall={isSmall}
          src={isFailed ? '/' : picture}
        >
          <ImageOutlinedIcon fontSize="inherit" />
        </StyledAppImg>
      )}
    </StyledAppIcon>
  )
})
